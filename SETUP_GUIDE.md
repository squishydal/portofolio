# Quick Setup Guide

This guide will help you customize and deploy your terminal resume in under 10 minutes! ⚡

## Step 1: Personal Information (2 minutes) ✏️

Edit `src/config/resume.js`:

### Update Basic Info
```javascript
export const neofetchData = {
  name: "Your Name",              // ← Change this
  title: "Your Job Title",        // ← Change this
  os: "Your Preferred OS",        // ← Change this
  location: "Your City, Country", // ← Change this
  // ... etc
};
```

### Update Contact Info
```javascript
export const contact = {
  email: 'your.email@example.com',           // ← Change
  phone: '+XX XXX XXXX XXXX',                 // ← Change
  linkedin: 'linkedin.com/in/your-username',  // ← Change
  github: 'github.com/your-username',         // ← Change
  website: 'your-website.com',                // ← Change
  location: 'Your City, Country'              // ← Change
};
```

### Update Resume Content
```javascript
export const resumeText = `
WORK EXPERIENCE
// Paste your work experience here

EDUCATION
// Paste your education here

// ... etc
`;
```

## Step 2: Projects & Skills (2 minutes) 🚀

### Add Your Projects
```javascript
export const projects = {
  'project-key': {
    name: 'Project Name',
    description: 'Short description',
    tech: ['Tech1', 'Tech2', 'Tech3'],
    highlights: [
      'Key achievement 1',
      'Key achievement 2'
    ],
    github: 'github.com/username/repo',  // Optional
    live: 'your-demo.com'                 // Optional
  },
  // Add more projects...
};
```

### Update Skills
```javascript
export const skills = {
  hard: [
    'Skill 1',
    'Skill 2',
    // Add your skills
  ],
  soft: [
    'Skill 1',
    'Skill 2',
    // Add your skills
  ]
};
```

## Step 3: SEO & Meta Tags (1 minute) 🌐

Edit `index.html`:

```html
<!-- Update these -->
<title>Your Name - Interactive Terminal Resume</title>
<meta name="description" content="Your professional description" />

<!-- Update URLs (after deployment) -->
<meta property="og:url" content="https://yourusername.github.io/terminal-resume/" />
<meta property="og:image" content="https://yourusername.github.io/terminal-resume/preview.png" />
```

## Step 4: Configuration (1 minute) ⚙️

### Update Repository Name
Edit `vite.config.js`:
```javascript
export default defineConfig({
  base: '/your-repo-name/', // ← Change to your GitHub repo name
});
```

### Update Package Info
Edit `package.json`:
```json
{
  "name": "your-username-terminal-resume",
  "description": "Your description"
}
```

## Step 5: Test Locally (1 minute) 🧪

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Open http://localhost:5173
# Test all commands:
# - help
# - about
# - skills
# - projects
# - contact
# - download pdf
# - theme matrix
```

## Step 6: Deploy to GitHub Pages (3 minutes) 🚀

### Method 1: Automated with GitHub Actions (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Enable GitHub Pages**
   - Go to your repo **Settings** → **Pages**
   - Source: **GitHub Actions**
   - Save

3. **Done!** 
   - Workflow runs automatically on push
   - Site will be live at `https://yourusername.github.io/your-repo-name/`

### Method 2: Manual Deployment

```bash
# Build and deploy
npm run deploy
```

Then enable GitHub Pages:
- Settings → Pages
- Source: Deploy from branch
- Branch: `gh-pages` / root

## Step 7: Optional Enhancements 🎨

### Add Custom Favicon
1. Create `public/favicon.svg`
2. Favicon automatically loads

### Add Preview Image
1. Take screenshot of your terminal
2. Save as `public/preview.png` (1200x630px recommended)
3. Update meta tags in `index.html`

### Add Custom Theme
1. Edit `src/utils/themes.js`
2. Add your theme to the `themes` object
3. Test with `theme your-theme-name`

### Add Easter Eggs
Edit `src/config/resume.js`:
```javascript
export const easterEggs = {
  'your-command': 'Your fun response!',
  // Add more...
};
```

## Troubleshooting 🔧

### Build fails
```bash
# Clear cache and reinstall
rm -rf node_modules dist
npm install
npm run build
```

### 404 on GitHub Pages
- Check `base` in `vite.config.js` matches repo name
- Wait 5-10 minutes for GitHub Pages to update
- Clear browser cache

### Theme not persisting
- Check browser localStorage is enabled
- Open DevTools → Application → Local Storage

### Mobile keyboard not showing
- Tap anywhere on the terminal
- Ensure you're on HTTPS (required for some mobile keyboards)

## Quick Customization Checklist ✅

- [ ] Updated name, title, location
- [ ] Updated all contact information
- [ ] Added full resume content
- [ ] Added 2-3 projects minimum
- [ ] Listed all relevant skills
- [ ] Updated meta tags and SEO
- [ ] Changed vite.config.js base URL
- [ ] Tested locally with `npm run dev`
- [ ] Pushed to GitHub
- [ ] Enabled GitHub Pages
- [ ] Verified live site works

## Need Help? 💬

- Check the main [README.md](README.md) for detailed documentation
- See [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines
- Open an issue on GitHub
- Email: mochammadtora@gmail.com

---

**Time to deploy: ~10 minutes** ⏱️

Good luck with your terminal resume! 🚀
