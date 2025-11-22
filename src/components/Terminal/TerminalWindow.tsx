"use client";

import React, { useRef } from "react";
import { Maximize2, Minus, X, Minimize2, Moon, Sun } from "lucide-react";
import { motion, useDragControls } from "framer-motion";

interface TerminalWindowProps {
    children: React.ReactNode;
    title?: string;
    isMaximized: boolean;
    setIsMaximized: (value: boolean) => void;
    isMinimized: boolean;
    setIsMinimized: (value: boolean) => void;
    onToggleTheme: () => void;
    isDark: boolean;
}

export const TerminalWindow: React.FC<TerminalWindowProps> = ({
    children,
    title = "visitor@kyawzinhtet-portfolio: ~",
    isMaximized,
    setIsMaximized,
    isMinimized,
    setIsMinimized,
    onToggleTheme,
    isDark,
}) => {
    const dragControls = useDragControls();
    const containerRef = useRef<HTMLDivElement>(null);

    const toggleMaximize = () => {
        setIsMaximized(!isMaximized);
        if (!isMaximized) setIsMinimized(false);
    };

    const toggleMinimize = () => {
        setIsMinimized(!isMinimized);
        if (!isMinimized) setIsMaximized(false);
    };

    // If minimized, we might want to show just a small bar at the bottom or similar.
    // For this implementation, we'll just collapse the content height.

    return (
        <motion.div
            ref={containerRef}
            drag={!isMaximized}
            dragControls={dragControls}
            dragMomentum={false}
            dragListener={false}
            initial={false}
            animate={{
                width: isMaximized ? "100vw" : "100%",
                height: isMaximized ? "100vh" : isMinimized ? "auto" : "600px",
                maxWidth: isMaximized ? "100vw" : "56rem", // 4xl = 56rem
                borderRadius: isMaximized ? 0 : "0.5rem",
                x: isMaximized ? 0 : undefined,
                y: isMaximized ? 0 : undefined,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`dark:bg-black/90 bg-white border dark:border-green-900 border-gray-300 shadow-2xl overflow-hidden flex flex-col font-mono ${isMaximized ? "fixed inset-0 z-50" : "relative mx-auto"
                }`}
            style={{
                // Ensure it doesn't go off-screen easily when not maximized
                position: isMaximized ? "fixed" : "relative",
            }}
        >
            {/* Title Bar */}
            <div
                onPointerDown={(e) => {
                    if (!isMaximized) dragControls.start(e);
                }}
                className={`dark:bg-gray-900 bg-gray-100 px-4 py-2 flex items-center justify-between border-b dark:border-green-900 border-gray-300 select-none ${!isMaximized ? "cursor-grab active:cursor-grabbing" : ""
                    }`}            >
                <div className="flex items-center gap-2 group">
                    <button
                        onClick={() => window.location.reload()} // Close = Refresh for now
                        className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors flex items-center justify-center"
                    >
                        <X size={8} className="opacity-0 group-hover:opacity-100 text-black" />
                    </button>
                    <button
                        onClick={toggleMinimize}
                        className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors flex items-center justify-center"
                    >
                        <Minus size={8} className="opacity-0 group-hover:opacity-100 text-black" />
                    </button>
                    <button
                        onClick={toggleMaximize}
                        className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors flex items-center justify-center"
                    >
                        {isMaximized ? (
                            <Minimize2 size={8} className="opacity-0 group-hover:opacity-100 text-black" />
                        ) : (
                            <Maximize2 size={8} className="opacity-0 group-hover:opacity-100 text-black" />
                        )}
                    </button>
                </div>
                <div className="text-green-700 text-sm">{title}</div>
                <div className="flex items-center gap-2 opacity-50">
                    <button
                        onClick={onToggleTheme}
                        className="hover:text-green-400 transition-colors"
                        title="Toggle Theme"
                    >
                        {isDark ? <Sun size={14} /> : <Moon size={14} />}
                    </button>
                </div>
            </div>

            {/* Content Area */}
            {!isMinimized && (
                <div className="flex-1 p-4 overflow-y-auto scrollbar-thin dark:scrollbar-thumb-green-900 scrollbar-thumb-gray-400 dark:scrollbar-track-black scrollbar-track-gray-100">
                    {children}
                </div>
            )}
        </motion.div>
    );
};
