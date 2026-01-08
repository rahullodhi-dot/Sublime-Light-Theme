// import React, { useEffect, useRef } from 'react';
// import gsap from 'gsap';
// import { Sprout, Filter, Package, Coffee } from 'lucide-react';
// import { TiltCard } from './TiltCard';
// import hanging from "../assest/hanging.png";
// import soul from "../assest/soul.gif"
// import influencer from "../assest/influencer.gif"
// import farmer from "../assest/farmer.gif"
// import fresh from "../assest/fresh.gif"
// const STEPS = [
//   {
//     icon: Sprout,
//     title: "Wellness Enhancing",
//     desc: "A lifestyle designed to elevate your body, mind, and spirit."
//   },
//   {
//     icon: Filter,
//     title: "Direct from Growers",
//     desc: "From the hands that harvest to yours-pure, authentic, and direct."
//   },
//   {
//     icon: Package,
//     title: "Sourced Fresh in Small Batches",
//     desc: "Crafted in small batches to ensure unmatched freshness and quality."
//   },
//   {
//     icon: Coffee,
//     title: "Proudly Women Led",
//     desc: "Proudly a women-led brand, built on passion, purpose, and perseverance."
//   },
// ];

// const ROMAN_NUMERALS = ["I", "II", "III", "IV"];

// const renderLetters = (text: string, className: string = "") => {
//   return text.split('').map((char, index) => (
//     <span key={index} className={`inline-block ${className}`}>
//       {char === ' ' ? '\u00A0' : char}
//     </span>
//   ));
// };

// const StepCard: React.FC<{ step: typeof STEPS[0]; index: number }> = ({ step, index }) => {
//   return (
//     <div
//       className="step-card group cursor-pointer transition-all duration-500 flex flex-col items-center text-center px-4 py-8 relative z-10 opacity-0 hover:scale-[1.05] "
//     >
//       <div className="w-full flex   flex-col items-center mb-10" style={{ transform: 'translateZ(10px)' }}>
//         <span className="font-serif text-gold text-xl tracking-widest italic opacity-0 step-numeral"></span>
//       </div>

//       <div className="relative mb-10  hover:shadow-[0_0_20px_rgba(200,169,126,0.5),0_0_40px_rgba(200,169,126,0.5),0_0_60px_rgba(200,169,126,0.5)] rounded-full  hover:scale-110 transition-all duration-500 ">
//         {/* Icon Wrapper Circle */}
//         <div className="step-icon-wrapper   w-32 h-32 rounded-full border border-stone/60 flex items-center justify-center relative z-[50] bg-[#FDFCF8] shadow-sm transition-all duration-500 origin-center">
//           {/* Icon SVG - Stroke animation target */}
//           <span
//             className="absolute z-[-1]  inset-0 rounded-full bg-white hover:bg-red-500 opacity-20 scale-75 group-hover:scale-110 group-hover:opacity-0 transition-all duration-[900ms] ease-out"
//           ></span>
//           <step.icon className="step-icon w-16 h-16 text-gold hover-bg-red-600" strokeWidth={1.2} />
//         </div>

//         {/* Bloom Effect Ring */}
//         <div className="absolute inset-0 -m-3 border border-dotted border-gold/40 rounded-full opacity-0 step-bloom">


//         </div>

//       </div>

//       <div className="step-text-content opacity-0">
//         <h3 className="font-serif text-4xl text-forest mb-4 group-hover:text-gold-dim transition-colors duration-500">{step.title}</h3>
//         <p className="text-earth/70 text-lg leading-relaxed font-serif max-w-[240px] mx-auto text-balance">{step.desc}</p>
//       </div>
//     </div>
//   );
// };

// export const ProcessSection: React.FC = () => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const pathRef = useRef<SVGPathElement>(null);
//   const headerRef = useRef<HTMLDivElement>(null);
//   const labelRef = useRef<HTMLSpanElement>(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {

//       const cards = gsap.utils.toArray<HTMLElement>(".step-card");

//       /* ================= INITIAL STATES ================= */
//       gsap.set(cards, {
//         opacity: 0,
//         y: 80,
//       });

//       gsap.set(".step-icon-wrapper", {
//         opacity: 0,
//       });

//       gsap.set(".step-text-content, .step-numeral", {
//         opacity: 0,
//         y: 14,
//       });

//       /* ================= CONNECTING LINE ================= */
//       if (pathRef.current) {
//         const len = pathRef.current.getTotalLength();
//         gsap.set(pathRef.current, {
//           strokeDasharray: "6,6",
//           strokeDashoffset: len,
//           opacity: 0.6,
//         });
//       }

//       /* ================= MASTER TIMELINE ================= */
//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: containerRef.current,
//           start: "top 70%",
//           end: "+=85%",      //  ONLY 70% viewport scroll
//           scrub: 0.6,
//         }

//       });

//       /* ================= HEADER ================= */
//       tl.fromTo(
//         labelRef.current,
//         { opacity: 0, y: 10 },
//         { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
//       );

//       tl.fromTo(
//         ".process-char",
//         { y: 40, opacity: 0 },
//         {
//           y: 0,
//           opacity: 1,
//           stagger: 0.04,
//           duration: 1,
//           ease: "expo.out",
//         },
//         "-=0.3"
//       );

//       /* ================= LINE DRAW ================= */
//       if (pathRef.current) {
//         tl.to(pathRef.current, {
//           strokeDashoffset: 0,
//           duration: 2,
//           ease: "none",
//         }, "-=0.5");
//       }

//       /* ================= STEP CARDS ================= */
//       cards.forEach((card, i) => {
//         const iconWrap = card.querySelector(".step-icon-wrapper");
//         const bloom = card.querySelector(".step-bloom");
//         const text = card.querySelector(".step-text-content");
//         const numeral = card.querySelector(".step-numeral");
//         const paths = card.querySelectorAll(
//           ".step-icon path, .step-icon circle, .step-icon line, .step-icon polyline"
//         );

//         /* Draw prep */
//         paths.forEach((p: any) => {
//           const len = p.getTotalLength?.();
//           if (len) {
//             gsap.set(p, {
//               strokeDasharray: len,
//               strokeDashoffset: len,
//             });
//           }
//         });

//         const stepTl = gsap.timeline();

//         /* Card reveal */
//         stepTl.to(card, {
//           opacity: 1,
//           y: 0,
//           duration: 0.8,
//           ease: "power3.out",
//         });

//         /* Icon */
//         stepTl.to(iconWrap, {
//           opacity: 1,
//           borderColor: "#C8A97E",
//           boxShadow: "0 10px 30px -5px rgba(200,169,126,0.18)",
//           duration: 0.7,
//           ease: "power2.out",
//         }, "-=0.4");

//         /* Bloom */
//         stepTl.to(bloom, {
//           opacity: 1,
//           scale: 1.1,
//           duration: 1.6,
//           ease: "power1.out",
//         }, "<");

//         /* Icon draw */
//         stepTl.to(paths, {
//           strokeDashoffset: 0,
//           duration: 1.2,
//           stagger: 0.08,
//           ease: "power1.inOut",
//         }, "-=1.1");

//         /* Numeral */
//         stepTl.to(numeral, {
//           opacity: 1,
//           y: 0,
//           duration: 0.6,
//           ease: "power2.out",
//         }, "-=0.6");

//         /* Text */
//         stepTl.to(text, {
//           opacity: 1,
//           y: 0,
//           duration: 0.7,
//           ease: "power2.out",
//         }, "-=0.4");

//         tl.add(stepTl, i * 0.35); //  wave stagger
//       });

//     }, containerRef);

//     return () => ctx.revert();
//   }, []);



//   return (
//     <section ref={containerRef} className="py-32 lg:py-40 bg-[#F5F4F0] relative overflow-hidden border-t border-stone/30">
//       {/* left hanging */}
//       <div className='absolute h-64 left-0 top-0 w-32'>
//         <img src={hanging} alt="" className='h-full w-full opacity-40' />
//       </div>
//       {/* right hanging */}
//       <div className='absolute h-64 right-0 top-0 w-32'>
//         <img src={hanging} alt="" className='h-full w-full opacity-40' />
//       </div>

//       <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-multiply pointer-events-none"></div>

//       <div className="container mx-auto px-6 lg:px-12 relative z-10">
//         <div ref={headerRef} className="text-center mb-24">
//           <span ref={labelRef} className="text-gold uppercase tracking-[0.2em] text-xl font-bold font-serif mb-2 block">The Process</span>
//           <div className="overflow-hidden inline-block">
//             <h2 className="font-serif text-6xl lg:text-8xl text-forest block tracking-tight">
//               {renderLetters("Why Buy From Sublime", "process-char")}
//             </h2>
//           </div>
//         </div>

//         <div className="relative">
//           {/* Connecting Line - Background */}
//           <div className="absolute top-[100px] left-0 w-full hidden lg:block -z-10 pointer-events-none">
//             <svg width="100%" height="200" viewBox="0 0 1200 200" fill="none" preserveAspectRatio="none">
//               <path
//                 ref={pathRef}
//                 d="M 150 100 C 300 100, 300 50, 450 50 C 600 50, 600 150, 750 150 C 900 150, 900 100, 1050 100"
//                 stroke="#D4AF37"
//                 strokeWidth="3"
//                 strokeDasharray="0" // Initialized in GSAP
//                 fill="none"
//               />
//             </svg>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
//             {STEPS.map((step, idx) => (
//               <StepCard key={idx} step={step} index={idx} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };


import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Sprout, Filter, Package, Coffee } from 'lucide-react';
import hanging from "../assest/hanging.png";

const STEPS = [
  {
    icon: Sprout,
    title: "Wellness Enhancing",
    desc: "A lifestyle designed to elevate your body, mind, and spirit."
  },
  {
    icon: Filter,
    title: "Direct from Growers",
    desc: "From the hands that harvest to yours-pure, authentic, and direct."
  },
  {
    icon: Package,
    title: "Sourced Fresh in Small Batches",
    desc: "Crafted in small batches to ensure unmatched freshness and quality."
  },
  {
    icon: Coffee,
    title: "Proudly Women Led",
    desc: "Proudly a women-led brand, built on passion, purpose, and perseverance."
  },
];

const renderLetters = (text: string, className: string = "") =>
  text.split('').map((char, index) => (
    <span key={index} className={`inline-block ${className}`}>
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

const StepCard: React.FC<{ step: typeof STEPS[0]; index: number }> = ({ step, index }) => {
  return (
    <div 

    style={{top:index == 0 ? "-100px" : index === 1 ? "-120px" : index === 2 ? "-40px" : "-80px"}}
    
    className="step-card group cursor-pointer transition-all duration-500 flex flex-col items-center text-center px-4 py-8 relative z-10 opacity-0 hover:scale-[1.05] ">
      <div className="w-full flex flex-col items-center mb-10" style={{ transform: 'translateZ(10px)' }}>
        <span className="font-serif text-gold text-xl tracking-widest italic opacity-0 step-numeral"></span>
      </div>

      <div className="relative mb-10 hover:shadow-[0_0_20px_rgba(200,169,126,0.5),0_0_40px_rgba(200,169,126,0.5),0_0_60px_rgba(200,169,126,0.5)] rounded-full hover:scale-110 transition-all duration-500 ">
        <div className="step-icon-wrapper w-32 h-32 rounded-full border border-stone/60 flex items-center justify-center relative z-[50] bg-[#FDFCF8] shadow-sm transition-all duration-500 origin-center">
          <span className="absolute z-[-1] inset-0 rounded-full bg-white opacity-20 scale-75 group-hover:scale-110 group-hover:opacity-0 transition-all duration-[900ms] ease-out" />
          <step.icon className="step-icon w-16 h-16 text-gold hover-bg-red-600" strokeWidth={1.2} />
        </div>

        <div className="absolute inset-0 -m-3 border border-dotted border-gold/40 rounded-full opacity-0 step-bloom"></div>
      </div>

      <div className="step-text-content opacity-0">
        <h3 className="font-serif text-4xl text-forest mb-4 group-hover:text-gold-dim transition-colors duration-500">{step.title}</h3>
        <p className="text-earth/70 text-lg leading-relaxed font-serif max-w-[240px] mx-auto text-balance">
          {step.desc}
        </p>
      </div>
    </div>
  );
};

export const ProcessSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const svgWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      const cards = gsap.utils.toArray<HTMLElement>(".step-card");

      gsap.set(cards, { opacity: 0, y: 80 });
      gsap.set(".step-icon-wrapper", { opacity: 0 });
      gsap.set(".step-text-content, .step-numeral", { opacity: 0, y: 14 });

      if (pathRef.current) {
        const len = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, {
          strokeDasharray: "6,6",
          strokeDashoffset: len,
          opacity: 0.6,
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "+=65%",
          scrub: 0.6,
        }
      });

      tl.fromTo(labelRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 });
      tl.fromTo(".process-char", { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.04, duration: 1 }, "-=0.3");

      if (pathRef.current)
        tl.to(pathRef.current, { strokeDashoffset: 0, duration: 2 }, "-=0.5");

      cards.forEach((card, i) => {
        const iconWrap = card.querySelector(".step-icon-wrapper");
        const bloom = card.querySelector(".step-bloom");
        const text = card.querySelector(".step-text-content");
        const numeral = card.querySelector(".step-numeral");
        const paths = card.querySelectorAll(".step-icon path, .step-icon circle, .step-icon line, .step-icon polyline");

        paths.forEach((p: any) => {
          const len = p.getTotalLength?.();
          if (len) gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        });

        const stepTl = gsap.timeline();

        stepTl.to(card, { opacity: 1, y: 0, duration: 0.8 });
        stepTl.to(iconWrap, { opacity: 1, borderColor: "#C8A97E", duration: 0.7 }, "-=0.4");
        stepTl.to(bloom, { opacity: 1, scale: 1.1, duration: 1.6 }, "<");
        stepTl.to(paths, { strokeDashoffset: 0, duration: 1.2, stagger: 0.08 }, "-=1.1");
        stepTl.to(numeral, { opacity: 1, y: 0, duration: 0.6 }, "-=0.6");
        stepTl.to(text, { opacity: 1, y: 0, duration: 0.7 }, "-=0.4");

        tl.add(stepTl, i * 0.35);
      });

      /** ⭐ CURVE AUTO ALIGN TO CARD CENTER */
      setTimeout(() => {
        const icon = document.querySelector(".step-icon-wrapper") as HTMLElement;
        if (icon && svgWrapperRef.current) {
          const centerY = icon.offsetTop + icon.offsetHeight / 2;
          gsap.set(svgWrapperRef.current, { y: centerY - 100 });
        }
      }, 50);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="pt-6 pb-0 bg-[#F5F4F0] relative overflow-hidden border-t border-stone/30">
      <div className="absolute h-64 left-0 top-0 w-32"><img src={hanging} alt="" className="h-full w-full opacity-40" /></div>
      <div className="absolute h-64 right-0 top-0 w-32"><img src={hanging} alt="" className="h-full w-full opacity-40" /></div>

      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-multiply pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div ref={headerRef} className="text-center mb-24">
          <span ref={labelRef} className="text-gold uppercase tracking-[0.2em] text-xl font-bold font-serif mb-2 block">The Process</span>
          <div className="overflow-hidden inline-block">
            <h2 className="font-serif text-6xl lg:text-8xl text-forest block tracking-tight">
              {renderLetters("Why Buy From Sublime", "process-char")}
            </h2>
          </div>
        </div>

        <div className="relative">
          <div ref={svgWrapperRef} className="absolute left-0 w-full hidden lg:block -z-10 pointer-events-none">
          <svg width="100%" height="200" viewBox="0 0 1200 200" fill="none" preserveAspectRatio="none"> <path ref={pathRef} d="M 150 100 C 300 100, 300 50, 450 50 C 600 50, 600 150, 750 150 C 900 150, 900 100, 1050 100" stroke="#D4AF37" strokeWidth="3" strokeDasharray="0"   fill="none" /> </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {STEPS.map((step, idx) => <StepCard key={idx} step={step} index={idx} />)}
          </div>
        </div>
      </div>
    </section>
  );
};


// option B chahiye isme poora single file copy pasate code