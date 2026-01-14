'use client';
import '@/components/ImageGrid/ImageGrid.css';
import { useState, useCallback, useRef } from "react";
import { getImageData, getRandomUnique } from "../../services/fetch";
import { ImageData } from "../../services/interfaces";
import ImgCard from "../ImageCard/ImageCard";
import Observer from '../Observer/Observer';
import Modal from '@/components/Modal/Modal';

interface GalleryGridProps {
  objectIds: number[];
}

const ImageGrid: React.FC<GalleryGridProps> = ({ objectIds }) => {

  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalImage, setModalImage] = useState<ImageData | null>(null);


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

  const seeLarge = (imageId: number) => {
    const image = images.find((img) => img.id === imageId);
    if (!image) return;
    setModalImage(image);
    setOpenModal(true);
}

  return (
    <>
    <div className="main-container">
      <div className="department">
        <p>Current department:</p>
      </div>
      <div className="img-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {images.map((img) => (
          <div key={img.id} className="img-wrap">
            <ImgCard key={img.id} image={img} onToggleFavorite={handleToggleFavorite} seeLarge={seeLarge}/>
          </div>
        ))}
        <Observer onVisible={loadImages} disabled={loading} />
      </div>
    </div>
    <Modal currentImg={modalImage} isOpen={openModal}></Modal>
    </>
  );
};

export default ImageGrid;