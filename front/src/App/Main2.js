import React, { useEffect, useState,useRef } from "react";
import './css.css';
import axios from "axios";
import img from './Img_folder/zzal2.jpg';
import Header from "./ayo_world_rank_header";
import { useNavigate } from "react-router-dom";
import { server_url } from "./public/WorldRank";
const Main2 = () => {
    const [img_base64_arr,setImg_base64_arr] = useState();
    const a_ref = useRef(); 
    const [render, setRender] = useState(0);
    const navigate = useNavigate();
    useEffect(()=>{
        console.log('render');
    })
    useEffect(()=>{
        axios({
            url          : server_url + '/main_select_queze',
            method       : 'GET',
            headers      : {
                'Content-Type' : 'application/json'
            } 
        }).then((res)=>{
            let roomName_arr = [];
            let res_data_arr = [];
            let title_arr = [];
            console.log('res',res);
            res.data.result.map(e=>{
                console.log(e);
                roomName_arr.push(e.roomName);
                title_arr.push(e.title);
            })

            for(let e in res.data){
                res_data_arr.push(res.data[e]); // res.data object -> array로 변환
            }
            console.log('res_data_arr',res_data_arr[1]); // base64 /wr2f234f/wrfw4f
            a_ref.current = [];
            for(let i=0; i < res_data_arr[1].length;i++){
                console.log("i",i,'res_data_arr[i]',res_data_arr[1][i])
                const str = 'data:image/jpeg;charset=utf\-8;base64,'+res_data_arr[1][i];
                console.log('sds',str);
                a_ref.current.push(
                    <button className="plus_queze" key={i} onClick={(e)=>{e.preventDefault(); A_queze_click(roomName_arr[i])}}>
                        <img src={str} key={i+1}></img>
                        <div>
                            <p key={i+2}>{title_arr[i]}</p>
                            <div>
                                <input type="button" value="결과 보기" className="all_btn" onClick={(e)=>{e.preventDefault();e.stopPropagation();result_click(roomName_arr[i])}}></input>
                                <input type="button" value="시작 하기" className="all_btn" onClick={(e)=>{e.preventDefault();e.stopPropagation();A_queze_click(roomName_arr[i])}}></input>
                            </div>
                        </div>
                    </button>
                )
                
            }
            console.log(a_ref.current);
            setImg_base64_arr(a_ref.current);
        })
    },[])
    const A_queze_click = (roomName) => {
        console.log('move to a queze page, roomName : ',roomName);
        navigate(`/ayoworldrankaqueze?roomName=${roomName}`);
    }
    const result_click = (roomName) => {
        console.log('move to result page, roomName : ',roomName);
        navigate(`/result?roomName=${roomName}`)
    }
    const render_fn = () => {
        setRender({...render, render : render +1});
    }
    return(
        <div className="Main2_root">
            <Header></Header>
            {/* <button onClick={render_fn}>asdasd</button> */}
            <input type="toggle"></input>
            <div className="queze_list">
                {
                    a_ref.current
                }
                {/* <button className="plus_queze">
                    <img src={img}></img>
                    <div>
                        <p >asd</p>
                        <div>
                            <button className="all_btn">결과 보기</button>
                            <button className="all_btn">시작 하기</button>
                        </div>
                    </div>
                </button>
                <button className="plus_queze">
                    <img src={img}></img>
                    <div>
                        <p >asd</p>
                        <div>
                            <button className="all_btn">결과 보기</button>
                            <button className="all_btn">시작 하기</button>
                        </div>
                    </div>
                </button>
                <button className="plus_queze">
                    <img src={img}></img>
                    <div>
                        <p >asd</p>
                        <div>
                            <button className="all_btn">결과 보기</button>
                            <button className="all_btn">시작 하기</button>
                        </div>
                    </div>
                </button>
                <button className="plus_queze">
                    <img src={img}></img>
                    <div>
                        <p >asd</p>
                        <div>
                            <button className="all_btn">결과 보기</button>
                            <button className="all_btn">시작 하기</button>
                        </div>
                    </div>
                </button>
                <button className="plus_queze">
                    <img src={img}></img>
                    <div>
                        <p >asd</p>
                        <div>
                            <button className="all_btn">결과 보기</button>
                            <button className="all_btn">시작 하기</button>
                        </div>
                    </div>
                </button>
                <button className="plus_queze">
                    <img src={img}></img>
                    <div>
                        <p >asd</p>
                        <div>
                            <button className="all_btn">결과 보기</button>
                            <button className="all_btn">시작 하기</button>
                        </div>
                    </div>
                </button> */}
            </div>
        </div>
    )
}
export default Main2;