
import React, { useState, useRef } from 'react';
import { useEffect } from "react";
import { useNavigate,useSearchParams } from "react-router-dom";
import './css.css';
import axios from 'axios';
import Adfit from 'src/App/adfit';
import Popup from './Popup';
import Svg_great from '/src/App/Img_folder/thumb_up-1.svg';
import Svg_great2 from '/src/App/Img_folder/great_icon.svg';
import Svg_bug from '/src/App/Img_folder/Bug_light.svg';


const A_queze = () => {
    const url_ = 'https://port-0-ayo-serber-builder-12fhqa2blnl9payx.sel5.cloudtype.app';

    const [con, setCon] = useState('');

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

    const [maker,setMaker] = useState('');

    const [likes,setLikes] = useState();

    const queze_result_vcn_ref = useRef();

    const [great_icon_con,setGreat_icon_con] = useState(true);

    useEffect(()=>{
        roomNameRef.current = searchParams.get('roomName');
        school_name.current = searchParams.get('school_name');
        console.log(roomNameRef,school_name); 

        axios({
            url      : `https://port-0-ayo-serber-builder-12fhqa2blnl9payx.sel5.cloudtype.app/Q_queze_value`,
            method   : 'POST',
            headers  : {
                'Content-Type' : 'application/json'
            },
            data     : {
                roomName : roomNameRef.current,
                sequence : select_ref.current.value                
            }
        }).then((res)=>{
            console.log('res a queze value',res.data[0].value);
            setQueze_value(res.data[0].value);
            setMaker(res.data[0].maker);
            setLikes(res.data[0].likes);
            

            axios({
                url      : `https://port-0-ayo-serber-builder-12fhqa2blnl9payx.sel5.cloudtype.app/queze_result`,
                method   : 'POST',
                headers  : {
                    'Content-Type' : 'application/json'
                },  
                data     : {
                    roomName : roomNameRef.current              
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
                            <button className='show_reslut_li' key={i}>
                                <p className='show_result_p'>{i}등</p>
                                <button onClick={(e)=>{click_vote(e.target)}} value={[queze_result_value,queze_result_class,queze_result_number]}>투표하기</button>
                                <p className='show_result_p2'>학년 : {queze_result_class}| 반 : {queze_result_number}| 이름 : {queze_result_value}</p>
                            </button>
                        )
                    }
                    setQueze_result(queze_result_arr_let);
                }
            })


        })

    },[])

    const click_vote = (e) => {
        
        let split_str = e.value.split(',');
        if(split_str[1] === '모름'){
            split_str[1] = -1;
        }if(split_str[2] === '모름'){
            split_str[2] = -1;
        }
        axios({
            //url : 'https://port-0-ayo-serber-builder-12fhqa2blnl9payx.sel5.cloudtype.app/vote',
            url : `https://port-0-ayo-serber-builder-12fhqa2blnl9payx.sel5.cloudtype.app/vote`,    
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            data : {
                //방 번호
                //뽑은 사람
                roomName : roomNameRef.current,
                voteName : split_str[0],
                class    : Number(split_str[1]),
                number   : Number(split_str[2])
            }
        }).then((res)=>{
            console.log('vote api res is',res);
            
        })
        setCon('투표 완료');
        opacity_.current = 1;
    }
    
    const vote = () => {
        console.log(input_value.current);
        if(input_value.current == '' || input_value.current == null){
            alert('뽑는이를 적어주세요');
        }
        else{

            axios({
                //url : 'https://port-0-ayo-serber-builder-12fhqa2blnl9payx.sel5.cloudtype.app/vote',
                url : `https://port-0-ayo-serber-builder-12fhqa2blnl9payx.sel5.cloudtype.app/vote`,
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
                url      : `https://port-0-ayo-serber-builder-12fhqa2blnl9payx.sel5.cloudtype.app/up_queze_popularity`,
                method   : 'POST',
                headers  : {
                    'Content-Type' : 'application/json'
                },  
                data     : {
                    roomName : roomNameRef.current               
                }
            }).then((res)=>{
                console.log('좋아요 누른뒤 axios요청 후 res : ',res);
                setLikes(likes + 1);
                setGreat_icon_con(false);
            })
        }
    }
    const quze_sequence = () => {
        axios({
            url      : `https://port-0-ayo-serber-builder-12fhqa2blnl9payx.sel5.cloudtype.app/Q_queze_value`,
            method   : 'POST',
            headers  : {
                'Content-Type' : 'application/json'
            },
            data     : {
                roomName : roomNameRef.current,
                sequence : select_ref.current.value
            }
        }).then((res)=>{
            console.log('res a queze value',res.data[0].value);
            setQueze_value(res.data[0].value);

        })
    }
    const votesuccess = () =>{
        axios({
            url      : `https://port-0-ayo-serber-builder-12fhqa2blnl9payx.sel5.cloudtype.app/queze_result`,
            method   : 'POST',
            headers  : {
                'Content-Type' : 'application/json'
            },  
            data     : {
                roomName : roomNameRef.current              
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
                        <button className='show_reslut_li' key={i}>
                            <p className='show_result_p'>{i}등</p>
                            <button onClick={(e)=>{click_vote(e.target)}} value={[queze_result_value,queze_result_class,queze_result_number]}>투표하기</button>
                            <p className='show_result_p2'>학년 : {queze_result_class}| 반 : {queze_result_number}| 이름 : {queze_result_value}</p>
                        </button>
                    )
                }
                setQueze_result(queze_result_arr_let);
            }
        })
        setCon('');

    }

    const sharing_btn = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            
            alert('복사 성공!');
        } catch (error) {
            alert('복사 실패!');
        }
    };
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
                </div>                
                <div className="B">
                    <select ref={select_ref} onChange={quze_sequence}>
                        <option value="date desc">최신순</option>
                        <option value="likes desc">인기순</option>
                        <option value="date asc">날짜순</option>
                    </select>
                    <button className='sharing_btn' onMouseDown={(e) => {e.preventDefault()}} onClick={()=>{sharing_btn(`https://jjombi.github.io/A_queze?roomName=${searchParams.get('roomName')}&school_name=${searchParams.get('school_name')}`)}}>공유하기</button>
                    <p>{likes}</p>
                    <button onMouseDown={(e) => {e.preventDefault()}} onClick={popularity_order}>{great_icon_con === true ? <Svg_great/> : <Svg_great2/>}</button>
                </div>
                <div className="A">
                    {
                        queze_result
                    }
                </div>
                <div className='line4'></div>

                <input type='text' ref={input_value} className='Input_basic Border_radius name_input' placeholder='이름 입력'></input>
                
                <div className='Input_basic Border_radius select_parents_div'>

                    <select name="class" className='Border_radius select_basic' ref={class_}>
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

                {/* <Queze_result roomNameRef={roomNameRef}></Queze_result> */}

                <input type='button' onMouseDown={(e) => {e.preventDefault()}} onClick={vote} value="투표하기" className='Submit_btn Submit_btn_'></input>
                
                    
            </div>
            {
                con === "투표 완료" ? <Popup text={con} func={votesuccess} opacity_={opacity_}></Popup> : null
            }
            {/* <div className='bug' title='버그 제보'>
                <Svg_bug/>
            </div> */}
            <a href="mailto:dlworjs6@dgsw.hs.kr?subject=버그 제보" className='bug' title='버그 제보'>
                <Svg_bug/>
            </a>
            <Adfit unit="DAN-moiryOKSlck2hjOA"></Adfit>
        </div>
    )
}





export default A_queze;

