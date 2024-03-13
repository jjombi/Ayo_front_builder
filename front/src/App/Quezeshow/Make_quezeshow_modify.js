import React,{useEffect, useRef, useState} from 'react';
// import Main2_make_queze_basic from "./Main2_make_queze_basic";
import Make_quezeshow_basic from './Make_quezeshow_basic';
import { useSearchParams,useLocation } from "react-router-dom";
import Header from "../ayo_world_rank_header";
import Footer from '../Footer';
import Adfit from '../Adfit';
import axios from 'axios';
// import Make_queze_modify from './Make_queze_modify';
const Make_quezeshow_modify = () => {
    const roomName_ref = useRef();
    const [uuid,setUuid] = useState(''); 
    const [title,setTitle] = useState(''); 
    const [quezeshow_type,setQuezeshow_type] = useState('');
    const [queze_type,setQueze_type] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const { state } = useLocation();
    // const [early_data,setEarly_data] = useState(null);
    
    useEffect(()=>{
        // console.log('make quezeshow modify',state);
        setUuid(searchParams.get('uuid'));
        setTitle(searchParams.get('title'));
        setQuezeshow_type(searchParams.get('quezeshow_type'));
        setQueze_type(searchParams.get('queze_type'));
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
                // console.log('성공');
                // axios({
                //     url : process.env.REACT_APP_SERVER_URL + '/modify_queze',
                //     method : 'POST',
                //     data : {
                //         roomName : searchParams.get('roomName'),
                //     },
                //     headers : {
                //         'Content-Type' : 'application/json'
                //     }
                // }).then(res=>{
                //     console.log(res);
                //     setEarly_data(early_data => [...res.data]);
                // })
            }
        }
    },[])
        
    
    return(
        <>
        <Header></Header>
        <Adfit unit={'DAN-87ortfszgGZjj16M'}></Adfit>
        {
            <header className='make_modify_header'>
                <h3>{title}</h3>
            </header>
        }   
        {/* {
            console.log('roomName',roomName,early_data)
        }
        {
            early_data !== null ?
            <div className="queze_area">
                { 
                early_data.map((e,i)=>{
                    console.log(e);
                    return(
                        <Make_queze_modify key={i} img={e.img} early_text={e.text}/>
                    )
                    return(
                        <div style={{backgroundColor : 'red'}}>sdfsf</div>
                    )
                })
                }
            </div> :
            null
        } */}
        {   
            uuid !== '' ? <Make_quezeshow_basic type="modify" server_url={"modify_change_quezeshow"} uuid_props={uuid} quezeshow_type_props={quezeshow_type} queze_type={queze_type}></Make_quezeshow_basic>
            : null
        }
        <Footer tinyint={false}></Footer>
        </>
    )
    
    
}

export default Make_quezeshow_modify;