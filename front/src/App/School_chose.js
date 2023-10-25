import React from 'react';
import { useEffect, useState, useRef } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import axios from "axios";
import './css.css';
import SelectBox from './Select_box';

const School_choose = (props) => /*-----------------33333333333333333---------------------------------------------- */
    {  
        const url_ = 'https://port-0-ayo-serber-builder-12fhqa2blnl9payx.sel5.cloudtype.app';

        const navigate = useNavigate();     

        const input_value = useRef(); 

        const [render,setRender] = useState(0);
        
        const [selectbox_con, setSelectbox_con] = useState(false);

        const props_option = useRef([]);

        const btn_content_value_con = useRef(true);

        const back_con = useRef(true);

        const back = useRef([]);


        const apifun = () => //회원 가입 완료 버튼
        {

            // console.log('완료',input_value.current.value);
            // localStorage.removeItem('school_name');
            // localStorage.setItem('school_name',input_value.current.value);
            // axios({
            //     url : `${url_}/queze`,
            //     // url : 'http://localhost:45509/queze',
            //     method : 'POST',
            //     headers : {
            //         'Content-Type' : 'application/json'
            //     },
            //     data : {
            //         school : input_value.current.value,
            //     }
            // }).then((res)=>{
            //     // console.log(res);
            //     navigate(`/queze?school_name=${input_value.current.value}`);
            // })
            navigate(`./queze?school_name=${input_value.current.value}`);

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
        const processChange = debounce(() => Axios_fn());

        const Axios_fn =() => /*--------------------------------------------------------------*/
        {   

            setSelectbox_con(true);
            console.log('ref : ',input_value.current.value);
            fetch(`https://open.neis.go.kr/hub/schoolInfo?SCHUL_NM=${input_value.current.value}&Type=json&key=7bb28e84d18c4b3c9455a81e663d6e6e`)
            .then((response) => response.json())
            .then((data) => 
            {   
                if(Object.values(Object.values(data)[0])[1] === '해당하는 데이터가 없습니다.')
                {

                    console.log('해당하는 데이터가 없습니다.');

                }
                else 
                {   
                    if(data.schoolInfo[1].row.length <= 5)
                    { // 검색 길이 5이하

                        console.log('검색 길이 5이하');
                        let arr = [];
                        for(let i=0;i<data.schoolInfo[1].row.length;i++)
                        {
                            arr[i] = data.schoolInfo[1].row[i].SCHUL_NM;
                            console.log('빈 arr에 온 데이터 만큼 베열에 데이터 넣는 중',arr);
                        }
                        props_option.current = arr;
                        console.log(' school_name : ',props_option.current);

                    }
                    else 
                    {

                        let arr = [];
                        console.log('검색 길이 5이상');
                        for(let i=0;i<5;i++)
                        {
                            arr[i] = data.schoolInfo[1].row[i].SCHUL_NM; 
                            console.log('빈 arr에 온 데이터 만큼 베열에 데이터 넣는 중',arr);
                        }
                        props_option.current = arr;
                        console.log(' school_name : ',props_option.current);

                    }
                    console.log('바뀐 option 값 at queze : ',props_option);
                    btn_content_value_con.current = true;
                    back_con.current = true;
                    input_value.current.style.borderRadius = '0';
                    input_value.current.style.borderTopLeftRadius = '10px';
                    input_value.current.style.borderTopRightRadius = '10px';
                    input_value.current.style.border = '0px';
                    input_value.current.style.borderBottom = '2px solid rgb(148, 148, 148)';
                    setRender(render + 1);
                    console.log('con : ',btn_content_value_con.current);
                }
            })

            
             
    }

    return(
        
        <div className='Main_root'>
            <div className='content_area'>

                {back.current}

                <div className='Logo'><p>Ayo</p></div>

                <input type='select' className='Input_basic Border_radius z_index' placeholder='학교 검색' ref={input_value} onKeyUp={processChange} ></input>
                {
                    selectbox_con === true ? <SelectBox option={props_option} input_value={input_value} btn_content_value_con={btn_content_value_con} back={back_con}></SelectBox> : null
                }
                <p className='explain'>학교 친구들의 순위를 가려보자!</p> {/* 동물상 테스트, 우리학교 월드컵 */}
                <input type='button' className='Submit_btn' value="완료" onMouseDown={(e) => {e.preventDefault()}} onClick={apifun}></input>
                    
            </div>
        
    </div>
    

    )
    }
    export default School_choose;