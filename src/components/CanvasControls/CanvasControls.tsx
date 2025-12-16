import { CanvasControlsProps } from '@/services/interfaces';
import '@/components/CanvasControls/CanvasControls.css';

export default function CanvasControls({
  strokeWidth,
  onStrokeChange,
  color,
  onColorChange,
  crop,
  setCrop,
  shapeReady
}: CanvasControlsProps) {
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
              <button className="btn">Save shape</button>
            </>
          ) : crop && (
            <p>Please add at least 3 points to define the crop shape</p>
          )}
        </div>
    </div>
    </div>
  );
}