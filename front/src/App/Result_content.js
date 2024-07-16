import React from 'react';

const Result_content = ({img,text,rankNum, length}) => {
    // console.log(rankNum, length);
    const num = length / (rankNum+1);
    // console.log('num',num);
    let type;
    let bac;
    if(Number(num) === Number(length)){
        type = 'op';
        bac  = 'rgb(255, 99, 99)';
        // console.log(type);
    }
    else if(Number(num) >= Number(length) / (Number(length) * 3 / 10)){
        type = '1';
        bac  = 'rgb(99, 130, 255)';
        // console.log(type);
        }
    else if(Number(num) >= Number(length) / (Number(length) * 5 / 10)){
        type = '2';
        bac  = 'rgb(102, 255, 99)';
        // console.log(type);
        }
    else if(Number(num) >= Number(length) / (Number(length) * 7 / 10)){
        type = '3';
        bac  = 'rgb(255, 229, 97)';
        // console.log(type);
        }
    else if(Number(num) >= Number(length) / (Number(length) * 9 / 10)){
        type = '4';
        bac  = 'rgb(75, 75, 75)';
        // console.log(type);
        }
    else{
        type = '5';
        bac  = 'rgb(0, 0, 0)'
        // console.log(type);
    }
    // console.log('result content element start');
    return(
        <div className="result_area">
            {
                <h3 style={{backgroundColor: bac}}><p>{type}</p></h3>
            }
            {/* <h4>{rankNum+1}</h4> */}
            <img src={img}></img>
            <p>{text}</p>
        </div>    
    )
}

export default Result_content;