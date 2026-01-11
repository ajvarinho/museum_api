"use client";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { toDataURL } from '../../../../services/fetch';
import { EffectType } from '@/services/interfaces'
import Canvas from "@/components/Canvas/Canvas";
import Nav from '@/components/Nav/Nav';
import CanvasControls from '@/components/CanvasControls/CanvasControls';
import ImageEffects from '@/components/ImageEffects/ImageEffects';


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
  const [effects, setEffects] = useState(false);
  //
  const [shapeReady, setShapeReady] = useState(false);
  
 const [currentEffect, setCurrentEffect] = useState<EffectType>('none');

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

  const handleEffectChange = (effect: EffectType) => {
    setCurrentEffect(effect);
  };

  const handleApplyEffect = (newBase64: string) => {
    setBase64(newBase64); 
    setEffects(false); 
    setCurrentEffect('none'); 
  };

  return (
    <>
    <Nav isLoading={false}></Nav>
    <main className="p-4">
      <h1 className="text-xl font-semibold mb-4">Edit Image #{id}</h1>

      <CanvasControls
          strokeWidth={strokeWidth}
          onStrokeChange={setStrokeWidth}
          color={color}
          onColorChange={setColor}
          crop={crop}
          setCrop={setCrop}
          effects={effects}
          setEffects={setEffects}
          shapeReady={shapeReady}
          onEffectChange={handleEffectChange} 
          selectedEffect={currentEffect}      
          />

      <div className="edit-wrap">
        <div>
          {base64 && dimensions && (
            <Canvas 
              base64={base64} 
              dimensions={dimensions}   
              strokeWidth={strokeWidth}
              color={color}
              mode={crop ? "crop" : "draw"}
              onShapeReady={setShapeReady}
              />
          )}
        </div>

        {base64 && effects && (
          <div className="modal-overlay">
            <div className="modal-content">
                <button 
                  className="modal-close" 
                  onClick={() => setEffects(false)}
                >
                  ×
                </button>
                <ImageEffects 
                  base64={base64} 
                  dimensions={dimensions} 
                  effect={currentEffect} 
                  onEffectChange={handleEffectChange}
                  onApplyEffect={handleApplyEffect}
                />
            </div>
          </div>
        )}

      </div>
    </main>
    </>
  );
}