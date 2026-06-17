import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const footerRef = useRef(null);
    const textRef = useRef(null);
    const topRef = useRef(null);

    useGSAP(() => {
        // A clean, professional staggered reveal for the top links
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

        // The massive brand text scales and fades up aggressively
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

    return (
        <footer
            ref={footerRef}
            className="relative w-full bg-zinc-950 text-white pt-24 pb-8 px-6 md:px-12 font-sans border-t border-white/10 overflow-hidden"
        >
            {/* Top Section: Navigation & Newsletter */}
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

            {/* Bottom Section: Massive Typographic Brand */}
            <div className="w-full flex flex-col items-center justify-center border-t border-white/10 pt-12 relative">
                <h1
                    ref={textRef}
                    className="text-[18vw] leading-none font-bold tracking-tighter uppercase text-white/10 select-none"
                >
                    GYM NAME
                </h1>

                {/* Absolute positioned copyright so it sits cleanly at the bottom */}
                <div className="absolute bottom-0 w-full flex justify-between items-end pb-2">
                    <span className="text-xs text-white/30 font-medium">© {new Date().getFullYear()} TOM FITNESS. ALL RIGHTS RESERVED.</span>
                    <span className="text-xs text-white/30 font-medium">BUILT FOR REAL RESULTS.</span>
                </div>
            </div>
        </footer>
    );
}