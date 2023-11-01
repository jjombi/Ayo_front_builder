import React,{useEffect, useRef} from "react";

const Canvas = () => {

    const canvas_ref = useRef();
    useEffect(()=>{
        //세팅
        const canvas = canvas_ref.current;
        const ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
        ctx.moveTo(110, 75);
        ctx.arc(75, 75, 35, 0, Math.PI, false); // Mouth (clockwise)
        ctx.moveTo(65, 65);
        ctx.arc(60, 65, 5, 0, Math.PI * 2, true); // Left eye
        ctx.moveTo(95, 65);
        ctx.arc(90, 65, 5, 0, Math.PI * 2, true); // Right eye
        ctx.stroke();
    },[])
    return(
        <canvas ref={canvas_ref}>
            
        </canvas>
    )
}

export default Canvas;