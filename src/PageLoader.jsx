import React, { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export default function PageLoader({ onComplete }) {
    const containerRef = useRef(null);

    const leftHalfRef = useRef(null);
    const rightHalfRef = useRef(null);

    const leftTextRef = useRef(null);
    const rightTextRef = useRef(null);

    // NEW: Refs for the crack elements
    const leftCrackRef = useRef(null);
    const rightCrackRef = useRef(null);

    useLayoutEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                if (containerRef.current) containerRef.current.style.display = 'none';
                if (onComplete) onComplete();
            }
        });

        // Your gsap.set will now fire BEFORE the screen paints
        gsap.set([leftTextRef.current, rightTextRef.current], { yPercent: 120 });
        gsap.set([leftCrackRef.current, rightCrackRef.current], { scaleY: 0 });

        // 2. TEXT REVEAL
        tl.to([leftTextRef.current, rightTextRef.current], {
            yPercent: 0,
            duration: 1.2,
            ease: 'power4.out'
        })

            // 3. THE CRACK (The "Slice" effect)
            // Shoots from the center to the top and bottom simultaneously
            .to([leftCrackRef.current, rightCrackRef.current], {
                scaleY: 1,
                duration: 0.4,
                ease: 'expo.in' // A fast, sharp ease for a slicing motion
            }, "+=0.1") // Fires just a fraction of a second after the text settles

            // 4. THE SPLIT REVEAL
            // Wait a tiny beat so the user registers the crack, then violently pull apart
            .to(leftHalfRef.current, {
                xPercent: -100,
                duration: 1.5,
                ease: 'expo.in',
            }, "+=0.1")

            .to(rightHalfRef.current, {
                xPercent: 100,
                duration: 1.5,
                ease: 'expo.in'
            }, "<");

        return () => tl.kill();
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-999 font-sans overflow-hidden"
        >
            {/* LEFT HALF */}
            <div
                ref={leftHalfRef}
                className="absolute inset-0 bg-black flex items-center justify-center text-white"
                style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }}
            >
                {/* NEW: Left half of the crack. 
            Placed exactly at 50% (the split line) and shifted left by its own width. */}
                <div
                    ref={leftCrackRef}
                    className="absolute left-1/2 top-0 bottom-0 w-px bg-white origin-center -translate-x-full"
                />

                {/* Text Mask Wrapper. Made relative z-10 so it sits ON TOP of the crack line. */}
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
                className="absolute inset-0 bg-black flex items-center justify-center text-white"
                style={{ clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)' }}
            >
                {/* NEW: Right half of the crack. 
            Placed exactly at 50% (the split line) so it touches the left half. */}
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
            </div>
        </div>
    );
}