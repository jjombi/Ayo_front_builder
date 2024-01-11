import React, { useEffect, useState } from "react";
import './css.css';
import dragdrop from './Gif/dragdrop.gif';
import oneandone from './Gif/oneandone.gif';
import { useNavigate, useSearchParams } from "react-router-dom";
import { FSx } from "aws-sdk";
const Choose_queze_type = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const roomName = searchParams.get('roomName');
    const title = searchParams.get('title');
    const publicAccess = searchParams.get('publicAccess');
    const [oneandoneState,setOneandoneState] = useState(false);
    const change_oneandoneState = () => {
        console.log('set state');
        setOneandoneState(!oneandoneState);
    }
    const navi_to_1and1 = (type) => {
        navigate(`/oneandeone?roomName=${roomName}&title=${title}&publicAccess=${publicAccess}&type=${type}`);       
    }
    const navi_to_tier = () => {
        console.log('to tier navi');
        navigate(`/ayoworldrankaqueze?roomName=${roomName}&title=${title}&publicAccess=${publicAccess}`);       
    }
    return(
        <div className="Choose_queze_type_root">
            <h1>{title}</h1>
        {
            oneandoneState 
            ?
                <section className="Choose_queze_type_section_oneandone">
                    <button onClick={(e)=>{e.preventDefault();navi_to_1and1(2)}}>2강</button>
                    <button onClick={(e)=>{e.preventDefault();navi_to_1and1(4)}}>4강</button>
                    <button onClick={(e)=>{e.preventDefault();navi_to_1and1(8)}}>8강</button>
                    <button onClick={(e)=>{e.preventDefault();navi_to_1and1(16)}}>16강</button>
                    <button onClick={(e)=>{e.preventDefault();navi_to_1and1(32)}}>32강</button>
                    <button onClick={(e)=>{e.preventDefault();navi_to_1and1(64)}}>64강</button>
                    {/* <button onClick={navi_to_1and1(128)}>128강</button>
                    <button onClick={navi_to_1and1(200)}>이상</button> */}

                </section>
            : 
            <section className="Choose_queze_type_section">
                <button className="all_btn" onClick={change_oneandoneState}>1 대 1 토너먼트</button>
                <button className="all_btn" onClick={navi_to_tier}>티어표 만들기</button>
                <img src={oneandone}></img>
                <img src={dragdrop}></img>
                
            </section>
        }

        </div>
    )   
}

export default Choose_queze_type