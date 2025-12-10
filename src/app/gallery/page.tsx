'use client'

import { useRef, useState, useEffect } from "react";
//import Image from "next/image";
//import ImgCard from '../../components/img-card/ImgCard';
import Header from '../../components/Header/Header';
import { ImageData } from '../../services/interfaces';

import Link from 'next/link';

const Gallery: React.FC = () => {

  const [favorites, setFavorites] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(false);

  const getFavorites = ():ImageData[] => {
    setLoading(true);
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

//   useEffect(() => {
//     const stored = getFavorites();
//     setFavorites(stored);
//   }, []);


  return (
    <>
      <Header isLoading={loading}></Header>
      <main>
        <div className={'columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 main-container'}>
            <p>alo</p>
            {favorites.map((img, index) => (

            <div key={index} className="img-wrap">   
              <img key={img.id.toString()} src={img.srcSmall} alt={img.title}/>
              <Link href={`/gallery/edit/${img.id}`}>
                <button>Edit</button>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Gallery;