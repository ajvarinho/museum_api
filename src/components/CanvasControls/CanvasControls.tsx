import { SetStateAction, useState } from "react";
import { CanvasControlsProps, EffectType } from '@/services/interfaces';
import '@/components/CanvasControls/CanvasControls.css';

export default function CanvasControls({
  strokeWidth,
  onStrokeChange,
  color,
  onColorChange,
  crop,
  setCrop,
  shapeReady,
  effects,
  setEffects
}: CanvasControlsProps) {

  const [selectedEffect, setSelectedEffect] = useState<EffectType>('none');
  const saveImg = ()=> {
    console.log('alo  save')
  };

  const removeImg = ()=> {
    console.log('alo remove')
  }


  const handleEffectSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const effect = e.target.value as EffectType;
    console.log('effects canvascontrosl', effect)
    setSelectedEffect(effect);
  };

  return (
    <div className="edit-controls">

        <div className="draw-mode flex flex-col gap-1">
          <h3>DRAW MODE</h3>
          <div className="controls-wrap">
            <label className="flex flex-col">
              Stroke Weight: {strokeWidth}
              <input
                type="range"
                min={1}
                max={10}
                value={strokeWidth}
                onChange={(e) => onStrokeChange(Number(e.target.value))}
              />
            </label>

            <label className="flex flex-col">
              Stroke Color
              <input
                type="color"
                value={color}
                onChange={(e) => onColorChange(e.target.value)}
              />
            </label>
          </div>

        </div>

        <div className="crop-mode flex flex-col">
          <h3>CROP MODE</h3>

          <div className="controls-wrap">
            <label>
              Crop Mode
              <input
                type="checkbox"
                checked={crop}
                onChange={(e) => setCrop(e.target.checked)}
              />
            </label>

            {shapeReady ? (
              <>
                <p>Shape is ready</p>
                <button className="btn" onClick={saveImg}>Save shape</button>
                <button className="btn" onClick={removeImg}>Try again</button>
              </>
            ) : crop && (
              <p>Please add at least 3 points to define the crop shape</p>
            )}
          </div>
      </div>
      <div className="effects-mode">
        <div className="effects-wrap">
            <label>
              Effects
              <input
                type="checkbox"
                checked={effects}
                onChange={(e) => setEffects(e.target.checked)}
              />
            </label>
        </div>
        { effects && (
          <div className="select-wrap">
            <select value={selectedEffect} onChange={handleEffectSelect}>
              <option value="none">Select effect</option>
              <option value="grayscale">Grayscale</option>
              <option value="turbulence">Turbulence</option>
              <option value="blur">Blur</option>
              <option value="saturate">Saturate</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
}