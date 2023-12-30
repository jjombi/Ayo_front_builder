import React,{useEffect, useRef,useState} from "react";
import { useForm } from "react-hook-form"
import './css.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import img from './Img_folder/zzal2.jpg';
import Header from "./ayo_world_rank_header";
import AWS from "aws-sdk";
import Adfit from "./Adfit";
import Footer from "./Footer";
import Main2_make_queze_basic from "./Main2_make_queze_basic";
import jimp from "jimp";
const Main2_make_queze = () => {
    
    return(
        <>
            <Header></Header>
            {/* <button onClick={img_rerender}>버튼</button> */}
            <Main2_make_queze_basic type="notmodify" roomName={null} serverurl={"/upload_img"}></Main2_make_queze_basic>
            <Footer></Footer>
        </>
    )
}
export default Main2_make_queze;
// onChange={processChange(change_text)}
