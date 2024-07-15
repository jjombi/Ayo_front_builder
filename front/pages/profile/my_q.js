import React, { useEffect, useState } from "react";
import Profile_header from '@header/profile_header/profile_header';
import { isLogin, getUserEmailKey } from "@functions/WorldRank";
import Header from "@components/header/ayo_world_rank_header";
const My_q = () => {

    const [content_state, setContent_state] = useState([]);

    useEffect(()=>{
        if(!isLogin()){
            alert('로그인 후 이용가능 합니다');
            router('/login');
        }else {
            const res = search_axios(3,'',getUserEmailKey(),'');
            setContent_state(content_state => [...res.data]);
        }
    },[])
    return (
        <>
        <Header/>
        <Profile_header/>
        myq
        <div className="queze_list">
        {
            content_state.map((e,i)=>{
                return(
                    <Quezeshow_main_content key={i} index={i} src={'data:image/jpeg;base64,'+e.img} uuid={e.uuid} title={e.title} roomnum={e.roomnum} quezeshow_type={e.quezeshow_type} explain_text={e.explain_text} likes_queze={e.likes_queze}></Quezeshow_main_content>
                )
            })
        }
        </div>
        </>
    )
}
export default My_q;