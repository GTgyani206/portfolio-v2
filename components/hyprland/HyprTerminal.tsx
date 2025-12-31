"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";

interface CommandOutput {
    type: "input" | "output" | "error" | "system";
    content: string;
}

interface HyprTerminalProps {
    className?: string;
    onCommand?: (cmd: string) => void;
    onWorkspaceChange?: (workspace: number) => void;
    initialCommands?: string[];
}

// Arch Linux ASCII art for neofetch
const ARCH_ASCII = `
                   -\`
                  .o+\`
                 \`ooo/
                \`+oooo:
               \`+oooooo:
               -+oooooo+:
             \`/:-:++oooo+:
            \`/++++/+++++++:
           \`/++++++++++++++:
          \`/+++ooooooooooooo/\`
         ./ooosssso++osssssso+\`
        .oossssso-\`\`\`\`/ossssss+\`
       -osssssso.      :ssssssso.
      :osssssss/        osssso+++.
     /ossssssss/        +ssssooo/-
   \`/ossssso+/:-        -:/+osssso+-
  \`+sso+:-\`                 \`.-/+oso:
 \`++:.                           \`-/+/
 .\`                                 \`/
`;

// System info for neofetch
const SYSTEM_INFO = {
    user: "gyanendra",
    hostname: "portfolio",
    os: "Arch Linux x86_64",
    kernel: "6.7.0-arch1-1",
    uptime: "∞",
    packages: "42 (pacman)",
    shell: "zsh 5.9",
    resolution: "1920x1080",
    de: "Hyprland",
    wm: "Hyprland",
    terminal: "kitty",
    cpu: "Intel i7-12700K @ 5.0GHz",
    gpu: "NVIDIA RTX 4090",
    memory: "32GB / 64GB",
};

// Available commands
const COMMANDS: Record<string, string> = {
    help: "Available commands: neofetch, ls, cat, cd, skills, projects, about, htop, cmatrix, clear, exit",
    ls: "about.md  projects/  skills.json  contact.md  .config/  .secrets/",
    pwd: "/home/gyanendra",
    whoami: "gyanendra",
    date: new Date().toString(),
    uname: "Linux portfolio 6.7.0-arch1-1 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
    hostname: "portfolio",
    arch: "x86_64",
};

export function HyprTerminal({
    className = "",
    onCommand,
    onWorkspaceChange,
    initialCommands = ["neofetch"],
}: HyprTerminalProps) {
    const [history, setHistory] = useState<CommandOutput[]>([]);
    const [input, setInput] = useState("");
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [isRunningCmatrix, setIsRunningCmatrix] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const outputRef = useRef<HTMLDivElement>(null);

    // Generate neofetch output
    const generateNeofetch = useCallback(() => {
        const lines = ARCH_ASCII.split("\n");
        const infoLines = [
            `<span class="term-green term-bold">${SYSTEM_INFO.user}</span><span class="term-gray">@</span><span class="term-magenta term-bold">${SYSTEM_INFO.hostname}</span>`,
            `<span class="term-gray">──────────────────────</span>`,
            `<span class="neofetch-label">OS</span><span class="neofetch-separator">:</span> <span class="neofetch-value">${SYSTEM_INFO.os}</span>`,
            `<span class="neofetch-label">Kernel</span><span class="neofetch-separator">:</span> <span class="neofetch-value">${SYSTEM_INFO.kernel}</span>`,
            `<span class="neofetch-label">Uptime</span><span class="neofetch-separator">:</span> <span class="neofetch-value">${SYSTEM_INFO.uptime}</span>`,
            `<span class="neofetch-label">Packages</span><span class="neofetch-separator">:</span> <span class="neofetch-value">${SYSTEM_INFO.packages}</span>`,
            `<span class="neofetch-label">Shell</span><span class="neofetch-separator">:</span> <span class="neofetch-value">${SYSTEM_INFO.shell}</span>`,
            `<span class="neofetch-label">Resolution</span><span class="neofetch-separator">:</span> <span class="neofetch-value">${SYSTEM_INFO.resolution}</span>`,
            `<span class="neofetch-label">DE</span><span class="neofetch-separator">:</span> <span class="neofetch-value">${SYSTEM_INFO.de}</span>`,
            `<span class="neofetch-label">WM</span><span class="neofetch-separator">:</span> <span class="neofetch-value">${SYSTEM_INFO.wm}</span>`,
            `<span class="neofetch-label">Terminal</span><span class="neofetch-separator">:</span> <span class="neofetch-value">${SYSTEM_INFO.terminal}</span>`,
            `<span class="neofetch-label">CPU</span><span class="neofetch-separator">:</span> <span class="neofetch-value">${SYSTEM_INFO.cpu}</span>`,
            `<span class="neofetch-label">GPU</span><span class="neofetch-separator">:</span> <span class="neofetch-value">${SYSTEM_INFO.gpu}</span>`,
            `<span class="neofetch-label">Memory</span><span class="neofetch-separator">:</span> <span class="neofetch-value">${SYSTEM_INFO.memory}</span>`,
            ``,
            `<span class="neofetch-colors">███</span><span style="color:var(--hypr-red)">███</span><span style="color:var(--hypr-green)">███</span><span style="color:var(--hypr-yellow)">███</span><span style="color:var(--hypr-blue)">███</span><span style="color:var(--hypr-mauve)">███</span><span style="color:var(--hypr-teal)">███</span><span style="color:var(--hypr-text)">███</span>`,
        ];

        let output = '<div class="flex gap-4">';
        output += `<pre class="neofetch-ascii text-[var(--hypr-blue)]">${ARCH_ASCII}</pre>`;
        output += '<div class="neofetch-info flex flex-col justify-center">';
        infoLines.forEach((line) => {
            output += `<div>${line}</div>`;
        });
        output += "</div></div>";
        return output;
    }, []);

    // Generate skills output
    const generateSkills = useCallback(() => {
        const skills = [
            { name: "JavaScript/TypeScript", level: 95 },
            { name: "React/Next.js", level: 90 },
            { name: "Python", level: 85 },
            { name: "Rust", level: 75 },
            { name: "Node.js", level: 88 },
            { name: "PostgreSQL/MongoDB", level: 80 },
            { name: "Docker/Kubernetes", level: 70 },
            { name: "Gen AI/LLMs", level: 85 },
        ];

        let output =
            '<div class="space-y-1"><div class="term-cyan term-bold mb-2">// Technical Skills</div>';
        skills.forEach((skill) => {
            const filled = Math.floor(skill.level / 5);
            const empty = 20 - filled;
            const bar = `<span class="term-green">${"█".repeat(filled)}</span><span class="term-gray">${"░".repeat(empty)}</span>`;
            output += `<div><span class="term-yellow">${skill.name.padEnd(20)}</span> ${bar} <span class="term-magenta">${skill.level}%</span></div>`;
        });
        output += "</div>";
        return output;
    }, []);

    // Generate projects output
    const generateProjects = useCallback(() => {
        const projects = [
            {
                name: "IECS26",
                desc: "IEEE Conference website",
                tech: "Next.js, TypeScript",
            },
            {
                name: "VORTEX-lang",
                desc: "GPU-accelerated language",
                tech: "Rust, WASM",
            },
            { name: "Do Sakhi", desc: "AI-powered storyteller", tech: "OpenAI, Next.js" },
            { name: "Windows XP ChatBot", desc: "Retro UI chatbot", tech: "YouWare" },
        ];

        let output =
            '<div class="space-y-2"><div class="term-cyan term-bold">// Project Quests</div>';
        projects.forEach((p, i) => {
            output += `<div><span class="term-green">[${i + 1}]</span> <span class="term-yellow term-bold">${p.name}</span></div>`;
            output += `<div class="ml-4"><span class="term-gray">├──</span> <span class="term-white">${p.desc}</span></div>`;
            output += `<div class="ml-4"><span class="term-gray">└──</span> <span class="term-magenta">${p.tech}</span></div>`;
        });
        output += "</div>";
        return output;
    }, []);

    // Generate about output
    const generateAbout = useCallback(() => {
        return `<div class="space-y-2">
<div class="term-cyan term-bold">// About Me</div>
<div class="term-gray">───────────────────────────────────</div>
<div><span class="term-yellow">Name:</span> <span class="term-white">Gyanendra Thakur</span></div>
<div><span class="term-yellow">Role:</span> <span class="term-white">Full-Stack Developer & AI Enthusiast</span></div>
<div><span class="term-yellow">Location:</span> <span class="term-white">Cyberspace (India)</span></div>
<div class="term-gray">───────────────────────────────────</div>
<div class="term-white">Passionate about creating innovative solutions at the intersection of technology and creativity. Specialized in building secure, scalable applications with a focus on user experience.</div>
<div class="mt-2"><span class="term-green">Status:</span> <span class="term-green term-bold">█ Available for hire</span></div>
</div>`;
    }, []);

    // Generate htop-like output
    const generateHtop = useCallback(() => {
        return `<div class="space-y-1">
<div class="term-cyan term-bold">// htop - Process Viewer</div>
<div class="term-gray">────────────────────────────────────────────────</div>
<div><span class="term-green">CPU[</span><span class="term-green">████████</span><span class="term-gray">░░░░░░░░░░</span><span class="term-green">]</span> <span class="term-white">42.0%</span></div>
<div><span class="term-blue">Mem[</span><span class="term-blue">██████████████</span><span class="term-gray">░░░░</span><span class="term-blue">]</span> <span class="term-white">32.0G/64.0G</span></div>
<div><span class="term-yellow">Swp[</span><span class="term-yellow">██</span><span class="term-gray">░░░░░░░░░░░░░░░░</span><span class="term-yellow">]</span> <span class="term-white">1.2G/8.0G</span></div>
<div class="term-gray">────────────────────────────────────────────────</div>
<div><span class="term-white">  PID USER      PRI  NI  VIRT   RES   SHR S CPU% MEM%   TIME+  Command</span></div>
<div><span class="term-green"> 1337 gyanendra  20   0 2.4G  512M  128M S 12.0  0.8  42:00.00 code</span></div>
<div><span class="term-green"> 2048 gyanendra  20   0 1.8G  384M   96M S  8.0  0.6  24:00.00 hyprland</span></div>
<div><span class="term-green"> 3141 gyanendra  20   0 1.2G  256M   64M S  4.0  0.4  12:00.00 kitty</span></div>
<div><span class="term-green"> 4096 gyanendra  20   0  800M  128M   32M S  2.0  0.2   6:00.00 waybar</span></div>
<div class="term-gray">────────────────────────────────────────────────</div>
<div class="term-yellow">Press 'q' to exit (just kidding, this is fake htop)</div>
</div>`;
    }, []);

    // Process command
    const processCommand = useCallback(
        (cmd: string) => {
            const trimmedCmd = cmd.trim().toLowerCase();
            const parts = trimmedCmd.split(/\s+/);
            const command = parts[0];
            const args = parts.slice(1);

            let output = "";
            let type: CommandOutput["type"] = "output";

            switch (command) {
                case "":
                    return { type: "output" as const, content: "" };

                case "neofetch":
                    output = generateNeofetch();
                    break;

                case "skills":
                case "skill":
                    output = generateSkills();
                    break;

                case "projects":
                case "project":
                    output = generateProjects();
                    break;

                case "about":
                    output = generateAbout();
                    break;

                case "htop":
                case "top":
                    output = generateHtop();
                    break;

                case "cat":
                    if (args[0] === "about.md" || args[0] === "about") {
                        output = generateAbout();
                    } else if (args[0] === "skills.json" || args[0] === "skills") {
                        output = generateSkills();
                    } else if (args[0] === ".secrets/password.txt") {
                        output = '<span class="term-red">Nice try! 😏</span>';
                    } else {
                        output = `<span class="term-red">cat: ${args[0] || "?"}: No such file or directory</span>`;
                        type = "error";
                    }
                    break;

                case "cd":
                    if (args[0] === "projects" || args[0] === "projects/") {
                        output =
                            '<span class="term-green">Switching to projects workspace...</span>';
                        if (onWorkspaceChange) onWorkspaceChange(2);
                    } else if (args[0] === "skills" || args[0] === ".config") {
                        output =
                            '<span class="term-green">Switching to skills workspace...</span>';
                        if (onWorkspaceChange) onWorkspaceChange(3);
                    } else if (args[0] === "contact") {
                        output =
                            '<span class="term-green">Switching to contact workspace...</span>';
                        if (onWorkspaceChange) onWorkspaceChange(4);
                    } else if (args[0] === "~" || args[0] === "" || !args[0]) {
                        output =
                            '<span class="term-green">Switching to home workspace...</span>';
                        if (onWorkspaceChange) onWorkspaceChange(1);
                    } else {
                        output = `<span class="term-red">cd: ${args[0]}: No such directory</span>`;
                        type = "error";
                    }
                    break;

                case "clear":
                case "cls":
                    setHistory([]);
                    return null;

                case "cmatrix":
                    setIsRunningCmatrix(true);
                    setTimeout(() => setIsRunningCmatrix(false), 5000);
                    output =
                        '<span class="term-green">Starting cmatrix... (auto-stops in 5s)</span>';
                    break;

                case "sudo":
                    if (args.join(" ").includes("rm -rf")) {
                        output = `<div class="space-y-1">
<span class="term-red term-bold">⚠️  CRITICAL ERROR ⚠️</span>
<span class="term-red">rm: cannot remove '/': Operation not permitted</span>
<span class="term-yellow">Nice try! The portfolio is protected by:</span>
<span class="term-green">  ✓ Common sense</span>
<span class="term-green">  ✓ Good vibes</span>
<span class="term-green">  ✓ This being a fake terminal</span>
</div>`;
                        type = "error";
                    } else {
                        output = '<span class="term-yellow">[sudo] password for gyanendra: ******</span>\n<span class="term-red">sudo: 3 incorrect password attempts</span>';
                        type = "error";
                    }
                    break;

                case "exit":
                case "quit":
                    output =
                        '<span class="term-yellow">Why would you want to leave? 🥺</span>\n<span class="term-gray">Hint: You can\'t actually exit, this is a portfolio!</span>';
                    break;

                case "help":
                case "man":
                case "--help":
                case "-h":
                    output = `<div class="space-y-2">
<div class="term-cyan term-bold">// Available Commands</div>
<div class="term-gray">────────────────────────────────────</div>
<div><span class="term-green">neofetch</span>     <span class="term-gray">-</span> <span class="term-white">Display system information</span></div>
<div><span class="term-green">about</span>        <span class="term-gray">-</span> <span class="term-white">Show about me</span></div>
<div><span class="term-green">projects</span>     <span class="term-gray">-</span> <span class="term-white">List all projects</span></div>
<div><span class="term-green">skills</span>       <span class="term-gray">-</span> <span class="term-white">Display skill bars</span></div>
<div><span class="term-green">ls</span>           <span class="term-gray">-</span> <span class="term-white">List files</span></div>
<div><span class="term-green">cat [file]</span>   <span class="term-gray">-</span> <span class="term-white">View file contents</span></div>
<div><span class="term-green">cd [dir]</span>     <span class="term-gray">-</span> <span class="term-white">Change workspace</span></div>
<div><span class="term-green">htop</span>         <span class="term-gray">-</span> <span class="term-white">Fake process viewer</span></div>
<div><span class="term-green">cmatrix</span>      <span class="term-gray">-</span> <span class="term-white">Matrix rain effect</span></div>
<div><span class="term-green">clear</span>        <span class="term-gray">-</span> <span class="term-white">Clear terminal</span></div>
<div class="term-gray">────────────────────────────────────</div>
<div class="term-yellow">Tip: Try "sudo rm -rf /" for fun 😉</div>
</div>`;
                    break;

                default:
                    if (COMMANDS[command]) {
                        output = `<span class="term-white">${COMMANDS[command]}</span>`;
                    } else {
                        output = `<span class="term-red">zsh: command not found: ${command}</span>\n<span class="term-gray">Type 'help' for available commands</span>`;
                        type = "error";
                    }
            }

            return { type, content: output };
        },
        [generateNeofetch, generateSkills, generateProjects, generateAbout, generateHtop, onWorkspaceChange]
    );

    // Handle command submission
    const handleSubmit = useCallback(
        (e?: React.FormEvent) => {
            if (e) e.preventDefault();

            if (!input.trim() && input !== "") return;

            // Add input to history
            const newHistory: CommandOutput[] = [
                ...history,
                { type: "input", content: input },
            ];

            // Process command
            const result = processCommand(input);
            if (result) {
                newHistory.push(result);
            }

            setHistory(newHistory);

            // Update command history for navigation
            if (input.trim()) {
                setCommandHistory((prev) => [...prev, input]);
            }

            setInput("");
            setHistoryIndex(-1);

            // Callback
            if (onCommand) onCommand(input);
        },
        [input, history, processCommand, onCommand]
    );

    // Handle key navigation
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === "ArrowUp") {
                e.preventDefault();
                if (commandHistory.length > 0) {
                    const newIndex =
                        historyIndex === -1
                            ? commandHistory.length - 1
                            : Math.max(0, historyIndex - 1);
                    setHistoryIndex(newIndex);
                    setInput(commandHistory[newIndex]);
                }
            } else if (e.key === "ArrowDown") {
                e.preventDefault();
                if (historyIndex !== -1) {
                    const newIndex = historyIndex + 1;
                    if (newIndex >= commandHistory.length) {
                        setHistoryIndex(-1);
                        setInput("");
                    } else {
                        setHistoryIndex(newIndex);
                        setInput(commandHistory[newIndex]);
                    }
                }
            } else if (e.key === "Tab") {
                e.preventDefault();
                // Simple tab completion
                const commands = [
                    "neofetch",
                    "help",
                    "about",
                    "projects",
                    "skills",
                    "ls",
                    "cat",
                    "cd",
                    "htop",
                    "cmatrix",
                    "clear",
                ];
                const matches = commands.filter((c) =>
                    c.startsWith(input.toLowerCase())
                );
                if (matches.length === 1) {
                    setInput(matches[0]);
                }
            } else if (e.ctrlKey && e.key === "l") {
                e.preventDefault();
                setHistory([]);
            }
        },
        [commandHistory, historyIndex, input]
    );

    // Run initial commands
    useEffect(() => {
        initialCommands.forEach((cmd) => {
            const result = processCommand(cmd);
            if (result) {
                setHistory((prev) => [
                    ...prev,
                    { type: "input", content: cmd },
                    result,
                ]);
            }
        });
    }, []);

    // Auto-scroll to bottom
    useEffect(() => {
        if (outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
    }, [history]);

    // Focus input on click
    const focusInput = () => {
        inputRef.current?.focus();
    };

    // Render prompt
    const renderPrompt = () => (
        <span className="hypr-prompt">
            <span className="hypr-prompt-user">gyanendra</span>
            <span className="hypr-prompt-at">@</span>
            <span className="hypr-prompt-host">portfolio</span>
            <span className="text-[var(--hypr-subtext0)]">:</span>
            <span className="hypr-prompt-path">~</span>
            <span className="hypr-prompt-symbol"> $ </span>
        </span>
    );

    return (
        <div
            className={`hypr-terminal h-full flex flex-col ${className}`}
            onClick={focusInput}
        >
            {/* CMatrix overlay */}
            {isRunningCmatrix && (
                <div className="absolute inset-0 z-10 bg-black overflow-hidden pointer-events-none">
                    {Array.from({ length: 50 }).map((_, i) => (
                        <div
                            key={i}
                            className="absolute text-green-400 text-opacity-80 animate-pulse"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                fontSize: `${8 + Math.random() * 8}px`,
                                animationDelay: `${Math.random() * 2}s`,
                            }}
                        >
                            {String.fromCharCode(0x30a0 + Math.random() * 96)}
                        </div>
                    ))}
                </div>
            )}

            {/* Terminal output */}
            <div
                ref={outputRef}
                className="flex-1 overflow-y-auto p-4 space-y-1 no-scrollbar"
            >
                {history.map((entry, index) => (
                    <div key={index} className="hypr-terminal-output">
                        {entry.type === "input" ? (
                            <div>
                                {renderPrompt()}
                                <span className="text-[var(--hypr-text)]">{entry.content}</span>
                            </div>
                        ) : (
                            <div
                                dangerouslySetInnerHTML={{ __html: entry.content }}
                                className={
                                    entry.type === "error" ? "text-[var(--hypr-red)]" : ""
                                }
                            />
                        )}
                    </div>
                ))}

                {/* Current input line */}
                <form onSubmit={handleSubmit} className="flex items-center">
                    {renderPrompt()}
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-transparent border-none outline-none text-[var(--hypr-text)] caret-[var(--hypr-mauve)]"
                        autoFocus
                        spellCheck={false}
                        autoComplete="off"
                    />
                    <span className="hypr-cursor" />
                </form>
            </div>
        </div>
    );
}

export default HyprTerminal;
