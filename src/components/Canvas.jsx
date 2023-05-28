import React, { useRef, useEffect } from 'react';

const Canvas = props => {
  const canvasRef = useRef(null);

  function drawImageCircle(
    ctx, 
    circleX, 
    circleY, 
    radius,
    imageX, 
    imageY, 
    imageWidth, 
    imageHeight, 
    imageUrl) {

    var img = new Image();
    img.onload = function(){
      ctx.save();
      ctx.beginPath();
      ctx.arc(circleX, circleY, radius, 0, Math.PI*2, true);
      ctx.clip();
      ctx.drawImage(this, imageX, imageY, imageWidth, imageHeight);
      ctx.restore();
    };
    img.src = imageUrl;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let loadedImageWidth = '1280';
    let loadedImageHeight = '720';

    var bg = new Image();

    bg.onload = function () {
      ctx.drawImage(bg, 0, 0);
      drawImageCircle(ctx, 50, 50, 50, 0, 0, 100, 100, 'https://cdnassets.raider.io/images/wow/icons/large/inv_misc_root_01.jpg');
    };
  
    bg.src = props.image;

    // Set the canvas to the same size as the image.
    canvas.width = loadedImageWidth;
    canvas.height = loadedImageHeight;

    
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} {...props} className='w-full'/>
    </div>
  );
}

export default Canvas;