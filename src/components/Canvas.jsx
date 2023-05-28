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
      ctx.filter = "blur(7px)";
      ctx.drawImage(bg, 0, 0, 1500, 720);
      ctx.filter = "blur(0px)";
      props.affixes.map((item, index) => {
        let circleX = (index + 1) * 150;
        let imageX = circleX - 50;
        // console.log('circleX: ' + circleX)
        // console.log('imageX: ' + imageX)
        drawImageCircle(ctx, circleX, 150, 50, imageX, 100, 100, 100, `https://cdnassets.raider.io/images/wow/icons/large/${item.icon}.jpg`);
      })

      
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.font = "bold 80px Arial";
      ctx.shadowColor= "black";
      ctx.shadowBlur= 7;
      ctx.fillText("Neltharion's Lair +18", loadedImageWidth / 2, loadedImageHeight / 2);
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