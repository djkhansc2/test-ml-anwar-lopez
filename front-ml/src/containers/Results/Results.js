import React, {useEffect, useState} from 'react'
import { useSearchParams } from 'react-router-dom'
import ResultCard from './ResultCard';
import './results.css'

export default function Results() {
const [queryParams] = useSearchParams();
const query = queryParams.get('search');
const [items, setItems] = useState([]);

useEffect(() => {
  fetch(`http://localhost:3001/api/items?q=${query}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      setItems(data[0].items);
    })
    .catch((err) => console.log('err', err))
}, [query])

  return (
    <div className='search-module-mercadolibre'>
      {
      items.slice(0,4).map((result) => {
        return (
          <ResultCard key={result.id} item={result}/>
        )
      })
      }
    </div>
  )
}


