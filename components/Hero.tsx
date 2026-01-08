import React, { useEffect, useRef, useMemo } from 'react';
import { Button } from './Button';
import { Play } from 'lucide-react';
import gsap from 'gsap';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { ImageWithLoader } from './ImageWithLoader';
import { Link } from 'react-router-dom';
import backImage from "../assest/bck.png"
import Banner1 from "../assest/Banner (1).png"
import Banner2 from "../assest/Banner (2).png"
import jugnoo from "../assest/jugnoo.gif"
import { time } from 'console';



// Fix for missing R3F types in JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      instancedMesh: any;
      ambientLight: any;
      directionalLight: any;
      pointLight: any;
      fog: any;
      [elemName: string]: any;
    }
  }
}

// --- Three.js Components ---

const Rig = () => {
  const { camera, mouse } = useThree();
  const vec = new THREE.Vector3();

  useFrame(() => {
    camera.position.lerp(vec.set(mouse.x * 2, mouse.y * 2, camera.position.z), 0.05);
    camera.lookAt(0, 0, 0);
  });
  return null;
};

const FallingLeaves = ({ count = 60 }) => {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const innerFloat = useRef<HTMLDivElement>(null);

  const leafGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.3, 0.3, 0.3, 0.8, 0, 1);
    shape.bezierCurveTo(-0.3, 0.8, -0.3, 0.3, 0, 0);
    return new THREE.ShapeGeometry(shape);
  }, []);

  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.95,
      roughness: 0.2,
      metalness: 0.5,
      emissive: new THREE.Color("#1a2f1c"),
      emissiveIntensity: 0.2
    });
  }, []);

  const particles = useMemo(() => {
    const temp = [];
    const palette = ['#FFD700', '#F9F8F4', '#E8EDE6', '#C5A059', '#FFFFFF'];

    for (let i = 0; i < count; i++) {
      temp.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 45,
          Math.random() * 20 - 5,
          (Math.random() - 0.5) * 25
        ),
        rotation: new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, 0),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          -(0.01 + Math.random() * 0.03),
          (Math.random() - 0.5) * 0.02
        ),
        sway: { speed: 0.3 + Math.random() * 0.5, phase: Math.random() * Math.PI * 2 },
        scale: 0.25 + Math.random() * 0.3,
        color: palette[Math.floor(Math.random() * palette.length)]
      });
    }
    return temp;
  }, [count]);

  useEffect(() => {
    if (mesh.current) {
      const color = new THREE.Color();
      particles.forEach((p, i) => {
        color.set(p.color);
        mesh.current!.setColorAt(i, color);
      });
      mesh.current.instanceColor!.needsUpdate = true;
    }
  }, [particles]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!mesh.current) return;
    particles.forEach((p, i) => {
      p.position.y += p.velocity.y;
      p.position.x += Math.sin(state.clock.elapsedTime * p.sway.speed + p.sway.phase) * 0.01;
      p.rotation.x += 0.005;
      p.rotation.y += 0.01;

      if (p.position.y < -12) {
        p.position.y = 15;
        p.position.x = (Math.random() - 0.5) * 45;
      }

      dummy.position.copy(p.position);
      dummy.rotation.copy(p.rotation);
      dummy.scale.set(p.scale, p.scale, p.scale);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[leafGeometry, material, count]}>
      {/* Instance colors handled in useEffect */}
    </instancedMesh>
  );
};

// --- Main Hero ---

const renderLetters = (text: string, className: string = "") => {
  return text.split('').map((char, index) => (
    <span key={index} className={`inline-block ${className}`}>
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));
};




export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const floatImageRefWrapper = useRef<HTMLDivElement>(null);
  const floatImageRef = useRef<HTMLDivElement>(null);

  // Refs for specific text elements to animate
  const estRef = useRef<HTMLDivElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const jugnooref = useRef<HTMLDivElement>(null);
  const last = useRef({ x: 0, y: 0, time: performance.now() });
  const speed = useRef({ x: 0, y: 0 });



  const calculateSpeed = (currentX: number, currentY: number) => {
    const now = performance.now();
    const deltaTime = (now - last.current.time) / 1000;
    if (deltaTime > 0) {
      speed.current.x = (currentX - last.current.x) / deltaTime;
      speed.current.y = (currentY - last.current.y) / deltaTime;
    }
    last.current.x = currentX;
    last.current.y = currentY;
    last.current.time = now;
  };


  const handleImageMouseMove = (e: React.MouseEvent) => {

    if (!imageWrapperRef.current) return;
    const { clientX, clientY } = e;
    calculateSpeed(clientX, clientY);

    gsap.to(imageWrapperRef.current, {
      x: speed.current.x * 0.5,
      y: speed.current.y * 0.5,
      duration: 1,
      ease: "power2.out"
    })
  }

  // Mouse Move Parallax for Text
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!textContainerRef.current) return;
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 20;
    const y = (clientY / window.innerHeight - 0.5) * 20;

    gsap.to(textContainerRef.current, {
      x: x,
      y: y,
      duration: 1.5,
      ease: "power2.out"
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {

      // 1. Image Reveal (Masking)
      gsap.fromTo(imageWrapperRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.8,
          ease: "power4.inOut",
          delay: 0.2
        }
      );

      gsap.fromTo(imageInnerRef.current,
        { scale: 1.4 },
        { scale: 1, duration: 1.8, ease: "power4.inOut", delay: 0.2 }
      );

      gsap.fromTo(imageInnerRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.8,
          ease: "power4.inOut",
          delay: 0.2
        }
      );

      gsap.fromTo(imageInnerRef.current,
        { scale: 1.4 },
        { scale: 1, duration: 1.8, ease: "power4.inOut", delay: 0.2 }
      );


      // floating image reveal
      gsap.fromTo(floatImageRefWrapper.current,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.8,
          ease: "power4.inOut",
          delay: 0.4
        }
      );

      gsap.fromTo(floatImageRef.current,
        { scale: 1.4 },
        { scale: 1, duration: 1.8, ease: "power4.inOut", delay: 0.4 }
      );
      // 2. High-End Text Reveal Sequence
      const tl = gsap.timeline({ delay: 0.8 });

      // Est. Line
      tl.fromTo(estRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );

      // Letter-by-letter Title Animation
      tl.fromTo(".hero-char",
        {
          y: 60,
          opacity: 0,
          rotateX: -25
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.04,
          ease: "power3.out"
        },
        "-=0.8"
      );

      // Description (Staggered fade + slide)
      tl.fromTo(descRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.8"
      );

      // Buttons
      tl.fromTo(ctaRef.current?.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.7)" },
        "-=0.6"
      );

      // 3. Scroll Parallax
      gsap.to(imageWrapperRef.current, {
        y: 100,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleMouseMoveHero = (e: React.MouseEvent) => {
    const jugnoo = jugnooref.current;
    if (!jugnoo) return;

    const rect = containerRef.current!.getBoundingClientRect();
    // console.log(rect);

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    jugnoo.style.left = `${x - jugnoo.offsetWidth / 2}px`;
    jugnoo.style.top = `${y - jugnoo.offsetHeight / 2}px`;
  };





  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(el, {
        x: x * 0.05,
        y: y * 0.08,
        duration: 0.9,
        ease: "power3.out",
      });
    };

    const handleEnter = () => {
      gsap.to(el, {
        y: -6,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    const handleLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
      });
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseenter", handleEnter);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseenter", handleEnter);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);




  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMoveHero);
    return () => {
      window.removeEventListener("mousemove", handleMouseMoveHero);
    }
  }, [])




  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen pt-40 pb-24 overflow-hidden bg-[#050A06] flex items-center perspective-[2000px]"
    >

      <div ref={jugnooref} id='jugnoo' className='absolute z-[50] h-32 w-32  '>
        <img src={jugnoo} alt="jugnoo" className="w-32 h-33" />

      </div>


      {/* Background Image Layer (Dimmed) */}
      <div className="absolute inset-0 z-0">
        <ImageWithLoader
          src={backImage}
          alt="Luxury Texture Background"
          className="w-full h-full object-cover "
          containerClassName="w-full h-full"
        />
        {/* Heavy dimming overlay to ensure foreground visibility */}
        <div className="absolute inset-0 bg-[#050A06]/20 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Three.js Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 18], fov: 35 }} gl={{ alpha: true }}>
          <Rig />

          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 15, 10]} intensity={1.5} color="#FFF8E7" />
          <pointLight position={[-10, 5, 10]} intensity={0.8} color="#D4AF37" />
          <fog attach="fog" args={['#050A06', 10, 45]} />
          <FallingLeaves count={80} />

        </Canvas>
      </div>

      {/* Background Ambience */}
      <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[120%] bg-gradient-to-b from-[#152617] to-transparent rounded-full blur-[120px] opacity-20 pointer-events-none -z-10" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[80%] bg-[#0F1610] rounded-full blur-[100px] opacity-90 pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] pointer-events-none z-0 mix-blend-overlay"></div>

      <div className="container mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-20 items-center relative z-[50]">

        {/* Left: Content */}
        <div ref={textContainerRef} className="max-w-3xl relative will-change-transform">
          <div>
            <div ref={estRef} className="flex items-center gap-3 text-sage mb-10 overflow-hidden">
              <span className="w-16 h-[1px] bg-gold/60"></span>
              <p className="text-2xl inline uppercase tracking-[0.3em] font-bold text-gold/80">Since. 1998 </p>
            </div>

            <div ref={titleContainerRef} className="mb-12">
              <h1 className="font-serif text-8xl lg:text-[9.5rem] leading-[0.85] text-white tracking-tight drop-shadow-2xl origin-bottom-left block mix-blend-screen">
                {renderLetters("Sublime", "hero-char")}
              </h1>
              <span className="italic text-gold font-light block transform translate-x-4 font-serif text-7xl lg:text-[8rem] leading-[0.85] origin-bottom-left">
                {renderLetters("House of Tea", "hero-char")}
              </span>
            </div>

            <div className="overflow-hidden mb-20">
              <p ref={descRef} className="text-gray-200 text-lg lg:text-xl leading-loose max-w-lg font-sans font-light tracking-wide mix-blend-plus-lighter">
                Curating the finest tea leaves from the world’s most renowned gardens. A sip of purity, tradition, and luxury.
              </p>
            </div>

            <div
              ref={ctaRef}
              className="flex flex-wrap gap-8 z-[50] items-center relative"
            >
           
                <Button
                  // variant="gold"
                  // withIcon
                  className="text-lg font-medium "
                >
                  Discover Collections
                </Button>
             
            </div>

          </div>
        </div>

        {/* Right: Visual */}
        <div className="relative h-[650px] lg:h-[800px] w-full flex items-center justify-end">


          {/* Main Masked Image */}
          <div
            onMouseMove={handleImageMouseMove}
            ref={imageWrapperRef}
            className="relative w-full animate-float-slow lg:w-[90%] h-full overflow-hidden rounded-[1rem] shadow-2xl border border-white/5"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div ref={imageInnerRef} className="w-full h-full relative">
              <ImageWithLoader
                src={Banner1}
                alt="Luxury Tea"
                className="w-full  h-full  object-cover"
                containerClassName="w-full h-full"
              />
              {/* Overlay Gradient for cinematic look */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050A06]/90 via-[#050A06]/20 to-transparent opacity-90"></div>
              <div className="absolute inset-0 bg-[#152617]/30 mix-blend-overlay"></div>
            </div>

          </div>

          {/* Floating Detail Image */}
          <div
            ref={floatImageRefWrapper}
            style={{ transformStyle: "preserve-3d" }}
            className="absolute -bottom-10 -left-10 w-56 h-72 overflow-hidden rounded-lg border border-white/10 shadow-luxury z-20 animate-float-slow bg-[#050A06]">

            <div ref={floatImageRef} className='h-full w-full relative'>

              <ImageWithLoader
                src={Banner2}
                alt="Detail"
                className="w-full h-full object-cover opacity-90 grayscale-[20%]"
                containerClassName="w-full h-full"
              />

            </div>


          </div>
        </div>
      </div>

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
      `}</style>
    </section>
  );
};