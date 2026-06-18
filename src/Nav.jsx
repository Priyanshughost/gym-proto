import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import JoinModal from './JoinModal';
import { navData } from './data'; // Adjust the import path if necessary

function Nav({ loaderFinished }) {
    const navRef = useRef(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    // 1. Initial State: Lock it in before the screen renders to prevent flashing
    useEffect(() => {
        // inset(top right bottom left)
        gsap.set(navRef.current, { clipPath: 'inset(0% 0% 100% 0%)' });
    }, []);

    // 2. The Reveal Animation
    useEffect(() => {
        if (!loaderFinished) return;

        // Animate the bottom inset back down to 0%, revealing the nav
        gsap.to(navRef.current, {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 2,
            ease: 'expo.in',
        });
    }, [loaderFinished]);

    return (
        <>
            <nav
                ref={navRef}
                className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-6 md:px-12 text-white mix-blend-difference"
            >
                {/* Brand Logo */}
                <div className="flex items-center gap-2 text-2xl tracking-normal">
                    {/* Abstract geometric icon */}
                    <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                        <path d={navData.brand.logoPath} />
                    </svg>
                    {navData.brand.name}
                </div>

                {/* Nav Links */}
                <div className="hidden md:flex items-center gap-8 text-sm font-light">
                    {navData.links.map((link) => (
                        <a
                            key={link.id}
                            href={link.href}
                            className="hover:text-gray-300 transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* Top Right CTA */}
                <button
                    data-hover
                    onClick={() => setIsFormOpen(true)}
                    className="bg-white text-black px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors"
                >
                    {navData.ctaText}
                </button>
            </nav>
            <JoinModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
        </>
    );
}

export default Nav;