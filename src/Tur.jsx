import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { turs } from './data';
import axios from 'axios';
import { BackBtn } from './BackBtn';
import { GoTable } from './GoTable';
export const Tur = () => {
    const {id} = useParams();
    const [teams,setTeams] = useState([]);
    const [tur] = useState(turs[id]);
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
      .then(data => setTeams(data))
      .catch(error => {
        console.error('Произошла ошибка:', error.message);
      }
      );
    },[]);
  return (
    <>
     <GoTable />
    <div className="tur">
      <BackBtn />
      <h1>TUR {id}</h1>
      {/* <button onClick={()=>resetBtn()}>Сбросить</button> */}
      <div className="teams">
          <ul>
            {tur.map((tur,i) => {
              const team1 = teams.find(team => team.team_num.toString() === tur[0].toString() && team.ture.toString() == id.toString());
              const team2 = teams.find(team => team.team_num.toString() === tur[1].toString() && team.ture.toString() == id.toString());
              // Если team1 или team2 не найдены, пропустим рендеринг этого элемента
              if (!team1 || !team2) {
                return null;
              } 
              
              // console.log(team1,team2);
              const time = {
                0:'18:00',
                1:'19:00',
                2:'20:00',
                3:'21:00',
                4:'22:00',
                5:'23:00',
              }
              return (
                <>
                  <div className="tur">
                    <h3>{time[i]}</h3>
                    <li key={i}>
                      <p>
                      <NavLink to={`/match/${team1.id}-${team2.id}`} className={`left ${team1.point > team2.point?'win':team1.point < team2.point ? 'lose':''}`}>{team1.team}</NavLink>
                      <span>
                        {team1.point}
                      </span>
                      </p>
                      :
                      <p>
                        <NavLink to={`/match/${team1.id}-${team2.id}`} className={`right ${team1.point < team2.point?'win':team1.point > team2.point ? 'lose':''}`}>{team2.team}</NavLink>
                        <span>
                          {team2.point}
                        </span>
                      </p>
                    </li>
                  </div>
                </>
                
              );
            })}
          </ul>
      </div>
    </div>
    </>
  )
}
