import React from 'react';
import { processChange } from "../../public/WorldRank";
import no_img from '../../Img_folder/no_image.jpg';
import {chenge_textarea_height} from '../../public/WorldRank';
const Make_quezeshow_modify_content = ({img,early_text, early_title, uuid, changed_object_ref, index,answer,v1,v2,v3,v4,quezeshow_type, queze_type}) => {
    console.log('make queze modify ',quezeshow_type,queze_type,img);
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
        <section className='quezeshow_queze_content_root'>
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
        {
            quezeshow_type === 'vote'
            ?
            <>
                <input type="text" maxLength={80} className="Make_quezeshow_content_title" placeholder="제목" defaultValue={early_title} onChange={(e)=>{processChange(explain_title_change_vote(e));chenge_textarea_height(e)}}></input>
                <textarea type="text" maxLength={3000}  className="Make_quezeshow_content_text" placeholder="설명" defaultValue={early_text} onChange={(e)=>{processChange(explain_text_change_vote(e));chenge_textarea_height(e);}}></textarea>
            </>
            :
            quezeshow_type === 'queze'
            ?
            <>
                {
                Number(queze_type) === 1
                ?
                <>
                {
                img === 'data:image/jpeg;base64,' ? <img src={no_img}></img> : <img src={img}></img>
                }
                <input type="text" maxLength={80} className="Make_quezeshow_content_title" placeholder="제목" defaultValue={early_title} onChange={(e)=>{processChange(explain_title_change_queze(e));chenge_textarea_height(e)}}></input>
                <textarea type="text" maxLength={1000}  className="Make_quezeshow_content_text" placeholder="설명" defaultValue={answer} onChange={(e)=>{processChange(explain_text_change_queze(e));chenge_textarea_height(e);}}></textarea>
                <section className="value_input">
                    <input type="text" maxLength={80} placeholder="답1" id='v1' defaultValue={v1} onChange={(e)=>{processChange(explain_text_change_value(e));chenge_textarea_height(e);}}></input>
                    <input type="text" maxLength={80} placeholder="답2" id='v2' defaultValue={v2} onChange={(e)=>{processChange(explain_text_change_value(e));chenge_textarea_height(e);}}></input>
                    <input type="text" maxLength={80} placeholder="답3" id='v3' defaultValue={v3} onChange={(e)=>{processChange(explain_text_change_value(e));chenge_textarea_height(e);}}></input>
                    <input type="text" maxLength={80} placeholder="답4" id='v4' defaultValue={v4} onChange={(e)=>{processChange(explain_text_change_value(e));chenge_textarea_height(e);}}></input>
                </section>
                <input className="anwer_input" type="text" maxLength={80} placeholder="정답" defaultValue={answer} onChange={(e)=>{processChange(explain_text_change_queze_answer(e));chenge_textarea_height(e);}}></input>
                </>
                
                :
                <>
                {
                img === 'data:image/jpeg;base64,' ? <img src={no_img}></img> : <img src={img}></img>
                }
                <input type="text" maxLength={80} className="Make_quezeshow_content_title" placeholder="제목" defaultValue={early_title} onChange={(e)=>{processChange(explain_title_change_queze(e));chenge_textarea_height(e)}}></input>
                <textarea type="text" maxLength={1000}  className="Make_quezeshow_content_text" placeholder="설명" defaultValue={answer} onChange={(e)=>{processChange(explain_text_change_queze(e));chenge_textarea_height(e);}}></textarea>
                <section className="value_input">
                    <input type="text" maxLength={80} placeholder="정답 인정 범위" id='v1' defaultValue={v1} onChange={(e)=>{processChange(explain_text_change_value(e));chenge_textarea_height(e);}}></input>
                    <input type="text" maxLength={80} placeholder="정답 인정 범위" id='v2' defaultValue={v2} onChange={(e)=>{processChange(explain_text_change_value(e));chenge_textarea_height(e);}}></input>
                    <input type="text" maxLength={80} placeholder="정답 인정 범위" id='v3' defaultValue={v3} onChange={(e)=>{processChange(explain_text_change_value(e));chenge_textarea_height(e);}}></input>
                    <input type="text" maxLength={80} placeholder="정답 인정 범위" id='v4' defaultValue={v4} onChange={(e)=>{processChange(explain_text_change_value(e));chenge_textarea_height(e);}}></input>
                </section>
                <input className="anwer_input" type="text" maxLength={80} placeholder="정답 인정 범위" defaultValue={answer} onChange={(e)=>{processChange(explain_text_change_queze_answer(e));chenge_textarea_height(e);}}></input>
                </>
                }
            </>
            :
            quezeshow_type === 'Continue_speak'
            ?
            <section className="make_quezeshow_content_root">
                {
                    img === '' || img === 'data:image/jpeg;base64,' 
                    ?
                    <img src={no_img} className="make_quezeshow_content_img"></img>
                    :
                    <img src={img} className="make_quezeshow_content_img"></img>
                }
                <textarea type="text" maxLength={40} rows={1} defaultValue={early_title} className="Make_quezeshow_content_title" placeholder={`문제 제목을 입력해 주세요`} onChange={(e)=>{processChange(explain_title_change_queze(e));chenge_textarea_height(e)}}></textarea>
                <p>ex 홍</p>
                <textarea type="text" maxLength={120} rows= {1} defaultValue={answer} className="Make_quezeshow_content_title" placeholder="답을 입력해 주세요" onChange={(e)=>{processChange(explain_text_change_queze_answer(e));chenge_textarea_height(e)}}></textarea>
                <p>ex 길동</p>
            </section>
            : // quezeshow_type === 'New_word_queze'
            <section className="make_quezeshow_content_root">
                {
                    img === '' || img === 'data:image/jpeg;base64,' 
                    ?
                    <img src={no_img} className="make_quezeshow_content_img"></img>
                    :
                    <img src={img} className="make_quezeshow_content_img"></img>
                }
                <textarea type="text" maxLength={40} value={early_title} rows={1} className="Make_quezeshow_content_title" placeholder={`문제 제목`} onChange={(e)=>{processChange(explain_title_change_queze(e));chenge_textarea_height(e)}}></textarea>
                <p>ex 얼죽아</p>
                <textarea type="text" maxLength={120} value={answer} rows={1} className="Make_quezeshow_content_title" placeholder={`정답`} onChange={(e)=>{processChange(explain_text_change_queze_answer(e));chenge_textarea_height(e)}}></textarea>
                <p>","로 구분지어 주세요, ex 얼어, 죽어도, 아이스 아메리카노</p>
            </section>
        }
        {
            // console.log(content_object[index],index)
        }
    </section>
    )
}
export default Make_quezeshow_modify_content;