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
    const lenis = new Lenis({
      lerp: 0.05,
      wheelMultiplier: 0.8,
      smoothWheel: true,
      smoothTouch: false,
    });

    // 🔴 ADD THIS: Expose lenis globally so the Modal can access it
    window.lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const resizeObserver = new ResizeObserver(() => ScrollTrigger.refresh());
    resizeObserver.observe(document.body);

    return () => {
      lenis.destroy();
      // 🔴 ADD THIS: Cleanup the global variable
      delete window.lenis;
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