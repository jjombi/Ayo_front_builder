import React,{useEffect, useRef, useState} from 'react';
import Main2_make_queze_basic from "./Main2_make_queze_basic";
import { useSearchParams } from "react-router-dom";

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
        {
            <header className='make_modify_header'>
                <h3>{title}</h3>
            </header>
        }   
        {   
            roomName !== '' ? <Main2_make_queze_basic type="modify" roomName={roomName} serverurl={"/upload_img_plus"}></Main2_make_queze_basic>
            : null
        }
        </>
    )
    
    
}

export default Make_a_queze_modify;