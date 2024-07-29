import React, { useEffect, useRef, useState } from "react";
import Header from "@header/ayo_world_rank_header";
import { useSearchParams } from 'next/navigation'
import Quezeshow_queze_content from "@quezeshow/Quezeshow_queze_content";
import Quezeshow_comment from "@quezeshow/Quezeshow_comment";
import Adfit from "@components/Adfit";
import Password_popup from "@password_popup/Password_popup";
import Quezeshow_queze_content_type_queze from "@quezeshow/Quezeshow_queze_content_type_queze";
import Quezeshow_queze_content_type_text from '@quezeshow/Quezeshow_queze_content_type_text';
import Quezeshow_result_correct from "@quezeshow/Quezeshow_result_correct";
import Quezeshow_queze_content_type_ox from "@quezeshow/Quezeshow_queze_content_type_ox";
import { shuffle, router } from "@functions/WorldRank";
import { customAxiosPost, customAxiosGet } from "@functions/Custom_axios/Custom_axios";
import { useRouter } from "next/router";
const Quezeshow_queze= () => {
    const router_ = useRouter();
    const seachParams = useSearchParams();
    const roomnum = seachParams.get('roomnum');
    const uuid = seachParams.get('uuid');
    const quezeshow_type = seachParams.get('quezeshow_type');
    const quezeshow_title = seachParams.get('title');
    const explain_text = seachParams.get('explain_text');

    const [content_state, setContent_state] = useState([]);
    const [comment_state, setComment_state] = useState([]);
    const [submit_state, setSubmit_state] = useState(false);
    const [submit_object_state, setSubmit_object_state] = useState({img : 'data:image/jpeg;base64,', title : '', text : ''})
    const [clicked, setClicked] = useState(null);
    const [popup_state, setPopup_state] = useState(false);
    const [show_index,setShow_index] = useState(0);
    const [correct_state, setCorrect_state] = useState({queze_state : false, is_correct : null});
    
    const [correct_choice,setCorrect_choice] = useState(null);
    const [correct_count,setCorrect_count] = useState(0);

    const timer_ref = useRef(0);
    const descriptive_input_ref = useRef();
    const comment_input_ref = useRef();


    
    useEffect(()=>{
        if(roomnum !== null){
            customAxiosGet({
                url : '/quezeshow_checking_existence',
                params : {roomnum : roomnum}
            }).then(res=>{
                if(res.data.length !== 0){
                    if(res.data[0].existence === 0){
                        alert('없는 콘텐츠 입니다, not exist content err');
                    }else{
                        customAxiosGet({
                            url : '/quezeshowqueze',
                            params : {roomnum : Number(roomnum)}
                            
                        }).then(res=>{
                            if(quezeshow_type === 'vote'){
                                setContent_state( content_state => [...res.data]);
                            }else{
                                const shuffle_data = shuffle(res.data);
                                setContent_state( content_state => [...shuffle_data]);//content_state.length === 퀴즈 문제 수
                            }
                            
                        })
                        customAxiosGet({
                            url : '/quezeshowcomment',
                            params : {roomnum : roomnum}
                            
                        }).then(res=>{
                            setComment_state( content_state => [...res.data]);
                        })
                
                    }
                }
                else {
                    alert('없는 콘텐츠 입니다, data null err');
                }
            })
        }
    },[roomnum])
    const submit_click = () => {
        if(clicked !== null){
            customAxiosPost({
                url : '/quezeshowqueze_plus_value',
                data : {
                    uuid2 : content_state[clicked].uuid2,
                }
                
            }).then(res=>{
                
            })
            setSubmit_state(submit_state => !submit_state);
            const obj = {img : 'data:image/jpeg;base64,'+content_state[clicked].img , title : content_state[clicked].title, text : content_state[clicked].text};
            setSubmit_object_state(submit_object_state => obj);
            
        }
    }
    
    const navi_to_quezeshowresult = () => {
        router(router_,`/quezeshow/result`,{uuid,title:quezeshow_title,explain_text,quezeshow_type,roomnum});
    }
    const upload_comment = () => {
        const today = new Date();

        const year = today.getFullYear();
        const month = ('0' + (today.getMonth() + 1)).slice(-2);
        const day = ('0' + today.getDate()).slice(-2);
        const hours = ('0' + today.getHours()).slice(-2); 
        const minutes = ('0' + today.getMinutes()).slice(-2);
        const seconds = ('0' + today.getSeconds()).slice(-2); 

        const timeString = year + '-' + month  + '-' + day + ' ' + hours + ':' + minutes  + ':' + seconds;
        customAxiosPost({
            url : '/quezeshowcomment_upload',
            data : {
                roomnum : roomnum,
                uuid : uuid,
                title : content_state[clicked].title,
                text : comment_input_ref.current.value,
                date : timeString
            },
        }).then(res=>{
            customAxiosGet({
                url : '/quezeshowcomment',
                params : {roomnum : roomnum}
                
            }).then(res=>{
                setComment_state( content_state => [...res.data]);
            })
        })
      }

    const password_checker = () => {
        setPopup_state(popup_state => !popup_state);
    }
    const correct_checker = () => {
        let result;
        if(quezeshow_type === 'multiple'){
            if(clicked === correct_choice){
                result = true;
            }else{
                result = false;
            }
        }
        else if(quezeshow_type === 'descriptive'){
            for(let i = 0; i<correct_choice.length;i++){
                if(descriptive_input_ref.current.value.trim() === correct_choice[i].trim()){
                    result = true;
                    break
                }else{
                    result = false;
                }
            }
        }else if(quezeshow_type === 'vote'){
            if(descriptive_input_ref.current.value.split(' ').join('') === content_state[show_index].answer.split(',').join('').split(' ').join('')){
                result = true;
            }else{
                result = false;
            }
        }else if(quezeshow_type === 'ox'){
            if(clicked === correct_choice){
                result = true;
            }else{
                result = false;
            }
        }
        return result;
    }
    const next_queze = () => {
        // console.log('lkrh');
        if(!correct_state.queze_state){//문제 창
            if(correct_checker()){
                const data = {queze_state : true, is_correct : true};
                setCorrect_state(correct_state => data);
                setCorrect_count(correct_count => correct_count+1);
            }else{
                const data = {queze_state : true, is_correct : false};
                setCorrect_state(correct_state => data);
            }
        }else{// 결과 창
            if(show_index+1 > content_state.length){// 마지막 문제 끝남
            }else{ // 다음 문제로
                setShow_index(show_index => show_index+1);
                setClicked(clicked => null);
                const data = {queze_state : false, is_correct : null};
                setCorrect_state(correct_state => data);                
            }
        }
        
    }
    const stop_queze = (e) => {
        if(!correct_state.queze_state){
            setShow_index(show_index => content_state.length);
        }else{
            setClicked(clicked => '');
            const data = {queze_state : false, is_correct : null};
            setCorrect_state(correct_state => data);
            setShow_index(show_index => content_state.length);
        }
    }
    const resetContent_state = () => {
        const shuffle_data = shuffle(content_state);
        setContent_state(content_state => [...shuffle_data]);
    }
    return(
        <div className="quezeshow_queze_root">
            {
                popup_state ? <Password_popup setPopup_state={setPopup_state} uuid={uuid} roomName={''} title={quezeshow_title} publicAccess={null} type={null} typeWhere={'modify_password'} quezeshow_type={quezeshow_type} queze_type={queze_type}/> : null
            }
            <Header></Header>
        
            {/* {
                window.innerWidth <= 750
                ?
                <Adfit unit="DAN-87ortfszgGZjj16M"></Adfit>
                :
                null
            } */}
            {
                show_index >= content_state.length & !correct_state.queze_state
                ?
                <Quezeshow_result_correct uuid={uuid} all_queze_num={content_state.length} correct_all_queze_num={correct_count} setShow_index={setShow_index} setClicked={setClicked} setCorrect_state={setCorrect_state} setCorrect_count={setCorrect_count} resetContent_state={resetContent_state} correct_count={correct_count}></Quezeshow_result_correct>
                :
                <>
                {
                    quezeshow_type !== 'vote' ?
                    <button className="all_btn" title={content_state.length + '문제중 ' + correct_count +'문제 정답'} onClick={stop_queze}>그만하기</button>
                    : null
                }
                <h1>{quezeshow_title}</h1>
                <h2>{explain_text}</h2>
                { 
                    submit_state
                    ?   
                    <>  
                        <section className="quezeshow_after_submit_root">
                            <div className="quezeshow_after_submit_submited_object">
                                {
                                    submit_object_state.img === 'data:image/jpeg;base64,' ? null : <img src={submit_object_state.img}></img>
                                }
                                <p className="quezeshow_after_submit_submited_object_title">{submit_object_state.title}</p>
                                <p className="quezeshow_after_submit_submited_object_text">{submit_object_state.text}</p>
                            </div>
                            {
                                quezeshow_type === 'vote' ?
                                <div className="comment_area quezeshow_after_submi_comment_area">
                                    <div className="quezeshow_result_div">
                                        <input type="text" ref={comment_input_ref} id={1} placeholder={`${submit_object_state.title}을/를 선택한 이유`}></input>
                                        <button type="button" onClick={upload_comment} className="all_btn" >^</button>
                                    </div>
                                </div>
                                :
                                null
                            }
                            
                        </section>
                        <section className="quezeshow_after_submit_comment_root">
                        {
                            comment_state.map((e,i)=>{
                                return(
                                <Quezeshow_comment key={i} title={e.title} text={e.text} likes={e.likes} uuid={e.uuid}/>
                                )
                            })
                        }
                            <div className="main2_a_queze_btn_area">
                                <button type="button" onClick={()=>{setSubmit_state(submit_state => !submit_state)}}>다시하기</button>
                                <button type="button" onClick={navi_to_quezeshowresult}>결과 보기</button>
                            </div>
                        </section>
                    </>
                        
                    : 
                    <>  
                        {   
                            quezeshow_type === 'vote'
                            ?
                            <div className="queze_list">
                                {
                                content_state.map((e,i)=>{
                                    return(
                                        <Quezeshow_queze_content key={i} index={i} img={e.img} text={e.text} title={e.title} uuid={e.uuid} clicked={clicked} setClicked={setClicked} uuid2={e.uuid2} value={null} data_type={e.data_type}/>
                                    )
                                })
                                }
                            </div>
                            :
                            quezeshow_type === 'multiple'
                            ?
                            <>
                            {
                                content_state.length !== 0 ?
                                <Quezeshow_queze_content_type_queze img={content_state[show_index].img} uuid2={content_state[show_index].uuid2} data_type={content_state[show_index].data_type} start={content_state[show_index].start} end={content_state[show_index].end} title={content_state[show_index].title} text={content_state[show_index].text} clicked={clicked} setClicked={setClicked} correct_choice={correct_choice} setCorrect_choice={setCorrect_choice} correct_state={correct_state} hint={content_state[show_index].hint} timer_ref={timer_ref}></Quezeshow_queze_content_type_queze>
                                : null
                            }
                            </>
                            :
                            quezeshow_type === 'descriptive'
                            ?
                            <>
                            {
                                content_state.length !== 0 ?
                                <Quezeshow_queze_content_type_text title={content_state[show_index].title} descriptive_input_ref={descriptive_input_ref} correct_checker={correct_checker} next_queze={next_queze} img={content_state[show_index].img} uuid2={content_state[show_index].uuid2} data_type={content_state[show_index].data_type} start={content_state[show_index].start} end={content_state[show_index].end} text={content_state[show_index].text} correct_choice={correct_choice} setCorrect_choice={setCorrect_choice} correct_state={correct_state} hint={content_state[show_index].hint} timer_ref={timer_ref}></Quezeshow_queze_content_type_text>
                                // <></>
                                : null
                            }
                            </>
                            :
                            quezeshow_type === 'ox'
                            ?
                            <>
                            {
                                content_state.length !== 0 ?
                                <Quezeshow_queze_content_type_ox img={content_state[show_index].img} uuid2={content_state[show_index].uuid2} data_type={content_state[show_index].data_type} start={content_state[show_index].start} end={content_state[show_index].end} title={content_state[show_index].title} text={content_state[show_index].text} clicked={clicked} setClicked={setClicked} correct_choice={correct_choice} setCorrect_choice={setCorrect_choice} correct_state={correct_state} hint={content_state[show_index].hint} timer_ref={timer_ref}></Quezeshow_queze_content_type_ox>
                                : null
                            }</>
                            :
                            null
                        }
        
                        <div className="main2_a_queze_btn_area">
                            {
                                quezeshow_type === 'vote' ? 
                                <>
                                    <button type="button" onClick={submit_click}>완료</button>
                                    <button type="button" onClick={navi_to_quezeshowresult}>결과 보기</button>
                                </>
                                :
                                <>
                                    <button type="button" className="all_btn" onClick={next_queze}>{'>'}</button>
                                </>
                            }
                            
                        </div>
                    </> 
                }
                </>
            }
        </div>
    )

}
export default Quezeshow_queze;