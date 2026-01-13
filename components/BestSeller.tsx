import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  ContactShadows,
  Float,
  Sparkles,
  useGLTF,
  Bounds,
  Center,
} from "@react-three/drei";
import * as THREE from "three";
import { Button } from "./Button";
import backImage from "../assest/bck.png";
import borderImage from "../assest/border.png";
gsap.registerPlugin(ScrollTrigger);

/* ------------------ GLB MODEL ------------------ */

const TeaModel = () => {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { scene } = useGLTF("public/models/container.glb");

  useFrame(() => {
    if (!group.current) return;

    // slow rotation
    group.current.rotation.y += 0.010;

    // hover tilt
    const targetX = hovered ? 0.25 : 0;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      targetX,
      0.5
    );

    //  ZOOM IN / OUT
    const targetScale = hovered ? 1.2 : 1.25;
    const currentScale = group.current.scale.x;

    const smoothScale = THREE.MathUtils.lerp(
      currentScale,
      targetScale,
      0.08
    );

    group.current.scale.set(
      smoothScale,
      smoothScale,
      smoothScale
    );
  });


  return (
    <group intensity={0}
      ref={group}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
};

/* ------------------ CAMERA RIG ------------------ */

const CameraRig = () => {
  //   const { camera, mouse } = useThree();
  //   const vec = new THREE.Vector3();

  //   useFrame(() => {
  //     camera.position.lerp(
  //       vec.set(mouse.x * 0.4, mouse.y * 0.4, 6),
  //       0.05
  //     );
  //     camera.lookAt(0, 0, 0);
  //   });

  //   return null;
};

/* ------------------ SCENE ------------------ */

const Scene = () => (
  <>
    <CameraRig />

    {/* <ambientLight intensity={0} /> */}
    {/* <spotLight position={[10, 10, 10]} intensity={0} /> */}
    {/* <pointLight position={[-10, -10, 10]} intensity={0} color="#C8A97E" /> */}

    <Environment preset="warehouse" />

    <Bounds fit clip observe margin={1.5}>
      <Float speed={0.5} rotationIntensity={0.25} floatIntensity={0.4}>
        <TeaModel />
      </Float>
    </Bounds>

    <Sparkles count={30} scale={3} size={8} speed={0.4} color="#C8A97E" />
    <ContactShadows position={[0, -1, 0]} opacity={0.4} blur={2.5} />
  </>
);

/* ------------------ TEXT UTILS ------------------ */

const renderLetters = (text: string, className = "") => {
  return text.split(" ").map((word, wordIndex) => (
    <span
      key={wordIndex}
      className="inline-flex whitespace-nowrap mr-4"
    >
      {word.split("").map((char, charIndex) => (
        <span
          key={charIndex}
          className={`inline-block ${className}`}
        >
          {char}
        </span>
      ))}
    </span>
  ));
};


/* ------------------ MAIN SECTION ------------------ */


import { RoundedBox } from "@react-three/drei";
import { url } from "inspector/promises";
// import { useFrame } from "@react-three/fiber";
// import { useRef } from "react";
// import * as THREE from "three";

const Card3D = ({ children }: { children: React.ReactNode }) => {
  const cardRef = useRef<THREE.Group>(null);

  useFrame(({ mouse }) => {
    if (!cardRef.current) return;

    // smooth luxury tilt
    cardRef.current.rotation.y = THREE.MathUtils.lerp(
      cardRef.current.rotation.y,
      mouse.x * 0.25,
      0.05
    );

    cardRef.current.rotation.x = THREE.MathUtils.lerp(
      cardRef.current.rotation.x,
      -mouse.y * 0.15,
      0.05
    );
  });

  return (
    <group ref={cardRef} position={[0, 0, 0]}>
      {/* SOFT CONTACT SHADOW */}
      <mesh
        position={[0, -2.4, -1.2]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[6.4, 4.4]} />
        <shadowMaterial opacity={0.25} />
      </mesh>

      {/* CARD BODY */}
      <RoundedBox
        args={[6, 4, 0.4]} // width, height, depth
        radius={0.3}
        smoothness={8}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color="#121212"
          metalness={0.35}
          roughness={0.28}
        />
      </RoundedBox>

      {/* CONTENT LAYER */}
      <group position={[0, 0, 0.22]}>
        {children}
      </group>
    </group>
  );
};



export const ShowcaseSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play reverse play reverse",
        },
      });

      tl.from(canvasRef.current, {
        y: 80,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      })
        .from(
          textRef.current?.querySelector(".showcase-label"),
          {
            y: 20,
            opacity: 0,
            duration: 0.4,
            ease: "power3.out",
          },
          "-=0.8"
        )
        .from(
          textRef.current?.querySelectorAll(".showcase-char"),
          {
            y: 60,
            opacity: 0,
            rotateX: 25,
            duration: 0.5,
            stagger: 0.03,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .from(
          textRef.current?.querySelectorAll(".showcase-fade"),
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=0.5"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ===== Background Image ===== */}
      <div
        className="
      absolute inset-0
      bg-[url('../assest/bck.png')]
      bg-cover bg-center
      mix-blend-overlay
    
      pointer-events-none
    
      z-0
    "
      />

      {/* Optional dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/30 z-0 pointer-events-none" />

      {/* ===== Content ===== */}
      <div className="relative z-10 max-w-[1180px] mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">

        {/* TEXT */}
        <div ref={textRef}>
          <div className="showcase-label flex items-center gap-4 mt-6">
            <div className="w-12 h-px bg-[#C8A97E]" />
            <span className="uppercase tracking-widest text-xs font-gotham text-[#C8A97E]">
              Limited Edition
            </span>
          </div>

          <h2 className="font-serif text-5xl text-gold lg:text-7xl mb-8 leading-[0.9]">
            <span className="block">
              {renderLetters("Limited Edition", "showcase-char text-2xl font-buttain")}
            </span>
            <span className="block">
              {renderLetters("Signature Release", "showcase-char font-buttain text-3xl")}
            </span>
          </h2>


          <div className="showcase-fade space-y-6 mb-10 text-[#E6E3DC]">
            <p className="text-sm font-gotham opacity-80">
              A rare expression of craftsmanship, created for those who seek the exceptional. This limited-edition selection represents the pinnacle of our tea-making philosophy — sourced from a single origin, harvested at its most expressive moment, and crafted in small batches to preserve its purity.
            </p>
            <p className="text-sm font-gotham opacity-80">
              Only available for a short time, each leaf is carefully chosen for its character, aroma, and depth, resulting in a cup that is both elegant and unforgettable. Subtle, complex, and beautifully balanced, this release is a celebration of seasonality and precision.
              Presented in our handcrafted collector’s canister, this edition is produced in strictly limited quantities and will not be restocked once sold out.
            </p>
          </div>

          <div className="showcase-fade">
            <Button className="text-xs">Reserve Yours</Button>
          </div>
        </div>

        {/* 3D CANVAS */}
        <div className="h-[80vh] p w-full relative">
          <div className="absolute h-[100%] w-full top-0">
            <img src={borderImage} alt="" className="h-full w-full" />
          </div>
          <Canvas
            shadows
            className="w-full h-full rounded-xl"
            camera={{ position: [0, 0, 7], fov: 40 }}
          >
            <ambientLight intensity={0.4} />
            <directionalLight position={[4, 4, 6]} intensity={1.2} />
            <spotLight
              position={[-6, 6, 4]}
              angle={0.4}
              penumbra={1}
              intensity={1.4}
              castShadow
            />
            <Scene />
          </Canvas>
        </div>

      </div>
    </section>

  );
};

/* ------------------ PRELOAD ------------------ */
useGLTF.preload("Public/models/tea.glb");
