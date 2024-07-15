import React, {useEffect, useRef, useState} from "react";
const Make_quezeshow_content_text = ({content_object,delete_correct_choice_descriptive,change_correct_choice_descriptive,index}) => {

    const correct_choice = content_object[index].correct_choice; //[number] ex [0]

    return(
        <section className="make_quezeshow_content_root">
            <input type="text" className="title" placeholder="정답" onKeyUp={(e)=>change_correct_choice_descriptive(e,index)}></input>
            <div className="correct_choice_descriptive_area">
                {
                    correct_choice.map((e,i)=>{
                        return (
                            <span key={i}>
                                <p>{e}</p>
                                <button type="button" id={i} className="all_btn" onClick={(e)=>delete_correct_choice_descriptive(e,index)}>X</button>
                            </span>
                        )
                    })
                }
            </div>
        </section>
    )
}
export default Make_quezeshow_content_text;
 