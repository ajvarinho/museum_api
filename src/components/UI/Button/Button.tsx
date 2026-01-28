// components/Button/Button.tsx
import { ReactNode } from 'react';
import btn from './Button.module.css';

interface ButtonProps {
  name: string;
  icon?: ReactNode;
  onClick: () => void;
  className?: string;
  iconPosition?: 'left' | 'right';
}

export default function Button({ 
  name, 
  icon, 
  onClick, 
  className = '',
}: ButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`btn ${className}`}
    >
      <span className="btn-text">{name}</span>
      {icon && (
        <span className="btn-icon">{icon}</span>
      )}
    </button>
  );
}