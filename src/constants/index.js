import {
  web,
  application,
  react,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  python,
  tailwind,
  nodejs,
  csharp,
  git,
  sql,
  nea,
  codey,
  paint,
  threejs,
  azure,
  aws,
  haskell,
  uoe
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
   {
    id: "projects",
    title: "Projects",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Web developer",
    icon: web,
  },
  {
    title: "User application developer",
    icon: application,
  },
  {
    title: "Cloud computing associate",
    icon: react,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Python",
    icon: python,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "C#",
    icon: csharp,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "Haskell",
    icon: haskell,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "SQL",
    icon: sql,
  },
];

const experiences = [
  {
    title: "Tutor and Marker",
    company_name: "School of Informatics, The University of Edinburgh",
    icon: uoe,
    iconBg: "#383E56",
    date: "September 2025 - December 2025",
    points: [
      "Leading weekly tutorials covering Haskell Functional Programming and Computational Logic.",
      "Marking coursework and provided clear, rubric-based written feedback",
      "Preparing materials and coordinated with the teaching team for consistent delivery.",
    ],
  }
];

const projects = [
  {
    name: "In Progress: Codey",
    description:
      "Codey is a practice platform where you can browse problems, read statements, and (soon) write and run code in-browser. It’s built to be fast, clean, and easy to extend.",
    tags: [
      {
        name: "typescript",
        color: "",
      },
      {
        name: "next.js",
        color: "green-text-gradient",
      },
    ],
    image: codey,
    github_link: "https://github.com/akakj/codey",
    link: "",
  },
  {
    name: "Neo's Enchanting Adventures",
    description:
      "An RPG game developed in Python using the Pygame library. It features RPG elements such as level scaling, an inventory system, character selection, character customization, various levels of enemies with AI, and quests.",
    tags: [
      {
        name: "python",
        color: "blue-text-gradient",
      },
      {
        name: "pygame",
        color: "green-text-gradient",
      },
    ],
    image: nea,
    github_link: "https://github.com/akakj/NEA",
    link: "https://www.youtube.com/watch?v=yDPE1SJq3dI",
  },
  {
    name: "Paint-like Application",
    description:
      "A paint-like application where the user can select various shapes, colors, and line widths; group elements together for a more dynamic painting experience; delete elements; move elements; and duplicate elements.",
    tags: [
      {
        name: "c#",
        color: "pink-text-gradient",
      },
    ],
    image: paint,
    github_link: "https://github.com/akakj/Paint-like",
    link: "",
  },
];

const certifications = [
  {
    image: aws,
    title: "AWS Certified Cloud Practitioner"
  },
  {
    image: azure,
    title: "Microsoft Certified: Azure Fundamentals"
  },
]

export { services, technologies, experiences, projects, certifications };
