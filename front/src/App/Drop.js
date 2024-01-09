import React from 'react';
import {dragenter, dragover} from './public/WorldRank';

const Drop = ({index, tier, text, img, uuid, dropFunc, dropDelete, length}) => {
    let width = '30px';
    if(length === 1){
        width = '95vw';
    }

    if(img === ''){ // drop에 이미지가 없을 때
        return(
            
            <div className="drop">
                <img id={`{"index" : ${index}, "tier" : ${tier}}`} style={{width : width}} onDragOver={(e)=>{e.preventDefault()}} onDrop={dropFunc} onDragEnter ={dragenter} onDragLeave={dragover}></img>
                <p>{text}</p>   
                <input type='hidden' value={uuid}></input>
            </div>  
            
        );
    }
    else {
        return(
            
            <div className="drop">
                <button className='all_btn' id={`{"index" : ${index}, "tier" : ${tier}}`} onClick={dropDelete}>X</button>
                <img src={img}></img>
                <p>{text}</p>   
                <input type='hidden' value={uuid}></input>
            </div>  
            
        );
    }
    
    
}

export default Drop;