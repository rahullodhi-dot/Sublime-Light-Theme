import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Product, Category } from '../types';
import { Plus } from 'lucide-react';
import { ImageWithLoader } from './ImageWithLoader';
import { TiltCard } from './TiltCard';
import { SectionDivider } from './SectionDivider';
import MelloMango from "../assest/MellowMango (1).png"
import Strawberry from "../assest/StrawBerry (1).png"
import RoeinBloom from "../assest/RoseinBloom.png"
import FlowerFette from "../assest/Flowerfete.png"
import Honey1 from "../assest/Honey (1).png"
import BerryHoney from "../assest/BerryHoney (1).png"
import Cumin from "../assest/Cumin (1).png"
import Cardamom from "../assest/Cardamom (1).png"
import Mustard from "../assest/Mustard (1).png"
import Walnuts from "../assest/Walnuts.png"
import Raisins from "../assest/Raisins.png"
import BlackPepper from "../assest/BlackPepper.png"
import MultiFloral from "../assest/MultiFloral.png"
import round1 from "../assest/roound1.png"

const CATEGORIES: Category[] = [
  { id: 'all', label: 'All Blend' },
  { id: 'Loose-Tea', label: 'Loose Tea' },
  { id: 'Honey', label: 'Honey' },
  { id: 'Dry-Fruits', label: 'Dry Fruits' },
  { id: 'Spices', label: 'Spices' },

];

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Walnut Kernels',
    category: 'Dry-Fruits',
    price: 100,
    weight: '100g',
    rating: 4.8,
    image: Walnuts,
    description: 'Walnut Kernels top the list of Superfoods essential for your overall health.',
    tags: ['Organic']
  },
  {
    id: 20,
    name: 'Raisins',
    category: 'Dry-Fruits',
    price: 105,
    weight: '100g',
    rating: 4.8,
    image: Raisins,
    description: 'High on nutrients and calories, Raisins are dried grapes that, in medieval times were very popular in Greek and Rome.',
    tags: ['Bestseller']
  },
  {
    id: 8,
    name: 'Mellow Mango Tea',
    category: 'Loose-Tea',
    price: 800,
    weight: '100g',
    rating: 4.8,
    image: MelloMango,
    description: 'The taste of summer is just a brew away with Sublime’s Mellow Mango Tea.',
    tags: ['Bestseller']
  },

  {
    id: 9,
    name: 'Strawberry Tea',
    category: 'Loose-Tea',
    price: 800,
    weight: '100g',
    rating: 4.8,
    image: Strawberry,
    description: 'A refreshing zero-caffeine blend with chunks of dried strawberries.',
    tags: ['Limited Edition']
  },
  {
    id: 16,
    name: 'Rosein Bloom',
    category: 'Loose-Tea',
    price: 725,
    weight: '75g',
    rating: 4.9,
    image: RoeinBloom,
    description: 'Witnessing a blooming rose brings an instant smile on your face.',
    tags: ['Limited Edition']
  },
  {
    id: 2,
    name: 'Flower Fette',
    category: 'Loose-Tea',
    price: 945,
    weight: '75g',
    rating: 4.9,
    image: FlowerFette,
    description: 'A unique Signature Blend with finest spring flowers for a flavour-filled tea experience.',
    tags: ['Bestseller']
  },

  {
    id: 11,
    name: 'Berry Honey',
    category: 'Honey',
    price: 490,
    weight: '250g',
    rating: 4.6,
    image: BerryHoney,
    description: 'Berry Honey is collected from the nectar of the flowers of wild berries, bringing you the goodness of fresh wild berries and the qualities of Honey.',
    tags: ['Breakfast']
  },
  {
    id: 12,
    name: 'Micro Filtered Honey',
    category: 'Honey',
    price: 540,
    weight: '250g',
    rating: 4.6,
    image: Honey1,
    description: 'Do you prefer your Honey filtered? Don’t worry, Sublime’s Micro-Filtered Honey is perfect for you.',
    tags: ['Breakfast']
  },
  {
    id: 32,
    name: 'Multi Floral Honey',
    category: 'Honey',
    price: 440,
    weight: '250g',
    rating: 4.6,
    image: MultiFloral,
    description: 'Extracted in the deep forests of the Kashmiri floral valleys, Multi-Floral Honey is a unique, tasteful and healthy honey collected by the Apis mellifera species of bees.',
    tags: ['Breakfast']
  },
  {
    id: 217,
    name: 'Cumin Seeds',
    category: 'Spices',
    price: 16.00,
    weight: '100g',
    rating: 4.9,
    image: Cumin,
    description: 'Citrusy bergamot meets soothing lavender.',
    tags: ['Signature Blend']
  },
  {
    id: 29,
    name: 'Mustard Seeds',
    category: 'Spices',
    price: 55,
    weight: '100g',
    rating: 4.9,
    image: Mustard,
    description: 'Mustard seeds are one of the most versatile and essential kitchen spices used to season Indian food.',
    tags: ['Signature Blend']
  },
  {
    id: 17,
    name: 'Cardamom Pods',
    category: 'Spices',
    price: 200,
    weight: '100g',
    rating: 4.9,
    image: Cardamom,
    description: 'The aromatic and strong-flavoured indigenous spice - The Green Cardamom or elaichi is a staple in many recipes of the Indian Cuisine.',
    tags: ['Signature Blend']
  },
  {
    id: 22,
    name: 'Black Peppercorns',
    category: 'Spices',
    price: 110,
    weight: '100g',
    rating: 4.9,
    image: BlackPepper,
    description: 'From the South Indian rasam to the North Indian curry, Black Pepper (Kali Mirch) is a staple in kitchens around the globe.',
    tags: ['Signature Blend']
  },

];

const renderLetters = (text: string, className: string = "") => {
  return text.split('').map((char, index) => (
    <span key={index} className={`inline-block ${className}`}>
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));
};

const ProductCard: React.FC<{ product: Product; index: number }> = ({ product, index }) => {
  return (
    <TiltCard className="product-card group relative bg-[#FDFCF8] hover:bg-white transition-colors duration-700 cursor-pointer border border-stone/30 h-full flex flex-col shadow-sm hover:shadow-luxury">
      <div className="absolute inset-0 shadow-subtle opacity-0 group-hover:opacity-100 group-hover:shadow-luxury transition-all duration-700 rounded-lg pointer-events-none"></div>

      <div className="p-5 flex flex-col h-full relative z-10">

        {/* Aspect Ratio Changed to Square (aspect-square) */}
        <div
          className="relative aspect-square overflow-hidden mb-8 bg-[#F5F5F0] rounded-sm"
          style={{ transform: 'translateZ(10px)' }}
        >
          <ImageWithLoader
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.2,1,0.3,1)] group-hover:scale-105"
            containerClassName="w-full h-full"
          />

          <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
            {product.tags.map(tag => (
              <span key={tag} className="text-[9px] uppercase tracking-[0.2em] text-forest/80 font-bold bg-white/95 backdrop-blur px-3 py-1.5 shadow-sm border border-stone/20 font-serif">{tag}</span>
            ))}
          </div>

          <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-20 delay-100">
            <button className="w-12 h-12 bg-forest text-white flex items-center justify-center hover:bg-forest-dark hover:text-gold transition-colors shadow-lg rounded-full">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-grow flex flex-col items-center text-center px-2" style={{ transform: 'translateZ(20px)' }}>
          <h3 className="font-gotham text-xs lg:text-xl text-forest mb-2 leading-tight group-hover:text-gold-dim transition-colors duration-500 text-balance">{product.name}</h3>

          <p className="text-sm text-earth/70 font-gotham font-light leading-relaxed mb-2 line-clamp-2 max-w-[90%] min-h-[2.5rem]">{product.description}</p>

          <div className="mt-auto pt-4 border-t border-stone/20 w-full flex justify-center">
            <p className="font-gotham text-sm tracking-[0.15em] font-bold text-forest group-hover:text-gold transition-colors duration-300"> &#8377;{product.price.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </TiltCard>
  );
};

// Refined Luxury Motif (Top-Left)
const LuxuryMotif = ({ className }: { className?: string }) => (
  <svg className={`absolute pointer-events-none opacity-[0.06] text-gold z-0 border ${className}`} width="450" height="150" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.8">
    <circle cx="100" cy="100" r="90" strokeDasharray="4 4" opacity="0.5" />
    <circle cx="100" cy="100" r="70" opacity="0.3" />

    {/* Geometric Compass/Star shape */}
    <path d="M100 10 L110 90 L190 100 L110 110 L100 190 L90 110 L10 100 L90 90 Z" fill="currentColor" fillOpacity="0.05" />
    <path d="M100 30 L105 95 L170 100 L105 105 L100 170 L95 105 L30 100 L95 95 Z" strokeWidth="0.5" />

    {/* Decorative Dots */}
    <circle cx="100" cy="10" r="2" fill="currentColor" />
    <circle cx="190" cy="100" r="2" fill="currentColor" />
    <circle cx="100" cy="190" r="2" fill="currentColor" />
    <circle cx="10" cy="100" r="2" fill="currentColor" />
  </svg>
);


export const ProductGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  const filteredProducts = activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);

useEffect(() => {
  const ctx = gsap.context(() => {

    /* ================= HEADER TEXT (SOFT + EARLY) ================= */
    const textTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",   // 👈 pehle hi start
        toggleActions: "play none none none",
      },
    });

    textTl.fromTo(
      ".gallery-char",
      {
        y: 36,
        opacity: 0,
        rotateX: 12,
        transformOrigin: "50% 100%",
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1.15,
        stagger: 0.028,
        ease: "expo.out", // 👈 luxury ease
      }
    );

    textTl.fromTo(
      descRef.current,
      {
        y: 22,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
      },
      "-=0.65"
    );

    /* ================= CARDS (TRUE INTERSECTION REVEAL) ================= */
    const cards = gsap.utils.toArray<HTMLElement>(".product-card");

    cards.forEach((card) => {
      const img = card.querySelector("img");

      // Initial state
      gsap.set(card, {
        opacity: 0,
        y: 70,
        scale: 0.96,
        clipPath: "inset(0 0 100% 0)",
        
      });

      gsap.set(img, {
        scale: 1.15, // 👈 cinematic zoom start
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      /* Card shell reveal */
      tl.to(card, {
        opacity: 1,
        y: 0,
        scale: 1,
        clipPath: "inset(0 0 0% 0)",
        filter: "blur(0px)",
        duration: 1.1,
        ease: "power3.out",
      });

      /* Image luxury ease-out zoom */
      tl.to(
        img,
        {
          scale: 1,
          duration: 1.8,
          ease: "expo.out",
        },
        0
      );
    });

  }, containerRef);

  return () => ctx.revert();
}, [filteredProducts]);




  console.log("Filtered Products:", filteredProducts);

  return (
    <section ref={containerRef} className="py-12   bg-gradient-luxury relative overflow-hidden">
      <div style={{
        animation: "spinSlowReverse 26s linear infinite",
      }}
        className='absolute -right-[14%] -top-8   opacity-20 w-96 h-96 pointer-events-none'>
        <img src={round1} alt="" className='h-full w-full block animate-spin-slow' />
      </div>
      <div style={{
        animation: "spinSlowReverse 26s linear infinite",
      }}
        className='absolute -left-[14%] -top-6   animate-spin-slow opacity-20 w-96 h-96 pointer-events-none'>
        <img src={round1} alt="" className='h-full w-full block' />
      </div>

      {/* Decorative Accents - Updated with New Luxury Motif */}
      <LuxuryMotif className="-top-60 -left-40" />
      <LuxuryMotif className="-bottom-40 -right-40 rotate-180" />

      <div className="max-w-[1180px] mx-auto px-6 lg:px-12 relative z-10">
        <div ref={headerRef} className="mb-6 text-center justify-start  flex flex-col items-center relative">
          {/* Subtle Gold Frame around header area */}
          <div className="absolute top-30 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[150%] rounded-[4rem] pointer-events-none -z-10"></div>

          <span className="text-gold  uppercase tracking-[0.25em] text-sm font-bold font-gotham block bg-gradient-luxury mb-6 px-4 relative z-10">Our Offerings</span>

          <div className="m-3 ">
            <h2 className="font-serif text-5xl lg:text-[3rem] text-forest block tracking-tight leading-none text-balance">
              {renderLetters("Curated Collections", "gallery-char font-buttain")}
            </h2>

          </div>
          <SectionDivider variant="ornate" />
          <p ref={descRef} className="text-earth/80  flex justify-center items-center  text-lg font-gotham leading-relaxed max-w-2xl mx-auto text-balance">
            Discover our selection of artisanal teas, handpicked from the finest estates to ensure an exquisite brewing experience.
          </p>
        </div>

        <div className="flex   flex-wrap justify-center gap-10 mb-4 border-b border-stone/20 pb-12 relative">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-gold rotate-45 -translate-y-4"></div>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative pb-2 text-lg uppercase tracking-[0.2em] transition-all duration-500 group overflow-hidden font-gotham font-bold ${activeCategory === cat.id
                ? 'text-forest'
                : 'text-earth/50 hover:text-forest'
                }`}
            >
              <span className="relative z-10 font-gotham text-xs">{cat.label}</span>
              <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-gold transition-transform duration-500 origin-left ${activeCategory === cat.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'
                }`}></span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 perspective-[2000px]">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};