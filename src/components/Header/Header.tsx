import './Header.css';
import Link from 'next/link';

interface HeaderProps {
    isLoading: boolean;
}


const Header: React.FC<HeaderProps> = ({ isLoading }) => {
    return(
        <header>
            <h1 className={'title' + (isLoading ? '' : ' loaded')}>
                <Link href="/">MAIN</Link>
            </h1>

            <Link href="/gallery">MY GALLERY</Link>
        </header>
    )
}

export default Header;