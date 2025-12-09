
interface LoadingProps {
    isLoading: boolean;
}


const Loading: React.FC<LoadingProps> = ({ isLoading }) => {
    // accept message - loaded

    return(
        <div className={'loading-wrap' + (isLoading ? '' : ' loaded')}>
            <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
                <line x1="0" y1="80" x2="100" y2="20" stroke="black" />
                <polyline className="polyline top" d="M100 100 A 88 202 0 0 1 200 100" stroke="rebeccapurple" strokeWidth="3"></polyline>
            </svg>
        </div>
    )
}

export default Loading;