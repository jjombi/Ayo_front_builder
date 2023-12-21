import React from 'react';

const Result_content = ({img,text,rankNum}) => {
    
    console.log('result content element start');
    return(
        <div className="result_area">
            <h4>{rankNum+1}</h4>
            <img src={img}></img>
            <p>{text}</p>
        </div>    
    )
}

export default Result_content;