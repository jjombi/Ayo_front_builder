import React from 'react';
import { processChange } from "./public/WorldRank";

const Make_queze_modify = ({img,early_text, uuid, modify_text_ref, index}) => {
    console.log('make queze modify ');
    const explain_text_change = (e) => {
        console.log(e.target.value);
        const modify_text_ref_ = [...modify_text_ref.current];
        console.log('modify text ref_',modify_text_ref_);
        modify_text_ref_[index] = {uuid : uuid,text : e.target.value};
        modify_text_ref.current = [...modify_text_ref_];
        // const index = e.target.id;
        // const explain_text_ref_ = [...explain_text_ref.current];
        // explain_text_ref_[index] = e.target.value;
        // console.log('explain_text_change 실향 됨, index : ',index,'설명 값 : ',e.target.value,explain_text_ref.current);
        // explain_text_ref.current = [...explain_text_ref_];
    }
    const preventDefault = (e) => {
        // console.log('preventDefault and clicked this input');
        if(e.keyCode === 13){
            // console.log('preventDefault and clicked enter');
            e.preventDefault();
            e.target.value += '\n';
        }
        if(e.target.value.length > 40) {
            alert('40자 이하로 작성 하세요');
            e.target.value = e.target.value.slice(0,40);
        }
        
    }


    return(
        // <div style={{color : 'red'}}>aaasads</div>
        <div className="a_queze_img" >
            <img src={img} ></img>  
            {/* <input type='button' className='all_btn' onClick={delete_img} id={i} title="이미지 삭제 버튼" value={'X'}></input>                                  */}
            <textarea type="text" id={index} defaultValue={early_text} placeholder="설명" rows={1} name="text"  onKeyDown={preventDefault} onChange={(e)=>processChange(explain_text_change(e))}></textarea>
            {/* <input type="hidden" name="img_name" value={img_name} ></input> */}
        </div>
    )
}
export default Make_queze_modify;