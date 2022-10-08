import React from 'react'
import './resultcard.css';
import freeIcon from '../../utils/ic_shipping.png'
import { useNavigate } from 'react-router-dom';

export default function ResultCard(props) {
  const {item} = props
  const currencyOptions = { style: 'currency', currency: item.price.currency, minimumFractionDigits: item.price.decimals ? 2 : 0 };
  const formatCurrency = new Intl.NumberFormat('es-AR', currencyOptions);
  const navigate = useNavigate();


  return (
    <>
    <div className='result-card-mercadolibre'>
        <img src={item.picture} alt={item.id} style={{margin: '0px, 16px, 0px, 16px', cursor:'pointer', width:'180px', height:'180px', borderRadius:'4px'}} onClick={()=> navigate(`/items/${item.id}`)}/>
        <div className='general-data-search-mercadolibre' style={{display:'flex', flexDirection:'column', width:'inherit'}}>
          <div style={{display: 'flex', alignItems:'baseline'}}>
            <div style={{fontSize: '24px'}}>
              {formatCurrency.format(item.price.amount)}
            </div>
            { item.free_shipping &&
              <div style={{marginLeft: '10px'}}>
                <img src= {freeIcon} alt={`free-shipping ${item.id}`} />
              </div>
            }
          </div>
          <div style={{fontSize: '18px', marginTop:'32px', cursor:'pointer'}} onClick={()=> navigate(`/items/${item.id}`)}>{item.title}</div>
        </div>
        <div className='location-search-mercadolibre' style={{display: 'flex', width:'100px', marginTop:'20px', marginRight:'20px', fontSize:'12px'}}>
          {item.address}
        </div>
    </div>
    </>
  )
}
