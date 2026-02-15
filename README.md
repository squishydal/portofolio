# 🖥️ Terminal Resume

An interactive, feature-rich terminal-style resume built with modern web technologies. This project showcases my skills and experience in a unique, engaging way that developers and tech enthusiasts will appreciate.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://tora.is-a.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

![Terminal Resume Preview](preview.png)

## ✨ Features

### 🎯 Core Functionality

- **15+ Interactive Commands** - Explore my resume through familiar terminal commands
- **Tab Completion** - Smart autocomplete for commands, files, and arguments
- **Command History** - Navigate previous commands with ↑/↓ arrows
- **Persistent Storage** - Command history and preferences saved locally
- **Mobile Optimized** - Full touch support with virtual keyboard

### 🎨 Visual Features

- **6 Themes** - CRT (default), Matrix, Hacker, Light, Dracula, and Nord
- **CRT Effects** - Authentic terminal feel with scanlines and glow
- **Smooth Animations** - Typing effects and transitions
- **Responsive Design** - Works flawlessly on all screen sizes

### ♿ Accessibility

- **Screen Reader Support** - ARIA labels and live regions
- **Keyboard Navigation** - Full keyboard accessibility
- **High Contrast Mode** - Respects system preferences
- **Reduced Motion** - Honors prefers-reduced-motion

### 🚀 Advanced Features

- **Download Resume** - Export as PDF or TXT
- **Neofetch Display** - Nerdy system info showcase
- **Easter Eggs** - Hidden surprises throughout
- **PWA Support** - Install as a standalone app
- **Offline Mode** - Works without internet connection
- **SEO Optimized** - Full meta tags and Open Graph support

## 📂 Project Structure

```
terminal-resume/
├── public/
│   ├── manifest.json         # PWA manifest
│   ├── sw.js                 # Service worker for offline support
│   └── [icons/screenshots]   # App icons and previews
├── src/
│   ├── commands/
│   │   ├── handlers.js       # All command implementations
│   │   └── autocomplete.js   # Tab completion logic
│   ├── config/
│   │   └── resume.js         # Resume data, file system, content
│   ├── terminal/
│   │   ├── setup.js          # Terminal initialization
│   │   └── inputHandler.js   # Keyboard/touch event handling
│   ├── utils/
│   │   ├── storage.js        # LocalStorage utilities
│   │   ├── themes.js         # Theme management
│   │   ├── download.js       # PDF/TXT export
│   │   └── onboarding.js     # First-time user experience
│   ├── main.js               # Application entry point
│   └── style.css             # Global styles & effects
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## 🛠️ Tech Stack

- **Build Tool**: Vite 5
- **Terminal**: xterm.js + xterm-addon-fit
- **PDF Generation**: jsPDF
- **Storage**: LocalStorage API
- **Styling**: Pure CSS with custom effects
- **Deployment**: GitHub Pages

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/terminal-resume.git
cd terminal-resume
```

2. **Install dependencies**

```bash
npm install
```

3. **Start development server**

```bash
npm run dev
```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The optimized files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 📦 Deployment to GitHub Pages

1. **Update configuration**

Edit `vite.config.js` - change `base` to your repository name:

```javascript
base: "/your-repo-name/";
```

2. **Update personal information**

Edit `src/config/resume.js` with your:

- Resume content
- Contact details
- Projects
- Skills
- Social links

3. **Update meta tags**

Edit `index.html` with your:

- Site title and description
- Open Graph image URL
- Social media URLs

4. **Deploy**

```bash
npm run deploy
```

5. **Enable GitHub Pages**

- Go to repository **Settings** → **Pages**
- Source: **Deploy from branch**
- Branch: **gh-pages** / root
- Save

Your site will be live at: `https://yourusername.github.io/your-repo-name/`

## 📖 Available Commands

| Command               | Description                              |
| --------------------- | ---------------------------------------- |
| `help [command]`      | Show available commands or detailed help |
| `ls`                  | List files                               |
| `cat <file>`          | Display file contents                    |
| `about`               | Learn about me                           |
| `contact`             | View contact information                 |
| `skills`              | List technical and soft skills           |
| `projects [name]`     | View projects (optionally specify one)   |
| `neofetch`            | Display system information               |
| `whoami`              | Show current user info                   |
| `history`             | View command history                     |
| `download [pdf\|txt]` | Download resume                          |
| `theme [name\|list]`  | Change or list themes                    |
| `fortune`             | Random developer wisdom                  |
| `date`                | Show current date/time                   |
| `echo <text>`         | Print text                               |
| `pwd`                 | Print working directory                  |
| `clear`               | Clear terminal screen                    |
| `exit`                | End session (shows stats)                |

### Keyboard Shortcuts

- `Tab` - Autocomplete commands and filenames
- `↑` / `↓` - Navigate command history
- `Ctrl+C` - Cancel current input
- `Ctrl+L` - Clear screen (alternative to `clear`)

## 🎨 Themes

Switch between themes using the `theme` command:

```bash
theme matrix    # Green Matrix-style
theme hacker    # Green on black hacker aesthetic
theme light     # Light mode for daytime
theme dracula   # Popular Dracula theme
theme nord      # Nordic-inspired palette
theme crt       # Default CRT theme
```

Themes are automatically saved and restored on your next visit!

## 🎭 Easter Eggs

Try these commands for fun surprises:

- `sudo`, `rm -rf /`, `hack`
- `matrix`, `portal`, `coffee`, `beer`
- `vim`, `emacs`, `fortune`

...and there are more hidden throughout! 🥚

## 🔧 Customization Guide

### Adding New Commands

1. Add command to `COMMANDS` array in `src/commands/handlers.js`
2. Add handler in the `switch` statement
3. (Optional) Add help text to `commandHelp` in `src/config/resume.js`
4. (Optional) Add autocomplete logic in `src/commands/autocomplete.js`

### Adding New Themes

1. Add theme object to `themes` in `src/utils/themes.js`
2. Define colors and effects
3. Theme will automatically appear in `theme list`

### Modifying Resume Content

Edit `src/config/resume.js`:

- `resumeText` - Main resume content
- `neofetchData` - Personal info for neofetch
- `contact` - Contact details
- `skills` - Technical and soft skills
- `projects` - Project showcase
- `fileSystem` - Virtual file system content

## 🌐 Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📊 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint**: <1s
- **Time to Interactive**: <1.5s
- **Bundle Size**: <200KB (gzipped)

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [xterm.js](https://xtermjs.org/) - Amazing terminal emulator
- [Vite](https://vitejs.dev/) - Lightning-fast build tool
- Inspired by terminal-style portfolios across the web

## 📞 Contact

**Tora Sifa**

- Email: mochammadtora@gmail.com
- LinkedIn: [linkedin.com/in/tora-sifa](https://linkedin.com/in/tora-sifa)
- GitHub: [github.com/squishydal](https://github.com/squishydal)

---

<div align="center">
  <strong>Built with ❤️ and ☕ by Tora Sifa</strong>
  <br>
  <sub>If you found this useful, consider giving it a ⭐!</sub>
</div>
