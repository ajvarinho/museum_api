'use client'
import { useRef, useState, useEffect } from "react";
import Nav from '@/components/Nav/Nav';
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

  useEffect(() => {
    const stored = getFavorites();
    setFavorites(stored);
  }, []);


  return (
    <>
      <main>
        <div className={'columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4'}>
            <p>alo</p>
            {favorites.map((img, index) => (
              
              <div key={index} className="img-wrap">   
              <img key={img.id.toString()} src={img.srcSmall} alt={img.title}/>
              <Link href={`/gallery/edit/${img.id}`}>
                <button className="btn">Edit</button>
              </Link>
              <button className="btn">Remove from favorites</button>
            </div>
          ))}
        </div>
        <Nav isLoading={loading}></Nav>
      </main>
    </>
  );
};

export default Gallery;