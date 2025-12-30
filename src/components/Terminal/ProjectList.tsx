"use client";

import React, { useMemo } from "react";
import { type ProjectItem } from "@/data/projects";
import { type TerminalTheme } from "@/config/themes";
import { RichTypewriter, type RichLine } from "./RichTypewriter";

interface ProjectListProps {
    data: ProjectItem[];
    theme: TerminalTheme;
}

export const ProjectList: React.FC<ProjectListProps> = ({ data, theme }) => {

    const lines: RichLine[] = useMemo(() => {
        const result: RichLine[] = [];
        const accentClass = "text-yellow-400"; // Distinct accent for projects

        // Header
        result.push([{ text: "// ACCESSING PROJECT_DIRECTORY.LIST...", className: "text-gray-500 text-xs md:text-sm" }]);
        result.push([{ text: "" }]); // Empty line

        data.forEach((project, index) => {

            // Separator
            result.push([
                { text: "[----------", className: "text-gray-800" },
                { text: "--------------------------------------", className: "text-gray-800 hidden md:inline" },
                { text: "]", className: "text-gray-800" }
            ]);

            // Project Name Line: [ID] NAME
            result.push([
                { text: `[0${index + 1}] `, className: "text-gray-500 font-bold" }, // Numbering
                { text: project.name.toUpperCase(), className: `${accentClass} font-bold` }
            ]);

            // Tech Stack
            const techSegments: any[] = [];
            techSegments.push({ text: "> STACK: ", className: "text-gray-500 text-xs ml-2 md:ml-4" });

            project.technologies.forEach(tech => {
                techSegments.push({ text: "[", className: "text-gray-500 text-xs" });
                techSegments.push({ text: tech.toUpperCase(), className: "text-gray-400 text-xs" });
                techSegments.push({ text: "] ", className: "text-gray-500 text-xs" });
            });
            result.push(techSegments);

            // Description Lines
            project.description.forEach(desc => {
                result.push([
                    { text: "  - ", className: "text-gray-600 ml-2 md:ml-4" },
                    { text: desc, className: "text-gray-300" }
                ]);
            });

            // Links
            if (project.url && project.url !== "#") {
                result.push([
                    { text: "  > LINK: ", className: "text-gray-500 ml-2 md:ml-4" },
                    { text: project.url, className: "text-blue-400 underline decoration-dotted" }
                ]);
            }
            if (project.repo) {
                result.push([
                    { text: "  > REPO: ", className: "text-gray-500 ml-2 md:ml-4" },
                    { text: project.repo, className: "text-blue-400 underline decoration-dotted" }
                ]);
            }

            // Spacer
            result.push([{ text: "" }]);
        });

        // Footer
        result.push([
            { text: "[----------", className: "text-gray-800" },
            { text: "--------------------------------------", className: "text-gray-800 hidden md:inline" },
            { text: "]", className: "text-gray-800" }
        ]);
        result.push([{ text: "[END OF DIRECTORY]", className: "text-gray-500" }]);
        result.push([{ text: "Tip: Type 'go <number>' to open a project.", className: "text-gray-600 italic text-sm mt-2" }]);


        return result;
    }, [data, theme]);

    return (
        <div className="font-mono text-sm md:text-base leading-relaxed mt-4 mb-12 select-none">
            <RichTypewriter lines={lines} speed={5} />
        </div>
    );
};
