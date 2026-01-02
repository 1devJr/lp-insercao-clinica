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
  /** Cor de fundo do card */
  backgroundColor?: string;
  /** Cor da borda do card */
  borderColor?: string;
  /** Espessura da borda do card */
  borderWidth?: number;
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
  backgroundColor = '#FCF8F0',
  borderColor = '#2f261f',
  borderWidth = 1,
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

  // Scroll listener para flip baseado na posição vertical (mobile com cards empilhados)
  useEffect(() => {
    if (!isTouchDevice || !containerRef.current) return;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const screenHeight = window.innerHeight;
      const screenWidth = window.innerWidth;

      // Verifica se é layout mobile (largura < 768px) - cards empilhados verticalmente
      const isMobileLayout = screenWidth < 768;

      if (isMobileLayout) {
        // Mobile: flip baseado na posição vertical (top do card)
        const topEdgePercent = rect.top / screenHeight;

        // Flip quando o topo do card está a 15% do topo da viewport
        if (topEdgePercent <= 0.15 && topEdgePercent > -0.5) {
          setIsFlipped(true);
          setSpotlightOpacity(0.6);
          onHover?.(true);
        } else if (topEdgePercent > 0.2) {
          // Desvira quando o topo está a mais de 20% da tela
          setIsFlipped(false);
          setSpotlightOpacity(0);
          onHover?.(false);
        }
      } else {
        // Desktop/Tablet: flip baseado na posição horizontal (carrossel)
        const leftEdgePercent = rect.left / screenWidth;

        if (leftEdgePercent <= 0.2) {
          setIsFlipped(true);
          setSpotlightOpacity(0.6);
          onHover?.(true);
        } else if (leftEdgePercent > 0.15) {
          setIsFlipped(false);
          setSpotlightOpacity(0);
          onHover?.(false);
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
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

  // Handler para click/tap - funciona em todos os dispositivos
  const handleClick = () => {
    setIsFlipped((prev) => !prev);
    setSpotlightOpacity((prev) => (prev === 0 ? 0.6 : 0));
    onHover?.(!isFlipped);
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
      onClick={handleClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={isTouchDevice ? undefined : 0}
      className={`flip-card-container outline-none cursor-pointer ${className}`}
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
            border: `${borderWidth}px solid ${borderColor}`,
            overflow: 'hidden',
            boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
            backgroundColor,
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
            border: `${borderWidth}px solid ${borderColor}`,
            overflow: 'hidden',
            boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
            backgroundColor,
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
