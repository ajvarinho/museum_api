import '@/components/Buttons/Buttons.css';
import { ButtonProps } from "../../services/interfaces";

const Button = ({ 
  children, 
  onClick, 
  className = '', 
}: ButtonProps) => {

    const baseClass = `btn ${className}`;

    return (
        <button onClick={onClick} className={baseClass}>{children}</button>
    )
}

export default Button;
