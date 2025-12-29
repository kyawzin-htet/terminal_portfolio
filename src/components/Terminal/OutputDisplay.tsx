"use client";

import React, { useEffect, useRef } from "react";
import { type TerminalTheme } from "@/config/themes";

interface OutputLineProps {
    children: React.ReactNode;
}

const OutputLine: React.FC<OutputLineProps> = ({ children }) => {
    return <div className="mb-1 whitespace-pre-wrap">{children}</div>;
};

interface OutputDisplayProps {
    history: Array<{
        id: string;
        command: string;
        output: React.ReactNode;
    }>;
    theme: TerminalTheme;
    prompt: string;
}

export const OutputDisplay: React.FC<OutputDisplayProps> = ({ history, theme, prompt }) => {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Function to force scroll to the very bottom
        const scrollToBottom = () => {
            // Find the scrollable container (parent in TerminalWindow)
            const scrollContainer = bottomRef.current?.closest('.overflow-y-auto');
            if (scrollContainer) {
                scrollContainer.scrollTop = scrollContainer.scrollHeight;
            } else {
                // Fallback if container not found via class
                bottomRef.current?.scrollIntoView({ behavior: "auto", block: "end" });
            }
        };

        // Scroll immediately and after a short delay
        scrollToBottom();
        const timer = setTimeout(scrollToBottom, 50);

        // Also scroll whenever the content height changes (e.g. typing effect)
        const observer = new MutationObserver(scrollToBottom);
        if (bottomRef.current?.parentElement) {
            observer.observe(bottomRef.current.parentElement, {
                childList: true,
                subtree: true,
                characterData: true
            });
        }

        return () => {
            clearTimeout(timer);
            observer.disconnect();
        };
    }, [history]);

    return (
        <div className="w-full">
            {history.map((entry) => (
                <div key={entry.id} className="mb-4">
                    <div className="flex items-center mb-1" style={{ color: theme.colors.prompt }}>
                        <span className="mr-2">{prompt}</span>
                        <span className="font-bold" style={{ color: theme.colors.command }}>{entry.command}</span>
                    </div>
                    <div className="ml-4" style={{ color: theme.colors.output }}>
                        {/* Only animate the last entry if needed, but for now static or simple render */}
                        {/* We can enhance this to only type the latest one */}
                        <OutputLine>{entry.output}</OutputLine>
                    </div>
                </div>
            ))}
            <div ref={bottomRef} />
        </div>
    );
};
