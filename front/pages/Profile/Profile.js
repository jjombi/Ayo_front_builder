import React, { useEffect, useRef, useState } from "react";
import Header from '../ayo_world_rank_header';
import { customAxiosGet, customAxiosPost } from "../../functions/Custom_axios/Custom_axios";
// import { useNavigate, useSearchParams } from "react-router-dom";
import { getUserEmailKey, isLogin, search_axios } from "../../functions/WorldRank";
import Quezeshow_main_content from '../Quezeshow/Quezeshow_main_content';
const Profile = () => {
    
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    
    const [content_state, setContent_state] = useState([]);
    const profile_path = searchParams.get('path');

    const useEffect_func = async ()=>{
        if(profile_path === ''){
            alert('잘못된 path');
        }else if(profile_path === 'my_q') {
            const res = await search_axios(3,'',getUserEmailKey(),'');
            search_axios_then(res);
        }else if(profile_path === 'my_likes'){
            customAxiosGet({
                url : '/search_likes_queze',
                params : {
                    user_email : getUserEmailKey()
                }
            }).then(res=>{
                search_axios_then(res);
            })
        }
    };
    const search_axios_then = (res) => {
        setContent_state(content_state => res.data);
    }
    useEffect(()=>{useEffect_func()},[profile_path]);
    useEffect(()=>{
        console.log('ㅏ오류');
        if(!isLogin()){
            alert('로그인 후 이용가능 합니다');
            navigate('/login');
        }
    },[])

    const change_clicked = (e) => {
        searchParams.set('path',e.target.id);
        setSearchParams(searchParams);
    }

    const logout = () => {
        const logout_tinyint = confirm('로그아웃 하시겠습니다');
        if(logout_tinyint) {
            window.localStorage.removeItem('ay0-accessKey');
            window.localStorage.removeItem('ay0-expiredAt');
            window.localStorage.removeItem('ay0-user-id');
            window.localStorage.removeItem('ay0-refreshToken');
            window.localStorage.removeItem('ay0-user-email');
            navigate('/');
        }
    }
    
    return(
        <>
        <Header/>
        <section className="root_basic">
            <header className="Main2_a_queze_header">
                    <button type="button" id="info" title="내 정보" onClick={change_clicked} className="all_btn a_queze_header_btn">
                        내 정보
                    </button>
                    <button type="button" id="my_q" title="내 퀴즈" onClick={change_clicked} className="all_btn a_queze_header_btn">
                        내 퀴즈
                    </button>
                    <button type="button" id="my_likes" title="좋아요" onClick={change_clicked} className="all_btn a_queze_header_btn">
                        좋아요
                    </button>
                    <button type="button" id="log_out" title="로그아웃" onClick={logout} className="all_btn a_queze_header_btn">
                        로그아웃
                    </button>
                </header>
                <div className="queze_list">
                    {
                        profile_path !== 'info' ?
                        content_state.map((e,i)=>{
                            return(
                                <Quezeshow_main_content key={i} index={i} src={'data:image/jpeg;base64,'+e.img} uuid={e.uuid} title={e.title} roomnum={e.roomnum} quezeshow_type={e.quezeshow_type} explain_text={e.explain_text} likes_queze={e.likes_queze}></Quezeshow_main_content>
                            )
                        })
                        :
                        <>준비중 입니다</>
                    }

            </div>
        </section>
        </>
    )
}
export default Profile;