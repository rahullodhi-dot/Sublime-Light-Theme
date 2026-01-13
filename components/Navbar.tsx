import React, { useState, useEffect, useRef } from 'react';
import { Search, ShoppingBag, Heart, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import DarkLogo from "../assest/Dark-Logo.png"

const LinkWithHover: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => {
  const lineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLAnchorElement>(null);

  const handleMouseEnter = () => {
    if (lineRef.current) {
      gsap.fromTo(lineRef.current, 
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.6, ease: "power3.out" }
      );
    }
    if (textRef.current) {
        gsap.to(textRef.current, { y: -2, duration: 0.4, ease: "power2.out" });
    }
  };

  const handleMouseLeave = () => {
    if (lineRef.current) {
      gsap.to(lineRef.current, { 
        scaleX: 0, 
        transformOrigin: "right center", 
        duration: 0.4, 
        ease: "power3.in" 
      });
    }
    if (textRef.current) {
        gsap.to(textRef.current, { y: 0, duration: 0.4, ease: "power2.out" });
    }
  };

  return (
    <Link 
      ref={textRef}
      to={to} 
      className="relative block py-1"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="relative z-10">{children}</span>
      <div 
        ref={lineRef} 
        className="absolute bottom-0 left-0 w-full h-[0.5px] bg-gold scale-x-0 origin-left"
      />
    </Link>
  );
};

export const Navbar: React.FC = () => {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  // Check if we are on a page that needs better contrast (like Collections)
  const isLightPage = pathname.includes('collections');

  useEffect(() => {
    const handleScroll = () => {
        const isScrolled = window.scrollY > 50;
        setScrolled(isScrolled);
        
        // On light pages, we maintain a background, but adjust opacity on scroll
        // On home page, we start transparent
        
        const baseBg = isLightPage ? 'rgba(5, 10, 6, 0.95)' : 'transparent';
        const scrolledBg = 'rgba(5, 10, 6, 0.90)';
        
        const targetBg = (isLightPage || isScrolled) ? scrolledBg : baseBg;
        const targetBackdrop = (isLightPage || isScrolled) ? 'blur(16px)' : 'blur(0px)';
        const targetBorder = (isLightPage || isScrolled) ? 'rgba(255, 255, 255, 0.03)' : 'transparent';
        const targetPadding = isScrolled ? '1.25rem' : '2rem'; // More breathing room

        if (navRef.current) {
            gsap.to(navRef.current, {
                paddingTop: targetPadding,
                paddingBottom: targetPadding,
                backgroundColor: targetBg,
                backdropFilter: targetBackdrop,
                borderColor: targetBorder,
                duration: 0.6,
                ease: "power3.out"
            });
        }
    };

  
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname, isLightPage]);

  return (
    <nav 
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 transition-all border-b border-transparent py-8"
    >
      <div className="max-w-[1180px] mx-auto px-6 lg:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="font-serif h-[80px] text-3xl lg:text-4xl text-ivory font-bold tracking-tight relative group">
          {/* Sublime<span className="text-gold transition-colors duration-500 group-hover:text-white">.</span> */}
          <img src={DarkLogo} alt="" className='h-full' />
        </Link>

        {/* Center Links (Desktop) */}
        <div className="hidden lg:flex items-center gap-4 font-sans text-xs uppercase tracking-[0.25em] text-ivory/90 font-medium">
          <LinkWithHover to="/">Loose-Tea</LinkWithHover>
          <LinkWithHover to="/collections">Honey</LinkWithHover>
          <LinkWithHover to="#">Spices</LinkWithHover>
          <LinkWithHover to="#">Dry-Fruits</LinkWithHover>
          <LinkWithHover to="#">Gifting</LinkWithHover>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-8 text-ivory">
          <div className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-500 ${scrolled || isLightPage ? 'bg-white/5 border-white/10' : 'bg-transparent border-white/20'}`}>
            <Search className="w-4 h-4 opacity-60" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent border-none outline-none text-xs w-20 lg:w-28 placeholder:text-ivory/40 text-ivory uppercase tracking-widest font-light"
            />
          </div>
          <button className="relative group p-1">
            <Heart className="w-5 h-5 group-hover:text-gold transition-colors duration-300 stroke-[1.5]" />
          </button>
          <button className="relative group p-1">
             <ShoppingBag className="w-5 h-5 group-hover:text-gold transition-colors duration-300 stroke-[1.5]" />
             <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-gold text-forest text-[9px] font-bold flex items-center justify-center rounded-full scale-0 group-hover:scale-100 transition-transform duration-300">2</span>
          </button>
          <button className="lg:hidden p-2">
            <Menu className="w-6 h-6 stroke-[1.5]" />
          </button>
        </div>
      </div>
    </nav>
  );
};