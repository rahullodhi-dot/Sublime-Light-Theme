import React, { useRef, useMemo, useEffect } from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import bottomTree from "../assest/bottomTree.png"


/* ---------------- CAMERA RIG ---------------- */
const Rig = () => {
  const { camera, mouse } = useThree();
  const vec = new THREE.Vector3();

  useFrame(() => {
    vec.set(mouse.x * 1.2, mouse.y * 1.2, camera.position.z);
    camera.position.lerp(vec, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return null;
};

/* ---------------- FALLING LEAVES ---------------- */
const FallingLeaves = ({ count = 60 }) => {
  const mesh = useRef<THREE.InstancedMesh>(null!);

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.3, 0.3, 0.3, 0.8, 0, 1);
    shape.bezierCurveTo(-0.3, 0.8, -0.3, 0.3, 0, 0);
    return new THREE.ShapeGeometry(shape);
  }, []);

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.9,
        roughness: 0.35,
        metalness: 0.4,
        emissive: new THREE.Color("#1a2f1c"),
        emissiveIntensity: 0.15,
      }),
    []
  );

  const particles = useMemo(() => {
    const colors = ["#FFD700", "#C8A97E", "#E8EDE6", "#FFFFFF"];
    return Array.from({ length: count }).map(() => ({
      pos: new THREE.Vector3(
        (Math.random() - 0.5) * 40,
        Math.random() * 20,
        (Math.random() - 0.5) * 25
      ),
      rot: new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        0
      ),
      speed: 0.01 + Math.random() * 0.02,
      sway: Math.random() * Math.PI * 2,
      scale: 0.25 + Math.random() * 0.35,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    const color = new THREE.Color();
    particles.forEach((p, i) => {
      color.set(p.color);
      mesh.current.setColorAt(i, color);
    });
    mesh.current.instanceColor!.needsUpdate = true;
  }, [particles]);

  useFrame(({ clock }) => {
    particles.forEach((p, i) => {
      p.pos.y -= p.speed;
      p.pos.x += Math.sin(clock.elapsedTime + p.sway) * 0.01;
      p.rot.x += 0.004;
      p.rot.y += 0.006;

      if (p.pos.y < -12) {
        p.pos.y = 15;
      }

      dummy.position.copy(p.pos);
      dummy.rotation.copy(p.rot);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[geometry, material, count]} />
  );
};

/* ---------------- FOOTER ---------------- */
export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#152617] text-[#E8EDE6] overflow-hidden">

    <div className="absolute top-0 left-0 h-full">
  <img
    src={bottomTree}
    alt=""
    className="opacity-20 w-full  h-auto object-contain"
  />
</div>
 {/* <div className="absolute top-0 right-0 w-64 scale-x-[-1]">
  <img
    src={bottomTree}
    alt=""
    className="opacity-60 h-full object-contain"
  />
</div> */}

      
      {/* THREE BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 18], fov: 35 }}>
          <Rig />
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 15, 10]} intensity={1.3} color="#FFF4D6" />
          <pointLight position={[-10, 5, 10]} intensity={0.6} color="#C8A97E" />
          <fog attach="fog" args={["#0b140e", 18, 60]} />
          <FallingLeaves count={window.innerWidth < 768 ? 35 : 70} />
        </Canvas>
      </div>

      {/* SOFT GOLD GLOW */}
      <div className="absolute -top-40 left-0 w-[600px] h-[600px] bg-gold/10 blur-[200px] rounded-full" />

      <div className="relative z-10 container mx-auto px-6 lg:px-12 pt-20 pb-10">

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-12 gap-16 border-b border-white/10 pb-14">

          {/* LEFT */}
          <div className="lg:col-span-6">
            <h2 className="font-serif text-5xl mb-6 leading-tight">
              Sublime <br /> House of Tea
            </h2>

            <p className="text-white/50 max-w-md mb-8 leading-relaxed">
              Subscribe for exclusive blends, private tastings,
              and heritage stories.
            </p>

            <div className="flex max-w-md border-b border-white/20 focus-within:border-gold transition">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-transparent w-full py-3 outline-none text-white placeholder:text-white/30"
              />
              <button className="text-gold uppercase tracking-[0.3em] text-xs font-bold hover:text-white transition">
                Join
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-6 grid sm:grid-cols-3 gap-12">

            {/* EXPLORE */}
            <div>
              <h4 className="footer-heading">Explore</h4>
              <ul className="footer-links">
                <li><a className="footer-link" href="#">Our Story</a></li>
                <li><a className="footer-link" href="#">Collections</a></li>
                <li><a className="footer-link" href="#">Gifting</a></li>
                <li><a className="footer-link" href="#">Journal</a></li>
              </ul>
            </div>

            {/* CONTACT */}
            <div>
              <h4 className="footer-heading">Contact</h4>
              <p className="footer-link">123 Tea Garden Road<br />Bangalore, India</p>
              <p className="footer-link mt-3">+91 1234 567 890</p>
              <p className="footer-link mt-3">hello@sublimehouseoftea.com</p>
            </div>

            {/* SOCIAL */}
            <div>
              <h4 className="footer-heading">Social</h4>
              <ul className="space-y-4">
                <li><a className="footer-social" href="#"><Facebook /> Facebook</a></li>
                <li><a className="footer-social" href="#"><Instagram /> Instagram</a></li>
                <li><a className="footer-social" href="#"><Twitter /> Twitter</a></li>
              </ul>
            </div>

          </div>
        </div>

        {/* BOTTOM */}
        <div className="pt-8 flex flex-col md:flex-row justify-between text-[10px] tracking-[0.3em] uppercase text-white/30">
          <p>© 2024 Sublime House of Tea</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
          </div>
        </div>
      </div>

      {/* STYLES */}
      <style>{`
        .footer-heading {
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          margin-bottom: 1.5rem;
          font-weight: 700;
        }

        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .footer-link {
          color: rgba(255,255,255,0.7);
          transition: color 0.3s ease;
        }

        .footer-link:hover {
          color: #C8A97E;
        }

        .footer-social {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          color: rgba(255,255,255,0.7);
          transition: color 0.3s ease;
        }

        .footer-social svg {
          width: 14px;
          height: 14px;
        }

        .footer-social:hover {
          color: #C8A97E;
          filter: drop-shadow(0 0 6px rgba(200,169,126,0.6));
        }
      `}</style>
    </footer>
  );
};
