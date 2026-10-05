export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  activities: string[];
}

export const processSteps: ProcessStep[] = [
  {
    id: "discover",
    title: "Discover",
    description: "Understand the business and users.",
    activities: ["Stakeholder interviews", "Workflow mapping", "Requirements"],
  },
  {
    id: "design",
    title: "Design",
    description: "Design the user experience and system architecture.",
    activities: ["User flows", "Interface design", "System architecture"],
  },
  {
    id: "build",
    title: "Build",
    description: "Develop the frontend, backend, database, APIs, and integrations.",
    activities: ["Frontend", "Backend & APIs", "Database & integrations"],
  },
  {
    id: "test",
    title: "Test",
    description: "Validate functionality, usability, reliability, and security.",
    activities: ["Functional QA", "Usability review", "Security checks"],
  },
  {
    id: "deploy",
    title: "Deploy",
    description: "Launch the production system.",
    activities: ["Production setup", "Data migration", "Team onboarding"],
  },
  {
    id: "improve",
    title: "Improve",
    description: "Maintain and improve the product as the business grows.",
    activities: ["Monitoring", "Support", "New features"],
  },
];

export const technologies: string[] = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Python",
  "Django",
  "PostgreSQL",
  "REST APIs",
  "AI Integrations",
];
