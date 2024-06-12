import React,{Suspense, lazy} from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { HelmetProvider } from 'react-helmet-async';
import { hydrateRoot } from 'react-dom/client';

// const Main2 = lazy(()=> import('./App/Main2'));
// const Main2_a_queze = lazy(()=> import('./App/Main2_a_queze'));
// const Result = lazy(()=> import('./App/Result.js'));
// const Main2_make_queze = lazy(()=> import('./App/Main2_make_queze'));
// const Make_a_queze_modify = lazy(()=>import('./App/Make_a_queze_modify.js'));
// const Choose_queze_type = lazy(()=>import('./App/Choose_queze_type.js'));
// const Main2_a_queze_1and1 = lazy(()=>import('./App/Main2_a_queze_1and1.js'));
const Community = lazy(()=>import('./App/Community/Community.js'));
const Quezeshow_result = lazy(()=>import('./App/Quezeshow/Quezeshow_result.js'));
const Make_quezeshow = lazy(()=>import('./App/Quezeshow/Make_quezeshow/Make_quezeshow.js'));
const Quezeshow_main = lazy(()=>import('./App/Quezeshow/Quezeshow_main'));
const Guide_main = lazy(()=>import('./App/guide/Guide_main'));
const Quezeshow_queze = lazy(()=>import('./App/Quezeshow/Quezeshow_queze'));
const Break_egg = lazy(()=>import('./App/Game/BreakEgg/Break_egg.js'));
const Egg = lazy(()=>import('./App/Game/BreakEgg/Egg.js'));
// const Machugi = lazy(()=>import('./App/machugi/Machugi.js'));
// const Space = lazy(()=>import('./App/Space/Space.js'));
// const Make_space = lazy(()=>import('./App/Space/Make_space.js'));
// const In_space = lazy(()=>import('./App/Space/In_space.js'));
// const Make_space_quezeshow = lazy(()=>import('./App/Space/Make_space_quezeshow.js'));
const Make_quezeshow_modify = lazy(()=>import('./App/Quezeshow/Make_quezeshow/Make_quezeshow_modify.js'));
const Guide_basic = lazy(()=>import('./App/guide/Guide_basic.js'));
// const Continue_speaking = lazy(()=>import('./App/Continue_speaking/Continue_speaking.js'));
// const New_word_queze = lazy(()=>import('./App/new_word_queze/New_word_queze.js'));
const Quezeshow_before = lazy(()=>import('./App/Quezeshow/Quezeshow_before.js'));
const Login = lazy(()=>import('./App/Login/Login.js'));
const Signup = lazy(()=>import('./App/signup/Signup.js'));
const Make_quezeshow_step1 = lazy(()=>import('./App/Quezeshow/Make_quezeshow/Make_quezeshow_step1.js'));
const Profile = lazy(()=>import('./App/profile/Profile.js'));
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);


const app = (
  // <React.StrictMode>
  <div className='Main_root_'>
    <BrowserRouter>
      {/* <Header props={<School_choose/>}></Header> */}
      {/* <div className='line'></div> */}
      <Suspense fallback={<div>loadind...</div>}>
      <CookiesProvider>
        <HelmetProvider>
          <Routes>
            {/* <Route path='/queze' element={<Queze />}></Route> */}
              {/* <Route path='/worldcup' element={<Main2/>}></Route> */}
              {/* <Route path='/ayoworldrankmakequeze' element={<Main2_make_queze/>}></Route> */}
              {/* <Route path='/result' element={<Result/>}></Route> */}
              {/* <Route path='/ayoworldrankaqueze' element={<Main2_a_queze/>}></Route> */}
              {/* <Route path='/makeaquezemodify' element={<Make_a_queze_modify/>}></Route> */}
              <Route path='/makequezeshowmodify' element={<Make_quezeshow_modify/>}></Route>
              <Route path='/quezeshow_before/:roomnum' element={<Quezeshow_before/>}></Route>
              <Route path='/quezeshow_before' element={<Quezeshow_before/>}></Route>
              {/* <Route path='/choosequezetype' element={<Choose_queze_type/>}></Route> */}
              {/* <Route path='/oneandeone' element={<Main2_a_queze_1and1/>}></Route> */}
              <Route path='/community' element={<Community/>}></Route>
              <Route path='/quezeshow_result' element={<Quezeshow_result/>}></Route>
              <Route path='/make_quezeshow' element={<Make_quezeshow/>}></Route>
              <Route path='/' element={<Quezeshow_main/>}></Route>
              <Route path='/:type' element={<Quezeshow_main/>}></Route>
              {/* <Route path='/machugi' element={<Machugi/>}></Route> */}
              <Route path='/quezeshow_queze' element={<Quezeshow_queze/>}></Route>
              <Route path='/guide' element={<Guide_basic/>}></Route>
              {/* <Route path='/continue_speaking' element={<Continue_speaking/>}></Route> */}
              {/* <Route path='/new_word_queze' element={<New_word_queze/>}></Route> */}
              {/* <Route path='/space' element={<Space/>}></Route> */}
              <Route path='/guide_main' element={<Guide_main/>}></Route>
              <Route path='/produce' element={<Make_quezeshow_step1/>}></Route>
              <Route path='/egg' element={<Break_egg/>}></Route>
              <Route path='/egg/game' element={<Egg/>}></Route>
              <Route path='/login' element={<Login/>}></Route>
              <Route path='/signup' element={<Signup/>}></Route>
              <Route path='/profile' element={<Profile/>}></Route>

              {/* <Route path='/make_space' element={<Make_space/>}></Route> */}
              {/* <Route path='/in_space' element={<In_space/>}></Route> */}
              {/* <Route path='/make_space_quezeshow' element={<Make_space_quezeshow/>}></Route> */}

          </Routes>  
        </HelmetProvider>
      </CookiesProvider> 
      </Suspense>
      {/* <Adfit unit="DAN-87ortfszgGZjj16M"></Adfit>
      <Footer/> */}
    </BrowserRouter>
  </div>
  // </React.StrictMode>
)

// if (rootElement?.hasChildNodes()) {
  // 이미 child nodes가 있는 경우, 기존 root를 사용하여 업데이트
  // hydrate(app, rootElement);
  // console.log('hydrateRoot',rootElement.childNodes,rootElement);
  // hydrateRoot(rootElement,app);
// } else {
  // child nodes가 없는 경우, root를 render로 초기화
  root.render(app);
// }
// root.render(app);
// if (module.hot){
//   module.hot.accept()
// }
  // If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
