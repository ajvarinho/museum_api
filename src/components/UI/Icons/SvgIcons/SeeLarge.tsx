export const SeeLarge: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="">
        <line x1="0" x2="24" y1="0" y2="24" stroke="black" strokeLinecap="round" strokeWidth="1.5"/>
        <line x1="24" x2="0" y1="0" y2="24" stroke="black" strokeLinecap="round" strokeWidth="1.5"/>
        <polyline className="save" points="0,9 0,0 9,0" strokeLinecap="round" strokeWidth="2" stroke="black" />
        <polyline className="save" points="15,0 24,0 24,9" strokeLinecap="round" strokeWidth="2" stroke="black" />
        <polyline className="save" points="0,15 0,24 9,24" strokeLinecap="round" strokeWidth="2" stroke="black" />
        <polyline className="save" points="15,24 24,24 24,15" strokeLinecap="round" strokeWidth="2" stroke="black" />
    </svg>
);