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
    // 1. Instantiate Lenis with PHYSICS-BASED settings (Lerp)
    const lenis = new Lenis({
      lerp: 0.05, // Lower = smoother and more floaty. 0.05 is the sweet spot.
      wheelMultiplier: 0.8, // Slightly reduces the distance of each mouse wheel tick
      smoothWheel: true,
      smoothTouch: false, // Let mobile devices use native swipe momentum
    });

    // 2. Force ScrollTrigger to update every time Lenis scrolls
    lenis.on('scroll', ScrollTrigger.update);

    // 3. The Master Sync: Hook Lenis's rAF into GSAP's global ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // 4. Disable GSAP's built-in lag smoothing to prevent conflicts
    gsap.ticker.lagSmoothing(0);

    // 5. NEW: Failsafe to recalculate triggers if the DOM shifts or resizes
    const resizeObserver = new ResizeObserver(() => ScrollTrigger.refresh());
    resizeObserver.observe(document.body);

    // 6. Cleanup on unmount
    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      resizeObserver.disconnect();
    };
  }, []);


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

export default App