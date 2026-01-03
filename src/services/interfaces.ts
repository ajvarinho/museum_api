//Define API response types

// Response from first fetch - object IDs
export interface SearchAPIResponse {
  total: number;
  objectIDs: number[] | null;
};

// Response from second fetch - specific image (/objects/:id)
export interface imgResponse {
  objectDate: undefined;
  objectID: number;
  title?: string;
  primaryImage?: string;
  primaryImageSmall?: string;
  artistDisplayName?: string;
  medium?: string;
  dimensions?: string;
  date?: string;
  department?: string
};

// Data format - image type fetched and saved
export interface ImageData {
  id: number;
  title: string;
  srcSmall: string;
  srcLarge?: string;
  author?: string;
  medium?: string;
  dimensions?: string;
  date?: string;
  department?: string;
  favorites: boolean;
};

//
export interface ImgCardProps {
  image: ImageData;
  onToggleFavorite: (id: number, checked: boolean) => void;
};

export interface entry {
  isIntersecting: boolean;
};

// canvas props

export interface CanvasProps {
  base64: string;
  dimensions: { x: number; y: number };
  strokeWidth: number;
  color: string;
  mode: "draw" | "crop";
  onShapeReady: (ready: boolean) => void;
};

export interface CanvasControlsProps {
  strokeWidth: number;
  onStrokeChange: (n: number) => void;
  color: string;
  onColorChange: (c: string) => void;
  crop: boolean;
  setCrop: (v: boolean) => void;
  shapeReady: boolean;
  effects: boolean;
  setEffects: (e: boolean) => void;
  selectedEffect: string;
  //
  onEffectChange: (effect: EffectType) => void;
};

// canvas crop point type
export interface Point {
  x: number;
  y: number;
};

export interface ImageEffectsProps {
  base64: string;
  dimensions: { x: number; y: number };
  effect: EffectType;
   onEffectChange: (effect: EffectType) => void;
  //
};

export type EffectType = 'none' | 'grayscale' | 'turbulence' | 'blur' | 'saturate';

