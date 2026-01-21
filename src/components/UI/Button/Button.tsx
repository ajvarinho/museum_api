// components/Button/Button.tsx
import { ReactNode } from 'react';
import btn from './Button.module.css';

interface ButtonProps {
  name: string;
  icon?: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  iconPosition?: 'left' | 'right';
}

export default function Button({ 
  name, 
  icon, 
  onClick, 
  disabled = false,
  className = '',
  iconPosition = 'left'
}: ButtonProps) {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`btn ${className}`}
    >
      {icon && iconPosition === 'left' && (
        <span className="btn-icon">{icon}</span>
      )}
      <span className="btn-text">{name}</span>
      {icon && iconPosition === 'right' && (
        <span className="btn-icon">{icon}</span>
      )}
    </button>
  );
}