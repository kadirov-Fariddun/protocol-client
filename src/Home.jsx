import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { turs } from './data';
import axios from 'axios';
import { GoTable } from './GoTable';

export default function Home() {
  const [teams,setTeams] = useState([]);
  const getTeams = async () => {
    const URL = 'http://45.84.225.47:5001/api/teams/';
    let data = [];
    try{
      const response = await axios.get(URL);
      data = response.data;
      return data;
    }
    catch (e) {
      console.error('Ошибка получения данных:', e.message);
      throw e;
    }
  };
 
  useEffect(()=>{
    getTeams()
    .then(data =>setTeams(data))
    .catch(error => {
      console.error('Произошла ошибка:', error.message);
    }
    );
  },[]);

  return (
    <div className="all-turs">
      <h1>PROTOKOL</h1>
      <ul>
        {
          Object.keys(turs).map(tur =>(
            <li key={tur}><NavLink to={`/tur/${tur}`}>{tur} TUR</NavLink></li>
          ))
        }
        <GoTable />
      </ul>
    </div>
  )
}
