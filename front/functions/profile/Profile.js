import { router } from "@functions/WorldRank";
const logout = (router_) => {
    // const logout_tinyint = confirm('로그아웃 하시겠습니다');
    // if(logout_tinyint) {
        window.localStorage.removeItem('ay0-accessKey');
        window.localStorage.removeItem('ay0-expiredAt');
        window.localStorage.removeItem('ay0-user-id');
        window.localStorage.removeItem('ay0-refreshToken');
        window.localStorage.removeItem('ay0-user-email');
        // router(router_,'/');
    // }
}

export {
    logout
}