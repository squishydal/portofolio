# Contributing to Terminal Resume

First off, thank you for considering contributing to Terminal Resume! 🎉

## Code of Conduct

This project follows a simple code of conduct: Be respectful, be professional, and be helpful.

## How Can I Contribute?

### Reporting Bugs 🐛

Before creating bug reports, please check the existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the behavior
- **Expected behavior** vs actual behavior
- **Screenshots** if applicable
- **Environment details** (browser, OS, device)

### Suggesting Enhancements 💡

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Clear title and description** of the enhancement
- **Use case** - why would this be useful?
- **Examples** of how it would work
- **Alternative solutions** you've considered

### Pull Requests 🔧

1. **Fork the repo** and create your branch from `main`
2. **Follow the existing code style**
3. **Test your changes** thoroughly
4. **Update documentation** if needed
5. **Write clear commit messages**

#### Development Setup

```bash
# Clone your fork
git clone https://github.com/yourusername/terminal-resume.git

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

#### Code Style Guidelines

- Use **ES6+ features** (const/let, arrow functions, async/await)
- Keep functions **small and focused**
- Add **comments for complex logic**
- Use **meaningful variable names**
- Follow **existing patterns** in the codebase

#### Commit Message Format

```
type: brief description

Longer description if needed

Fixes #123
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### Adding New Features

#### Adding a New Command

1. Add to `COMMANDS` array in `src/commands/handlers.js`
2. Implement handler in the switch statement
3. Add help text to `commandHelp` in `src/config/resume.js`
4. (Optional) Add autocomplete logic
5. Test thoroughly!

Example:
```javascript
case 'mycommand':
  writeln('');
  writeln('My awesome command output!');
  break;
```

#### Adding a New Theme

1. Add theme to `themes` object in `src/utils/themes.js`
2. Define colors and effects
3. Test in different browsers
4. Update README with theme name

Example:
```javascript
mytheme: {
  name: 'My Theme',
  background: '#000000',
  foreground: '#ffffff',
  cursor: '#ff0000',
  selection: '#333333',
  cursorAccent: '#ffffff',
  bodyBg: '#000000',
  appBg: '#0a0a0a',
  effects: {
    scanlines: true,
    glow: false,
    vignette: true
  }
}
```

### Testing Checklist ✅

Before submitting a PR, test:

- [ ] Desktop browsers (Chrome, Firefox, Safari)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)
- [ ] Keyboard navigation works
- [ ] Tab completion works
- [ ] Command history works
- [ ] Theme switching works
- [ ] Mobile touch/keyboard works
- [ ] No console errors
- [ ] Build succeeds (`npm run build`)

## Project Structure

```
src/
├── commands/       # Command implementations
├── config/         # Data and configuration
├── terminal/       # Terminal setup and I/O
├── utils/          # Helper utilities
├── main.js         # App initialization
└── style.css       # Styles and effects
```

## Questions?

Feel free to:
- Open an issue for discussion
- Reach out via email: mochammadtora@gmail.com
- Check existing issues and PRs

## Recognition

Contributors will be recognized in the README! 🌟

---

Thank you for contributing! Every contribution, no matter how small, is appreciated. 💜
