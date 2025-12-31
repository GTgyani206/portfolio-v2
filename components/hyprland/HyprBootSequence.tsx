"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HyprBootSequenceProps {
    onComplete: () => void;
    skipDelay?: number;
}

const bootMessages = [
    { text: ":: Booting Arch Linux...", color: "blue", delay: 0 },
    { text: "[  OK  ] Started systemd-journald.service", color: "green", delay: 200 },
    { text: "[  OK  ] Reached target Local File Systems", color: "green", delay: 400 },
    { text: "[  OK  ] Started Network Manager", color: "green", delay: 600 },
    { text: "[  OK  ] Loading Hyprland compositor...", color: "green", delay: 800 },
    { text: "", color: "white", delay: 1000 },
    { text: "   ╔══════════════════════════════════════════════════════════╗", color: "mauve", delay: 1100 },
    { text: "   ║                                                          ║", color: "mauve", delay: 1150 },
    { text: "   ║   Welcome to Gyanendra's Portfolio                       ║", color: "mauve", delay: 1200 },
    { text: "   ║                                                          ║", color: "mauve", delay: 1250 },
    { text: "   ║   Full-Stack Developer | AI Enthusiast | Open Source     ║", color: "text", delay: 1300 },
    { text: "   ║                                                          ║", color: "mauve", delay: 1350 },
    { text: "   ║   ⚡ Building the future, one commit at a time           ║", color: "green", delay: 1400 },
    { text: "   ║                                                          ║", color: "mauve", delay: 1450 },
    { text: "   ╚══════════════════════════════════════════════════════════╝", color: "mauve", delay: 1500 },
    { text: "", color: "white", delay: 1600 },
    { text: "[  OK  ] Loading workspace environment...", color: "green", delay: 1700 },
    { text: "[  OK  ] Starting Waybar status bar...", color: "green", delay: 1900 },
    { text: "[  OK  ] Initializing terminal emulator...", color: "green", delay: 2100 },
    { text: "", color: "white", delay: 2300 },
    { text: ":: System ready. Press any key or wait to continue...", color: "yellow", delay: 2400 },
];

export function HyprBootSequence({ onComplete, skipDelay = 4000 }: HyprBootSequenceProps) {
    const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        // Show messages progressively
        bootMessages.forEach((msg, index) => {
            setTimeout(() => {
                setVisibleMessages((prev) => [...prev, index]);
            }, msg.delay);
        });

        // Auto-complete after skipDelay
        const autoComplete = setTimeout(() => {
            handleComplete();
        }, skipDelay);

        // Listen for any key press to skip
        const handleKeyPress = () => {
            if (visibleMessages.length > 5) {
                handleComplete();
            }
        };

        const handleClick = () => {
            if (visibleMessages.length > 5) {
                handleComplete();
            }
        };

        window.addEventListener("keydown", handleKeyPress);
        window.addEventListener("click", handleClick);

        return () => {
            clearTimeout(autoComplete);
            window.removeEventListener("keydown", handleKeyPress);
            window.removeEventListener("click", handleClick);
        };
    }, [skipDelay, visibleMessages.length]);

    const handleComplete = () => {
        if (!isComplete) {
            setIsComplete(true);
            setTimeout(() => {
                onComplete();
            }, 300);
        }
    };

    const getColorClass = (color: string) => {
        const colorMap: Record<string, string> = {
            blue: "text-[var(--hypr-blue)]",
            green: "text-[var(--hypr-green)]",
            yellow: "text-[var(--hypr-yellow)]",
            red: "text-[var(--hypr-red)]",
            mauve: "text-[var(--hypr-mauve)]",
            text: "text-[var(--hypr-text)]",
            white: "text-[var(--hypr-text)]",
        };
        return colorMap[color] || "text-[var(--hypr-text)]";
    };

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[100] bg-[var(--hypr-crust)] flex items-center justify-center overflow-hidden"
                >
                    <div className="w-full max-w-3xl px-8 font-mono text-sm">
                        {/* Boot messages */}
                        <div className="space-y-1">
                            {bootMessages.map((msg, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={
                                        visibleMessages.includes(index)
                                            ? { opacity: 1, x: 0 }
                                            : { opacity: 0, x: -10 }
                                    }
                                    transition={{ duration: 0.15, ease: "easeOut" }}
                                    className={`${getColorClass(msg.color)} whitespace-pre`}
                                >
                                    {msg.text}
                                </motion.div>
                            ))}
                        </div>

                        {/* Blinking cursor at the end */}
                        {visibleMessages.length >= bootMessages.length && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                                className="inline-block w-2 h-4 bg-[var(--hypr-mauve)] ml-1 mt-2"
                            />
                        )}

                        {/* Skip hint */}
                        {visibleMessages.length > 5 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.5 }}
                                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-[var(--hypr-subtext0)]"
                            >
                                Press any key or click to skip...
                            </motion.div>
                        )}
                    </div>

                    {/* Scanlines effect */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-[0.03]"
                        style={{
                            backgroundImage:
                                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
                        }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default HyprBootSequence;
