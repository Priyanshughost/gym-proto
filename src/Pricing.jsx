import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const pricingTiers = [
    {
        id: "01",
        name: "The Grinder",
        price: "600",
        period: "Monthly",
        desc: "Raw access. Come in, put your head down, do the work.",
        features: ["24/7 Facility Access", "Standard Equipment", "Locker Room Access", "1 Guest Pass / Mo"],
        bgImage: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: "02",
        name: "The Athlete",
        price: "6,000",
        period: "Yearly",
        desc: "For those who train with purpose. Full access to recovery and specialized zones.",
        features: ["Everything in Grinder", "Olympic Lifting Platforms", "Cold Plunge & Sauna", "Group Conditioning"],
        bgImage: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1965&auto=format&fit=crop",
    },
    {
        id: "03",
        name: "The Competitor",
        price: "2900",
        period: "Half Yearly",
        desc: "Zero compromises. Elite programming, dedicated coaching, and priority access.",
        features: ["Everything in Athlete", "1-on-1 Monthly Check-in", "Custom Programming", "Private Locker", "Supplement Stack Discount"],
        bgImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",
    }
];

const PricingCard = ({ tier }) => {
    const cardRef = useRef(null);
    const colorBgRef = useRef(null);
    const contentRef = useRef(null);
    const overlayRef = useRef(null);
    const dividerRef = useRef(null);

    const { contextSafe } = useGSAP({ scope: cardRef });

    const handleMouseEnter = contextSafe(() => {
        // 1. Layout Shift 
        gsap.to(cardRef.current, { flexGrow: 3, duration: 0.9, ease: "power4.out", overwrite: "auto" });

        // 2. Background Image Wipe (Left to Right Clip-Path)
        gsap.to(colorBgRef.current, {
            clipPath: "inset(0% 0% 0% 0%)", // Fully revealed
            scale: 1,
            duration: 0.9,
            ease: "power4.out",
            overwrite: "auto"
        });

        // 3. Content Reveal (Height pushes layout, Clip-Path unmasks text cleanly)
        gsap.to(contentRef.current, {
            height: "auto",
            clipPath: "inset(0% 0% 0% 0%)",
            y: 0,
            duration: 0.9,
            ease: "power4.out",
            overwrite: "auto"
        });

        gsap.to(overlayRef.current, { backgroundColor: "rgba(0,0,0,0.1)", duration: 0.9, overwrite: "auto" });
        gsap.to(dividerRef.current, { borderColor: "rgba(255,255,255,0.5)", duration: 0.5, overwrite: "auto" });
    });

    const handleMouseLeave = contextSafe(() => {
        // 1. Shrink back
        gsap.to(cardRef.current, { flexGrow: 1, duration: 0.8, ease: "power4.out", overwrite: "auto" });

        // 2. Hide Background Image (Wipe back to the right)
        gsap.to(colorBgRef.current, {
            clipPath: "inset(0% 100% 0% 0%)", // Clipped entirely to the left edge
            scale: 1.05,
            duration: 0.8,
            ease: "power4.out",
            overwrite: "auto"
        });

        // 3. Hide content (Wipe down and collapse)
        gsap.to(contentRef.current, {
            height: 0,
            clipPath: "inset(100% 0% 0% 0%)", // Clips text from the top down
            y: 20,
            duration: 0.8,
            ease: "power4.out",
            overwrite: "auto"
        });

        gsap.to(overlayRef.current, { backgroundColor: "rgba(0,0,0,0.5)", duration: 0.8, overwrite: "auto" });
        gsap.to(dividerRef.current, { borderColor: "rgba(255,255,255,0.2)", duration: 0.5, overwrite: "auto" });
    });

    return (
        <div
            ref={cardRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ flexGrow: 1 }}
            data-hover
            // Added 'pricing-card' class for the initial scroll trigger stagger
            className="pricing-card relative rounded-sm overflow-hidden flex flex-col justify-end p-6 md:p-8 border border-white/10 origin-center"
        >
            {/* Background Image & Overlays */}
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none bg-zinc-900">
                {/* Base Grayscale Image */}
                <img
                    src={tier.bgImage}
                    alt={`${tier.name} base`}
                    style={{ filter: "grayscale(100%)", opacity: 0.3, transform: "scale(1.05)" }}
                    className="absolute inset-0 w-full h-full object-cover origin-center"
                />
                {/* Wiping Colored Overlay Image */}
                <img
                    ref={colorBgRef}
                    src={tier.bgImage}
                    alt={`${tier.name} color`}
                    // Initial state: Hidden (clipped 100% from the right)
                    style={{ clipPath: "inset(0% 100% 0% 0%)", opacity: 0.7, transform: "scale(1.05)" }}
                    className="absolute inset-0 w-full h-full object-cover origin-center"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent" />
                <div
                    ref={overlayRef}
                    className="absolute inset-0"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                />
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full flex flex-col pointer-events-none">

                {/* Top Row: Number & Price */}
                <div
                    ref={dividerRef}
                    className="flex justify-between items-end mb-4 md:mb-8 border-b pb-4"
                    style={{ borderColor: "rgba(255,255,255,0.2)" }}
                >
                    <span className="text-white/50 font-bold tracking-widest text-sm md:text-lg">
                        [{tier.id}]
                    </span>
                    <div className="text-right">
                        <span className="text-4xl md:text-6xl font-bold tracking-tighter">₹{tier.price}</span>
                        <span className="text-white/50 text-xs md:text-sm uppercase tracking-widest ml-1">/ {tier.period}</span>
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-2 whitespace-nowrap">
                    {tier.name}
                </h3>

                {/* Hidden Details */}
                <div
                    ref={contentRef}
                    // Initial state: zero height, clipped from the top, pushed down slightly
                    style={{ height: 0, clipPath: "inset(100% 0% 0% 0%)", transform: "translateY(20px)", overflow: "hidden" }}
                    className="flex flex-col"
                >
                    <p className="text-white/70 text-sm md:text-base font-light mb-6 pr-4 lg:pr-12 mt-2">
                        {tier.desc}
                    </p>

                    <ul className="flex flex-col gap-2 mb-8">
                        {tier.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs md:text-sm font-medium text-white/90">
                                <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                {feature}
                            </li>
                        ))}
                    </ul>

                    <button className="w-max bg-white text-black px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors mt-auto pointer-events-auto">
                        Select {tier.name}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function Pricing() {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);

    useGSAP(() => {
        // Header reveal
        gsap.from(headerRef.current, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 75%',
            }
        });

        // Cards staggered Clip-Path entrance
        gsap.from(".pricing-card", {
            clipPath: "inset(100% 0% 0% 0%)", // Start fully clipped from the bottom up
            y: 80,
            duration: 1.2,
            stagger: 0.15,
            ease: "power4.out",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 65%",
            },
            // CRITICAL: We clear the clipPath after the scroll animation finishes
            // so it doesn't conflict with our hover interactions.
            clearProps: "clipPath,y"
        });

    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-screen bg-black text-white font-sans flex flex-col pt-32 pb-12 overflow-hidden"
        >
            <div ref={headerRef} className="w-full max-w-7xl mx-auto px-6 md:px-12 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end z-10">
                <div>
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-none mb-2">
                        Commitment
                    </h2>
                    <p className="text-white/50 text-sm md:text-base font-medium uppercase tracking-widest">
                        Choose your weight.
                    </p>
                </div>
            </div>

            <div className="flex-1 w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-4 h-[80vh] lg:h-auto min-h-[600px]">
                {pricingTiers.map((tier) => (
                    <PricingCard key={tier.id} tier={tier} />
                ))}
            </div>
        </section>
    );
}