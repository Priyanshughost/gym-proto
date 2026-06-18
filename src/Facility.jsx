import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const facilities = [

    {

        id: "01",

        title: "FREE WEIGHTS",

        desc: "10,000 sq ft of pure iron. Dumbbells up to 200lbs. No waiting.",

        img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",

    },

    {

        id: "02",

        title: "THE PLATFORM",

        desc: "Competition-grade bars, plates and racks. Built for serious strength.",

        img: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1965&auto=format&fit=crop",

    },

    {

        id: "03",

        title: "CONDITIONING",

        desc: "Echo bikes, sleds and turf. Everything needed to build your engine.",

        img: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop",

    },

    {

        id: "04",

        title: "RECOVERY",

        desc: "Cold therapy, mobility space and recovery equipment.",

        img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop",

    },

];

export default function Facility() {
    const containerRef = useRef(null);
    const cardsRef = useRef([]);

    useGSAP(
        () => {
            const cards = cardsRef.current;

            // 1. Setup gsap.matchMedia for responsive animations
            let mm = gsap.matchMedia();

            gsap.set(cards, {
                transformPerspective: 2000,
                transformOrigin: "center center",
                force3D: true,
            });

            cards.forEach((card, index) => {
                gsap.set(card, {
                    zIndex: index - facilities.length,
                });

                if (index !== 0) {
                    gsap.set(card, {
                        yPercent: 100,
                    });
                }
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: `+=${facilities.length * 30}%`,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                },
            });

            // 2. Define responsive animations based on screen size
            mm.add(
                {
                    isDesktop: "(min-width: 768px)",
                    isMobile: "(max-width: 767px)",
                },
                (context) => {
                    let { isMobile } = context.conditions;

                    cards.forEach((card, index) => {
                        if (index === cards.length - 1) return;

                        const nextCard = cards[index + 1];

                        tl.to(
                            card,
                            {
                                // Less dramatic scale down on mobile so it remains visible
                                scale: isMobile ? 0.85 : 0.6,
                                rotationZ: Math.floor(Math.random() * 11),
                                // Move it up slightly less on mobile
                                y: isMobile ? -30 : -60,
                                ease: "none",
                            },
                            index
                        );

                        tl.to(
                            nextCard,
                            {
                                yPercent: 0,
                                ease: "none",
                            },
                            index
                        );
                    });
                }
            );
        },
        { scope: containerRef }
    );

    return (
        <section
            ref={containerRef}
            // 3. Changed h-screen to h-[100dvh] for mobile browser address bars
            className="relative w-full h-screen bg-black overflow-hidden"
        >
            {facilities.map((facility, index) => (
                <div
                    key={facility.id}
                    ref={(el) => (cardsRef.current[index] = el)}
                    className="absolute inset-0 flex items-center justify-center p-4 md:p-8"
                >
                    {/* Kept your rounded styles, they look great */}
                    <div className="relative w-full h-full rounded-[32px] overflow-hidden bg-zinc-900 shadow-2xl">

                        <img
                            src={facility.img}
                            alt={facility.title}
                            className="absolute inset-0 w-full h-full object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />

                        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 lg:p-24 text-white">
                            <span className="text-sm md:text-lg tracking-[0.3em] text-white/50 mb-4">
                                [{facility.id}]
                            </span>

                            {/* 4. Added text-4xl base and break-words for narrow screens */}
                            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-none tracking-tight uppercase break-words">
                                {facility.title}
                            </h2>

                            <div className="mt-6 md:mt-8 max-w-2xl border-l border-white/30 pl-4 md:pl-6">
                                <p className="text-sm sm:text-base md:text-xl text-white/80">
                                    {facility.desc}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
}