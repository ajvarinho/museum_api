'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import { ImageData } from '@/services/interfaces';

interface ImageContextType {
  objectIds: number[];
  setObjectIds: (ids: number[]) => void;
  images: ImageData[];
  setImages: React.Dispatch<React.SetStateAction<ImageData[]>>;
  scrollPosition: number;
  setScrollPosition: (pos: number) => void;
}

const ImageContext = createContext<ImageContextType | null>(null);

export function ImagesProvider({ children }: { children: ReactNode }) {
  const [objectIds, setObjectIds] = useState<number[]>([]);
  const [images, setImages] = useState<ImageData[]>([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  return (
    <ImageContext.Provider value={{ 
      objectIds, 
      setObjectIds, 
      images, 
      setImages,
      scrollPosition,
      setScrollPosition
    }}>
      {children}
    </ImageContext.Provider>
  );
}

export const useImagesContext = () => {
  const context = useContext(ImageContext);
  if (!context) throw new Error('useImagesContext must be used within ImagesProvider');
  return context;
};