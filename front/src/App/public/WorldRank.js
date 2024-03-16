import axios from "axios";
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
      console.log(uuid,uuid2,roomnum,content_state[clicked].title,comment_input_ref.current);
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
          console.log('comment upload rres',res);
          axios({
              url : process.env.REACT_APP_SERVER_URL + '/spacequezeshowcomment',
              method : 'GET',
              params : {
                  roomnum : roomnum,
                  uuid : uuid,
                  uuid2 : uuid2,
              }
              
          }).then(res=>{
              console.log('comment',res);
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
    console.log('e.ttrarf',e.target.style.height,e.target.scrollHeight);
    e.target.style.height = 'auto'; //height 초기화
    e.target.style.height = e.target.scrollHeight + 'px';
}
// const server_url = 'http://3.34.129.99:45509';   
// const server_url = 'https://port-0-ayo-serber-builder-12fhqa2blnl9payx.sel5.cloudtype.app';
export {dragenter, dragover, processChange, upload_comment,handleCopyClipBoard,chenge_textarea_height}