import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Nav from './Nav';
import LogoCloud from './LogoCloud';
import CursorDot from './CursorDot';
import PageLoader from './PageLoader';
import Philosophy from './Philosophy';
import Facility from './Facility';
import Trainers from './Trainers';
import Footer from './Footer';

// Register ScrollTrigger globally
gsap.registerPlugin(ScrollTrigger);

function App() {
  // State to trigger the hero animation
  const [loaderFinished, setLoaderFinished] = useState(false);

  // Refs for targeting elements in GSAP
  const bgRef = useRef(null);
  const logoWrapperRef = useRef(null);
  const textLeftRef = useRef(null);
  const textRightRef = useRef(null);
  const subtextRef = useRef(null);

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

  // 1. Immediate Initializer (Hero)
  useEffect(() => {
    gsap.set(bgRef.current, { scale: 1.5 });
    gsap.set(logoWrapperRef.current, { yPercent: 100, opacity: 0 });
    gsap.set(textLeftRef.current, { x: -100, opacity: 0 });
    gsap.set(textRightRef.current, { x: 100, opacity: 0 });
    gsap.set(subtextRef.current, { y: 30, opacity: 0 });
  }, []);

  // 2. The Main Timeline (Hero)
  useEffect(() => {
    if (!loaderFinished) return;

    const tl = gsap.timeline();

    tl.to(
      bgRef.current,
      { scale: 1, duration: 2.5, ease: 'power2.out' },
      0
    )
      .to(
        [logoWrapperRef.current],
        { yPercent: 0, opacity: 1, duration: 1.2, ease: 'expo.out' },
        0.1
      )
      .to(
        textLeftRef.current,
        { x: 0, opacity: 1, duration: 1, ease: 'back.out(1.5)' },
        0.4
      )
      .to(
        textRightRef.current,
        { x: 0, opacity: 1, duration: 1, ease: 'back.out(1.5)' },
        "<"
      )
      .to(
        subtextRef.current,
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        "-=0.6"
      );

    return () => tl.kill();
  }, [loaderFinished]);

  return (
    <>
      <CursorDot />

      <PageLoader onComplete={() => setLoaderFinished(true)} />

      {/* Wrapping the main content ensures Lenis scrolls the body correctly */}
      <main className="bg-black min-h-screen">
        <section className="relative h-screen w-full overflow-hidden bg-black">
          <div
            ref={bgRef}
            className="absolute inset-0 w-full h-full"
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=500&auto=format&fit=crop&q=60')",
              }}
            />
          </div>

          <div className="absolute inset-0 bg-linear-to-r from-black from-20% to-black/30 to-100%" />

          <Nav loaderFinished={loaderFinished} />

          <div className="relative z-10 flex flex-col justify-center h-full py-6 md:py-12 px-6 md:px-12">
            <h1 className="text-white text-6xl md:text-8xl lg:text-[110px] font-semibold leading-[0.95] tracking-tight max-w-5xl overflow-hidden flex flex-col md:block">
              <span ref={textLeftRef} className="inline-block pr-4">Relentless effort,</span>
              <br className="hidden md:block" />
              <span ref={textRightRef} className="inline-block">Real results.</span>
            </h1>

            <div ref={subtextRef} className="mt-8 flex flex-col gap-6">
              <div className="max-w-md border-b border-white/30 pb-6">
                <p className="text-white/80 text-lg md:text-xl font-light tracking-wider">
                  For Athletes, Powerlifters, and Everyday Grinders.
                </p>
              </div>

              <button data-hover className="bg-white text-black w-max px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors">
                Start Training
              </button>
            </div>
          </div>

          <div ref={logoWrapperRef} className="relative z-20">
            <LogoCloud />
          </div>
        </section>

        <Philosophy />
        <Facility />
        <Trainers />
        <Footer />
      </main>
    </>
  )
}

export default App