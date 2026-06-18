import React, { useEffect, useRef } from 'react';
import LogoCloud from './LogoCloud';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heroData } from './data';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

function Hero({ loaderFinished }) {
    // 1. Added new refs for the section and the parallax image
    const sectionRef = useRef(null);
    const bgRef = useRef(null);
    const parallaxRef = useRef(null);
    const logoWrapperRef = useRef(null);
    const textLeftRef = useRef(null);
    const textRightRef = useRef(null);
    const subtextRef = useRef(null);

    useEffect(() => {
        gsap.set(bgRef.current, { scale: 1.5 });
        gsap.set(logoWrapperRef.current, { yPercent: 100, opacity: 0 });
        gsap.set(textLeftRef.current, { x: -100, opacity: 0 });
        gsap.set(textRightRef.current, { x: 100, opacity: 0 });
        gsap.set(subtextRef.current, { y: 30, opacity: 0 });
    }, []);

    // 2. The Main Timeline + Parallax
    useEffect(() => {
        if (!loaderFinished) return;

        // Wrap in GSAP context for easy React cleanup
        let ctx = gsap.context(() => {

            // --- INTRO ANIMATION ---
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

            // --- PARALLAX SCROLL ANIMATION ---
            gsap.to(parallaxRef.current, {
                yPercent: 25, // Pushes the image down slightly as you scroll up
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true, // Ties the animation strictly to the scrollbar
                }
            });
        });

        // Cleanup both the timeline and ScrollTrigger on unmount
        return () => ctx.revert();
    }, [loaderFinished]);

    return (
        <main className="bg-black min-h-screen">
            {/* Added sectionRef to trigger the parallax tracking */}
            <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-black">

                {/* Intro Scale Container */}
                <div ref={bgRef} className="absolute inset-0 w-full h-full">
                    {/* Parallax Image Container 
                        - Made it 120% height and pulled it up by 10% (-top-[10%]) 
                        - This gives it room to scroll without clipping 
                    */}
                    <div
                        ref={parallaxRef}
                        className="absolute w-full h-[120%] -top-[10%] bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: `url('${heroData.backgroundImage}')`,
                        }}
                    />
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-black from-20% to-transparent to-100%" />

                <div className="relative z-10 flex flex-col justify-center h-full py-6 md:py-12 px-6 md:px-12">
                    <h1 className="text-white text-6xl md:text-8xl lg:text-[110px] font-semibold leading-[0.95] tracking-tight max-w-5xl overflow-hidden flex flex-col md:block">
                        <span ref={textLeftRef} className="inline-block pr-4">{heroData.heading.line1}</span>
                        <br className="hidden md:block" />
                        <span ref={textRightRef} className="inline-block">{heroData.heading.line2}</span>
                    </h1>

                    <div ref={subtextRef} className="mt-8 flex flex-col gap-6">
                        <div className="max-w-md border-b border-white/30 pb-6">
                            <p className="text-white/80 text-lg md:text-xl font-light tracking-wider">
                                {heroData.subtext}
                            </p>
                        </div>

                        <button data-hover className="bg-white text-black w-max px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors">
                            {heroData.ctaText}
                        </button>
                    </div>
                </div>

                <div ref={logoWrapperRef} className="relative z-20">
                    <LogoCloud />
                </div>
            </section>
        </main>
    );
}

export default Hero;