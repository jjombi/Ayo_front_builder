import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './css.css';
const Main2_a_queze_1and1 = () => {
    const navigate = useNavigate()
    const [contentState,setContentState] = useState([]);
    const [earlyContentState,setEarlyContentState] = useState([]);
    const change_content = useRef([]);
    const [showIndex,setShowIndex] = useState(0);
    const [resultState,setResultState] = useState([]);
    const earltlength = useRef(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const title = searchParams.get('title');
    const publicAccess = searchParams.get('publicAccess');
    const type = searchParams.get('type');
    const roomName = searchParams.get('roomName');

    useEffect(()=>{

        axios({
            url : process.env.REACT_APP_SERVER_URL + '/oneandonequeze',
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            data : {
                roomName : roomName,
                type : type
            }
        }).then((res)=>{ // res ex : [{text, img ,uuid},{}]
            console.log(res.data);
            const data1 = res.data.text.map((e,i)=>{
                return ({img : 'data:image/jpeg;base64,'+res.data.img[i], text : res.data.text[i], uuid : res.data.uuid[i]})
            })

            const random_content = data1.sort(()=> Math.random() - 0.5);
            console.log('random content',random_content);
            setEarlyContentState([...random_content]);
            setContentState([random_content[showIndex],random_content[showIndex+1]]);
            setShowIndex(showIndex => showIndex+2);
            earltlength.current = random_content.length;
            // showIndex = showIndex+2;
        })
        
    },[])
    const contentClick = (e) => {
        const newContentState = [...change_content.current,earlyContentState[e.target.id]];
        console.log('ID',e.target.id,showIndex, 'newContentState', newContentState, 'earlyContentState', earlyContentState, 'showIndex',showIndex,'earlyContentState.length/2',Math.floor(earlyContentState.length/2));


        if(showIndex+2 >= earlyContentState.length && newContentState.length === Math.floor(earlyContentState.length/2)){
            if(newContentState.length === 1 && earlyContentState.length >= 2 && earlyContentState.length <= 3){
                const result = earlyContentState.filter((e,i)=>{
                    for(let j=0;j < newContentState.length; j++){
                        if(earlyContentState[j].uuid === e.uuid) return false;
                    }
                    return true;
                })
                alert('결승 끝');
                const result2 = [...resultState, {uuid : result[0].uuid, point : earltlength.current}, {uuid : newContentState[0].uuid, point : earltlength.current+2}];
                console.log('ㄱes',result2);
                axios({
                    url : process.env.REACT_APP_SERVER_URL + '/oneandoneresult',
                    method : 'POST',
                    data : {
                        result : result2,
                        roomName : roomName
                    },
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                }).then((res)=>{
                    //result로 페이지 이동
                    navigate(`/result?roomName=${roomName}`);
                })
            }
            else{
                setEarlyContentState([...newContentState]);
                change_content.current = [];
                // showIndex.current = 2;
                setShowIndex(showIndex => 2);
                setContentState([newContentState[0],newContentState[1]]);
                const result = earlyContentState.filter((e,i)=>{
                    for(let j=0;j < newContentState.length; j++){
                        if(earlyContentState[j].uuid === e.uuid) return false;
                    }
                    return true;
                })
                const result2 = result.map((e,i)=>{
                    return ({point : earltlength.current-newContentState.length, uuid : e.uuid})
                })
                console.log('버러진거 result',result);
                setResultState(resultState => [...resultState,...result2])
                console.log('강 올라감 newcontenttstate',newContentState);
            }
            // alert('end');
        }
        else{
            console.log('기본 진행 중 change content',change_content.current,earlyContentState);
            setContentState([earlyContentState[showIndex],earlyContentState[showIndex+1]]);
            // showIndex.current = showIndex.current + 2;
            setShowIndex(showIndex => showIndex+2);
            change_content.current = [...newContentState];
        }
        console.log('change_content.current',change_content.current);
    }
    return(
        <div className='oneandone_root'>
            <h1 className='oneandone_title'>{title}</h1>
            <h2>{earlyContentState.length}강</h2>
            {
                contentState.map((e,i)=>{
                    return(
                        <section key={i} className='all_btn'>
                            <p>{e.text}</p>
                            <img key={i} src={e.img} id={showIndex-2+i} onClick={contentClick}></img>
                        </section>

                    )
                })
            }
        </div>
    )
}
export default Main2_a_queze_1and1;