import { useEffect, useState } from 'react';
import axios from 'axios';
import { Routes,Route, useNavigate} from 'react-router-dom';
import {turs } from './data';
import Home from './Home';
import { Tur } from './Tur';
import { Match } from './Match';
import { Auth } from './Auth';
import Cookies from 'js-cookie';
import { NotFound } from './NotFound';
import { Table } from './Table';
import { Diler } from './Diler';
function App() {
  const navigate = useNavigate();
  const authCookie = Cookies.get('auth');
  const dilerCookie = Cookies.get('diler');
  useEffect(() => {
    if (!authCookie && !dilerCookie) {
      navigate('/auth');
    }else if(dilerCookie){
      navigate('/diler/'+dilerCookie);
    } else return;
  }, [navigate]);
  
  return (
    <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path='/tur/:id' element={<Tur/>}/>
       <Route path='/match/:id' element={<Match/>}/>
       <Route path='/auth' element={<Auth/>}/>
       <Route path='/table' element={<Table/>}/>
       <Route path='/diler/:id' element={<Diler/>}/>
       <Route path='*' element={<NotFound/>}/>
    </Routes>
  )
}

export default App;
