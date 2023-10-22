import React,{useEffect, useRef, useState} from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const Queze_result = (props) => {
    
    const [searchParams, setSearchParams] = useSearchParams();
    const queze_result_ref = useRef([]);
    const [queze_result, setQueze_result] = useState();
    useEffect(()=>{
        const roomName = searchParams.get('roomName');
        console.log(roomName);
        axios({
            url      : 'http://localhost:45509/queze_result',
            method   : 'POST',
            headers  : {
                'Content-Type' : 'application/json'
            },  
            data     : {
                roomName : roomName               
            }
        }).then((res)=>{

            console.log('res queze result',res);
            let queze_result_value;
            if(res.data === '없음'){
                queze_result_value = '없음';
                queze_result_ref.current = [
                    <button  className='show_reslut_li' >
                        <p className='show_result_p'>...</p>
                        <p className='show_result_p2'>없음</p>
                    </button>
                ]
            }else{
                queze_result_ref.current = [];
                for(let i=1; i <= res.data.length;i++){
                    console.log(i);
                    queze_result_value = res.data[i-1].id;
                    queze_result_ref.current.push(
                        <button onClick={()=>{console.log('bbbbb')}} className='show_reslut_li' key={i}>
                            <p className='show_result_p'>{i}등</p>
                            <p className='show_result_p2'>{queze_result_value}</p>
                        </button>
                    )
                }
                
            }
            
            // if(res.data === '없음'){
            //     queze_result_value = '없음';
            // }else{
            //     queze_result_ref.current = [];
                
            //     for(let i=1; i <= res.data.length;i++){
            //         console.log(i);
            //         queze_result_value = res.data[i-1].id;
            //         queze_result_ref.current.push(
            //             <li className='show_reslut_li' key={i}>
            //                 <p className='show_result_p'>{i}등</p>
            //                 <p className='show_result_p2'>{queze_result_value}</p>
            //             </li>
            //         )
            //     }
            // }
            
        
            console.log('result 받고 usestate 바꾸기 전 queze_result_Ref 값 : ',queze_result_ref.current);
            setQueze_result(queze_result_ref.current);
            console.log('result 받고 usestate 바꾼후 queze_result 값 : ',queze_result);
        })
    },[props])

    
    return(
        <div className='result_screan'>
            {
                queze_result  
            }
        </div>

    )
}

export default Queze_result;