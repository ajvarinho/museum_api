import { useRef, useEffect } from "react";
import { ImageEffectsProps, EffectType } from '@/services/interfaces';
import Button from '@/components/UI/Button/Button';

interface ImageEffectsPropsExtended extends ImageEffectsProps {
  onApplyEffect: (base64: string) => void; 
  // savedImg: string;
}

export default function ImageEffects({
  base64, dimensions, effect, onEffectChange, onApplyEffect
}: ImageEffectsPropsExtended) {

    const img = base64;
    console.log('efect component', effect)

    const svgRef = useRef<SVGSVGElement>(null);

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
                  width="0"
                  height="0"
                  filter={effect !== 'none' ? `url(#${effect})` : undefined}
                />

            </svg>
        </div>
        <svg className="svg-wrapper" width={dimensions.x} height={dimensions.y} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1">
            <image href={img} className="img" x="0" y="0" height="100%" width="100%" filter={effect !== 'none' ? `url(#${effect})` : undefined} />
        </svg>
        <p>{effect}</p>
    </div>
  );
}