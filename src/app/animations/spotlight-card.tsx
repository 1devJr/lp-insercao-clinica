import React, { useRef, useState } from 'react';

interface Position {
  x: number;
  y: number;
}

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`;
  onHover?: (status: boolean) => void; // Adicionada propriedade para callback de hover
  onBlur?: () => void; // Adicionada propriedade para callback de hover
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(255, 255, 255, 0.25)',
  onHover, // Adicionada propriedade para callback de hover
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState<number>(0);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!divRef.current || isFocused) return;

    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(0.6);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
    if (onHover) onHover(false); // Executa callback de hover
  };

  const handleMouseEnter = () => {
    setOpacity(0.6);
    if (onHover) onHover(true); // Executa callback de hover
  };

  const handleMouseLeave = () => {
    setOpacity(0);
    if (onHover) onHover(false);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-3xl w-96 flex justify-center items-center flex-col  border border-white bg-inherit overflow-hidden   transform transition-transform duration-500 ease-in-out  ${className}`}
    >
      <div
        className='pointer-events-none absolute  inset-0 opacity-0 transition-opacity duration-500 ease-in-out pt-10'
        style={{
          opacity,
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
};

export default SpotlightCard;
