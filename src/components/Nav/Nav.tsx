import './Nav.css';
import Link from 'next/link';

interface HeaderProps {
    isLoading: boolean;
}


const Nav: React.FC<HeaderProps> = ({ isLoading }) => {
    return(
        <nav className={'title' + (isLoading ? '' : ' loaded')}>
            <Link href="/">MAIN</Link>
            <Link href="/gallery">MY GALLERY</Link>
        </nav>
    )
}

export default Nav;