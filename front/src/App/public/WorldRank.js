import axios from "axios";
import { customAxiosPost } from "../Custom_axios/Custom_axios";
const handleCopyClipBoard = async (text) => {
	try {
		await navigator.clipboard.writeText(text);
		alert("클립보드에 비밀번호가 복사되었어요.");
	} catch (err) {
		console.log(err);
	}
}
const dragenter = (e) => {
    e.preventDefault();
    e.target.style.backgroundColor = "rgb(107, 104, 255)";
}
const dragover = (e) => {
    e.preventDefault();
    e.target.style.backgroundColor = "white";

} 
const debounce = (func, timeout = 300) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
}
// const processChange = (func)=>debounce(() => func());
const processChange = (func)=>{
  debounce(func);
}
const upload_comment = (uuid,uuid2,roomnum,content_state,clicked,comment_input_ref,setComment_state) => {
  // console.log(content_state[clicked].title,comment_input_ref.current.value,content_state);
  console.log(uuid2);
  if(uuid2 !== null){
    //   console.log(uuid,uuid2,roomnum,content_state[clicked].title,comment_input_ref.current);
      axios({
          url : process.env.REACT_APP_SERVER_URL + '/spacequezeshowcomment_upload',
          method : 'POST',
          data : {
              roomnum : roomnum,
              uuid : uuid.current,
              uuid2 : uuid2,
              title : content_state[clicked].title,
              text : comment_input_ref.current.value
          },
          headers : {
              'Content-Type' : 'application/json'
          }
      }).then(res=>{
        //   console.log('comment upload rres',res);
          axios({
              url : process.env.REACT_APP_SERVER_URL + '/spacequezeshowcomment',
              method : 'GET',
              params : {
                  roomnum : roomnum,
                  uuid : uuid,
                  uuid2 : uuid2,
              }
              
          }).then(res=>{
            //   console.log('comment',res);
              setComment_state( content_state => [...res.data]);
              // return(
              //   res.data
              // )
          })
      })
  }
  else{
      axios({
          url : process.env.REACT_APP_SERVER_URL + '/quezeshowcomment_upload',
          method : 'POST',
          data : {
              roomnum : roomnum,
              uuid : uuid.current,
              title : content_state[clicked].title,
              text : comment_input_ref.current.value
          },
          headers : {
              'Content-Type' : 'application/json'
          }
      }).then(res=>{
          // console.log('comment upload rres',res);
          axios({
              url : process.env.REACT_APP_SERVER_URL + '/quezeshowcomment',
              method : 'GET',
              params : {roomnum : roomnum}
              
          }).then(res=>{
              // console.log('comment',res);
              setComment_state( content_state => [...res.data]);
          })
      })
  }
}
const chenge_textarea_height = (e) => {
    // console.log('e.ttrarf',e.target.style.height,e.target.scrollHeight);
    e.target.style.height = 'auto'; //height 초기화
    e.target.style.height = e.target.scrollHeight + 'px';
}
const canvas_func = (canvas_ref) => {
    const el = canvas_ref;
    const ctx = el.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const pi = Math.PI;
    const points = 12;
    const radius = 200 * dpr;
    const h = 600 * dpr;
    const w = 600 * dpr;
    const center = {
        x: w / 2 * dpr, 
        y: h / 2 * dpr
    };
    const circles = [];
    const rangeMin = 1;
    const rangeMax = 30;
    const showPoints = true;

    let mouseY = 0;
    let tick = 0;

    const gradient1 = ctx.createLinearGradient(0, 0, w, 0);
    gradient1.addColorStop(0, '#96fbc4');
    gradient1.addColorStop(1, '#f9f586');

    const gradient2 = ctx.createLinearGradient(0, 0, w, 0);
    gradient2.addColorStop(0, '#48c6ef');
    gradient2.addColorStop(1, '#6f86d6');

    const gradient3 = ctx.createLinearGradient(0, 0, w, 0);
    gradient3.addColorStop(0, '#9795f0');
    gradient3.addColorStop(1, '#9be15d');

    const gradient4 = ctx.createLinearGradient(0, 0, w, 0);
    gradient4.addColorStop(0, '#f6d365');
    gradient4.addColorStop(1, '#fda085');

    const gradients = [ gradient1, gradient2, gradient3, gradient4 ];


}
const getAccessToken = () => {
    return window.localStorage.getItem('ay0-accessKey');
}
const getrefreshToken = () => {
    return window.localStorage.getItem('ay0-refreshToken');
}
const getexpiredAt = () => {
    return window.localStorage.getItem('ay0-expiredAt');
}
const getUserId = () => {
    return window.localStorage.getItem('ay0-user-id');
}
const getUserEmail = () => {
    return window.localStorage.getItem('ay0-user-email');
}
const getUserEmailKey = () => {
    return getUserEmail().replace('@','').split('.').join('');
}
const isLogin = () => {
    const refreshToken = window.localStorage.getItem('ay0-refreshToken');
    if(refreshToken !== null){
        return true
    }else {
        return false
    }
}
const getUsertype = () => {
    if(isLogin()){
        return 1
    }else {
        return 0
    }
}

const search_axios = async (type,tag,email,search_value) => {
    //type : 0 = 최신, 1 = 인기
    //tag : null or str val
    //email : null or str val
    //search_value : null or str val
    let result;
    // console.log(type,tag,email,search_value);
    const promise = new Promise((resolve,reject)=>{
        const user_email = getUserEmail();
        let user_email_ = null;
        user_email !== null ? 
        user_email_ = getUserEmail().replace('@','').split('.').join('')
        : null
        // console.log({
        //     value : search_value,
        //     tag   : tag,
        //     type  : type,
        //     email : email,
        //     user_email : user_email_
        // });
        axios({
            url : process.env.REACT_APP_SERVER_URL + '/search_quezeshow',
            method : 'GET',
            params : {
                value : search_value,
                tag   : tag,
                type  : type,
                email : email,
                user_email : user_email_ // null or str value
            }
        }).then((res)=>{
            resolve(res)
        })
    })
    await promise.then(res=>{
        result = res;
    })
    return result
}
const get_new_accessToken = (callBack) => {
    customAxiosPost({
        url : '/get_accessToken',
        headers : {
            refreshToken : getrefreshToken()
        }
    }).then(res=>{
        if(res.data === 'refreshToken 만료'){
            alert('로그인 만료 입니다, 다시 로그인 해주세요');
        }else {
            window.localStorage.removeItem('ay0-refreshToken');
            window.localStorage.setItem('ay0-refreshToken',res.data);
            callBack();
        }
    })
}
const refreshToken_expiredAt_check = () => {
    const expiredAt = getexpiredAt();
    const new_date = new Date(new Date());
    new_date.setDate(new_date.getDate() + 7);
    // console.log(expiredAt,'--------',new_date);
    if(expiredAt >= new_date){
        // console.log('만료');
    }
}
// const server_url = 'http://3.34.129.99:45509';   
// const server_url = 'https://port-0-ayo-serber-builder-12fhqa2blnl9payx.sel5.cloudtype.app';
export {
    dragenter,
    dragover, 
    processChange, 
    upload_comment,
    handleCopyClipBoard,
    chenge_textarea_height, 
    canvas_func, 
    getAccessToken, 
    isLogin, 
    getUsertype, 
    getUserId, 
    getUserEmail,
    search_axios,
    getUserEmailKey,
    getrefreshToken,
    get_new_accessToken,
    getexpiredAt,
    refreshToken_expiredAt_check
}