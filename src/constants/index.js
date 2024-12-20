import {
  game,
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
  platformer,
  paint,
  threejs,
  azure,
  aws,
  haskell,
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
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Game developer",
    icon: game,
  },
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

const projects = [
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
    name: "Mai's Jumping",
    description:
      "A mobile platformer developed in Unity using C#. The platformer features simple jumping mechanics, coin collection, and a skin shop.",
    tags: [
      {
        name: "unity",
        color: "white-text-gradient",
      },
      {
        name: "c#",
        color: "pink-text-gradient",
      },
    ],
    image: platformer,
    github_link: "",
    link: "",
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
    github_link: "https://github.com/akakj/Paint",
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

export { services, technologies, projects, certifications };
