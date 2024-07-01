import React from 'react';
import {handleCopyClipBoard} from '@functions/WorldRank';
const Loading_popup = ({setLoading_popup_state, pending,password,setPassword_popup}) => {

    const setpopup = () => {
        // setLoading_popup_state(false);
        // alert('비밀번호는 더 이상 확인 할 수 없습니다.')
        // window.location.reload();
        // console.log('setpopup');
        if(!confirm('비밀번호는 더이상 확인 할 수 없습니다')){

        }else{
            window.location.reload();
        }
    }

    return(
        <div className='loading_popup'>
            {
                pending ? <p>업로드 중</p> : <p>업로드 완료 됨</p>
            }
            <br/>
            <p>
                <span>{password}</span>는 콘텐츠 수정시 사용되는 비밀번호 입니다. <br/>잘 기억해 주세요
            </p>
            <input className='all_btn' type='button' onClick={()=>{handleCopyClipBoard(password)}} value={'비밀번호 복사하기'} readOnly></input>
            <button type='button' className='all_btn' onClick={setpopup}>닫기</button>
            {
                // console.log(pending)
            }
        </div>
    )
}
export default Loading_popup;