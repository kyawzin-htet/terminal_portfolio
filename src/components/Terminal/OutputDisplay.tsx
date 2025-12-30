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
        const checkAndScrollToBottom = () => {
            const scrollContainer = bottomRef.current?.closest('.overflow-y-auto');
            if (!scrollContainer) return;

            // Logic: Check if user is already near the bottom, OR if this is a new command (history length changed)
            // We can't easily detect "new command" inside this mutation observer callback cleanly without ref tracking
            // But simpler logic: If close to bottom (within 100px), stick to bottom.
            const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
            const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;

            if (isNearBottom) {
                scrollContainer.scrollTop = scrollHeight;
            }
        };

        // For history changes (new command added), we generally WANT to scroll to bottom
        // effectively resetting the view for the new output.
        // But we should do it only once per history change.
        const scrollContainer = bottomRef.current?.closest('.overflow-y-auto');
        if (scrollContainer) {
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }

        // Observer for internal content changes (like typewriter effect)
        const observer = new MutationObserver(checkAndScrollToBottom);

        if (bottomRef.current?.parentElement) {
            observer.observe(bottomRef.current.parentElement, {
                childList: true,
                subtree: true,
                characterData: true
            });
        }

        return () => {
            observer.disconnect();
        };
    }, [history]); // Re-run when history changes (new command)

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
