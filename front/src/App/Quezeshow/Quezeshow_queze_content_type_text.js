import React, { useState } from "react";
import no_img from "../Img_folder/no_image.jpg";

const Quezeshow_queze_content_type_text = ({title,descriptive_input_ref, correct, correct_checker, answer}) => {
    
    return(
        <section className="Quezeshow_queze_content_type_queze_root">
            {
                correct === true
                ?
                <>
                <h1> {correct_checker() ? '정답' : '오답' }</h1>
                <p>{title+' '+answer}</p>
                </>
                :
                <>
                <h1 className="type_text_h1">
                    {title}
                </h1>
                <input ref={descriptive_input_ref}></input>
                </>
            }
        </section> 
    )
}

export default Quezeshow_queze_content_type_text;