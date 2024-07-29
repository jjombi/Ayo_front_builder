import React, {useEffect, useRef, useState} from "react";


const Make_quezeshow_content_queze = ({index,content_object,add_choice,setChoice,setCorrect_choice}) => {

    const choice = content_object[index].choice; //[str,str] ex ['','','']
    const correct_choice = content_object[index].correct_choice; //[number] ex [0]

    const delete_choice = (ev) => {
        const choice_ = choice.filter((e,i)=>{
            // console.log(i,typeof i,ev.target.id, typeof ev.target.id);
            return i !== Number(ev.target.id)
        });
        setChoice(choice_);
    }
    const change_choice_text = (e) => {
        const choice_  = choice;
        choice_[e.target.id] = e.target.value;
        setChoice(choice_); // ['','2','dasda'] 
    }
    const change_correct_choice = (e) => {
        let correct_choice_ = correct_choice;
        correct_choice_ = Number(e.target.value);
        setCorrect_choice(correct_choice_);
    }
    return(
        
        <>
            <div className="choice_area">
            {
                choice.map((e,i)=>{
                    return(
                        <div key={i} className="each_choice_area" style={correct_choice[index] === i ? {borderBottom : '1px solid rgb(51, 255, 92)'} : null}>
                            <input type="radio" name={"correct_choice"+index} value={i} onChange={(e)=>{change_correct_choice(e)}}></input>
                            {i+1}
                            <input type="text" id={i} name="choice" value={choice[i]} className="each_choice" onChange={(e)=>{change_choice_text(e)}}></input>
                            <input type="button" id={i} value={"X"} onClick={delete_choice}></input>
                        </div>
                    )
                })
            }
            </div>
            <button className="add_choice_btn all_btn" type="button" onClick={add_choice}>+</button>
            {/* <button className="add_queze_hint all_btn" type="button" onClick={add_choice}>힌트+</button> */}
        </>
    )
}
export default Make_quezeshow_content_queze;