import React from 'react';
import Header from './App/Header';
import { createRoot } from 'react-dom/client';
import Queze from './App/queze';
import School_choose from './App/School_chose';
import MakeQueze from './App/MakeQueze';
import A_queze from './App/A_queze';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
  <div className='Main_root'>
    <BrowserRouter>
      <Header></Header>
      <div className='line'></div>
      <Routes>
        <Route path='/queze' element={<Queze />}></Route>
        <Route path='/' element={<School_choose />}></Route>
        <Route path='/makequeze' element={<MakeQueze/>}></Route>
        <Route path='/a_queze' element={<A_queze/>}></Route>
      </Routes>      
    </BrowserRouter>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
