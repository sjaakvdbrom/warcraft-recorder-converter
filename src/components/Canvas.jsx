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
      ctx.lineWidth = 10;
      ctx.strokeStyle = 'white';
      ctx.stroke();
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
        let circleY = loadedImageHeight / 2 - 150;
        let circleX = loadedImageWidth / 2 + index * 150 - 150;
        let imageY = circleY - 50;
        let imageX = circleX - 50;
        // console.log('circleX: ' + circleX)
        // console.log('imageX: ' + imageX)
        drawImageCircle(ctx, circleX, circleY, 50, imageX, imageY, 100, 100, `https://cdnassets.raider.io/images/wow/icons/large/${item.icon}.jpg`);
      })

      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.font = "900 60px Arial";
      ctx.shadowColor= "rgba(0, 0, 0, .5)";
      ctx.shadowOffsetY = 2;
      ctx.shadowOffsetX = 2;
      ctx.shadowBlur=7;
      ctx.fillText(props.title.toUpperCase(), loadedImageWidth / 2, loadedImageHeight / 2 + 30);

      ctx.fillStyle = "#F48CBA";
      ctx.fillText("Prot paladin".toUpperCase(), loadedImageWidth / 2, loadedImageHeight / 2 + 150 + 30);
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