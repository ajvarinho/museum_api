"use client";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { toDataURL } from '../../../../services/fetch';
import Canvas from "@/components/Canvas/Canvas";
import CanvasControls from '@/components/CanvasControls/CanvasControls';


export default function EditImagePage() {
  const { id } = useParams<{ id: string }>();
  const [base64, setBase64] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState<{ x: number; y: number }>({
    x: 1,
    y: 1,
  });

  const [strokeWidth, setStrokeWidth] = useState(1);
  const [color, setColor] = useState("#000000ff");
  const [crop, setCrop] = useState(false);

  /**
   * get image from localStorage and convert to base64
   */
  useEffect(() => {
    const saved = localStorage.getItem(id);
    if (!saved) return;
    const parsed = JSON.parse(saved);
    const load = async () => {
        const proxiedUrl = `/api/image-proxy?url=${encodeURIComponent(parsed.srcSmall)}`;

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = proxiedUrl;

        await new Promise<void>((resolve) => {
          img.onload = () => resolve();
        });

        setDimensions({ x: img.width, y: img.height });
        const base64 = await toDataURL(proxiedUrl);
        setBase64(base64 as string);
      };

      load();

  }, [id]);

  return (
    <main className="p-4">
      <h1 className="text-xl font-semibold mb-4">Edit Image #{id}</h1>
      <div>
        {base64 && dimensions && (
          <Canvas 
            base64={base64} 
            dimensions={dimensions}   
            strokeWidth={strokeWidth}
            color={color}
            mode={crop ? "crop" : "draw"}
            />
        )}
      </div>
      <CanvasControls
        strokeWidth={strokeWidth}
        onStrokeChange={setStrokeWidth}
        color={color}
        onColorChange={setColor}
        crop={crop}
        setCrop={setCrop}
      />
    </main>
  );
}