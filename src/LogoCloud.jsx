import React from 'react'

function LogoCloud() {
    return (
        <div className="absolute bottom-0 w-full z-10 px-6 md:px-12 pb-8 flex items-center gap-10 overflow-x-auto whitespace-nowrap text-white/70 scrollbar-hide">
            {/* Replaced tech logos with gym-appropriate brand placeholders */}
            <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
                <div className="w-3 h-3 bg-white/70 rounded-sm rotate-45"></div> ROGUE
            </div>
            <div className="flex items-center gap-2 font-bold text-lg">
                <span className="italic">GYMSHARK</span>
            </div>
            <div className="flex items-center gap-1 font-bold text-xl">
                ELEIKO
            </div>
            <div className="flex items-center gap-2 font-semibold text-lg uppercase tracking-widest">
                <div className="w-4 h-4 border-2 border-white/70 rounded-full"></div> Concept2
            </div>
            <div className="flex items-center gap-2 font-bold text-xl">
                TITAN <span className="font-light text-sm">FITNESS</span>
            </div>
            <div className="flex items-center gap-1 font-black text-xl italic">
                <div className="w-4 h-4 bg-white/70 clip-triangle"></div> MYPROTEIN
            </div>
        </div>
    )
}

export default LogoCloud