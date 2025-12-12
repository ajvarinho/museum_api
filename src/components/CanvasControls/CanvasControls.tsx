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
      <label>
        Stroke Weight
        <input
          type="range"
          min={1}
          max={10}
          value={strokeWidth}
          onChange={(e) => onStrokeChange(Number(e.target.value))}
        />
      </label>

      <label>
        Stroke Color
        <input
          type="color"
          value={color}
          onChange={(e) => onColorChange(e.target.value)}
        />
      </label>

      <label>
        Crop Mode
        <input
          type="checkbox"
          checked={crop}
          onChange={(e) => setCrop(e.target.checked)}
        />
      </label>
      <div>
      {shapeReady ? (
        <>
          <p>Shape is ready!</p>
          <button className="btn">Save Shape</button>
        </>
      ) : crop && (
        <p>Please add at least 3 points to define the crop shape</p>
      )}
    </div>
    </div>
  );
}