

export default function SVGFilters() {
    // accept message - loaded

    return(
        <div>
            <svg>
                <filter id="noise" x="0%" y="0%" width="100%" height="100%">
                    <feTurbulence baseFrequency="0.01 0.24" result="NOISE" numOctaves="8" />
                    <feDisplacementMap in="SourceGraphic" in2="NOISE" scale="10" xChannelSelector="R" yChannelSelector="R"></feDisplacementMap>
                </filter>
            </svg>
        </div>
    )
}
