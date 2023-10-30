import React,{Suspense, lazy} from 'react';
import ReactDOM from 'react-dom/client';

// import './App/css.scss';
// import Header from './App/Header';
// import { createRoot } from 'react-dom/client';
// import Queze from './App/queze';
// import School_choose from './App/School_chose';
// import MakeQueze from './App/MakeQueze';
// import A_queze from './App/A_queze';
import { BrowserRouter, Routes, Route, l } from 'react-router-dom';
const Header = lazy(() => import('./App/Header'));
const Queze = lazy(() => import('./App/queze'));
const School_choose = lazy(() => import('./App/School_chose'));
const MakeQueze = lazy(() => import('./App/MakeQueze'));
const A_queze = lazy(() => import('./App/A_queze'));
const Main = lazy(() => import('./App/Main'));

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(
  <div className='Main_root'>
    <BrowserRouter>
      <Header></Header>
      <div className='line'></div>
      <Suspense fallback={<div>loadind...</div>}>
        <Routes>
          <Route path='/queze' element={<Queze />}></Route>
          <Route path='/' element={<Main/>}></Route>
          <Route path='/School_choose' element={<School_choose/>}></Route>
          <Route path='/makequeze' element={<MakeQueze/>}></Route>
          <Route path='/a_queze' element={<A_queze/>}></Route>
        </Routes>   
      </Suspense>
    </BrowserRouter>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
