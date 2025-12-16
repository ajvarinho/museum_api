'use client';
import '@/components/ImageGrid/ImageGrid.css';
import { useState, useCallback } from "react";
import { getImageData, getRandomUnique } from "../../services/fetch";
import { ImageData } from "../../services/interfaces";
import ImgCard from "../ImageCard/ImageCard";
import Observer from '../Observer/Observer';

interface GalleryGridProps {
  objectIds: number[];
}

const ImageGrid: React.FC<GalleryGridProps> = ({ objectIds }) => {

  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(false);

  const loadImages = useCallback(async () => {
    if (objectIds.length === 0 || loading) return;
    setLoading(true);
    const randomIds = getRandomUnique(objectIds, 10);
    const results = await Promise.all(randomIds.map(getImageData));
    const validImages = results.filter(
      (img): img is ImageData => img !== null
    );
    setImages((prev) => [...prev, ...validImages]);
    setLoading(false);
  }, [objectIds, loading]);

  const handleToggleFavorite = (id: number, checked: boolean) => {

    setImages((prev) =>
    prev.map((img) =>
        img.id === id ? { ...img, favorites: checked } : img
      )
    );

    const image = images.find((img) => img.id === id);
    if (!image) return;
    if (checked) {
      localStorage.setItem(id.toString(), JSON.stringify(image));
    } else {
      localStorage.removeItem(id.toString());
    }
  };


  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-8 main-container">
        {images.map((img) => (
          <div key={img.id} className="img-wrap">
            <ImgCard key={img.id} image={img} onToggleFavorite={handleToggleFavorite} />
          </div>
        ))}
      </div>

      {loading && (
        <p className="text-center py-4 opacity-50">Loading more images...</p>
      )}

      <Observer onVisible={loadImages} disabled={loading} />
    </div>
  );
};

export default ImageGrid;