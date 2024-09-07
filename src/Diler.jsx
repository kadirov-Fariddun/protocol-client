import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import man from './img/man.png';
import fire from './img/fire.gif';
import arrowBottom from './img/1.png';

export const Diler = () => {
    const {id} = useParams();
    const [teams,setTeams] = useState([]);
    // const [team,setTeam] = useState({});
    const [players,setPlayers] = useState([]);
    const [newDataPlayers,setNewDataPlayers] = useState([]);
    const [diler,setDiler] = useState(0);
    const [transferCount] = useState(4);
    const [transferJoin,setTransferJoin] = useState([]);
    const [transferOut,setTransferOut] = useState([]);
    const [transferOutAll,setTransferOutAll] = useState([]);
    const [firstname,setFirstname] = useState('');
    const [lastname,setLastname] = useState('');
    const [age,setAge] = useState('');
    const [topFixed,setTopFixed] = useState('');
    const [transferModal,setTransferModal] = useState('');
    const [namesOutPlayers,setNamesOutPlayers] =  useState([]);
    const [namesJoinPlayers,setNamesJoinPlayers] =  useState([]);
    const [alertDelete,setAlertDelete] = useState(false);
    const [alertTransfer,setAlertTransfer] = useState(false);
    const [outOtherTeam,setOutOtherTeam] = useState(false);
    // const [closeTransferHistory,setCloseTransferHistory] = useState(false);
    // const []
    const URL = 'http://45.84.225.47:5001/api/';
    // data футбалиста который уходит 
    // const [dataOutFootballer,setDataOutFootballer] = useState({});
    // // имя футболиста который присоединяется
    // const [firstnameJoinFootballer,setFirstnameJoinFootballer] = useState('');
    // // фамилия футболиста который присоединяется
    // const [lastnameJoinFootballer,setLastnameJoinFootballer] = useState('');
    // // возраст футболиста который присоединяется
    // const [ageJoinFootballer,setAgeJoinFootballer] = useState(0);
    const getDiler = async () => {
        try {
            const resDiler = await axios.get('http://45.84.225.47:5001/api/transfer/diler/' + id);
            
            const dataD = resDiler.data[0].team_num;
            // Обновляем состояние только если оно изменилось
            return {dilerNum:dataD};
    
        } catch (e) {
            console.log('ошибка при получении обьекта: ', e.message);
            throw e;
        }
    };
    const getTeams = async () => {
        try {
            const res = await axios.get('http://45.84.225.47:5001/api/teams/');
            
            // Обновляем состояние только если оно изменилось
            return res.data;
    
        } catch (e) {
            console.log('ошибка при получении обьекта: ', e.message);
            throw e;
        }
    };
    const getPlayers = async () => {
        try{
            const res = await axios.get('http://45.84.225.47:5001/api/players/');
            return res.data
        } catch(e){
            console.log('ошибка при получении обьекта: ',e.message);
            throw e;
        }
    };
    const getJoinTransfer = async () => {
        const res = await axios.get('http://45.84.225.47:5001/api/transfer/transfer-join/');
        try{
            const data = res.data;
            if(localStorage.getItem('team-name')){
                const team = localStorage.getItem('team-name')
                const transfers = data.filter(t=>t.team.toLowerCase()===team.toLowerCase());
                let names = transfers.map(player=>player.name);
                setNamesJoinPlayers(names);
                return transfers;
            }
        }
        catch(e){
            console.log('ошибка при получении обьекта: ',e.message);
            throw e;
        }
    };
    const getOutTransfer = async () => {
        const res = await axios.get('http://45.84.225.47:5001/api/transfer/transfer-out/');
        try{
            const data = res.data;
            if(localStorage.getItem('team-name')){
                const team = localStorage.getItem('team-name')
                const transfers = data.filter(t=>t.team.toLowerCase()===team.toLowerCase());
              
                let names = transfers.map(player=>player.name);
                setNamesOutPlayers(names)
                return transfers;
            }
        }
        catch(e){
            console.log('ошибка при получении обьекта: ',e.message);
            throw e;
        }
    };
    // получаем всех футболистов 
    const getAllOutTransfer = async () => {
        const res = await axios.get('http://45.84.225.47:5001/api/transfer/transfer-out/');
        try{
            const data = res.data;
            return data;
        }
        catch(e){
            console.log('ошибка при получении обьекта: ',e.message);
            throw e;
        }
    };

    //сохраняем данные приходящего футболиста 

    const getCurrentDateTime = () => {
        const now = new Date();
    
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // месяцы начинаются с 0
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
    
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    useEffect(()=>{
        getDiler()
        .then(res=>{
            setDiler(res.dilerNum);
        })
        .catch(e=>console.log(e.message));
        getTeams()
        .then(res=>{
            setTeams(res);
        })
        .catch(e=>console.log(e.message));
        getPlayers()
        .then(res=>{
            setPlayers(res);
        })
        .catch(e=>console.log(e.message));
         // получаем данные уходящих футболистов
         getOutTransfer()
         .then(res=>{
             setTransferOut(res);
         })
         .catch(e=>console.log(e.message));
         // получаем данные уходящих футболистов
         getAllOutTransfer()
         .then(res=>{
             setTransferOutAll(res);
         })
         .catch(e=>console.log(e.message));
         // получаем данные приходящих футболистов
         getJoinTransfer(newData)
         .then(res=>{
             setTransferJoin(res);
         })
         .catch(e=>console.log(e.message));
    },[alertDelete,teams]);

    let team = {};
    if(teams.length !== 0){
        team = teams&&teams.find(team=>team.team_num === diler);   
          // Проверка, что команда найдена
        if (team && 'team' in team) {
            localStorage.setItem('team-name', team.team);
        } else {
            console.warn('Команда не найдена!');
        }
    }
    
   
    let newData = [];
    // let transferOut = [];
    // let transferJoin = [];
    if(localStorage.getItem('team-name')){
        const team = localStorage.getItem('team-name');
        newData = players.filter(player=>player.team.toLowerCase()===team.toLowerCase());
        newData = newData.filter(player=>player.name.toLowerCase()!=='avto goal');
        newData = newData.filter(obj => !obj.name.includes('trener'));
    }else{
        if(players.length !== 0 && 'team' in team){
            newData = players.filter(player=>player.team.toLowerCase()===team.team.toLowerCase());
            newData = newData.filter(player=>player.name.toLowerCase()!=='avto goal');
            newData = newData.filter(obj => !obj.name.includes('trener'));
        }
    };

    
   
       // получаем данные уходяшего футболиста 
       const getDataOutPlayer = async (url,id)=>{
        try{
            const res = await axios.get(url+id);
            return res.data;
        }
        catch(e){
            console.log('Ощибка при получении данных уходящего футболиста: ',e.message);
            throw e;
        }
    }
    // сохраняем данные уходяшего футболиста 
    const saveDataOutPlayer = async (url,data)=>{
        try{
            const res = axios.post(url,data);
             // получаем данные уходящих футболистов
            getOutTransfer(newData)
            .then(res=>{
                setTransferOut(res);
            })
            .catch(e=>console.log(e.message));
            // получаем данные приходящих футболистов
            getJoinTransfer(newData)
            .then(res=>{
                setTransferJoin(res);
            })
            .catch(e=>console.log(e.message));
            return console.log('данные успешно сохранили: ',res);
        }
        catch(e){
            console.log('Ощибка при сохранении данных уходящего футболиста: ',e.message);
            throw e;
        }
    }
    // сохраняем данные приходящего футболиста 
    const saveDataJoinPlayer = async (url,data)=>{
        try{
            const res = axios.post(url,data);
             // получаем данные уходящих футболистов
            getOutTransfer(newData)
            .then(res=>{
                setTransferOut(res);
            })
            .catch(e=>console.log(e.message));
            // получаем данные приходящих футболистов
            getJoinTransfer(newData)
            .then(res=>{
                setTransferJoin(res);
                
            })
            .catch(e=>console.log(e.message));
            return console.log('данные успешно сохранили: ',res);
        }
        catch(e){
            console.log('Ощибка при сохранении данных уходящего футболиста: ',e.message);
            throw e;
        }
    }
    

    // изменяем данные приходяшего или уходящего футболиста
    const deleteDataOutOrJoinPlayer = (URL,id) => {
        try{
            const res = axios.delete(URL+id);
            console.log('Данные успешно удалились: ',res.data);
            return res.data
            }
        catch(e){
            console.error('Данные не удалились:', e.message);
            throw e; 
        }
    }
     
    const putDataOutPlayerOnJoinPlayer = async (URL,id,data)=>{
        try{
            const res = await axios.put(URL+id,data);
            console.log('Данные успешно обновились: ',res.data);
            return res.data;
        }catch(e){
            console.log('ощибка при изменении данных футболиста трансфер: ',e.message);
            
        }
    }
    const updateDataJoinPlayer = (URL,id,updateData) =>{
        try{
            const res = axios.put(URL+id,updateData);
            console.log('успешно обновмлм данные УХ футбюолиста: ',res.data);
            return res.data;
        }catch(e){
            console.log('Ошибка при обновлении данных УХ футболиста: ',e.message);
            throw e;
        }
    }
    // сохраняем игрока 
    const saveJoinPlayerInTeam = async (URL,data) => {
        try{
            const res = await axios.post(URL,data);
            console.log('Успешно сохранили данные игрока: ',res.data);
            return res.data
        }catch(e){
            console.log('Ощибка при сохранении нового игрока: ',e.message);
            throw e;
        }
    }

    const sendTransferInTelegram = async (dataOutPlayer, dataJoinPlayer) => {
        const token = '5998034134:AAGaoApUgNL8HMsHMIpxfN2EtV2yOYodUK8';
        const chat_id = '@mpliga'; // Убедитесь, что это корректный chat_id
        const URL = `https://api.telegram.org/bot${token}/sendPhoto`; // Исправлено на /sendPhoto
        if (!dataOutPlayer || !dataJoinPlayer) {
            console.error('Ошибка: Данные для отправки отсутствуют.');
            return;
        }
        // Формируем сообщение
      let message ='#Rasman\n';
       message+='#transferWindow\n';
       message+='#HereWeGo\n'; 
       message+= `<b>${dataOutPlayer.team}</b> jamoasi yangi transfer elon qildi\n`;
       message+= `<b>Ketgan futbolchi: </b>\n`;
       message +=`isim: ${dataOutPlayer.name} \n`;
       message +=`gollar: ${dataOutPlayer.goals}\n`;
       message+= `yoshi: ${dataOutPlayer.age}\n`;
       message +=`<b>Qo\'shilgan futbolchi: </b>\n`;
       message+= `isim: ${dataJoinPlayer.name} \n`;
      message+=  `yoshi: ${dataJoinPlayer.age}\n\n\n`;
    
      message +='Reaksiya qoldirishni unutmang\n\n';
    
      message+='❤️   🤔   👍   👎   🔥   🤤   ✅';
    
        try {
            // Отправляем запрос
            const response = await axios.post(URL, {
                chat_id: chat_id,
                photo: 'https://icdn.caughtoffside.com/wp-content/uploads/2019/05/transfer-news-yellow.jpg', // Укажите URL до фотографии
                caption: message,
                parse_mode: 'HTML',
            });
    
            console.log("Сообщение отправлено:", response.data);
        } catch (error) {
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
        }
    };
    
    
    
  return (
    <>
    <div className="diler">
        <div className="container">
            <div className="diler-head">
                <div className="diler-head-title">
                    <h1>{team.team}</h1>
                    <p><span>{(transferJoin&&transferOut)&& transferCount - transferJoin.length}</span> nafar transfer qilishingiz mumkun</p>
                </div>
                <strong>Dileri</strong>
            </div>
            { (transferJoin&&transferOut)&&transferCount - transferJoin.length !== 0 ?
            <button className="transfer-btn" onClick={()=>{
                setTransferModal('active');
                setTimeout(() => {
                    setTransferModal('active block');
                }, 500);
            }}>
                <span> Transfer qilish</span>
                <img src={fire} alt="fire" width={55} />
            </button>:''
            }
            <div className="transfer-team-list">
                <h2>Jamoa Ro'yxati</h2>
                <ul>
                    {
                       newData&&newData.map((player,i)=>(
                            <li key={player.id} className={namesOutPlayers&&namesOutPlayers.includes(player.name)?'out-player':''}>
                                <span>{i+1}</span> 
                                <span>
                                    {
                                        namesOutPlayers&&namesOutPlayers.includes(player.name)?
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill='red'>
                                            <path d="M10 11H7.101l.001-.009a4.956 4.956 0 0 1 .752-1.787 5.054 5.054 0 0 1 2.2-1.811c.302-.128.617-.226.938-.291a5.078 5.078 0 0 1 
                                            2.018 0 4.978 4.978 0 0 1 2.525 1.361l1.416-1.412a7.036 7.036 0 0 0-2.224-1.501 6.921 6.921 0 0 0-1.315-.408 7.079 7.079 0 0 
                                            0-2.819 0 6.94 6.94 0 0 0-1.316.409 7.04 7.04 0 0 0-3.08 2.534 6.978 6.978 0 0 0-1.054 2.505c-.028.135-.043.273-.063.41H2l4 4 
                                            4-4zm4 2h2.899l-.001.008a4.976 4.976 0 0 1-2.103 3.138 4.943 4.943 0 0 1-1.787.752 5.073 5.073 0 0 1-2.017 0 4.956 4.956 0 0 
                                            1-1.787-.752 5.072 5.072 0 0 1-.74-.61L7.05 16.95a7.032 7.032 0 0 0 2.225 1.5c.424.18.867.317 1.315.408a7.07 7.07 0 0 0 2.818 0 
                                            7.031 7.031 0 0 0 4.395-2.945 6.974 6.974 0 0 0 1.053-2.503c.027-.135.043-.273.063-.41H22l-4-4-4 4z">
                                            </path>
                                        </svg>:''
                                    }
                                    
                                    {player.name}
                                    {
                                        namesJoinPlayers&&namesJoinPlayers.includes(player.name)?
                                        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24" fill='#22c445'>
                                            <path d="M4.5 8.552c0 1.995 1.505 3.5 3.5 3.5s3.5-1.505 3.5-3.5-1.505-3.5-3.5-3.5-3.5 1.505-3.5 3.5zM19 
                                            8h-2v3h-3v2h3v3h2v-3h3v-2h-3zM4 19h10v-1c0-2.757-2.243-5-5-5H7c-2.757 0-5 2.243-5 5v1h2z">  
                                            </path>
                                        </svg>:''
                                    }
                                </span>
                                <span>
                                    {player.goals}
                                    {
                                        player.goals >= 5?
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <path d="M12 22c5.514 0 10-4.486 10-10S17.514 2 12 2 2 6.486 2 12s4.486 10 10 10zm3.493-13a1.494 
                                            1.494 0 1 1-.001 2.987A1.494 1.494 0 0 1 15.493 9zm-4.301 6.919a4.108 4.108 0 0 0 
                                            1.616 0c.253-.052.505-.131.75-.233.234-.1.464-.224.679-.368.208-.142.407-.306.591-.489.183-.182.347-.381.489-.592l1.658 1.117a6.027 6.027 0 0 
                                            1-1.619 1.621 6.003 6.003 0 0 1-2.149.904 6.116 6.116 0 0 1-2.414-.001 5.919 5.919 0 0 1-2.148-.903 6.078 6.078 0 0 
                                            1-1.621-1.622l1.658-1.117c.143.211.307.41.488.59a3.988 3.988 0 0 0 2.022 1.093zM8.5 9a1.5 1.5 0 1 1-.001 3.001A1.5 1.5 0 0 1 8.5 9z">
                                            </path>
                                        </svg>:''
                                    }
                                </span>
                                <span className='yellow'>
                                    {player.yellow_cards}
                                </span>
                                <span className='red'>
                                    {player.red_cards}
                                </span>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="transfer-draft">
             <h2>Transfer chernovik</h2>
             <ul>
                {newData.length > 11?
                (transferJoin&&transferOut)&&transferJoin.length === 0 && transferOut.length === 0?
                        'Hali transfer amalga oshirmadingiz':
                        transferOut && transferOut.map(player=>(
                            <li key={player.id} className={player.ended?'transfer-ended':''}>
                                <span>{player.name}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24">
                                    <path d="m15 12 5-4-5-4v2.999H2v2h13zm7 3H9v-3l-5 4 5 4v-3h13z"></path>
                                </svg>
                                <span>
                                    {transferJoin && transferJoin.map(p=>(
                                        player.transfer_time===p.transfer_time?p.name:''
                                    ))}
                                </span>
                                {
                                    player.ended?
                                    'Bu transfer amalga oshgan!':
                                    <div className="transfer-verify-btns">
                                        <button className='transfer-announce' onClick={()=>{
                                        const oPRId = newData.find(p=>p.name===player.name);
                                        const oPId = transferOut.find(p=>p.name===player.name);
                                        const jPId = transferJoin.find(p=>p.transfer_time===player.transfer_time);
                                        setAlertTransfer(true);
                                        localStorage.setItem('out-player',player.name);
                                        localStorage.setItem('join-player',jPId.name);
                                        // сохраняем id
                                        localStorage.setItem('out-player-real-id',oPRId.id);
                                        localStorage.setItem('out-player-id',oPId.id);
                                        localStorage.setItem('join-player-id',jPId.id);
                                        
                                        }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24">
                                            <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path>
                                        </svg>
                                        </button>
                                        <button className="transfer-refusal" onClick={()=>{
                                        const oPId = player.id;
                                        const jPId = transferJoin.find(p=>p.transfer_time===player.transfer_time);
                                        setAlertDelete(true);
                                        localStorage.setItem('out-player',player.name);
                                        localStorage.setItem('join-player',jPId.name);
                                        // сохраняем id
                                        localStorage.setItem('out-player-id',oPId);
                                        localStorage.setItem('join-player-id',jPId.id);
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24">
                                                <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                }
                               
                            </li>
                        )):''
                       
                }
             </ul>
            </div>
            {/* transfer history */}
            {/* <div className="transfer-history">
                    {(transferJoin&&transferOut)&&transferJoin.length === 0 && transferOut.length === 0?
                        'Hali transfer amalga oshirmadingiz':
                        <ul>
                            <li>
                                <h4>Jamoadan ketganlar</h4>
                                {
                                    transferOut&&transferOut.map(t=>(
                                        <span key={t.id}>{t.name}</span>
                                    ))
                                }
                            </li>
                            <li>
                                <h4>Jamoaga qushilganlar</h4>
                                {
                                    transferJoin&&transferJoin.map(t=>(
                                        <span key={t.id}>{t.name}</span>
                                    ))
                                }
                            </li>
                        </ul>
                       }
                
            </div> */}
        </div>
    </div>
    <div className={`transfer-modal ${transferModal}`}>
        <div className={`transfer-modal-wrapper ${topFixed} ${transferModal}`}>
            <button className="close-modal" onClick={()=>{
                setTransferModal('active');
                setTimeout(() => {
                    setTransferModal('');
                }, 500);
            }}>&times;</button>
            <div className="container">
                <h3>Futbolchi malumotlarini kirgizing!</h3>
                <div className={`transfer-modal-wrapper-flex`}>
                    <span className='top-arrow' onClick={()=>{
                        topFixed === ''?
                        setTopFixed('top'):
                        setTopFixed('');
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="m6.293 11.293 1.414 1.414L12 8.414l4.293 4.293 1.414-1.414L12 5.586z"></path>
                            <path d="m6.293 16.293 1.414 1.414L12 13.414l4.293 4.293 1.414-1.414L12 10.586z"></path>
                        </svg>
                    </span>
                    <form onSubmit={(e)=>{
                      e.preventDefault();

                      let firstname = e.target.querySelector('[name="firstname"]').value;
                      let lastname = e.target.querySelector('[name="lastname"]').value;
                      let age = e.target.querySelector('[name="age"]').value;
                      let outFootballerId = e.target.querySelector('[name="out-footballer"]').value;
                      
                        const dataJoinPlayer = {
                            name: `${lastname} ${firstname}`,
                            team: team.team,
                            transfer_time: getCurrentDateTime(),
                            age: age	
                        };
                        if(outOtherTeam){
                            let outOtherFootballerId = e.target.querySelector('[name="out-footballer-select-tojoin-team"]').value;
                            let dataOutOtherPlayer = transferOutAll.find(p=>p.id.toString()===outOtherFootballerId.toString());
                            dataJoinPlayer.name = dataOutOtherPlayer.name;
                            dataJoinPlayer.team = team.team;
                            dataJoinPlayer.transfer_time = getCurrentDateTime();
                            dataJoinPlayer.age = dataOutOtherPlayer.age;
                        }
                        
                        const dataOutPlayer = newData.find(p => p.id.toString() === outFootballerId.toString());
                        const newDataOutPlayer = {
                            name: dataOutPlayer.name,
                            team: dataOutPlayer.team,
                            transfer_time: getCurrentDateTime(),
                            goals: dataOutPlayer.goals,
                            yellow_cards: dataOutPlayer.yellow_cards,
                            red_cards: dataOutPlayer.red_cards,
                            age: dataOutPlayer.age,
                        };
                        
                        Promise.all([
                            saveDataJoinPlayer(URL + 'transfer/transfer-join', dataJoinPlayer),
                            saveDataOutPlayer(URL + 'transfer/transfer-out', newDataOutPlayer)
                        ])
                        .then(() => {
                            // Перезагрузка страницы после успешного выполнения обоих запросов
                            window.location.reload();
                        })
                        .catch(error => {
                            // Обработка ошибки, если один из запросов не удался
                            console.error('Ошибка при выполнении запросов:', error);
                            alert('Произошла ошибка. Пожалуйста, попробуйте еще раз.');
                        });
                   
                        
                    }}>
                        {outOtherTeam?
                        <>
                        <input type="text" name='firstname' placeholder='Isim' maxLength={30} onChange={(e)=>setFirstname(e.target.value)}  />
                        <input type="text" name='lastname'  placeholder='Familiya' maxLength={30}  onChange={(e)=>setLastname(e.target.value)}  />
                        <input type="number" name='age' placeholder='Yosh' min={15} max={50} maxLength={2}  onChange={(e)=> setAge(e.target.value)} />
                        </>:
                        <>
                        <input type="text" name='firstname' placeholder='Isim' maxLength={30} onChange={(e)=>setFirstname(e.target.value)} required />
                        <input type="text" name='lastname'  placeholder='Familiya' maxLength={30}  onChange={(e)=>setLastname(e.target.value)} required />
                        <input type="number" name='age' placeholder='Yosh' min={15} max={50} maxLength={2}  onChange={(e)=> setAge(e.target.value)} required/>
                        </>
                        }
                        <div className='select-out-player'>
                            <span className='select-title'>Qaysi futbolchi o'rniga?</span>
                            <select name='out-footballer' required>
                            <option value="" disabled selected hidden>Futbolchini tanlang</option>
                                {newData.map(player => (
                                    namesOutPlayers && namesOutPlayers.includes(player.name) ? (
                                        <option value={player.id} key={player.id} disabled>{player.name}</option>
                                    ) : (
                                        <option value={player.id} key={player.id}>{player.name}</option>
                                    )
                                ))}
                            </select>
                        </div>
                        <label className='check-other-team-player'>
                            <input type="checkbox" className='check-other-team-player-input' onChange={(e)=>{
                                if(e.target.checked){
                                    setOutOtherTeam(true);
                                }else{
                                    setOutOtherTeam(false);
                                }
                            }}/>
                            <span>Boshqa jamoadan ketgan futbolchi</span>
                        </label>
                        {
                        outOtherTeam ?
                        transferOutAll.length !== 0?
                        <select name='out-footballer-select-tojoin-team' required>
                            <option value="" disabled selected hidden>Kerakli futbolchini tanlang</option>
                                {transferOutAll.map(player => (
                                    player.ended?
                                    player.team.toLowerCase() === localStorage.getItem('team-name').toLowerCase() ? (
                                        <option key={player.id} disabled>{player.name}</option>
                                    ) : (
                                        <option value={player.id} key={player.id}>{player.name}</option>
                                    ):''
                                ))}
                        </select>:<span style={{marginBottom:'20px'}}>Futbolchilar y'oq</span>
                        :''
                        

                        }
                        <button type='submit'>Saqlash</button>
                    </form>
                    <div className="transfer-man-wrapper">
                        <span className='transfer-man-wrapper-firstname'>
                            {firstname}
                            {
                                firstname != ''?
                                <img src={arrowBottom} alt="arrow" height={70} width={70} />:''
                            }
                            
                        </span>
                        <span className='transfer-man-wrapper-lastname'>
                            {lastname}
                            {
                                lastname != ''?
                                <img src={arrowBottom} alt="arrow" height={70} width={70} />:''
                            }
                        </span>
                        <span className='transfer-man-wrapper-age'>
                            {
                                age != ''?
                                <img src={arrowBottom} alt="arrow" height={70} width={70} />:''
                            }
                            {age}
                        </span>
                        <img src={man} alt="chelovek" height={600}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {
        alertDelete||alertTransfer?
        <div className={`alert-delete`}>
            <div className="alert-delete-wrapper">
                <h3>{alertTransfer?'Rasmiylashtirish!':'Bekor qilish!'}</h3>
                    <li>
                        <span className='alert-delete-out-player'>{localStorage.getItem('out-player')}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24">
                            <path d="m15 12 5-4-5-4v2.999H2v2h13zm7 3H9v-3l-5 4 5 4v-3h13z"></path>
                        </svg>
                        <span className='alert-delete-join-player'>{localStorage.getItem('join-player')}</span>
                    </li>
                <h3>Siz rostanham ushbu <br/>transferni 
                {alertTransfer?' rasmiy elon qilmoqchimisiz?':"o\'chirib yubormoqchimisiz?"}</h3>
                <div className="alert-delete-btns">
                    <button onClick={
                    //     ()=>{
                    //     localStorage.removeItem('out-player');
                    //     localStorage.removeItem('join-player');
                    //     const oPId = localStorage.getItem('out-player-id');
                    //     const jPId = localStorage.getItem('join-player-id');
                    //     deleteDataOutOrJoinPlayer(`${URL}transfer/transfer-join/`+jPId);
                    //     deleteDataOutOrJoinPlayer(`${URL}transfer/transfer-out/`+oPId);
                    //     localStorage.removeItem('out-player-id');
                    //     localStorage.removeItem('join-player-id');
                    //     setAlertDelete(false);
                        
                    // }
                    async () => {
                        localStorage.removeItem('out-player');
                        localStorage.removeItem('join-player');
                        
                        const oPId = localStorage.getItem('out-player-id');
                        const oPRId = localStorage.getItem('out-player-real-id');
                        const jPId = localStorage.getItem('join-player-id');
                        if(!alertTransfer){
                            try {
                                // Выполняем оба запроса параллельно и ждем их завершения
                                await Promise.all([
                                    deleteDataOutOrJoinPlayer(`${URL}transfer/transfer-join/` + jPId),
                                    deleteDataOutOrJoinPlayer(`${URL}transfer/transfer-out/` + oPId)
                                ]);
                        
                                // Если оба запроса прошли успешно
                                localStorage.removeItem('out-player-id');
                                localStorage.removeItem('join-player-id');
                                setAlertDelete(false);
                        
                                // Перезагружаем страницу
                                window.location.reload();
                            } catch (error) {
                                console.error('Ошибка при удалении данных:', error);
                                // Здесь можно обработать ошибку, например, показать уведомление пользователю
                            }
                        }else{
                            // if(newData.length > 11){
                                const joinPlayer = transferJoin.find(p=>p.id.toString()===jPId.toString());
                                console.log(joinPlayer);
                                
                                const updateData = {
                                    name:joinPlayer.name,
                                    goals:0,
                                    yellow_cards:0,
                                    red_cards:0,
                                    age:joinPlayer.age
                                };
                                const outPlayerData = newData.find(p=>p.id.toString()===oPRId.toString());
                                const updateData2 = {
                                    ended:true
                                };
                                console.log(outPlayerData);
                                
                                try {
                                    // Выполняем оба запроса параллельно и ждем их завершения
                                    await Promise.all([
                                        putDataOutPlayerOnJoinPlayer(`${URL}players/transfer/`,oPRId,updateData),
                                        updateDataJoinPlayer(`${URL}transfer/transfer-out/`,oPId,updateData2),
                                        sendTransferInTelegram(outPlayerData,updateData)
                                    ]);
                            
                                    // Если оба запроса прошли успешно
                                    localStorage.removeItem('out-player-id');
                                    localStorage.removeItem('join-player-id');
                                    localStorage.removeItem('out-player-real-id');
                                    setAlertTransfer(false);
                                    // Перезагружаем страницу
                                    window.location.reload();
                                } catch (error) {
                                    console.error('Ошибка при удалении данных:', error);
                                    // Здесь можно обработать ошибку, например, показать уведомление пользователю
                                }
                            // }else{
                            //     const joinPlayer = transferJoin.find(p=>p.id.toString()===jPId.toString());
                                
                            //     const updateData = {
                            //         name:joinPlayer.name,
                            //         team:joinPlayer.team,
                            //         goals:0,
                            //         yellow_cards:0,
                            //         red_cards:0,
                            //         age:joinPlayer.age
                            //     };
                            //     const updateData2 = {
                            //         ended:true
                            //     };
                                
                                
                            //     try {
                            //         // Выполняем оба запроса параллельно и ждем их завершения
                            //         await Promise.all([
                            //             // putDataOutPlayerOnJoinPlayer(`${URL}players/transfer/`,oPRId,updateData)
                            //             saveJoinPlayerInTeam(URL+'players/transfer',updateData),
                            //             updateDataJoinPlayer(`${URL}transfer/transfer-join/`,joinPlayer.id,updateData2)
                            //         ]);
                            
                            //         // Если оба запроса прошли успешно
                            //         localStorage.removeItem('out-player-id');
                            //         localStorage.removeItem('join-player-id');
                            //         localStorage.removeItem('out-player-real-id');
                            //         // Перезагружаем страницу
                            //         window.location.reload();
                            //     } catch (error) {
                            //         console.error('Ошибка при удалении данных:', error);
                            //         // Здесь можно обработать ошибку, например, показать уведомление пользователю
                            //     }
                            // }
                            
                           
                        }
                        
                    }
                    }>Xa</button>
                    <button onClick={()=>{
                        setAlertDelete(false);
                        setAlertTransfer(false);
                        localStorage.removeItem('out-player');
                        localStorage.removeItem('join-player');
                        localStorage.removeItem('out-player-id');
                        localStorage.removeItem('join-player-id');
                        localStorage.removeItem('out-player-real-id');
                    }}>Yo'q</button>
                </div>
            </div>
        </div>:''
    }
    </>
  )
}
