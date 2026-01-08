import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface SectionDividerProps {
  variant?: 'line' | 'botanical' | 'gradient' | 'ornate';
  className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({ variant = 'line', className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
        gsap.fromTo(ref.current, 
            { scaleX: 0.8, opacity: 0 },
            { 
                scaleX: 1, 
                opacity: 1, 
                duration: 2, 
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ref.current,
                    start: "top 90%",
                }
            }
        );
    }, ref);
    return () => ctx.revert();
  }, []);

  if (variant === 'ornate') {
    return (
        <div className={`w-full flex items-center justify-center mb-6 ${className}`}>
             <div ref={ref} className="text-gold opacity-80 flex items-center gap-6">
                <svg width="120" height="40" viewBox="0 0 120 20" fill="none" className="rotate-180">
                    <path d="M120 10C100 10 90 15 70 15C50 15 40 5 20 5C10 5 0 10 0 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                    <circle cx="60" cy="15" r="2" fill="currentColor"/>
                </svg>
                <div className="w-3 h-3 border border-gold rotate-45"></div>
                <svg width="120" height="20" viewBox="0 0 120 20" fill="none">
                    <path d="M0 10C20 10 30 15 50 15C70 15 80 5 100 5C110 5 120 10 120 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                    <circle cx="60" cy="15" r="2" fill="currentColor"/>
                </svg>
             </div>
        </div>
    );
  }

  if (variant === 'botanical') {
    return (
        <div className={`w-full flex items-center bg-[#F4F3EF] justify-center py-16 lg:py-24 ${className}`}>
            <div ref={ref} className="flex items-center gap-6 w-full max-w-md opacity-70">
                <div className="h-[5px] bg-gradient-to-r from-transparent via-gold to-transparent flex-1"></div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gold">
                    <path d="M12 21C12 21 17 16 17 10C17 7 14 3 12 3C10 3 7 7 7 10C7 16 12 21 12 21Z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M12 14V8" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M12 14L9 11" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M12 14L15 11" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                <div className="h-[6px] bg-gradient-to-r from-transparent via-gold to-transparent flex-1"></div>
            </div>
        </div>
    );
  }

  if (variant === 'gradient') {
      return (
        <div className={`w-full flex justify-center py-20 ${className}`}>
             <div ref={ref} className="w-[1px] h-32 bg-gradient-to-b from-transparent via-gold/50 to-transparent"></div>
        </div>
      );
  }

  // Default Line
  return (
    <div className={`w-full px-12 lg:px-24 py-16 opacity-40 ${className}`}>
        <div ref={ref} className="w-full h-[1px] bg-gradient-to-r from-transparent via-stone/60 to-transparent"></div>
    </div>
  );
};