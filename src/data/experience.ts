export interface ExperienceItem {
    id: string;
    period: string;
    role: string;
    company: string;
    description: string[];
}

export const experienceData: ExperienceItem[] = [
    {
        id: "exp5",
        period: "2024 - Present",
        role: "Senior Full Stack Engineer",
        company: "TechNova Solutions",
        description: [
            "Leading the migration of legacy monoliths to microservices using **Node.js** and **Go**.",
            "Architecting scalable cloud infrastructure on AWS (Lambda, ECS, RDS).",
            "Mentoring junior developers and establishing code quality standards."
        ]
    },
    {
        id: "exp4",
        period: "2022 - 2024",
        role: "Frontend Developer",
        company: "Creative Pulse Agency",
        description: [
            "Built interactive 3D web experiences using **Three.js** and **React Fiber**.",
            "Optimized frontend performance, achieving 98+ Lighthouse scores.",
            "Collaborated with designers to implement pixel-perfect, responsive UIs."
        ]
    },
    {
        id: "exp3",
        period: "2020 - 2022",
        role: "Software Engineer",
        company: "FinStream Systems",
        description: [
            "Developed real-time financial dashboards using **Vue.js** and **WebSockets**.",
            "Implemented secure authentication flows (OAuth2, JWT) for 50k+ users.",
            "Reduced API latency by 30% through caching strategies (Redis)."
        ]
    },
    {
        id: "exp2",
        period: "2019 - 2020",
        role: "Junior Web Developer",
        company: "StartBlock Inc.",
        description: [
            "Assisted in building MVP features for a fast-paced blockchain startup.",
            "Maintained and updated company landing pages using JAMstack.",
            "Integrated third-party APIs (Stripe, SendGrid) for payment and email services."
        ]
    },
    {
        id: "exp1",
        period: "2018 - 2019",
        role: "Intern Developer",
        company: "CodeCraft Academy",
        description: [
            "Supported the development of internal tools using Python and Django.",
            "Fixed bugs and wrote unit tests to improve system stability.",
            "Learned agile methodologies and participated in daily stand-ups."
        ]
    }
];
