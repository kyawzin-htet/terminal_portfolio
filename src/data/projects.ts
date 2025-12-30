export interface ProjectItem {
    id: string;
    name: string;
    description: string[]; // Array of strings for multi-line support
    technologies: string[];
    url: string;
    repo?: string;
}

export const projectsData: ProjectItem[] = [
    {
        id: "portfolio",
        name: "KyawZinHtet Portfolio",
        description: [
            "A terminal-based portfolio website built with Next.js and Tailwind CSS.",
            "Features a fully functional command-line interface.",
            "Implements retro aesthetics with modern performance."
        ],
        technologies: ["Next.js", "React", "TailwindCSS", "Framer Motion", "TypeScript"],
        url: "#",
        repo: "https://github.com/kyawzinhtet/terminal-portfolio"
    },
    {
        id: "ecommerce-dash",
        name: "E-commerce Dashboard",
        description: [
            "A comprehensive admin dashboard for managing online stores.",
            "Real-time analytics, inventory management, and order processing.",
            "Designed with a focus on data visualization and usability."
        ],
        technologies: ["React", "Redux", "Node.js", "MongoDB", "Chart.js"],
        url: "#"
    },
    {
        id: "task-api",
        name: "Task Manager API",
        description: [
            "A robust RESTful API for task management applications.",
            "Supports user authentication, task CRUD operations, and filtering.",
            "Built with scalability and security in mind."
        ],
        technologies: ["Node.js", "Express", "PostgreSQL", "Jest", "Docker"],
        url: "#"
    },
    {
        id: "weather-cli",
        name: "Weather CLI Tool",
        description: [
            "A command-line tool to fetch real-time weather information.",
            "Written in Go for high performance and portability.",
            "Supports automatic location detection and forecast caching."
        ],
        technologies: ["Go", "Cobra", "OpenWeatherMap API"],
        url: "#"
    }
];
