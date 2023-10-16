import React,{useRef, useState,useEffect} from "react";

const SelectBox = (props) => {

    // const [props.back_con.current,setBack_con] = useState(true);
    // const [btn_content_value_con,setBtn_content_value_con] = useState(true);
    const [render,setrender] = useState(0);

    useEffect(()=>{
        console.log('select_box rendering');
    })

    console.log('select_box에서 받은 값 : ',props.option.current,props.btn_content_value_con.current);
    const btn_content_value = props.option.current.map((option) => {
        return(
        <button className="select_box" onClick={(e)=>{fn(e.target)}} value={option} key={option}>{option}</button>
        )
    })
    console.log('button 생성한 arr value : ',btn_content_value);

    const fn = (e)=> {
        console.log('bluer');
        props.input_value.current.value = e.value;
        props.btn_content_value_con.current = false;
        console.log('버튼 눌러서 바뀐 inputvalue : ',props.input_value.current.value,props.btn_content_value_con.current);
        props.back.current = false;
        props.input_value.current.style.borderRadius = '10px';
        props.input_value.current.style.border = '2px solid rgb(204, 0, 255)';
        setrender(render + 1);
    }
    const back_btn = () => {
        props.btn_content_value_con.current = false;
        props.back.current = false;
        props.input_value.current.style.borderRadius = '10px';
        props.input_value.current.style.border = '2px solid rgb(204, 0, 255)';
        setrender(render + 1);

    }
    return (
        <>  
            {props.back.current === true ? <div className="back" onClick={back_btn}></div> : null}
            {props.btn_content_value_con.current === true ? btn_content_value : null}
        </>
	);
};


export default SelectBox;
