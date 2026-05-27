/*
 * Known tags. Free-form strings would work too, but a closed type keeps
 * casing consistent and makes typos a compile error.
 */
export type ProjectTag =
    | "ai"
    | "agent"
    | "web"
    | "ios"
    | "blockchain"
    | "blog"
    | "game";

export type Project = {
    name: string;
    description: string;
    tags: ProjectTag[];
    href?: string;
    /** Optional year, if you want to surface it later. */
    year?: number;
};

/*
 * Manually ordered, newest-first. Drop new projects at the top.
 */
export const PROJECTS: Project[] = [
    {
        name: "Acadia Worlds",
        description: "An AI powered world building game. Coming soon.",
        tags: ["ai", "agent", "web", "game"],
    },
    {
        name: "Robot Networks",
        description: "An open protocol for agent-to-agent mail. Currently building this.",
        tags: ["ai", "agent", "web"],
        href: "https://robotnet.works/",
    },
    {
        name: "ASMTP",
        description: "Agent Simple Mail Transfer Protocol. The open spec behind Robot Networks.",
        tags: ["ai", "agent", "web"],
        href: "https://asmtp.net/",
    },
    {
        name: "Broadstreet",
        description: "A personal finance investing app.",
        tags: ["ai", "agent", "web"],
        href: "https://www.trybroadstreet.com",
    },
    {
        name: "Shopping Agent",
        description: "An AI agent that helps you find products you love.",
        tags: ["ai", "agent"],
        href: "https://github.com/nrcrews/ShoppingAgent",
    },
    {
        name: "Noteboard AI",
        description: "A collaborative document editor with a built-in AI co-author.",
        tags: ["ai", "agent", "web"],
        year: 2024,
    },
    {
        name: "GPT Engineer",
        description: "An AI powered software engineer that wrote code in your codebase.",
        tags: ["ai", "agent"],
        href: "https://github.com/nrcrews/gpt-engineer",
    },
    {
        name: "Madness GPT",
        description: "March Madness bracket picker, powered by LLMs.",
        tags: ["ai", "web"],
        href: "https://www.madnessgpt.com/",
    },
    {
        name: "Bulsai",
        description: "Conversational AI that can query your SaaS instances.",
        tags: ["ai", "web"],
        href: "https://github.com/Bulsai",
    },
    {
        name: "Wellio",
        description: "An AI-powered HealthKit lookup app.",
        tags: ["ai", "ios"],
    },
    {
        name: "Mumbo Jumbo",
        description: "An AI-powered immersive language learning app.",
        tags: ["ai", "ios"],
        href: "https://github.com/MumboJumboAI",
    },
    {
        name: "Frnds",
        description: "A short-form video sharing app made just for friends.",
        tags: ["ios"],
        href: "https://github.com/FrndsApp",
    },
    {
        name: "Carriage",
        description: "Lets users send and receive packages from each other within an hour.",
        tags: ["ios"],
    },
    {
        name: "Floater",
        description: "A peer-to-peer short-term lending app for friends.",
        tags: ["ios"],
    },
    {
        name: "Open Basin",
        description: "An Ethereum-based API for CRUD applications.",
        tags: ["blockchain"],
        href: "https://github.com/open-basin",
    },
    {
        name: "Metrics Revamped",
        description: "Audible Tech Blog article about our metric reporting system.",
        tags: ["blog"],
        href: "https://medium.com/audible-tech-blog/metrics-revamped-774a53f5c112",
    },
];
