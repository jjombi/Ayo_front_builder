
import React, { useState, useRef } from 'react';
import { useEffect } from "react";
import { useNavigate,useParams, useLocation,useSearchParams } from "react-router-dom";
import './css.css';
import axios from 'axios';
import { useCookies } from "react-cookie";
import Queze_box from './Queze_box';
import Adfit from './adfit';
import SelectBox from './Select_box';
import Popup from './Popup';
import Queze_result from './Queze_result';
import Svg_ from '/src/App/Img_folder/arrow_figma.svg';
import Svg_great from '/src/App/Img_folder/thumb_up-1.svg';
import Svg_great2 from '/src/App/Img_folder/great_icon.svg';

const queze = () => {
    const [con, setCon] = useState('');

    const navigate = useNavigate();

    const input_value = useRef();

    const roomNameRef = useRef();

    const opacity_ = useRef();

    const back = useRef([]);

    const class_ = useRef();

    const number = useRef();

    const [searchParams, setSearchParams] = useSearchParams();

    const school_name = useRef();

    const [queze_value, setQueze_value] = useState('없음');

    const [queze_result, setQueze_result] = useState();

    const select_ref = useRef();

    const roomName_arr = useRef([]);

    const roomName_arr_chooser = useRef(0);

    const [likes, setLikes] = useState(0);

    const [maker,setMaker] = useState('');

    const queze_result_vcn_ref = useRef();  

    const [great_icon_con,setGreat_icon_con] = useState(true);
    useEffect(()=>{
        roomNameRef.current = searchParams.get('roomName');
        school_name.current = searchParams.get('school_name');
    })

    useEffect(()=>{
        roomNameRef.current = searchParams.get('roomName');
        school_name.current = searchParams.get('school_name');
        if(school_name.current === 'null'){
            alert('학교를 다시 선택해 주세요');
            navigate('/');
        }
        else{
            axios({
                // url : 'https://port-0-ayo-serber-builder-12fhqa2blnl9payx.sel5.cloudtype.app/queze_type',
                url : 'http://localhost:45509/queze_option', //select * from queze where scn = schoolname
                method : "post",
                headers : {
                    'Content-Type' : 'application/json'
                },
                data : {
                    school_name : school_name.current,
                    sequence : select_ref.current.value
                }
            }).then((res)=>{ // [A,B,C,D]
                if(res.data !== '없음'){
                    roomName_arr.current = [];
                    res.data.map((e)=>{
                        roomName_arr.current.push(e.roomName);
                    })
                    setSearchParams({
                        roomName : roomName_arr.current[roomName_arr_chooser.current],
                        school_name : school_name.current
                    });
                    axios({
                        url : 'http://localhost:45509/Q_queze_value',
                        method : "post",
                        headers : {
                            'Content-Type' : 'application/json'
                        },
                        data : {
                            roomName : roomName_arr.current[roomName_arr_chooser.current]
                        }
                    }).then((res)=>{
                        roomName_arr_chooser.current = 0;
                        setQueze_value(`${res.data[0].value}`);
                        setLikes(res.data[0].likes);
                        setMaker(res.data[0].maker);
                    })
                    axios({
                        url      : 'http://localhost:45509/queze_result',
                        method   : 'POST',
                        headers  : {
                            'Content-Type' : 'application/json'
                        },  
                        data     : {
                            roomName : roomName_arr.current[roomName_arr_chooser.current]               
                        }
                    }).then((res)=>{
            
                        let queze_result_value = '없음';
                        let queze_result_class = '모름';
                        let queze_result_number = '모름';

                        if(res.data === '없음'){
                            queze_result_value = '없음';
                            setQueze_result([
                                <button  className='show_reslut_li' >
                                    <p className='show_result_p'>...</p>
                                    <p className='show_result_p2'>없음</p>
                                </button>
                            ])
                            
                        }else{
                            let queze_result_arr_let = [];
                            for(let i=1; i <= res.data.length;i++){
                                queze_result_value = res.data[i-1].id;
                                if(res.data[i-1].class !== -1){
                                    queze_result_class = res.data[i-1].class;
                                }
                                if(res.data[i-1].number !== -1){
                                    queze_result_number = res.data[i-1].number;
                                }
                                queze_result_vcn_ref.current = [queze_result_value,queze_result_class,queze_result_number];
                                queze_result_arr_let.push(
                                    <div className='show_reslut_li' key={i}>
                                        <p className='show_result_p'>{i}등</p>
                                        <button>투표하기</button>
                                        <p className='show_result_p2'>학년 : {queze_result_class}| 반 : {queze_result_number}| 이름 : {queze_result_value}</p>
                                    </div>
                                )
                            }
                            setQueze_result(queze_result_arr_let);
                        }
                    })
                }else{
                    alert('만들어진 문제가 없습니다');
                }
            })
        }    

    },[])


    const queze_value_render = () => {
        roomNameRef.current = searchParams.get('roomName');
        school_name.current = searchParams.get('school_name');
        axios({
            url : 'http://localhost:45509/Q_queze_value',
            method : "post",
            headers : {
                'Content-Type' : 'application/json'
            },
            data : {
                roomName : roomName_arr.current[roomName_arr_chooser.current]
            }
        }).then((res)=>{
            setQueze_value(`${res.data[0].value}`);
            setLikes(res.data[0].likes);
            setMaker(res.data[0].maker);
        })
        axios({
            url      : 'http://localhost:45509/queze_result',
            method   : 'POST',
            headers  : {
                'Content-Type' : 'application/json'
            },  
            data     : {
                roomName : roomName_arr.current[roomName_arr_chooser.current]            
            }
        }).then((res)=>{

            let queze_result_value = '없음';
            let queze_result_class = '모름';
            let queze_result_number = '모름';

            if(res.data === '없음'){
                setQueze_result([
                    <button  className='show_reslut_li' >
                        <p className='show_result_p'>...</p>
                        <p className='show_result_p2'>없음</p>
                    </button>
                ])
                
            }else{
                let queze_result_arr_let = [];
                for(let i=1; i <= res.data.length;i++){
                    queze_result_value = res.data[i-1].id;
                    if(res.data[i-1].class !== -1){
                        queze_result_class = res.data[i-1].class;
                    }
                    if(res.data[i-1].number !== -1){
                        queze_result_number = res.data[i-1].number;
                    }      
                    queze_result_vcn_ref.current = [queze_result_value,queze_result_class,queze_result_number];      
                    queze_result_arr_let.push(
                        <button onClick={()=>{console.log('bbbbb')}} className='show_reslut_li' key={i}>
                            <p className='show_result_p'>{i}등</p>
                            <button onClick={click_vote}>투표하기</button>
                            <p className='show_result_p2'>학년 : {queze_result_class}| 반 : {queze_result_number}| 이름 : {queze_result_value}</p>
                        </button>
                    )
                }
                setQueze_result(queze_result_arr_let);
            }
        })
    }
    const click_vote = () => {
        axios({
            //url : 'https://port-0-ayo-serber-builder-12fhqa2blnl9payx.sel5.cloudtype.app/vote',
            url : 'http://localhost:45509/vote',
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            data : {
                //방 번호
                //뽑은 사람
                roomName : roomNameRef.current,
                voteName : queze_result_vcn_ref.current[0],
                class    : Number(queze_result_vcn_ref.current[1]),
                number   : Number(queze_result_vcn_ref.current[2])
            }
        }).then((res)=>{
            console.log('vote api res is',res);
            
        })
        setCon('투표 완료');
    }
    const vote = () => {
        if(input_value.current == '' || input_value.current == null){
            alert('뽑는이를 적어주세요');
        }
        else{

            axios({
                //url : 'https://port-0-ayo-serber-builder-12fhqa2blnl9payx.sel5.cloudtype.app/vote',
                url : 'http://localhost:45509/vote',
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                data : {
                    //방 번호
                    //뽑은 사람
                    roomName : roomNameRef.current,
                    voteName : `${input_value.current.value}`,
                    class    : Number(class_.current.value),
                    number   : Number(number.current.value)
                }
            }).then((res)=>{
                console.log('vote api res is',res);
                
            })
            setCon('투표 완료');
            opacity_.current = 1;
        }
    }

    const popularity_order = () =>{
        if(great_icon_con){
            axios({
                url      : 'http://localhost:45509/up_queze_popularity',
                method   : 'POST',
                headers  : {
                    'Content-Type' : 'application/json'
                },  
                data     : {
                    roomName : roomNameRef.current               
                }
            }).then((res)=>{
                setGreat_icon_con(false);
                setLikes(likes + 1);
            })
        }
        else{

        }
    }
    const quze_sequence = () => {
        axios({
            // url : 'https://port-0-ayo-serber-builder-12fhqa2blnl9payx.sel5.cloudtype.app/queze_type',
            url : 'http://localhost:45509/queze_option', //select * from queze where scn = schoolname
            method : "post",
            headers : {
                'Content-Type' : 'application/json'
            },
            data : {
                school_name : school_name.current,
                sequence : select_ref.current.value
            }
        }).then((res)=>{
            if(res.data !== '없음'){
                roomName_arr.current = [];
                res.data.map((e)=>{
                    roomName_arr.current.push(e.roomName);
                })
                setSearchParams({
                    roomName : roomName_arr.current[roomName_arr_chooser.current],
                    school_name : school_name.current
                });
                axios({
                    url : 'http://localhost:45509/Q_queze_value',
                    method : "post",
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    data : {
                        roomName : roomName_arr.current[roomName_arr_chooser.current]
                    }
                }).then((res)=>{
                        roomName_arr_chooser.current = 0;
                    setQueze_value(`${res.data[0].value}`);
                    setLikes(res.data[0].likes);
                    setMaker(res.data[0].maker);
                })
            }
        })
    }
    const votesuccess = () =>{
        setCon('');

    }
    const btn_l = () => {
        if(roomName_arr_chooser.current === 0){

        }else{
            roomName_arr_chooser.current -= 1;
            setSearchParams({
                roomName : roomName_arr.current[roomName_arr_chooser.current],
                school_name : school_name.current
            });
            setGreat_icon_con(true);
            queze_value_render();

        }
    }
    const btn_r = () => {
        if(roomName_arr_chooser.current === roomName_arr.current.length-1){

        }else{
            roomName_arr_chooser.current += 1;
            setSearchParams({
                roomName : roomName_arr.current[roomName_arr_chooser.current],
                school_name : school_name.current
            });
            setGreat_icon_con(true);
            queze_value_render();
        }
    }
    return(
        <div className='Main_root'>
            <div className='content_area'>
                {
                    back.current
                }

                <div className='maker_intro'>
                    <p className='show_result_p'>제작자</p>
                    <p className='show_result_p2'>{maker}</p>
                </div>
                <div className="A_queze_content">
                    <p>{queze_value}</p>
                    <button className='btn1' onClick={btn_l}>
                        <Svg_   className="svg_"></Svg_>
                    </button>
                    <button className='btn2' onClick={btn_r}>
                        <Svg_   className="svg_2"></Svg_>
                    </button>
                </div>                
                <div className="B">
                    <select ref={select_ref} onChange={quze_sequence}>
                        <option value="date desc">최신순</option>
                        <option value="likes desc">인기순</option>
                        <option value="date asc">날짜순</option>
                    </select>
                    <p>{likes}</p>
                    <button onClick={popularity_order}>{great_icon_con === true ? <Svg_great/> : <Svg_great2/>}</button>
                </div>
                <div className="A">
                    {
                        queze_result
                    }
                </div>
                <div className='line4'></div>

                <input type='text' ref={input_value} className='Input_basic Border_radius name_input' placeholder='이름 입력'></input>
                
                <div className='Input_basic Border_radius select_parents_div'>

                    <select name="class" className='Border_radius select_basic' placeholder='asd' ref={class_}>
                        <option value="-1" disabled selected>학급</option>
                        <option value="-1">모름</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>

                    <select name="class" className=' Border_radius select_basic' ref={number}>
                        <option value="-1" disabled selected>반</option>
                        <option value="-1">모름</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>

                    </select>

                </div>


                <input type='button' onClick={vote} value="투표하기" className='Submit_btn Submit_btn_'></input>
                
                    
            </div>
            {
                con === "투표 완료" ? <Popup text={con} func={votesuccess} opacity_={opacity_}></Popup> : null
            }
            <Adfit unit="DAN-moiryOKSlck2hjOA"></Adfit>
        </div>
    )
}





export default queze;

