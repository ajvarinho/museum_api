'use client'
import { useRef, useState, useEffect } from "react";
import Header from '../../components/Header/Header';
import { ImageData } from '../../services/interfaces';
import collection from './collection.module.css';
import Link from 'next/link';
import Button from '@/components/UI/Button/Button';

const Gallery: React.FC = () => {

  const [loading, setLoading] = useState(false);
  
  const getFavorites = ():ImageData[] => {
    setLoading(true);

    if (typeof window === 'undefined') {
      return []; 
    }

    const savedImg:ImageData[] = [];
    Object.keys(localStorage).forEach((key) => {
      const item: string | null = localStorage.getItem(key);
      if (item) {
        console.log(item);
        savedImg.push(JSON.parse(item));
        setLoading(false);
      }
    });
    return savedImg;
  } 
  
  const [favorites, setFavorites] = useState<ImageData[]>(() => getFavorites());

  const removeFavorite = (imageId: number) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== imageId);
    setFavorites(updatedFavorites);
    localStorage.removeItem(imageId.toString());
};


  return (
    <>
      <Header isLoading={loading}></Header>
      <main>
        <div className={'columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4'}>
            <p className={collection.collection_title}>alo</p>
            {favorites.map((img, index) => (

            <div key={index} className={collection.img_wrap}>   
              <img key={img.id.toString()} src={img.srcSmall} alt={img.title}/>
              <Link href={`/gallery/edit/${img.id}`}>
                <Button name="edit" onClick={()=>{}}>Edit</Button>
              </Link>
              <Button name="remove from favorites" onClick={()=>removeFavorite(img.id)}>Remove from favorites</Button>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Gallery;