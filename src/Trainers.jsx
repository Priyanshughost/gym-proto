import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const trainers = [
  { name: "Marcus", specialty: "Powerlifting", img: "https://images.unsplash.com/photo-1604480133435-25b86862d276?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fGd5bXxlbnwwfHwwfHx8MA%3D%3D" },
  { name: "Elena", specialty: "Hypertrophy", img: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1000&auto=format&fit=crop" },
  { name: "David", specialty: "Biomechanics", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop" },
  { name: "Sarah", specialty: "Conditioning", img: "https://images.unsplash.com/photo-1549476464-37392f717541?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGd5bXxlbnwwfHwwfHx8MA%3D%3D" },
  { name: "Jax", specialty: "Olympic Lifting", img: "https://images.unsplash.com/photo-1577221084712-45b0445d2b00?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGd5bXxlbnwwfHwwfHx8MA%3D%3D" },
  { name: "Nina", specialty: "Mobility", img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1000&auto=format&fit=crop" },
];

export default function Trainers() {
  const containerRef = useRef(null);
  const cylinderRef = useRef(null);

  const totalCards = trainers.length;
  const anglePerCard = 360 / totalCards;
  const radius = 500;

  useGSAP(() => {
    gsap.from(containerRef.current, {
      opacity: 0,
      duration: 1.5,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      }
    });

    gsap.to(cylinderRef.current, {
      rotationY: -360,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=3000',
        pin: true,
        scrub: 1,
      }
    });

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-black text-white font-sans overflow-hidden"
    >
      <div
        className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden"
        style={{
          perspective: '1800px',
          // Added preserve-3d here to ensure the text and cylinder exist in the exact same 3D space
          transformStyle: 'preserve-3d'
        }}
      >

        <div className="absolute inset-0 bg-radial-gradient from-transparent to-black z-20 pointer-events-none" />

        {/* UPDATED: Centered massive typography */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <h2 className="text-7xl md:text-9xl font-bold tracking-tighter uppercase text-white/10 whitespace-nowrap text-center">
            Roster
          </h2>
        </div>

        <div
          ref={cylinderRef}
          className="relative w-full h-full flex items-center justify-center"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(-5deg)'
          }}
        >
          {trainers.map((trainer, i) => {
            const rotationY = i * anglePerCard;

            return (
              <div
                key={i}
                className="absolute w-[200px] md:w-[260px] aspect-[3/4] bg-zinc-900 border border-white/10 group overflow-hidden"
                style={{
                  transform: `rotateY(${rotationY}deg) translateZ(${radius}px)`,
                  backfaceVisibility: 'visible',
                }}
              >
                <img
                  src={trainer.img}
                  alt={trainer.name}
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                />

                <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6 bg-linear-to-t from-black/90 via-black/40 to-transparent">
                  <span className="text-white/50 text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase mb-1">
                    {trainer.specialty}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight">
                    {trainer.name}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}