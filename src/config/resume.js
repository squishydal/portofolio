export const resumeText = `WORK EXPERIENCE

PT. Layanan Cerdas Indonesia (Dec 2024 – Feb 2025) – Intern Full Stack Developer, Bandung, ID
• Debugged and fixed functionality issues in RESTful API systems.
• Developed a responsive, mobile-friendly company profile website.
• Collaborated with cross-functional.
• Stack: PHP (Laravel), Linux, Nginx, TypeScript (Vite), Docker

Palang Merah Indonesia Bandung (Feb 2019 – Aug 2019) – IT Support Intern
• Developed a responsive company profile website from scratch.
• Provided hardware and software troubleshooting.

EDUCATION

STT Mandala Bandung – Bachelor of Informatics Engineering (Expected Oct 2025)
GPA: 3.2/4.0
• Active member of the Student Association; led organizational activities

PROJECTS

Kenshi Mod Loader
• Go-based web scraper extracting, displaying, and curating mod data from Steam Workshop
• Implemented concurrent scraping with goroutines for improved performance
• Built RESTful API with pagination
• Tech Stack: Go, PostgreSQL
• GitHub: github.com/yourusername/kenshi-workshop-picker

Terminal Resume (This Project!)
• Interactive terminal-style resume with 15+ commands and features
• Implements command history, autocomplete, theme switching, and mobile support
• Built with Vite, xterm.js, and vanilla JavaScript
• Deployed on GitHub Pages with automated CI/CD
• GitHub: github.com/squishydal/porto


TECHNICAL SKILLS

Languages: Go, Python, TypeScript/JavaScript, PHP, SQL, Bash
Frameworks: Laravel, Node.js, Express, Vite, GIN
Databases: MySQL, PostgreSQL, MongoDB
DevOps: Docker, Git, GitHub Actions, Nginx, Linux
Tools: VS Code, Vim, Postman, DBeaver, Figma

SOFT SKILLS
• Problem-Solving & Analytical Thinking
• Team Collaboration & Communication
• Time Management & Organization
• Adaptability & Quick Learning
• Technical Documentation

INTERESTS
Photography (Street & Landscape), 3D Modeling (Blender), AI/ML Exploration, 
Open Source , Gaming, Linux Ricing, Mechanical Keyboards`;

export const asciiArt = String.raw`
████████╗ ██████╗ ██████╗   █████╗ 
╚══██╔══╝██╔═══██╗██╔══██╗ ██╔══██╗
   ██║   ██║   ██║██████╔╝ ███████║
   ██║   ██║   ██║██╔══██  ██╔══██║
   ██║   ╚██████╔╝██║  ██║ ██║  ██║
   ╚═╝    ╚═════╝ ╚═╝  ╚═╝ ╚═╝  ╚═╝
`;

export const neofetchData = {
  name: "Tora Sifa",
  title: "Wannabe Full Stack Developer",
  os: "Arch Linux (btw)",
  shell: "Good ol bash",
  editor: "Neovim",
  location: "Bandung, Indonesia",
  languages: ["Go", "TypeScript", "Python", "PHP"],
  uptime: "Coding for fun since 2017",
};

export const contact = {
  email: "mochammadtora@gmail.com",
  phone: "+62 851 5543 0335",
  linkedin: "linkedin.com/in/tora-sifa",
  github: "github.com/squishydal",
  location: "Bandung, West Java, Indonesia",
};

export const skills = {
  hard: [
    "Golang",
    "Python",
    "TypeScript/JavaScript",
    "PHP (Laravel)",
    "MySQL/PostgreSQL",
    "Docker",
    "Git & GitHub Actions",
    "RESTful API Design",
    "Linux System Administration",
  ],
  soft: [
    "Problem-Solving",
    "Team Collaboration",
    "Time Management",
    "Technical Communication",
    "Adaptability",
    "Critical Thinking",
  ],
};

export const projects = {
  "kenshi-picker": {
    name: "Kenshi Mod Loader",
    description: "Go-based web scraper for Steam Workshop mods",
    tech: ["Go", "PostgreSQL"],
    highlights: [
      "Concurrent scraping with goroutines",
      "RESTful API with pagination",
      "Caching layer for performance",
      "10k+ mods indexed",
    ],
    github: "github.com/squishdal/kenshi-mod-loader",
  },
  "terminal-resume": {
    name: "Terminal Resume (This Project!)",
    description:
      "Interactive terminal-style resume with 15+ commands and features",
    tech: ["JavaScript", "xterm.js", "Vite"],
    highlights: [
      "15+ interactive commands",
      "Theme switching & persistence",
      "Mobile-optimized",
      "Accessibility features",
    ],
    github: "github.com/squishydal/terminal-resume",
    live: "squishydal.github.io/terminal-resume",
  },
};

export const easterEggs = {
  sudo: "Really are you gonna try sudo in here -_-",
  "rm -rf /": "Dissapointed but not surprissed",
  hack: "Yeah Like that would work Hmm......",
  coffee: "Pour over only",
  nano: "No text editor for you",
  vim: "Still no not even vim",
  emacs: "Just give up dude there's no text editor in here",
};

export const fortunes = [
  "If i can make this ain't no way you cannot",
  "Believe in your self",
  "Your self in 2 years gonna be gratefull to you now",
  "Just stand up again falling doesn't mean losing",
  "Lock in gang",
];

export const fileSystem = {
  "resume.txt": resumeText,
  "contact.txt": `Name: ${neofetchData.name}
Email: ${contact.email}
Phone: ${contact.phone}
Location: ${contact.location}

Social Links:
━━━━━━━━━━━━━━━
LinkedIn: ${contact.linkedin}
GitHub: ${contact.github}
Website: ${contact.website}

Feel free to reach out for opportunities, collaborations, or just to chat about tech!`,

  "skills.txt": `TECHNICAL SKILLS
${"━".repeat(50)}

Hard Skills:
${skills.hard.map((s, i) => `${i + 1}. ${s}`).join("\n")}

Soft Skills:
${skills.soft.map((s, i) => `${i + 1}. ${s}`).join("\n")}

Always learning and expanding my skill set! 🚀`,

  "projects.json": JSON.stringify(projects, null, 2),

  "ascii.txt": asciiArt,

  "quotes.txt": `I hate wasted potential, that shit crushes your spirit
It really does, it crushes your soul`,

  "readme.md": `# Welcome to My Terminal Resume! 

This is an interactive terminal-style resume built with passion and caffeine 

## Features
- 15+ interactive commands
- Tab completion & command history
- Theme switching (CRT, Matrix, Hacker, Light)
- Mobile-friendly
- Downloadable resume as PDF
- Easter eggs hidden throughout!

## Quick Start
Type \`help\` to see available commands, or try:
- \`about\` - Learn about me
- \`skills\` - View my skills
- \`projects\` - See what I've built
- \`contact\` - Get in touch
- \`neofetch\` - System info (nerd style)
- \`theme\` - Change visual theme

Built using xterm.js and Vite.`,
};

export const commandHelp = {
  help: "Display available commands or detailed help for a specific command.\nUsage: help [command]",
  ls: "List files in the current directory.\nUsage: ls",
  cat: "Display contents of a file.\nUsage: cat <filename>",
  clear: "Clear the terminal screen.\nUsage: clear",
  pwd: "Print working directory path.\nUsage: pwd",
  about: "Display information about me.\nUsage: about",
  contact: "Show contact information.\nUsage: contact",
  skills: "List technical and soft skills.\nUsage: skills",
  projects:
    "View detailed project information.\nUsage: projects [project-name]",
  neofetch: "Display system information in neofetch style.\nUsage: neofetch",
  whoami: "Display current user information.\nUsage: whoami",
  history: "Show command history.\nUsage: history",
  download: "Download resume as PDF or TXT.\nUsage: download [pdf|txt]",
  theme: "Change terminal theme.\nUsage: theme [crt|matrix|hacker|light|list]",
  date: "Display current date and time.\nUsage: date",
  echo: "Print text to the terminal.\nUsage: echo <text>",
  exit: "End the terminal session.\nUsage: exit",
};
