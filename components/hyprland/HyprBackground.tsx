"use client";

import React, { useEffect } from "react";

export function HyprBackground() {
    useEffect(() => {
        // Create floating particles dynamically
        const container = document.getElementById("hypr-particles");
        if (!container) return;

        // Clear existing particles
        container.innerHTML = "";

        // Create particles
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement("div");
            particle.className = "particle";
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 20}s`;
            particle.style.animationDuration = `${15 + Math.random() * 15}s`;
            container.appendChild(particle);
        }
    }, []);

    return (
        <>
            {/* Gradient Background */}
            <div className="hypr-wallpaper" />

            {/* Floating Particles */}
            <div id="hypr-particles" className="hypr-particles" />

            {/* Subtle grid overlay */}
            <div
                className="fixed inset-0 z-[-1] opacity-[0.02] pointer-events-none"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(205, 214, 244, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(205, 214, 244, 0.1) 1px, transparent 1px)
          `,
                    backgroundSize: "50px 50px",
                }}
            />
        </>
    );
}

export default HyprBackground;
