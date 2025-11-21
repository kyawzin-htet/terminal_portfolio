"use client";

import React from "react";
import { useTypewriter } from "@/hooks/useTypewriter";

interface TypewriterProps {
    text: string;
    speed?: number;
    className?: string;
}

export const Typewriter: React.FC<TypewriterProps> = ({
    text,
    speed = 20,
    className = "",
}) => {
    const { displayText } = useTypewriter(text, speed);

    return <span className={className}>{displayText}</span>;
};
