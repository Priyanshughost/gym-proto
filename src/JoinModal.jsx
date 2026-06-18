import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

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
        price: "6000", // Note: Removed the comma here for cleaner backend data handling
        period: "Yearly",
        desc: "For those who train with purpose. Full access to recovery and specialized zones.",
        features: ["Everything in Grinder", "Olympic Lifting Platforms", "Cold Plunge & Sauna", "Group Conditioning"],
        bgImage: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1965&auto=format&fit=crop",
    },
    {
        id: "03",
        name: "The Competitor",
        price: "2900", // Removed comma here too
        period: "Half Yearly",
        desc: "Zero compromises. Elite programming, dedicated coaching, and priority access.",
        features: ["Everything in Athlete", "1-on-1 Monthly Check-in", "Custom Programming", "Private Locker", "Supplement Stack Discount"],
        bgImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",
    }
];

export default function JoinModal({ isOpen, onClose }) {
    const overlayRef = useRef(null);
    const containerRef = useRef(null);
    const contentRef = useRef(null);

    // 1. Updated State: Now storing 'price' instead of 'tier'
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        price: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsSubmitting(true);

        setTimeout(() => {
            console.log("============= NEW MEMBER INITIATED =============");
            // This will now perfectly log { name, email, phone, price }
            console.table(formData);
            console.log("Ready to POST to backend API endpoint.");
            console.log("=================================================");

            setIsSubmitting(false);
            setIsSubmitted(true);
        }, 1500);
    };

    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setIsSubmitted(false);
                // Resetting price here
                setFormData({ name: "", email: "", phone: "", price: "" });
            }, 500);
        }
    }, [isOpen]);

    // Localized Modal Scroll Engine
    useEffect(() => {
        let modalLenis;
        let rafId;

        if (isOpen) {
            if (window.lenis) window.lenis.stop();
            document.body.style.overflow = "hidden";

            modalLenis = new Lenis({
                wrapper: containerRef.current,
                content: contentRef.current,
                lerp: 0.05,
                wheelMultiplier: 0.8,
                smoothWheel: true,
                smoothTouch: false,
            });

            function raf(time) {
                modalLenis.raf(time);
                rafId = requestAnimationFrame(raf);
            }
            requestAnimationFrame(raf);
        } else {
            if (window.lenis) window.lenis.start();
            document.body.style.overflow = "";
        }

        return () => {
            if (modalLenis) {
                modalLenis.destroy();
                cancelAnimationFrame(rafId);
            }
            if (!isOpen) document.body.style.overflow = "";
        };
    }, [isOpen]);

    // GSAP Animations
    useGSAP(() => {
        if (isOpen) {
            gsap.to(overlayRef.current, {
                autoAlpha: 1,
                backdropFilter: "blur(12px)",
                duration: 0.5,
                ease: "power3.out",
            });

            gsap.fromTo(
                containerRef.current,
                { yPercent: 100 },
                { yPercent: 0, duration: 0.7, ease: "expo.out" }
            );

            gsap.fromTo(
                contentRef.current.children,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power3.out",
                    delay: 0.3,
                }
            );
        } else {
            gsap.to(containerRef.current, {
                yPercent: 100,
                duration: 0.5,
                ease: "expo.in",
            });
            gsap.to(overlayRef.current, {
                autoAlpha: 0,
                backdropFilter: "blur(0px)",
                duration: 0.5,
                ease: "power3.in",
                delay: 0.2,
            });
        }
    }, [isOpen]);

    // Format numbers with commas for display (e.g., "6000" -> "6,000")
    const formatPrice = (price) => {
        return parseInt(price).toLocaleString('en-IN');
    };

    // Find the display name for the success screen
    const selectedTierName = pricingTiers.find(t => t.price === formData.price)?.name || "Your Tier";

    return (
        <div ref={overlayRef} className="cursor-pointer fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/80 invisible">
            <div className="absolute inset-0" onClick={onClose} />

            <div ref={containerRef} className="relative w-full max-w-5xl bg-zinc-950 text-white h-[90vh] md:h-auto md:max-h-[90vh] overflow-y-auto rounded-t-3xl md:rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/5 no-scrollbar">

                <div ref={contentRef} className="p-6 md:p-12 min-h-[50vh] flex flex-col justify-center">

                    <button onClick={onClose} className="absolute top-6 right-6 md:top-8 md:right-8 text-white/50 hover:text-white transition-colors z-20">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {isSubmitted ? (
                        <div className="flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-700 py-20">
                            <div className="w-24 h-24 rounded-full border-4 border-white flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                                <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                    <path strokeLinecap="square" strokeLinejoin="miter" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="text-zinc-500 tracking-[0.3em] text-sm uppercase mb-4">Protocol Initiated</span>
                            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-6">Welcome to<br />the Iron.</h2>
                            <p className="text-zinc-400 text-lg max-w-md mx-auto">
                                {/* Success screen uses the lookup to show the name */}
                                We've secured your spot for <strong className="text-white">{selectedTierName}</strong>. Check your email at <strong className="text-white">{formData.email}</strong> for next steps.
                            </p>
                            <button onClick={onClose} className="mt-12 text-sm font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors border-b border-transparent hover:border-white pb-1">
                                Close Window
                            </button>
                        </div>
                    ) : (
                        <form className="flex flex-col gap-12 mt-4" onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-2">
                                <span className="text-zinc-500 tracking-[0.3em] text-sm uppercase">Initiate Protocol</span>
                                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">Claim Your Space.</h2>
                            </div>

                            <div className="flex flex-col gap-8">
                                <div className="relative group">
                                    <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} autoComplete="new-user-name" className="w-full bg-transparent border-b-2 border-zinc-800 py-4 text-xl focus:outline-none focus:border-white transition-colors peer" placeholder=" " />
                                    <label htmlFor="name" className="absolute left-0 top-4 text-zinc-500 text-xl transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-white peer-focus:tracking-widest peer-focus:uppercase peer-valid:-top-3 peer-valid:text-xs peer-valid:uppercase peer-valid:tracking-widest">
                                        Full Name
                                    </label>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="relative group">
                                        <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} autoComplete="new-user-email" className="w-full bg-transparent border-b-2 border-zinc-800 py-4 text-xl focus:outline-none focus:border-white transition-colors peer" placeholder=" " />
                                        <label htmlFor="email" className="absolute left-0 top-4 text-zinc-500 text-xl transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-white peer-focus:tracking-widest peer-focus:uppercase peer-valid:-top-3 peer-valid:text-xs peer-valid:uppercase peer-valid:tracking-widest">
                                            Email Address
                                        </label>
                                    </div>

                                    <div className="relative group">
                                        <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleChange} autoComplete="new-user-phone" className="w-full bg-transparent border-b-2 border-zinc-800 py-4 text-xl focus:outline-none focus:border-white transition-colors peer" placeholder=" " />
                                        <label htmlFor="phone" className="absolute left-0 top-4 text-zinc-500 text-xl transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-white peer-focus:tracking-widest peer-focus:uppercase peer-valid:-top-3 peer-valid:text-xs peer-valid:uppercase peer-valid:tracking-widest">
                                            Phone Number
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-6">
                                <label className="text-sm tracking-widest uppercase text-zinc-500">Select Membership Tier</label>
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                                    {pricingTiers.map((tier) => {
                                        // 2. Evaluation matches on formData.price now
                                        const isSelected = formData.price === tier.price;

                                        return (
                                            <label key={tier.id} className={`relative group block h-full ${isSubmitting ? 'pointer-events-none opacity-50' : ''}`}>

                                                {/* 3. name="price" and value={tier.price} setup */}
                                                <input
                                                    type="radio"
                                                    name="price"
                                                    value={tier.price}
                                                    onChange={handleChange}
                                                    checked={isSelected}
                                                    className="sr-only"
                                                    required
                                                    disabled={isSubmitting}
                                                />

                                                <div className={`relative h-full border-2 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col group-hover:-translate-y-1 ${isSelected ? 'border-white bg-zinc-900/50 shadow-[0_0_30px_rgba(255,255,255,0.05)]' : 'border-zinc-800 bg-transparent hover:border-zinc-600'}`}>
                                                    <div className="absolute inset-0 z-0 overflow-hidden">
                                                        <img src={tier.bgImage} alt={tier.name} className={`w-full h-full object-cover transition-all duration-700 ${isSelected ? 'grayscale-0 opacity-30 scale-105' : 'grayscale opacity-10 scale-100'}`} />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/90 to-zinc-950/60" />
                                                    </div>

                                                    <div className="relative z-10 p-6 md:p-8 flex flex-col h-full">
                                                        <div className="flex justify-between items-start mb-4">
                                                            <span className={`text-xs tracking-[0.2em] transition-colors ${isSelected ? 'text-white' : 'text-white/50'}`}>[{tier.id}]</span>
                                                        </div>
                                                        <h3 className="text-2xl font-black uppercase tracking-tight mb-2">{tier.name}</h3>
                                                        <div className="flex items-baseline gap-2 mb-4">
                                                            {/* Added formatter so the UI displays "6,000" while state stores "6000" */}
                                                            <span className="text-4xl font-bold">₹{formatPrice(tier.price)}</span>
                                                            <span className="text-zinc-500 text-sm uppercase tracking-wider">/ {tier.period}</span>
                                                        </div>
                                                        <p className={`text-sm mb-8 flex-grow transition-colors ${isSelected ? 'text-zinc-300' : 'text-zinc-500'}`}>{tier.desc}</p>
                                                        <ul className="space-y-3 mt-auto border-t border-white/10 pt-6">
                                                            {tier.features.map((feature, idx) => (
                                                                <li key={idx} className="flex items-start gap-3 text-sm text-zinc-300">
                                                                    <svg className={`w-4 h-4 mt-0.5 shrink-0 transition-colors ${isSelected ? 'text-white' : 'text-zinc-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                                    </svg>
                                                                    {feature}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                        <div className={`mt-8 flex items-center gap-3 text-sm font-bold uppercase tracking-widest transition-colors duration-300 ${isSelected ? 'text-white' : 'text-zinc-600 group-hover:text-zinc-400'}`}>
                                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${isSelected ? 'border-white bg-white shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 'border-zinc-700 group-hover:border-zinc-500'}`}>
                                                                <svg className={`w-3.5 h-3.5 text-black transition-transform duration-300 ${isSelected ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                                                                    <path strokeLinecap="square" strokeLinejoin="miter" d="M5 13l4 4L19 7" />
                                                                </svg>
                                                            </div>
                                                            <span>{isSelected ? 'Selected' : 'Select'}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>

                            <button type="submit" disabled={isSubmitting} className={`mt-4 w-full text-xl font-black uppercase tracking-widest py-6 rounded-2xl transition-all duration-300 ${isSubmitting ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' : 'bg-white text-black hover:bg-zinc-200'}`}>
                                {isSubmitting ? 'Processing...' : 'Confirm Selection'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}