import './Header.css';
import Link from 'next/link';

interface HeaderProps {
    isLoading: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLoading }) => {
    return(
        <header className={'title' + (isLoading ? '' : ' loaded')}>
            <Link href="/">HOME</Link>
            <Link href="/gallery">MY COLLECTION</Link>
        </header>
    )
}

export default Header;