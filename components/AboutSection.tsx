// import React, { useEffect, useRef } from "react"
// import gsap from "gsap"
// import { ScrollTrigger } from "gsap/ScrollTrigger"
// import { Button } from "./Button"
// import { ImageWithLoader } from "./ImageWithLoader"
// import AboutImage from "../assest/About.jpg"

// gsap.registerPlugin(ScrollTrigger)

// export const AboutSection: React.FC = () => {
//   const sectionRef = useRef<HTMLDivElement>(null)
//   const imageWrapRef = useRef<HTMLDivElement>(null)
//   const imageRef = useRef<HTMLDivElement>(null)

//   const headingRef = useRef<HTMLHeadingElement>(null)
//   const para1Ref = useRef<HTMLParagraphElement>(null)
//   const para2Ref = useRef<HTMLParagraphElement>(null)
//   const buttonRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     const ctx = gsap.context(() => {

//       /* ================= TEXT ================= */
//       gsap.timeline({
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top 75%",
//         },
//       })
//         .from(headingRef.current, {
//           y: 90,
//           opacity: 0,
//           duration: 1.6,
//           ease: "expo.out",
//         })
//         .from(
//           [para1Ref.current, para2Ref.current],
//           {
//             y: 50,
//             opacity: 0,
//             duration: 1.2,
//             stagger: 0.2,
//             ease: "power3.out",
//           },
//           "-=1"
//         )
//         .from(
//           buttonRef.current,
//           {
//             y: 30,
//             opacity: 0,
//             duration: 0.9,
//             ease: "power2.out",
//           },
//           "-=0.7"
//         )

//       /* ================= IMAGE INITIAL STATE ================= */
//       gsap.set(imageWrapRef.current, {
//         clipPath: "inset(100% 0% 0% 0%)",
//       })

//       gsap.set(imageRef.current, {
//         scale: 1.25,
//         y: 90,
//         rotate: -1.5,
//         transformOrigin: "center center",
//         willChange: "transform",
//       })

//       /* ================= IMAGE REVEAL ================= */
//       const imageTl = gsap.timeline({
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top 70%",
//         },
//       })

//       imageTl
//         .to(imageWrapRef.current, {
//           clipPath: "inset(0% 0% 0% 0%)",
//           duration: 1.6,
//           ease: "power4.out",
//         })
//         .to(
//           imageRef.current,
//           {
//             scale: 1,
//             y: 0,
//             rotate: 0,
//             duration: 2.4,
//             ease: "expo.out",
//           },
//           "-=1.2"
//         )

//       /* ================= PARALLAX ================= */
//       gsap.to(imageRef.current, {
//         y: -80,
//         ease: "none",
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top bottom",
//           end: "bottom top",
//           scrub: 1.6,
//         },
//       })

//       /* ================= MICRO LUXURY FLOAT ================= */
//       gsap.to(imageRef.current, {
//         scale: 1.015,
//         duration: 4,
//         ease: "sine.inOut",
//         repeat: -1,
//         yoyo: true,
//       })

//     }, sectionRef)

//     return () => ctx.revert()
//   }, [])

//   return (
//     <section
//       ref={sectionRef}
//       className="py-28 bg-[#EAE8E0] overflow-hidden"
//     >
//       <div className="container mx-auto px-6 lg:px-12">
//         <div className="grid lg:grid-cols-12 gap-16 items-center">

//           {/* LEFT CONTENT */}
//           <div className="lg:col-span-5">
//             <h2
//               ref={headingRef}
//               className="font-serif text-5xl lg:text-[5rem] text-forest leading-[0.95]"
//             >
//               Crafting Legacy Since 1942
//             </h2>

//             <div className="mt-6 space-y-6 text-xl font-serif text-earth border-l border-forest/40 pl-8">
//               <p ref={para1Ref}>
//                 Tea in India is not merely a beverage — it is heritage, ritual,
//                 and memory brewed through time.
//               </p>
//               <p ref={para2Ref}>
//                 Every leaf carries craftsmanship refined over generations.
//               </p>
//             </div>

//             <div ref={buttonRef} className="mt-10">
//               <Button
//                 variant="outline"
//                 className="border-forest/30 text-forest hover:bg-forest hover:text-white px-10 py-4 font-serif italic text-lg"
//               >
//                 Read Our Full Story
//               </Button>
//             </div>
//           </div>

//           {/* RIGHT IMAGE */}
//           <div className="lg:col-span-5 lg:col-start-8 relative">
//             <div
//               ref={imageWrapRef}
//               className="relative aspect-[3/4] rounded-t-[16rem] rounded-b-lg overflow-hidden shadow-luxury"
//             >
//               <div
//                 ref={imageRef}
//                 className="w-full h-full backface-hidden"
//               >
//                 <ImageWithLoader
//                   src={AboutImage}
//                   alt="Tea Heritage"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>

//       <style>{`
//         .backface-hidden {
//           backface-visibility: hidden;
//           transform: translateZ(0);
//         }
//       `}</style>
//     </section>
//   )
// }


import React, { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "./Button"
import { ImageWithLoader } from "./ImageWithLoader"
import AboutImage from "../assest/About.jpg"

gsap.registerPlugin(ScrollTrigger)

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageWrapRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  const headingRef = useRef<HTMLHeadingElement>(null)
  const para1Ref = useRef<HTMLParagraphElement>(null)
  const para2Ref = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ================= TEXT ================= */
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions:"play reverse play reverse"
        },
      })
        .from(headingRef.current, {
          y: 90,
          opacity: 0,
          duration: 1.6,
          ease: "expo.out",
        })
        .from(
          [para1Ref.current, para2Ref.current],
          {
            y: 50,
            opacity: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "power3.out",
          },
          "-=1"
        )
        .from(
          buttonRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.9,
            ease: "power2.out",
          },
          "-=0.7"
        )

      /* ================= IMAGE INITIAL STATE ================= */
      gsap.set(imageWrapRef.current, {
        clipPath: "inset(100% 0% 0% 0%)",
      })

      gsap.set(imageRef.current, {
        scale: 1.25,
        y: 90,
        rotate: -1.5,
        transformOrigin: "center center",
        willChange: "transform",
      })

      /* ================= IMAGE REVEAL ================= */
      const imageTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      })

      imageTl
        .to(imageWrapRef.current, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.6,
          ease: "power4.out",
        })
        .to(
          imageRef.current,
          {
            scale: 1,
            y: 0,
            rotate: 0,
            duration: 2.4,
            ease: "expo.out",
          },
          "-=1.2"
        )

      /* ================= PARALLAX ================= */
      // gsap.to(imageRef.current, {
      //   y: -80,
      //   ease: "none",
      //   scrollTrigger: {
      //     trigger: sectionRef.current,
      //     start: "top bottom",
      //     end: "bottom top",
      //     scrub: 1.6,
      //   },
      // })

    

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-28 bg-[#EAE8E0] overflow-hidden"
    >
      <div className="max-w-[1180px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-16 items-center">

          {/* LEFT CONTENT */}
          <div className="lg:col-span-6" >
            <h2
              ref={headingRef}
              className="font-gotham text-3xl lg:text-[3rem] text-[#a07a27] leading-[0.95]"
            >
              Crafting Legacy Since 1998
            </h2>

            <div className="mt-6 space-y-6 text-lg font-gotham  text-black border-l border-forest/40 pl-8">
              <p className="font-gotham opacity-50 text-sm" ref={para1Ref}>
More than tea, spices, nuts, or honey, Sublime House of Tea is an appreciative experience of Health and Wellness. Founded in 2013, Sublime House of Tea, much like Prestige, is an initiative, which brings together, supreme quality, trust, authenticity, and freshness to your daily lives, through your kitchens.              </p>
              <p  className="font-gotham opacity-50 text-sm" ref={para2Ref}>
          Yet, despite the vast array of tea varieties available, only a few  classic options have managed to gain mainstream popularity.  Tea holds immense potential beyond its current status of being a  classic beverage—chai. While nothing compares to the  brilliance of Kadak chai, it's important to remember that tea can  be much more than that.
              </p>
            </div>

            <div ref={buttonRef} className="mt-10">
              <Button
                variant="outline"
                className="border-forest/30 text-forest hover:bg-forest hover:text-white px-10 py-2 font-gotham italic text-sm"
              >
                Read Our Full Story
              </Button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="lg:col-span-6 mb-12 lg:col-start-8 relative">
            <div
              ref={imageWrapRef}
              className="relative aspect-[3/4] mb-12  rounded-t-[16rem] rounded-b-lg overflow-hidden shadow-luxury"
            >
              <div
                ref={imageRef}
                className="w-full mb-12 h-[90%] backface-hidden"
              >
                <ImageWithLoader
                  src={AboutImage}
                  alt="Tea Heritage"
                  className="w-full  h-full object-cover"
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .backface-hidden {
          backface-visibility: hidden;
          transform: translateZ(0);
        }
      `}</style>
    </section>
  )
}
