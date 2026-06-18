import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import JoinModal from './JoinModal';

// Accept the loaderFinished state as a prop so it knows when to trigger
function Nav({ loaderFinished }) {
    const navRef = useRef(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    // 1. Initial State: Lock it in before the screen renders to prevent flashing
    useEffect(() => {
        // inset(top right bottom left)
        // 100% on the bottom means the visible area is pushed entirely to the top edge
        gsap.set(navRef.current, { clipPath: 'inset(0% 0% 100% 0%)' });
    }, []);

    // 2. The Reveal Animation
    useEffect(() => {
        // Don't animate until the loader doors have opened
        if (!loaderFinished) return;

        // Animate the bottom inset back down to 0%, revealing the nav
        gsap.to(navRef.current, {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 2,
            ease: 'expo.in',
            // delay: 0.1 // Adding a tiny delay to sync with the background scaling in App.jsx
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
                        <path d="M12 2L2 22h20L12 2zm0 3.8l7.2 14.2H4.8L12 5.8z" />
                    </svg>
                    GYM
                </div>

                {/* Nav Links */}
                <div className="hidden md:flex items-center gap-8 text-sm font-light">
                    <a href="#programs" className="hover:text-gray-300 transition-colors">Programs</a>
                    <a href="#trainers" className="hover:text-gray-300 transition-colors">Trainers</a>
                    <a href="#locations" className="hover:text-gray-300 transition-colors">Locations</a>
                    <a href="#community" className="hover:text-gray-300 transition-colors">Community</a>
                </div>

                {/* Top Right CTA */}
                <button
                    data-hover
                    onClick={() => setIsFormOpen(true)}
                    className="bg-white text-black px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors"
                >
                    Join now
                </button>
            </nav>
            <JoinModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
        </>
    );
}

export default Nav;