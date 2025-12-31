import { useRef, useEffect } from "react";
import { ImageEffectsProps } from '@/services/interfaces';

export default function ImageEffects({
  base64, dimensions, effect
}: ImageEffectsProps) {

    const img = base64;

    const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    
    console.log('selected effect:', effect);

  }, [effect, base64]);

      console.log('selected effect2:', effect);


  return (
    <div className="effects-wrap">
        <div style={{ height: 0 }}>
            <svg ref={svgRef}>
                <defs>
                    <filter id="noise-basic" x="0%" y="0%" width="100%" height="100%">
                        <feTurbulence baseFrequency="0.001 0.24" result="NOISE" numOctaves="8" />
                        <feDisplacementMap in="SourceGraphic" in2="NOISE" scale="10" xChannelSelector="R" yChannelSelector="R"></feDisplacementMap>
                    </filter>
                </defs>

            </svg>
        </div>
        <svg className="svg-wrapper" width={dimensions.x} height={dimensions.y} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1">
            <image href={img} className="img" x="0" y="0" height="100%" width="100%" filter='url(#noise-basic)' />
        </svg>
    </div>
  );
}