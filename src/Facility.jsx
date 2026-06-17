import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Facility() {
    const sectionRef = useRef(null);

    // Outer Wrapper Refs (For Phase 1: Grid Deformation)
    const wrapper1Ref = useRef(null); // The Anchor
    const wrapper2Ref = useRef(null); // The Floater
    const wrapper3Ref = useRef(null); // The Heavy Drag

    // Inner Image Refs (For Phase 2: The 3D Window)
    const img1Ref = useRef(null);
    const img2Ref = useRef(null);
    const img3Ref = useRef(null);

    useGSAP(() => {

        // --------------------------------------------------------
        // PHASE 1: GRID DEFORMATION (Outer Wrappers)
        // --------------------------------------------------------

        // Image 1 acts as the anchor, so it scrolls naturally with the page. No GSAP needed!

        // Image 2 (The Floater): Moves UP faster than the page scrolls
        gsap.to(wrapper2Ref.current, {
            y: -550, // Floats 150px upwards
            ease: 'none',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom', // Starts when the top of the section hits the bottom of the screen
                end: 'bottom top',   // Ends when the bottom of the section leaves the top
                scrub: 1, // Smooth 1-second lag
            }
        });

        // Image 3 (The Heavy Drag): Moves UP slower (effectively dragging downwards)
        gsap.to(wrapper3Ref.current, {
            y: 150, // Drags 120px downwards relative to the natural scroll
            ease: 'none',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
            }
        });


        // --------------------------------------------------------
        // PHASE 2: THE 3D WINDOW (Inner Image Parallax)
        // --------------------------------------------------------

        // Pre-scale the images so they have room to move inside their wrappers without tearing the edges
        const images = [img1Ref.current, img2Ref.current, img3Ref.current];
        gsap.set(images, { scale: 1.25, transformOrigin: 'center center' });

        // Apply the exact same parallax scrub to all three images
        images.forEach((img) => {
            // Start the image slightly pushed up
            gsap.set(img, { yPercent: -10 });

            // Scrub it downwards as the user scrolls
            gsap.to(img, {
                yPercent: 10,
                ease: 'none',
                scrollTrigger: {
                    // Trigger the animation based on each image's specific wrapper entering the screen
                    trigger: img.parentElement,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true, // Using true instead of 1 keeps the inner image locked perfectly to the scroll wheel
                }
            });
        });

    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="relative w-full min-h-screen bg-black text-white py-32 px-6 md:px-12 font-sans z-10">

            {/* Section Header */}
            <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24">
                <h2 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase leading-none">
                    The Facility
                </h2>
                <p className="mt-6 md:mt-0 text-white/50 text-sm md:text-base font-medium uppercase tracking-widest max-w-xs">
                    Engineered for performance. 10,000 sq ft of pure iron.
                </p>
            </div>

            {/* Asymmetrical Grid Layout */}
            <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-x-8 md:gap-y-0">

                {/* IMAGE 1: The Anchor (Scrolls naturally) */}
                <div ref={wrapper1Ref} className="col-span-1 md:col-span-7 flex flex-col">
                    <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden bg-white/5">
                        <img
                            ref={img1Ref}
                            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
                            alt="Heavy plates"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex justify-between items-center mt-4 text-sm font-semibold uppercase tracking-widest text-white/70">
                        <span>01</span>
                        <span>Free Weights</span>
                    </div>
                </div>

                {/* IMAGE 2: The Floater */}
                <div ref={wrapper2Ref} className="col-span-1 md:col-span-4 md:col-start-9 flex flex-col mt-0 md:mt-32">
                    <div className="relative w-full h-[50vh] overflow-hidden bg-white/5">
                        <img
                            ref={img2Ref}
                            src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1965&auto=format&fit=crop"
                            alt="Chalked hands"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex justify-between items-center mt-4 text-sm font-semibold uppercase tracking-widest text-white/70">
                        <span>02</span>
                        <span>The Platform</span>
                    </div>
                </div>

                {/* IMAGE 3: The Heavy Drag */}
                <div ref={wrapper3Ref} className="col-span-1 md:col-span-6 md:col-start-6 flex flex-col mt-0 md:-mt-24 z-10">
                    <div className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden bg-white/5">
                        <img
                            ref={img3Ref}
                            src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop"
                            alt="Barbell setup"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex justify-between items-center mt-4 text-sm font-semibold uppercase tracking-widest text-white/70">
                        <span>03</span>
                        <span>Conditioning</span>
                    </div>
                </div>

            </div>
        </section>
    );
}