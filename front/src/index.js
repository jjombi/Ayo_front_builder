import React,{Suspense, lazy} from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

const Main2 = lazy(()=> import('./App/Main2'));
const Main2_a_queze = lazy(()=> import('./App/Main2_a_queze'));
const Result = lazy(()=> import('./App/Result.js'));
const Main2_make_queze = lazy(()=> import('./App/Main2_make_queze'));
const Footer = lazy(()=> import('./App/Footer.js'));
const Adfit = lazy(()=>import('./App/Adfit.js'));
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(
  <div className='Main_root_'>
    <BrowserRouter>
      {/* <Header props={<School_choose/>}></Header> */}
      {/* <div className='line'></div> */}
      <Suspense fallback={<div>loadind...</div>}>
      <CookiesProvider>
          <Routes>
            {/* <Route path='/queze' element={<Queze />}></Route> */}
              <Route path='/ayoworldrank' element={<Main2/>}></Route>
              <Route path='/ayoworldrankmakequeze' element={<Main2_make_queze/>}></Route>
              <Route path='/result' element={<Result/>}></Route>
              <Route path='/ayoworldrankaqueze' element={<Main2_a_queze/>}></Route>
          </Routes>  
        </CookiesProvider> 
      </Suspense>
      {/* <Adfit unit="DAN-87ortfszgGZjj16M"></Adfit>
      <Footer/> */}
    </BrowserRouter>
  </div>
);
// if (module.hot){
//   module.hot.accept()
// }
  // If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
