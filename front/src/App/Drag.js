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
                <picture>
                    <source className='drag_img' width={'300px'} height={'250px'} srcSet={"data:image/avif;base64,"+img} id={drag_element_index} onDragStart={dragStartFunc} loading="lazy" type="image/avif" />
                    <source className='drag_img' width={'300px'} height={'250px'} srcSet={"data:image/webp;base64,"+img} id={drag_element_index} onDragStart={dragStartFunc} loading="lazy" type="image/webp" />
                    <img className='drag_img' width={'300px'} height={'250px'} src={"data:image/jpeg;base64,"+img} id={drag_element_index} onDragStart={dragStartFunc} alt="Fast red car" />
                </picture>
                {/* <img className="all_btn" loading='lazy' id={drag_element_index} onDragStart={dragStartFunc} src={img}></img> */}
                <p>{text}</p>
                <input type='hidden' value={uuid}></input>
            </div>
        );
    }
    
}

export default Drag;