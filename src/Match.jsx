import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import { BackBtn } from './BackBtn';

export const Match = () => {
    let {id} = useParams();
    id = id.split('-');
    const [team1,setTeam1] = useState({});
    const [team2,setTeam2] = useState({});
    const [teams,setTeams] = useState([]);
    const [players,setPlayers] = useState([]);
    const [player,setPlayer] = useState({});
    const [modalActive,setModalActive] = useState('');
    const [playerAlertModal,setPlayerAlertModalDisplay] = useState('');
    const [playerAlertModalDisplay,setPlayerAlertModal] = useState('');
    const [playerAlert,setPlayerAlert] = useState('');
    const [endMatchModal,setEndMatchModal] = useState('');
    const [seeProtocol,setSeeProtocol] = useState(false);
    // обновляем данные игрока и команды в туре 
    const updateDataTeam = async (id,newData) => {
      try{
        const response = await axios.put(`http://45.84.225.47:5001/api/teams/${id}`,newData);
        console.log('Данные успешно обновились: ',response.data);
        return response.data;
      }catch(e){
        console.error('Ошибка получения данных:', e.message);
        throw e;
      }
      
    } 
    const updateDataPlayer = async (id,newData) => {
      try{
        const response = await axios.put(`http://45.84.225.47:5001/api/players/${id}`,newData);
        console.log('Данные успешно обновились: ',response.data);
        return response.data;
      }catch(e){
        console.error('Ошибка получения данных:', e.message);
        throw e;
      }
    } 

    // отправляем все данные в телеграм 
const sendMessageToTelegram = (playerAlert,team1,team2,player) => {
  const token = '5998034134:AAGaoApUgNL8HMsHMIpxfN2EtV2yOYodUK8';
  const chat_id = '@mpliga'; // Используйте корректный chat_id
  const URL = `https://api.telegram.org/bot${token}/sendMessage`;

  let message;

  if (playerAlert === 'g') {
      message = `${team1.ture}-TUR\n`;
      message += `<b>${team1.team}</b> ${team1.point}:${team2.point} <b>${team2.team}</b>\n`;
      message += `<b>gooooollllll 🔥🔥</b>\n`;
      message += `⚽️ <b>${player.name}</b>\n\n`;
      message += `🔄<b>MPLIGA - 24/25</b>`;
  }
  else if (playerAlert === 'y') {
      message = 'TEST REJIM!!\n';
      message += `<b>${team1.team}</b> ${team1.point}:${team2.point} <b>${team2.team}</b>\n`;
      message += `<b>ogoxlantirish (${player.team})</b>\n`;
      message += `🟨<b>${player.name}</b>`;
  }
  else if (playerAlert === 'r') {
      message = 'TEST REJIM!!\n';
      message += `<b>${team1.team}</b> ${team1.point}:${team2.point} <b>${team2.team}</b>\n`;
      message += `<b>Chetlatish (${player.team})</b>\n`;
      message += `🟥<b>${player.name}</b>`;
  }

  // Проверка, что message не пустое
  if (!message) {
      console.error("Message is empty. Please check your input data.");
      return;
  }

  axios.post(URL, {
      chat_id: chat_id,
      parse_mode: 'HTML', // Используйте 'HTML' вместо 'html'
      text: message,
  })
  .then(response => {
      console.log("Сообщение отправлено:", response.data);
  })
  .catch(error => {
      if (error.response) {
          // Сервер ответил с кодом состояния, отличным от 2xx
          console.error("Ошибка запроса:", error.response.data);
      } else if (error.request) {
          // Запрос был отправлен, но ответ не был получен
          console.error("Нет ответа от сервера:", error.request);
      } else {
          // Произошла ошибка при настройке запроса
          console.error("Ошибка настройки запроса:", error.message);
      }
  });
}

    // отправляем все данные в телеграм после окончания матча
// const sendMessageToTelegramEndMatch = (team1,team2,teams) => {
//   const token = '5998034134:AAGaoApUgNL8HMsHMIpxfN2EtV2yOYodUK8';
//   const chat_id = '@database_mpliga'; // Используйте корректный chat_id
//   const URL = `https://api.telegram.org/bot${token}/sendMessage`;

//   let message;
//   teams.forEach(team => {
//     if(team.ture === team1.ture && team.ture === team2.ended){
//       if(team.ended){
//         console.log('проверяем Энд',team);
//         message += `${team1.team} ${team1.point} : ${team2.point} ${team2.team} #tugadi`;
//       }else{
//         console.log('проверяем не энд',team);
//         message += `${team1.team} ${team1.point} : ${team2.point} ${team2team}`;
//       }
//     }
//   });
//  console.log('проверяем до отправки',message);
//   setTimeout(() => {
//      // Проверка, что message не пустое
//   if (!message) {
//     console.error("Message is empty. Please check your input data.");
//     return;
// }
// console.log('проверяем после отправки',message);
// axios.post(URL, {
//     chat_id: chat_id,
//     parse_mode: 'HTML', // Используйте 'HTML' вместо 'html'
//     text: message,
// })
// .then(response => {
//     console.log("Сообщение отправлено:", response.data);
// })
// .catch(error => {
//     if (error.response) {
//         // Сервер ответил с кодом состояния, отличным от 2xx
//         console.error("Ошибка запроса:", error.response.data);
//     } else if (error.request) {
//         // Запрос был отправлен, но ответ не был получен
//         console.error("Нет ответа от сервера:", error.request);
//     } else {
//         // Произошла ошибка при настройке запроса
//         console.error("Ошибка настройки запроса:", error.message);
//     }
// });
//   }, 500);
 
// }



    // получаем командлу по id
    const getTeams = async (id) => {
      const URL = `http://45.84.225.47:5001/api/teams/${id}`;
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
    // получаем команды 
    const getAllTeams = async () => {
      const URL = `http://45.84.225.47:5001/api/teams/`;
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

    // получаем всех игроков
    const getPlayers = async () => {
      const URL = `http://45.84.225.47:5001/api/players/`;
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
        // получаем первую команду
      getTeams(id[0])
      .then(data => setTeam1(data[0]))
      .catch(error => {
        console.error('Произошла ошибка:', error.message);
      }
      );
        // получаем вторую команду
      getTeams(id[1])
      .then(data => setTeam2(data[0]))
      .catch(error => {
        console.error('Произошла ошибка:', error.message);
      }
      );
      // получаем всех игроков
      getPlayers()
      .then(data => setPlayers(data))
      .catch(error => {
      console.error('Произошла ошибка:', error.message);
    });
    },[]);
    useEffect(()=>{
       // получаем всех Команд
       getAllTeams()
       .then(data => setTeams(data))
       .catch(error => {
          console.error('Произошла ошибка:', error.message);
       });
    },[endMatchModal])
    const teamList = {
      team1: [],
      team2: [],
    };

    if (players && typeof team1.team !== 'undefined' && typeof team2.team !== 'undefined') {
        players.forEach(player => {
            if (player.team.toLowerCase() == team1.team.toLowerCase()) {
              teamList.team1.push(player);
            } else if (player.team.toLowerCase() == team2.team.toLowerCase()) {
              teamList.team2.push(player);
            }
        });
    }
    const date = new Date();
    const dateNow = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`;

    // update data goals point yellow card red card 
    const reqUpdateData = (playerAlert,newData,player,playerNewData,id) => {
      // если гол
      if(playerAlert == 'g'){
        if(newData.goals === null){
          let arr = [];
          arr.push(player.name);
          arr = JSON.stringify(arr);
          newData.goals = arr;
          newData.point += 1;
          playerNewData.goals += 1;
          updateDataTeam(id,newData);
          updateDataPlayer(player.id,playerNewData)
          setPlayerAlertModal('');
          setTimeout(() => {
            setPlayerAlertModalDisplay('');
          }, 500);
          setModalActive('');
        }else{
          let arr = JSON.parse(newData.goals);
          arr.push(player.name);
          arr = JSON.stringify(arr);
          newData.goals = arr;
          newData.point += 1;
          playerNewData.goals += 1;
          updateDataTeam(id,newData);
          updateDataPlayer(player.id,playerNewData)
          setPlayerAlertModal('');
          setTimeout(() => {
            setPlayerAlertModalDisplay('');
          }, 500);
          setModalActive('');
        }
      }
      // если желтая карточка
      else if(playerAlert == 'y'){
        if(newData.yellow_card === null){
          let arr = [];
          arr.push(player.name);
          arr = JSON.stringify(arr);
          newData.yellow_card = arr;
          playerNewData.yellow_cards += 1;
          updateDataTeam(id,newData);
          updateDataPlayer(player.id,playerNewData)
          setPlayerAlertModal('');
          setTimeout(() => {
            setPlayerAlertModalDisplay('');
          }, 500);
          setModalActive('');
        }else{
          let arr = JSON.parse(newData.yellow_card);
          arr.push(player.name);
          arr = JSON.stringify(arr);
          newData.yellow_card = arr;
          playerNewData.yellow_cards += 1;
          updateDataTeam(id,newData);
          updateDataPlayer(player.id,playerNewData)
          setPlayerAlertModal('');
          setTimeout(() => {
            setPlayerAlertModalDisplay('');
          }, 500);
          setModalActive('');
        }
      }
      // если красная карточка
      else if(playerAlert == 'r'){
        if(newData.red_card === null){
          let arr = [];
          arr.push(player.name);
          arr = JSON.stringify(arr);
          newData.red_card = arr;
          playerNewData.red_cards += 1;
          updateDataTeam(id,newData);
          updateDataPlayer(player.id,playerNewData)
          setPlayerAlertModal('');
          setTimeout(() => {
            setPlayerAlertModalDisplay('');
          }, 500);
          setModalActive('');
        }else{
          let arr = JSON.parse(newData.red_card);
          arr.push(player.name);
          arr = JSON.stringify(arr);
          newData.red_card = arr;
          playerNewData.red_cards += 1;
          updateDataTeam(id,newData);
          updateDataPlayer(player.id,playerNewData)
          setPlayerAlertModal('');
          setTimeout(() => {
            setPlayerAlertModalDisplay('');
          }, 500);
          setModalActive('');
        }
      }
      else {
        return;
      }
    }
  return (
    
    <>
    {
     players && player && team1 && team2 ?
      <>
    <div className="match">
      <div className="match-titles">
        <BackBtn />
        <span className='match-date'>{team1.date==null?dateNow:team1.date}</span>
        <h1>Tur {team1.ture}</h1>
      </div>
      <div className="teams-flex">
        {/* team 1 */}
        <div className="team">
          <div className="team-title">
            <h2 style={{textAlign:'left'}}>{team1.team}</h2>
            <strong>{team1.point}</strong>
          </div>
            <ul>
              {
                teamList['team1'].map(player =>(
                  <li key={player.id}>
                    <button 
                    onClick={()=>{
                      if(team1.red_card != null && team1.red_card.includes(player.name)){
                        return null;
                      }
                      setPlayer(player);
                      setModalActive('active');
                     }} 
                     className={team1.red_card != null && team1.red_card.includes(player.name) ?
                      'have-red-card fdc':'fdc'
                     }>
                      <span>{player.name}</span>
                      <span>
                        {
                          team1.goals != null ? 
                          JSON.parse(team1.goals).map((g,i)=>(
                            g.toLowerCase() == player.name.toLowerCase()?
                            <p key={i}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M19.071 4.929a9.936 9.936 0 0 0-7.07-2.938 9.943 9.943 0 0 0-7.072 2.938c-3.899 3.898-3.899 10.243 0 14.142a9.94 9.94 
                                0 0 0 7.073 2.938 9.936 9.936 0 0 0 7.07-2.937c3.899-3.898 3.899-10.243-.001-14.143zM12.181 4h-.359c.061-.001.119-.009.18-.009s.118.008.179.009zm6.062 
                                13H16l-1.258 2.516a7.956 7.956 0 0 1-2.741.493 7.96 7.96 0 0 1-2.746-.494L8 17.01H5.765a7.96 7.96 0 0 1-1.623-3.532L6 11 
                                4.784 8.567a7.936 7.936 0 0 1 1.559-2.224 7.994 7.994 0 0 1 3.22-1.969L12 6l2.438-1.625a8.01 8.01 0 0 1 3.22 1.968 7.94 7.94 0 0 1 
                                1.558 2.221L18 11l1.858 2.478A7.952 7.952 0 0 1 18.243 17z"></path><path d="m8.5 11 1.5 4h4l1.5-4L12 8.5z"></path>
                              </svg>
                            </p>:''
                          ))
                          :''
                        }
                        {
                          team1.yellow_card != null ? 
                          JSON.parse(team1.yellow_card).map((y,i)=>(
                            y.toLowerCase() == player.name.toLowerCase()?
                            <p key={i} className='yellow-card'>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M15 2H6c-1.103 0-2 .897-2 2v16c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V7l-5-5zm-6 8H7V6h2v4zm3 0h-2V6h2v4zm3 0h-2V6h2v4z"></path>
                              </svg>
                            </p>:''
                          ))
                          :''
                        }
                        {
                          team1.red_card != null ? 
                          JSON.parse(team1.yellow_card).map((y,i)=>(
                            y.toLowerCase() == player.name.toLowerCase()?
                            <p key={i} className='red-card'>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M15 2H6c-1.103 0-2 .897-2 2v16c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V7l-5-5zm-6 8H7V6h2v4zm3 0h-2V6h2v4zm3 0h-2V6h2v4z"></path>
                              </svg>
                            </p>:''
                          ))
                          :''
                        }
                      </span>
                    </button>
                    </li>
                ))
              }
            </ul>
        </div>
        {/* team 1 end */}
        {/* team 2 */}
        <div className="team">
          <div className="team-title">
            <strong>{team2.point}</strong>
            <h2 style={{textAlign:'right'}}>{team2.team}</h2>
          </div>
            <ul>
              {
                teamList['team2'].map(player =>(
                  <li key={player.id}>
                    <button  onClick={()=>{
                      if(team2.red_card != null && team2.red_card.includes(player.name)){
                        return null;
                      }
                      setPlayer(player);
                      setModalActive('active');
                     }} 
                    className={
                      team2.red_card != null && team2.red_card.includes(player.name)?
                      'have-red-card':''
                    } 
                    >
                      <span>
                        {
                          team2.goals != null ? 
                          JSON.parse(team2.goals).map((g,i)=>(
                            g.toLowerCase() == player.name.toLowerCase()?
                            <p key={i}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M19.071 4.929a9.936 9.936 0 0 0-7.07-2.938 9.943 9.943 0 0 0-7.072 2.938c-3.899 3.898-3.899 10.243 0 14.142a9.94 9.94 
                                0 0 0 7.073 2.938 9.936 9.936 0 0 0 7.07-2.937c3.899-3.898 3.899-10.243-.001-14.143zM12.181 4h-.359c.061-.001.119-.009.18-.009s.118.008.179.009zm6.062 
                                13H16l-1.258 2.516a7.956 7.956 0 0 1-2.741.493 7.96 7.96 0 0 1-2.746-.494L8 17.01H5.765a7.96 7.96 0 0 1-1.623-3.532L6 11 
                                4.784 8.567a7.936 7.936 0 0 1 1.559-2.224 7.994 7.994 0 0 1 3.22-1.969L12 6l2.438-1.625a8.01 8.01 0 0 1 3.22 1.968 7.94 7.94 0 0 1 
                                1.558 2.221L18 11l1.858 2.478A7.952 7.952 0 0 1 18.243 17z"></path><path d="m8.5 11 1.5 4h4l1.5-4L12 8.5z"></path>
                              </svg>
                            </p>:''
                          ))
                          :''
                        }
                        {
                          team2.yellow_card != null ? 
                          JSON.parse(team2.yellow_card).map((y,i)=>(
                            y.toLowerCase() == player.name.toLowerCase()?
                            <p key={i} className='yellow-card'>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M15 2H6c-1.103 0-2 .897-2 2v16c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V7l-5-5zm-6 8H7V6h2v4zm3 0h-2V6h2v4zm3 0h-2V6h2v4z"></path>
                              </svg>
                            </p>:''
                          ))
                          :''
                        }
                          {
                          team2.red_card != null ? 
                          JSON.parse(team2.red_card).map((y,i)=>(
                            y.toLowerCase() == player.name.toLowerCase()?
                            <p key={i} className='red-card'>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M15 2H6c-1.103 0-2 .897-2 2v16c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V7l-5-5zm-6 8H7V6h2v4zm3 0h-2V6h2v4zm3 0h-2V6h2v4z"></path>
                              </svg>
                            </p>:''
                          ))
                          :''
                        }
                      </span>
                      <span>{player.name}</span>
                    </button>
                  </li>
                ))
              }
            </ul>
        </div>
        {/* team 2 end */}
      </div>
      <button className='ended-match-btn' onClick={()=>setEndMatchModal('active')}>Tugadi</button>
      <div className={`end-match-modal ${endMatchModal}`}>
        <div className="end-match-modal-wrapp">
          <h2>Match</h2>
          <p><strong>{team1.team}</strong><span>vs</span><strong>{team2.team}</strong></p>
          <p>O'z nixoyasiga yetdimi?</p>
          <div className="end-match-modal-btns">
            <button onClick={()=>setEndMatchModal('')}>Yo'q</button>
            <button onClick={()=> {
              let newData1 = team1;
              let newData2 = team2;
              newData1.date = dateNow;
              newData2.date = dateNow;
              newData1.ended = Number(true);
              newData2.ended = Number(true);
              updateDataTeam(newData1.id,newData1);
              updateDataTeam(newData2.id,newData2);
              setEndMatchModal('');
              // setTimeout(() => {
              //   sendMessageToTelegramEndMatch(team1,team2,teams);
              // }, 500);
              
            }}>Xa</button>
          </div>
        </div>
      </div>
    </div>
    <div className={`modal-data ${modalActive}`} onClick={(e)=>{
      if(e.target.className == 'modal-data active'){
        setModalActive('');
        setPlayerAlertModalDisplay('');
        setPlayerAlertModal('');
      }
    }}>
      <div className="modal-data-wrapp">
        <h3>{player.name}</h3>
        <div className="modal-data-flex">
          {/* goal button */}
          <button className='modal-data-goal data-btn' onClick={()=>{
            setPlayerAlert('g');
            setPlayerAlertModalDisplay('display');
            setTimeout(() => {
              setPlayerAlertModal('active');
            }, 100);

          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M19.071 4.929a9.936 9.936 0 0 0-7.07-2.938 9.943 9.943 0 0 0-7.072 2.938c-3.899 3.898-3.899 10.243 0 14.142a9.94 9.94 
              0 0 0 7.073 2.938 9.936 9.936 0 0 0 7.07-2.937c3.899-3.898 3.899-10.243-.001-14.143zM12.181 4h-.359c.061-.001.119-.009.18-.009s.118.008.179.009zm6.062 
              13H16l-1.258 2.516a7.956 7.956 0 0 1-2.741.493 7.96 7.96 0 0 1-2.746-.494L8 17.01H5.765a7.96 7.96 0 0 1-1.623-3.532L6 11 
              4.784 8.567a7.936 7.936 0 0 1 1.559-2.224 7.994 7.994 0 0 1 3.22-1.969L12 6l2.438-1.625a8.01 8.01 0 0 1 3.22 1.968 7.94 7.94 0 0 1 
              1.558 2.221L18 11l1.858 2.478A7.952 7.952 0 0 1 18.243 17z"></path><path d="m8.5 11 1.5 4h4l1.5-4L12 8.5z"></path>
            </svg>
          </button>
          {/* yellow cards button */}
          <button className='modal-data-yellow data-btn' onClick={()=>{
            setPlayerAlert('y');
            setPlayerAlertModalDisplay('display');
            setTimeout(() => {
              setPlayerAlertModal('active');
            }, 100);
            
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M15 2H6c-1.103 0-2 .897-2 2v16c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V7l-5-5zm-6 8H7V6h2v4zm3 0h-2V6h2v4zm3 0h-2V6h2v4z"></path>
            </svg>
          </button>
          {/* red cards button */}
          <button className='modal-data-red data-btn' onClick={()=>{
            setPlayerAlert('r');
            setPlayerAlertModalDisplay('display');
            setTimeout(() => {
              setPlayerAlertModal('active');
            }, 100);
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M15 2H6c-1.103 0-2 .897-2 2v16c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V7l-5-5zm-6 8H7V6h2v4zm3 0h-2V6h2v4zm3 0h-2V6h2v4z"></path>
            </svg>
          </button>
        </div>
        <button className="modal-data-close" onClick={()=>{
          setModalActive('');
          setPlayerAlertModalDisplay('');
          setPlayerAlertModal('');
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
          </svg>
        </button>
        <div className={`modal-alert ${playerAlertModal} ${playerAlertModalDisplay}`}>
          <p><strong>{player.name}</strong> 
            {playerAlert =='g'?' Gol urdimi?':
             playerAlert == 'y' ? ' Sariq kartochka oldimi?':
              'Qizil kartochka oldimi?' }
          </p>
          <div className="modal-alert-btns">
            <button onClick={()=> {
                setPlayerAlertModal('');
                setTimeout(() => {
                setPlayerAlertModalDisplay('');
              }, 500);
            }}>Y'oq</button>
            <button onClick={()=>{
              if(team1.team.toLowerCase() == player.team.toLowerCase()){
                let newData = team1;
                let playerNewData = player;
                // обновляем все данные
                reqUpdateData(playerAlert,newData,player,playerNewData,team1.id);
                // отправляем сообщения в телеграм 
                sendMessageToTelegram(playerAlert,newData,team2,player)
              }else if(team2.team.toLowerCase() == player.team.toLowerCase()){
                let newData = team2;
                let playerNewData = player;
                // обновляем все данные
                reqUpdateData(playerAlert,newData,player,playerNewData,team2.id);
                 // отправляем сообщения в телеграм 
                 sendMessageToTelegram(playerAlert,team1,newData,player)
              }else return;
            }}>Xa</button>
          </div>
        </div>
      </div>
    </div>
    { Boolean(team1.ended) && Boolean(team2.ended) ?
      <div className={`admin-modal ${seeProtocol?'see':''}`}>
        <BackBtn />
        <p>Ushbu uchrashuv o'z nixoyasiga yetgan</p>
        <p>agar biror bir narsa xato ketgan bo'lsa </p>
        <p><strong>Fariddun brat</strong> ga murojat qiling </p>
        <p>Xurmat bilan <strong>Fariddun</strong></p>
        <button className={`protocol-see-btn ${seeProtocol?'see':''}`} onClick={()=>seeProtocol?setSeeProtocol(false):setSeeProtocol(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/>
            </svg>
        </button>
      </div>
      :''
    }
    </> :
    <h1>Подожди блять загрузка...</h1>
  }
    </> 
  )
}
