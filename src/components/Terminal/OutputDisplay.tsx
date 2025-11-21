"use client";

import React, { useEffect, useRef } from "react";

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
}

export const OutputDisplay: React.FC<OutputDisplayProps> = ({ history }) => {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [history]);

    return (
        <div className="w-full">
            {history.map((entry) => (
                <div key={entry.id} className="mb-4">
                    <div className="flex items-center dark:text-green-500 text-gray-700 mb-1">
                        <span className="mr-2">visitor@kyawzinhtet-portfolio:~$</span>
                        <span className="dark:text-white text-black font-bold">{entry.command}</span>
                    </div>
                    <div className="dark:text-green-400 text-gray-800 ml-4">
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
