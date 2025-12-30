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
        name: "Terminal Portfolio",
        description: [
            "A terminal-based portfolio website built with Next.js and Tailwind CSS.",
            "Features a fully functional command-line interface.",
            "Implements retro aesthetics with modern performance."
        ],
        technologies: ["Next.js", "React", "TailwindCSS", "Framer Motion", "TypeScript"],
        url: "https://kyawzinhtet-terminal-portfolio.vercel.app",
        repo: "https://github.com/kyawzin-htet/terminal_portfolio"
    },
    {
        id: "weather-app",
        name: "Weather App",
        description: [
            "A modern weather application that provides real-time weather information with an interactive map interface.",
            "Users can search for locations and view detailed weather forecasts with beautiful visualizations."
        ],
        technologies: [
            "next.js",
            "react",
            "tailwind",
            "react-leaflet",
            "axios"
        ],
        url: "https://weatherapp-k-next.vercel.app/",
        repo: "https://github.com/yourusername/weather-app"
    },
    {
        id: "kanban-app",
        name: "Kanban App",
        description: [
            "A kanban board application for flexible task management.",
            "Users can create, edit, delete tasks, and move them between columns with ease."
        ],
        technologies: [
            "react",
            "redux",
            "react-beautiful-dnd",
            "nodejs",
            "express",
            "jsonwebtoken",
            "mongoose",
            "cookie-parser",
            "cors"
        ],
        url: "https://mern-stack-kanban.vercel.app"
    },
    // {
    //     id: "crypto-track",
    //     name: "Crypto Track",
    //     description: [
    //         "A modern cryptocurrency tracking application providing real-time data and analytics.",
    //         "Users can search for cryptocurrencies and view detailed information with beautiful visualizations."
    //     ],
    //     technologies: [
    //         "react",
    //         "recharts",
    //         "tailwind"
    //     ],
    //     url: "https://track-app-crypto.netlify.app/"
    // },
    // {
    //     id: "rhyme4u",
    //     name: "Rhyme4U",
    //     description: [
    //         "React music player app integrated with Shazam Core API."
    //     ],
    //     technologies: [
    //         "react",
    //         "redux",
    //         "axios",
    //         "swiper"
    //     ],
    //     url: "https://rhyme4u.netlify.app/"
    // },
    // {
    //     id: "auth-app",
    //     name: "Auth App",
    //     description: [
    //         "A modern authentication app with secure user signup, login, and account management.",
    //         "Features intuitive interface and secure authorization flows."
    //     ],
    //     technologies: [
    //         "react",
    //         "zustand",
    //         "tailwind",
    //         "nodejs",
    //         "express",
    //         "jsonwebtoken",
    //         "mailgen",
    //         "mongoose",
    //         "nodemailer"
    //     ],
    //     url: "https://mern-authenication.vercel.app/"
    // },
    // {
    //     id: "kmovies",
    //     name: "Kmovies",
    //     description: [
    //         "A movie application offering a wide range of movies and TV shows.",
    //         "Users can search, save favorites, and view detailed information."
    //     ],
    //     technologies: [
    //         "react",
    //         "redux",
    //         "materialui",
    //         "yup",
    //         "swiper",
    //         "nodejs",
    //         "express",
    //         "jsonwebtoken",
    //         "mongoose"
    //     ],
    //     url: "https://moviesk.netlify.app/"
    // }
];
