"use client";

import React, { useState, useEffect } from "react";
import { TerminalWindow } from "./TerminalWindow";
import { CommandInput } from "./CommandInput";
import { OutputDisplay } from "./OutputDisplay";
import { Typewriter } from "./Typewriter";
import { MultiLineTypewriter } from "./MultiLineTypewriter";
import { getAllThemeNames, getTheme, type ThemeName } from "@/config/themes";
import { useTerminalTheme } from "@/context/TerminalThemeContext";
import { getThemeAsciiArt } from "@/config/themeAsciiArt";
import { SUCCESS_ASCII, FAILURE_ASCII } from "@/config/statusAsciiArt";
import { ExperienceTimeline } from "./ExperienceTimeline";
import { experienceData } from "@/data/experience";
import { AboutAscii } from "./AboutAscii";

type CommandHistory = {
    id: string;
    command: string;
    output: React.ReactNode;
};

export const Terminal = () => {
    const { theme: currentTheme, currentThemeName, setTheme: setCurrentThemeName } = useTerminalTheme();
    const [history, setHistory] = useState<CommandHistory[]>([]);
    const [mounted, setMounted] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [promptLabel, setPromptLabel] = useState("visitor@kyawzinhtet-portfolio:~$");

    // Contact form state
    const [inputMode, setInputMode] = useState<'command' | 'name' | 'message'>('command');
    const [contactData, setContactData] = useState({ name: '', message: '' });

    useEffect(() => {
        // Initial check for mobile
        if (window.innerWidth < 768) {
            setIsMaximized(true);
            setPromptLabel("@kzh-portfolio:~$");
        } else {
            setPromptLabel("visitor@kyawzinhtet-portfolio:~$");
        }

        // Add resize listener to handle dynamic resizing
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsMaximized(true);
                setPromptLabel("@kzh-portfolio:~$");
            } else {
                setPromptLabel("visitor@kyawzinhtet-portfolio:~$");
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        setMounted(true);

        // Load saved state from localStorage
        try {
            const savedHistory = localStorage.getItem('terminal-history');

            // Theme is now handled by context, no need to load here

            if (savedHistory) {
                // Parse saved history but we can't restore React components
                // So we'll just show a "Session restored" message
                const parsedHistory = JSON.parse(savedHistory);
                if (parsedHistory && parsedHistory.length > 0) {
                    setHistory([
                        {
                            id: "restore",
                            command: "session-restore",
                            output: (
                                <div>
                                    <p className="text-green-400">✓ Session restored from previous visit</p>
                                    <p className="text-gray-400 text-sm mt-1">Type 'help' to see available commands.</p>
                                </div>
                            ),
                        },
                    ]);
                    return;
                }
            }
        } catch (error) {
            console.error('Failed to load saved state:', error);
        }

        // Initial greeting if no saved state
        setHistory([
            {
                id: "init",
                command: "welcome",
                output: (
                    <MultiLineTypewriter
                        lines={[
                            "Welcome to kyawzinhtet-portfolio. v1.0.0",
                            "Type 'help' to see available commands."
                        ]}
                    />
                ),
            },
        ]);
    }, []);

    // Theme saving is now handled by context

    // Save history to localStorage
    useEffect(() => {
        if (mounted) {
            const historyToSave = history.map((h) => ({
                id: h.id,
                command: h.command,
            }));
            localStorage.setItem("terminal-history", JSON.stringify(historyToSave));
        }
    }, [mounted, history]);

    const projectsList = [
        { name: "KyawZinHtet Portfolio", description: "You are looking at it!", url: "#" },
        { name: "E-commerce Dashboard", description: "A modern dashboard for online stores.", url: "#" },
        { name: "Task Manager API", description: "RESTful API built with Node.js and Express.", url: "#" },
    ];

    const handleCommand = async (cmd: string) => {
        // If simply pressing enter with empty command
        if (!cmd.trim() && inputMode === 'command') return;

        const id = Date.now().toString();
        let output: React.ReactNode = "";

        // Handle interactive inputs
        if (inputMode === 'name') {
            setContactData(prev => ({ ...prev, name: cmd }));
            setInputMode('message');
            setHistory(prev => [...prev, { id, command: cmd, output: "" }]);
            return;
        }

        if (inputMode === 'message') {
            const finalData = { ...contactData, message: cmd };
            setContactData(finalData);
            setInputMode('command');

            // Add loading message
            setHistory(prev => [...prev, { id, command: cmd, output: <Typewriter text="Sending message..." /> }]);

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(finalData),
                });

                if (response.ok) {
                    setHistory(prev => prev.map(entry =>
                        entry.id === id
                            ? {
                                ...entry,
                                output: (
                                    <div>
                                        <div className="mb-2 text-green-500 whitespace-pre font-mono text-xs overflow-hidden">
                                            {SUCCESS_ASCII}
                                        </div>
                                        <span className="text-green-500"><Typewriter text="Message sent successfully! I'll get back to you soon." /></span>
                                    </div>
                                )
                            }
                            : entry
                    ));
                } else {
                    setHistory(prev => prev.map(entry =>
                        entry.id === id
                            ? {
                                ...entry,
                                output: (
                                    <div>
                                        <div className="mb-2 text-red-500 whitespace-pre font-mono text-xs overflow-hidden">
                                            {FAILURE_ASCII}
                                        </div>
                                        <span className="text-red-500"><Typewriter text="Failed to send message. Please try again later." /></span>
                                    </div>
                                )
                            }
                            : entry
                    ));
                }
            } catch (error) {
                setHistory(prev => prev.map(entry =>
                    entry.id === id
                        ? {
                            ...entry,
                            output: (
                                <div>
                                    <div className="mb-2 text-red-500 whitespace-pre font-mono text-xs overflow-hidden">
                                        {FAILURE_ASCII}
                                    </div>
                                    <span className="text-red-500"><Typewriter text="An error occurred. Please try again later." /></span>
                                </div>
                            )
                        }
                        : entry
                ));
            }
            return;
        }

        const trimmedCmd = cmd.trim().toLowerCase();

        if (trimmedCmd.startsWith("go ")) {
            const projectNumber = parseInt(trimmedCmd.split(" ")[1]);
            if (!isNaN(projectNumber) && projectNumber > 0 && projectNumber <= projectsList.length) {
                const project = projectsList[projectNumber - 1];
                window.open(project.url, "_blank");
                output = <Typewriter text={`Opening ${project.name}...`} />;
            } else {
                output = <span className="text-red-500"><Typewriter text={`Project number ${projectNumber} not found. Type 'projects' to see the list.`} /></span>;
            }
        } else if (trimmedCmd === "theme" || trimmedCmd.startsWith("theme ")) {
            // Check if a theme name was provided
            const themeArg = trimmedCmd.split(" ")[1] as ThemeName | undefined;
            if (themeArg) {
                const allThemes = getAllThemeNames();
                if (allThemes.includes(themeArg)) {
                    const newTheme = getTheme(themeArg);
                    setCurrentThemeName(themeArg);
                    const asciiArt = getThemeAsciiArt(themeArg);
                    output = (
                        <div>
                            <pre className="text-sm mb-2">{asciiArt}</pre>
                            <p><Typewriter text={`Theme switched to ${newTheme.displayName}.`} /></p>
                        </div>
                    );
                } else {
                    output = (
                        <div>
                            <p className="text-red-500"><Typewriter text={`Theme '${themeArg}' not found.`} /></p>
                            <p className="mt-2"><Typewriter text="Type 'theme' to see available themes." /></p>
                        </div>
                    );
                }
            } else {
                // List all available themes
                const allThemes = getAllThemeNames();
                output = (
                    <div className="flex flex-col gap-2">
                        <p className="text-yellow-500"><Typewriter text="Available themes:" /></p>
                        <div className="grid grid-cols-2 gap-2">
                            {allThemes.map((themeName) => {
                                const theme = getTheme(themeName);
                                const isCurrent = themeName === currentThemeName;
                                return (
                                    <div key={themeName} className="flex items-center gap-2">
                                        <span className={isCurrent ? "text-green-400" : ""}>
                                            {isCurrent ? "→ " : "  "}{theme.displayName}
                                        </span>
                                        <span className="text-gray-500 text-sm">({themeName})</span>
                                    </div>
                                );
                            })}
                        </div>
                        <p className="text-gray-400 mt-2"><Typewriter text="Type 'theme <name>' to switch themes." /></p>
                    </div>
                );
            }
        } else {
            switch (trimmedCmd) {
                case "help":
                    output = (
                        <div className="grid grid-cols-1 gap-2">
                            <p className="text-yellow-500"><Typewriter text="Available commands:" /></p>
                            <div className="grid grid-cols-[100px_1fr] gap-4">
                                <span>about</span>
                                <span><Typewriter text="Who am I?" /></span>
                                <span>projects</span>
                                <span><Typewriter text="View my work" /></span>
                                <span>exp</span>
                                <span><Typewriter text="View work experience" /></span>
                                <span>contact</span>
                                <span><Typewriter text="Get in touch" /></span>
                                <span>theme</span>
                                <span><Typewriter text="List available themes" /></span>
                                <span>theme &lt;name&gt;</span>
                                <span><Typewriter text="Switch to a theme" /></span>
                                <span>clear</span>
                                <span><Typewriter text="Clear terminal history" /></span>
                                <span>maximize</span>
                                <span><Typewriter text="Maximize terminal window" /></span>
                                <span>minimize</span>
                                <span><Typewriter text="Minimize terminal window" /></span>
                                <span>help</span>
                                <span><Typewriter text="Show this help message" /></span>
                                <span>go &lt;num&gt;</span>
                                <span><Typewriter text="Go to project number" /></span>

                            </div>
                        </div>
                    );
                    break;
                case "about":
                    output = <AboutAscii />;
                    break;
                case "projects":
                    output = (
                        <div className="flex flex-col gap-2">
                            <p className="text-yellow-500"><Typewriter text="My Projects:" /></p>
                            <ul className="list-none">
                                {projectsList.map((project, index) => (
                                    <li key={index} className="mb-1">
                                        <span className="mr-2">{index + 1}.</span>
                                        <span className="font-bold">{project.name}</span> - <Typewriter text={project.description} />
                                    </li>
                                ))}
                            </ul>
                            <p className="text-gray-400 mt-2"><Typewriter text="Type 'go <project_number>' to view a project." /></p>
                        </div>
                    );
                    break;
                case "contact":
                    output = (
                        <div className="flex flex-col gap-2">
                            <p className="text-yellow-500"><Typewriter text="Contact Me:" /></p>
                            <div className="grid grid-cols-[100px_1fr] gap-2">
                                <span>Email:</span>
                                <a href="mailto:hello@example.com" className="underline hover:text-green-300">hello@example.com</a>
                                <span>GitHub:</span>
                                <a href="https://github.com/example" target="_blank" rel="noopener noreferrer" className="underline hover:text-green-300">github.com/example</a>
                                <span>LinkedIn:</span>
                                <a href="https://linkedin.com/in/example" target="_blank" rel="noopener noreferrer" className="underline hover:text-green-300">linkedin.com/in/example</a>
                            </div>
                            <p className="text-gray-400 mt-2"><Typewriter text="Starting interactive contact form..." /></p>
                        </div>
                    );
                    setInputMode('name');
                    setTimeout(() => {
                        setHistory((prev) => [...prev, { id: Date.now().toString(), command: "contact", output: <Typewriter text="Please enter your name:" /> }]);
                        // Add a small delay then show the name prompt logic via state change
                    }, 100);
                    return; // Return early to avoid double history add
                case "clear":
                    setHistory([]);
                    return;
                case "maximize":
                case "expand":
                    setIsMaximized(true);
                    setIsMinimized(false);
                    output = <Typewriter text="Window maximized." />;
                    break;
                case "minimize":
                    if (isMaximized) {
                        setIsMaximized(false);
                        output = <Typewriter text="Window restored to normal size." />;
                    } else {
                        setIsMinimized(true);
                        setIsMaximized(false);
                        output = <Typewriter text="Window minimized." />;
                    }
                    break;
                case "restore":
                case "unmaximize":
                    setIsMaximized(false);
                    setIsMinimized(false);
                    output = <Typewriter text="Window restored." />;
                    break;
                case "exp":
                case "experience":
                    output = (
                        <ExperienceTimeline
                            data={experienceData}
                            theme={currentTheme}
                        />
                    );
                    break;
                default:
                    output = (
                        <div>
                            <div className="mb-2 text-red-500 whitespace-pre font-mono text-xs overflow-hidden">
                                {FAILURE_ASCII}
                            </div>
                            <span>
                                <Typewriter text={`Command not found: ${trimmedCmd}. Type `} />
                                <span className="text-yellow-500">help</span>
                                <Typewriter text=" for a list of commands." />
                            </span>
                        </div>
                    );
            }
        }

        if (output) {
            setHistory((prev) => [...prev, { id, command: cmd, output }]);
        }
    };

    // Calculate dynamic prompt
    let currentPrompt = promptLabel;
    if (inputMode === 'name') currentPrompt = "Name: ";
    if (inputMode === 'message') currentPrompt = "Ask anything: ";

    const handleThemeChange = (themeName: ThemeName) => {
        setCurrentThemeName(themeName);
    };

    if (!mounted) return null;

    return (
        <TerminalWindow
            isMaximized={isMaximized}
            setIsMaximized={setIsMaximized}
            isMinimized={isMinimized}
            setIsMinimized={setIsMinimized}
            theme={currentTheme}
            onThemeChange={handleThemeChange}
            title={promptLabel.replace(":$", ": ~").replace("~$", ": ~")}
        >
            <OutputDisplay
                history={history}
                theme={currentTheme}
                prompt={promptLabel}
            />
            <CommandInput
                onCommand={handleCommand}
                onClear={() => setHistory([])}
                availableCommands={[
                    "help", "about", "projects", "contact", "theme", "exp", "experience",
                    "clear", "maximize", "minimize", "restore", "go",
                    // Add all theme commands for autocomplete
                    ...getAllThemeNames().map(name => `theme ${name}`)
                ]}
                theme={currentTheme}
                prompt={currentPrompt}
            />

        </TerminalWindow>
    );
};
