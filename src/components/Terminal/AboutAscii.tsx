"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Custom hooked to simulate typing for a potentially rich-text structure
// For simplicity, we'll break down the text into chunks and load them sequentially.
// This is "simulated" typewriter for rich text (block by block or line by line appearance).
// True char-bychar for rich text is very hard.

const TypewriterBlock = ({ children, delay = 0, onComplete }: { children: React.ReactNode, delay?: number, onComplete?: () => void }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(true);
            if (onComplete) onComplete();
        }, delay);
        return () => clearTimeout(timer);
    }, [delay, onComplete]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.3 }}
        >
            {children}
        </motion.div>
    );
};

// However, the user specifically requested "typewriter effect". 
// Let's try to actually type out the plain text parts, and just fade in the special spans?
// Or better: use a string-based data structure that "looks" like rich text but is rendered via a custom component.

export const AboutAscii = () => {
    const [glitch, setGlitch] = useState(false);
    const [hovered, setHovered] = useState(false);

    // Typing state
    const [startTyping, setStartTyping] = useState(false);

    useEffect(() => {
        // Start typing after ASCII fades in
        const timer = setTimeout(() => setStartTyping(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!hovered) {
                setGlitch(true);
                setTimeout(() => setGlitch(false), 200);
            }
        }, 3000);
        return () => clearInterval(interval);
    }, [hovered]);

    // Cyberpunk ASCII logic remains...
    const normalAscii = `
        .---.
       /     \\
      |  [ ]  |  <-- VISION
      |   ^   |
      |  ___  |
       \\_____/
      _/     \\_
     [|_______|]
    `;

    const glitchAscii = `
        .-=-. 
       /  .  \\
      |  [X]  |  <-- ERR
      |   ~   |
      |  _#_  | 
       \\_~_~_/
      _/     \\_
     [|__#%___|]
    `;

    return (
        <div className="flex flex-col md:flex-row gap-8 items-start mt-6 mb-8 group">
            {/* ASCII ART SECTION (Unchanged logic) */}
            <motion.div
                className="relative font-mono whitespace-pre leading-none select-none cursor-pointer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                onHoverStart={() => setHovered(true)}
                onHoverEnd={() => setHovered(false)}
            >
                <div className="absolute inset-0 bg-green-500/10 blur-xl rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
                <div className={`relative z-10 text-transparent bg-clip-text bg-gradient-to-b from-green-400 to-green-600 transition-all duration-100 ${glitch ? "translate-x-1" : ""}`}>
                    {glitch ? glitchAscii : normalAscii}
                </div>
                <AnimatePresence>
                    {glitch && (
                        <>
                            <motion.div className="absolute inset-0 text-red-500 opacity-50 mix-blend-screen pointer-events-none" initial={{ x: 0 }} animate={{ x: -2 }} exit={{ x: 0 }}>{glitchAscii}</motion.div>
                            <motion.div className="absolute inset-0 text-blue-500 opacity-50 mix-blend-screen pointer-events-none" initial={{ x: 0 }} animate={{ x: 2 }} exit={{ x: 0 }}>{glitchAscii}</motion.div>
                        </>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* TEXT SECTION WITH TYPEWRITER */}
            <div className="flex flex-col gap-4 max-w-2xl pt-4 text-green-100/90 font-mono">
                {startTyping && (
                    <>
                        <TypewriterRichText
                            text="> System Identity: Full-Stack Developer"
                            highlight={[{ text: "System Identity:", color: "text-green-400 font-bold" }]}
                            speed={30}
                        />
                        <TypewriterRichText
                            text="ID: KZH-DEV-001"
                            highlight={[{ text: "ID: KZH-DEV-001", color: "text-xs text-green-500/50" }]}
                            speed={20}
                            delay={1500}
                        />
                        <div className="mt-4"></div>
                        <TypewriterRichText
                            text="Navigating the digital void for over 4 years."
                            highlight={[{ text: "4 years", color: "text-yellow-400 font-bold" }]}
                            speed={20}
                            delay={2000}
                        />
                        <TypewriterRichText
                            text="Specialized in the MERN protocol (MongoDB, Express, React, Node)."
                            highlight={[{ text: "MERN protocol", color: "text-blue-400" }]}
                            speed={20}
                            delay={3500}
                        />

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 5.5, duration: 0.5 }}
                            className="p-3 mt-4 bg-green-500/5 rounded border border-green-500/10 backdrop-blur-sm"
                        >
                            <p className="font-mono text-sm text-green-300 mb-1">$ cat mission.txt</p>
                            <TypewriterRichText
                                text={'"To architect robust systems and explore new frontiers in mobile & web tech."'}
                                className="italic text-gray-300"
                                speed={15}
                                delay={6000}
                            />
                        </motion.div>

                        <div className="mt-2 text-sm text-gray-400 flex items-center gap-2">
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 8 }}
                            >
                                <span className="animate-pulse">_</span>
                            </motion.span>
                            <TypewriterRichText
                                text="Versatility is my core driver."
                                speed={30}
                                delay={8000}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

// Helper component to handle "Rich" typewriter effect
// It types out the plain text, but renders the highlighted parts with specific classes once they are fully typed (or during).
// Actually, easier approach: Type plain text, but checking "if typed index is inside a highlight range, wrap it".
// This is complex.
// Simplified approach: Render chunks.
// "Navigating the digital void for over " -> type
// "4 years" -> type with color
// "." -> type

interface Highlight {
    text: string;
    color: string;
}

const TypewriterRichText = ({
    text,
    highlight = [],
    speed = 30,
    delay = 0,
    className = ""
}: {
    text: string,
    highlight?: Highlight[],
    speed?: number,
    delay?: number,
    className?: string
}) => {
    const [displayedText, setDisplayedText] = useState("");
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setStarted(true);
        }, delay);
        return () => clearTimeout(timeout);
    }, [delay]);

    useEffect(() => {
        if (!started) return;

        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex <= text.length) {
                setDisplayedText(text.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(interval);
            }
        }, speed);

        return () => clearInterval(interval);
    }, [started, text, speed]);

    if (!started) return <div className="h-6"></div>; // Placeholder to prevent jump

    // Render logic: scan displayedText and replace 'highlight' phrases with spans.
    // This is tricky if the phrase is partially typed.
    // Hacky solution: check if the FULL highlight phrase is present in displayedText.
    // If so, replace it. If partially present... just render text. 
    // This means color "pops" in when word is finished. That's acceptable for "system" look.

    const renderStyledText = (current: string) => {
        let parts: React.ReactNode[] = [current];

        highlight.forEach(({ text: key, color }) => {
            const newParts: React.ReactNode[] = [];
            parts.forEach(part => {
                if (typeof part === "string") {
                    // Split by keyword
                    const split = part.split(key);
                    split.forEach((s, i) => {
                        newParts.push(s);
                        if (i < split.length - 1) {
                            newParts.push(<span key={i} className={color}>{key}</span>);
                        }
                    });
                } else {
                    newParts.push(part);
                }
            });
            parts = newParts;
        });

        return parts;
    };

    return (
        <div className={`leading-relaxed ${className}`}>
            {renderStyledText(displayedText)}
            {displayedText.length < text.length && <span className="animate-pulse inline-block w-2 h-4 bg-green-500/50 ml-1 align-middle"></span>}
        </div>
    );
};
