import React, { memo } from "react";

const Choice = ({correct_choice,index,i,change_choice_text,change_correct_choice,choice,delete_choice}) => {
    return(
        <div className="each_choice_area" style={correct_choice[index] === i ? {borderBottom : '1px solid rgb(51, 255, 92)'} : null}>
            <input type="radio" name={"correct_choice"+index} value={i} onChange={(e)=>{change_correct_choice(e)}}></input>
            {i+1}
            <input type="text" id={i} name="choice" value={choice[index][i]} className="each_choice" onChange={(e)=>{change_choice_text(e)}}></input>
            <input type="button" id={i} value={"X"} onClick={delete_choice}></input>
        </div>
    )
}
export default memo(Choice);