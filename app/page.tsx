"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Terminal,
  Code,
  Cpu,
  Globe,
  Database,
  Brain,
  Send,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { HyprWaybar } from "@/components/hyprland/HyprWaybar";
import { HyprWindow } from "@/components/hyprland/HyprWindow";
import { HyprTerminal } from "@/components/hyprland/HyprTerminal";
import { HyprBackground } from "@/components/hyprland/HyprBackground";
import { HyprBootSequence } from "@/components/hyprland/HyprBootSequence";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

// Project data
const projects = [
  {
    id: "IECS26",
    name: "IEEE IECS26",
    description: "Official conference website for IEEE IECS",
    tech: ["Next.js", "Tailwind", "TypeScript"],
    status: "Production",
    link: "https://iecs26.com/",
    gitlink: "https://github.com/GTgyani206/",
  },
  {
    id: "VORTEX-lang",
    name: "VORTEX-lang",
    description: "GPU-accelerated language in Rust",
    tech: ["Rust", "WASM"],
    status: "Production",
    link: "https://vortex-lang.onrender.com",
    gitlink: "https://github.com/GTgyani206/VORTEX-lang",
  },
  {
    id: "do-sakhi",
    name: "Do Sakhi",
    description: "AI-powered storyteller",
    tech: ["OpenAI", "Next.js", "WebSocket"],
    status: "Production",
    link: "https://animegirl-bogy.onrender.com",
    gitlink: "https://github.com/GTgyani206/animeGirl",
  },
  {
    id: "vibe-code",
    name: "Windows XP Bot",
    description: "Retro 90s chatbot experience",
    tech: ["YouWare", "Creativity"],
    status: "Production",
    link: "https://lmdmlyep2u.app.youware.com/",
    gitlink:
      "https://www.youware.com/profile/XVuQJ807ZfWm6H4DqPWYPWFK4ZY2",
  },
];

// Skills data
const skillCategories = [
  {
    name: "Languages",
    icon: <Code className="w-4 h-4" />,
    skills: [
      { name: "Javascript", level: 95 },
      { name: "Java", level: 85 },
      { name: "Rust", level: 75 },
      { name: "Python", level: 60 },
    ],
  },
  {
    name: "Frontend",
    icon: <Globe className="w-4 h-4" />,
    skills: [
      { name: "React", level: 92 },
      { name: "NextJS", level: 70 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Framer Motion", level: 85 },
    ],
  },
  {
    name: "Backend",
    icon: <Database className="w-4 h-4" />,
    skills: [
      { name: "Node.js", level: 88 },
      { name: "PostgreSQL", level: 80 },
      { name: "MongoDB", level: 78 },
      { name: "Redis", level: 70 },
    ],
  },
  {
    name: "GenAI",
    icon: <Brain className="w-4 h-4" />,
    skills: [
      { name: "OpenAI/LLMs", level: 85 },
      { name: "LangChain", level: 75 },
      { name: "Neo4j", level: 60 },
    ],
  },
  {
    name: "DevOps",
    icon: <Cpu className="w-4 h-4" />,
    skills: [
      { name: "Docker", level: 82 },
      { name: "Kubernetes", level: 65 },
      { name: "CI/CD", level: 80 },
      { name: "AWS/GCP", level: 72 },
    ],
  },
];

export default function HyprPortfolio() {
  const [showBoot, setShowBoot] = useState(true);
  const [currentWorkspace, setCurrentWorkspace] = useState(1);
  const [prevWorkspace, setPrevWorkspace] = useState(1);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Handle workspace change with animation direction
  const handleWorkspaceChange = useCallback(
    (workspace: number) => {
      if (workspace !== currentWorkspace) {
        setPrevWorkspace(currentWorkspace);
        setCurrentWorkspace(workspace);
      }
    },
    [currentWorkspace]
  );

  // Keyboard shortcuts for workspace switching
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        const num = parseInt(e.key);
        if (num >= 1 && num <= 4) {
          e.preventDefault();
          handleWorkspaceChange(num);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleWorkspaceChange]);

  // Animation variants for workspace transitions
  const getAnimationDirection = () => {
    return currentWorkspace > prevWorkspace ? 1 : -1;
  };

  const workspaceVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  // Render skill bar
  const renderSkillBar = (level: number) => {
    const filled = Math.floor(level / 5);
    const empty = 20 - filled;
    return (
      <div className="flex items-center gap-2">
        <div className="flex">
          <span className="text-[var(--hypr-green)]">{"█".repeat(filled)}</span>
          <span className="text-[var(--hypr-surface1)]">
            {"░".repeat(empty)}
          </span>
        </div>
        <span className="text-[var(--hypr-mauve)] text-xs">{level}%</span>
      </div>
    );
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[var(--hypr-crust)] text-[var(--hypr-text)]">
      {/* Boot Sequence */}
      {showBoot && (
        <HyprBootSequence onComplete={() => setShowBoot(false)} skipDelay={5000} />
      )}

      {/* Background */}
      <HyprBackground />

      {/* Waybar */}
      <HyprWaybar
        currentWorkspace={currentWorkspace}
        onWorkspaceChange={handleWorkspaceChange}
        soundEnabled={soundEnabled}
        onSoundToggle={() => setSoundEnabled(!soundEnabled)}
      />

      {/* Main Content Area */}
      <main className="pt-10 h-[calc(100vh-40px)] p-2 overflow-y-auto md:overflow-hidden">
        <AnimatePresence mode="wait" custom={getAnimationDirection()}>
          {/* Workspace 1: Home */}
          {currentWorkspace === 1 && (
            <motion.div
              key="workspace-1"
              custom={getAnimationDirection()}
              variants={workspaceVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="h-auto md:h-full flex flex-col lg:grid lg:grid-cols-2 gap-2 pb-10 md:pb-0"
            >
              {/* Terminal Window - Hidden on mobile, show profile first */}
              <HyprWindow
                title="kitty ~ terminal"
                icon={<Terminal className="w-4 h-4" />}
                className="hidden lg:block h-auto lg:h-[calc(100vh-60px)] order-2 lg:order-1"
                focused
                showControls
              >
                <HyprTerminal
                  className="h-[300px] lg:h-full"
                  onWorkspaceChange={handleWorkspaceChange}
                />
              </HyprWindow>

              {/* Profile Window */}
              <div className="flex flex-col gap-2 h-auto lg:h-[calc(100vh-60px)] order-1 lg:order-2">
                <HyprWindow
                  title="profile.json"
                  icon={<Code className="w-4 h-4" />}
                  className="flex-1"
                >
                  <div className="space-y-4">
                    {/* Avatar */}
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-[var(--hypr-mauve)] p-0.5">
                          <Image
                            src="/images/profile.png"
                            alt="Gyanendra Thakur"
                            width={80}
                            height={80}
                            className="rounded-lg"
                            unoptimized
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[var(--hypr-green)] rounded-full border-2 border-[var(--hypr-mantle)]" />
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold hypr-text-gradient">
                          Gyanendra Thakur
                        </h1>
                        <p className="text-[var(--hypr-subtext0)]">
                          A coder trying to bring some impact
                        </p>
                      </div>
                    </div>

                    {/* JSON-style info */}
                    <pre className="text-sm bg-[var(--hypr-mantle)] rounded-lg p-4 overflow-x-auto">
                      <code>
                        <span className="text-[var(--hypr-mauve)]">{"{"}</span>
                        {"\n"}
                        {"  "}
                        <span className="text-[var(--hypr-blue)]">
                          "role"
                        </span>
                        : <span className="text-[var(--hypr-green)]">"Full-Stack Developer"</span>,{"\n"}
                        {"  "}
                        <span className="text-[var(--hypr-blue)]">
                          "focus"
                        </span>
                        :{" "}
                        <span className="text-[var(--hypr-green)]">
                          ["Web Dev", "Gen AI","Automation", "Open Source"]
                        </span>
                        ,{"\n"}
                        {"  "}
                        <span className="text-[var(--hypr-blue)]">
                          "languages"
                        </span>
                        :{" "}
                        <span className="text-[var(--hypr-green)]">
                          ["TypeScript", "Python", "Rust"]
                        </span>
                        ,{"\n"}
                        {"  "}
                        <span className="text-[var(--hypr-blue)]">
                          "status"
                        </span>
                        :{" "}
                        <span className="text-[var(--hypr-green)]">
                          "Available for hire"
                        </span>
                        ,{"\n"}
                        {"  "}
                        <span className="text-[var(--hypr-blue)]">
                          "location"
                        </span>
                        : <span className="text-[var(--hypr-green)]">"India 🇮🇳"</span>
                        {"\n"}
                        <span className="text-[var(--hypr-mauve)]">{"}"}</span>
                      </code>
                    </pre>

                    {/* Social Links */}
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      <Link
                        href="https://github.com/GTgyani206"
                        target="_blank"
                        className="flex items-center gap-2 px-2 md:px-3 py-2 bg-[var(--hypr-surface0)] rounded-lg hover:bg-[var(--hypr-surface1)] transition-colors"
                      >
                        <Github className="w-4 h-4 text-[var(--hypr-text)]" />
                        <span className="text-xs md:text-sm">GitHub</span>
                      </Link>
                      <Link
                        href="https://www.linkedin.com/in/gyanedrathakur/"
                        target="_blank"
                        className="flex items-center gap-2 px-2 md:px-3 py-2 bg-[var(--hypr-surface0)] rounded-lg hover:bg-[var(--hypr-surface1)] transition-colors"
                      >
                        <Linkedin className="w-4 h-4 text-[var(--hypr-blue)]" />
                        <span className="text-xs md:text-sm">LinkedIn</span>
                      </Link>
                      <Link
                        href="mailto:gyanendrathakur4135stella@gmail.com"
                        className="flex items-center gap-2 px-2 md:px-3 py-2 bg-[var(--hypr-surface0)] rounded-lg hover:bg-[var(--hypr-surface1)] transition-colors"
                      >
                        <Mail className="w-4 h-4 text-[var(--hypr-mauve)]" />
                        <span className="text-xs md:text-sm">Email</span>
                      </Link>
                    </div>
                  </div>
                </HyprWindow>

                {/* Quick Stats */}
                <HyprWindow
                  title="stats.sh"
                  icon={<Cpu className="w-4 h-4" />}
                  className="h-32"
                >
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[var(--hypr-mauve)]">
                        500+
                      </div>
                      <div className="text-xs text-[var(--hypr-subtext0)]">
                        Commits
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[var(--hypr-blue)]">
                        10+
                      </div>
                      <div className="text-xs text-[var(--hypr-subtext0)]">
                        Projects
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[var(--hypr-green)]">
                        ∞
                      </div>
                      <div className="text-xs text-[var(--hypr-subtext0)]">
                        Coffee ☕
                      </div>
                    </div>
                  </div>
                </HyprWindow>
              </div>
            </motion.div>
          )}

          {/* Workspace 2: Projects */}
          {currentWorkspace === 2 && (
            <motion.div
              key="workspace-2"
              custom={getAnimationDirection()}
              variants={workspaceVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="h-auto md:h-full pb-10 md:pb-0"
            >
              <HyprWindow
                title="~/projects"
                icon={<Code className="w-4 h-4" />}
                className="h-auto md:h-[calc(100vh-60px)] overflow-visible md:overflow-y-auto"
                focused
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 p-1 md:p-2">
                  {projects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-[var(--hypr-mantle)] rounded-xl border border-[var(--hypr-surface0)] p-4 hover:border-[var(--hypr-mauve)] transition-all duration-300 group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-[var(--hypr-green)]" />
                          <h3 className="font-bold text-[var(--hypr-text)] group-hover:text-[var(--hypr-mauve)] transition-colors">
                            {project.name}
                          </h3>
                        </div>
                        <Badge
                          variant="outline"
                          className="text-[var(--hypr-teal)] border-[var(--hypr-teal)] text-xs"
                        >
                          {project.status}
                        </Badge>
                      </div>

                      <p className="text-sm text-[var(--hypr-subtext0)] mb-3">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-2 py-1 bg-[var(--hypr-surface0)] rounded-md text-[var(--hypr-subtext1)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Link
                          href={project.gitlink}
                          target="_blank"
                          className="flex items-center gap-1 text-xs text-[var(--hypr-subtext0)] hover:text-[var(--hypr-text)] transition-colors"
                        >
                          <Github className="w-3 h-3" />
                          <span>Code</span>
                        </Link>
                        <Link
                          href={project.link}
                          target="_blank"
                          className="flex items-center gap-1 text-xs text-[var(--hypr-blue)] hover:text-[var(--hypr-sapphire)] transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Demo</span>
                        </Link>
                      </div>
                    </motion.div>
                  ))}

                  {/* GitHub CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gradient-to-br from-[var(--hypr-mauve)]/20 to-[var(--hypr-blue)]/20 rounded-xl border border-dashed border-[var(--hypr-mauve)]/50 p-4 flex flex-col items-center justify-center gap-3"
                  >
                    <Github className="w-8 h-8 text-[var(--hypr-mauve)]" />
                    <p className="text-center text-sm text-[var(--hypr-subtext1)]">
                      Check out more projects on GitHub
                    </p>
                    <Link
                      href="https://github.com/GTgyani206"
                      target="_blank"
                      className="px-4 py-2 bg-[var(--hypr-mauve)] text-[var(--hypr-crust)] rounded-lg font-medium text-sm hover:bg-[var(--hypr-lavender)] transition-colors"
                    >
                      View GitHub →
                    </Link>
                  </motion.div>
                </div>
              </HyprWindow>
            </motion.div>
          )}

          {/* Workspace 3: Skills */}
          {currentWorkspace === 3 && (
            <motion.div
              key="workspace-3"
              custom={getAnimationDirection()}
              variants={workspaceVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="h-auto md:h-full flex flex-col lg:grid lg:grid-cols-2 gap-2 pb-10 md:pb-0"
            >
              {/* Skills Grid */}
              <HyprWindow
                title="skills.json"
                icon={<Code className="w-4 h-4" />}
                className="h-auto lg:h-[calc(100vh-60px)] overflow-visible lg:overflow-y-auto"
                focused
              >
                <div className="space-y-4 md:space-y-6">
                  {skillCategories.map((category, catIndex) => (
                    <motion.div
                      key={category.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: catIndex * 0.1 }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[var(--hypr-mauve)]">
                          {category.icon}
                        </span>
                        <h3 className="font-bold text-[var(--hypr-text)]">
                          {category.name}
                        </h3>
                      </div>
                      <div className="space-y-2 ml-6">
                        {category.skills.map((skill) => (
                          <div
                            key={skill.name}
                            className="flex items-center justify-between"
                          >
                            <span className="text-sm text-[var(--hypr-subtext1)] w-40 truncate">
                              {skill.name}
                            </span>
                            {renderSkillBar(skill.level)}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </HyprWindow>

              {/* Terminal with skill commands - Hidden on mobile */}
              <HyprWindow
                title="skill-demo ~ terminal"
                icon={<Terminal className="w-4 h-4" />}
                className="hidden lg:block h-[calc(100vh-60px)]"
              >
                <HyprTerminal
                  className="h-full"
                  initialCommands={["skills"]}
                  onWorkspaceChange={handleWorkspaceChange}
                />
              </HyprWindow>
            </motion.div>
          )}

          {/* Workspace 4: Contact */}
          {currentWorkspace === 4 && (
            <motion.div
              key="workspace-4"
              custom={getAnimationDirection()}
              variants={workspaceVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="h-auto md:h-full flex flex-col lg:grid lg:grid-cols-2 gap-2 pb-10 md:pb-0"
            >
              {/* Contact Form */}
              <HyprWindow
                title="contact.sh"
                icon={<Mail className="w-4 h-4" />}
                className="h-auto lg:h-[calc(100vh-60px)]"
                focused
              >
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold hypr-text-gradient mb-2">
                      Get in Touch
                    </h2>
                    <p className="text-[var(--hypr-subtext0)] text-sm">
                      Let&apos;s build something amazing together
                    </p>
                  </div>

                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm text-[var(--hypr-subtext1)] mb-2">
                        <span className="text-[var(--hypr-green)]">$</span> echo
                        &quot;name&quot; {">"} sender.txt
                      </label>
                      <Input
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="bg-[var(--hypr-mantle)] border-[var(--hypr-surface0)] text-[var(--hypr-text)] focus:border-[var(--hypr-mauve)] placeholder:text-[var(--hypr-overlay0)]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-[var(--hypr-subtext1)] mb-2">
                        <span className="text-[var(--hypr-green)]">$</span> echo
                        &quot;email&quot; {">"} contact.txt
                      </label>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="bg-[var(--hypr-mantle)] border-[var(--hypr-surface0)] text-[var(--hypr-text)] focus:border-[var(--hypr-mauve)] placeholder:text-[var(--hypr-overlay0)]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-[var(--hypr-subtext1)] mb-2">
                        <span className="text-[var(--hypr-green)]">$</span> cat
                        message.txt
                      </label>
                      <Textarea
                        placeholder="Your message..."
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="bg-[var(--hypr-mantle)] border-[var(--hypr-surface0)] text-[var(--hypr-text)] focus:border-[var(--hypr-mauve)] placeholder:text-[var(--hypr-overlay0)] min-h-[120px]"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[var(--hypr-mauve)] text-[var(--hypr-crust)] hover:bg-[var(--hypr-lavender)] font-medium"
                      onClick={(e) => {
                        e.preventDefault();
                        // Add form submission logic here
                      }}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      ./send_message.sh
                    </Button>
                  </form>
                </div>
              </HyprWindow>

              {/* Social & Info */}
              <div className="flex flex-col gap-2 h-auto lg:h-[calc(100vh-60px)]">
                <HyprWindow
                  title="socials.json"
                  icon={<Globe className="w-4 h-4" />}
                  className="flex-1"
                >
                  <div className="space-y-3 md:space-y-4">
                    <h3 className="font-bold text-[var(--hypr-text)]">
                      Connect with me
                    </h3>

                    <div className="space-y-3">
                      <Link
                        href="https://github.com/GTgyani206"
                        target="_blank"
                        className="flex items-center gap-3 p-3 bg-[var(--hypr-mantle)] rounded-lg hover:bg-[var(--hypr-surface0)] transition-colors group"
                      >
                        <Github className="w-5 h-5 text-[var(--hypr-text)]" />
                        <div>
                          <div className="font-medium group-hover:text-[var(--hypr-mauve)] transition-colors">
                            GitHub
                          </div>
                          <div className="text-xs text-[var(--hypr-subtext0)]">
                            @GTgyani206
                          </div>
                        </div>
                      </Link>

                      <Link
                        href="https://www.linkedin.com/in/gyanedrathakur/"
                        target="_blank"
                        className="flex items-center gap-3 p-3 bg-[var(--hypr-mantle)] rounded-lg hover:bg-[var(--hypr-surface0)] transition-colors group"
                      >
                        <Linkedin className="w-5 h-5 text-[var(--hypr-blue)]" />
                        <div>
                          <div className="font-medium group-hover:text-[var(--hypr-blue)] transition-colors">
                            LinkedIn
                          </div>
                          <div className="text-xs text-[var(--hypr-subtext0)]">
                            /in/gyanedrathakur
                          </div>
                        </div>
                      </Link>

                      <Link
                        href="mailto:gyanendrathakur4135stella@gmail.com"
                        className="flex items-center gap-3 p-3 bg-[var(--hypr-mantle)] rounded-lg hover:bg-[var(--hypr-surface0)] transition-colors group"
                      >
                        <Mail className="w-5 h-5 text-[var(--hypr-mauve)]" />
                        <div>
                          <div className="font-medium group-hover:text-[var(--hypr-mauve)] transition-colors">
                            Email
                          </div>
                          <div className="text-xs text-[var(--hypr-subtext0)]">
                            gyanendrathakur4135stella@gmail.com
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </HyprWindow>

                <HyprWindow
                  title="response.log"
                  icon={<Terminal className="w-4 h-4" />}
                  className="h-32"
                >
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[var(--hypr-subtext0)]">
                        Response Time:
                      </span>
                      <span className="text-[var(--hypr-green)]">{"< 24h"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--hypr-subtext0)]">
                        Availability:
                      </span>
                      <span className="text-[var(--hypr-green)]">99.9%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--hypr-subtext0)]">
                        Encryption:
                      </span>
                      <span className="text-[var(--hypr-teal)]">AES-256</span>
                    </div>
                  </div>
                </HyprWindow>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Status Bar */}
      <div className="fixed bottom-0 left-0 right-0 h-6 bg-[rgba(17,17,27,0.9)] border-t border-[rgba(205,214,244,0.08)] flex items-center justify-between px-2 md:px-4 text-xs z-40">
        <div className="flex items-center gap-2 md:gap-4">
          <span className="text-[var(--hypr-green)]">● Online</span>
          <span className="text-[var(--hypr-subtext0)]">
            {currentWorkspace}/4
          </span>
        </div>
        <div className="hidden sm:block text-[var(--hypr-subtext0)]">
          <span className="text-[var(--hypr-mauve)]">Ctrl+1-4</span> to switch
        </div>
      </div>
    </div>
  );
}
