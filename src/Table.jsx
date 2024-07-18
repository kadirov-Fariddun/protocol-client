import axios from 'axios';
import React, { useEffect, useState } from 'react';
//images 
import logoClub from './img/mpliga.png';
export const Table = () => {
    const [teams,setTeams] = useState([]);
    async function getTeams() {
        const URL = 'http://protocol.coderoff.uz:5001/api/table/';
        try {
            const response = await axios.get(URL);
            return response.data;
        } catch (error) {
            console.log('Ощибка при получении команд: ',error.message);
            throw error;
        }
    };
    useEffect(()=>{
        getTeams() 
        .then(res=>setTeams(res))
        .catch(e=>console.log(e));
    },[]);
    teams.sort((a,b)=>{
      if(a.point > b.point){
        return -1;
      }else if(a.point < b.point){
        return 1;
      } else{
        if(a.rm > b.rm){
          return -1;
        }else if(a.rm < b.rm){
          return 1;
        }
        else if(a.isWinner){
          return -1;
        }else if(b.isWinner){
          return 1;
        }
      }
    
    })
    console.log(teams);
  return (
    <>
   <div className="table">
        <div className="tp">
          <div className="container">
            <h3 className="table-year">
              2023 MP-Liga
            </h3>


            {/* first table */}
            <div className="table-flex">
              <div>
                <table className="table-one">
                  <tr>
                    <th className="table-title">
                      Club
                    </th>
                  </tr>
                  {
                    teams.map((team,i) => {
                        team.rm = (team.zm - team.pm);
                      return (
                        <tr key={team.id}>
                          <span className={`team-number ${i <= 3 ? 'liders' : ''} ${i === 4 ? 'tops' : ''} ${i >= 9 ? 'outsiders' : ''}`}>
                            {i+1}
                          </span>
                          <img src={logoClub} alt="" className="logo-club" height='30px' />
                          <div className="club-name" key={team.id}>
                            {team.team}
                          </div>
                        </tr>
                      )
                    })
                  }
                </table>
              </div>
              {/* first table end */}

              {/* last table */}
              <div className="table-flex-two">
                <table className="table-two">
                  <tr>
                    <th className="table-title table-title-two">O'</th>
                    <th className="table-title table-title-two">G'</th>
                    <th className="table-title table-title-two">D</th>
                    <th className="table-title table-title-two">M</th>
                    <th className="table-title table-title-two">UG</th>
                    <th className="table-title table-title-two">O'G</th>
                    <th className="table-title table-title-two">TF</th>
                    <th className="table-title table-title-two">O</th>
                  </tr>
                  {
                    teams.map(team => {
                      return (
                        <tr key={team.id}>
                          <td className="club-games">
                            {team.matches}
                          </td>
                          <td className="club-win">
                            {team.wins}
                          </td>
                          <td className="club-draw">
                            {team.draw}
                          </td>
                          <td className="club-lose">
                            {team.lose}
                          </td>
                          <td className="club-lose">
                            {team.zm}
                          </td>
                          <td className="club-lose">
                            {team.pm}
                          </td>
                          <td className="club-lose">
                            {team.rm}
                          </td>
                          <td className="club-point">
                            {team.point}
                          </td>
                          {/* <td className='club-last-5'>
                            <div>
                              <span>
                                {item.oxirgi_1.toLowerCase() === 'win' ? <img src={winPng} alt='win' width='20px' /> : ''}
                                {item.oxirgi_1.toLowerCase() === 'draw' ? <img src={drawPng} alt='draw' width='18px' /> : ''}
                                {item.oxirgi_1.toLowerCase() === 'lose' ? <img src={losePng} alt='lose' width='20px' /> : ''}
                                {item.oxirgi_2.toLowerCase() === 'win' ? <img src={winPng} alt='win' width='20px' /> : ''}
                                {item.oxirgi_2.toLowerCase() === 'draw' ? <img src={drawPng} alt='draw' width='18px' /> : ''}
                                {item.oxirgi_2.toLowerCase() === 'lose' ? <img src={losePng} alt='lose' width='20px' /> : ''}
                                {item.oxirgi_3.toLowerCase() === 'win' ? <img src={winPng} alt='win' width='20px' /> : ''}
                                {item.oxirgi_3.toLowerCase() === 'draw' ? <img src={drawPng} alt='draw' width='18px' /> : ''}
                                {item.oxirgi_3.toLowerCase() === 'lose' ? <img src={losePng} alt='lose' width='20px' /> : ''}
                                {item.oxirgi_4.toLowerCase() === 'win' ? <img src={winPng} alt='win' width='20px' /> : ''}
                                {item.oxirgi_4.toLowerCase() === 'draw' ? <img src={drawPng} alt='draw' width='18px' /> : ''}
                                {item.oxirgi_4.toLowerCase() === 'lose' ? <img src={losePng} alt='lose' width='20px' /> : ''}
                                {item.oxirgi_5.toLowerCase() === 'win' ? <img src={winPng} alt='win' width='20px' /> : ''}
                                {item.oxirgi_5.toLowerCase() === 'draw' ? <img src={drawPng} alt='draw' width='18px' /> : ''}
                                {item.oxirgi_5.toLowerCase() === 'lose' ? <img src={losePng} alt='lose' width='20px' /> : ''}
                              </span>
                            </div>
                          </td> */}
                        </tr>
                      )
                    })
                  }
                </table>
              </div>
              {/* last table end */}
            </div>












            <div className="table-footer">
              <div className="table-footer-flex">
                <div className="table-footer-info">
                  <h4>
                    Manolar/darajalar
                  </h4>
                  <div className='table-liders'><span></span> Turnir Liderlari</div>
                  <div className='table-tops'><span></span> Turnir Toplari</div>
                  <div className='table-outsiders'><span></span> Turnir Autsayderlari</div>
                  <div className="table-coments">
                    <div><span></span> O' (o'yinlar)</div>
                    <div><span></span> G' (g'alabalar)</div>
                    <div><span></span> D (duranglar)</div>
                    <div><span></span> M (mag'lubiyatlar) </div>
                    <div><span></span> UG (Urilgan gollar) </div>
                    <div><span></span> O'G (O'tkazilgan gollar) </div>
                    <div><span></span> TF (To'plar farqi) </div>
                    <div><span></span> O (ochkolar) </div>
                  </div>
                </div>
                {/* <div className="table-footer-last-5">
                  <div><img src={winPng} alt="win" width='15px' /> G'alaba</div>
                  <div><img src={drawPng} alt="draw" width='15px' /> Durang</div>
                  <div><img src={losePng} alt="lose" width='15px' /> mag'lubiyat</div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
