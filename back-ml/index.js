const express = require ('express');
const http = require('http');
const app = express();
const cors = require('cors');
const port = 3001
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swaggerM.json');

app.use(cors());
app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

require(`./routes/index.js`)(app);

app.listen(port, function () {
    console.log('CORS-enabled web server listening on port 3001')
})


