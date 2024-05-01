import React, { useEffect, useRef, useState } from "react";
import '../css.css';
import Header from "../ayo_world_rank_header";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Quezeshow_queze_content from "./Quezeshow_queze_content";
import Quezeshow_comment from "./Quezeshow_comment";
import Adfit from "../Adfit";
import Password_popup from "../Password_popup";
import Shar_content from "./Shar_content";
import Quezeshow_queze_content_type_queze from "./Quezeshow_queze_content_type_queze";
import Quezeshow_queze_content_type_text from './Quezeshow_queze_content_type_text';
import Quezeshow_result_correct from "./Quezeshow_result_correct";
const Quezeshow_queze= () => {
    const navigate = useNavigate();
    const [seachParams, setSearchParams] = useSearchParams();
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

    const descriptive_input_ref = useRef();
    const comment_input_ref = useRef();

    useEffect(()=>{
        // console.log(quezeshow_type,typeof(quezeshow_type));
        // console.log('utl : ',window.location.href);
        // console.log(roomnum,space_uuid,uuid2);
        // if(uuid2 == 'undefined' || uuid2 == null || uuid2 == 'null'){
        //     console.log('uuid2 === null');

            axios({
                url : process.env.REACT_APP_SERVER_URL + '/quezeshow_checking_existence',
                method : 'GET',
                params : {roomnum : roomnum,uuid : uuid}
            }).then(res=>{
                if(res.data.length !== 0){
                    // console.log('quezeshow_checking_existence',res,res.data[0].queze_type);
                    // setQueze_type(queze_type => res.data[0].queze_type);
                    // setQueze_type(queze_type => 0); 
                    // if(res.data[0].existence === 0){// 삭제된 콘텐츠 이면
                    //     const direction = seachParams.get('direction');
                    //     direction === 'r' ? navigate(`/quezeshow_queze?roomnum=${Number(roomnum)+1}&direction=r`) :
                    //     navigate(`/quezeshow_queze?roomnum=${Number(roomnum)-1}&direction=l`);
                    //     submit_state ? setSubmit_state(submit_state => false) : null
                    //}

                    if(res.data[0].existence === 0){
                        alert('없는 콘텐츠 입니다');
                    }else{

                        // quezeshow_title.current = res.data[0].title;
                        // if(quezeshow_type === 'vote'){ // quezeshow typ is vote
                            axios({
                                url : process.env.REACT_APP_SERVER_URL + '/quezeshowqueze',
                                method : 'GET',
                                params : {roomnum : roomnum}
                                
                            }).then(res=>{
                                // console.log('content',res);
                                setContent_state( content_state => [...res.data]);//content_state.length === 퀴즈 문제 수
                                
                            })
                            axios({
                                url : process.env.REACT_APP_SERVER_URL + '/quezeshowcomment',
                                method : 'GET',
                                params : {roomnum : roomnum}
                                
                            }).then(res=>{
                                // console.log('comment',res);
                                setComment_state( content_state => [...res.data]);
                            })
                        // }else if(quezeshow_type === 'queze'){ // quezeshow type is queze
                        //     axios({
                        //         url : process.env.REACT_APP_SERVER_URL + '/quezeshowqueze_type_queze',
                        //         method : 'GET',
                        //         params : {roomnum : roomnum,uuid : uuid}
                                
                        //     }).then(res=>{
                        //         console.log('content',res);
                        //         setContent_state( content_state => [...res.data]);
                                
                        //     })
                        //     // setContent_state( content_state => [
                        //     //     {
                        //     //         uuid : 'e.uuid',
                        //     //         uuid2 : 'e.uuid2',
                        //     //         roomnum : 'e.roomnum',
                        //     //         title : 'e.title',
                        //     //         text : 'e.text',
                        //     //         value1 : 'e.value1',
                        //     //         value2 : 'e.value2',
                        //     //         value3 : 'e.value3',
                        //     //         value4 : 'e.value4',
                        //     //         answer : 'e.value4',
                        //     //         img : ''
                        //     //     }
                        //     // ]);
                        // }else if(quezeshow_type === 'Continue_speak'){
                        //     axios({
                        //         url : process.env.REACT_APP_SERVER_URL + '/quezeshowqueze_type_text',
                        //         method : 'GET',
                        //         params : {roomnum : roomnum,uuid : uuid}
                                
                        //     }).then(res=>{
                        //         console.log('content',res);
                        //         setContent_state( content_state => [...res.data]);
                                
                        //     })
                        //     // const asdadada = [{
                        //     //     uuid     : 'uuid',
                        //     //     uuid2    : 'uuid2',
                        //     //     roomnum  : 10,
                        //     //     title    : '바나나',
                        //     //     answer   : '차차',
                        //     // }]
                        //     // setContent_state(content_state => [...asdadada])
                        // }
                        // else if(quezeshow_type === 'New_word_queze'){
                        //     axios({
                        //         url : process.env.REACT_APP_SERVER_URL + '/quezeshowqueze_type_text',
                        //         method : 'GET',
                        //         params : {roomnum : roomnum,uuid : uuid}
                                
                        //     }).then(res=>{
                        //         console.log('content',res.data[0].answer.split(','));
                        //         setContent_state( content_state => [...res.data]);
                                
                        //     })
                        // }else{
                        //     alert('quezeshow type err')
                        // }
                        
                    }
                }
                else {
                    alert('없는 콘텐츠 입니다');
                }
            })

        // }
        // else{
            // console.log('uuid2 !== null');
            // axios({
            //     url : process.env.REACT_APP_SERVER_URL + '/spacequezeshowtitle',
            //     method : 'GET',
            //     params : {
            //         roomnum : roomnum,
            //         uuid : space_uuid,
            //     }
            // }).then(res=>{
            //     // console.log('quezeshow title res',res,res.data[0].existence);
            //     if(res.data.length !== 0){ // 마지막이 아니면
            //         if(res.data[0].existence == 0){// 삭제된 콘텐츠 이면
            //             const direction = seachParams.get('direction');
            //             direction === 'r' ? navigate(`/quezeshow_queze?roomnum=${Number(roomnum)+1}&uuid=${space_uuid}&uuid2=${uuid2}&direction=r`) :
            //             navigate(`/quezeshow_queze?roomnum=${Number(roomnum)-1}&uuid=${space_uuid}&uuid2=${uuid2}&direction=l`);
            //             submit_state ? setSubmit_state(submit_state => false) : null
            //         }else{
            //             quezeshow_title.current = res.data[0].title;
            //             axios({
            //                 url : process.env.REACT_APP_SERVER_URL + '/spacequezeshowqueze',
            //                 method : 'GET',
            //                 params : {
            //                     roomnum : roomnum,
            //                     uuid : space_uuid,
            
            //                 }
                            
            //             }).then(res=>{
            //                 console.log('content',res);    
            //                 setContent_state( content_state => [...res.data]);
            //                 uuid.current = res.data[0].uuid;
                            
            //             })
            //             axios({
            //                 url : process.env.REACT_APP_SERVER_URL + '/spacequezeshowcomment',
            //                 method : 'GET',
            //                 params : {
            //                     roomnum : roomnum,
            //                     uuid : space_uuid,
            //                     uuid2 : uuid2
            //                 }
                            
            //             }).then(res=>{
            //                 console.log('comment',res);
            //                 setComment_state( content_state => [...res.data]);
            //             })
            //         }
            //     }
            //     else {
            //         alert('마지막 입니다');
            //         navigate(`/quezeshow_queze?roomnum=${Number(roomnum)-1}&uuid=${space_uuid}&uuid2=${uuid2}&direction=l`);
            //     }
            // })
        // }
    },[roomnum])
    const submit_click = () => {
        // console.log('submit clicked');
        if(clicked !== null){
            axios({
                url : process.env.REACT_APP_SERVER_URL + '/quezeshowqueze_plus_value',
                method : 'POST',
                data : {
                    uuid2 : content_state[clicked].uuid2,
                }
                
            }).then(res=>{
                // console.log(res);
                
            })
            setSubmit_state(submit_state => !submit_state);
            const obj = {img : 'data:image/jpeg;base64,'+content_state[clicked].img , title : content_state[clicked].title, text : content_state[clicked].text};
            setSubmit_object_state(submit_object_state => obj);
            
        }
    }
    
    const navi_to_quezeshowresult = () => {
        navigate(`/quezeshow_result?roomnum=${roomnum}&uuid=${uuid.current}&quezeshow_type=${quezeshow_type}`);
    }
    const upload_comment = () => {
        // console.log(content_state[clicked].title,comment_input_ref.current.value,content_state);
        // console.log(uuid2);
        // if(uuid2 != 'undefined'){
        //     console.log(uuid,uuid2,roomnum,content_state[clicked].title,comment_input_ref.current);
        //     axios({
        //         url : process.env.REACT_APP_SERVER_URL + '/spacequezeshowcomment_upload',
        //         method : 'POST',
        //         data : {
        //             roomnum : roomnum,
        //             uuid : uuid.current,
        //             uuid2 : uuid2,
        //             title : content_state[clicked].title,
        //             text : comment_input_ref.current.value
        //         },
        //         headers : {
        //             'Content-Type' : 'application/json'
        //         }
        //     }).then(res=>{
        //         console.log('comment upload rres',res);
        //         axios({
        //             url : process.env.REACT_APP_SERVER_URL + '/spacequezeshowcomment',
        //             method : 'GET',
        //             params : {
        //                 roomnum : roomnum,
        //                 uuid : space_uuid,
        //                 uuid2 : uuid2,
        //             }
                    
        //         }).then(res=>{
        //             console.log('comment',res);
        //             setComment_state( content_state => [...res.data]);
        //             // return(
        //             //   res.data
        //             // )
        //         })
        //     })
        // }
        // else{
            const today = new Date();

            const year = today.getFullYear();
            const month = ('0' + (today.getMonth() + 1)).slice(-2);
            const day = ('0' + today.getDate()).slice(-2);
            const hours = ('0' + today.getHours()).slice(-2); 
            const minutes = ('0' + today.getMinutes()).slice(-2);
            const seconds = ('0' + today.getSeconds()).slice(-2); 

            const timeString = year + '-' + month  + '-' + day + ' ' + hours + ':' + minutes  + ':' + seconds;
            axios({
                url : process.env.REACT_APP_SERVER_URL + '/quezeshowcomment_upload',
                method : 'POST', 
                data : {
                    roomnum : roomnum,
                    uuid : uuid,
                    title : content_state[clicked].title,
                    text : comment_input_ref.current.value,
                    date : timeString
                },
                headers : {
                    'Content-Type' : 'application/json'
                }
            }).then(res=>{
                // console.log('comment upload rres',res);
                axios({
                    url : process.env.REACT_APP_SERVER_URL + '/quezeshowcomment',
                    method : 'GET',
                    params : {roomnum : roomnum}
                    
                }).then(res=>{
                    // console.log('comment',res);
                    setComment_state( content_state => [...res.data]);
                })
            })
        // }
      }
    // const shar = () => {
    //     setShar_state(shar_state => !shar_state);
    // }
    // const search_enter = (e) => {
    //     console.log('seach 중',search_value_ref.current.value,e.target.id);
    //     if(e.key === 'Enter'){
    //         axios({
    //             url : process.env.REACT_APP_SERVER_URL + '/shar_quezeshow',
    //             method : 'GET',
    //             params : {
    //                 value : search_value_ref.current.value
    //             }
    //         }).then((res)=>{
    //             console.log(res);
    //             if(res.data !== false){
    //                 setShar_content_state(shar_content_state => [...res.data]);
    //             }
    //         })
    //     }
    // }
    // const search_btn_enter = () => {
    //     axios({
    //         url : process.env.REACT_APP_SERVER_URL + '/shar_quezeshow',
    //         method : 'GET',
    //         params : {
    //             value : search_value_ref.current.value
    //         }
    //     }).then((res)=>{
    //         console.log(res);
    //         if(res.data !== false){
    //             setShar_content_state(shar_content_state => [...res.data]);
    //         }        
    //     })
    // }
    const password_checker = () => {
        setPopup_state(popup_state => !popup_state);
    }
    const correct_checker = () => {
        let result;
        // console.log('correct_checker',quezeshow_type);
        if(quezeshow_type === 'multiple'){
            if(clicked === correct_choice){
                result = true;
            }else{
                result = false;
            }
        }
        else if(quezeshow_type === 'descriptive'){
            for(let i = 0; i<correct_choice.length;i++){
                // console.log('descriptive :',descriptive_input_ref.current.value,correct_choice[i]);
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
        }
        return result;
    }
    const next_queze = () => {
        // console.log('next queze 실행됨');   
        if(!correct_state.queze_state){//문제 창
            // console.log('1');
            if(correct_checker()){
                const data = {queze_state : true, is_correct : true};
                setCorrect_state(correct_state => data);
                setCorrect_count(correct_count => correct_count+1);
            }else{
                const data = {queze_state : true, is_correct : false};
                setCorrect_state(correct_state => data);
            }
        }else{// 결과 창
            // console.log('content_state.length',content_state.length,show_index);
            if(show_index+1 >= content_state.length){// 마지막 문제 끝남
                // console.log('퀴즈 끝남',show_index+1 >= content_state.length, correct_state.queze_state);
            }else{ // 다음 문제로
                // console.log('다음 문제',show_index);
                setShow_index(show_index => show_index+1);
                setClicked(clicked => '');
                const data = {queze_state : false, is_correct : null};
                setCorrect_state(correct_state => data);
            }
        }
        
    }
    // const queze_is_done_checker = () => {
    //     let return_data;
    //     if(show_index+1 === content_state.length-1 && correct === true){
    //         return_data = true;
    //     }else{
    //         return_data = false;
    //     }
    //     console.log('return_data',return_data);
    //     return return_data;
    // }
    return(
        <div className="quezeshow_queze_root">
            {
                popup_state ? <Password_popup setPopup_state={setPopup_state} uuid={uuid} roomName={''} title={quezeshow_title} publicAccess={null} type={null} typeWhere={'modify_password'} quezeshow_type={quezeshow_type} queze_type={queze_type}/> : null
            }
            <Header></Header>
            {/* <header className="Main2_a_queze_header">
                <button type="button" title="퀴즈쇼 수정하기." className="all_btn a_queze_header_btn" onClick={password_checker}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                    <path d="M3 3V2.5H2.5V3H3ZM12.6464 13.3536C12.8417 13.5488 13.1583 13.5488 13.3536 13.3536C13.5488 13.1583 13.5488 12.8417 13.3536 12.6464L12.6464 13.3536ZM3.5 11V3H2.5V11H3.5ZM3 3.5H11V2.5H3V3.5ZM2.64645 3.35355L12.6464 13.3536L13.3536 12.6464L3.35355 2.64645L2.64645 3.35355Z" fill="#222222"/>
                    <path d="M4 15V15C4 16.8692 4 17.8038 4.40192 18.5C4.66523 18.9561 5.04394 19.3348 5.5 19.5981C6.19615 20 7.13077 20 9 20H14C16.8284 20 18.2426 20 19.1213 19.1213C20 18.2426 20 16.8284 20 14V9C20 7.13077 20 6.19615 19.5981 5.5C19.3348 5.04394 18.9561 4.66523 18.5 4.40192C17.8038 4 16.8692 4 15 4V4" stroke="#222222" strokeLinecap="round"/>
                    </svg>
                    퀴즈쇼 수정하기
                </button>

            </header> */}
            
            {
                window.innerWidth <= 750
                ?
                <Adfit unit="DAN-87ortfszgGZjj16M"></Adfit>
                :
                null
            }
            {
                show_index+1 >= content_state.length & correct_state.queze_state
                ?
                <Quezeshow_result_correct all_queze_num={content_state.length} correct_all_queze_num={correct_count} setShow_index={setShow_index} setClicked={setClicked} setCorrect_state={setCorrect_state}></Quezeshow_result_correct>
                :
                <>
                <h1>{quezeshow_title}</h1>
                <h1>{explain_text}</h1>
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
                                // console.log('comment',e);
                                return(
                                <Quezeshow_comment key={i} title={e.title} text={e.text} likes={e.likes} uuid={e.uuid}/>
                                )
                            })
                        }
                            <div className="main2_a_queze_btn_area">
                                <button type="button" onClick={()=>{setSubmit_state(submit_state => !submit_state);}}>다시하기</button>
                                <button type="button" onClick={navi_to_quezeshowresult}>결과 보기</button>
                            </div>
                        </section>
                        
                        {/* <section className="quezeshow_after_submit_root">
                            
                        </section> */}
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
                                <Quezeshow_queze_content_type_queze img={content_state[show_index].img} uuid2={content_state[show_index].uuid2} data_type={content_state[show_index].data_type} start={content_state[show_index].start} end={content_state[show_index].end} title={content_state[show_index].title} text={content_state[show_index].text} clicked={clicked} setClicked={setClicked} correct_choice={correct_choice} setCorrect_choice={setCorrect_choice} correct_state={correct_state}></Quezeshow_queze_content_type_queze>
                                : null
                            }
                            </>
                            :
                            quezeshow_type === 'descriptive'
                            ?
                            <>
                            {
                                content_state.length !== 0 ?
                                <Quezeshow_queze_content_type_text title={content_state[show_index].title} descriptive_input_ref={descriptive_input_ref} correct_checker={correct_checker} next_queze={next_queze} img={content_state[show_index].img} uuid2={content_state[show_index].uuid2} data_type={content_state[show_index].data_type} start={content_state[show_index].start} end={content_state[show_index].end} text={content_state[show_index].text} correct_choice={correct_choice} setCorrect_choice={setCorrect_choice} correct_state={correct_state}></Quezeshow_queze_content_type_text>
                                : null
                            }
                            </>
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
                                    <button type="button" onClick={next_queze}>{'>'}</button>
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