"use client";

import React, { useState, useEffect } from "react";
import { TerminalWindow } from "./TerminalWindow";
import { CommandInput } from "./CommandInput";
import { OutputDisplay } from "./OutputDisplay";
import { useTheme } from "next-themes";
import { Typewriter } from "./Typewriter";

type CommandHistory = {
    id: string;
    command: string;
    output: React.ReactNode;
};

export const Terminal = () => {
    const [history, setHistory] = useState<CommandHistory[]>([]);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Initial greeting
        setHistory([
            {
                id: "init",
                command: "welcome",
                output: (
                    <div className="mb-2">
                        <p><Typewriter text="Welcome to kyawzinhtet-portfolio. v1.0.0" /></p>
                        <p><Typewriter text="Type " /><span className="text-yellow-500">help</span><Typewriter text=" to see available commands." /></p>
                    </div>
                ),
            },
        ]);
    }, []);

    const projectsList = [
        { name: "KyawZinHtet Portfolio", description: "You are looking at it!", url: "#" },
        { name: "E-commerce Dashboard", description: "A modern dashboard for online stores.", url: "#" },
        { name: "Task Manager API", description: "RESTful API built with Node.js and Express.", url: "#" },
    ];

    const handleCommand = (cmd: string) => {
        const trimmedCmd = cmd.trim().toLowerCase();
        const id = Date.now().toString();
        let output: React.ReactNode = "";

        if (trimmedCmd.startsWith("go ")) {
            const projectNumber = parseInt(trimmedCmd.split(" ")[1]);
            if (!isNaN(projectNumber) && projectNumber > 0 && projectNumber <= projectsList.length) {
                const project = projectsList[projectNumber - 1];
                window.open(project.url, "_blank");
                output = <Typewriter text={`Opening ${project.name}...`} />;
            } else {
                output = <span className="text-red-500"><Typewriter text={`Project number ${projectNumber} not found. Type 'projects' to see the list.`} /></span>;
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
                                <span>contact</span>
                                <span><Typewriter text="Get in touch" /></span>
                                <span>theme</span>
                                <span><Typewriter text="Toggle light/dark theme" /></span>
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
                    output = (
                        <div>
                            <p className="mb-2"><Typewriter text="Hi, I'm a Full Stack Developer passionate about building minimalist and functional web applications." /></p>
                            <p><Typewriter text="I love working with React, Next.js, Node.js, and modern web technologies." /></p>
                        </div>
                    );
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
                        </div>
                    );
                    break;
                case "theme":
                    const newTheme = theme === "dark" ? "light" : "dark";
                    setTheme(newTheme);
                    output = <Typewriter text={`Theme switched to ${newTheme} mode.`} />;
                    break;
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
                    setIsMinimized(true);
                    setIsMaximized(false);
                    output = <Typewriter text="Window minimized." />;
                    break;
                case "restore":
                    setIsMaximized(false);
                    setIsMinimized(false);
                    output = <Typewriter text="Window restored." />;
                    break;
                default:
                    output = (
                        <span>
                            <Typewriter text={`Command not found: ${trimmedCmd}. Type `} />
                            <span className="text-yellow-500">help</span>
                            <Typewriter text=" for a list of commands." />
                        </span>
                    );
            }
        }

        setHistory((prev) => [...prev, { id, command: cmd, output }]);
    };

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
    };

    if (!mounted) return null;

    return (
        <TerminalWindow
            isMaximized={isMaximized}
            setIsMaximized={setIsMaximized}
            isMinimized={isMinimized}
            setIsMinimized={setIsMinimized}
            onToggleTheme={toggleTheme}
            isDark={theme === "dark"}
        >
            <OutputDisplay history={history} />
            <CommandInput
                onCommand={handleCommand}
                onClear={() => setHistory([])}
                availableCommands={[
                    "help", "about", "projects", "contact", "theme",
                    "clear", "maximize", "minimize", "go"
                ]}
            />
        </TerminalWindow>
    );
};
