import '@/components/Loading/Loading.css';
interface LoadingProps {
    isLoading: boolean;
}


const Loading: React.FC<LoadingProps> = ({ isLoading }) => {
    // accept message - loaded

    return(
        <div className={'loading-wrap' + (isLoading ? '' : ' loaded')}>
            <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
                <line x1="0" y1="80" x2="100" y2="20" stroke="black" />
                <path d="M 70 60 C 70 80, 110 80, 110 60" stroke="black" fill="transparent" />
            </svg>
        </div>
    )
}

export default Loading;