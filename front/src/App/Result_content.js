import React from 'react';

const Result_content = ({img,text}) => {
    
    console.log('result content element start');
    return(
        <div className="result_area">
            <img src={img}></img>
            <p>{text}</p>
        </div>    
    )
}

export default Result_content;