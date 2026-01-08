import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { TiltCard } from '../components/TiltCard';
import { ImageWithLoader } from '../components/ImageWithLoader';
import { Button } from '../components/Button';

const COLLECTIONS = [
  {
    id: 1,
    title: "The Royal Edit",
    description: "A selection of our most prestigious teas, reserved for connoisseurs.",
    image: "https://images.unsplash.com/photo-1571934811356-5cc55449d0f1?q=80&w=2070&auto=format&fit=crop",
    count: "12 Blends"
  },
  {
    id: 2,
    title: "Wellness & Herbal",
    description: "Caffeine-free infusions designed to restore balance and calm.",
    image: "https://images.unsplash.com/photo-1515696955266-4f67e13219e8?q=80&w=2038&auto=format&fit=crop",
    count: "8 Blends"
  },
  {
    id: 3,
    title: "Single Estate",
    description: "Pure, unblended teas from the world's renowned gardens.",
    image: "https://images.unsplash.com/photo-1596436579296-6e7e1709428b?q=80&w=2070&auto=format&fit=crop",
    count: "15 Varieties"
  },
  {
    id: 4,
    title: "Gifting Suites",
    description: "Luxuriously packaged sets for the perfect thoughtful gift.",
    image: "https://images.unsplash.com/photo-1629193297598-64e019c00b0f?q=80&w=2070&auto=format&fit=crop",
    count: "10 Sets"
  },
  {
    id: 5,
    title: "Morning Rituals",
    description: "Robust black teas to awaken the senses.",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=1964&auto=format&fit=crop",
    count: "6 Blends"
  },
  {
    id: 6,
    title: "Rare Oolongs",
    description: "Complex, semi-oxidized teas with floral notes.",
    image: "https://images.unsplash.com/photo-1563911302283-d2bc129e7c1f?q=80&w=2070&auto=format&fit=crop",
    count: "4 Varieties"
  }
];

const renderLetters = (text: string, className: string = "") => {
  return text.split('').map((char, index) => (
    <span key={index} className={`inline-block ${className}`}>
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));
};

export const TeaCollections: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
        // Header Reveal
        const tl = gsap.timeline();

        // Reveal auxiliary elements
        tl.fromTo([headerRef.current?.querySelector('.header-line'), headerRef.current?.querySelector('.header-sub')],
            { y: 20, opacity: 0 },
            { 
                y: 0, 
                opacity: 1, 
                duration: 0.8, 
                stagger: 0.1, 
                ease: "power3.out"
            }
        );

        // Title Letters
        tl.fromTo(".page-char", 
            { y: 50, opacity: 0, rotateX: 20 },
            { 
                y: 0, 
                opacity: 1, 
                rotateX: 0,
                duration: 1.2, 
                stagger: 0.04, 
                ease: "power3.out" 
            },
            "-=0.6"
        );

        // Description
        tl.fromTo(headerRef.current?.querySelector('p'),
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
            "-=0.8"
        );

        // Cards Stagger
        const cards = gsap.utils.toArray('.collection-card');
        gsap.fromTo(cards, 
            { y: 80, opacity: 0 },
            { 
                y: 0, 
                opacity: 1, 
                duration: 1.2, 
                stagger: 0.15, 
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                }
            }
        );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-ivory min-h-screen pt-48 pb-32">
        <div className="container mx-auto px-6 lg:px-12">
            
            <div ref={headerRef} className="max-w-4xl mb-32">
                <div className="flex items-center gap-4 mb-8">
                    <div className="header-line w-16 h-[1px] bg-forest"></div>
                    <span className="header-sub text-forest uppercase tracking-[0.25em] text-xs font-bold">Our Catalog</span>
                </div>
                <div className="overflow-hidden mb-6">
                     <h1 className="font-serif text-7xl lg:text-9xl text-forest leading-[0.9] tracking-tight">
                        {renderLetters("The Collections", "page-char")}
                    </h1>
                </div>
                <p className="text-xl lg:text-2xl text-earth/80 font-light leading-relaxed max-w-2xl">
                    Explore our curated categories, each representing a unique journey through terroir, tradition, and taste.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
                {COLLECTIONS.map((item) => (
                    <TiltCard key={item.id} className="collection-card group relative h-[550px] w-full rounded-[2rem] overflow-hidden cursor-pointer shadow-xl">
                        
                        {/* Background Image with Parallax Scale */}
                        <div className="absolute inset-0 z-0 transition-transform duration-[1.5s] group-hover:scale-105 ease-out">
                             <ImageWithLoader 
                                src={item.image} 
                                alt={item.title} 
                                className="w-full h-full object-cover"
                                containerClassName="w-full h-full"
                             />
                             <div className="absolute inset-0 bg-forest/20 group-hover:bg-forest/10 transition-colors duration-500 mix-blend-multiply" />
                             <div className="absolute inset-0 bg-gradient-to-t from-[#050A06] via-transparent to-transparent opacity-90" />
                        </div>

                        {/* Content Layer */}
                        <div className="absolute inset-0 z-10 p-12 flex flex-col justify-end" style={{ transform: 'translateZ(30px)' }}>
                             <div className="transform transition-transform duration-700 group-hover:-translate-y-4">
                                <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] uppercase tracking-[0.2em] mb-8 font-bold">
                                    {item.count}
                                </span>
                                <h3 className="font-serif text-5xl text-white mb-6 shadow-black drop-shadow-lg leading-none">{item.title}</h3>
                                <p className="text-white/80 text-lg font-light max-w-md leading-relaxed mb-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                    {item.description}
                                </p>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                                    <Button variant="outline" className="text-white border-white/40 hover:bg-white hover:text-forest hover:border-white px-8 py-3 text-xs tracking-[0.2em]">
                                        Explore Collection
                                    </Button>
                                </div>
                             </div>
                        </div>

                    </TiltCard>
                ))}
            </div>

        </div>
    </div>
  );
};