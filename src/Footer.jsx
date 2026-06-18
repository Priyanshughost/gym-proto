import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { footerData } from './data'; // Adjust the import path if necessary

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const footerRef = useRef(null);
    const parallaxRef = useRef(null); // NEW: Inner wrapper for the parallax effect
    const textRef = useRef(null);
    const topRef = useRef(null);

    useGSAP(() => {
        // 1. THE PARALLAX REVEAL EFFECT
        gsap.fromTo(
            parallaxRef.current,
            { yPercent: -30 }, // Pushes the content up 30% initially
            {
                yPercent: 0,   // Settles to normal position as you scroll
                ease: 'none',
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: 'top bottom', // Starts when the very top of footer enters the bottom of screen
                    end: 'top top',
                    scrub: true, // Ties the animation frame-by-frame to the scrollbar
                }
            }
        );

        // 2. The Link Entry Stagger
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

        // 3. The Giant Text Pop-in
        if (textRef.current) {
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
        }
    }, { scope: footerRef });

    // Cursor Mask Effect
    useEffect(() => {
        let frameId;
        const updateMask = () => {
            if (textRef.current && window.__CURSOR_STATE__ && window.innerWidth >= 768) {
                const rect = textRef.current.getBoundingClientRect();
                const { x: cursorX, y: cursorY, scale } = window.__CURSOR_STATE__;

                const localX = cursorX - rect.left;
                const localY = cursorY - rect.top;
                const radius = 8 * scale;

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
            // Kept the top border and overflow hidden on the outer shell
            className="relative w-full bg-zinc-800 text-white font-sans border-t border-white/10 overflow-hidden"
        >
            {/* NEW: The Parallax Wrapper */}
            {/* Moved the pt-24 pb-8 px-6 md:px-12 padding here so the contents slide cleanly */}
            <div ref={parallaxRef} className="w-full h-full pt-24 pb-8 px-6 md:px-12 flex flex-col justify-between">

                <div
                    ref={topRef}
                    className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-24"
                >
                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 text-xl font-bold tracking-tight mb-6">
                            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                                <path d={footerData.brand.logoPath} />
                            </svg>
                            {footerData.brand.name}
                        </div>
                        <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                            {footerData.brand.description}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="col-span-1 flex flex-col gap-4">
                        <h4 className="text-white/40 text-xs font-semibold tracking-widest uppercase mb-2">
                            {footerData.explore.title}
                        </h4>
                        {footerData.explore.links.map((link) => (
                            <a key={link.id} href={link.href} data-hover className="text-sm font-medium hover:text-white/60 transition-colors w-max">
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Legal / Socials */}
                    <div className="col-span-1 flex flex-col gap-4">
                        <h4 className="text-white/40 text-xs font-semibold tracking-widest uppercase mb-2">
                            {footerData.connect.title}
                        </h4>
                        {footerData.connect.links.map((link) => (
                            <a key={link.id} href={link.href} data-hover className="text-sm font-medium hover:text-white/60 transition-colors w-max">
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Newsletter CTA */}
                    <div className="col-span-1 flex flex-col gap-4">
                        <h4 className="text-white/40 text-xs font-semibold tracking-widest uppercase mb-2">
                            {footerData.newsletter.title}
                        </h4>
                        <p className="text-sm text-white/50 mb-2">{footerData.newsletter.description}</p>
                        <div className="flex border-b border-white/20 pb-2">
                            <input
                                type="email"
                                placeholder={footerData.newsletter.placeholder}
                                className="bg-transparent border-none outline-none w-full text-sm font-medium uppercase placeholder-white/30"
                            />
                            <button data-hover className="text-sm font-bold uppercase tracking-wider hover:text-white/60 transition-colors">
                                {footerData.newsletter.buttonText}
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    data-footer
                    className="w-full flex flex-col items-center justify-center border-t border-white/10 pt-12 md:pt-16 relative"
                >
                    <h1
                        ref={textRef}
                        className="hidden md:block text-[18vw] leading-none font-bold tracking-tighter uppercase text-white select-none"
                        style={{
                            WebkitMaskImage: 'radial-gradient(circle at -100px -100px, black 0px, transparent 0px)',
                            maskImage: 'radial-gradient(circle at -100px -100px, black 0px, transparent 0px)'
                        }}
                    >
                        {footerData.largeText}
                    </h1>

                    <div className="relative md:absolute bottom-0 w-full flex flex-col md:flex-row justify-between items-center md:items-end gap-2 md:gap-0 pb-2 px-6">
                        <span className="text-xs text-white/30 font-medium text-center">
                            © {new Date().getFullYear()} {footerData.bottomText.left}
                        </span>
                        <span className="text-xs text-white/30 font-medium text-center">
                            {footerData.bottomText.right}
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}