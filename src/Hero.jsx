import React, { useEffect, useRef } from 'react'
import LogoCloud from './LogoCloud';
import gsap from 'gsap';

function Hero({ loaderFinished }) {
    // Refs for targeting elements in GSAP
    const bgRef = useRef(null);
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
        </main>
    )
}

export default Hero