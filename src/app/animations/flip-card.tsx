'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Position {
  x: number;
  y: number;
}

interface FlipCardProps {
  /** Conteúdo renderizado na frente do card */
  front: React.ReactNode;
  /** Conteúdo renderizado no verso do card */
  back: React.ReactNode;
  /** Classes CSS adicionais */
  className?: string;
  /** Cor do efeito spotlight (opcional) */
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`;
  /** Callback quando hover muda */
  onHover?: (isHovered: boolean) => void;
  /** Altura do card */
  height?: number | string;
  /** Largura do card */
  width?: number | string;
}

const FlipCard: React.FC<FlipCardProps> = ({
  front,
  back,
  className = '',
  spotlightColor = 'rgba(255, 255, 255, 0.25)',
  onHover,
  height = 320,
  width = '100%',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [spotlightOpacity, setSpotlightOpacity] = useState(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detecta se é um dispositivo touch
  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        'ontouchstart' in window ||
          navigator.maxTouchPoints > 0 ||
          window.matchMedia('(pointer: coarse)').matches
      );
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  // Intersection Observer para flip no scroll (apenas mobile)
  useEffect(() => {
    if (!isTouchDevice || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Flip quando o card está visível no centro da tela
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            setIsFlipped(true);
            setSpotlightOpacity(0.6);
            onHover?.(true);
          } else {
            setIsFlipped(false);
            setSpotlightOpacity(0);
            onHover?.(false);
          }
        });
      },
      {
        threshold: [0, 0.3, 0.6, 1],
        rootMargin: '-20% 0px -20% 0px', // Ativa quando está mais centralizado na tela
      }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [isTouchDevice, onHover]);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!containerRef.current || isTouchDevice) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    if (isTouchDevice) return;
    setIsFlipped(true);
    setSpotlightOpacity(0.6);
    onHover?.(true);
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;
    setIsFlipped(false);
    setSpotlightOpacity(0);
    onHover?.(false);
  };

  const handleFocus = () => {
    if (isTouchDevice) return;
    setIsFlipped(true);
    setSpotlightOpacity(0.6);
    onHover?.(true);
  };

  const handleBlur = () => {
    if (isTouchDevice) return;
    setIsFlipped(false);
    setSpotlightOpacity(0);
    onHover?.(false);
  };

  const heightStyle = typeof height === 'number' ? `${height}px` : height;
  const widthStyle = typeof width === 'number' ? `${width}px` : width;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={isTouchDevice ? undefined : 0}
      className={`flip-card-container outline-none ${className}`}
      style={{
        width: widthStyle,
        height: heightStyle,
        perspective: '1000px',
      }}
    >
      <div
        className='flip-card-inner'
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Face Frontal */}
        <div
          className='flip-card-front'
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            borderRadius: '1.5rem',
            border: '2px solid #0B0F12',
            overflow: 'hidden',
            boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
          }}
        >
          <div className='flex h-full w-full flex-col justify-center items-center p-6'>
            {front}
          </div>
          {/* Spotlight effect na frente */}
          <div
            className='pointer-events-none absolute inset-0 transition-opacity duration-500'
            style={{
              opacity: spotlightOpacity,
              background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 75%)`,
            }}
          />
        </div>

        {/* Face Traseira */}
        <div
          className='flip-card-back'
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            borderRadius: '1.5rem',
            border: '2px solid #0B0F12',
            overflow: 'hidden',
            boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
          }}
        >
          <div className='flex h-full w-full flex-col justify-center items-center p-6'>
            {back}
          </div>
          {/* Spotlight effect no verso */}
          <div
            className='pointer-events-none absolute inset-0 transition-opacity duration-500'
            style={{
              opacity: spotlightOpacity,
              background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 75%)`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
