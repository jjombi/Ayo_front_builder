import React from 'react';

const Loading_popup = ({setLoading_popup_state, pending}) => {

    const setpopup = () => {
        // setLoading_popup_state(false);
        window.location.reload();
    }

    return(
        <div className='loading_popup'>
            {
                pending ? <p>업로드 중</p> : <p>업로드 완료 됨</p>
            }
            <button disabled={pending} className='all_btn' onClick={setpopup}>닫기</button>
            {
                console.log(pending)
            }
        </div>
    )
}
export default Loading_popup;