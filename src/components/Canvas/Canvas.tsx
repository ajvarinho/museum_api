import { useRef, useEffect, useState } from "react";
import { CanvasProps } from '@/services/interfaces';
import { polygonCenter, isPointInside } from '@/services/canvas';
import { Point } from '@/services/interfaces';

export default function Canvas ({ base64, dimensions, strokeWidth, color, mode, onShapeReady }: CanvasProps)  {

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const pointsRef = useRef<{ x: number; y: number }[]>([]);

  const [isDrawing, setIsDrawing] = useState(false);
  const [cropShape, setCropShape] = useState(false);

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

    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }, [base64, dimensions]);

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
    ctx.arc(offsetX, offsetY, 3, 0, Math.PI * 2);
    ctx.fill();

    if (points.length > 1) {
      const prev = points[points.length - 2];
      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(prev.x, prev.y);
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
    }

    //add crop calculation
    if (points.length > 3) {
      // TODO 1.
      onShapeReady(true);
      const cog = polygonCenter(points);
      console.log('COG', cog);
      ctx.beginPath();
      ctx.arc(cog.cogX, cog.cogY, 3, 0, Math.PI * 2);
      ctx.fill();
      //
      const cutout = [];
      // TODO 2.
      for (let y = 0; y < dimensions.y; y++) {
        for (let x = 0; x < dimensions.x; x++) {
          if (isPointInside(x, y, points)) {
                cutout.push({
                  x,
                  y,
                });
          }
        }
      }
      console.log(cutout)
      /**
       * TODO - 
       * 1. calculate leftmost and uppermost points of cutout / points arr for getImageData(sx, sy, sw, sh)
       * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData
       * sx = leftmost
       * sy = uppermost
       * sw = rightmost ?
       * sh = downmost ?
       * 2. apply the isPointInside method to this area, to reduce loop
       */
    }
  };

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

  return (
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
  );
}