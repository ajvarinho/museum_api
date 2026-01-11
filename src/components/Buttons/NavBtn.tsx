import '@/components/Buttons/Buttons.css';
import { useState } from 'react';

interface NavBtnProps {
    isClicked: boolean;
}

const NavBtn = () => {

    const [opened, setOpened] = useState(false);

    const isClicked = () => {
        setOpened(true);
    }
    return (
        <button className="nav-btn" onClick={isClicked}>nav</button>
    )
}

export default NavBtn;
