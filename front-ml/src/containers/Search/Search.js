import React, { useState } from 'react';
import './search.css';
import logo from '../../utils/Logo_ML.png';
import { Outlet, useNavigate } from 'react-router-dom';

export default function Search() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  return (
    <>
      <div className='search-initial-mercadolibre'>
        <img src={logo} alt='logo-mercadolibre'/>
        <input placeholder="Nunca dejes de buscar" className='search-input-mercadolibre' onChange={(e) => setQuery(e.target.value)}/>
        <button className="search-btn-mercadolibre" onClick={()=> navigate(`items?search=${query}`)}/>
      </div>
    <Outlet/>
    </>
  )
}
