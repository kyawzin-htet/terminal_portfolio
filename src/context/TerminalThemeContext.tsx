"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { type TerminalTheme, type ThemeName, getTheme } from "@/config/themes";

interface TerminalThemeContextType {
    currentThemeName: ThemeName;
    theme: TerminalTheme;
    setTheme: (themeName: ThemeName) => void;
}

const TerminalThemeContext = createContext<TerminalThemeContextType | undefined>(undefined);

export const TerminalThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentThemeName, setCurrentThemeName] = useState<ThemeName>('dark');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem('terminal-theme');
        if (savedTheme) {
            setCurrentThemeName(savedTheme as ThemeName);
        }
    }, []);

    const setTheme = (name: ThemeName) => {
        setCurrentThemeName(name);
        localStorage.setItem('terminal-theme', name);
    };

    const theme = getTheme(currentThemeName);

    if (!mounted) {
        return null;
    }

    return (
        <TerminalThemeContext.Provider value={{ currentThemeName, theme, setTheme }}>
            {children}
        </TerminalThemeContext.Provider>
    );
};

export const useTerminalTheme = () => {
    const context = useContext(TerminalThemeContext);
    if (!context) {
        throw new Error("useTerminalTheme must be used within a TerminalThemeProvider");
    }
    return context;
};
