import React,{useRef} from 'react';
import { dragenter, dragover, processChange } from "./public/WorldRank";

const Make_queze_img = ({img,i,explain_text_ref, delete_img, img_name}) => {
    const explain_text_change = (e) => {
        const index = e.target.id;
        const explain_text_ref_ = [...explain_text_ref.current];
        explain_text_ref_[index] = e.target.value;
        // console.log('explain_text_change 실향 됨, index : ',index,'설명 값 : ',e.target.value,explain_text_ref.current);
        explain_text_ref.current = [...explain_text_ref_];
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
        <div className="a_queze_img" key={i}>
            <img src={img} key={i+2}></img>  
            <input type='button' className='all_btn' onClick={delete_img} id={i} key={i+5} title="이미지 삭제 버튼" value={'X'}></input>                                 
            <textarea type="text" value={explain_text_ref.current[i]} placeholder="설명" rows={1} name="text" id={i} key={i+3} onKeyDown={preventDefault} onChange={(e)=>processChange(explain_text_change(e))}></textarea>
            <input type="hidden" name="img_name" value={img_name} key={i+4}></input>
        </div>
    )
}
export default Make_queze_img;