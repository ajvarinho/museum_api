import imageCard from './ImageCard.module.css';
import { useState } from "react";
import { ImgCardProps } from '../../services/interfaces';
import { SvgIcon } from '@/components/UI/Icons/SvgIcon';

const ImgCard: React.FC<ImgCardProps> = ({ image, onToggleFavorite, seeLarge }) => {

  const [overlay, setOverlay] = useState(false);

  // open / close info overlay
  const openInfo = () => {
    setOverlay(true);
    console.log('lo overlay')
  };

  const closeInfo = () => {
    setOverlay(false);
  };

  //modal - see large
  function handleClick() {
    seeLarge(image.id);
  }

  return (
    <div className={`${imageCard.img_card} flex flex-column`}>

        <div className={imageCard.filter_wrap}>
          <button className={imageCard.filter}>{image.department}</button>
        </div>

        {overlay && 
        <div className={imageCard.info_overlay}>
          <div className={imageCard.close_wrap}>
            <button onClick={closeInfo}>
              <SvgIcon name={'close'}/>  
            </button>  
          </div>
          <div className={imageCard.overlay_wrap}>
            <h3 className={imageCard.overlay_title}>{image.fullTitle}</h3>
            <p>Author: {image.author || 'Unknown'}</p>
            <p>Date: {image.date}</p>  
            <p>Medium: {image.medium}</p>
            <p>Department: {image.department}</p>
          </div>
        </div>}

        <figure className={imageCard.figure}>
            <img
            loading="lazy"
            id={image.id ? image.id.toString():'no-image-found'}
            className={imageCard.img_default}
            src={image.srcSmall} 
            alt={image.author + '' + image.title}
            />
            <figcaption className={imageCard.figcaption}>{image.title}</figcaption>
        </figure>

        <div className={`${imageCard.img_menu} flex flex-row justify-around`}>

            <div className={imageCard.info_wrap}>
              <h4 className={imageCard.info_title}>{image.title}</h4>
              <p>{image.author || 'Unknown author'}</p>
              <p>{image.date}</p>  
            </div>

            <div className={imageCard.btn_wrap}>
              <button className={imageCard.btn} onClick={openInfo}>
                <SvgIcon name={'info'}/>
              </button>
              <button className={imageCard.btn} onClick={() => handleClick()}>
                <SvgIcon name={'seelarge'}/>
              </button>

              <div className={imageCard.btn}>
                <label htmlFor={`save-${image.id}`}>
                  <input
                    id={`save-${image.id}`}
                    type="checkbox"
                    checked={image.favorites}
                    className={imageCard.fav_input}
                    onChange={(e) => onToggleFavorite(image.id, e.target.checked)}
                  />
                  <SvgIcon name={'save'}/>
                </label>
              </div>

            </div>
        </div>
    </div>
  );
}

export default ImgCard;