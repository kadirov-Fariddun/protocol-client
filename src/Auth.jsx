import axios from 'axios';
import Cookies from  'js-cookie';
import md5 from 'md5';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const Auth = () => {
  const [dillers,setDillers] = useState([]);
  const [diller,setDiller] = useState([]);
   // получаем User
   const getUser = async () => {
    const URL = `http://45.84.225.47:5001/api/user/`;
    let data = [];
    try{
      const response = await axios.get(URL);
      data = response.data[0];
      return data;
    }
    catch (e) {
      console.error('Ошибка получения данных:', e.message);
      throw e;
    }
  };
   // получаем User
  //  const getTarnsferDillers = async () => {
  //   const URL = `http://45.84.225.47:5001/api/transfer/dilers/`;
  //   let data = [];
  //   try{
  //     const response = await axios.get(URL);
  //     data = response.data;
  //     return data;
  //   }
  //   catch (e) {
  //     console.error('Ошибка получения данных:', e.message);
  //     throw e;
  //   }
  // };
  const [user,setUser] = useState({});
  const [see,setSee] = useState(false);
  const [load,setLoad] = useState(false);
  const [inputVal,setInputVal] = useState('');
  useEffect(()=> {
    getUser()
    .then(res => setUser(res))
    .catch(e=>{
      console.log('Ощибка при получении пользователя: ',e.message);
      throw e;
    })
    // getTarnsferDillers()
    // .then(res => setDillers(res))
    // .catch(e=>{
    //   console.log('Ощибка при получении пользователя: ',e.message);
    //   throw e;
    // })
  },[]);
  const [errorPass,setErrorPass] = useState(false);
  const navigate =  useNavigate(); 

  return (
    <div className="form">
        <form onSubmit={(e)=>{
          e.preventDefault();
        }}>
          <h1>Admin</h1>
          <label>
            <input type={see?'text':'password'} onChange={(e)=>setInputVal(e.target.value)} className='pass' placeholder='Parolni kiriting!' required/>
            <button className={`pass-eye ${see?'see':''}`} onClick={()=>see?setSee(false):setSee(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/>
              </svg>
            </button>
          </label>
          {errorPass ? <span>Parol noto'g'ri jiyan!</span>:''}
          {load ? <span style={{color:'green',}}>Yuklanmoqda...</span>:''}
          <button className='form-btn' onClick={()=>{
            const inputPass = md5(inputVal);
            const userPass = user.password;
           
            if(inputPass === userPass){
              setLoad(true);
              Cookies.set('auth','admin',{ expires: 14});
              navigate('/');
            }
            else{
              return setErrorPass(true);
              // setTimeout(() => {
              //   dillers.forEach(diler => {
              //     if(inputPass === diler.diler_code){
              //       Cookies.set('diler',diler.id,{ expires: 7});
              //       return navigate('/diler/'+diler.id);
              //     }else{
              //         setLoad(false);
              //         return setErrorPass(true);
              //     }
              //   });
              // }, 1000);
            }
            
          }}>Kirish</button>
        </form>
    </div>
  )
}
