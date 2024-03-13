import React from 'react';
import { processChange } from "../public/WorldRank";
import no_img from '../Img_folder/no_image.jpg';
const Make_quezeshow_modify_content = ({img,early_text, early_title, uuid, changed_object_ref, index,answer,v1,v2,v3,v4,quezeshow_type, queze_type}) => {
    console.log('make queze modify ',quezeshow_type,queze_type);
    const explain_text_change_vote = (e) => {
        // console.log(e.target.value);
        const changed_object_ref_ = [...changed_object_ref.current];
        // console.log('changed_object_ref_',changed_object_ref_);
        changed_object_ref_[index] = {uuid : changed_object_ref_[index].uuid,text : e.target.value, title : changed_object_ref_[index].title};
        changed_object_ref.current = [...changed_object_ref_];
    }
    const explain_title_change_vote = (e) => {
        // console.log(e.target.value);
        const changed_object_ref_ = [...changed_object_ref.current];
        // console.log('changed_object_ref_',changed_object_ref_);
        changed_object_ref_[index] = {uuid : changed_object_ref_[index].uuid,text : changed_object_ref_[index].text, title : e.target.value};
        changed_object_ref.current = [...changed_object_ref_];
    }  
    const explain_title_change_text = (e) => {
        // console.log(e.target.value);
        const changed_object_ref_ = [...changed_object_ref.current];
        // console.log('changed_object_ref_',changed_object_ref_);
        changed_object_ref_[index] = {uuid : changed_object_ref_[index].uuid,answer : changed_object_ref_[index].answer, title : e.target.value};
        changed_object_ref.current = [...changed_object_ref_];
    }
    const explain_text_change_text = (e) => {
        // console.log(e.target.value);
        const changed_object_ref_ = [...changed_object_ref.current];
        console.log('changed_object_ref_',changed_object_ref_);
        changed_object_ref_[index] = {uuid : changed_object_ref_[index].uuid,answer : e.target.value, title : changed_object_ref_[index].title};
        changed_object_ref.current = [...changed_object_ref_];
    }
    const explain_title_change_queze = (e) => {
        const changed_object_ref_ = [...changed_object_ref.current];
        changed_object_ref_[index].title = e.target.value;
        console.log('changed_object_ref_ 변경 후',changed_object_ref_);
        changed_object_ref.current = [...changed_object_ref_];
    }
    const explain_text_change_queze = (e) => {
        console.log('explain_title_change_queze',e.target.value);
        const changed_object_ref_ = [...changed_object_ref.current];
        changed_object_ref_[index].text = e.target.value;
        console.log('changed_object_ref_ 변경 후',changed_object_ref_);
        changed_object_ref.current = [...changed_object_ref_];
    }
    const explain_text_change_value = (e) => {
        console.log('explain_title_change_queze',e.target.value,e.target.id);
        const changed_object_ref_ = [...changed_object_ref.current];
        if(e.target.id === 'v1'){
            changed_object_ref_[index].value1 = e.target.value;
        }
        else if(e.target.id === 'v2'){
            changed_object_ref_[index].value2 = e.target.value;
        }
        else if(e.target.id === 'v3'){
            changed_object_ref_[index].value3 = e.target.value;
        }
        else if(e.target.id === 'v4'){
            changed_object_ref_[index].value4 = e.target.value;
        }
        console.log('changed_object_ref_ 변경 후',changed_object_ref_);
        changed_object_ref.current = [...changed_object_ref_];
    }
    const explain_text_change_queze_answer = (e) => {
        console.log('explain_title_change_queze',e.target.value);
        const changed_object_ref_ = [...changed_object_ref.current];
        changed_object_ref_[index].answer = e.target.value;
        console.log('changed_object_ref_ 변경 후',changed_object_ref_);
        changed_object_ref.current = [...changed_object_ref_];
    }


    return(
        // <div style={{color : 'red'}}>aaasads</div>
        // <div className="a_queze_img" >
        //     {
        //         img === 'data:image/jpeg;base64,' ? 
        //         <img src={no_img}></img>:
        //         <img src={img} ></img>  
        //     }
        //     {/* <input type='button' className='all_btn' onClick={delete_img} id={i} title="이미지 삭제 버튼" value={'X'}></input>                                  */}
        //     <textarea type="text" id={index} defaultValue={early_title} placeholder="설명" rows={1} name="text"  onKeyDown={preventDefault} processChange()onChange={(e)=>{(}e)=>processChange(explain_text_change(e))}></textarea>
        //     {/* <input type="hidden" name="img_name" value={img_name} ></input> */}
        // </div>
        // <section className="make_quezeshow_content_root" >
        <section className='quezeshow_queze_content_root'>
        {/* <input className="make_quezeshow_content_deletebtn" type="button" onClick={delete_} value={"X"}></input> */}
        {/* {
            src === '' || src === 'data:image/jpeg;base64,' 
            ?
            <img src={img} className="make_quezeshow_content_img"></img>
            :
            <img src={src} className="make_quezeshow_content_img"></img>
        } */}
        {
            quezeshow_type === 'vote' && quezeshow_type === 'queze'
            ?
            <>
            {
            img === 'data:image/jpeg;base64,' ? 
            <img src={no_img}></img>:
            <img src={img} ></img>  
            }
            </>
            :
            null
        }
        
        {/* <input type="text" hidden value={img_tinyint} name="img_tinyint" readOnly></input> */}
        {/* <label className="make_quezeshow_content_label allbtn" htmlFor="file">
            <div className="allbtn">파일 업로드하기</div>
        </label> */}
        {/* <input id="file" type="file" className="make_quezeshow_content_file allbtn" onChange={(e)=>{processChange()e}=>{change_img(e)}} onDragEnter ={dragenter} onDragLeave={dragover}></input> */}
        {/* <div className="make_quezeshow_content_file_onpaste allbtn" onPaste={onpaste}>
            <p className="allbtn">이미지 붙여 넣기</p>
        </div> */}
        {
            quezeshow_type === 'vote'
            ?
            <>
                <input type="text" maxLength={80} className="Make_quezeshow_content_title" placeholder="제목" defaultValue={early_title} onChange={(e)=>{processChange(explain_title_change_vote(e))}}></input>
                <textarea type="text" maxLength={3000}  className="Make_quezeshow_content_text" placeholder="설명" defaultValue={early_text} onChange={(e)=>{processChange(explain_text_change_vote(e))}}></textarea>
            </>
            :
            quezeshow_type === 'text'
            ?
            <>
            <input type="text" maxLength={80} className="Make_quezeshow_content_title" placeholder="제목" defaultValue={early_title} onChange={(e)=>{processChange(explain_title_change_text(e))}}></input>
            <textarea type="text" maxLength={120}  className="Make_quezeshow_content_text" placeholder="설명" defaultValue={answer} onChange={(e)=>{processChange(explain_text_change_text(e))}}></textarea>
            </>
            :
            <>
                {
                Number(queze_type) === 1
                ?
                <>
                <input type="text" maxLength={80} className="Make_quezeshow_content_title" placeholder="제목" defaultValue={early_title} onChange={(e)=>{processChange(explain_title_change_queze(e))}}></input>
                <textarea type="text" maxLength={1000}  className="Make_quezeshow_content_text" placeholder="설명" defaultValue={answer} onChange={(e)=>{processChange(explain_text_change_queze(e))}}></textarea>
                <section className="value_input">
                    <input type="text" maxLength={80} placeholder="답1" name="value1" id='v1' defaultValue={v1} onChange={(e)=>{processChange(explain_text_change_value(e))}}></input>
                    <input type="text" maxLength={80} placeholder="답2" name="value2" id='v2' defaultValue={v2} onChange={(e)=>{processChange(explain_text_change_value(e))}}></input>
                    <input type="text" maxLength={80} placeholder="답3" name="value3" id='v3' defaultValue={v3} onChange={(e)=>{processChange(explain_text_change_value(e))}}></input>
                    <input type="text" maxLength={80} placeholder="답4" name="value4" id='v4' defaultValue={v4} onChange={(e)=>{processChange(explain_text_change_value(e))}}></input>
                </section>
                <input className="anwer_input" type="text" maxLength={80} placeholder="정답" name="answer" defaultValue={answer} onChange={(e)=>{processChange(explain_text_change_queze_answer(e))}}></input>
                </>
                
                :
                <>
                <input type="text" maxLength={80} className="Make_quezeshow_content_title" placeholder="제목" defaultValue={early_title} onChange={(e)=>{processChange(explain_title_change_queze(e))}}></input>
                <textarea type="text" maxLength={1000}  className="Make_quezeshow_content_text" placeholder="설명" defaultValue={answer} onChange={(e)=>{processChange(explain_text_change_queze(e))}}></textarea>
                <section className="value_input">
                    <input type="text" maxLength={80} placeholder="정답 인정 범위" name="value1" id='v1' defaultValue={v1} onChange={(e)=>{processChange(explain_text_change_value(e))}}></input>
                    <input type="text" maxLength={80} placeholder="정답 인정 범위" name="value2" id='v2' defaultValue={v2} onChange={(e)=>{processChange(explain_text_change_value(e))}}></input>
                    <input type="text" maxLength={80} placeholder="정답 인정 범위" name="value3" id='v3' defaultValue={v3} onChange={(e)=>{processChange(explain_text_change_value(e))}}></input>
                    <input type="text" maxLength={80} placeholder="정답 인정 범위" name="value4" id='v4' defaultValue={v4} onChange={(e)=>{processChange(explain_text_change_value(e))}}></input>
                </section>
                <input className="anwer_input" type="text" maxLength={80} placeholder="정답 인정 범위" name="answer" defaultValue={answer} onChange={(e)=>{processChange(explain_text_change_queze_answer(e))}}></input>
                </>
            }
            </>
        }
        {
            // console.log(content_object[index],index)
        }
    </section>
    )
}
export default Make_quezeshow_modify_content;