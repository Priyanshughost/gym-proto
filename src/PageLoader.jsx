import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function PageLoader({ onComplete }) {
    const containerRef = useRef(null);
    const percentRef = useRef(null);
    const barRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                // Fade out the entire black overlay smoothly
                gsap.to(containerRef.current, {
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.inOut",
                    onComplete: () => {
                        if (containerRef.current) containerRef.current.style.display = 'none';
                        if (onComplete) onComplete(); // Triggers your Hero animation
                    }
                });
            }
        });

        // Object to hold our percentage value for GSAP to animate
        let counter = { value: 0 };

        // 1. Animate the percentage number
        tl.to(counter, {
            value: 100,
            duration: 1.5, // 1.5 seconds to load
            ease: "expo.out",
            onUpdate: () => {
                if (percentRef.current) {
                    // Update the DOM text directly for performance
                    percentRef.current.textContent = Math.round(counter.value) + "%";
                }
            }
        });

        // 2. Animate the tiny progress bar at the exact same time
        tl.to(barRef.current, {
            scaleX: 1,
            duration: 1.5,
            ease: "expo.out"
        }, "<"); // The "<" symbol tells GSAP to run this simultaneously with the counter

        return () => tl.kill();
    }, [onComplete]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[999] bg-black pointer-events-none flex items-end justify-end p-8 md:p-12"
        >
            {/* The Minimalist Bottom Right Loader */}
            <div className="flex flex-col items-end gap-2 text-white">
                <span
                    ref={percentRef}
                    // tabular-nums keeps the numbers from shifting left/right as they change
                    className="text-4xl md:text-5xl font-black tabular-nums tracking-tighter leading-none"
                >
                    0%
                </span>

                {/* Tiny sleek progress bar underneath */}
                <div className="w-16 h-[2px] bg-white/20 rounded-full overflow-hidden">
                    <div
                        ref={barRef}
                        className="h-full w-full bg-white origin-left scale-x-0"
                    />
                </div>
            </div>
        </div>
    );
}