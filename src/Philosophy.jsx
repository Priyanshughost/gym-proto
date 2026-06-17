import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const sectionRef = useRef(null);

  // Refs for the specific text lines
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3ContainerRef = useRef(null);
  const line3TopRef = useRef(null); // The white text that gets revealed

  const paragraphRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {

      // 1. Initial Setup
      gsap.set(line1Ref.current, { yPercent: 120 });
      gsap.set(line2Ref.current, { scale: 2, opacity: 0 });
      gsap.set(paragraphRef.current, { y: 30, opacity: 0 });
      gsap.set(line3TopRef.current, { clipPath: 'inset(0% 100% 0% 0%)' });

      // 2. The Main Entrance Timeline (Lines 1 & 2)
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          toggleActions: "play none none none",
        }
      });

      entranceTl
        .to(line1Ref.current, {
          yPercent: 0,
          duration: 1,
          ease: 'power4.out'
        })
        .to(line2Ref.current, {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'expo.out'
        }, "-=0.6");
      // Notice the paragraph animation was removed from here!

      // 3. The Scrub Timeline (Line 3)
      gsap.to(line3TopRef.current, {
        clipPath: 'inset(0% 0% 0% 0%)',
        ease: 'none',
        scrollTrigger: {
          trigger: line3ContainerRef.current,
          start: "top 80%",
          end: "top 40%",
          scrub: 1,
        }
      });

      // 4. NEW: Independent Paragraph Reveal
      // This fires purely based on the paragraph's physical position on the screen
      gsap.to(paragraphRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: paragraphRef.current, // Trigger is now the paragraph itself
          start: "top 85%", // Fires when the top of the paragraph reaches the lower 15% of the screen
          toggleActions: "play none none none",
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-black text-white flex items-center justify-center py-32 px-6 md:px-12 overflow-hidden font-sans"
    >
      <div className="flex flex-col w-full max-w-7xl">
        <p className="text-sm font-semibold tracking-widest uppercase text-white/50 mb-8 md:mb-12">
          [ Our Philosophy ]
        </p>

        <h2 className="text-[14vw] md:text-[10vw] leading-[0.85] font-bold tracking-tighter uppercase flex flex-col">

          {/* LINE 1: Mask Reveal */}
          {/* overflow-hidden acts as the invisible box */}
          <span className="block overflow-hidden pb-4">
            <span ref={line1Ref} className="block">No gimmicks.</span>
          </span>

          {/* LINE 2: The Scale Slam */}
          {/* text-white/30 provides the base muted color, we animate CSS opacity over it */}
          <span
            ref={line2Ref}
            className="block text-white/30 italic pr-8 md:pr-16 text-right transform-origin-center"
          >
            Just gravity.
          </span>

          {/* LINE 3: The Scrub */}
          {/* Relative container holds the two overlapping layers */}
          <span ref={line3ContainerRef} className="block relative mt-4 md:mt-0">
            {/* Base layer: Faded out */}
            <span className="block text-white/10">And grit.</span>
            {/* Top layer: Pure white, hidden initially by GSAP clip-path */}
            <span
              ref={line3TopRef}
              className="block absolute top-0 left-0 text-white w-full"
            >
              And grit.
            </span>
          </span>

        </h2>

        <div ref={paragraphRef} className="mt-16 md:mt-24 ml-auto w-full max-w-md">
          <p className="text-lg md:text-xl font-light text-white/80 leading-relaxed">
            We strip away the noise. No trendy workouts, no miracle supplements, and no ego. Just raw equipment, ruthless discipline, and a space built for those who put in the work.
          </p>
        </div>
      </div>
    </section>
  );
}