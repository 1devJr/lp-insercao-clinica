'use client';

import React, { useRef, useState } from 'react';

interface Position {
  x: number;
  y: number;
}

interface SpotlightCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`;
  onHover?: (status: boolean) => void;
  height?: number | string;
  width?: number | string;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  front,
  back,
  className = '',
  spotlightColor = 'rgba(255, 255, 255, 0.25)',
  onHover,
  height = 320,
  width = '100%',
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setOpacity(0.6);
    onHover?.(true);
    setIsFlipped(true);
  };

  const handleBlur = () => {
    setOpacity(0);
    onHover?.(false);
    setIsFlipped(false);
  };

  const handleMouseEnter = () => {
    setOpacity(0.6);
    onHover?.(true);
    setIsFlipped(true);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
    onHover?.(false);
    setIsFlipped(false);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      tabIndex={0}
      data-spotlight-card
      className={`relative outline-none ${className}`}
      style={{
        perspective: '1200px',
        height: typeof height === 'number' ? `${height}px` : height,
        width: typeof width === 'number' ? `${width}px` : width,
      }}
    >
      <div
        className='group relative h-full w-full rounded-3xl border border-white bg-inherit overflow-hidden transition-transform duration-700 ease-out shadow-xl'
        style={{
          transformStyle: 'preserve-3d',
          WebkitTransformStyle: 'preserve-3d',
          transformOrigin: 'center',
          willChange: 'transform',
        }}
      >
        <div
          className='absolute inset-0 flex h-full w-full flex-col justify-center items-center p-6'
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            WebkitTransform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            transition: 'transform 0.7s ease, opacity 0.25s ease',
            opacity: isFlipped ? 0 : 1,
            zIndex: isFlipped ? 1 : 2,
          }}
          aria-hidden={isFlipped}
        >
          {front}
        </div>

        <div
          className='absolute inset-0 flex h-full w-full flex-col justify-center items-center p-6'
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(-180deg)',
            WebkitTransform: isFlipped ? 'rotateY(0deg)' : 'rotateY(-180deg)',
            transition: 'transform 0.7s ease, opacity 0.25s ease',
            opacity: isFlipped ? 1 : 0,
            zIndex: isFlipped ? 2 : 1,
          }}
          aria-hidden={!isFlipped}
        >
          {back}
        </div>

        <div
          className='pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out'
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            opacity,
            background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 75%)`,
          }}
        />
      </div>
    </div>
  );
};

export default SpotlightCard;
