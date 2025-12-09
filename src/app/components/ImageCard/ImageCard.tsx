import Image from "next/image";
import './ImageCard.css';
import { useRef, useState, useEffect } from "react";
import { ImgCardProps } from '../../services/interfaces';

const FAVOURITES_STORE_KEY = 'favorite_images';

const ImgCard: React.FC<ImgCardProps> = ({ image, onToggleFavorite }) => {

  const [favorite, setFavorite] = useState([]);
  const [overlay, setOverlay] = useState(false);
  const [large, setLarge] = useState(false);

  //
  const [checked, setChecked] = useState(false);

  // open / close info overlay

  const openInfo = () => {
    setOverlay(true);
    console.log('lo overlay')
  };

  const closeInfo = () => {
    setOverlay(false);
  };

    const openLarge = () => {
    setLarge(true);
  };

  const closeLarge = () => {
    setLarge(false);
  };

  
  // add to favorites
//   const handleToggleFavorite = (id: number, checked: boolean) => {
//     setImages((prev) =>
//       prev.map((img) =>
//         img.id === id ? { ...img, favorites: checked } : img
//       )
//     );

//     // find the image object
//     const image = images.find((img) => img.id === id);
//     if (!image) return;

//     if (checked) {
//       localStorage.setItem(id.toString(), JSON.stringify(image));
//     } else {
//       localStorage.removeItem(id.toString());
//     }
//   };

  return (
    <div className="img-card flex flex-column gap-4">

        {overlay && 
        <div className="overlay">
          <button onClick={closeInfo}>X</button>  
          <p>{image.title}</p>
          <p>{image.author}</p>        
        </div>}

        {/* {large && 
        <div className="large">
          <button onClick={closeLarge}>X</button>
            <img
            id={image.id}
            className="img-default"
            src={image.srcLarge} 
            alt={image.author + '' + image.title}
            /> 
          <p>{image.title}</p>
          <p>{image.author}</p>        
        </div>} */}

        <figure>
            <img
            loading="lazy"
            //@ts-ignore
            id={image.id}
            className="img-default"
            src={image.srcSmall} 
            alt={image.author + '' + image.title}
            />
            <figcaption className="text-center">{image.title}</figcaption>
        </figure>

        <div className="img-menu flex flex-row justify-around">
            <button className="info btn" onClick={openInfo}>Info</button>
            <button className="large btn" onClick={openLarge}>See large</button>
            <div className="fav-wrap btn">
              <label htmlFor="save">
                Add to favorites
                <input
                  type="checkbox"
                  checked={image.favorites}
                  onChange={(e) => onToggleFavorite(image.id, e.target.checked)}
                />
              </label>
            </div>
        </div>
    </div>
  );
}

export default ImgCard;