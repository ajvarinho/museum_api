'use client';
import { useState, useCallback, useRef, useEffect } from "react";
import { createPortal } from 'react-dom';
import '@/components/Modal/Modal.css';
import { ImageData } from "../../services/interfaces";

interface ModalProps {
    currentImg: ImageData | null;
    isOpen: boolean;
    onClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({ currentImg, isOpen, onClose }) => {

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
        console.log('esc', e.key)
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
        <div className="modal">
            <div className="modal-wrap">
                <button className="close-modal" onClick={onClose}>X</button>
                <div className="scroll-wrap">
                    <figure className="modal-figure">
                        <img src={currentImg?.srcLarge} alt={currentImg?.title} className="modal-img" />
                        <figcaption className="caption">{currentImg?.title}</figcaption>
                    </figure>
                </div>
                <div className="modal-info">
                    <p></p>
                </div>
            </div>
        </div>
  )

  return createPortal(modalContent, document.body);

};

export default Modal;
