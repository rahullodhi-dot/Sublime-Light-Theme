import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const splitText = (text: string, cls = "") =>
  text.split("").map((c, i) => (
    <span key={i} className={`inline-block ${cls}`}>
      {c === " " ? "\u00A0" : c}
    </span>
  ));

export const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const ctx = gsap.context(() => {

    /* ================= MASTER ================= */
    const master = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        end: "bottom 55%",
        scrub: 0.7, //  smoother
      },
    });

    /* ================= TITLE ================= */
    master.fromTo(
      ".lux-char",
      {
        y: 32,
        opacity: 0,
        rotateX: 10,
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        ease: "power3.out",
        stagger: 0.045,
      },
      0
    );

    /* ================= CARD BASE ================= */
    gsap.set(".lux-card", {
      opacity: 0,
      clipPath: "inset(0 0 80% 0)",
      y: 40,
      scale: 0.97,
    });

    /* ================= CARD REVEAL ================= */
    master.to(
      ".lux-card",
      {
        opacity: 1,
        clipPath: "inset(0 0 0% 0)",
        y: 0,
        scale: 1,
        ease: "power3.out",
        stagger: 0.12,
      },
      0.25
    );

    /* ================= INNER CONTENT ================= */
    master.fromTo(
      ".lux-inner",
      {
        y: 24,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        ease: "power2.out",
        stagger: 0.15,
      },
      0.45
    );

  

  }, sectionRef);

  return () => ctx.revert();
}, []);


  return (
    <section
      ref={sectionRef}
      className="relative py-20 bg-[#F5F4F0] overflow-hidden"
    >
      {/* Grain */}
      <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
          <div>
            <span className="block text-gold uppercase tracking-[0.3em] text-sm mb-4">
              Testimonials
            </span>
            <h2 className="font-serif text-6xl lg:text-8xl text-[#1A261C] leading-tight">
              {splitText("Connoisseurs Choice", "lux-char")}
            </h2>
          </div>

          <div className="flex gap-4">
            <button className="w-14 h-14 rounded-full border border-black/10 hover:border-black transition">←</button>
            <button className="w-14 h-14 rounded-full border border-black/10 hover:border-black transition">→</button>
          </div>
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-10">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="lux-card  bg-[#1A261C] text-white p-10 rounded-2xl border border-white/5"
            >
              <div className="lux-inner flex flex-col justify-between min-h-[380px]">

                <div>
                  <div className="text-gold mb-8 tracking-widest">★★★★★</div>

                  <p className="font-serif text-2xl leading-relaxed italic opacity-90">
                    “The aroma instantly takes me back to the hills.
                    It’s not just tea — it’s a moment of stillness.”
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-8 border-t border-white/10">
                  <img
                    src={`https://i.pravatar.cc/150?img=${i + 20}`}
                    className="w-14 h-14 rounded-full object-cover grayscale opacity-80"
                  />
                  <div>
                    <h5 className="font-serif text-lg">Sarah Jenkins</h5>
                    <p className="text-[10px] uppercase tracking-widest text-gold">
                      Verified Buyer
                    </p>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
