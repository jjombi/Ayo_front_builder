import React,{useEffect, useRef, useState} from 'react';
import { useSearchParams } from 'next/navigation'
import Header from "@header/ayo_world_rank_header";
import Adfit from '@components/Adfit';
import axios from 'axios';
import Make_quezeshow_content_text from '@make_quezeshow/Make_quezeshow_content_text';
import YouTubeComponent from '@make_quezeshow/Youtube_component';
import Make_quezeshow_content_queze from "@make_quezeshow/Make_quezeshow_content_queze";
import { dragenter, dragover, chenge_textarea_height } from "@functions/WorldRank";    
import AWS from "aws-sdk";
import { router } from '@functions/WorldRank';
// import Make_queze_modify from './Make_queze_modify';
const Make_quezeshow_modify = () => {
    const [uuid,setUuid] = useState(''); 
    const [title,setTitle] = useState(''); 
    const [quezeshow_type,setQuezeshow_type] = useState('');
    const [room_num, setRoom_num] = useState('');
    // const [queze_type,setQueze_type] = useState('');
    const searchParams = useSearchParams();
    const [content_state,setContent_state] = useState([]);
    const [content_object, setContent_object] = useState([]);
    const [choice,setChoice] = useState([]);
    const [correct_choice, setCorrect_choice] = useState([]);
    const [max_video_length,setMax_video_length] = useState(0);
    const [main_img,setMain_img] = useState([null, null]);
    // const [password_popup, setPassword_popup] = useState(false);

    const modify_last_img_i = useRef(null);
    const original_content = useRef([]);
    const changed_content = useRef([]);
    const original_queze = useRef([{
        quezeshow_type : ''
    }]);
    const changed_queze = useRef([]);
    const file_ref = useRef([]);
    const canvas_ref = useRef();

    const region = "ap-northeast-2";
    const bucket = "dlworjs";
    const accessKey = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;
    
    AWS.config.update({
        region: region,
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
    });

    useEffect(()=>{
        // console.log('make quezeshow modify',state);
        setUuid(searchParams.get('uuid'));
        setTitle(searchParams.get('title'));
        setQuezeshow_type(searchParams.get('quezeshow_type'));
        // setQueze_type(searchParams.get('queze_type'));
        console.log('quezeshow_type',searchParams.get('quezeshow_type'));
        if(state === null){
            alert('비밀번호 입력후 수정가능 합니다');
            
        }
        else{
            if(!state.tinyint){
                alert('비밀번호 입력후 수정가능 합니다');
            }
            else{
                // console.log(roomName,'roomName');
                // alert('성공');
                // console.log('성공');
                axios({
                    url : process.env.REACT_APP_SERVER_URL + '/modify_get_content',
                    method : 'GET',
                    params : {
                        uuid : searchParams.get('uuid'),
                    }
                }).then(res=>{
                    console.log('수정 콘텐츠',res);
                    modify_last_img_i.current = res.data.length;
                    original_content.current = res.data;
                })
                axios({
                    url : process.env.REACT_APP_SERVER_URL + '/modify_get_title_text',
                    method : 'GET',
                    params : {
                        uuid : searchParams.get('uuid'),
                    }
                }).then(res=>{
                    console.log('수정 제목, 설명',res);
                    original_queze.current = res.data;   
                })
            }
        }
    },[])

    const img_upload = async (e) => {
        e.preventDefault();
        let tinyint = true;
        const content_object_ = content_object.map((e,i)=>{
            if(e.data_type === 'image'){
                if(e.src === '' || e.src === 'data:image/jpeg;base64,'){
                    return {data_type: e.data_type, title : e.title, text : e.text, img : false}
                }else {
                    return {data_type: e.data_type, title : e.title, text : e.text, img : true}
                }
            }else if(e.data_type === 'audio'){
                if(e.src === '') tinyint = false
                return {data_type : e.data_type, src : e.src, title : e.title, text : e.text, answer : e.answer,start : e.start, end : e.end}
            }else if(e.data_type === 'video'){
                if(e.src === '') tinyint = false
                return {data_type : e.data_type, src : e.src, title : e.title, text : e.text, answer : e.answer,start : e.start, end : e.end}
            }else if(e.data_type === 'text'){
                return {data_type : e.data_type, src : e.src, title : e.title, text : e.text, answer : e.answer,start : e.start, end : e.end}
            }
        })
        if(!tinyint) alert('영상 주소를 다시 확인해 주세요');
        else new_img_upload_func(content_object_);
        
    }

    const new_img_upload_func = (content_object_) => {
        Promise.all([...file_ref.current].map((e,i)=>{
            // console.log('이미지 s3에 올리기 위해 for문 돌리는 중 i : ',i,'e',e,' and body :',file_ref.current[i]);
            if(e !== undefined){
                const upload = new AWS.S3.ManagedUpload({
                    params: {
                        ACL: 'public-read',
                        Bucket: bucket, // 버킷 이름
                        Key: `${uuid}/${modify_last_img_i.current+i+1}`+".jpg", // 유저 아이디
                        Body: file_ref.current[i], // 파일 객체
                    },
                });
                const promise = upload.promise();
            }
        })).then(()=>{
            // form_dom_ref.current.submit();  
            // console.log(tag);
            let main_img_tinyint = false;
            if(main_img[0] !== null){
                const upload = new AWS.S3.ManagedUpload({
                    params: {
                        ACL: 'public-read',
                        Bucket: bucket, // 버킷 이름 
                        Key: `${uuid}/main_img.jpg`, // 유저 아이디
                        Body: main_img[0], // 파일 객체
                    },
                });
                const promise = upload.promise();
                main_img_tinyint = true;
            }

            axios({
                url : process.env.REACT_APP_SERVER_URL+"/add_quezeshowcontent",
                method : 'POST',
                data   : {
                    uuid                 : uuid,
                    content_object       : content_object_, //콘텐츠 제못, 설명, 이미지 판별
                    choice               : choice,
                    correct_choice       : correct_choice,
                    date                 : Date.now(),
                    modify_last_img_i    : modify_last_img_i.current,
                    quezeshow_type       : quezeshow_type,
                    room_num             : room_num
                }, 
                headers : {
                    'Content-Type' : 'application/json'
                }

            }).then((e)=>{
                // setPassword_popup(true);
            })
        })  
    }

    const add_content = (e,) => {
        e.preventDefault();
        console.log('add content');
        const content_state_ = [...content_state,content_state.length+1];
        setContent_state(content_state=>[...content_state_]);
        setContent_object(content_object => [...content_object,{data_type : null,src : '', title : '', text : '', answer : '',start : 0, end : 0}]);
        if(quezeshow_type === 'multiple'){
            setChoice(choice => [...choice,['','']]);
            setCorrect_choice(correct_choice => [...correct_choice,'']);
            // setHint(hint => [...hint,{data_type : null, }])
        }else if(quezeshow_type === 'descriptive'){
            setCorrect_choice(correct_choice => [...correct_choice,[]]);
        }
        
    }
    const onpaste = (e,index,type) => {
        // console.log('onpaste');
        if (e.clipboardData.files.length) {
            basic_change_img(e.clipboardData.files,index,type);
        }
    }
    const change_img = (e,index,type) => {
        e.preventDefault();
        // console.log('클릭 후 이미지 선택');
        basic_change_img(e.target.files,index,type);
    }
    const basic_change_img = (files,index,type) => {
        // console.log(files);
        const file = [...files];
        // console.log(file,index);
        // if(file.length === 0) return null;
        const reader = new FileReader();
        reader.readAsDataURL(file[0]);
        reader.onload = (ev) => {

            const image = new Image();
            image.src = reader.result;
            image.name = ev.name;

            image.onload = () => {
                imageSizeChange(image,index,type);
            };
            if(type !== 'main_img'){
                let content_object_ = [...content_object];
                content_object_[index].src = reader.result;
                setContent_object(content_object => [...content_object_]);
            }else{
                // console.log('type is main img');
                const main_img_ = main_img;
                main_img_[1] = reader.result;
                setMain_img(main_img => [...main_img_]);
            }
            
        }
    }
    const delete_ = (index) => {
        // console.log('delete_ index',index,'file_ref.current',file_ref.current,'content_state',content_state,'content_object',content_object);
        file_ref.current = file_ref.current.filter((e,i)=>{return(i !== Number(index))});
        const content_state_ = content_state.filter((e,i)=>{return(i !== Number(index))});
        const content_object_ = content_object.filter((e,i)=>{return(i !== Number(index))});
        // console.log(file_ref.current,content_state_,content_object_);
        setContent_state(content_state => [...content_state_]);
        setContent_object(content_object => [...content_object_]);
        if(quezeshow_type === 'multiple'){
            const choice_ = choice.filter((e,i) => {return(i !== Number(index))});
            setChoice(choice => [...choice_]);
        }else if(quezeshow_type === 'descriptive'){
            const correct_choice_ = correct_choice.filter((e,i)=>{return(i !== Number(index))});
            setCorrect_choice(correct_choice => [...correct_choice_]);
        }
    }

    const imageSizeChange = ( image,index,type ) => {
        // console.log('image',image.alt,image.name);
        const canvas = canvas_ref.current

        let width = image.width;
        let height = image.height;
        // console.log(image.width,image.height);
        if(width > height){ // 가로가 더 길때
            // console.log(width / height);
            if(width / height <= 2){ // 비율이 2배 이하이면
                if(width > 4000){
                    width = image.width / 2;
                    height = image.height / 2;
                }


            }
        }else{              // 세로가 더 길때
            // console.log(height / width);
            if(width / height <= 2){ // 비율이 2배 이하이면
                if(height > 4000){
                    width = image.width / 2;
                    height = image.height / 2;
                }


            }

        }
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(image, 0, 0, width, height);
        const imgUrl = canvas.toDataURL("image/jpeg", 0.5);
        // console.log('결과물 imgUrl : ',imgUrl);
        const binary = window.atob(imgUrl.split(',')[1]);
        // console.log('binary',binary);
        const arraybuffer = new ArrayBuffer(binary.length);
        let bytes = new Uint8Array(arraybuffer);
        for(let i=0;i < binary.length; i++){
            bytes[i] = binary.charCodeAt(i);
        }
        // console.log('arrbuffer',bytes.buffer);
        const file = new File([bytes.buffer],image.name+'.jpg',{
            type : 'image/jpeg'
        });
        // console.log('type',type);
        if(type !== 'main_img'){
            file_ref.current[index] = file;
        }else {
            // console.log('type is main img');
            const main_img_ = main_img;
            main_img_[0] = file;
            setMain_img(main_img => [...main_img_]);
        }

    }
    const change_title = (e,index) => {
        let content_object_ = [...content_object];

        // console.log(index,content_object_[index]);
        content_object_[index].title = e.target.value;
        setContent_object(content_object => [...content_object_]);
    }
    const change_text = (e,index) => {
        let content_object_ = [...content_object];
        content_object_[index].text = e.target.value;
        setContent_object(content_object => [...content_object_]);
    }
    const change_value = (e,index) => {
        let content_object_ = [...content_object];
        if(e.target.id === 'v1'){
            content_object_[index].v1 = e.target.value;
            // console.log(e.target.id,'change value, e.target.id === v1');
        }else if(e.target.id === 'v2'){
            content_object_[index].v2 = e.target.value;
            // console.log(e.target.id,'change value, e.target.id === v2');
        }else if(e.target.id === 'v3'){
            content_object_[index].v3 = e.target.value;
            // console.log(e.target.id,'change value, e.target.id === v3');
        }else if(e.target.id === 'v4'){
            content_object_[index].v4 = e.target.value;
            // console.log(e.target.id,'change value, e.target.id === v4');
        }else if(e.target.id === 'answer'){
            content_object_[index].answer = e.target.value;
            // console.log(e.target.id,'change value, e.target.id === answer');
        }
        else{
            // console.log(e.target.id,'change value, e.target.id != ');
        }
        // content_object_[index] = content_object_;
        setContent_object(content_object => [...content_object_]);
    }
    const queze_option_click = (type,index) => {
        // console.log(type);
        const content_object_ = content_object;
        content_object_[index].data_type = type;
        setContent_object(content_object => [...content_object_]);
    }
    const change_video_url = (e,index) => {
        const content_object_ = content_object;
        //https://www.youtube.com/watch?v=DTodLgkj2Dc
        //https://youtu.be/DTodLgkj2Dc?si=gb32GkBQw0Iz8P4q
        //https://youtube.com/clip/UgkxUyojI5Id9KniSQDswABHBB4t3cEF6I4r?si=503f95X0n-FgaA8M
        //https://youtube.com/clip/UgkxvXGvl0eCasQLBA-w_7kSGc76zCipKAf_?si=HeBAoqmKvCc6AniR
        //https://www.youtube.com/shorts/ijjrV_Pa_hQ
        //https://www.youtube.com/live/M7lc1UVf-VE?si=RtdUT6IOoLprQUPZ
        // content_object_[index].src = e.target.value;
        // setContent   _object(content_object => [...content_object_]); 

        if(e.target.value.includes('?v=')){

            const video_id = e.target.value.split('?v=')[1];
            content_object_[index].src = video_id;
            setContent_object(content_object => [...content_object_]); 

        }else if(e.target.value.includes('/youtu.be/')){

            const video_id_clip = e.target.value.split('/youtu.be/')[1].split('?si=')[0];
            content_object_[index].src = video_id_clip;
            setContent_object(content_object => [...content_object_]); 

        }else if(e.target.value.includes('/shorts/')){

            const video_id_shorts = e.target.value.split('/shorts/')[1];
            content_object_[index].src = video_id_shorts;
            setContent_object(content_object => [...content_object_]);   

        }else if(e.target.value.includes('/live/')){

            const video_id_live = e.target.value.split('/live/')[1].split('?si=')[0];
            content_object_[index].src = video_id_live;
            setContent_object(content_object => [...content_object_]);   

        }else{
            // alert('url이 잘못되었습니다');
        }
    }
    const change_video_start_input_number = (e,first_video_start,type,index) => {
        const after_video_start = e.target.value;
        const content_object_ = content_object;
        if(first_video_start >= after_video_start){
            const minus_video_start_value = first_video_start - after_video_start;
            if(type === 'm'){
                content_object_[index].start = content_object[index].start-minus_video_start_value*60;
            }else if(type ==='s'){
                content_object_[index].start = content_object[index].start-minus_video_start_value;
            }
        }else if(first_video_start <= after_video_start){
            const plus_video_start_value = after_video_start - first_video_start;
            if(type === 'm'){
                content_object_[index].start = content_object[index].start+plus_video_start_value*60;
            }else if(type ==='s'){
                content_object_[index].start = content_object[index].start+plus_video_start_value;
            }
        }else console.log('err');
        setContent_object(content_object => [...content_object_]);
    }
    const change_video_end_input_number = (e,first_video_end,type,index) => {
        const after_video_end = e.target.value;
        const content_object_ = content_object;
        if(first_video_end >= after_video_end){
            const minus_video_end_value = first_video_end - after_video_end;
            if(type === 'm'){
                content_object_[index].end = content_object[index].end-minus_video_end_value*60;
            }else if(type ==='s'){
                content_object_[index].end = content_object[index].end-minus_video_end_value;
            }        
        }else if(first_video_end <= after_video_end){
            const plus_video_end_value = after_video_end - first_video_end;
            if(type === 'm'){
                content_object_[index].end = content_object[index].end+plus_video_end_value*60;
            }else if(type === 's'){
                content_object_[index].end = content_object[index].end+plus_video_end_value;
            }
            else{
                console.log('type err');
            }
        }else console.log('err');
        setContent_object(content_object => [...content_object_]);
    }
    const change_video_start = (e,index) => {
        const content_object_ = content_object;
        content_object_[index].start = e.target.value;
        setContent_object(content_object => [...content_object_]);
    }
    const change_video_end = (e,index) => {
        const content_object_ = content_object;
        content_object_[index].end = e.target.value;
        setContent_object(content_object => [...content_object_]);    
    }
    const setMax_video_length_func = (value,index) => {
        const content_object_ = content_object;
        content_object_[index].end = value;
        setContent_object(content_object => [...content_object_]);
    }
    const change_correct_choice_descriptive = (e,index) => {
        if(e.key === 'Enter'){
            // console.log('enter');
            const correct_choice_ = correct_choice;
            correct_choice_[index] = [...correct_choice[index],e.target.value];
            setCorrect_choice(correct_choice => [...correct_choice_]);
            e.target.value = '';
        }
    }
    const delete_correct_choice_descriptive = (ev,index) => {
        // console.log('delete_correct_choice_descriptive');
        const correct_choice_ = correct_choice;
        correct_choice_[index] = correct_choice[index].filter((e,i)=>{return i !== Number(ev.target.id)});
        // console.log('after',correct_choice_);
        setCorrect_choice(correct_choice => [...correct_choice_]);        
        
    }
        
    return(
        <div className="make_quezeshow_root">
        <Header></Header>
        <Adfit unit={'DAN-87ortfszgGZjj16M'}></Adfit>
        {
            <header className='make_modify_header'>
                <h3>{title}</h3>
                <p>현재 퀴즈쇼 수정기능은 콘텐츠 추가만 가능합니다</p>
            </header>
        }   
        {/* <section className="make_quezeshow_queze_title_explain_section">
            <textarea onChange={chenge_textarea_height} placeholder="부가 설명" rows={1}  maxLength={200} name="quezeshowqueze_explain_text"></textarea>  
            <textarea   onChange={chenge_textarea_height} placeholder="제작자 아이디 ex)developer" rows={1} maxLength={30} name="quezeshowqueze_explain_text"></textarea>  
            <section className="make_quezeshow_queze_option">
                {
                    quezeshow_type === 'vote'
                    ?
                    <div className="make_quezeshow_queze_option1">
                    <div>
                    </div>
                    <div>
                        
                        <input type="number" hidden  defaultValue={-1} name="settime"></input>
                        
                    </div>
                    </div>
                    :
                    <div className="make_quezeshow_queze_option1">
                    <div>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="14" r="8" stroke="white"/>
                        <path d="M12 14L12 11" stroke="white" strokeLinecap="round"/>
                        <path d="M17.5 7.5L19 6" stroke="white" strokeLinecap="round"/>
                        <path d="M10.0681 2.37059C10.1821 2.26427 10.4332 2.17033 10.7825 2.10332C11.1318 2.03632 11.5597 2 12 2C12.4403 2 12.8682 2.03632 13.2175 2.10332C13.5668 2.17033 13.8179 2.26427 13.9319 2.37059" stroke="white" strokeLinecap="round"/>
                        </svg>
                        <p>제한 시간</p> 
                        <input type="checkbox" id="checkbox" onChange={()=>{}}></input>
                    </div>
                    <div>

                    </div>
                    </div>
                }
                

            </section>
        </section> */}
        <div className="queze_list_v2">
            {
                content_state.map((e,index)=>{
                    return(
                    <section key={index} className="make_quezeshow_content_root">
                        <input className="make_quezeshow_content_deletebtn" type="button" onClick={(e)=>{delete_(index)}} value={"X"}></input>
                        {
                            quezeshow_type === 'vote'
                            ?
                            <textarea type="text" rows={1} maxLength={80} name="content_title" className="title" placeholder={"선택지"+(index+1)+'제목'} value={content_object[index].title} onChange={(e)=>{change_title(e,index);chenge_textarea_height(e)}}></textarea>
                            :
                            <textarea type="text" rows={1} maxLength={80} name="content_title" className="title" placeholder={"문제"+(index+1)+'설명'} value={content_object[index].title} onChange={(e)=>{change_title(e,index);chenge_textarea_height(e)}}></textarea>
                        }
                        <textarea type="text" rows={1} maxLength={3000} name="explain_text" className="text" placeholder="부가 설명" value={content_object[index].text} onChange={(e)=>{change_text(e,index);chenge_textarea_height(e)}}></textarea>
                        {   
                        content_object[index].data_type === null
                        ?
                        quezeshow_type === 'vote'
                        ?
                        <section className="make_quezeshow_queze_option">
                            <div className="make_quezeshow_queze_option1">
                                <div className="all_btn" id="image" onClick={(e)=>{queze_option_click('image',index)}}>
                                    <svg id="image" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 11C3 7.22876 3 5.34315 4.17157 4.17157C5.34315 3 7.22876 3 11 3H13C16.7712 3 18.6569 3 19.8284 4.17157C21 5.34315 21 7.22876 21 11V13C21 16.7712 21 18.6569 19.8284 19.8284C18.6569 21 16.7712 21 13 21H11C7.22876 21 5.34315 21 4.17157 19.8284C3 18.6569 3 16.7712 3 13V11Z" stroke="white"/>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M18.9976 14.2904L18.6544 13.9471L18.6385 13.9313C18.238 13.5307 17.9149 13.2077 17.6314 12.9687C17.3394 12.7226 17.055 12.5353 16.7221 12.4349C16.2512 12.2928 15.7488 12.2928 15.2779 12.4349C14.945 12.5353 14.6606 12.7226 14.3686 12.9687C14.0851 13.2077 13.762 13.5307 13.3615 13.9313L13.3456 13.9471C13.0459 14.2469 12.8458 14.4462 12.6832 14.5807C12.5218 14.7142 12.452 14.7359 12.4237 14.7408C12.3029 14.762 12.1785 14.7381 12.0742 14.6735C12.0498 14.6584 11.993 14.6123 11.8928 14.4285C11.7917 14.2432 11.68 13.9838 11.513 13.5942L11.4596 13.4696L11.4475 13.4414L11.4475 13.4414C11.0829 12.5907 10.7931 11.9144 10.5107 11.4126C10.2237 10.9026 9.90522 10.4984 9.44575 10.268C9.03426 10.0618 8.57382 9.97308 8.11515 10.0118C7.603 10.055 7.15716 10.3121 6.70134 10.6789C6.25273 11.04 5.73245 11.5603 5.07799 12.2148L5.07798 12.2148L5.05634 12.2364L5 12.2928V12.9999C5 13.2462 5.00007 13.4816 5.00044 13.7065L5.76344 12.9435C6.44443 12.2626 6.92686 11.7811 7.32835 11.458C7.72756 11.1366 7.98255 11.0265 8.19924 11.0082C8.47444 10.985 8.75071 11.0382 8.9976 11.162C9.192 11.2594 9.38786 11.4564 9.63918 11.903C9.89194 12.3521 10.1611 12.9783 10.5404 13.8635L10.5938 13.9881L10.6034 14.0105L10.6034 14.0105C10.7583 14.3719 10.8884 14.6754 11.0149 14.9073C11.1448 15.1455 11.3038 15.3727 11.5479 15.5238C11.8608 15.7175 12.2341 15.7894 12.5966 15.7258C12.8794 15.6761 13.1114 15.5242 13.3204 15.3513C13.524 15.183 13.7575 14.9495 14.0355 14.6714L14.0527 14.6542C14.4728 14.2341 14.766 13.9416 15.013 13.7334C15.2553 13.5292 15.4185 13.437 15.5667 13.3922C15.8493 13.307 16.1507 13.307 16.4333 13.3922C16.5815 13.437 16.7447 13.5292 16.987 13.7334C17.234 13.9416 17.5272 14.2341 17.9473 14.6542L18.9755 15.6825C18.9887 15.2721 18.9948 14.812 18.9976 14.2904Z" fill="white"/>
                                        <circle cx="16.5" cy="7.5" r="1.5" fill="white"/>
                                    </svg>
                                    <p id="image">이미지</p> 
                                </div>
                                <div id="image">

                                </div>
                            </div>
                            <div className="make_quezeshow_queze_option1">
                                <div className="all_btn" id="text" onClick={(e)=>{queze_option_click('text',index)}}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7 6V14.5925C7 16.3108 9.02384 17.2291 10.317 16.0976L11 15.5" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M4 9H10" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M14 9L19 17" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M19 9L14 17" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <p id="text">일반</p> 
                                </div>
                                <div id="text">

                                </div>
                            </div>
                        </section>
                        :
                        <section className="make_quezeshow_queze_option">
                            <div id="video" className="make_quezeshow_queze_option1">
                                <div className="all_btn" id="video" onClick={(e)=>{queze_option_click('video',index)}}>
                                    <svg id="video" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0,0,256,256" width="24px" height="24px"><g id="video" fill="#ffffff" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: 'normal'}}><g id="video" transform="scale(5.12,5.12)"><path id="video" d="M24.40234,9c-6.60156,0 -12.80078,0.5 -16.10156,1.19922c-2.19922,0.5 -4.10156,2 -4.5,4.30078c-0.39844,2.39844 -0.80078,6 -0.80078,10.5c0,4.5 0.39844,8 0.89844,10.5c0.40234,2.19922 2.30078,3.80078 4.5,4.30078c3.50391,0.69922 9.5,1.19922 16.10156,1.19922c6.60156,0 12.59766,-0.5 16.09766,-1.19922c2.20313,-0.5 4.10156,-2 4.5,-4.30078c0.40234,-2.5 0.90234,-6.09766 1,-10.59766c0,-4.5 -0.5,-8.10156 -1,-10.60156c-0.39844,-2.19922 -2.29687,-3.80078 -4.5,-4.30078c-3.5,-0.5 -9.59766,-1 -16.19531,-1zM24.40234,11c7.19922,0 12.99609,0.59766 15.79688,1.09766c1.5,0.40234 2.69922,1.40234 2.89844,2.70313c0.60156,3.19922 1,6.60156 1,10.10156c-0.09766,4.29688 -0.59766,7.79688 -1,10.29688c-0.29687,1.89844 -2.29687,2.5 -2.89844,2.70313c-3.60156,0.69922 -9.60156,1.19531 -15.60156,1.19531c-6,0 -12.09766,-0.39844 -15.59766,-1.19531c-1.5,-0.40234 -2.69922,-1.40234 -2.89844,-2.70312c-0.80078,-2.80078 -1.10156,-6.5 -1.10156,-10.19922c0,-4.60156 0.40234,-8 0.80078,-10.09766c0.30078,-1.90234 2.39844,-2.50391 2.89844,-2.70312c3.30078,-0.69922 9.40234,-1.19922 15.70313,-1.19922zM19,17v16l14,-8zM21,20.40234l8,4.59766l-8,4.59766z"></path></g></g></svg>
                                    <p id="video">영상</p>
                                </div>
                                <div id="video">

                                </div>
                            </div>
                            <div className="make_quezeshow_queze_option1">
                                <div className="all_btn" id="audio" onClick={(e)=>{queze_option_click('audio',index)}}>
                                    <svg id="audio" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.2111 11.1056L9.73666 7.86833C8.93878 7.46939 8 8.04958 8 8.94164V15.0584C8 15.9504 8.93878 16.5306 9.73666 16.1317L16.2111 12.8944C16.9482 12.5259 16.9482 11.4741 16.2111 11.1056Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                                    <circle cx="12" cy="12" r="9" stroke="white"/>
                                    </svg>
                                    <p id="audio">음악</p> 
                                </div>
                                <div id="audio">

                                </div>
                            </div>
                            <div className="make_quezeshow_queze_option1">
                                <div className="all_btn" id="image" onClick={(e)=>{queze_option_click('image',index)}}>
                                    <svg id="image" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 11C3 7.22876 3 5.34315 4.17157 4.17157C5.34315 3 7.22876 3 11 3H13C16.7712 3 18.6569 3 19.8284 4.17157C21 5.34315 21 7.22876 21 11V13C21 16.7712 21 18.6569 19.8284 19.8284C18.6569 21 16.7712 21 13 21H11C7.22876 21 5.34315 21 4.17157 19.8284C3 18.6569 3 16.7712 3 13V11Z" stroke="white"/>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M18.9976 14.2904L18.6544 13.9471L18.6385 13.9313C18.238 13.5307 17.9149 13.2077 17.6314 12.9687C17.3394 12.7226 17.055 12.5353 16.7221 12.4349C16.2512 12.2928 15.7488 12.2928 15.2779 12.4349C14.945 12.5353 14.6606 12.7226 14.3686 12.9687C14.0851 13.2077 13.762 13.5307 13.3615 13.9313L13.3456 13.9471C13.0459 14.2469 12.8458 14.4462 12.6832 14.5807C12.5218 14.7142 12.452 14.7359 12.4237 14.7408C12.3029 14.762 12.1785 14.7381 12.0742 14.6735C12.0498 14.6584 11.993 14.6123 11.8928 14.4285C11.7917 14.2432 11.68 13.9838 11.513 13.5942L11.4596 13.4696L11.4475 13.4414L11.4475 13.4414C11.0829 12.5907 10.7931 11.9144 10.5107 11.4126C10.2237 10.9026 9.90522 10.4984 9.44575 10.268C9.03426 10.0618 8.57382 9.97308 8.11515 10.0118C7.603 10.055 7.15716 10.3121 6.70134 10.6789C6.25273 11.04 5.73245 11.5603 5.07799 12.2148L5.07798 12.2148L5.05634 12.2364L5 12.2928V12.9999C5 13.2462 5.00007 13.4816 5.00044 13.7065L5.76344 12.9435C6.44443 12.2626 6.92686 11.7811 7.32835 11.458C7.72756 11.1366 7.98255 11.0265 8.19924 11.0082C8.47444 10.985 8.75071 11.0382 8.9976 11.162C9.192 11.2594 9.38786 11.4564 9.63918 11.903C9.89194 12.3521 10.1611 12.9783 10.5404 13.8635L10.5938 13.9881L10.6034 14.0105L10.6034 14.0105C10.7583 14.3719 10.8884 14.6754 11.0149 14.9073C11.1448 15.1455 11.3038 15.3727 11.5479 15.5238C11.8608 15.7175 12.2341 15.7894 12.5966 15.7258C12.8794 15.6761 13.1114 15.5242 13.3204 15.3513C13.524 15.183 13.7575 14.9495 14.0355 14.6714L14.0527 14.6542C14.4728 14.2341 14.766 13.9416 15.013 13.7334C15.2553 13.5292 15.4185 13.437 15.5667 13.3922C15.8493 13.307 16.1507 13.307 16.4333 13.3922C16.5815 13.437 16.7447 13.5292 16.987 13.7334C17.234 13.9416 17.5272 14.2341 17.9473 14.6542L18.9755 15.6825C18.9887 15.2721 18.9948 14.812 18.9976 14.2904Z" fill="white"/>
                                        <circle cx="16.5" cy="7.5" r="1.5" fill="white"/>
                                    </svg>
                                    <p id="image">이미지</p> 
                                </div>
                                <div id="image">

                                </div>
                            </div>
                            <div className="make_quezeshow_queze_option1">
                                <div className="all_btn" id="text" onClick={(e)=>{queze_option_click('text',index)}}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7 6V14.5925C7 16.3108 9.02384 17.2291 10.317 16.0976L11 15.5" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M4 9H10" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M14 9L19 17" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M19 9L14 17" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <p id="text">일반</p> 
                                </div>
                                <div id="text">

                                </div>
                            </div>
                        </section>
                
                        :
                        content_object[index].data_type === 'video'//----------------------------------
                        ?
                        <div className="video_area">
                            <div className="youtube_component">
                                {
                                    content_object[index].src === ''
                                    ?
                                    <div>영상 주소가 없습니다</div>
                                    :
                                    // <YouTube videoId={content_object[index].src} opts={opts} onReady={onPlayerReady}  onEnd={onPlayerEnd} onStateChange={onPlayerStateChange}/>
                                    <YouTubeComponent id={content_object[index].src} index={index} setMax_video_length={setMax_video_length} setMax_video_length_func={setMax_video_length_func}/>
                                }
                                
                            </div>
                            <div className="text_area">
                                <input type="text" name="video_url" placeholder="영상 주소" onChange={(e)=>{change_video_url(e,index)}}></input>
                                <p>https://www.youtube.com/watch?v=M7lc1UVf-VE</p>
                                <p>https://www.youtube.com/live/M7lc1UVf-VE?si=dvn0bA8OZz8m53dL</p>
                                <div className="sliders_control">
                                    <input id="fromSlider" type="range" value={content_object[index].start} min="0" max={max_video_length} onChange={(e)=>change_video_start(e,index)}/>
                                    <input id="toSlider" type="range" value={content_object[index].end} min="0" max={max_video_length} onChange={(e)=>change_video_end(e,index)}/>
                                </div>
                                <div className="video_length">
                                    <input type="number" name="start" id="1" value={Math.floor(content_object[index].start/60).toString()} onChange={(e)=>{e.target.value > Math.floor(max_video_length/60) ? e.target.value = Math.floor(max_video_length/60) : change_video_start_input_number(e,Math.floor(content_object[index].start/60),'m',index)}}></input>
                                    <div className="icon">:</div>
                                    <input type="number" id="2" value={(content_object[index].start%60).toString()} max={60} onChange={(e)=>{e.target.value > 60 ? e.target.value = 60 : change_video_start_input_number(e,content_object[index].start%60,'s',index)}}></input>
                                    <div className="icon">~</div>
                                    <input type="number" id="1" value={Math.floor(content_object[index].end/60).toString()} onChange={(e)=>{e.target.value > Math.floor(max_video_length/60) ? e.target.value = Math.floor(max_video_length/60) : change_video_end_input_number(e,Math.floor(content_object[index].end/60),'m',index)}}></input>
                                    <div className="icon">:</div>
                                    <input type="number" name="end" id="2" value={(content_object[index].end%60).toString()} max={60} onChange={(e)=>{ e.target.value > 60 ? e.target.value = 60 : change_video_end_input_number(e,content_object[index].end%60,'s',index)}}></input>
                                </div>
                            </div>
                        </div>
                        :
                        content_object[index].data_type === 'audio'//-----------------------------------
                        ?
                        <div className="video_area">
                            <div className="youtube_component">
                                {
                                    content_object[index].src === ''
                                    ?
                                    <div>영상 주소가 없습니다</div>
                                    :
                                    <YouTubeComponent id={content_object[index].src} index={index} setMax_video_length={setMax_video_length} setMax_video_length_func={setMax_video_length_func}/>
                                }
                            </div>
                            <div className="text_area">
                                <input type="text" name="video_url" placeholder="영상 주소" onChange={(e)=>{change_video_url(e,index)}}></input>
                                <p>https://www.youtube.com/watch?v=M7lc1UVf-VE</p>
                                <p>https://www.youtube.com/live/M7lc1UVf-VE?si=dvn0bA8OZz8m53dL</p>
                                <div className="sliders_control">
                                    <input id="fromSlider" type="range" value={content_object[index].start} min="0" max={max_video_length} onChange={(e)=>change_video_start(e,index)}/>
                                    <input id="toSlider" type="range" value={content_object[index].end} min="0" max={max_video_length} onChange={(e)=>change_video_end(e,index)}/>
                                </div>
                                <div className="video_length">
                                    <input type="number" name="start" id="1" value={Math.floor(content_object[index].start/60).toString()} onChange={(e)=>{e.target.value > Math.floor(max_video_length/60) ? e.target.value = Math.floor(max_video_length/60) : change_video_start_input_number(e,Math.floor(content_object[index].start/60),'m',index)}}></input>
                                    <div className="icon">:</div>
                                    <input type="number" id="2" value={(content_object[index].start%60).toString()} max={60} onChange={(e)=>{e.target.value > 60 ? e.target.value = 60 : change_video_start_input_number(e,content_object[index].start%60,'s',index)}}></input>
                                    <div className="icon">~</div>
                                    <input type="number" id="1" value={Math.floor(content_object[index].end/60).toString()} onChange={(e)=>{e.target.value > Math.floor(max_video_length/60) ? e.target.value = Math.floor(max_video_length/60) : change_video_end_input_number(e,Math.floor(content_object[index].end/60),'m',index)}}></input>
                                    <div className="icon">:</div>
                                    <input type="number" name="end" id="2" value={(content_object[index].end%60).toString()} max={60} onChange={(e)=>{ e.target.value > 60 ? e.target.value = 60 : change_video_end_input_number(e,content_object[index].end%60,'s',index)}}></input>
                                </div>
                            </div>
                        </div>
                        :
                        content_object[index].data_type === 'image'//-------------------------------
                        ?
                        <section className="make_quezeshow_content_content">
                            <div className="make_quezeshow_content_content_img_area">
                            {
                                content_object[index].src === '' || content_object[index].src === 'data:image/jpeg;base64,' 
                                ?
                                <section className="img_select_area">
                                    <input id="file" type="file" className="make_quezeshow_content_file allbtn" onChange={e=>{change_img(e,index,'')}} onDragEnter ={dragenter} onDragLeave={dragover}></input>
                                    <div className="img_select_area_onpaste allbtn" onPaste={(e)=>onpaste(e,index,'')}>
                                        <p className="allbtn">이미지 붙여 넣기</p>
                                    </div>
                                </section>
                                :
                                <img src={content_object[index].src} className="make_quezeshow_content_img"></img>
                                // null
                            }
                            </div>
                        </section>
                        :
                        content_object[index].data_type === 'text'
                        ?
                        <></>
                        :
                        null
                        }
                        {   
                            
                            quezeshow_type === 'multiple' && content_object[index].data_type !== null
                            ?
                                <Make_quezeshow_content_queze key={index} index={index} quezeshow_type={quezeshow_type} file_ref={file_ref} content_object={content_object} onpaste={onpaste} change_text={change_text} change_title={change_title} change_img={change_img} queze_option_click={queze_option_click} change_video_url={change_video_url} change_video_end_input_number={change_video_end_input_number} change_video_start_input_number={change_video_start_input_number} change_video_start={change_video_start} change_video_end={change_video_end} setMax_video_length_func={setMax_video_length_func} change_value={change_value} choice={choice} setChoice={setChoice} correct_choice={correct_choice} setCorrect_choice={setCorrect_choice}/>                                   
                            :
                            quezeshow_type === 'vote' && content_object[index].data_type !== null
                            ?
                                <></>
                            :
                            quezeshow_type === 'descriptive' && content_object[index].data_type !== null
                            ?
                                <Make_quezeshow_content_text change_correct_choice_descriptive={change_correct_choice_descriptive} delete_correct_choice_descriptive={delete_correct_choice_descriptive} correct_choice={correct_choice[index]} index={index}></Make_quezeshow_content_text>
                            :
                            null
                        }
                        </section>
                    )
                })
            }
        </div>
        <input type="button" className="all_btn make_quezeshow_addbtn" onClick={add_content} value={'+'} title="선택지 추가"></input>
        <input type="button" value="완료" className="all_btn make_quezeshow_submintbtn" onClick={(e)=>{
            if(content_state.length !== 0){
                img_upload(e);
            }else{
                alert('퀴즈를 추가해 주세요');
            }
        }}></input>
        {/* <Footer tinyint={false}></Footer> */}
        </div>
    )
    
    
}

export default Make_quezeshow_modify;