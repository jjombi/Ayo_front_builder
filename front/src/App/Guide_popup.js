import React from 'react';
import main_src from './Img_folder/main.png';
import copy_paste_src from './Img_folder/copypaste.png';

const Guide_popup = ({setGuide_state}) => {
    return(
        <div className='guide_popup_root'>
            
            <section>
                <button className='all_btn' onClick={()=>{setGuide_state(guide_state=> !guide_state)}}>X</button>
                <div>
                    <h1>최애 티어표 만드는 방법</h1>
                    <img src={main_src} width={'800px'} height={'800px'}></img>
                        <p>제목 : 최애 티어표의 주제를 나타내는 제목</p><br/>
                        <p>
                            공개 수정 허용 : 공개 수정을 허용 하면 누구나 최애 티어표에 세로운 사진을 추가할 수 있습니다.
                        </p><br/>
                        <p>일부 공개 : 비밀번호를 설정하여 비밀번호를 아는 사람만 최애 티어표에 참가 할 수 있습니다.</p>
                        <br/>
                        <p>이미지 드레그 or 클릭 : 이미지를 끌어다 놓거나 클릭후 내pc에서 선택 할 수 있습니다. 여러 사진 동시 섵택 가능.</p>   

                </div>
                <div>
                    <img src={copy_paste_src} width={'800px'} height={'800px'}></img>
                    <p>이미지 붙여 넣기 : 위 사진처럼 웹 브라우저에서 이미지를 복사 후 붙여 넣기 할 수 있습니다.</p>
                
                </div>

                
            </section> 
        </div>
    )
}

export default Guide_popup;