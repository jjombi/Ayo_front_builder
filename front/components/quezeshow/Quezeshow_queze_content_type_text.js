import React, { forwardRef, useEffect, useState, memo } from "react";
// import no_img from "../Img_folder/no_image.jpg";
import Quezeshow_queze_content_video from './Quezeshow_queze_content_video';
import axios from "axios";
import { customAxiosGet, customAxiosPost } from "@functions/Custom_axios/Custom_axios";

const Quezeshow_queze_content_type_text = forwardRef(({next_queze,descriptive_input_ref,img,data_type,uuid2,start, end, title,text, correct_choice,setCorrect_choice, correct_state,hint,timer_ref}) => {
    const [timer, setTimer] = useState();
    const [hint_state,setHint_state] = useState(false);

    // console.log('hint',hint);
    // useEffect(()=>{
    //     // setTimer(timer => )
    //     if(answer.length > 20){
    //         setTimer(timer => 8)
    //     }else if(answer.length > 10){
    //         setTimer(timer => 6)
    //     }else {
    //         setTimer(timer => 4)
    //     }
    // },[answer])

    // useEffect(() => {
    //     console.log('timer 값 바뀌어서 useeffect',descriptive_input_ref.current);
    //     const id = setInterval(() => {
    //       setTimer(timer => timer - 1);
    //     }, 1000);
        
    //     if(timer === 0 ) {
    //         clearInterval(id);
    //         next_queze();
    //     }
    //     return () => clearInterval(id);
    // }, [timer]);

    useEffect(()=>{
        // console.log('correct_state',correct_state);
        customAxiosGet({
            url : '/select_choice_correct',
            params : {
                uuid : uuid2
            }

        }).then(res=>{
            // console.log('set new correct choice',res);
            const correct_choice_ = res.data.correct_choice.map((e,i)=>{
                return e.correct_choice;
            })
            setCorrect_choice(correct_choice => correct_choice_);
        })
    },[uuid2])

    const click_enter = (e) => {
        if(e.key === 'Enter'){
            next_queze();
        }
    }

    return(
        <section className="Quezeshow_queze_content_type_queze_root">
            {   
                correct_state.queze_state === true
                ?
                <>
                <h1> {correct_state.is_correct ? '정답' : '오답' }</h1>
                <h1>정답 : {correct_choice[0]}</h1>
                
                </>
                :
                <>
                <h1 className="type_text_h1">
                    {title}
                </h1>
                <Quezeshow_queze_content_video data_type={data_type} start={start} end={end} img={img}></Quezeshow_queze_content_video>
                <input ref={descriptive_input_ref} onKeyUp={click_enter} autoFocus></input>
                <h6 className="guide_text">입력후 Enter를 누르세요!</h6>
                </>
            }
            <button className="hint_btn all_btn" onClick={()=>{setHint_state(hint_state => !hint_state)}}>Hint</button>
            {
                hint_state?
                <p className="hint_text">{hint === '' || hint === null ? '없음' : hint}</p>
                :
                null
            }
        </section> 
    )
})

export default memo(Quezeshow_queze_content_type_text);
{/* {
    timer !== null
    ?
    timer < 4
    ?
    timer <= 0
    ?
    <h2 className="timer_ani2">end</h2>
    :
    <h2 className="timer_ani1">{timer}</h2>
    :
    <h2 className="timer_ani2">{timer}</h2>
    :
    null
} */}
{/* {
    quezeshow_type === 'Continue_speak'
    ?
    <p>{title+' '+answer}</p>
    :
    <p>{answer.split(',').join('')}</p>
} */}