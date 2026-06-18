import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const trainers = [
  { name: "Marcus", specialty: "Powerlifting", img: "https://images.unsplash.com/photo-1604480133435-25b86862d276?w=500&auto=format&fit=crop&q=60" },
  { name: "Elena", specialty: "Hypertrophy", img: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1000&auto=format&fit=crop" },
  { name: "David", specialty: "Biomechanics", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop" },
  { name: "Sarah", specialty: "Conditioning", img: "https://images.unsplash.com/photo-1549476464-37392f717541?w=500&auto=format&fit=crop&q=60" },
  { name: "Jax", specialty: "Olympic Lifting", img: "https://images.unsplash.com/photo-1577221084712-45b0445d2b00?w=500&auto=format&fit=crop&q=60" },
  { name: "Nina", specialty: "Mobility", img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1000&auto=format&fit=crop" },
];

export default function Trainers() {
  const containerRef = useRef(null);
  const cylinderRef = useRef(null);
  const spinTween = useRef(null); // Ref to hold our infinite animation

  const totalCards = trainers.length;
  const anglePerCard = 360 / totalCards;

  useGSAP(() => {
    // 1. Set the initial 5-degree tilt explicitly via GSAP so it knows about it
    gsap.set(cylinderRef.current, { rotationX: -5 });

    // 2. Create the infinite spinning animation
    spinTween.current = gsap.to(cylinderRef.current, {
      rotationY: 360,
      duration: 25,
      ease: "none",
      repeat: -1,
      paused: true, // Start paused, let ScrollTrigger turn it on
    });

    // 3. Use ScrollTrigger as our "Intersection Observer"
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top bottom", // Triggers when the top of the section hits the bottom of the viewport
      end: "bottom top",   // Ends when the bottom of the section hits the top of the viewport
      onToggle: (self) => {
        // self.isActive is true when the section is anywhere in the viewport
        if (self.isActive) {
          spinTween.current.play();
        } else {
          spinTween.current.pause();
        }
      }
    });
  }, { scope: containerRef });

  // GSAP trick: Smoothly animate the timeScale for a premium hover effect
  const handleMouseEnter = () => {
    gsap.to(spinTween.current, { timeScale: 0, duration: 0.5, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    gsap.to(spinTween.current, { timeScale: 1, duration: 0.5, ease: "power2.in" });
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-black text-white font-sans overflow-hidden flex items-center justify-center"
      style={{ perspective: '1500px' }}
    >
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-black z-0 pointer-events-none" />

      <div
        className="relative w-full h-[400px] flex items-center justify-center"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Centered Watermark Text */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ transform: 'translateZ(0px)' }}
        >
          <h2 className="text-7xl md:text-[12rem] font-bold tracking-tighter uppercase text-zinc-300 whitespace-nowrap text-center">
            Roster
          </h2>
        </div>

        {/* The Spinning Cylinder */}
        <div
          ref={cylinderRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="absolute inset-0 flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {trainers.map((trainer, i) => {
            const rotationY = i * anglePerCard;
            const roundingClass = i % 2 === 0
              ? "rounded-tl-4xl rounded-br-4xl"
              : "rounded-tr-4xl rounded-bl-4xl";

            return (
              <div
                key={i}
                className={`absolute w-[180px] md:w-[260px] aspect-[3/4] bg-zinc-900 border border-white/10 group overflow-hidden ${roundingClass}`}
                style={{
                  transform: `rotateY(${rotationY}deg) translateZ(var(--cylinder-radius))`,
                  backfaceVisibility: 'visible',
                }}
              >
                <img
                  src={trainer.img}
                  alt={trainer.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-out"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 bg-linear-to-t from-black via-black/70 to-transparent pointer-events-none">
                  <span className="text-white/50 text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase mb-1">
                    {trainer.specialty}
                  </span>
                  <h3 className="text-lg md:text-2xl font-bold uppercase tracking-tight">
                    {trainer.name}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        :root {
          --cylinder-radius: 220px;
        }
        @media (min-width: 768px) {
          :root {
            --cylinder-radius: 400px;
          }
        }
      `}</style>
    </section>
  );
}