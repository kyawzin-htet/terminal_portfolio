"use client";

import React, { useState, useRef, useEffect } from "react";

interface CommandInputProps {
    onCommand: (command: string) => void;
    prompt?: string;
}

export const CommandInput: React.FC<CommandInputProps> = ({
    onCommand,
    prompt = "visitor@kyawzinhtet-portfolio:~$",
}) => {
    const [input, setInput] = useState("");
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        onCommand(input);
        setCommandHistory((prev) => [...prev, input]);
        setHistoryIndex(-1);
        setInput("");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowUp") {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
                setHistoryIndex(newIndex);
                setInput(commandHistory[newIndex]);
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyIndex !== -1) {
                const newIndex = Math.min(commandHistory.length - 1, historyIndex + 1);
                if (historyIndex === commandHistory.length - 1) {
                    setHistoryIndex(-1);
                    setInput("");
                } else {
                    setHistoryIndex(newIndex);
                    setInput(commandHistory[newIndex]);
                }
            }
        }
    };

    // Keep focus on input
    useEffect(() => {
        const focusInput = () => inputRef.current?.focus();
        document.addEventListener("click", focusInput);
        return () => document.removeEventListener("click", focusInput);
    }, []);

    return (
        <form onSubmit={handleSubmit} className="flex items-center w-full">
            <span className="dark:text-green-500 text-gray-700 mr-2 whitespace-nowrap">{prompt}</span>
            <div className="relative flex-1">
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-transparent border-none outline-none dark:text-green-400 text-black font-mono caret-transparent"
                    autoFocus
                    autoComplete="off"
                    spellCheck="false"
                />
                {/* Custom Cursor */}
                <span
                    className="absolute top-0 pointer-events-none"
                    style={{ left: `${input.length}ch` }}
                >
                    <span className="terminal-cursor"></span>
                </span>
            </div>
        </form>
    );
};
