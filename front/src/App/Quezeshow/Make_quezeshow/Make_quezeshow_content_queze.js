import React, {useEffect, memo, useState} from "react";
import '../../css.css';
import Choice from "./Choice";

const Make_quezeshow_content_queze = ({index,content_object,choice,setChoice,correct_choice, setCorrect_choice, content_title, setContent_title, content_explain_text, setContent_explain_text, existof_img, setExistof_img}) => {
    const [choice2, setChoice2] = useState(['','']);

    useEffect(()=>{
        console.log('Make_quezeshow_content_queze, content_obj : ',content_object,'choce : ',choice,'correct choice',correct_choice);
    })

    const add_choice = () => {
        const choice_ = choice;
        choice[index] = [...choice2,''];
        // const choice2_ = choice2;
        setChoice2(choice2 => [...choice2,'']);
        setChoice(choice => choice_);
        console.log(choice,'add choice choice : ',choice_);
    }
    const delete_choice = (ev) => {
        console.log(ev.target.id);
        const choice_ = choice;
        const choice2_ = choice2.filter((e,i)=>{
            return i !== Number(ev.target.id)
        });
        choice_[index] = choice2_;
        console.log('삭제 후 choice : ',choice_);
        setChoice2(choice => [...choice2_]);
        setChoice(choice2 => choice_);
    }
    const change_choice_text = (e) => {
        const choice_  = choice;
        const choice2_ = choice2;
        choice2_[e.target.id] = e.target.value;
        choice_[index] = [...choice2_]
        console.log('choice text 변경 후 choice : ',choice_);
        setChoice2(choice2 => [...choice2_]);
        setChoice(choice => choice_);
    }
    const change_correct_choice = (e) => {
        const correct_choice_ = correct_choice;
        correct_choice_[index] = Number(e.target.value);
        setCorrect_choice(correct_choice => [...correct_choice_]);
        console.log('change correct choice, correct choice :',correct_choice_);
    }
    const change_content_title = (e) => {
        const content_title_ = content_title;
        content_title_[index] = e.target.value;
        setContent_title(content_title => content_title_);
    }
    const change_content_explain_text = (e) => {
        const content_explain_text_ = content_explain_text;
        content_explain_text_[index] = e.target.value;
        setContent_explain_text(content_explain_text => content_explain_text_);
    }
    const change_existof_img = (e) => {
        const existof_img_ = existof_img;
        existof_img_[index] = e.target.value;
        setExistof_img(existof_img => existof_img_);
    }
    return(
        
        <>
            <div className="choice_area">
            {
                choice2.map((e,i)=>{
                    return(
                        <Choice key={i} correct_choice={correct_choice}index={index}i={i}change_choice_text={change_choice_text}change_correct_choice={change_correct_choice}choice={choice}delete_choice={delete_choice}/>
                    )
                })
            }
            </div>
            <button className="add_choice_btn all_btn" type="button" onClick={add_choice}>+</button>
            {/* <button className="add_queze_hint all_btn" type="button" onClick={add_choice}>힌트+</button> */}
        </>
    )
}
export default memo(Make_quezeshow_content_queze);
