import React, { useRef, useEffect } from 'react';

const Audio_canvas = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const canvasWidth = canvas.clientWidth;
        const canvasHeight = canvas.clientHeight;
        const numBars = Math.floor(canvasWidth / barWidth);
        const length = 50;
        const barWidth = (canvas.width / length) * 2.5;
        // const barWidth = 1;
        // const drawRandomBars = () => {
        //   const canvasWidth = canvas.width;
        //   const canvasHeight = canvas.height;
    
        //   ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
        //   for (let i = 0; i < 50; i++) {
        //     const x = Math.random() * canvasWidth;
        //     // const x = 0;
        //     // const y = Math.random() * canvasHeight;
        //     const y = 0;
        //     const width = 5;
        //     const height = Math.random() * 100;
        //     const hue = Math.random() * 360;
    
        //     ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
        //     ctx.fillRect(x, y, width, height);
        //   }
    
        //   requestAnimationFrame(drawRandomBars);
        // };
        const draw = () => {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      
            // for (let i = 0; i < numBars; i++) {
            //   const x = i * barWidth;
            //   const hue = (i / numBars) * 360;
            //   ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
            //   ctx.fillRect(x, canvasHeight - barHeight, barWidth, barHeight);
            // }
            let x = 0;
            // let before_barHeight = 0;
            for (let i = 0; i < length; i++) {
                // const barHeight = 50 / 2;
                // const length = Math.random() * 100;
                // barHeight = dataArray[i] / 2;

                const barHeight = Math.random() * canvasHeight; // Fluctuate randomly
                const hue = (i / length) * 360;
                ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
                ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                ctx.beginPath();

                // ctx.arc(x, barHeight, 30, 0, 2 * Math.PI);
                // ctx.fillStyle = '#ff0000';
                // ctx.fill();
                // ctx.closePath();       
                x += barWidth + 1;

                // ctx.beginPath();
                // ctx.arc(this.point.x, this.point.y, 30, 0, 2 * Math.PI);
                // ctx.fillStyle = '#ff0000';
                // ctx.fill();
                // ctx.closePath();

                // before_barHeight = barHeight;
            }
            // requestAnimationFrame(draw);
            setTimeout(() => {
                requestAnimationFrame(draw);
            }, 300);
        };
        // drawRandomBars();
        draw();  
        // return () => {
        //   cancelAnimationFrame(drawRandomBars);
        // };
        return () => {
            cancelAnimationFrame(draw);
        };
    }, []);
  return <canvas style={{Width:'320px', Height:'180px', display : 'flex'}} ref={canvasRef} />;
}

export default Audio_canvas;
