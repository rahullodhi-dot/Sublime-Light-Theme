


import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import { ImageWithLoader } from './ImageWithLoader';
import WhiteTea from "../assest/WhiteTea.png";
import GreenTea from "../assest/GreenTea.png";
import BlackTea from "../assest/BlackTea.png";
// import OolongTea from "../assest/OolongTea.png";
import HerbalTea from "../assest/HerbalTea.png";


const TEA_TYPES = [
  {
    id: 'green',
    label: 'Green Tea',
    origin: 'Shizuoka, Japan',
    desc: 'A refreshing infusion of tender green leaves, celebrated for its purity, balance, and gentle vitality.',
    image: GreenTea
  },
  {
    id: 'black',
    label: 'Black Tea',
    origin: 'Assam, India',
    desc: 'A bold and full-bodied brew with deep character, offering richness, warmth, and timeless depth.',
    image: BlackTea
  },
  {
    id: 'white',
    label: 'White Tea',
    origin: 'Fujian, China',
    desc: 'A soothing blend of natural herbs and flowers, crafted for calm moments and mindful indulgence.',
    image: WhiteTea
  },
  {
    id: 'herbal',
    label: 'Herbal Tisanes',
    origin: 'Global Blend',
    desc: 'The most delicate of teas, lightly brewed from young buds for a soft, refined, and elegant taste.',
    image: HerbalTea
  }
];

const renderLetters = (text: string, className: string = "") => {
  return text.split('').map((char, index) => (
    <span key={index} className={`inline-block ${className}`}>
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));
};

const BotanicalBg = () => (
    <svg className="absolute -left-32 top-10 w-[800px] h-[800px] text-forest/10 pointer-events-none opacity-80 z-0" viewBox="0 0 500 500" fill="none">
        <path d="M100,500 Q150,300 300,250 T450,50" stroke="currentColor" strokeWidth="1.5" fill="none" className="botanical-path"/>
        <path d="M300,250 Q350,200 450,220" stroke="currentColor" strokeWidth="1.2" fill="none" className="botanical-path"/>
        <path d="M300,250 Q250,200 250,100" stroke="currentColor" strokeWidth="1.2" fill="none" className="botanical-path"/>
    </svg>
);

export const StorySection: React.FC = () => {
  const [activeTeaIndex, setactiveTeaIndex] = useState(0)
  const [activeTea, setActiveTea] = useState(TEA_TYPES[activeTeaIndex]);
  const prevActiveTeaRef = useRef(TEA_TYPES[0]);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const originRef = useRef<HTMLDivElement>(null);
  
  // Array of refs for the cards
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  // Refs for entrance animations
  const labelRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Handle Tea Selection
 const handleTeaSelect = (tea: typeof TEA_TYPES[0]) => {
  const index = TEA_TYPES.findIndex(t => t.id === tea.id)
  if (index === activeTeaIndex) return

  setactiveTeaIndex(index)
  setActiveTea(tea)
}


  // Effect to animate cards stack when activeTea changes
  // useEffect(() => {
  //   const ctx = gsap.context(() => {
  //       const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

  //       // Animate Description Text
  //       tl.fromTo(descRef.current, 
  //           { opacity: 0, y: 10 }, 
  //           { opacity: 1, y: 0, duration: 0.8 },
  //           0
  //       );

  //       // Animate Origin Box Content (Pop effect)
  //       tl.fromTo(originRef.current,
  //           { scale: 0.95, opacity: 0.8 },
  //           { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
  //           0
  //       );

  //       // Card Swap Logic
  //       const incomingId = activeTea.id;
  //       const outgoingId = prevActiveTeaRef.current.id;

  //       TEA_TYPES.forEach((tea, i) => {
  //           const card = cardsRef.current[i];
  //           if (!card) return;

  //           const isIncoming = tea.id === incomingId;
  //           const isOutgoing = tea.id === outgoingId;

  //           // Calculate Stack Position (Messy Deck Look)
  //           const offset = i - 2; 
  //           const stackX = offset * 15; 
  //           const stackY = -10 + (Math.abs(offset) * 4);
  //           const stackRot = offset * 3;

  //           if (isIncoming) {
  //               // INCOMING CARD: Enters from stack to front
  //               tl.to(card, {
  //                   zIndex: 20, // Move to front layer
  //                   x: 0,
  //                   y: 0,
  //                   rotation: 0,
  //                   scale: 1,
  //                   opacity: 1,
  //                   filter: 'grayscale(0%)',
  //                   duration: 1.1,
  //               }, 0);

  //           } else if (isOutgoing) {
  //               // OUTGOING CARD: Lifts and Slides away, then tucks back
                
  //               // Step 1: Slide Out (Lift)
  //               tl.to(card, {
  //                   zIndex: 25, // Briefly stays on top while leaving
  //                   x: 120,     // Slide right
  //                   y: 40,      // Slide down slightly
  //                   rotation: 8,
  //                   scale: 1.05,
  //                   opacity: 1,
  //                   duration: 0.7,
  //                   ease: "power2.inOut"
  //               }, 0);

  //               // Step 2: Tuck Back into Stack
  //               tl.to(card, {
  //                   zIndex: i + 1, // Return to natural z-index
  //                   x: stackX,
  //                   y: stackY,
  //                   rotation: stackRot,
  //                   scale: 0.92,
  //                   opacity: 0.6,
  //                   filter: 'grayscale(40%)',
  //                   duration: 0.8,
  //                   ease: "power2.out"
  //               }, 0.6); // Overlap start of tuck with end of slide

  //           } else {
  //               // PASSIVE CARDS: Subtle shuffle to maintain stack visual
  //               tl.to(card, {
  //                   x: stackX,
  //                   y: stackY,
  //                   rotation: stackRot,
  //                   scale: 0.92,
  //                   opacity: 0.6,
  //                   zIndex: i + 1,
  //                   filter: 'grayscale(40%)',
  //                   duration: 0.8,
  //               }, 0);
  //           }
  //       });

  //   }, containerRef);
  //   return () => ctx.revert();
  // }, [activeTea,activeTeaIndex]);


useEffect(() => {
  const ctx = gsap.context(() => {
    const total = TEA_TYPES.length

    TEA_TYPES.forEach((_, i) => {
      const card = cardsRef.current[i]
      if (!card) return

      // 🔥 KILL anything already running on this card
      gsap.killTweensOf(card)

      const offset = (i - activeTeaIndex + total) % total

      /* ================= ACTIVE CARD ================= */
      if (offset === 0) {
        gsap.to(card, {
          zIndex: 50,
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0,
          opacity: 1,
          filter: "grayscale(0%) blur(0px)",
          boxShadow: "0 60px 140px rgba(0,0,0,0.25)",
          duration: 1.2,
          ease: "expo.out",
          overwrite: "auto",
        })
      }

      /* ================= PREVIOUS CARD ================= */
      else if (offset === 1) {
        gsap.to(card, {
          zIndex: 40,
          x: 56,
          y: -44,
          scale: 0.88,
          rotation: 8,
          opacity: 0.55,
          filter: "grayscale(65%) blur(0.6px)",
          duration: 1.1,
          ease: "expo.out",
          overwrite: "auto",
        })
      }

      /* ================= STACK ================= */
      else {
        gsap.to(card, {
          zIndex: 30 - offset,
          x: offset * 22,
          y: offset * -18,
          scale: 1 - offset * 0.065,
          rotation: offset * 2.5,
          opacity: 0.45,
          filter: "grayscale(75%) blur(0.8px)",
          duration: 1,
          ease: "expo.out",
          overwrite: "auto",
        })
      }
    })

    /* ================= TEXT (NO JERK) ================= */
    gsap.fromTo(
      descRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.6, ease: "expo.out", overwrite: "auto" }
    )

    gsap.fromTo(
      originRef.current,
      { opacity: 0, y: 16, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "expo.out", overwrite: "auto" }
    )

  }, containerRef)

  return () => ctx.revert()
}, [activeTeaIndex])





useEffect(() => {
  const ctx = gsap.context(() => {
    cardsRef.current.forEach(card => {
      if (!card) return
      const img = card.querySelector("img")

      if (!img) return

      gsap.to(img, {
        scale: 1.08,
        y: "-6%",
        duration: 6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      })
    })
  }, containerRef)

  return () => ctx.revert()
}, [])


useEffect(() => {
  const ctx = gsap.context(() => {
    cardsRef.current.forEach(card => {
      if (!card) return

      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          scale: 1.02,
          rotation: 0,
          duration: 0.4,
          ease: "power2.out"
        })
      })

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          scale: 1,
          duration: 0.4,
          ease: "power2.out"
        })
      })
    })
  }, containerRef)

  return () => ctx.revert()
}, [])



useEffect(() => {
  const ctx = gsap.context(() => {

    const chars = gsap.utils.toArray<HTMLElement>(".story-char")

    gsap.set(chars, {
      opacity: 0,
      y: 60,
      filter: "blur(6px)",
    })

    gsap.set(descRef.current, {
      opacity: 0,
      y: 30,
    })

    gsap.set(originRef.current, {
      opacity: 0,
      y: 40,
      scale: 0.96,
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        end: "top 20%",
        scrub: 1.2,
      },
    })

    /* ================= HEADING CHARS ================= */
    tl.to(chars, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      stagger: {
        each: 0.04,
        from: "start",
      },
      ease: "power3.out",
    })

    /* ================= DESCRIPTION ================= */
    tl.to(
      descRef.current,
      {
        opacity: 1,
        y: 0,
        ease: "power3.out",
      },
      "-=0.4"
    )

    /* ================= ORIGIN BOX ================= */
    tl.to(
      originRef.current,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        ease: "expo.out",
      },
      "-=0.3"
    )

  }, containerRef)

  return () => ctx.revert()
}, [])


  return (
    <section ref={containerRef} className="min-h-screen flex items-center bg-[#F4F3EF] relative overflow-hidden py-12 lg:py-0">
      <div ref={bgRef} className="absolute inset-0 pointer-events-none">
         <div className="absolute top-[-20%] right-[-10%] w-[1000px] h-[1000px] bg-stone/60 rounded-full blur-[150px] mix-blend-multiply opacity-50"></div>
         <BotanicalBg />
      </div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-center h-full">
          
          {/* LEFT PANEL: Selector - Order 1 on Mobile */}
          <div className="lg:col-span-5 flex flex-col justify-center order-1 lg:order-1">
            <div className="mb-10">
                <div ref={labelRef} className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-[1px] bg-gold"></div>
                    <span className="text-gold uppercase tracking-[0.25em] text-lg font-bold font-serif">Explore Our Range </span>
                </div>
                
                <div ref={headerRef} className="mb-8">
                    <h2 className="font-serif text-5xl lg:text-[4rem] text-forest leading-[1] tracking-tight mb-0">
                       <span className="block whitespace-nowrap">{renderLetters("Our Tea Types", "story-char")}</span>
                    </h2>
                </div>
                
                {/* Dynamic Description */}
                <p ref={descRef} className="text-earth text-lg leading-relaxed font-serif pl-1 border-l-2 border-transparent h-24 text-balance">
                   {activeTea.desc}
                </p>
            </div>

            {/* Tea Type List */}
            <div className="flex flex-col gap-2 relative z-20">
              {TEA_TYPES.map((tea) => (
                <button 
                    key={tea.id} 
                    onMouseEnter={() => handleTeaSelect(tea)}
                    className={`tea-list-item group  flex items-center justify-between w-full text-left py-4 border-b border-forest/10 transition-all duration-300 ${activeTea.id === tea.id ? 'pl-4 border-gold/40' : 'hover:pl-2'}`}
                >
                    <span className={`font-serif text-2xl transition-colors duration-300 ${activeTea.id === tea.id ? 'text-forest font-medium' : 'text-forest/40 group-hover:text-forest/70'}`}>
                        {tea.label}
                    </span>
                    
                    <span className={`transition-all duration-500 ${activeTea.id === tea.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                        <ArrowRight className="w-5 h-5 text-gold" />
                    </span>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT PANEL: Card Stack - Order 2 on Mobile */}
          <div className="lg:col-span-7 relative w-full aspect-[4/5] lg:h-[80vh] lg:w-auto lg:aspect-[3/4] mx-auto order-2 lg:order-2 flex items-center justify-center perspective-[2000px]">
             
             {/* Decorative Frame Behind Stack */}
             <div className="absolute inset-4 lg:inset-8 border border-gold/10 rounded-t-[10rem] rounded-b-[2rem] translate-x-4 translate-y-4 z-0 pointer-events-none"></div>
             
             {/* STACK CONTAINER */}
             <div className="relative w-full h-full max-w-md lg:max-w-lg">
                 {TEA_TYPES.map((tea, index) => (
                     <div
                        key={tea.id}
                        ref={(el) => { cardsRef.current[index] = el; }}
                        onClick={() => handleTeaSelect(tea)}
                        className="absolute inset-0 w-full h-full rounded-t-[16rem] rounded-b-[1.5rem] overflow-hidden shadow-2xl bg-[#F4F3EF] border border-white/20 origin-bottom cursor-pointer transition-shadow duration-500 hover:shadow-luxury"
                        style={{
                            // Initial z-index setup for static rendering
                            zIndex: index,
                            transform: `scale(0.9) translateY(0px)`,
                        }}
                     >
                        <ImageWithLoader 
                            src={tea.image} 
                            alt={tea.label} 
                            className="w-full h-full object-cover"
                            containerClassName="w-full h-full"
                        />
                        <div className="absolute inset-0 bg-forest/10 mix-blend-multiply pointer-events-none"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-forest/40 via-transparent to-transparent opacity-60 pointer-events-none"></div>
                     </div>
                 ))}
             </div>
             
             {/* Origin Detail Box - Floating on top of stack */}
             <div 
                ref={originRef}
                className="absolute bottom-12 -left-4 lg:-left-12 bg-[#FDFCF8] px-8 py-6 max-w-[280px] shadow-luxury border border-stone/40 z-[100] rounded-sm"
             >
                <span className="text-[10px] uppercase tracking-widest text-gold font-bold font-serif block mb-2">Origin</span>
                <p className="font-serif italic text-2xl text-forest leading-snug">{activeTea.origin}</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};