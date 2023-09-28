import React, { useEffect,useRef, useState } from "react";
import axios from 'axios';




const Queze_box = (props) =>{

    const arr_controller = useRef(0);
    const [render,setRender] = useState();
    const val = useRef([]);
    const [translate_state,settranslate_state] = useState('');
    const key = useRef(0);
    const arr_components = useRef();
    const roomNameRef = useRef();
    const num = useRef(0);
    

    
    useEffect(()=>{
        console.log('props',translate_state);
        console.log('Queze_box_page is rendered');

        console.log('text', props.text);

        axios({
            url : 'http://localhost:45509/queze',
            method : 'get',
            headers  : 
                {
                    "Content-Type": "application/json",
                }
        }).then((res)=>{
            console.log(res.data[0].roomName);
            const v = res.data.map((e)=>e.value);
            roomNameRef.current = res.data.map((e)=>e.roomName);
            console.log('roomNameRef is : ',roomNameRef.current);
            console.log('v',v[0]);
            val.current = v;
            setRender(0);
        })
    },[])
    // console.log('arr components is : ',arr_components.current);
    arr_components.current = val.current.map((e)=>{
        key.current += 1;
        return(

            <li style={{transform : `translateX(${translate_state}%)`}} key={key.current}>
                <p className="Queze_p">{e}</p>
            </li>
        );
    })
    // console.log('arr_compotents is ',arr_components.current);
    
    const btn1_click = () => { // 왼쪽으로 가는 버튼 -해줘
        // console.log('left clicked');
        if(translate_state <= 0){
            settranslate_state(translate_state + 100);
            num.current--;
        }


    }
    const btn2_click = () => {
        // console.log('left clicked');
        if((translate_state <= 100)){
            settranslate_state(translate_state - 100);

        }

    }
    

    return(
        <div className="Q_main">
            {/* <div className="top_bottom">
                <ul className="u1_2">

                </ul>
            </div> */}
            <div className='Q_area'>
                <ul className="Q_ul">
                    {
                        arr_components.current
                        
                    }
                    
                </ul>
                <button className='btn1' onClick={btn1_click}></button>
                <button className='btn2' onClick={btn2_click}></button>
                
            </div>
        </div>

    );
}
export default Queze_box;