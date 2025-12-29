import React, { useMemo } from "react";
import { type ExperienceItem } from "@/data/experience";
import { type TerminalTheme } from "@/config/themes";
import { RichTypewriter, type RichLine } from "./RichTypewriter";

interface ExperienceDisplayProps {
    data: ExperienceItem[];
    theme: TerminalTheme;
}

export const ExperienceDisplay: React.FC<ExperienceDisplayProps> = ({ data, theme }) => {

    const lines: RichLine[] = useMemo(() => {
        const result: RichLine[] = [];

        // Title Line
        result.push([
            { text: "WORK EXPERIENCE", style: { fontWeight: "bold", borderBottom: `1px solid ${theme.colors.border}`, display: 'inline-block', paddingBottom: '4px' } }
        ]);
        result.push([]); // Empty line for spacing

        data.forEach((item, index) => {
            // Period Line: ● 2024 - Present
            result.push([
                { text: "● ", style: { color: theme.colors.accent, fontWeight: "bold" } },
                { text: item.period, style: { color: theme.colors.accent, fontWeight: "bold" } }
            ]);

            // Connector Line: │
            result.push([
                { text: "│", style: { color: theme.colors.border } },
            ]);

            // Role Line: ├── Senior Engineer @ TechCorp
            result.push([
                { text: "├── ", style: { color: theme.colors.border } },
                { text: item.role, style: { color: theme.colors.foreground, fontWeight: "bold", fontSize: "1.1em" } },
                { text: " @ ", style: { opacity: 0.75 } },
                { text: item.company, style: { color: theme.colors.titleText, fontStyle: "italic", fontWeight: "600" } }
            ]);

            // Description Lines
            item.description.forEach((desc, i) => {
                const isLast = i === item.description.length - 1;
                // Tree structure: │   ├── Description
                // Unless it's the very last item of the entire list, we keep the vertical bar ?
                // Actually the vertical bar connects the Period/Role blocks. 
                // The description is a child of the Role.

                const prefix = isLast ? "└── " : "├── ";

                // Parse bold text **text** into segments
                const segments = [];
                const regex = /(\*\*.*?\*\*)/g;
                let lastIndex = 0;
                let match;

                while ((match = regex.exec(desc)) !== null) {
                    // Text before match
                    if (match.index > lastIndex) {
                        segments.push({ text: desc.substring(lastIndex, match.index) });
                    }
                    // The matched bold text
                    segments.push({
                        text: match[0].slice(2, -2),
                        style: { color: theme.colors.accent }
                    });
                    lastIndex = regex.lastIndex;
                }
                // Text after last match
                if (lastIndex < desc.length) {
                    segments.push({ text: desc.substring(lastIndex) });
                }

                result.push([
                    { text: "│   ", style: { color: theme.colors.border } }, // Indentation for description under role
                    { text: prefix, style: { color: theme.colors.border } },
                    ...segments
                ]);
            });

            // Spacing between items (Vertical connector for timeline)
            if (index < data.length - 1) {
                result.push([
                    { text: "│", style: { color: theme.colors.border } }
                ]);
                result.push([
                    { text: "│", style: { color: theme.colors.border } }
                ]);
            }
        });

        // Add a final connector cap or just leave empty?
        // Usually a timeline ends with a dot or fade out.
        // Let's just stop.

        return result;
    }, [data, theme]);

    return (
        <div className="mt-2 mb-4 font-mono leading-relaxed">
            <RichTypewriter lines={lines} speed={10} />
        </div>
    );
};
