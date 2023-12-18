import React from 'react';

const Drag = ({text, img, uuid, dragStartFunc, drag_element_index}) => {
    // console.log('img',img,typeof(img),img.length);
    if(img.length === 0 || img === ''){
        // console.log('윕');
        return(
            <div className="drag">
                {/* <img  id={drag_element_index} onDragStart={dragStartFunc}></img> */}
                <p>{text}</p>
                <input type='hidden' value={uuid}></input>
            </div>
        );
    }else{
        // console.log('아래');
        return(
            <div className="drag">
                <img className="all_btn" id={drag_element_index} onDragStart={dragStartFunc} src={img}></img>
                <p>{text}</p>
                <input type='hidden' value={uuid}></input>
            </div>
        );
    }
    
}

export default Drag;