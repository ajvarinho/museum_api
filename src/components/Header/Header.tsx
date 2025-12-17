import './Header.css';
import Link from 'next/link';

interface HeaderProps {
    isLoading: boolean;
}


const Header: React.FC<HeaderProps> = ({ isLoading }) => {
    return(
        <header className={'title' + (isLoading ? '' : ' loaded')}>
            <Link href="/">MAIN</Link>
            <Link href="/gallery">MY GALLERY</Link>
        </header>
    )
}

export default Header;