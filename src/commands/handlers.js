import {
  fileSystem,
  contact,
  skills,
  fortunes,
  projects,
  neofetchData,
  easterEggs,
  commandHelp,
} from "../config/resume.js";
import { downloadPDF, downloadTXT } from "../utils/download.js";
import { applyTheme, listThemes } from "../utils/themes.js";
import { storage, STORAGE_KEYS, trackCommand } from "../utils/storage.js";
import { getRandomTip } from "../utils/onboarding.js";

export const COMMANDS = Object.freeze([
  "help",
  "ls",
  "cat",
  "clear",
  "pwd",
  "about",
  "contact",
  "skills",
  "projects",
  "neofetch",
  "whoami",
  "history",
  "download",
  "theme",
  "fortune",
  "date",
  "echo",
  "exit",
  "sudo",
  "man",
]);

let commandCount = 0;

export function splitArgs(line) {
  const re = /(?:"([^"]*)")|(?:'([^']*)')|([^\s]+)/g;
  const parts = [];
  let m;
  while ((m = re.exec(line)) !== null) {
    parts.push(m[1] ?? m[2] ?? m[3]);
  }
  return parts;
}

function getRandomFortune() {
  return fortunes[Math.floor(Math.random() * fortunes.length)];
}

export function runCommand(line, utils, state) {
  const { writeln, term } = utils;
  const parts = splitArgs(line.trim());
  if (parts.length === 0) return;

  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  // Track command usage
  trackCommand(cmd);
  commandCount++;

  // Check for easter eggs first
  const easterEggKey = parts.join(" ").toLowerCase();
  if (easterEggs[easterEggKey]) {
    writeln("");
    writeln(easterEggs[easterEggKey]);
    return;
  }

  switch (cmd) {
    case "help":
      if (args.length > 0) {
        const helpCmd = args[0].toLowerCase();
        if (commandHelp[helpCmd]) {
          writeln("");
          writeln(`${helpCmd.toUpperCase()}`);
          writeln("─".repeat(40));
          commandHelp[helpCmd].split("\n").forEach((line) => writeln(line));
        } else {
          writeln("");
          writeln(`No help available for: ${helpCmd}`);
          writeln('Type "help" to see all available commands.');
        }
      } else {
        writeln("");
        writeln("AVAILABLE COMMANDS");
        writeln("═".repeat(50));
        writeln("");
        writeln("File System:");
        writeln("   ls, cat, pwd");
        writeln("");
        writeln("Information:");
        writeln("   about, contact, skills, projects, neofetch, whoami");
        writeln("");
        writeln("Utilities:");
        writeln("   download, theme, history, date, echo, fortune");
        writeln("");
        writeln("Display:");
        writeln("   clear");
        writeln("");
        writeln("Help:");
        writeln("   help [command] - Get detailed help for a command");
        writeln("   man [command]  - Same as help");
        writeln("");
        writeln('Tip: Try "help <command>" for detailed information');
        writeln("     Example: help download");
      }
      break;

    case "man":
      // man is an alias for help
      runCommand("help " + args.join(" "), utils, state);
      return;

    case "ls":
      writeln("");
      const names = Object.keys(fileSystem);
      const cols = 3;
      const colWidth = 20;
      for (let i = 0; i < names.length; i += cols) {
        const row = names.slice(i, i + cols);
        writeln(row.map((n) => n.padEnd(colWidth)).join(""));
      }
      writeln("");
      writeln(`Total: ${names.length} files`);
      break;

    case "cat":
      if (args.length === 0) {
        writeln("");
        writeln("Usage: cat <filename>");
        writeln("Try: ls    (to see available files)");
        break;
      }
      const name = args[0];
      if (fileSystem[name]) {
        writeln("");
        fileSystem[name].split("\n").forEach((line) => writeln(line));
      } else {
        writeln("");
        writeln(`cat: ${name}: No such file or directory`);
        writeln("Try: ls    (to see available files)");
      }
      break;

    case "clear":
      utils.clearScreen();
      break;

    case "pwd":
      writeln("");
      writeln(state.cwd);
      break;

    case "about":
      writeln("");
      writeln("ABOUT ME");
      writeln("═".repeat(50));
      writeln("");
      writeln(`Hi! I'm ${neofetchData.name}, a ${neofetchData.title}.`);
      writeln("");
      writeln("I specialize in building scalable backend systems and web");
      writeln("applications. My focus is on clean architecture, performance");
      writeln("optimization, and Linux-first development workflows.");
      writeln("");
      writeln("Currently working with:");
      writeln("   - Go for high-performance backend services");
      writeln("   - TypeScript for modern web applications");
      writeln("   - Docker & K8s for containerization");
      writeln("   - PostgreSQL & Redis for data persistence");
      writeln("");
      writeln(`Based in ${neofetchData.location}`);
      writeln("Graduating October 2025 from STT Mandala Bandung");
      writeln("");
      writeln("When I'm not coding, you'll find me exploring photography,");
      writeln("3D modeling in Blender, or contributing to open source!");
      writeln("");
      writeln('Tip: Type "projects" to see what I\'ve built');
      writeln('Tip: Type "skills" to view my technical skills');
      break;

    case "contact":
      writeln("");
      writeln("CONTACT INFORMATION");
      writeln("═".repeat(50));
      writeln("");
      writeln(`Email:    ${contact.email}`);
      writeln(`Phone:    ${contact.phone}`);
      writeln(`LinkedIn: ${contact.linkedin}`);
      writeln(`GitHub:   ${contact.github}`);
      writeln(`Website:  ${contact.website}`);
      writeln(`Location: ${contact.location}`);
      writeln("");
      writeln("Feel free to reach out for opportunities, collaborations,");
      writeln("or just to chat about tech! Always happy to connect.");
      break;

    case "skills":
      writeln("");
      writeln("TECHNICAL SKILLS");
      writeln("═".repeat(50));
      writeln("");
      writeln("Hard Skills:");
      skills.hard.forEach((s) => writeln(`   - ${s}`));
      writeln("");
      writeln("Soft Skills:");
      skills.soft.forEach((s) => writeln(`   - ${s}`));
      writeln("");
      writeln("Always learning and expanding my skill set!");
      break;

    case "projects":
      if (args.length > 0) {
        const projectKey = args[0].toLowerCase();
        const project = projects[projectKey];
        if (project) {
          writeln("");
          writeln(`${project.name.toUpperCase()}`);
          writeln("═".repeat(50));
          writeln("");
          writeln(`Description: ${project.description}`);
          writeln("");
          writeln("Tech Stack:");
          project.tech.forEach((t) => writeln(`   - ${t}`));
          writeln("");
          writeln("Highlights:");
          project.highlights.forEach((h) => writeln(`   * ${h}`));
          writeln("");
          if (project.github) writeln(`GitHub: ${project.github}`);
          if (project.live) writeln(`Live: ${project.live}`);
        } else {
          writeln("");
          writeln(`Project not found: ${projectKey}`);
          writeln("Available projects: " + Object.keys(projects).join(", "));
        }
      } else {
        writeln("");
        writeln("MY PROJECTS");
        writeln("═".repeat(50));
        writeln("");
        Object.entries(projects).forEach(([key, proj]) => {
          writeln(`${proj.name}`);
          writeln(`   ${proj.description}`);
          writeln(`   Tech: ${proj.tech.join(", ")}`);
          if (proj.github) writeln(`   Link: ${proj.github}`);
          writeln("");
        });
        writeln('Tip: Type "projects <name>" for detailed information');
        writeln("     Example: projects kenshi-picker");
      }
      break;

    case "neofetch":
      writeln("");
      const art = [
        "     ██████╗ ",
        "    ██╔════╝ ",
        "    ██║  ███╗",
        "    ██║   ██║",
        "    ╚██████╔╝",
        "     ╚═════╝ ",
      ];
      const info = [
        `${neofetchData.name}`,
        "─".repeat(neofetchData.name.length),
        `Title: ${neofetchData.title}`,
        `OS: ${neofetchData.os}`,
        `Shell: ${neofetchData.shell}`,
        `Editor: ${neofetchData.editor}`,
        `Location: ${neofetchData.location}`,
        `${neofetchData.uptime}`,
        "",
        `Languages: ${neofetchData.languages.join(", ")}`,
      ];

      const maxLines = Math.max(art.length, info.length);
      for (let i = 0; i < maxLines; i++) {
        const artLine = art[i] || "           ";
        const infoLine = info[i] || "";
        writeln(`  ${artLine}    ${infoLine}`);
      }
      writeln("");
      break;

    case "whoami":
      writeln("");
      writeln(neofetchData.name);
      writeln(neofetchData.title);
      writeln("");
      writeln("A passionate developer who loves clean code, coffee,");
      writeln("and building things that make a difference.");
      break;

    case "history":
      writeln("");
      if (state.history.length === 0) {
        writeln("No command history yet.");
      } else {
        writeln("COMMAND HISTORY");
        writeln("─".repeat(40));
        state.history.forEach((cmd, i) => {
          writeln(`  ${(i + 1).toString().padStart(3)}  ${cmd}`);
        });
        writeln("");
        writeln(`Total: ${state.history.length} commands`);
      }
      break;

    case "download":
      const format = args[0]?.toLowerCase() || "pdf";
      if (format === "pdf") {
        writeln("");
        writeln("Generating PDF resume...");
        setTimeout(() => {
          downloadPDF();
          writeln("Resume downloaded successfully!");
        }, 500);
      } else if (format === "txt") {
        writeln("");
        writeln("Generating TXT resume...");
        setTimeout(() => {
          downloadTXT();
          writeln("Resume downloaded successfully!");
        }, 500);
      } else {
        writeln("");
        writeln("Usage: download [pdf|txt]");
        writeln("Example: download pdf");
      }
      break;

    case "theme":
      const themeArg = args[0]?.toLowerCase();
      if (!themeArg || themeArg === "list") {
        writeln("");
        writeln("AVAILABLE THEMES");
        writeln("═".repeat(50));
        writeln("");
        const themes = listThemes();
        themes.forEach((t) => {
          const current =
            storage.get(STORAGE_KEYS.THEME, "crt") === t.key
              ? " (current)"
              : "";
          writeln(`   - ${t.key.padEnd(12)} - ${t.name}${current}`);
        });
        writeln("");
        writeln("Usage: theme <name>");
        writeln("Example: theme matrix");
      } else {
        const themeName = applyTheme(term, themeArg);
        if (themeName) {
          storage.set(STORAGE_KEYS.THEME, themeArg);
          writeln("");
          writeln(`Theme changed to: ${themeName}`);
          writeln("");
          writeln("Your theme preference has been saved!");
        } else {
          writeln("");
          writeln(`Theme not found: ${themeArg}`);
          writeln('Type "theme list" to see available themes.');
        }
      }
      break;

    case "fortune":
      writeln("");
      writeln(getRandomFortune());
      writeln("");
      break;

    case "date":
      writeln("");
      writeln(new Date().toString());
      break;

    case "echo":
      writeln("");
      writeln(args.join(" "));
      break;

    case "exit":
      writeln("");
      writeln("Thanks for visiting!");
      writeln("");
      writeln("Session statistics:");
      writeln(`   Commands executed: ${commandCount}`);
      writeln(
        `   Time spent: ${Math.floor(Date.now() / 1000 - state.startTime)} seconds`,
      );
      writeln("");
      writeln("Feel free to come back anytime!");
      writeln("");
      writeln("(Refresh the page to start a new session)");
      break;

    default:
      writeln("");
      writeln(`Command not found: ${cmd}`);
      writeln("");
      writeln('Tip: Type "help" for a list of available commands');
      writeln("Tip: Try: about, skills, projects, or contact");
  }

  // Show random tip occasionally
  if (shouldShowTip(commandCount)) {
    writeln("");
    writeln(getRandomTip());
  }
}

function shouldShowTip(count) {
  return count > 3 && count % 7 === 0;
}
