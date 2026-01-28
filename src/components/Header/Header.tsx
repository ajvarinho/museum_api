import './Header.css';
import Link from 'next/link';

interface HeaderProps {
    isLoading: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLoading }) => {
    return(
        <header className={'title' + (isLoading ? '' : ' loaded')}>
            <Link href="/">Main Page</Link>
            <Link href="/gallery">My Collection</Link>
        </header>
    )
}

export default Header;