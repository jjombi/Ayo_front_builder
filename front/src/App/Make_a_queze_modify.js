import React,{useEffect, useRef, useState} from 'react';
import Main2_make_queze_basic from "./Main2_make_queze_basic";
import { useSearchParams } from "react-router-dom";
import Footer from './Footer';
import Adfit from './Adfit';
const Make_a_queze_modify = () => {
    const roomName_ref = useRef();
    const [roomName,setRoomName] = useState(''); 
    const [title,setTitle] = useState(''); 
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(()=>{
        console.log('1');
        setRoomName(searchParams.get('roomName'));
        setTitle(searchParams.get('title'));
        console.log(searchParams.get('roomName'));
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
            roomName !== '' ? <Main2_make_queze_basic type="modify" roomName={roomName} serverurl={"/upload_img_plus"}></Main2_make_queze_basic>
            : null
        }
        <Footer tinyint={false}></Footer>
        </>
    )
    
    
}

export default Make_a_queze_modify;