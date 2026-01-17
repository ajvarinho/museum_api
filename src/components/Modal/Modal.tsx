'use client';
import { useState, useCallback, useRef, useEffect } from "react";
import { createPortal } from 'react-dom';
import modal from '@/components/Modal/Modal.module.css';
import { ImageData } from "../../services/interfaces";

interface ModalProps {
    currentImg: ImageData | null;
    isOpen: boolean;
    onClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({ currentImg, isOpen, onClose }) => {

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; 
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalContent = (
        <div className={modal.modal}>
            <div className={modal.modal_wrap}>
                <button className={modal.close_modal} onClick={onClose}>X</button>
                <div className={modal.scroll_wrap}>
                    <figure className={modal.modal_figure}>
                        <img src={currentImg?.srcLarge} alt={currentImg?.fullTitle} className={modal.modal_img} />
                        <figcaption className={modal.caption}>{currentImg?.fullTitle}</figcaption>
                    </figure>
                </div>
                <div className={modal.modal_info}>
                    <p></p>
                </div>
            </div>
        </div>
  )

  return createPortal(modalContent, document.body);

};

export default Modal;
