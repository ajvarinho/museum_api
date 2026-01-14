'use client';
import '@/components/Modal/Modal.css';
import { ImageData } from "../../services/interfaces";

interface ModalProps {
    currentImg: ImageData | null;
    isOpen: boolean;
}

const Modal: React.FC<ModalProps> = ({ currentImg, isOpen }) => {

  return (
    currentImg && (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-modal">X</button>
                <figure>
                    <img src={currentImg?.srcLarge} alt={currentImg?.title} className="modal-img" />
                    <figcaption>{currentImg?.title}</figcaption>
                </figure>
                <div className="modal-info">
                    <p></p>
                </div>
            </div>
        </div>
    )
  );
};

export default Modal;
