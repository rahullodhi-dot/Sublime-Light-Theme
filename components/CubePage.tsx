import React, { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* 👇 IMPORT YOUR IMAGES HERE */
import img1 from "../assest/BerryHoney (1).png"
import img2 from "../assest/Cumin (1).png"
import img3 from "../assest/Cardamom (1).png"
import img4 from "../assest/Mustard (1).png"
import img5 from "../assest/Walnuts.png"
import img6 from "../assest/Raisins.png"
import BlackPepper from "../assest/BlackPepper.png"
import MultiFloral from "../assest/MultiFloral.png"
import round1 from "../assest/roound1.png"

/* ===================== */
/* 🎲 CUBE COMPONENT */
/* ===================== */
const ImageCube = () => {
  const cubeRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  /* Load textures */
  const textures = [
    new THREE.TextureLoader().load(img1), // front
    new THREE.TextureLoader().load(img2), // back
    new THREE.TextureLoader().load(img3), // top
    new THREE.TextureLoader().load(img4), // bottom
    new THREE.TextureLoader().load(img5), // right
    new THREE.TextureLoader().load(img6), // left
  ];

  const materials = textures.map(
    (tex) =>
      new THREE.MeshStandardMaterial({
        map: tex,
        roughness: 0.4,
        metalness: 0.1,
      })
  );

  /* Mouse-based rotation */
  useFrame(() => {
    if (!cubeRef.current) return;

    cubeRef.current.rotation.y = THREE.MathUtils.lerp(
      cubeRef.current.rotation.y,
      mouse.x * Math.PI * 0.5,
      0.08
    );

    cubeRef.current.rotation.x = THREE.MathUtils.lerp(
      cubeRef.current.rotation.x,
      -mouse.y * Math.PI * 0.5,
      0.08
    );
  });

  return (
    <mesh ref={cubeRef} material={materials} castShadow receiveShadow>
      <boxGeometry args={[3, 3, 3]} />
    </mesh>
  );
};

/* ===================== */
/* 🌍 MAIN PAGE */
/* ===================== */
const CubePage = () => {
  return (
    <div className="w-full h-screen bg-black">
      <Canvas
        shadows
        camera={{ position: [0, 0, 7], fov: 45 }}
      >
        {/* LIGHTS */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.2}
          castShadow
        />
        <spotLight
          position={[-5, 6, 4]}
          angle={0.35}
          penumbra={1}
          intensity={1.5}
        />

        {/* CUBE */}
        <ImageCube />
      </Canvas>
    </div>
  );
};

export default CubePage;
