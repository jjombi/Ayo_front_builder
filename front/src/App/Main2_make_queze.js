import React, { useEffect } from "react";
import './css.css';
import Header from "./ayo_world_rank_header";
import Adfit from "./Adfit";
import Footer from "./Footer";
import Main2_make_queze_basic from "./Main2_make_queze_basic";
const Main2_make_queze = () => {
    useEffect(()=>{
        // const htmlTitle = document.querySelector("title");
        // htmlTitle.innerHTML = 'ayo, 최애 티어표 나의 최애 티어를 만들어보세요';
    },[])
    return(
        <>
            <Header></Header>
            {/* <button onClick={img_rerender}>버튼</button> */}
            <Adfit unit="DAN-87ortfszgGZjj16M"></Adfit>
            <Main2_make_queze_basic type="notmodify" roomName={null} serverurl={"/upload_img"}></Main2_make_queze_basic>
            <Footer tinyint={false}></Footer>
        </>
    )
}
export default Main2_make_queze;
// onChange={processChange(change_text)}
