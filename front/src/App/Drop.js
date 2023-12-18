import React from 'react';
import {dragenter, dragover} from './public/WorldRank';

const Drop = ({drop_element_index,text, img, uuid, dropFunc, dropDelete, isDraging}) => {

    if(img === ''){ // drop에 이미지가 없을 때
        return(
            <>
                <p className = "drop_rank">{drop_element_index+1} 등</p>
                <div className="drop">
                    {/* <button onClick={dropDelete}>X</button> */}
                    <img id={drop_element_index} onDragOver={(e)=>{e.preventDefault()}} onDrop={(dropFunc)} onDragEnter ={dragenter} onDragLeave={dragover}></img>
                    <p>{text}</p>   
                    <input type='hidden' value={uuid}></input>
                </div>  
            </>
        );
    }
    else {
        return(
            <>
                <p className = "drop_rank">{drop_element_index+1} 등</p>
                <div className="drop">
                    <button id={drop_element_index} onClick={dropDelete}>X</button>
                    <img id={drop_element_index} onDragOver={(e)=>{e.preventDefault()}} onDrop={(dropFunc)} onDragEnter ={dragenter} onDragLeave={dragover} src={img}></img>
                    <p>{text}</p>   
                    <input type='hidden' value={uuid}></input>
                </div>  
            </>
        );
    }
    
    
}

export default Drop;