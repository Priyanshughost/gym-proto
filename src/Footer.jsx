import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const footerRef = useRef(null);
    const textRef = useRef(null);
    const topRef = useRef(null);

    useGSAP(() => {
        gsap.from(topRef.current.children, {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: footerRef.current,
                start: 'top 85%',
                toggleActions: 'play none none none',
            }
        });

        gsap.from(textRef.current, {
            yPercent: 50,
            opacity: 0,
            scale: 0.9,
            duration: 1.5,
            ease: 'expo.out',
            scrollTrigger: {
                trigger: footerRef.current,
                start: 'top 75%',
                toggleActions: 'play none none none',
            }
        });
    }, { scope: footerRef });

    // NEW: Sync the CSS Mask with the global cursor state
    useEffect(() => {
        let frameId;
        const updateMask = () => {
            if (textRef.current && window.__CURSOR_STATE__) {
                const rect = textRef.current.getBoundingClientRect();
                const { x: cursorX, y: cursorY, scale } = window.__CURSOR_STATE__;

                // Calculate mouse position relative to the h1 container
                const localX = cursorX - rect.left;
                const localY = cursorY - rect.top;

                // Calculate exactly how wide the mask should be based on the cursor's scale
                // The base width of the cursor is 16px (radius 8px)
                const radius = 8 * scale;

                // Draw the transparent radial mask
                const maskStr = `radial-gradient(circle at ${localX}px ${localY}px, black ${radius}px, transparent ${radius}px)`;

                textRef.current.style.WebkitMaskImage = maskStr;
                textRef.current.style.maskImage = maskStr;
            }
            frameId = requestAnimationFrame(updateMask);
        };

        frameId = requestAnimationFrame(updateMask);
        return () => cancelAnimationFrame(frameId);
    }, []);

    return (
        <footer
            ref={footerRef}
            className="relative w-full bg-zinc-950 text-white pt-24 pb-8 px-6 md:px-12 font-sans border-t border-white/10 overflow-hidden"
        >
            <div
                ref={topRef}
                className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-24"
            >
                {/* Brand Column */}
                <div className="col-span-1 md:col-span-1">
                    <div className="flex items-center gap-2 text-xl font-bold tracking-tight mb-6">
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                            <path d="M12 2L2 22h20L12 2zm0 3.8l7.2 14.2H4.8L12 5.8z" />
                        </svg>
                        TOM fitness
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                        10,000 sq ft of pure iron. Engineered for athletes, powerlifters, and everyday grinders.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="col-span-1 flex flex-col gap-4">
                    <h4 className="text-white/40 text-xs font-semibold tracking-widest uppercase mb-2">Explore</h4>
                    <a href="#facility" data-hover className="text-sm font-medium hover:text-white/60 transition-colors w-max">The Facility</a>
                    <a href="#trainers" data-hover className="text-sm font-medium hover:text-white/60 transition-colors w-max">The Roster</a>
                    <a href="#programs" data-hover className="text-sm font-medium hover:text-white/60 transition-colors w-max">Programs</a>
                    <a href="#membership" data-hover className="text-sm font-medium hover:text-white/60 transition-colors w-max">Membership</a>
                </div>

                {/* Legal / Socials */}
                <div className="col-span-1 flex flex-col gap-4">
                    <h4 className="text-white/40 text-xs font-semibold tracking-widest uppercase mb-2">Connect</h4>
                    <a href="#instagram" data-hover className="text-sm font-medium hover:text-white/60 transition-colors w-max">Instagram</a>
                    <a href="#youtube" data-hover className="text-sm font-medium hover:text-white/60 transition-colors w-max">YouTube</a>
                    <a href="#contact" data-hover className="text-sm font-medium hover:text-white/60 transition-colors w-max">Contact Us</a>
                    <a href="#terms" data-hover className="text-sm font-medium hover:text-white/60 transition-colors w-max">Terms & Conditions</a>
                </div>

                {/* Newsletter CTA */}
                <div className="col-span-1 flex flex-col gap-4">
                    <h4 className="text-white/40 text-xs font-semibold tracking-widest uppercase mb-2">Join the list</h4>
                    <p className="text-sm text-white/50 mb-2">Exclusive updates, programming, and facility news.</p>
                    <div className="flex border-b border-white/20 pb-2">
                        <input
                            type="email"
                            placeholder="EMAIL ADDRESS"
                            className="bg-transparent border-none outline-none w-full text-sm font-medium uppercase placeholder-white/30"
                        />
                        <button data-hover className="text-sm font-bold uppercase tracking-wider hover:text-white/60 transition-colors">
                            Submit
                        </button>
                    </div>
                </div>
            </div>

            <div
                data-footer
                className="w-full flex flex-col items-center justify-center border-t border-white/10 pt-12 relative"
            >
                <h1
                    ref={textRef}
                    // NEW: Changed back to text-white. 
                    // When masked, it will only render inside the dot. The difference cursor over white text makes it PURE BLACK.
                    className="text-[18vw] leading-none font-bold tracking-tighter uppercase text-white select-none"
                    // INITIAL STATE: Shoved entirely off-screen to avoid flashing before JS kicks in
                    style={{
                        WebkitMaskImage: 'radial-gradient(circle at -100px -100px, black 0px, transparent 0px)',
                        maskImage: 'radial-gradient(circle at -100px -100px, black 0px, transparent 0px)'
                    }}
                >
                    GYM NAME
                </h1>

                <div className="absolute bottom-0 w-full flex justify-between items-end pb-2 px-6">
                    <span className="text-xs text-white/30 font-medium">© {new Date().getFullYear()} TOM FITNESS. ALL RIGHTS RESERVED.</span>
                    <span className="text-xs text-white/30 font-medium">BUILT FOR REAL RESULTS.</span>
                </div>
            </div>
        </footer>
    );
}