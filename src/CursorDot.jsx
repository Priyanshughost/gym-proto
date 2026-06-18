import React, { useEffect, useRef, useState } from 'react';

export default function CursorDot() {
    const dotRef = useRef(null);
    // NEW: State to track if the user has a real mouse
    const [hasMouse, setHasMouse] = useState(true);

    useEffect(() => {
        // Safely check if the device uses a fine pointer (mouse/trackpad)
        const mediaQuery = window.matchMedia("(pointer: fine)");
        setHasMouse(mediaQuery.matches);

        const updateDevice = (e) => setHasMouse(e.matches);
        mediaQuery.addEventListener("change", updateDevice);

        return () => mediaQuery.removeEventListener("change", updateDevice);
    }, []);

    useEffect(() => {
        // NEW: If they don't have a mouse (mobile/tablet), do NOT run the heavy JS loop
        if (!hasMouse) return;

        const dot = dotRef.current;

        let mouse = { x: 0, y: 0 };
        let dotPos = { x: 0, y: 0 };
        let lastDotPos = { x: 0, y: 0 };
        let angle = 0;

        let targetHoverScale = 1;
        let currentHoverScale = 1;

        let frameId;

        const onMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;

            if (dot.style.opacity !== '1') {
                dot.style.opacity = '1';
            }
        };

        const onMouseOver = (e) => {
            if (e.target.closest('[data-footer]')) {
                targetHoverScale = 25;
            } else if (e.target.closest('[data-hover]')) {
                targetHoverScale = 5;
            }
        };

        const onMouseOut = (e) => {
            const related = e.relatedTarget;
            if (!related || !related.closest('[data-footer], [data-hover]')) {
                targetHoverScale = 1;
            }
        };

        const onMouseLeaveWindow = () => {
            if (dot) dot.style.opacity = '0';
        };

        const onMouseEnterWindow = () => {
            if (dot) dot.style.opacity = '1';
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseover', onMouseOver);
        window.addEventListener('mouseout', onMouseOut);
        document.addEventListener('mouseleave', onMouseLeaveWindow);
        document.addEventListener('mouseenter', onMouseEnterWindow);

        const renderTick = () => {
            dotPos.x += (mouse.x - dotPos.x) * 0.15;
            dotPos.y += (mouse.y - dotPos.y) * 0.15;

            const dx = dotPos.x - lastDotPos.x;
            const dy = dotPos.y - lastDotPos.y;
            const speed = Math.sqrt(dx * dx + dy * dy);

            if (speed > 0.1) {
                angle = Math.atan2(dy, dx) * (180 / Math.PI);
            }

            currentHoverScale += (targetHoverScale - currentHoverScale) * 0.15;

            const isSpotlight = targetHoverScale > 5;
            const stretchMult = isSpotlight ? 0 : 0.04;

            const baseStretch = Math.min(1 + speed * stretchMult, 2.5);
            const baseSquash = Math.max(1 - speed * stretchMult, 0.4);

            const finalStretch = baseStretch * currentHoverScale;
            const finalSquash = baseSquash * currentHoverScale;

            if (dot) {
                dot.style.transform = `translate3d(${dotPos.x - 8}px, ${dotPos.y - 8}px, 0) rotate(${angle}deg) scale(${finalStretch}, ${finalSquash})`;
            }

            lastDotPos.x = dotPos.x;
            lastDotPos.y = dotPos.y;

            window.__CURSOR_STATE__ = {
                x: dotPos.x,
                y: dotPos.y,
                scale: currentHoverScale
            };

            frameId = requestAnimationFrame(renderTick);
        };

        renderTick();

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseover', onMouseOver);
            window.removeEventListener('mouseout', onMouseOut);
            document.removeEventListener('mouseleave', onMouseLeaveWindow);
            document.removeEventListener('mouseenter', onMouseEnterWindow);
            cancelAnimationFrame(frameId);
        };
    }, [hasMouse]);

    // NEW: Completely unmount the component on mobile to save performance
    if (!hasMouse) return null;

    return (
        <div
            ref={dotRef}
            className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[100] mix-blend-difference opacity-0 transition-opacity duration-300"
            style={{
                transformOrigin: 'center center'
            }}
        />
    );
}