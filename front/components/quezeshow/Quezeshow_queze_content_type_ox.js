import React, { useEffect, useState, useRef, forwardRef, memo } from "react";
// import no_img from "../Img_folder/no_image.jpg";
import axios from "axios";
// import {canvas_func} from '../public/WorldRank';
import Quezeshow_queze_content_video from './Quezeshow_queze_content_video';
const Quezeshow_queze_content_type_ox = ({img,data_type,uuid2,start, end, title,text, clicked, setClicked, correct_choice,setCorrect_choice, correct_state,hint,timer_ref}) => {
    // const [is_correct, setIs_correct] = useState(false);
    const [hint_state,setHint_state] = useState(false);
    const btn_click = (e) => {
        // console.log('clicked',e.target.id,'--',clicked);
        setClicked(clicked => e.target.id);
    }

    useEffect(()=>{
        // canvas_func(canvas_ref);
        axios({
            url : process.env.REACT_APP_SERVER_URL + '/select_choice_correct',
            method : 'get',
            params : {
                uuid : uuid2
            }

        }).then(res=>{
            console.log('adjfnrlin',res);
            setCorrect_choice(correct_choice => res.data.correct_choice[0].correct_choice);
            setInterval(() => {
                timer_ref.current += 100;
            }, 100);
        })
    },[uuid2])
    return(
        <section className="Quezeshow_queze_content_type_queze_root" style={{color : 'black'}}>
            <h1>
                {title}
            </h1>  
            <Quezeshow_queze_content_video data_type={data_type} start={start} end={end} img={img}></Quezeshow_queze_content_video>
            {

                correct_state.queze_state === true
                ?
                <>
                <h1>{correct_state.is_correct ? '정답' : '오답'}</h1>
                {/* <p>{choice[correct_choice].choice}</p> */}
                
                </>
                :
                // <section>
                //     {
                //         choice.map((e,i)=>{
                //             return (
                //                 <button key={i} type="button" id={i} style={clicked == i ? {backgroundColor : '#828282'} : null} onClick={btn_click}>{e.choice}</button>
                //             )
                //         })
                //     }
                // </section>
                <section>
                    <button type="button" id={'0'} style={clicked == '0' ? {backgroundColor : '#828282'} : null} onClick={btn_click}>O</button>
                    <button type="button" id={'1'} style={clicked == '1' ? {backgroundColor : '#828282'} : null} onClick={btn_click}>X</button>
                </section>

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
}

export default memo(Quezeshow_queze_content_type_ox);
                // :
                    // correct.is === true
                    // ?
                    // <>
                    // <h1> {correct.answer ? '정답' : '오답'}</h1>
                    // <p>{answer}</p>
                    // </>
                    // :
                    // <>
                    // <input type="text" autoFocus ref={descriptive_input_ref} onKeyUp={enter_event}></input>
                    // <h6>입력후 Enter를 눌러주세요</h6>
                    // </>