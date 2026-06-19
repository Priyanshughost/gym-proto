import React from 'react';

// Extracting the data makes the component DRY and allows us to duplicate 
// the array easily for the seamless infinite loop effect.
const BRANDS = [
    { id: 'rogue', text: 'ROGUE', icon: <div className="w-3 h-3 bg-current rounded-sm rotate-45"></div>, className: 'tracking-tighter' },
    { id: 'gymshark', text: 'GYMSHARK', className: 'italic text-lg' },
    { id: 'eleiko', text: 'ELEIKO', className: 'tracking-tight' },
    { id: 'concept2', text: 'Concept2', icon: <div className="w-4 h-4 border-2 border-current rounded-full"></div>, className: 'font-semibold text-lg uppercase tracking-widest' },
    { id: 'titan', text: 'TITAN', suffix: <span className="font-light text-sm">FITNESS</span> },
    { id: 'myprotein', text: 'MYPROTEIN', icon: <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[14px] border-l-transparent border-r-transparent border-b-current"></div>, className: 'font-black italic' },
];

export default function LogoCloud() {
    return (
        <div className="absolute bottom-0 left-0 w-full z-10 pb-8 overflow-hidden pointer-events-none">
            {/* 
                1. Pointer-events-auto re-enables interaction inside the container
                2. The mask-image creates the beautiful left/right fade effect 
            */}
            <div
                className="w-full max-w-7xl mx-auto pointer-events-auto"
                style={{
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                    maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
                }}
            >
                {/* 
                    The group and peer hover logic allows us to pause the animation 
                    and handle the focus states beautifully 
                */}
                <div className="flex w-max animate-marquee hover:[animation-play-state:paused] group/track">

                    {/* We render the list twice to create the seamless infinite scroll illusion */}
                    {[...Array(2)].map((_, arrayIndex) => (
                        <div key={arrayIndex} className="flex items-center justify-around w-max min-w-full">
                            {BRANDS.map((brand) => (
                                <div
                                    key={`${arrayIndex}-${brand.id}`}
                                    data-hover
                                    // Default muted, full brightness on specific hover
                                    className={`
                                        flex items-center gap-2 px-10 font-bold text-xl text-white/40 
                                        transition-all duration-500 cursor-pointer
                                        hover:!text-white hover:scale-110
                                        ${brand.className || ''}
                                    `}
                                >
                                    {brand.icon && brand.icon}
                                    {brand.text}
                                    {brand.suffix && brand.suffix}
                                </div>
                            ))}
                        </div>
                    ))}

                </div>
            </div>

            {/* Injected CSS for the marquee animation so it works instantly without touching Tailwind config */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes marquee {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 35s linear infinite;
                }
                /* Optional utility for the MyProtein triangle if not using borders */
                .clip-triangle {
                    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
                }
            `}} />
        </div>
    );
}