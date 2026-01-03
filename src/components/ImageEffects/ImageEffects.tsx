import { useRef, useEffect } from "react";
import { ImageEffectsProps, EffectType } from '@/services/interfaces';

interface ImageEffectsPropsExtended extends ImageEffectsProps {
  onApplyEffect: (base64: string) => void; // ← Add this callback
}


export default function ImageEffects({
  base64, dimensions, effect, onEffectChange, onApplyEffect 
}: ImageEffectsPropsExtended) {

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

  //
const applyEffectToCanvas = async () => {
    if (!svgRef.current) return;

    const svgString = (new XMLSerializer()).serializeToString(svgRef.current);
	console.log('svgString', svgString)
    const svgBlob = new Blob([svgString], {
    type: 'image/svg+xml;charset=utf-8'
  });

  const DOMURL = window.URL || window.webkitURL || window;
  const url = DOMURL.createObjectURL(svgBlob);

    const img = new Image();
	img.crossOrigin = "anonymous";
	img.src = url;
    img.onload = () => {
      console.log('img onload fn')
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = dimensions.x;
      tempCanvas.height = dimensions.y;
      const ctx = tempCanvas.getContext('2d');
      
      if (!ctx) return;
      
      ctx.drawImage(img, 0, 0, dimensions.x, dimensions.y);

      const newBase64 = tempCanvas.toDataURL('image/png');
      onApplyEffect(newBase64);
      URL.revokeObjectURL(url);
    };
    
    img.src = url;
  };

  //
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
				<image
					href={base64}
					width={dimensions.x}
					height={dimensions.y}
					filter={effect !== 'none' ? `url(#${effect})` : undefined}
				/>
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
            {effect !== 'none' && (
              <button onClick={applyEffectToCanvas}>save changes</button>
            )}
        </div>
        
        <svg className="svg-wrapper" width={dimensions.x} height={dimensions.y} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1">
            <image href={img} className="img" x="0" y="0" height="100%" width="100%" filter={effect !== 'none' ? `url(#${effect})` : undefined} />
        </svg>
        <p>{effect}</p>
    </div>
  );
}