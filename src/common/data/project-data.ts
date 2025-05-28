import sendItImage from "~/common/assets/projects/sendit.png";
import blogTenantsImage from "~/common/assets/projects/blogtenants.png";
import devNewzImage from "~/common/assets/projects/devnewz.png";
import authNImage from "~/common/assets/projects/authn.png";
import typescriptToastifyImage from "~/common/assets/projects/typescript-toastify.png";



const projectData = [
  {
    name: "SendIt",
    description:
      "SendIt is a privacy-focused file sharing app that lets you upload, share, and protect files with ease. Features include instant link and QR code generation, customizable link options, file expiry controls, and multiple layers of access protection for complete security.",
    githubLink: "https://github.com/aayushmaan-54/SendIt",
    liveLink: "https://sendit-file.vercel.app",
    techStack: [
      "Next.js",
      "Tailwind CSS",
      "PostgreSQL",
      "Drizzle ORM",
      "React Query",
      "SendGrid",
      "Vercel CRON Jobs",
      "BetterAuth"
    ],
    projectImage: sendItImage,
    color: '#3E63DD',
  },
  {
    name: "BlogTenants",
    description:
      "BlogTenants is a secure multi-tenant blogging platform that lets you create and manage multiple blogs under one account. It features easy authentication, a Notion-style editor, and unique URLs for sharing each blog.",
    githubLink: "https://github.com/aayushmaan-54/BlogTenants",
    liveLink: "https://blogtenants.vercel.app",
    techStack: [
      "Next.Js",
      "Tailwind CSS",
      "PostgreSQL",
      "Prisma ORM",
      "Kinde Auth",
      "Novel Editor",
    ],
    projectImage: blogTenantsImage,
    color: '#1F60C9',
  },
  {
    name: "DevNewz",
    description:
      "DevNewz is a Hacker News-inspired platform featuring velocity-based post ranking, nested comments, a karma system, and detailed user profiles. Users can browse curated feeds, submit posts, and engage in threaded discussions with community-driven voting.",
    githubLink: "https://github.com/aayushmaan-54/DevNewz",
    liveLink: "https://devnewz.vercel.app",
    techStack: [
      "Next.Js",
      "Tailwind CSS",
      "PostgreSQL",
      "Prisma ORM",
      "JWT",
      "React Query",
      "Crypto Web API",
    ],
    projectImage: devNewzImage,
    color: '#F86A04',
  },
  {
    name: "://AuthN",
    description:
      "://AuthN is a full-stack authentication system with features like user registration, Google OAuth, adaptive login, role-based access, and secure password management. It includes email verification, device recognition, and automated alerts for enhanced security.",
    githubLink: "https://github.com/aayushmaan-54/AuthN-MERN-App",
    liveLink: "https://authn-app.vercel.app",
    techStack: [
      "React.Js",
      "Tailwind CSS",
      "Redux Toolkit",
      "React Router",
      "Node.Js",
      "Express.Js",
      "MongoDB",
      "JWT",
      "Google OAuth",
    ],
    projectImage: authNImage,
    color: '#FFFFFF',
  },
  {
    name: "TypeScript Toastify",
    description:
      "TypeScript Toastify is a lightweight, customizable toast notification library for web applications. With over 3,300 downloads, it offers easy setup, dark mode support, various toast types, and features like pause on hover and focus loss.",
    githubLink: "https://github.com/aayushmaan-54/TypeScript-Toastify-Library",
    liveLink: "https://typescript-toastify.vercel.app",
    npmLink: "https://www.npmjs.com/package/typescript-toastify",
    techStack: [
      "TypeScript",
      "NPM",
      "CSS",
    ],
    projectImage: typescriptToastifyImage,
    color: '#3278C1',
  }
];



export default projectData;
