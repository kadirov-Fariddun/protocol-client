import React from 'react';
import { NavLink } from 'react-router-dom';
export const NotFound = () => {
  return (
    <div className='not-found'>
        <h1>Jiyan adashib qoldingmi?</h1>
        <p>
        ¯\_(ツ)_/¯
        </p>
        <NavLink to="/">Uyga ketaman!</NavLink>
    </div>
  )
}
