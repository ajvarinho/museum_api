'use client';
import { useState, ReactNode } from "react";
import flyout from './Flyout.module.css';
import Button from '@/components/UI/Button/Button';
import { SvgIcon } from '@/components/UI/Icons/SvgIcon';

interface FlyoutProps {
  children: ReactNode;
  trigger?: ReactNode; 
  position?: 'left' | 'right' | 'top' | 'bottom';
  title?: string;
}

export default function Flyout({ 
  children, 
  trigger,
  position = 'right',
  title 
}: FlyoutProps) {

  const [isOpen, setIsOpen] = useState(false);
  const toggleFlyout = () => setIsOpen(!isOpen);
  const closeFlyout = () => setIsOpen(false);

  return (
    <div className={flyout.wrap}>

      <div className={flyout.flyout_container}>
      <Button 
        name="edit menu"
        className={flyout.flyout_trigger} 
        onClick={toggleFlyout}
        aria-label="Toggle flyout"
      >
        {trigger || (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        )}
      </Button>

      <div 
        className={`${flyout.flyout_panel} ${flyout[`flyout_${position}`]} ${isOpen ? flyout.open : ''}`}
      >
        <div className={flyout.flyout_header}>
          {title && <h2 className={flyout.flyout_title}>{title}</h2>}
          <Button 
            name='close menu'
            className={flyout.flyout_close} 
            onClick={closeFlyout}
            aria-label="Close flyout"
          >
            <SvgIcon name='close'/>
          </Button>
        </div>
        
        <div className={flyout.flyout_content}>
          {children}
        </div>
      </div>
    </div>
    </div>
  );
};
