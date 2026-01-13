import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  withIcon?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  withIcon = false, 
  className = '', 
  ...props 
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const bloomRef = useRef<HTMLDivElement>(null);

  const baseStyles = "inline-flex items-center justify-center px-10 py-5 transition-colors duration-500 font-sans tracking-[0.2em] text-[10px] uppercase font-bold rounded-full group relative overflow-hidden";
  
  const variants = {
    primary: "bg-forest text-white shadow-xl shadow-forest/10 font-gotham border border-transparent",
    outline: "border border-forest/20 text-forest font-gotham hover:border-forest/60 bg-transparent",
    ghost: "text-forest  hover:bg-sage-light font-gotham"
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || !textRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Button moves towards cursor (Magnetic)
    gsap.to(buttonRef.current, {
      x: x * 0.2,
      y: y * 0.2,
      duration: 0.8,
      ease: 'power3.out'
    });

    // Text moves slightly less (Parallax)
    gsap.to(textRef.current, {
      x: x * 0.1,
      y: y * 0.1,
      duration: 0.8,
      ease: 'power3.out'
    });

    // Bloom follows cursor
    if (bloomRef.current) {
        gsap.to(bloomRef.current, {
            x: x,
            y: y,
            duration: 0.4,
            ease: 'power2.out'
        });
    }
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current || !textRef.current) return;
    
    gsap.to([buttonRef.current, textRef.current], {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: 'elastic.out(1, 0.4)'
    });
    
    gsap.to(buttonRef.current, {
       boxShadow: variant === 'primary' ? '0 15px 30px -5px rgba(44, 62, 45, 0.1)' : 'none',
       duration: 0.5
    });
  };
  
  const handleMouseEnter = () => {
     gsap.to(buttonRef.current, {
         scale: 1.05,
         boxShadow: variant === 'primary' ? '0 20px 40px -5px rgba(44, 62, 45, 0.2)' : 'none',
         duration: 0.5,
         ease: 'power3.out'
     });
  };

  return (
    <button 
      ref={buttonRef}
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* Bloom Effect for Primary */}
      {variant === 'primary' && (
        <div 
            ref={bloomRef}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/20 blur-[30px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
        />
      )}

      <span ref={textRef} className="relative z-10 font-gotham text-xs  flex items-center gap-3 pointer-events-none">
        {children}
        {withIcon && (
          <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </span>
    </button>
  );
};   