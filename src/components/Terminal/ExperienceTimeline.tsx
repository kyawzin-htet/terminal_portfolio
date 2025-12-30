"use client";

import React, { useMemo } from "react";
import { type ExperienceItem } from "@/data/experience";
import { type TerminalTheme } from "@/config/themes";
import { RichTypewriter, type RichLine } from "./RichTypewriter";

interface ExperienceTimelineProps {
    data: ExperienceItem[];
    theme: TerminalTheme;
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ data, theme }) => {

    const lines: RichLine[] = useMemo(() => {
        const result: RichLine[] = [];
        const accentClass = "text-green-400"; // Single color for titles

        // Header
        result.push([{ text: "// ACCESSING CAREER_HISTORY.LOG...", className: "text-gray-500 text-xs md:text-sm" }]);
        result.push([{ text: "" }]); // Empty line

        data.forEach((item, index) => {
            const isLast = index === data.length - 1;

            // Top Separator for each item
            // Mobile: [----------]
            // Desktop: [------------------------------------------------]
            result.push([
                { text: "[----------", className: "text-gray-800" },
                { text: "--------------------------------------", className: "text-gray-800 hidden md:inline" },
                { text: "]", className: "text-gray-800" }
            ]);

            // Role Line: 
            // Desktop: [Period] Role @ Company
            // Mobile: 
            // [Period]
            // Role @ Company
            result.push([
                { text: "[", className: "text-gray-500 font-bold" },
                { text: item.period, className: "text-gray-500 font-bold" },
                { text: "] ", className: "text-gray-500 font-bold" },

                // Newline on mobile only
                { text: "\n", className: "md:hidden" },

                { text: item.role, className: `${accentClass} font-bold` },
                { text: " @ ", className: "text-gray-400" },
                { text: item.company, className: "text-gray-300 underline decoration-dotted decoration-gray-600 underline-offset-4" }
            ]);

            // Tech Stack Line
            const techSegments: any[] = [];
            // Reduced indent on mobile (ml-2) vs desktop (ml-4)
            techSegments.push({ text: "> STACK: ", className: "text-gray-500 text-xs ml-2 md:ml-4" });

            // Allow stack to wrap nicely on small screens
            item.technologies.forEach(tech => {
                techSegments.push({ text: "[", className: "text-gray-500 text-xs" });
                techSegments.push({ text: tech.toUpperCase(), className: "text-gray-400 text-xs" });
                techSegments.push({ text: "] ", className: "text-gray-500 text-xs" });
            });
            result.push(techSegments);

            // Description Lines
            item.description.forEach(desc => {
                const parts = desc.split(/(\*\*.*?\*\*)/g);
                const descSegments: any[] = [
                    { text: "  - ", className: "text-gray-600 ml-2 md:ml-4" } // Indent adjusted
                ];

                parts.forEach(part => {
                    if (part.startsWith("**") && part.endsWith("**")) {
                        descSegments.push({ text: part.slice(2, -2), className: accentClass });
                    } else {
                        descSegments.push({ text: part, className: "text-gray-300" });
                    }
                });
                result.push(descSegments);
            });

            // Spacer
            result.push([{ text: "" }]);
        });

        // Footer
        result.push([
            { text: "[----------", className: "text-gray-800" },
            { text: "--------------------------------------", className: "text-gray-800 hidden md:inline" },
            { text: "]", className: "text-gray-800" }
        ]);
        result.push([{ text: "[END OF LOG]", className: "text-gray-500" }]);

        return result;
    }, [data, theme]);

    return (
        <div className="font-mono text-sm md:text-base leading-relaxed mt-4 mb-12 select-none">
            <RichTypewriter lines={lines} speed={5} />
        </div>
    );
};
