import React, { useEffect } from "react";
import Profile_header from '@header/profile_header/profile_header';
import Header from "@components/header/ayo_world_rank_header";
import { isLogin } from "@functions/WorldRank";

const Info = () => {
    useEffect(()=>{
        if(!isLogin()){
            alert('로그인 후 이용가능 합니다');
            router('/login');
        }
    },[])
    return (
        <>
        <Header/>
        <Profile_header/>
        </>
    )
}
export default Info;