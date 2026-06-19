import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Nav from './Nav';
import CursorDot from './CursorDot';
import PageLoader from './PageLoader';
import Footer from './Footer';
import Home from './route/Home';

// Register ScrollTrigger globally
gsap.registerPlugin(ScrollTrigger);

function App() {
  // State to trigger the hero animation
  const [loaderFinished, setLoaderFinished] = useState(false);

  // --------------------------------------------------------
  // THE LENIS & GSAP ENGINE (UPDATED FOR MAXIMUM SMOOTHNESS)
  // --------------------------------------------------------
  useEffect(() => {
    // 1. HARD LOCK NATIVE SCROLL (Bulletproof fallback)
    document.body.style.overflow = 'hidden';

    const lenis = new Lenis({
      lerp: 0.05,
      wheelMultiplier: 0.8,
      smoothWheel: true,
      smoothTouch: false,
    });

    window.lenis = lenis;

    // 2. PAUSE THE LENIS ENGINE IMMEDIATELY
    lenis.stop();

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const resizeObserver = new ResizeObserver(() => ScrollTrigger.refresh());
    resizeObserver.observe(document.body);

    return () => {
      lenis.destroy();
      delete window.lenis;
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      resizeObserver.disconnect();
    };
  }, []);

  // --------------------------------------------------------
  // WATCH FOR LOADER COMPLETION
  // --------------------------------------------------------
  useEffect(() => {
    if (loaderFinished) {
      // 3. UNLOCK NATIVE SCROLL AND RESTART LENIS
      document.body.style.overflow = '';
      if (window.lenis) {
        window.lenis.start();
      }
    }
  }, [loaderFinished]);

  return (
    <>
      <CursorDot />
      <PageLoader onComplete={() => setLoaderFinished(true)} />
      <Nav loaderFinished={loaderFinished} />
      <Home loaderFinished={loaderFinished} />
      <Footer />
    </>
  )
}

export default App;