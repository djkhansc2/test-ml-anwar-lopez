import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import './details.css'

export default function Details() {
  let { id } = useParams();
  console.log('id', id)
  const [prodDetails, setprodDetails] = useState([]);
  const [price, setPrice] = useState(0)

  useEffect(() => {
    fetch(`http://localhost:3001/api/items/${id}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data[0].item)
      setprodDetails(data[0].item);
      setPrice((data[0].item.price.amount).toLocaleString('es-AR', {
        style: 'currency',
        currency: data[0].item.price.currency,
        minimumFractionDigits: data[0].item.price.decimals ? 2 : 0
      }))
    })
    .catch((err) => console.log('err', err))
  }, [id])

  return (
    <div className='details-module-mercadolibre'>
      <div className='details-container-mercadolibre'>
        <div className="row">
          {/* COLUMNA IMG Y DESCRIPCION */}
          <div className="column-img-description-mercadolibre">
            <img className='img-details-mercadolibre' src={prodDetails.picture} alt={`img-mercadolibre-${prodDetails.id}`}/>
            <p style={{fontSize:'28px'}}>Descripcion del producto</p>
            <p style={{fontSize:'16px'}}>{prodDetails.description}</p>
          </div>
          {/* COLUMNA GENERALES */}
          <div className="column-gral-mercadolibre">
            <p style={{fontSize:'14px', marginTop:'32px'}} >{prodDetails.condition === 'new' ? 'Nuevo': 'Usado'} - {prodDetails.sold_quantity} venididos</p>
            <h4 style={{fontSize:'24px', marginTop:'16px'}}>{prodDetails.title}</h4>
            <div style={{fontSize: '46px', marginTop:'32px'}}>
              {price}
            </div>
            <button className='buy-btn-mercadolibre'>Comprar</button>
          </div>
        </div>
      </div>
    </div>
  )
}
