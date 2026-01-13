import Image from "next/image";
import './ImageCard.css';
import info from '../../../public/icons/info.svg';
import { useRef, useState, useEffect } from "react";
import { ImgCardProps } from '../../services/interfaces';

const FAVOURITES_STORE_KEY = 'favorite_images';

const ImgCard: React.FC<ImgCardProps> = ({ image, onToggleFavorite }) => {

  const [favorite, setFavorite] = useState([]);
  const [overlay, setOverlay] = useState(false);
  const [large, setLarge] = useState(false);

  const [active, setActive] = useState(false);

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

  const activeCard = ()=> {
    setActive(true);
  }

  return (
    <div className="img-card flex flex-column">

        <div className="filter-wrap">
          <button className="filter">{image.department}</button>
        </div>

        {overlay && 
        <div className="info-overlay">
          <div className="close-wrap">
            <button onClick={closeInfo}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="24" width="24" viewBox="0 0 24 24">
                <line x1="0" x2="24" y1="0" y2="24" stroke="white" strokeLinecap="round" strokeWidth="2"/>
                <line x1="24" x2="0" y1="0" y2="24" stroke="white" strokeLinecap="round" strokeWidth="2"/>
              </svg>  
            </button>  
          </div>
          <div className="overlay-wrap">
            <h3 className="overlay-title">{image.title}</h3>
            <p>Author: {image.author || 'Unknown'}</p>
            <p>Date: {image.date}</p>  
            <p>Medium: {image.medium}</p>
            <p>Department: {image.department}</p>
          </div>
        </div>}

        {large && 
          <div className="modal-overlay large">
            <button onClick={closeLarge}>X</button>
            <div className="modal-content">
              <img
              loading="lazy"
              id={image.id ? image.id.toString():'no-image-found'}
              className="img-default"
              src={image.srcLarge} 
              alt={image.author + '' + image.title}
              />
            </div>
          </div>
        }

        <figure>
            <img
            loading="lazy"
            id={image.id ? image.id.toString():'no-image-found'}
            className="img-default"
            src={image.srcSmall} 
            alt={image.author + '' + image.title}
            />
            <figcaption className="text-center">{image.title}</figcaption>
        </figure>

        <div className="img-menu flex flex-row justify-around">

            <div className="info-wrap">
              <h4 className="info-title">{image.title}</h4>
              <p>{image.author || 'Unknown author'}</p>
              <p>{image.date}</p>  
            </div>

            <div className="btn-wrap">
              <button className="info btn" onClick={openInfo}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle cx="13" cy="12" r="10" stroke="black" fill="transparent" strokeWidth="2"/>
                  <circle cx="13" cy="7" r="1" stroke="black" fill="black" strokeWidth="1"/>
                  <line x1="13" x2="13" y1="12" y2="18" stroke="black" strokeLinecap="round" strokeWidth="2"/>
                </svg>
              </button>
              <button className="large btn" onClick={openLarge}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="">
                  <line x1="0" x2="24" y1="0" y2="24" stroke="black" strokeLinecap="round" strokeWidth="1.5"/>
                  <line x1="24" x2="0" y1="0" y2="24" stroke="black" strokeLinecap="round" strokeWidth="1.5"/>
                  <polyline className="save" points="0,9 0,0 9,0" strokeLinecap="round" strokeWidth="2" stroke="black" />
                  <polyline className="save" points="15,0 24,0 24,9" strokeLinecap="round" strokeWidth="2" stroke="black" />
                  <polyline className="save" points="0,15 0,24 9,24" strokeLinecap="round" strokeWidth="2" stroke="black" />
                  <polyline className="save" points="15,24 24,24 24,15" strokeLinecap="round" strokeWidth="2" stroke="black" />
                </svg>
              </button>

              <div className="fav-wrap btn">
                <label htmlFor={`save-${image.id}`}>
                  <input
                    id={`save-${image.id}`}
                    type="checkbox"
                    checked={image.favorites}
                    className="fav-input"
                    onChange={(e) => onToggleFavorite(image.id, e.target.checked)}
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <polyline className="save" points="0,0 0,24 12,20 24,24 24,0 0,0" strokeWidth="2" stroke="black" />
                  </svg>
                </label>
              </div>

            </div>



        </div>
    </div>
  );
}

export default ImgCard;