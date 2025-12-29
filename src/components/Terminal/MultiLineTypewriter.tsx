"use client";

import React, { useState, useEffect } from "react";

interface MultiLineTypewriterProps {
    lines: string[];
    speed?: number;
    className?: string;
}

export const MultiLineTypewriter: React.FC<MultiLineTypewriterProps> = ({
    lines,
    speed = 20,
    className = "",
}) => {
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [completedLines, setCompletedLines] = useState<string[]>([]);

    useEffect(() => {
        if (currentLineIndex >= lines.length) return;

        const currentLine = lines[currentLineIndex];
        let i = 0;
        setDisplayText("");

        const timer = setInterval(() => {
            if (i < currentLine.length) {
                setDisplayText(currentLine.substring(0, i + 1));
                i++;
            } else {
                clearInterval(timer);
                // Move to next line after a brief pause
                setTimeout(() => {
                    setCompletedLines((prev) => [...prev, currentLine]);
                    setCurrentLineIndex((prev) => prev + 1);
                }, 100);
            }
        }, speed);

        return () => clearInterval(timer);
    }, [currentLineIndex, lines, speed]);

    return (
        <div className={className}>
            {completedLines.map((line, index) => (
                <p key={index} className="mb-2">
                    {line}
                </p>
            ))}
            {currentLineIndex < lines.length && (
                <p className="mb-2">{displayText}</p>
            )}
        </div>
    );
};
