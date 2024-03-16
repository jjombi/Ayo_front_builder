import React, { useEffect, useState, useRef, forwardRef } from "react";
import no_img from "../Img_folder/no_image.jpg";

const Quezeshow_queze_content_type_queze = ({img,v1,v2,v3,v4,answer,title,text, clicked, setClicked,queze_type, correct,descriptive_input_ref}) => {
    // const [is_correct, setIs_correct] = useState(false);
    const btn_click = (e) => {
        console.log('clicked',e.target.id,'--',clicked);
        // setClicked(clicked => e.target.id);
    }
    useEffect(()=>{
        console.log('correct',correct);
    })
    
    // useEffect(()=>{
    //     if(!correct){
    //         // console.log(correct_checker());
    //         console.log('2');
    //         if(correct_checker()){
    //             setIs_correct(is_correct => true);
    //         }else{
    //             setIs_correct(is_correct => false);
    //         }
    //     }
    // },[correct])
    return(
        <section className="Quezeshow_queze_content_type_queze_root" style={{color : 'black'}}>
            <h1>
                {title}
            </h1>
            <h4>
                {text}
            </h4>
            {
                img === 'data:image/jpeg;base64,' ? <img src={no_img}></img> : <img src={img}></img>
            }
            {
                console.log(queze_type,typeof(queze_type),)
            }
            {
                Number(queze_type) === 1 
                ?
                    correct.is === true
                    ?
                    <>
                    <h1> {correct.answer ? '정답' : '오답'}</h1>
                    <p>{answer}</p>
                    </>
                    :
                    <section>
                    <button type="button" id={v1} style={clicked === v1 ? {backgroundColor : '#828282'} : null} onClick={btn_click}>{v1}</button>
                    <button type="button" id={v2} style={clicked === v2 ? {backgroundColor : '#828282'} : null} onClick={btn_click}>{v2}</button>
                    <button type="button" id={v3} style={clicked === v3 ? {backgroundColor : '#828282'} : null} onClick={btn_click}>{v3}</button>
                    <button type="button" id={v4} style={clicked === v4 ? {backgroundColor : '#828282'} : null} onClick={btn_click}>{v4}</button>
                    </section>
                :
                    correct.is === true
                    ?
                    <>
                    <h1> {correct.answer ? '정답' : '오답'}</h1>
                    <p>{answer}</p>
                    </>
                    :
                    <input type="text" ref={descriptive_input_ref}></input>
                
            }
        </section> 
    )
}

export default forwardRef(Quezeshow_queze_content_type_queze);