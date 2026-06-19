import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export default function PageLoader({ onComplete }) {
    const containerRef = useRef(null);

    const leftHalfRef = useRef(null);
    const rightHalfRef = useRef(null);

    const leftTextRef = useRef(null);
    const rightTextRef = useRef(null);

    const leftCrackRef = useRef(null);
    const rightCrackRef = useRef(null);

    const counterRef = useRef(null);

    useLayoutEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                if (containerRef.current) containerRef.current.style.display = 'none';
                if (onComplete) onComplete();
            }
        });

        gsap.set([leftTextRef.current, rightTextRef.current], { yPercent: 120 });
        gsap.set([leftCrackRef.current, rightCrackRef.current], { scaleY: 0, opacity: 1 }); // Ensure opacity starts at 1

        const counter = { val: 0 };

        // 1. THE COUNTER
        tl.to(counter, {
            val: 100,
            duration: 2.4,
            ease: 'power2.inOut',
            onUpdate: () => {
                if (counterRef.current) {
                    counterRef.current.innerText = Math.round(counter.val);
                }
            }
        }, 0);

        // 2. TEXT REVEAL
        tl.to([leftTextRef.current, rightTextRef.current], {
            yPercent: 0,
            duration: 1.4,
            ease: 'power4.out',
        }, 0.5)

            // 3. THE CRACK (Smooth Slice)
            .to([leftCrackRef.current, rightCrackRef.current], {
                scaleY: 1,
                duration: 0.6,
                ease: 'power3.out'
            }, "-=0.2")

            // 4. THE SPLIT REVEAL
            .to(leftHalfRef.current, {
                xPercent: -100,
                duration: 1.6,
                ease: 'power4.in',
            }, "-=0.1")

            .to(rightHalfRef.current, {
                xPercent: 100,
                duration: 1.6,
                ease: 'power4.in'
            }, "<") // Fires at the exact same time as the left half

            // 5. FADE OUT THE CRACK (NEW ADDITION)
            // "<" makes this fire at the exact same time the panels start splitting
            .to([leftCrackRef.current, rightCrackRef.current], {
                opacity: 0,
                duration: 0.3, // Quick fade out so it disappears as the gap widens
                ease: 'power2.out'
            }, "<");

        return () => tl.kill();
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[999] font-sans overflow-hidden"
        >
            {/* LEFT HALF */}
            {/* Added will-change-transform for GPU acceleration */}
            <div
                ref={leftHalfRef}
                className="absolute inset-0 bg-black flex items-center justify-center text-white will-change-transform"
                style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }}
            >
                <div
                    ref={leftCrackRef}
                    className="absolute left-1/2 top-0 bottom-0 w-px bg-white origin-center -translate-x-full"
                />

                <div className="overflow-hidden pb-2 relative z-10">
                    <h1
                        ref={leftTextRef}
                        className="text-4xl md:text-6xl font-bold tracking-tighter px-2"
                    >
                        GYM NAME
                    </h1>
                </div>
            </div>

            {/* RIGHT HALF */}
            <div
                ref={rightHalfRef}
                className="absolute inset-0 bg-black flex items-center justify-center text-white will-change-transform"
                style={{ clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)' }}
            >
                <div
                    ref={rightCrackRef}
                    className="absolute left-1/2 top-0 bottom-0 w-px bg-white origin-center"
                />

                <div className="overflow-hidden pb-2 relative z-10">
                    <h1
                        ref={rightTextRef}
                        className="text-4xl md:text-6xl font-bold tracking-tighter px-2"
                    >
                        GYM NAME
                    </h1>
                </div>

                {/* Added tabular-nums to prevent the % sign from jittering */}
                <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 opacity-70">
                    <span className="text-[11px] md:text-xs font-light tracking-[0.2em] uppercase font-mono tabular-nums">
                        <span ref={counterRef}>0</span>%
                    </span>
                </div>
            </div>
        </div>
    );
}