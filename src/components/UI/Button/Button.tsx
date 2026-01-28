// components/Button/Button.tsx
import { ReactNode } from 'react';
import btn from './Button.module.css';

interface ButtonProps {
  name: string;
  icon?: ReactNode;
  children: ReactNode;
  onClick: () => void;
  className?: string;
  iconPosition?: 'left' | 'right';
}

export default function Button({ 
  name, 
  children,
  onClick, 
  className = '',
}: ButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`${btn.btn} ${className}`}
    >
      {children || name}
    </button>
  );
}