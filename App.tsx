import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
    // Refresh ScrollTrigger
    ScrollTrigger.refresh();
  }, [pathname]);

  return (
    <div className="bg-ivory text-forest font-sans selection:bg-forest selection:text-white overflow-x-hidden flex flex-col min-h-screen relative">
      {/* Global Grain Texture */}
      <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.035] mix-blend-multiply bg-noise bg-repeat"></div>
      
      <Navbar />
      <main className="flex-grow relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;