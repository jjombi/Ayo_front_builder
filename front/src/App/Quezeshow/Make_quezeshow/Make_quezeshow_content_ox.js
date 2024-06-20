import React, {useEffect, useRef, useState} from "react";
import '../../css.css';
import { dragenter, dragover, processChange } from "../../public/WorldRank";
import img from '../../Img_folder/no_image.jpg';
import {chenge_textarea_height } from '../../public/WorldRank';

const Make_quezeshow_content_ox = ({index,content_object,correct_choice, setCorrect_choice}) => {
    const [choice2, setChoice2] = useState(['','']);

    useEffect(()=>{
        console.log('Make_quezeshow_content_ox, content_obj : ',content_object,'correct choice',correct_choice);
    })

    const change_correct_choice = (e) => {
        const correct_choice_ = correct_choice;
        correct_choice_[index] = Number(e.target.value);
        
        setCorrect_choice(correct_choice => [...correct_choice_]);
        console.log('change correct choice, correct choice :',correct_choice_);
    }
    return(
        
        <>
            <div className="choice_area">
                <div className="each_choice_area" style={correct_choice[index] === 0 ? {borderBottom : '1px solid rgb(51, 255, 92)'} : null}>
                    <input type="radio" name={"correct_choice"+index} value={0} onChange={(e)=>{change_correct_choice(e)}}></input>
                    <h1>O</h1>
                </div>
                <div className="each_choice_area" style={correct_choice[index] === 1 ? {borderBottom : '1px solid rgb(51, 255, 92)'} : null}>
                    <input type="radio" name={"correct_choice"+index} value={1} onChange={(e)=>{change_correct_choice(e)}}></input>
                    <h1>X</h1>
                </div>
            </div>
            {/* <button className="add_choice_btn all_btn" type="button" onClick={add_choice}>+</button> */}
            {/* <button className="add_queze_hint all_btn" type="button" onClick={add_choice}>힌트+</button> */}
        </>
    )
}
export default Make_quezeshow_content_ox;