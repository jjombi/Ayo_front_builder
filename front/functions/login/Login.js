import { router } from "../../functions/WorldRank";
import { customAxiosPost } from "../Custom_axios/Custom_axios";


const submit = (email, password) => {
    customAxiosPost({
        url : '/login',
        data : {
            email,
            password
        }
    }).then(res=>{
        if(res.data === 'email not exist'){
            alert('이메일이 존제하지 않습니다');
        }else if(res.data === 'password not same'){
            alert('비밀번호가 일치하지 않습니다');
        }else{
            window.localStorage.setItem('ay0-accessKey',res.data.accessToken);
            window.localStorage.setItem('ay0-refreshToken',res.data.refreshToken);
            window.localStorage.setItem('ay0-expiredAt',res.data.expiredAt);
            window.localStorage.setItem('ay0-user-id',res.data.userId);
            window.localStorage.setItem('ay0-user-email',res.data.userEmail);
            router('/');
        }
    })
}

export {
    submit,
}