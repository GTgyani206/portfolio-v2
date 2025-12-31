"use client";

import React from "react";
import { Volume2, VolumeX, Wifi, Battery, Clock, Menu } from "lucide-react";

interface HyprWaybarProps {
    currentWorkspace: number;
    onWorkspaceChange: (workspace: number) => void;
    soundEnabled: boolean;
    onSoundToggle: () => void;
}

const workspaces = [
    { id: 1, name: "home", icon: "󰋜" },
    { id: 2, name: "projects", icon: "󰈙" },
    { id: 3, name: "skills", icon: "󰆧" },
    { id: 4, name: "contact", icon: "󰇮" },
];

export function HyprWaybar({
    currentWorkspace,
    onWorkspaceChange,
    soundEnabled,
    onSoundToggle,
}: HyprWaybarProps) {
    const [time, setTime] = React.useState<Date | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    React.useEffect(() => {
        setTime(new Date());
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date | null) => {
        if (!date) return "--:--";
        return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
    };

    const formatDate = (date: Date | null) => {
        if (!date) return "---";
        return date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <>
            <div className="waybar fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-2 md:px-4">
                {/* Left Section - Workspaces */}
                <div className="flex items-center gap-2 md:gap-3">
                    {/* Mobile menu button */}
                    <button
                        className="md:hidden p-1.5 rounded-lg bg-[rgba(49,50,68,0.6)]"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <Menu className="w-4 h-4 text-[var(--hypr-mauve)]" />
                    </button>

                    {/* Desktop workspace indicators */}
                    <div className="hidden md:flex items-center gap-2 bg-[rgba(49,50,68,0.6)] rounded-full px-3 py-1">
                        {workspaces.map((ws) => (
                            <button
                                key={ws.id}
                                onClick={() => onWorkspaceChange(ws.id)}
                                className={`workspace-indicator transition-all ${currentWorkspace === ws.id ? "active" : ""
                                    }`}
                                title={ws.name}
                            />
                        ))}
                    </div>

                    {/* Current workspace name */}
                    <span className="text-[var(--hypr-subtext0)] text-xs">
                        {workspaces.find((w) => w.id === currentWorkspace)?.name}
                    </span>
                </div>

                {/* Center Section - Active Window Title (hidden on mobile) */}
                <div className="hidden sm:block absolute left-1/2 transform -translate-x-1/2">
                    <span className="text-[var(--hypr-text)] text-xs md:text-sm font-medium">
                        gyanendra@portfolio
                    </span>
                </div>

                {/* Right Section - System Tray */}
                <div className="flex items-center gap-0.5 md:gap-1">
                    {/* Network - hidden on small mobile */}
                    <div className="hidden sm:flex waybar-module items-center gap-1 md:gap-2 rounded-lg">
                        <Wifi className="w-3 h-3 text-[var(--hypr-teal)]" />
                        <span className="hidden md:inline text-[var(--hypr-subtext1)] text-xs">Connected</span>
                    </div>

                    {/* CPU/Memory - hidden on mobile */}
                    <div className="hidden lg:flex waybar-module items-center gap-2 rounded-lg">
                        <span className="text-[var(--hypr-yellow)] text-xs">󰍛</span>
                        <span className="text-[var(--hypr-subtext1)] text-xs">12%</span>
                    </div>

                    {/* Sound */}
                    <button
                        onClick={onSoundToggle}
                        className="waybar-module flex items-center gap-2 rounded-lg hover:bg-[rgba(205,214,244,0.1)] p-1.5 md:p-2"
                    >
                        {soundEnabled ? (
                            <Volume2 className="w-3 h-3 text-[var(--hypr-green)]" />
                        ) : (
                            <VolumeX className="w-3 h-3 text-[var(--hypr-red)]" />
                        )}
                    </button>

                    {/* Battery - hidden on mobile */}
                    <div className="hidden md:flex waybar-module items-center gap-2 rounded-lg">
                        <Battery className="w-3 h-3 text-[var(--hypr-green)]" />
                        <span className="text-[var(--hypr-subtext1)] text-xs">100%</span>
                    </div>

                    {/* Time & Date */}
                    <div className="waybar-module flex items-center gap-1 md:gap-3 bg-[rgba(49,50,68,0.6)] rounded-lg ml-1 md:ml-2 px-2 py-1">
                        <div className="flex items-center gap-1 md:gap-2">
                            <Clock className="w-3 h-3 text-[var(--hypr-mauve)]" />
                            <span className="text-[var(--hypr-text)] text-xs font-semibold">
                                {formatTime(time)}
                            </span>
                        </div>
                        <span className="hidden sm:inline text-[var(--hypr-subtext0)] text-xs">
                            {formatDate(time)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Mobile Workspace Drawer */}
            {mobileMenuOpen && (
                <div
                    className="md:hidden fixed inset-0 z-40 bg-black/50"
                    onClick={() => setMobileMenuOpen(false)}
                >
                    <div
                        className="absolute top-10 left-0 w-48 bg-[var(--hypr-mantle)] border border-[var(--hypr-surface0)] rounded-r-xl p-3 space-y-2"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="text-xs text-[var(--hypr-subtext0)] mb-2 px-2">Workspaces</div>
                        {workspaces.map((ws) => (
                            <button
                                key={ws.id}
                                onClick={() => {
                                    onWorkspaceChange(ws.id);
                                    setMobileMenuOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${currentWorkspace === ws.id
                                        ? "bg-[var(--hypr-mauve)] text-[var(--hypr-crust)]"
                                        : "hover:bg-[var(--hypr-surface0)] text-[var(--hypr-text)]"
                                    }`}
                            >
                                <span className="w-2 h-2 rounded-full bg-current" />
                                <span className="capitalize text-sm">{ws.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

export default HyprWaybar;
