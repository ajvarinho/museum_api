'use client';
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

  // Initial load
//   useEffect(() => {
//     loadImages();
//   }, [objectIds]);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-8 main-container">
        {images.map((img) => (
          <div key={img.id} className="img-wrap">
            <ImgCard key={img.id} image={img} onToggleFavorite={() => {}} />
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