import { useEffect, useState } from 'react';
import axios from 'axios';
import { Routes,Route} from 'react-router-dom';
import {turs } from './data';
import Home from './Home';
import { Tur } from './Tur';
import { Match } from './Match';
function App() {
  return (
    <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path='/tur/:id' element={<Tur/>}/>
       <Route path='/match/:id' element={<Match/>}/>
    </Routes>
  )
}

export default App
