export interface ExperienceItem {
    id: string;
    period: string;
    role: string;
    company: string;
    description: string[];
    technologies: string[];
}

export const experienceData: ExperienceItem[] = [
    {
        id: "exp-freelance",
        period: "02/2025 - Present",
        role: "Senior Frontend Developer",
        company: "CreativeForgeLabs (Freelance)",
        description: [
            "Architected scalable admin platform for **50k+ users** using **Vue 3** & **TypeScript**.",
            "Designed backend with **Node.js**, **Express** & **MySQL**, syncing real-time data via background jobs.",
            "Built resilient pipelines with **Socket.IO** for high-frequency, low-latency updates.",
            "Established smooth **continuous development** workflows for seamless deployment."
        ],
        technologies: ["Vue 3", "Node.js", "Express", "MySQL", "Socket.IO", "CI/CD"]
    },
    {
        id: "exp-wer",
        period: "07/2024 - 01/2025",
        role: "Full-stack Developer",
        company: "WeR Co.,LTD",
        description: [
            "Developed admin dashboard with **Remix.js**, **Firebase**, & **Stripe**.",
            "Built cross-platform mobile apps for iOS/Android using **React Native**.",
            "Designed optimized APIs with **Nest.js** & **PostgreSQL** (Prisma ORM).",
            "Significantly reduced app crash rates & improved load times."
        ],
        technologies: ["Remix.js", "React Native", "Nest.js", "PostgreSQL", "Firebase"]
    },
    {
        id: "exp-c3",
        period: "01/2024 - Present",
        role: "Full-stack Developer",
        company: "C3",
        description: [
            "Built POS & Match Management systems using **MERN Stack**.",
            "Implemented clean architecture APIs with **TypeScript** & **MongoDB**.",
            "Set up **CI/CD pipelines** & ensured code quality via unit testing.",
            "Streamlined transaction workflows, reducing user checkout times."
        ],
        technologies: ["MongoDB", "Express", "React", "Node.js", "Redux", "CI/CD"]
    },
    {
        id: "exp-tunyat",
        period: "06/2023 - 01/2024",
        role: "Full-stack Developer",
        company: "Tunyat",
        description: [
            "Designed scalable APIs for Reward Fund Management System.",
            "Developed frontend features with **React/Redux** & **JWT** auth.",
            "Mentored juniors & minimized API downtime through better error handling."
        ],
        technologies: ["Node.js", "Express", "MongoDB", "React", "Redux"]
    },
    {
        id: "exp-md-mid",
        period: "01/2022 - 05/2023",
        role: "Mid-Level Developer",
        company: "Myanmar Digital It Solution",
        description: [
            "delivered 4+ web apps & 2 mobile apps (**React Native**).",
            "Led development of distinct mobile app achieving significant downloads.",
            "Optimized codebase efficiency with reusable components."
        ],
        technologies: ["React", "React Native", "Node.js", "MongoDB", "Express"]
    },
    {
        id: "exp-md-jun",
        period: "06/2020 - 12/2021",
        role: "Junior Developer",
        company: "Myanmar Digital It Solution",
        description: [
            "Assisted in building RESTful APIs with **Node.js** & **Express**.",
            "Collaborated on **React** frontend modules & database schema design.",
            "Enhanced app reliability by addressing critical data query bugs."
        ],
        technologies: ["Node.js", "Express", "MongoDB", "React"]
    },
    {
        id: "exp-globalwave",
        period: "12/2019 - 02/2020",
        role: "Intern",
        company: "Global Wave Technology",
        description: [
            "Developed website using **.NET Core**, **C#**, & **Angular**.",
            "Designed dynamic pages with **HTML**, **CSS**, & **JQuery**.",
            "Utilized Angular components for SPA architecture."
        ],
        technologies: [".NET Core", "C#", "Angular", "Bootstrap", "SQL"]
    }
];
