// import React, { useEffect, useRef } from 'react';
// import gsap from 'gsap';
// import { Button } from './Button';
// import { ImageWithLoader } from './ImageWithLoader';
// import gift1 from '../assest/Gift1.webp';
// import gift2 from '../assest/Gift2.png';
// import gift3 from '../assest/Gift3.webp';
// import gift4 from '../assest/Gift4.jpg';


// const GIFT_BANNERS = [
//     {
//         type: 'intro',
//         title: "Surprises Packed With Joy",
//         subtitle: "Gifting Suites",
//         desc: "Curated collections designed to delight. Swipe to explore our seasonal lookbook.",
//     },
//     {
//         type: 'product',
//         title: "The Estate Collection",
//         subtitle: "A Curated Symphony",
//         image: gift1,
//         desc: "Six rare single-estate teas presented in a handcrafted walnut box.",
//     },
//     {
//         type: 'product',
//         title: "Wellness & Rituals",
//         subtitle: "Restore & Rebalance",
//         image: gift2,
//         desc: "A wellness-focused curation designed for evening relaxation and morning clarity.",
//     },
//     {
//         type: 'product',
//         title: "The Morning Edition",
//         subtitle: "Awaken Your Senses",
//         image: gift3,
//         desc: "Bold, robust black teas sourced from Assam's finest gardens.",
//     }
// ];

// export const GiftingSection: React.FC = () => {
//     const sectionRef = useRef<HTMLDivElement>(null);
//     const triggerRef = useRef<HTMLDivElement>(null);
//     const scrollContainerRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         const ctx = gsap.context(() => {
//             const scrollContainer = scrollContainerRef.current;
//             if (!scrollContainer) return;

//             const sections = gsap.utils.toArray('.gift-slide');
//             const scrollDistance = (sections.length - 1) * window.innerWidth;

//             // Pinned Horizontal Scroll
//             // Changed start to "center center" to ensure section is fully visible before pinning
//             gsap.to(scrollContainer, {
//                 x: -scrollDistance,
//                 ease: "none",
//                 scrollTrigger: {
//                     trigger: triggerRef.current,
//                     pin: true,
//                     scrub: 1, // Smooth scrubbing
//                     snap: {
//                         snapTo: 1 / (sections.length - 1),
//                         duration: { min: 0.3, max: 0.8 }, // Slightly longer for elegance
//                         delay: 0.1, // Wait a moment before snapping
//                         ease: "power2.inOut"
//                     },
//                     start: "center center",
//                     end: "+=" + scrollDistance,
//                     invalidateOnRefresh: true,
//                 }
//             });

//             // Parallax on images
//             gsap.utils.toArray('.slide-image').forEach((img: any) => {
//                 gsap.fromTo(img,
//                     { scale: 1.15 },
//                     {
//                         scale: 1,
//                         ease: "none",
//                         scrollTrigger: {
//                             trigger: img,
//                             containerAnimation: gsap.getById('scrollTween'),
//                             start: "left right",
//                             end: "right left",
//                             scrub: true
//                         }
//                     }
//                 );
//             });

//             // Reveal animations for text content
//             // We animate them when they enter the view for a cinematic feel
//             gsap.utils.toArray(".slide-content").forEach((content) => {
//                 gsap.fromTo(
//                     content,
//                     {
//                         opacity: 0,
//                         y: 60,
//                     },
//                     {
//                         opacity: 1,
//                         y: 0,
//                         duration: 1,
//                         ease: "power3.out",
//                         scrollTrigger: {
//                             trigger: content,
//                             start: "top 80%",      // 🔥 when element enters viewport
//                             end: "top 50%",
//                             toggleActions: "play reverse play reverse",
//                             // markers: true,      // enable only for debugging
//                         },
//                     }
//                 );
//             });


//         }, sectionRef);
//         return () => ctx.revert();
//     }, []);

//     return (
//         <section ref={sectionRef} className="relative bg-[#0F1610] text-ivory overflow-hidden">
//             <div ref={triggerRef} className="h-screen w-full flex items-center overflow-hidden">
//                 <div ref={scrollContainerRef} className="flex h-full w-fit">

//                     {GIFT_BANNERS.map((gift, idx) => (
//                         <div key={idx} className="gift-slide w-[100vw] h-screen flex-shrink-0 relative group border-r border-white/5 overflow-hidden">

//                             {gift.type === 'intro' ? (
//                                 /* Intro Slide */
//                                 <div className="w-full h-full flex items-center justify-center relative p-8 lg:p-16">
//                                     <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay"></div>
//                                     <div className="text-center max-w-5xl z-10 slide-content">
//                                         <div className="flex flex-col items-center gap-2 mb-6 text-gold opacity-80">
//                                             <span className="uppercase tracking-[0.3em] text-[10px] font-bold font-serif block">{gift.subtitle}</span>
//                                             <div className="w-12 h-[1px] bg-gold"></div>
//                                         </div>
//                                         {/* Reduced font size slightly to ensure fit on laptops */}
//                                         <h2 className="font-serif text-6xl lg:text-[7rem] text-white leading-[0.9] mb-8 tracking-tight text-balance">
//                                             Surprises Packed <br /> <span className="italic text-gold opacity-90">With Joy</span>
//                                         </h2>
//                                         <p className="text-white/60 font-serif text-xl lg:text-2xl max-w-xl mx-auto leading-relaxed mb-12 text-balance">
//                                             {gift.desc}
//                                         </p>
//                                         <div className="animate-bounce text-gold opacity-60">
//                                             <span className="text-xs uppercase tracking-widest">Scroll to Explore</span>
//                                             <div className="w-[1px] h-12 bg-gold mx-auto mt-2"></div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ) : (
//                                 /* Product Slide */
//                                 <>
//                                     <div className="absolute inset-0 overflow-hidden">
//                                         <ImageWithLoader
//                                             src={gift.image || ''}
//                                             alt={gift.title}
//                                             className="slide-image w-full h-full object-cover grayscale-[10%]"
//                                             containerClassName="w-full h-full"
//                                         />
//                                         <div className="absolute inset-0 bg-[#0F1610]/30 mix-blend-multiply"></div>
//                                         <div className="absolute inset-0 bg-gradient-to-t from-[#0F1610] via-transparent to-transparent opacity-90"></div>
//                                     </div>

//                                     <div className="absolute bottom-0 left-0 w-full p-10 lg:p-20 flex flex-col items-start justify-end z-10 h-full pointer-events-none">
//                                         <div className="max-w-4xl pointer-events-auto slide-content">
//                                             <span className="font-serif text-gold text-lg italic mb-3 block">{gift.subtitle}</span>

//                                             {/* Adjusted sizes for better single-viewport fit */}
//                                             <h3 className="font-serif text-5xl lg:text-7xl text-white mb-5 leading-none text-balance">{gift.title}</h3>

//                                             <p className="text-white/80 text-lg lg:text-xl font-serif max-w-lg leading-relaxed mb-8 text-balance">
//                                                 {gift.desc}
//                                             </p>

//                                             <Button variant="outline" className="border-white/30 text-white hover:bg-white hover:text-forest hover:border-white px-8 py-4 tracking-[0.2em] text-xs">
//                                                 View Collection
//                                             </Button>
//                                         </div>
//                                     </div>
//                                 </>
//                             )}
//                         </div>
//                     ))}

//                     {/* Final CTA Spacer Slide */}
//                     <div className="w-[50vw] h-screen flex-shrink-0 flex items-center justify-center bg-[#0F1610] border-r border-white/5 gift-slide">
//                         <a href="/collections" className="font-serif text-4xl lg:text-5xl text-white hover:text-gold transition-colors italic border-b border-transparent hover:border-gold p-4">View All Collections →</a>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };
























import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "./Button";
import { ImageWithLoader } from "./ImageWithLoader";

import gift1 from "../assest/Gift1.webp";
import gift2 from "../assest/Gift2.png";
import gift3 from "../assest/Gift3.webp";
import bck from "../assest/bck.png";

gsap.registerPlugin(ScrollTrigger);

const GIFT_BANNERS = [
    {
        type: "intro",
        title: "Surprises Packed With Joy",
        subtitle: "Gifting Suites",
        desc: "Curated collections designed to delight. Swipe to explore our seasonal lookbook.",
        image: bck,
    },
    {
        type: "product",
        title: "The Estate Collection",
        subtitle: "A Curated Symphony",
        image: gift1,
        desc: "Six rare single-estate teas presented in a handcrafted walnut box.",
    },
    {
        type: "product",
        title: "Wellness & Rituals",
        subtitle: "Restore & Rebalance",
        image: gift2,
        desc: "A wellness-focused curation designed for evening relaxation and morning clarity.",
    },
    {
        type: "product",
        title: "The Morning Edition",
        subtitle: "Awaken Your Senses",
        image: gift3,
        desc: "Bold, robust black teas sourced from Assam's finest gardens.",
    },
];

export const GiftingSection: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const slides = gsap.utils.toArray<HTMLElement>(".gift-slide")
            const scrollDistance =
                (slides.length - 1) * window.innerWidth

            /* ================= PINNED HORIZONTAL SCROLL ================= */

            const scrollTween = gsap.to(scrollContainerRef.current, {
                x: -scrollDistance,
                ease: "none",
                scrollTrigger: {
                    trigger: triggerRef.current,
                    pin: true,
                    scrub: 1.6, // ⬅️ more luxury weight
                    start: "top top",
                    end: `+=${scrollDistance * 0.7}`, // 🔥 completes in ~70vh
                    invalidateOnRefresh: true,
                    snap: {
                        snapTo: 1 / (slides.length - 1),
                        duration: { min: 0.5, max: 1 },
                        ease: "expo.inOut",
                    },
                },
                id: "scrollTween",
            })

            /* ================= IMAGE CINEMATIC REVEAL ================= */

            gsap.utils.toArray<HTMLElement>(".slide-image").forEach((img) => {
                const wrapper = img.parentElement

                // Initial hidden state
                gsap.set(wrapper, {
                    clipPath: "inset(12% 12% 12% 12%)",
                })

                gsap.set(img, {
                    scale: 1.25,
                    filter: "blur(6px)",
                })

                // Reveal animation
                gsap.to(wrapper, {
                    clipPath: "inset(0% 0% 0% 0%)",
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: wrapper,
                        containerAnimation: scrollTween,
                        start: "left 85%",
                        end: "left 55%",
                        scrub: true,
                    },
                })

                gsap.to(img, {
                    scale: 1,
                    filter: "blur(0px)",
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: wrapper,
                        containerAnimation: scrollTween,
                        start: "left 85%",
                        end: "left 40%",
                        scrub: true,
                    },
                })
            })

            /* ================= TEXT EDITORIAL REVEAL ================= */

            gsap.utils.toArray<HTMLElement>(".slide-content").forEach((content) => {
                const items = content.children

                gsap.set(items, {
                    opacity: 0,
                    y: 60,
                    filter: "blur(4px)",
                })

                gsap.to(items, {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    stagger: 0.08, //  luxury stagger
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: content,
                        containerAnimation: scrollTween,
                        start: "left 70%",
                        end: "left 40%",
                        scrub: true,
                    },
                })
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

useEffect(() => {
  const ctx = gsap.context(() => {
    const intro = document.querySelector(".slide-content")

    if (!intro) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: intro,
        start: "left 70%",
        end: "left 30%",
        scrub: 1.2,
        toggleActions:"play reverse play reverse"
      }
    });

    tl.from(".joy-title", { opacity: 0, y: 30, duration: 0.5, ease: "power2.out" })
      .from(".joy-heading", { opacity: 0, y: 60, duration: 0.8, ease: "power3.out" }, "-=0.3")
      .from(".joy-desc", { opacity: 0, y: 40, duration: 0.5, ease: "power2.out" }, "-=0.4")

  }, sectionRef);

  return () => ctx.revert();
}, []);




    return (
        <section
            ref={sectionRef}
            className="relative bg-[#0F1610] text-ivory overflow-hidden"
        >
            <div
                ref={triggerRef}
                className="h-screen w-full flex items-center overflow-hidden"
            >
                <div ref={scrollContainerRef} className="flex h-full w-fit">
                    {GIFT_BANNERS.map((gift, idx) => (
                        <div
                            key={idx}
                            className="gift-slide w-[100vw] h-screen flex-shrink-0 relative overflow-hidden border-r border-white/5"
                        >
                            {/* ---------- BACKGROUND IMAGE ---------- */}
                            {gift.image && (
                                <div className="absolute inset-0 z-0">
                                    <ImageWithLoader
                                        src={gift.image}
                                        alt={gift.title}
                                        className="slide-image w-full h-full object-cover"
                                        containerClassName="w-full h-full"
                                    />
                                    <div className="absolute inset-0 bg-[#0F1610]/40" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F1610] via-transparent" />
                                </div>
                            )}

                            {/* ---------- INTRO SLIDE ---------- */}
                            {gift.type === "intro" ? (
                                <div className="relative z-10 w-full h-full flex items-center justify-center p-12">
                                    <div className=" slide-content text-center max-w-5xl slide-content">
                                        <span className="uppercase joy-title tracking-[0.3em] text-xl text-gold block mb-4">
                                            {gift.subtitle}
                                        </span>

                                        <h2 className="font-serif opacity-0 joy-heading text-6xl lg:text-7xl text-white mb-8 leading-[0.9]">
                                            Surprises Packed <br />
                                            <span className="italic text-gold">With Joy</span>
                                        </h2>

                                        <p className="text-white/60 joy-desc text-xl mb-10 max-w-xl mx-auto">
                                            {gift.desc}
                                        </p>

                                        <div className="animate-bounce text-gold text-xl uppercase tracking-widest">
                                            Scroll to explore
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                /* ---------- PRODUCT SLIDE ---------- */
                                <div className="relative z-10 w-full h-full p-10 lg:p-20 flex items-end">
                                    <div className="slide-content max-w-4xl">
                                        <span className="italic text-gold block mb-3">
                                            {gift.subtitle}
                                        </span>

                                        <h3 className="font-serif text-5xl lg:text-7xl text-white mb-5 leading-none">
                                            {gift.title}
                                        </h3>

                                        <p className="text-white/80 text-lg max-w-lg mb-8">
                                            {gift.desc}
                                        </p>

                                        <Button variant="primary" className="text-lg">Read More</Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* ---------- FINAL CTA ---------- */}
                    <div className="gift-slide w-[50vw] h-screen flex items-center justify-center">
                        <a
                            href="/collections"
                            className="font-serif text-4xl italic text-white hover:text-gold transition"
                        >
                            View All Blogs →
                        </a>
                    </div>
                </div>

            </div>
        </section>
    );
};
