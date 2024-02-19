import React,{useEffect, useRef, useState} from 'react';
import Main2_make_queze_basic from "./Main2_make_queze_basic";
import { useSearchParams,useLocation } from "react-router-dom";
import Footer from './Footer';
import Adfit from './Adfit';
import axios from 'axios';

const Make_a_queze_modify = () => {
    const roomName_ref = useRef();
    const [roomName,setRoomName] = useState(''); 
    const [title,setTitle] = useState(''); 
    const [searchParams, setSearchParams] = useSearchParams();
    const { state } = useLocation();
    // const [early_data,setEarly_data] = useState();
    useEffect(()=>{
        // console.log('1',state);
        setRoomName(searchParams.get('roomName'));
        setTitle(searchParams.get('title'));
        // console.log(searchParams.get('roomName'));
        if(state === null){
            alert('비밀번호 입력후 수정가능 합니다');
            
        }
        else{
            if(!state.tinyint){
                alert('비밀번호 입력후 수정가능 합니다');
            }
            else{
                // console.log(roomName,'roomName');
                // alert('성공');
                console.log('성공');
            }
        }
    },[])
        
    
    return(
        <>
        <Adfit unit={'DAN-87ortfszgGZjj16M'}></Adfit>
        {
            <header className='make_modify_header'>
                <h3>{title}</h3>
            </header>
        }   
        {
            console.log('roomName',roomName)
        }
        {   
            roomName !== '' ? <Main2_make_queze_basic type="modify" roomName={roomName} serverurl={"/upload_img_plus"}></Main2_make_queze_basic>
            : null
        }
        <Footer tinyint={false}></Footer>
        </>
    )
    
    
}

export default Make_a_queze_modify;