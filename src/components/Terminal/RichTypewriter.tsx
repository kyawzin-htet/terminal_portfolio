"use client";

import React, { useState, useEffect, useRef } from "react";

export interface RichSegment {
    text: string;
    style?: React.CSSProperties;
    className?: string;
}

export type RichLine = RichSegment[];

interface RichTypewriterProps {
    lines: RichLine[];
    speed?: number;
    className?: string;
    onComplete?: () => void;
}

export const RichTypewriter: React.FC<RichTypewriterProps> = ({
    lines,
    speed = 20,
    className = "",
    onComplete
}) => {
    // State to track ALL fully completed lines
    const [completedLines, setCompletedLines] = useState<RichLine[]>([]);

    // State to track the CURRENT line being typed (can be partial)
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [currentLineSegments, setCurrentLineSegments] = useState<RichLine>([]);

    // Track detailed progress within the current line
    const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);

    const isComplete = useRef(false);

    useEffect(() => {
        if (currentLineIndex >= lines.length) {
            if (!isComplete.current) {
                isComplete.current = true;
                if (onComplete) onComplete();
            }
            return;
        }

        const lineToType = lines[currentLineIndex];

        // If the current line has no segments (empty line), complete it immediately
        if (lineToType.length === 0) {
            const timer = setTimeout(() => {
                setCompletedLines(prev => [...prev, []]);
                setCurrentLineIndex(prev => prev + 1);
                setCurrentSegmentIndex(0);
                setCurrentCharIndex(0);
                setCurrentLineSegments([]);
            }, speed);
            return () => clearTimeout(timer);
        }

        const currentSegment = lineToType[currentSegmentIndex];

        // Safety check
        if (!currentSegment) return;

        const timer = setTimeout(() => {
            // Logic to move char by char
            const nextCharIndex = currentCharIndex + 1;

            // Are we done with this segment?
            if (nextCharIndex > currentSegment.text.length) {
                // Move to next segment
                const nextSegmentIndex = currentSegmentIndex + 1;

                // Are we done with this line?
                if (nextSegmentIndex >= lineToType.length) {
                    // Line Complete
                    setCompletedLines(prev => [...prev, lineToType]);
                    setCurrentLineIndex(prev => prev + 1);
                    setCurrentSegmentIndex(0);
                    setCurrentCharIndex(0);
                    setCurrentLineSegments([]);
                } else {
                    // Start next segment in this line
                    // We need to 'lock in' the fully typed segment into the current line view
                    setCurrentLineSegments(prev => {
                        const newSegments = [...prev];
                        // Ensure previous segments are full
                        if (newSegments[currentSegmentIndex]) {
                            newSegments[currentSegmentIndex] = currentSegment;
                        } else {
                            newSegments.push(currentSegment);
                        }
                        return newSegments;
                    });
                    setCurrentSegmentIndex(nextSegmentIndex);
                    setCurrentCharIndex(0);
                }
            } else {
                // Type next character
                setCurrentCharIndex(nextCharIndex);

                // Update the current display of segments
                setCurrentLineSegments(prev => {
                    const newSegments = [...prev];
                    const partialText = currentSegment.text.substring(0, nextCharIndex);
                    const partialSegment = { ...currentSegment, text: partialText };

                    // Replace or add the current segment
                    if (newSegments[currentSegmentIndex]) {
                        newSegments[currentSegmentIndex] = partialSegment;
                    } else {
                        newSegments[currentSegmentIndex] = partialSegment; // Ensure index alignment
                        // Fill gaps if any (shouldn't happen with sequential logic)
                        for (let i = 0; i < currentSegmentIndex; i++) {
                            if (!newSegments[i]) newSegments[i] = lineToType[i];
                        }
                    }
                    return newSegments;
                });
            }
        }, speed);

        return () => clearTimeout(timer);
    }, [currentLineIndex, currentSegmentIndex, currentCharIndex, lines, speed, onComplete]);

    return (
        <div className={className}>
            {/* Render fully completed lines */}
            {completedLines.map((line, lineIdx) => (
                <div key={lineIdx} className="whitespace-pre-wrap break-words min-h-[1.5em]">
                    {line.length === 0 ? <span>&nbsp;</span> : (
                        line.map((seg, segIdx) => (
                            <span key={segIdx} style={seg.style} className={seg.className}>
                                {seg.text}
                            </span>
                        ))
                    )}
                </div>
            ))}

            {/* Render the current line being typed */}
            {currentLineIndex < lines.length && (
                <div className="whitespace-pre-wrap break-words min-h-[1.5em]">
                    {currentLineSegments.map((seg, segIdx) => (
                        <span key={segIdx} style={seg.style} className={seg.className}>
                            {seg.text}
                        </span>
                    ))}
                    <span className="terminal-cursor"></span>
                </div>
            )}
        </div>
    );
};
