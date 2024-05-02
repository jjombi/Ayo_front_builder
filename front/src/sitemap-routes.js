import React, {useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import axios from 'axios';
// const Sitemap_routes = () => {
//     const [roomnum, setRoomnum] = useState();
//     useEffect(()=>{
//         axios({
//             url    : process.env.REACT_APP_SERVER_URL + '/create_sitemap',
//             method : 'GET',
//         }).then((res)=>{
//             console.log(res.data);
//             setRoomnum(roomnum => res.data); // [{uuid :, rooomnum:}]
//         })
//     },[])
//     return(
//         <Route>
//             <Route path='/'></Route>
//             <Route path='/ayoworldrankmakequeze'></Route>
//             <Route path='/result'></Route>
//             <Route path='/ayoworldrankaqueze'></Route>
//             <Route path='/makeaquezemodify'></Route>
//             <Route path='/makequezeshowmodify'></Route>
//             <Route path='/quezeshow_before/:roomnum'></Route>
//             {
//                 roomnum.map((e,i)=>{
//                     return <Route key={i} path={`/quezeshow_before/${i}`}></Route>
//                 })   
//             }
//             <Route path='/choosequezetype'></Route>
//             <Route path='/oneandeone'></Route>
//             <Route path='/community'></Route>
//             <Route path='/quezeshow_result'></Route>
//             <Route path='/make_quezeshow'></Route>
//             <Route path='/quezeshow_main'></Route>
//             <Route path='/machugi'></Route>
//             <Route path='/quezeshow_queze'></Route>
//             <Route path='/guide'></Route>
//             <Route path='/continue_speaking'></Route>
//             <Route path='/new_word_queze'></Route>
//             <Route path='/guide_main'></Route>
//         </Route>
//     )
// }
// let sitemap = (
//     <Route>
//         <Route path='/'></Route>
//     </Route>
// );
// await axios({
//     url    : 'https://ayo-world-rank.site/create_sitemap',
//     method : 'GET',
// }).then((res)=>{
//     console.log(res);
//     sitemap = (
//     <Route>
//         <Route path='/'></Route>
//         <Route path='/ayoworldrankmakequeze'></Route>
//         <Route path='/result'></Route>
//         <Route path='/ayoworldrankaqueze'></Route>
//         <Route path='/makeaquezemodify'></Route>
//         <Route path='/makequezeshowmodify'></Route>
//         <Route path='/quezeshow_before/:roomnum'></Route>
//         <Route path='/choosequezetype'></Route>
//         <Route path='/oneandeone'></Route>
//         <Route path='/community'></Route>
//         <Route path='/quezeshow_result'></Route>
//         <Route path='/make_quezeshow'></Route>
//         <Route path='/quezeshow_main'></Route>
//         <Route path='/machugi'></Route>
//         <Route path='/quezeshow_queze'></Route>
//         <Route path='/guide'></Route>
//         <Route path='/continue_speaking'></Route>
//         <Route path='/new_word_queze'></Route>
//         <Route path='/guide_main'></Route>
//     </Route>
// )
    // sitemap(roomnum => res.data); // [{uuid :, rooomnum:}]
// })
const sitemap = (
    <Route>
            <Route path='/'></Route>
            {/* <Route path='/ayoworldrankmakequeze'></Route> */}
            {/* <Route path='/result'></Route> */}
            {/* <Route path='/ayoworldrankaqueze'></Route> */}
            {/* <Route path='/makeaquezemodify'></Route> */}
            <Route path='/makequezeshowmodify'></Route>
            <Route path='/quezeshow_before/:roomnum'></Route>
            <Route path='/quezeshow_before/1'></Route>
            <Route path='/quezeshow_before/2'></Route>
            <Route path='/quezeshow_before/3'></Route>
            <Route path='/quezeshow_before/4'></Route>
            <Route path='/quezeshow_before/5'></Route>
            <Route path='/quezeshow_before/6'></Route>
            <Route path='/quezeshow_before/7'></Route>
            <Route path='/quezeshow_before/8'></Route>
            <Route path='/quezeshow_before/9'></Route>
            <Route path='/quezeshow_before/10'></Route>
            <Route path='/quezeshow_before/11'></Route>
            <Route path='/quezeshow_before/12'></Route>
            <Route path='/quezeshow_before/13'></Route>
            <Route path='/quezeshow_before/14'></Route>
            <Route path='/quezeshow_before/15'></Route>

            {/* <Route path='/choosequezetype'></Route> */}
            {/* <Route path='/oneandeone'></Route> */}
            <Route path='/community'></Route>
            <Route path='/quezeshow_result'></Route>
            <Route path='/make_quezeshow'></Route>
            <Route path='/quezeshow_main'></Route>
            {/* <Route path='/machugi'></Route> */}
            <Route path='/quezeshow_queze'></Route>
            {/* <Route path='/guide'></Route> */}
            {/* <Route path='/continue_speaking'></Route> */}
            {/* <Route path='/new_word_queze'></Route> */}
            <Route path='/guide_main'></Route>
    </Route>
)
export default sitemap
// export default () => {
//     axios({
//         url    : 'https://ayo-world-rank.site/create_sitemap',
//         method : 'GET',
//     }).then((res)=>{
//         console.log(res);
//         return (
//         <Route>
//             <Route path='/'></Route>
//             <Route path='/ayoworldrankmakequeze'></Route>
//             <Route path='/result'></Route>
//             <Route path='/ayoworldrankaqueze'></Route>
//             <Route path='/makeaquezemodify'></Route>
//             <Route path='/makequezeshowmodify'></Route>
//             <Route path='/quezeshow_before/:roomnum'></Route>
//             <Route path='/choosequezetype'></Route>
//             <Route path='/oneandeone'></Route>
//             <Route path='/community'></Route>
//             <Route path='/quezeshow_result'></Route>
//             <Route path='/make_quezeshow'></Route>
//             <Route path='/quezeshow_main'></Route>
//             <Route path='/machugi'></Route>
//             <Route path='/quezeshow_queze'></Route>
//             <Route path='/guide'></Route>
//             <Route path='/continue_speaking'></Route>
//             <Route path='/new_word_queze'></Route>
//             <Route path='/guide_main'></Route>
//             {
//                 res.data.map((e,i)=>{
//                     return (
//                         <Route key={i} path={`/quezeshow_before/${i}`}></Route>
//                     )
//                 })
//             }
//         </Route>
//         )
//     })
// }
