'use client';
import imageGrid from '@/components/ImageGrid/ImageGrid.module.css';
import { useState, useCallback, useRef, useEffect } from "react";
import { getImageData, getRandomUnique } from "../../services/fetch";
import { ImageData } from "../../services/interfaces";
import { useImagesContext } from '@/app/provider/ImageProvider';
import ImgCard from "../ImageCard/ImageCard";
import Observer from '../Observer/Observer';
import Modal from '@/components/Modal/Modal';
import Button from '@/components/UI/Button/Button';

interface GalleryGridProps {
  objectIds: number[];
  department: string;
}

const ImageGrid: React.FC<GalleryGridProps> = ({ objectIds, department }) => {
  const { images, setImages } = useImagesContext();
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalImage, setModalImage] = useState<ImageData | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [filter, setFilter] = useState<string>('All');


  // useEffect(() => {
  //   if (containerRef.current && scrollPosition > 0) {
  //     containerRef.current.scrollTop = scrollPosition;
  //   }
  // }, [scrollPosition]);

  const loadImages = useCallback(async () => {
    if (objectIds.length === 0 || loading) return;
    setLoading(true);
    const randomIds = getRandomUnique(objectIds, 12);
    const results = await Promise.all(randomIds.map(getImageData));
    const validImages = results.filter(
      (img): img is ImageData => img !== null
    );
    setImages((prev) => [...prev, ...validImages]);
    setLoading(false);
  }, [objectIds, loading, setImages]);


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

  //kad sam ovo zvao, repainta cijelu komponentu
  // ne treba se desavati na scrollu
  // const scrollFn = () => {
  //   if (!containerRef.current) return;
  //   const scrollVal = Math.floor(containerRef.current.scrollTop);
  //   setScrollPosition(scrollVal); 
  // }

  const filterResults = (department:string)=>{
    setFilter(department);
  }

  const filteredImages = filter === 'All' 
  ? images 
  : images.filter(img => img.department === filter);

  return (
    <>
    <div id="test-wrap" className={imageGrid.main_container} ref={containerRef}>
      <div className={imageGrid.department}>
        <p>Current department: {filter}</p>
          {filter !== 'All' && (
            <Button 
              name="reset-filter" 
              onClick={() => setFilter('All')}
              className="reset rounded"
            >
              ✕ Clear filter
            </Button>
          )}
      </div>
      <div className={`${imageGrid.img_container} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4`}>
        {filteredImages.map((img) => (
          <div key={img.id} className={imageGrid.img_wrap}>
            {/* za potpuno reusable komponente (cisti UI) postoji iduci pristup:
            - odvojiti jednu kompjentu koja u sebi samo renderira sliku (iskljucivo kao UI), i tu
            komponentu davati po potrebi:
            - npr modal - dobije <ImgHandler></ImgHandler>
            - npr ImageWrap(komponenta unutar imgGrid)
            - ImageWrap moze izgledati ovako:
            <imgHandler onClick, onLarge, onFavorite>
              <ImgUI>
              <Button>
              </Button>
            </imgHandler>
            ili
            <Modal open/close>
              <ImgUI>
              </Modal> */}
            <ImgCard key={img.id} image={img} onToggleFavorite={handleToggleFavorite} seeLarge={seeLarge} onFilterClick={filterResults}/>
          </div>
        ))}
        <Observer onVisible={loadImages} disabled={loading} scrollContainer={containerRef}/>
      </div>
    </div>
    <Modal currentImg={modalImage} isOpen={openModal} onClose={() => setOpenModal(false)}>
      
    </Modal>
    </>
  );
};

export default ImageGrid;