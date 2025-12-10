import { useRef, useState, useEffect } from "react";

interface Props {
  base64: string | null;
  dimensions: {
    x: number,
    y: number
  };
}

export default function Canvas ({ base64, dimensions }: Props)  {

const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const pointsRef = useRef<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx;

    const img = new Image();
    img.src = base64;
    img.onload = () => ctx!.drawImage(img, 0, 0);
  }, [base64]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    pointsRef.current.push({ x, y });
    console.log("marked", pointsRef.current);
  };

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.x}
      height={dimensions.y}
      onClick={handleClick}
    />
  );
}