"use client";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { toDataURL } from '../../../../services/fetch';
import Canvas from "@/components/Canvas/Canvas";


export default function EditImagePage() {
  const { id } = useParams<{ id: string }>();
  const [base64, setBase64] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState<{ x: number; y: number }>({
    x: 1,
    y: 1,
  });

  /**
   * handle stroke weight and color change
   */
  const strokeRef = useRef<number>(1);
  const colorRef = useRef<string>('#000000');
  const cropRef = useRef<boolean>(false);

  const handleStrokeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    strokeRef.current = Number(e.target.value);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    colorRef.current = e.target.value;
  };

  const handleCrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    cropRef.current = e.target.checked;
  };

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
        <Canvas base64={base64} dimensions={dimensions}></Canvas>
      </div>
      <div className="edit-controls">
        <div className="stroke-wrap p-4">
          <label htmlFor="stroke-weight">
            Stroke Weight
            <input id="stroke-weight" name="stroke-weight" type="range" min="1" max="10" onChange={handleStrokeChange}></input>
          </label>
          <label htmlFor="color-input">
            Stroke Color
            <input id="color-input" name="color-input" type="color" defaultValue="128, 128, 255" onChange={handleColorChange}></input>
          </label>
          <label htmlFor="crop">
            Crop image
            <input id="crop" name="crop" type="checkbox" defaultChecked={false} onChange={handleCrop}></input>
          </label>
        </div>
      </div>
    </main>
  );
}