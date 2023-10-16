import React from 'react';
import ReactDOM from 'react-dom';
import Main from './App/Main';
import Queze from './App/queze';
import Signup_login from './App/Signup_login';
import School_choose from './App/School_chose';
import Login from './App/Login';
import MakeQueze from './App/MakeQueze';
import Header from './App/Header';

// import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route,useNavigate } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { createRoot } from 'react-dom/client';




const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
  // <React>
    <CookiesProvider>
      {/* <div className='Icon'></div> */}
      
      <div className='Main_root'>
        <Header></Header>
        <div className='line'></div>
        <BrowserRouter>
          <Routes>
            <Route path='/'   element={<Main/>}></Route>
            <Route path='/queze' element={<Queze />}></Route>
            <Route path='/signup_login' element={<Signup_login />}></Route>
            <Route path='/School_choose' element={<School_choose />}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/makequeze' element={<MakeQueze/>}></Route>

          </Routes>
        </BrowserRouter>  
      </div>
    
    
      {/* <Queze/> */}
    </CookiesProvider>
  
  // </React>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
