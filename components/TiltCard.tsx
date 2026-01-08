import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  scaleOnHover?: number;
}

export const TiltCard: React.FC<TiltCardProps> = ({ 
  children, 
  className = "", 
  scaleOnHover = 1.01, // Reduced for subtlety
  ...props 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Significantly reduced rotation for luxury feel (was 12)
    const xPct = (x / rect.width - 0.5) * 5; 
    const yPct = (y / rect.height - 0.5) * 5;

    gsap.to(cardRef.current, {
      rotationY: xPct,
      rotationX: -yPct,
      duration: 4, // Slower duration for weight
      ease: "power2.out",
      transformPerspective: 1200, // Increased perspective for flatter look
      transformStyle: "preserve-3d",
      stagger:1
    });
  };


  
  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotationY: 0,
      rotationX: 0,
      scale: 1,
      duration: 1.0, // Slower return
      ease: "power3.out" // Smoother ease
    });
  };

  const handleMouseEnter = () => {
    if (!cardRef.current) return;
    if (scaleOnHover !== 1) {
        gsap.to(cardRef.current, {
            scale: scaleOnHover,
            duration: 0.8,
            ease: "power2.out"
        });
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={`will-change-transform ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
      {...props}
    >
      {children}
    </div>
  );
};