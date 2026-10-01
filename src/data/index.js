export const personalInfo = {
  name: "Umesh Rathod",
  monogram: "UR",
  role: "Full-Stack Developer",
  roles: ["Full-Stack Developer", "Software Developer", "Problem Solver", "IT Enthusiast"],
  tagline: "Building things that matter.",
  bio: {
    p1: "Started with GTA on a friend's PC. Ended up building AI-powered web apps. Not a bad arc.",
    p2: "2nd year IT student at NIT Jalandhar. I build full-stack web apps — from React frontends to Node.js backends with real databases, auth systems, and AI integrations.",
    p3: "Currently focused on strengthening my development skills — with React at the core, FastAPI in progress, and DSA as a consistent foundation. Continuously learning, building, and improving.",
  },
  contact: {
    email: "umeshhhhhrathod@gmail.com",
    github: "https://github.com/UMESHRATHOD16",
    githubUsername: "UMESHRATHOD16",
    linkedin: "https://linkedin.com/in/rathodumesh",
    instagram: "https://instagram.com/__umeshrathod",
    hashnode: "https://umeshblog1.hashnode.dev",
    resume: "#",
    location: "NIT Jalandhar, Punjab, India",
  },
}

export const skills = [
  {
    category: "Current Arc",
    color: "accent",
    items: [
      "React", "JavaScript", "Redux Toolkit",
      "Tailwind CSS", "HTML", "CSS",
    ],
  },
  {
    category: "Unlocking",
    color: "purple",
    items: ["Node.js", "Express.js", "MongoDB"],
  },
  {
    category: "Always Training",
    color: "slate",
    items: ["C++", "DSA", "Git", "GitHub"],
  },
]

export const projects = [
  {
    id: "megablog",
    title: "Mega Blog",
    category: "Full-Stack",
    description:
      "Production-grade blogging platform. Write, publish, own your words. Built with a clean service layer pattern — all Appwrite interactions abstracted into modular service classes.",
    tags: ["React", "Appwrite", "Redux Toolkit", "Tailwind CSS", "React Hook Form"],
    github: "https://github.com/UMESHRATHOD16/MegaBlogApp",
    live: null,
    featured: true,
  },
  {
    id: "ecosangam",
    title: "EcoSangam",
    category: "Full-Stack + AI",
    description:
      "AI-driven sustainability platform. Track your carbon footprint, get Gemini-powered eco insights, Google OAuth, real-time dashboard.",
    tags: ["React", "Node.js", "MongoDB", "Express", "Gemini API", "Google OAuth"],
    github: "https://github.com/UMESHRATHOD16/ecoSangam",
    live: null,
    featured: true,
  },
]

export const experience = [
  {
    id: "nitj",
    title: "B.Tech Information Technology",
    org: "NIT Jalandhar",
    period: "2024 → 2028",
    type: "Education",
    description: "Pursuing 2nd year B.Tech IT. Heavy focus on software engineering, DSA, and modern web systems.",
    highlights: [
      "Built EcoSangam — AI sustainability platform with Gemini API",
      "Built Mega Blog — production-grade blogging platform",
      "Mastering full-stack: React → Node.js → beyond",
      "Writing technical blogs on Hashnode",
    ],
  },
  {
    id: "ayurgenx",
    title: "Frontend Developer & Campus Ambassador",
    org: "AyurGenX — IIT Madras Incubated",
    period: "2024",
    type: "Internship",
    description: "Ayurveda-meets-AI wellness platform incubated at IIT Madras.",
    highlights: [
      "Frontend development on production React + Vite codebase",
      "Designed and implemented responsive UI components",
      "Campus ambassador — drove user awareness and feedback loops",
    ],
  },
]

export const blogs = [
  {
    id: "cpp-memory",
    title: "I Broke C++ Memory On Purpose — Here's What Happened",
    date: "May 3, 2026",
    readTime: "2 min read",
    tags: ["C++", "Memory", "DSA"],
    summary:
      "A hands-on dive into breaking memory intentionally in C++. Pointers, heap vs stack, segfaults, and the raw mechanics of low-level programming.",
    url: "https://umeshblog1.hashnode.dev",
  },
]