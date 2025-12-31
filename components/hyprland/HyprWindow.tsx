"use client";

import React from "react";
import { X, Minus, Square } from "lucide-react";

interface HyprWindowProps {
    title: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
    onClose?: () => void;
    onMinimize?: () => void;
    onMaximize?: () => void;
    focused?: boolean;
    showControls?: boolean;
    style?: React.CSSProperties;
}

export function HyprWindow({
    title,
    icon,
    children,
    className = "",
    onClose,
    onMinimize,
    onMaximize,
    focused = false,
    showControls = true,
    style,
}: HyprWindowProps) {
    return (
        <div
            className={`hypr-window ${focused ? "focused" : ""} ${className}`}
            style={style}
        >
            {/* Title Bar */}
            <div className="hypr-window-titlebar">
                <div className="hypr-window-title">
                    {icon && <span className="text-[var(--hypr-mauve)]">{icon}</span>}
                    <span>{title}</span>
                </div>

                {showControls && (
                    <div className="hypr-window-controls">
                        {onMinimize && (
                            <button
                                className="hypr-window-btn minimize"
                                onClick={onMinimize}
                                aria-label="Minimize"
                            >
                                <Minus className="w-2 h-2 text-black opacity-0 hover:opacity-100" />
                            </button>
                        )}
                        {onMaximize && (
                            <button
                                className="hypr-window-btn maximize"
                                onClick={onMaximize}
                                aria-label="Maximize"
                            >
                                <Square className="w-2 h-2 text-black opacity-0 hover:opacity-100" />
                            </button>
                        )}
                        {onClose && (
                            <button
                                className="hypr-window-btn close"
                                onClick={onClose}
                                aria-label="Close"
                            >
                                <X className="w-2 h-2 text-black opacity-0 hover:opacity-100" />
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="hypr-window-content">{children}</div>
        </div>
    );
}

export default HyprWindow;
