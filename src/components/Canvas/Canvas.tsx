import { useRef, useEffect, useState } from "react";
import { CanvasProps } from '@/services/interfaces';
import { polygonCenter, isPointInside } from '@/services/canvas';
import { Point } from '@/services/interfaces';
import canvas from '@/components/Canvas/Canvas.module.css';

export default function Canvas ({ base64, dimensions, strokeWidth, color, mode, onShapeReady }: CanvasProps)  {

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cutoutRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const pointsRef = useRef<{ x: number; y: number }[]>([]);
  const pointsRefCtx = useRef<CanvasRenderingContext2D | null>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [cropShape, setCropShape] = useState(false);
  const [savedImg, setSavedImg] = useState<string | null>('')

  // crop mode state
  //const cropPoints = useRef<{ x: number; y: number }[]>([]);
  const cropPoints = useRef<Point[]>([]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    canvas.width = dimensions.x;
    canvas.height = dimensions.y;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctxRef.current = ctx;

    const img = new Image();
    img.src = base64;
    if(savedImg){
      img.src = savedImg;

    }
    
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    };
  }, [base64, dimensions, savedImg]);

  const handleMouseDown_Draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!ctxRef.current) return;

    setIsDrawing(true);

    const { offsetX, offsetY } = e.nativeEvent;

    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY);
  };

  const handleMouseMove_Draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !ctxRef.current) return;

    const { offsetX, offsetY } = e.nativeEvent;

    ctxRef.current.strokeStyle = color;
    ctxRef.current.lineWidth = strokeWidth;
    ctxRef.current.lineCap = "round";

    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    ctxRef.current?.closePath();
  };

  const handleMouseDown_Crop = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!ctxRef.current) return;

    const { offsetX, offsetY } = e.nativeEvent;
    cropPoints.current.push({ x: offsetX, y: offsetY });

    const ctx = ctxRef.current;
    const points = cropPoints.current;

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(offsetX, offsetY, 2, 0, Math.PI * 2);
    ctx.fill();

    if (points.length > 1) {
      const prev = points[points.length - 2];
      ctx.strokeStyle = "red";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(prev.x, prev.y);
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
    }

    //add crop calculation
    if (points.length > 4) {
      // TODO 1.
      onShapeReady(true);
      //
      setCropShape(true);
      const boundingBox = points.reduce(
        (acc, p) => ({
          minX: Math.min(acc.minX, p.x),
          maxX: Math.max(acc.maxX, p.x),
          minY: Math.min(acc.minY, p.y),
          maxY: Math.max(acc.maxY, p.y),
        }),
        {
          minX: points[0].x,
          maxX: points[0].x,
          minY: points[0].y,
          maxY: points[0].y,
        }
      );
      
      const cutoutPoints = [];

      for (let y = boundingBox.minY; y <= boundingBox.maxY; y++) {
        for (let x = boundingBox.minX; x <= boundingBox.maxX; x++) {
          if (isPointInside(x, y, points)) {
            cutoutPoints.push({ x, y });
          }
        }
      };
      //
      const boxWidth = boundingBox.maxX - boundingBox.minX + 1;
      const boxHeight = boundingBox.maxY - boundingBox.minY + 1;

      const cropCanvas = cutoutRef.current!;
      cropCanvas.width = boxWidth;
      cropCanvas.height = boxHeight;
      const pointsCtx = cropCanvas.getContext("2d");
      if (!pointsCtx) return;

      const cutoutSrc = ctx.getImageData(boundingBox.minX, boundingBox.minY, boxWidth, boxHeight);
      const output = pointsCtx.createImageData(boxWidth, boxHeight);

      for (let y = boundingBox.minY; y <= boundingBox.maxY; y++) {
        for (let x = boundingBox.minX; x <= boundingBox.maxX; x++) {

          if (!isPointInside(x, y, points)) continue;

          const localX = x - boundingBox.minX;
          const localY = y - boundingBox.minY;

          const i = (localY * boxWidth + localX) * 4;

          output.data[i]     = cutoutSrc.data[i];
          output.data[i + 1] = cutoutSrc.data[i + 1];
          output.data[i + 2] = cutoutSrc.data[i + 2];
          output.data[i + 3] = 255;
        };
      };
      pointsCtx.putImageData(output, 0, 0);
    };
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (mode === "draw") handleMouseDown_Draw(e);
    else handleMouseDown_Crop(e);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (mode === "draw") handleMouseMove_Draw(e);
  };

  const handleMouseUp = () => {
    if (mode === "draw") stopDrawing();
  };

  const saveImage = ()=> {
    if(!cutoutRef.current) return;
    const cutout = cutoutRef.current;
    const savedImg = cutout.toDataURL('image/png');
    setSavedImg(savedImg);
    console.log('saved img', savedImg, typeof savedImg)
  }

  const tryAgain = () => {
    if(!cutoutRef.current) return;
    const pointsCtx = cutoutRef.current.getContext("2d");
    pointsCtx!.clearRect(0, 0, cutoutRef.current.width, cutoutRef.current.height);
    // clean array and reset
    pointsRef.current.length = 0;
    console.log('points array', pointsRef.current)
    //
    const canvas = canvasRef.current;
    const ctx = canvas!.getContext("2d");
    if (!ctx) return;

    ctxRef.current = ctx;
    const img = new Image();
    img.src = base64;

    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas!.width, canvas!.height);
    };
  };

  return (
    <div className={canvas.canvas_wrap}>
      <canvas
        ref={canvasRef}
        width={dimensions.x}
        height={dimensions.y}
        onClick={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
      {/* mozda tu cropShape check */}
      <div className="cutout">
        <canvas ref={cutoutRef}
        width={500}
        height={500}
        />
        {cropShape && (
        <div>  
          <button className="btn" onClick={saveImage}>Save shape</button>
          <button className="btn" onClick={tryAgain}>Try again</button>
        </div>
        )}
      </div>
    </div>
  );
}