import React, { forwardRef, useEffect, useState } from "react";
import no_img from "../Img_folder/no_image.jpg";
import Quezeshow_queze_content_video from './Quezeshow_queze_content_video';
import axios from "axios";
const Quezeshow_queze_content_type_text = forwardRef(({next_queze,descriptive_input_ref,img,data_type,uuid2,start, end, title,text, correct_choice,setCorrect_choice, correct_state}) => {
    const [timer, setTimer] = useState();
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
        console.log('correct_state',correct_state);
        axios({
            url : process.env.REACT_APP_SERVER_URL + '/select_choice_correct',
            method : 'get',
            params : {
                uuid : uuid2
            }

        }).then(res=>{
            console.log(res);
            const correct_choice_ = res.data.correct_choice.map((e,i)=>{
                return e.correct_choice;
            })
            setCorrect_choice(correct_choice => correct_choice_);
        })
    },[])

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
        </section> 
    )
})

export default Quezeshow_queze_content_type_text;
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