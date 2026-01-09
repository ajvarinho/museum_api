'use client';
import { useEffect, useRef } from "react";
import { ScrollObserverProps } from '@/services/interfaces';


const ScrollObserver: React.FC<ScrollObserverProps> = ({
  onVisible,
  disabled = false,
  rootMargin = "100px",
  scrollContainer = null,
}) => {


  const ref = useRef<HTMLDivElement | null>(null);

  const style = {
    width: '3em',
    height: '3em',
    background: 'red',
    flexShrink: 0
  };

  useEffect(() => {
    if (disabled || !ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          onVisible();
        }
      },
      {
        root: scrollContainer,
        rootMargin,
        threshold: 0.1,
      }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [disabled, onVisible, rootMargin]);

  return <div ref={ref} className="" style={style}></div>;
};

export default ScrollObserver;