"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Code,
  User,
  Trophy,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Volume2,
  VolumeX,
  HelpCircle,
  X,
  ChevronRight,
  Cloud,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import cloudinaryLoader from "../utils/cloudinaryLoader";
import Link from "next/link";

export default function HackerPortfolio() {
  const [currentXP, setCurrentXP] = useState(45);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "Welcome to my portfolio v1.0.1",
    "Type 'help' for available commands",
    "$ ",
  ]);
  const [currentSection, setCurrentSection] = useState("intro");
  const [isGlitchMode, setIsGlitchMode] = useState(false);
  const [uptime, setUptime] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [displayText, setDisplayText] = useState("");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isWalkthroughOpen, setIsWalkthroughOpen] = useState(false);
  const [walkthroughStep, setWalkthroughStep] = useState(0);
  const [hasSeenWalkthrough, setHasSeenWalkthrough] = useState(false);

  // Audio refs
  const ambientAudioRef = useRef<HTMLAudioElement | null>(null);
  const typingAudioRef = useRef<HTMLAudioElement | null>(null);
  const beepAudioRef = useRef<HTMLAudioElement | null>(null);
  const glitchAudioRef = useRef<HTMLAudioElement | null>(null);

  const introText =
    "> Booting Portfolio...\n> Access granted. Welcome, hacker.\n> Initializing portfolio matrix...";

  const walkthroughSteps = [
    {
      title: "Welcome visitor !!",
      content:
        "This is my portfolio website. Navigate through different sections to discover my projects, skills, and achievements.",
      target: "hero",
      position: "center",
    },
    {
      title: "Interactive Terminal",
      content:
        "Click '~/terminal' to open the command interface. Try commands like 'help', 'about', 'projects', or even 'konami' for easter eggs!",
      target: "terminal-button",
      position: "bottom",
    },
    {
      title: "XP System",
      content:
        "Earn experience points by exploring the site and discovering hidden features. Your progress is tracked in real-time.",
      target: "xp-display",
      position: "top",
    },
    {
      title: "Project Quests",
      content:
        "Each project is styled as a terminal quest. Hover over them to see interactive effects and click to explore.",
      target: "projects",
      position: "top",
    },
    {
      title: "Achievement System",
      content:
        "Unlock badges by completing various actions. Some achievements are hidden - can you find them all?",
      target: "achievements",
      position: "top",
    },
    {
      title: "Sound Experience",
      content:
        "Enable sound for an immersive cyberpunk atmosphere with ambient music and interactive sound effects.",
      target: "sound-toggle",
      position: "bottom",
    },
  ];

  // Initialize audio on first user interaction
  useEffect(() => {
    const initAudio = () => {
      // Create audio elements
      ambientAudioRef.current = new Audio();
      typingAudioRef.current = new Audio();
      beepAudioRef.current = new Audio();
      glitchAudioRef.current = new Audio();

      // Set audio sources (using Web Audio API to generate sounds)
      createAmbientSound();
      createTypingSound();
      createBeepSound();
      createGlitchSound();
    };

    const handleFirstInteraction = () => {
      initAudio();
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("keydown", handleFirstInteraction);
    };

    document.addEventListener("click", handleFirstInteraction);
    document.addEventListener("keydown", handleFirstInteraction);

    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("keydown", handleFirstInteraction);
    };
  }, []);

  // Show walkthrough on first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem("portfolio-visited");
    if (!hasVisited) {
      setTimeout(() => {
        setIsWalkthroughOpen(true);
      }, 2000);
      localStorage.setItem("portfolio-visited", "true");
    }
  }, []);

  // Create ambient cyberpunk sound
  const createAmbientSound = () => {
    if (!ambientAudioRef.current) return;

    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const oscillator1 = audioContext.createOscillator();
    const oscillator2 = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator1.frequency.setValueAtTime(80, audioContext.currentTime);
    oscillator2.frequency.setValueAtTime(120, audioContext.currentTime);
    oscillator1.type = "sine";
    oscillator2.type = "triangle";

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);

    oscillator1.connect(gainNode);
    oscillator2.connect(gainNode);
    gainNode.connect(audioContext.destination);

    if (soundEnabled) {
      oscillator1.start();
      oscillator2.start();
    }
  };

  // Create typing sound effect
  const createTypingSound = () => {
    if (!typingAudioRef.current) return;

    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.type = "square";
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.1,
    );

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  // Create beep sound
  const createBeepSound = () => {
    if (!beepAudioRef.current) return;

    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
    oscillator.type = "sine";
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.2,
    );

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.2);
  };

  // Create glitch sound
  const createGlitchSound = () => {
    if (!glitchAudioRef.current) return;

    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
      2000,
      audioContext.currentTime + 0.3,
    );
    oscillator.type = "sawtooth";
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.3,
    );

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  // Play sound effects
  const playTypingSound = () => {
    if (soundEnabled) createTypingSound();
  };

  const playBeepSound = () => {
    if (soundEnabled) createBeepSound();
  };

  const playGlitchSound = () => {
    if (soundEnabled) createGlitchSound();
  };

  // Typing animation effect with sound
  useEffect(() => {
    if (isTyping && displayText.length < introText.length) {
      const timer = setTimeout(() => {
        setDisplayText(introText.slice(0, displayText.length + 1));
        playTypingSound();
      }, 50);
      return () => clearTimeout(timer);
    } else if (displayText.length >= introText.length) {
      setIsTyping(false);
      playBeepSound();
    }
  }, [displayText, isTyping, introText]);

  // Uptime counter
  useEffect(() => {
    const timer = setInterval(() => {
      setUptime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Terminal commands
  const handleTerminalCommand = (command: string) => {
    const cmd = command.toLowerCase().trim();
    let response = "";
    let xpGain = 0;

    playBeepSound();

    switch (cmd) {
      case "help":
        response =
          "Available commands:\n- about: Show profile data\n- projects: List all quests\n- skills: Display tech stack\n- contact: Open communication channel\n- clear: Clear terminal\n- sudo root: Admin mode\n- konami: ???\n- sound: Toggle sound effects\n- walkthrough: Restart tutorial";
        xpGain = 5;
        break;
      case "about":
        response =
          '{\n  "name": "Gyanendra Thakur",\n  "role": "Full-Stack Hacker",\n  "location": "Cyberspace",\n  "status": "Online"\n}';
        xpGain = 10;
        break;
      case "projects":
        response =
          "Loading quest database...\n[✓] Neural Network Visualizer\n[✓] Blockchain Explorer\n[✓] AI Chat Interface\n[✓] Crypto Trading Bot";
        xpGain = 15;
        break;
      case "skills":
        response =
          "nmap techstack:\n[████████████] JavaScript/TypeScript\n[██████████  ] Python\n[████████    ] React/Next.js\n[██████      ] Node.js\n[████        ] Blockchain";
        xpGain = 10;
        break;
      case "contact":
        response =
          "Opening secure communication channel...\nEncryption: AES-256\nStatus: Ready for transmission";
        xpGain = 5;
        break;
      case "clear":
        setTerminalHistory(["$ "]);
        return;
      case "sudo root":
        response =
          "🔴 ADMIN MODE ACTIVATED\nWarning: Elevated privileges granted";
        setIsGlitchMode(true);
        playGlitchSound();
        setTimeout(() => setIsGlitchMode(false), 3000);
        xpGain = 25;
        break;
      case "konami":
        response =
          "🎮 Easter egg discovered! +50 XP\n↑↑↓↓←→←→BA\nSecret achievement unlocked!";
        xpGain = 50;
        break;
      case "sound":
        setSoundEnabled(!soundEnabled);
        response = `Sound effects ${!soundEnabled ? "enabled" : "disabled"}`;
        xpGain = 5;
        break;
      case "walkthrough":
        setIsWalkthroughOpen(true);
        setWalkthroughStep(0);
        response = "Restarting tutorial mode...";
        break;
      default:
        response = `Command not found: ${command}\nType 'help' for available commands`;
    }

    if (xpGain > 0) {
      setCurrentXP((prev) => Math.min(prev + xpGain, 100));
    }

    setTerminalHistory((prev) => [...prev, `$ ${command}`, response, "$ "]);
    setTerminalInput("");
  };

  const nextWalkthroughStep = () => {
    if (walkthroughStep < walkthroughSteps.length - 1) {
      setWalkthroughStep((prev) => prev + 1);
      playBeepSound();
    } else {
      setIsWalkthroughOpen(false);
      setWalkthroughStep(0);
      setCurrentXP((prev) => Math.min(prev + 20, 100));
      playBeepSound();
    }
  };

  const skipWalkthrough = () => {
    setIsWalkthroughOpen(false);
    setWalkthroughStep(0);
  };

  const projects = [
    {
      id: "Digital Twin",
      name: "Digital Twin",
      description:
        "A graph RAG based healthcare appand give real-time 3D visualization of patient",
      tech: ["Python", "TensorFlow", "Three.js"],
      status: "Active",
      xp: 250,
      link: "https://github.com/GTgyani206/Digital-Twin",
      gitlink: "https://github.com/GTgyani206/Digital-Twin",
    },
    {
      id: "VORTEX-lang",
      name: "VORTEX-lang",
      description:
        "A rust based language that is accelerated by the power of modern GPU",
      tech: ["Rust", "WASM"],
      status: "Production",
      xp: 500,
      link: "https://vortex-lang.onrender.com",
      gitlink: "https://github.com/GTgyani206/VORTEX-lang",
    },
    {
      id: "do-sakhi",
      name: "Do Sakhi",
      description: "An ai powered storyteler",
      tech: ["OpenAI API", "Next.js", "WebSocket"],
      status: "Production",
      xp: 500,
      link: "https://animegirl-bogy.onrender.com",
      gitlink: "https://github.com/GTgyani206/animeGirl",
    },
    {
      id: "vibe-code",
      name: "Windows XP ChatBot",
      description:
        "A vibe coded website that takes you back to 90s and re-imagine it",
      tech: ["YouWare", "Creativity"],
      status: "Production",
      xp: 500,
      gitlink: "https://www.youware.com/profile/XVuQJ807ZfWm6H4DqPWYPWFK4ZY2",
      link: "https://lmdmlyep2u.app.youware.com/",
    },
    {
      id: "get-more",
      name: "See my Github for more",
      description: "Star the repos and follow me for more updates",
      tech: [""],
      status: "Github",
      xp: "1000",
      gitlink: "https://github.com/GTgyani206",
      link: "https://github.com/GTgyani206",
    },
  ];

  const achievements = [
    {
      name: "Code Warrior",
      description: "500+ commits this year",
      unlocked: true,
    },
    {
      name: "Open Source Hero",
      description: "10+ public repositories",
      unlocked: true,
    },
    {
      name: "Bug Hunter",
      description: "Fixed 50+ critical issues",
      unlocked: true,
    },
    {
      name: "AI Whisperer",
      description: "Deployed ML models",
      unlocked: currentXP >= 80,
    },
    {
      name: "Crypto Pioneer",
      description: "Built DeFi application",
      unlocked: currentXP >= 100,
    },
  ];

  return (
    <div
      className={`min-h-screen bg-black text-green-400 font-mono relative overflow-hidden ${isGlitchMode ? "animate-pulse" : ""}`}
    >
      {/* Background Effects */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10" />
        <div
          className="absolute inset-0 bg-black opacity-50"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%2339ff14' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            animation: "pulse 2s infinite",
          }}
        />
      </div>

      {/* Scanlines Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="h-full w-full bg-gradient-to-b from-transparent via-green-400/5 to-transparent bg-[length:100%_4px] animate-pulse" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-green-400/30">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Terminal className="w-6 h-6 text-cyan-400" />
            <span className="text-cyan-400 font-bold">Gyanendra</span>
          </div>
          <div className="flex items-center space-x-6">
            <button
              id="terminal-button"
              onClick={() => {
                setIsTerminalOpen(!isTerminalOpen);
                playBeepSound();
              }}
              className="text-green-400 hover:text-cyan-400 transition-colors"
            >
              ~/terminal
            </button>
            <button
              id="sound-toggle"
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                playBeepSound();
              }}
              className="text-green-400 hover:text-cyan-400 transition-colors"
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => {
                setIsWalkthroughOpen(true);
                setWalkthroughStep(0);
                playBeepSound();
              }}
              className="text-green-400 hover:text-cyan-400 transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Walkthrough Modal */}
      <AnimatePresence>
        {isWalkthroughOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-black border border-cyan-400 rounded-lg p-6 max-w-md w-full relative"
            >
              <button
                onClick={skipWalkthrough}
                className="absolute top-4 right-4 text-red-400 hover:text-red-300"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-cyan-400">
                    {walkthroughSteps[walkthroughStep].title}
                  </h3>
                  <span className="text-sm text-gray-400">
                    {walkthroughStep + 1}/{walkthroughSteps.length}
                  </span>
                </div>

                <p className="text-gray-300">
                  {walkthroughSteps[walkthroughStep].content}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex space-x-1">
                    {walkthroughSteps.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full ${index === walkthroughStep ? "bg-cyan-400" : "bg-gray-600"}`}
                      />
                    ))}
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={skipWalkthrough}
                      className="border-gray-600 text-gray-400 hover:bg-gray-800"
                    >
                      Skip
                    </Button>
                    <Button
                      size="sm"
                      onClick={nextWalkthroughStep}
                      className="bg-cyan-400 text-black hover:bg-cyan-300"
                    >
                      {walkthroughStep === walkthroughSteps.length - 1
                        ? "Finish"
                        : "Next"}
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terminal Modal */}
      <AnimatePresence>
        {isTerminalOpen && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-20 left-4 right-4 z-50 bg-black border border-green-400 rounded-lg p-4 max-h-96 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-cyan-400">Terminal</span>
              <button
                onClick={() => {
                  setIsTerminalOpen(false);
                  playBeepSound();
                }}
                className="text-red-400 hover:text-red-300"
              >
                ✕
              </button>
            </div>
            <div className="space-y-1 mb-4 text-sm">
              {terminalHistory.map((line, index) => (
                <div key={index} className="whitespace-pre-wrap">
                  {line}
                </div>
              ))}
            </div>
            <div className="flex items-center">
              <span className="text-green-400 mr-2">$</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleTerminalCommand(terminalInput);
                  } else {
                    playTypingSound();
                  }
                }}
                className="flex-1 bg-transparent border-none outline-none text-green-400"
                placeholder="Enter command..."
                autoFocus
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section */}
        <section
          id="hero"
          className="min-h-screen flex items-center justify-center relative"
        >
          <div className="text-center space-y-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
              className="space-y-4"
            >
              <pre className="text-left text-sm md:text-base whitespace-pre-wrap">
                {displayText}
                <span className="animate-pulse">█</span>
              </pre>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3, duration: 1 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-6xl font-bold">
                <span className="text-cyan-400">GYANENDRA</span>{" "}
                <span className="text-pink-400">THAKUR</span>
              </h1>
              <p className="text-xl text-gray-300">
                Full-Stack Hacker • AI Enthusiast • Open Source Warrior
              </p>

              <div
                id="xp-display"
                className="grid grid-cols-3 gap-4 max-w-md mx-auto text-center"
              >
                <div className="border border-green-400/30 rounded p-3">
                  <div className="text-cyan-400 font-bold">UPTIME</div>
                  <div className="text-sm">
                    {Math.floor(uptime / 60)}:
                    {(uptime % 60).toString().padStart(2, "0")}
                  </div>
                </div>
                <div className="border border-green-400/30 rounded p-3">
                  <div className="text-cyan-400 font-bold">XP</div>
                  <div className="text-sm">{currentXP}/100</div>
                </div>
                <div className="border border-green-400/30 rounded p-3">
                  <div className="text-cyan-400 font-bold">STATUS</div>
                  <div className="text-sm text-green-400">ONLINE</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-bold text-cyan-400 mb-8">
                ~/profile.json
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <pre className="text-sm bg-gray-900/50 border border-green-400/30 rounded p-4 overflow-x-auto">
                    {`{
  "name": "Gyanendra Thakur",
  "role": "Full-Stack Developer",
  "specialization": [
    "AI/ML Engineering",
    "Blockchain Development",
    "Cybersecurity",
    "Open Source"
  ],
  "location": "Cyberspace",
  "languages": ["JavaScript", "Python", "Rust"],
  "frameworks": ["React", "Next.js", "WASM"],
  "databases": ["PostgreSQL", "MongoDB", "Redis"],
  "tools": ["Docker", "Kubernetes", "Git"],
  "status": "Available for hire",
  "mission": "Building the future, \n\t\t\t one commit at a time"
}`}
                  </pre>
                </div>

                <div className="space-y-6">
                  <div className="relative">
                    <div className=" mx-auto bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg p-1">
                      <div className=" bg-black rounded-lg flex items-center justify-center">
                        <Image
                          width="275"
                          height="200"
                          src="/images/profile.gif"
                          alt="protfoio_profile"
                          unoptimized={true}
                        />
                      </div>
                    </div>
                    <div className="absolute inset-0  rounded-lg animate-pulse" />
                  </div>
                </div>
              </div>
            </motion.div>
            <div className="text-center space-y-2">
              <br />
              <br />
              <p className="text-gray-300">
                {" "}
                Passionate about creating innovative solutions at the
                intersection of technology and creativity. Specialized in
                building secure, scalable applications with a focus on user
                experience.
              </p>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-4 bg-gray-900/20">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-cyan-400 mb-8">
                ~/quests
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)",
                    }}
                    onHoverStart={() => playBeepSound()}
                    className="border border-green-400/30 rounded-lg p-6 bg-black/50 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300 cursor-pointer"
                    onClick={() => {
                      playBeepSound();
                      setCurrentXP((prev) => Math.min(prev + 5, 100));
                    }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <Code className="w-6 h-6 text-cyan-400" />
                      <Badge
                        variant="outline"
                        className="text-green-400 border-green-400"
                      >
                        {project.status}
                      </Badge>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">
                      {project.name}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-purple-400 text-sm">
                        +{project.xp} XP
                      </span>
                      <div className="flex">
                        <Link
                          href={project.gitlink}
                          target="_blank"
                          className="m-2 p-2"
                        >
                          <Github />
                        </Link>
                        <Link
                          href={project.link}
                          target="_blank"
                          className="m-2"
                        >
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black"
                          >
                            View
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Achievements Section */}
        <section id="achievements" className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-cyan-400 mb-8">
                ~/achievements
              </h2>

              <div className="space-y-6">
                <div className="bg-gray-900/50 border border-green-400/30 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white font-bold">
                      Experience Points
                    </span>
                    <span className="text-cyan-400">{currentXP}/100 XP</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <motion.div
                      className="bg-gradient-to-r from-green-400 to-cyan-400 h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${currentXP}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={`border rounded-lg p-4 ${
                        achievement.unlocked
                          ? "border-green-400/50 bg-green-400/10"
                          : "border-gray-600/50 bg-gray-800/20"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Trophy
                          className={`w-6 h-6 ${achievement.unlocked ? "text-yellow-400" : "text-gray-500"}`}
                        />
                        <div>
                          <h3
                            className={`font-bold ${achievement.unlocked ? "text-white" : "text-gray-500"}`}
                          >
                            {achievement.name}
                          </h3>
                          <p
                            className={`text-sm ${achievement.unlocked ? "text-gray-300" : "text-gray-600"}`}
                          >
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 px-4 bg-gray-900/20">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-cyan-400 mb-8">
                ~/network
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="border border-green-400/30 rounded-lg p-6 bg-black/50">
                    <h3 className="text-xl font-bold text-white mb-4">
                      Establish Connection
                    </h3>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">
                          $ echo "sender" {">"} contact.txt
                        </label>
                        <Input
                          placeholder="your.name@domain.com"
                          className="bg-black border-green-400/30 text-green-400 focus:border-cyan-400"
                          onFocus={playBeepSound}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">
                          $ echo "subject" {">"} message.txt
                        </label>
                        <Input
                          placeholder="Collaboration Proposal"
                          className="bg-black border-green-400/30 text-green-400 focus:border-cyan-400"
                          onFocus={playBeepSound}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">
                          $ cat message.txt
                        </label>
                        <Textarea
                          placeholder="Let's build something amazing together..."
                          className="bg-black border-green-400/30 text-green-400 focus:border-cyan-400 min-h-[120px]"
                          onFocus={playBeepSound}
                        />
                      </div>
                      <Button
                        className="w-full bg-green-400 text-black hover:bg-cyan-400 font-bold"
                        onClick={(e) => {
                          e.preventDefault();
                          playBeepSound();
                          setCurrentXP((prev) => Math.min(prev + 15, 100));
                        }}
                      >
                        $ ./send_message.sh
                      </Button>
                    </form>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="border border-green-400/30 rounded-lg p-6 bg-black/50">
                    <h3 className="text-xl font-bold text-white mb-4">
                      Social Networks
                    </h3>
                    <div className="space-y-4">
                      <a
                        href="#"
                        onClick={playBeepSound}
                        className="flex items-center space-x-3 text-gray-300 hover:text-cyan-400 transition-colors"
                      >
                        <Github className="w-5 h-5" />
                        <span>https://github.com/GTgyani206</span>
                      </a>
                      <a
                        href="#"
                        onClick={playBeepSound}
                        className="flex items-center space-x-3 text-gray-300 hover:text-cyan-400 transition-colors"
                      >
                        <Linkedin className="w-5 h-5" />
                        <span>https://www.linkedin.com/in/gyanedrathakur/</span>
                      </a>
                      <a
                        href="#"
                        onClick={playBeepSound}
                        className="flex items-center space-x-3 text-gray-300 hover:text-cyan-400 transition-colors"
                      >
                        <Mail className="w-5 h-5" />
                        <span>gyanendrathakur4135stella@gmail.com</span>
                      </a>
                    </div>
                  </div>

                  <div className="border border-green-400/30 rounded-lg p-6 bg-black/50">
                    <h3 className="text-xl font-bold text-white mb-4">
                      System Status
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Response Time:</span>
                        <span className="text-green-400">&lt; 24h</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Availability:</span>
                        <span className="text-green-400">99.9%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Encryption:</span>
                        <span className="text-cyan-400">AES-256</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Sound:</span>
                        <span
                          className={
                            soundEnabled ? "text-green-400" : "text-red-400"
                          }
                        >
                          {soundEnabled ? "ENABLED" : "DISABLED"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer Status Bar */}
      <footer className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-t border-green-400/30 px-4 py-2 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-green-400">Status: ONLINE</span>
            <span className="text-cyan-400">XP: {currentXP}/100</span>
            <span className="text-purple-400">Host: localhost</span>
            <span className="text-pink-400">Version: v1.0.1</span>
            <span
              className={`${soundEnabled ? "text-green-400" : "text-red-400"}`}
            >
              Audio: {soundEnabled ? "ON" : "OFF"}
            </span>
          </div>
          <div className="text-gray-400">
            Press '?' for keybindings | Ctrl+K for command palette
          </div>
        </div>
      </footer>
    </div>
  );
}
