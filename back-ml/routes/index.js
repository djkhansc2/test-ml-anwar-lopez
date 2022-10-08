/*MAIN ROUTES*/
const fetch = require('cross-fetch');

module.exports = function(app) {
       app.get('/api/items', (req,res) => {
            // #swagger.tags = ['Search']
            // #swagger.description = 'GLOBAL SEARCH ENDPOINT'
            const { q } = req.query;

            fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${q}`)
            .then(res => {
                if (res.status >= 400) {
                throw new Error("Bad response from server");
                }
                return res.json(res);
            })
            .then(data => {
                if(data.results.length > 0) {
                    const items = [];
                    const categories = [];
                    //GENERATE NEW ITEMS
                    data.results.forEach(element => {
                        items.push({
                            "id": element.id,
                            "title": element.title,
                            "price": {
                                "currency": element.currency_id,
                                "amount": element.price,
                                "decimals": !Number.isInteger(element.price),
                            },
                            "picture": element.thumbnail,
                            "condition": element.condition,
                            "free_shipping": element.shipping.free_shipping,
                            "address": element.address.state_name
                        })
                    });
                    // GENERATE NEW CATEGORIES
                    data.filters[0]?.values[0].path_from_root.forEach(element => {
                        categories.push(
                            element.name
                        )
                    });
                    const newJson = [{
                        "author": {
                            "name": "Anwar",
                            "lastname": "Lopez"
                        },
                        "categories":categories,
                        "items": items
                    }]
                    return res.json(newJson)
                } else {
                    return res.status(200).send(`Results not found for: ${q}`)
                }
            })
            .catch(error => {
                console.log(error);
                return res.status(400).send(error)
            });
        });

       app.get('/api/items/:id',(req,res) => {
            // #swagger.tags = ['Search']
            // #swagger.description = 'SPECIFIC ITEM SEARCH ENDPOINT'
            const { id } = req.params;

            Promise.all([
                fetch(`https://api.mercadolibre.com/items/${id}`),
                fetch(`https://api.mercadolibre.com/items/${id}/description`)
            ]).then(responses => {
                return Promise.all(responses.map( response => {
                    return response.json();
                }));
            }).then( data => {
                //VALIDATE EXIST ID
                if(data[0].message){
                    return res.status(404).send(data[0].message);
                } else {
                    const newJson = [{
                        "author": {
                            "name": "Anwar",
                            "lastname": "Lopez"
                        },
                        "item": {
                            "id": data[0].id,
                            "title": data[0].title,
                            "price": {
                                "currency": data[0].currency_id,
                                "amount": data[0].price,
                                "decimals": !Number.isInteger(data[0].base_price),
                            },
                            "picture": data[0]?.pictures[0]?.secure_url,
                            "condition": data[0].condition,
                            "free_shipping": data[0].shipping.free_shipping,
                            "sold_quantity": data[0].sold_quantity,
                            "description": data[1].plain_text
                        }
                    }]
                    return res.json(newJson)
                }
            }).catch( error => {
                console.log(error);
                return res.status(400).send(error)
            });
       });
};
