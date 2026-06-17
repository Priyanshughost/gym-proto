import React, { useEffect, useRef } from 'react';

export default function CursorDot() {
    const dotRef = useRef(null);

    useEffect(() => {
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

            // Failsafe: Ensure the dot becomes visible the millisecond the mouse moves,
            // covering cases where the mouse is already inside the window on page load.
            if (dot.style.opacity !== '1') {
                dot.style.opacity = '1';
            }
        };

        const onMouseOver = (e) => {
            const isInteractive = e.target.closest('[data-hover]');
            if (isInteractive) {
                targetHoverScale = 5;
            }
        };

        const onMouseOut = (e) => {
            targetHoverScale = 1;
        };

        // NEW: Detect when the mouse leaves the browser window entirely
        const onMouseLeaveWindow = () => {
            if (dot) dot.style.opacity = '0';
        };

        // NEW: Detect when the mouse re-enters the browser window
        const onMouseEnterWindow = () => {
            if (dot) dot.style.opacity = '1';
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseover', onMouseOver);
        window.addEventListener('mouseout', onMouseOut);

        // Use document-level event listeners for window boundaries
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

            const baseStretch = Math.min(1 + speed * 0.04, 2.5);
            const baseSquash = Math.max(1 - speed * 0.04, 0.4);

            const finalStretch = baseStretch * currentHoverScale;
            const finalSquash = baseSquash * currentHoverScale;

            if (dot) {
                dot.style.transform = `translate3d(${dotPos.x - 8}px, ${dotPos.y - 8}px, 0) rotate(${angle}deg) scale(${finalStretch}, ${finalSquash})`;
            }

            lastDotPos.x = dotPos.x;
            lastDotPos.y = dotPos.y;

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
    }, []);

    return (
        <div
            ref={dotRef}
            // NEW: Added opacity-0 initially and transition-opacity duration-300 for a buttery fade
            className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-100 mix-blend-difference opacity-0 transition-opacity duration-300"
            style={{
                transformOrigin: 'center center'
            }}
        />
    );
}