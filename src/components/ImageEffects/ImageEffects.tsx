import { useRef, useEffect } from "react";
import { ImageEffectsProps, EffectType } from '@/services/interfaces';


export default function ImageEffects({
  base64, dimensions, effect, onEffectChange
}: ImageEffectsProps) {

    const img = base64;

    const svgRef = useRef<SVGSVGElement>(null);

      console.log('ImageEffects render - effect:', effect);
    
    useEffect(() => {
      if (!svgRef.current) return;
      console.log('selected effect:', effect);
    

  }, [effect, base64]);

  const handleEffectSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newEffect = e.target.value as EffectType;
    onEffectChange(newEffect);
  };


  return (
    <div className="effects-wrap">
        <div style={{ height: 0 }}>
            <svg ref={svgRef}>
                <defs>
                    {/* <filter id="noise-basic" x="0%" y="0%" width="100%" height="100%">
                        <feTurbulence baseFrequency="0.001 0.24" result="NOISE" numOctaves="8" />
                        <feDisplacementMap in="SourceGraphic" in2="NOISE" scale="10" xChannelSelector="R" yChannelSelector="R"></feDisplacementMap>
                    </filter> */}
                     {/* SVG filters will go here */}
                    {effect === 'grayscale' && (
                      <filter id="grayscale">
                        <feColorMatrix type="saturate" values="0"/>
                      </filter>
                    )}
                    
                    {effect === 'turbulence' && (
                      <filter id="turbulence">
                        <feTurbulence 
                          type="turbulence" 
                          baseFrequency="0.05" 
                          numOctaves="2"
                        />
                        <feDisplacementMap in="SourceGraphic" scale="20"/>
                      </filter>
                    )}
                    
                    {effect === 'blur' && (
                      <filter id="blur">
                        <feGaussianBlur stdDeviation="5"/>
                      </filter>
                    )}
                    
                    {effect === 'saturate' && (
                      <filter id="saturate">
                        <feColorMatrix type="saturate" values="2"/>
                      </filter>
                    )}
                </defs>

            </svg>
        </div>

        <div className="select-wrap">
        <label>Choose Effect:</label>
          <select value={effect} onChange={handleEffectSelect}>
            <option value="none">Select effect</option>
            <option value="grayscale">Grayscale</option>
            <option value="turbulence">Turbulence</option>
            <option value="blur">Blur</option>
            <option value="saturate">Saturate</option>
          </select>
        </div>
        
        <svg className="svg-wrapper" width={dimensions.x} height={dimensions.y} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1">
            <image href={img} className="img" x="0" y="0" height="100%" width="100%" filter={effect !== 'none' ? `url(#${effect})` : undefined} />
        </svg>
        <p>{effect}</p>
    </div>
  );
}