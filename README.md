# Bongani Xolani Macu - Professional Portfolio

A modern, responsive, and interactive portfolio website built with pure HTML, CSS, and JavaScript.

## 🚀 Features

### Live Weather & Time Detection
- Automatically detects visitor location using browser geolocation
- Fetches real-time weather data using Open-Meteo API (free, no key required)
- Displays local time that updates every second
- Fallback to IP-based location if geolocation is denied

### Dark / Light Mode
- Toggle between dark and light themes
- Preference saved to localStorage
- Smooth transitions across all elements

### Interactive Elements
- **Typing Animation**: Auto-typing role carousel in hero section
- **Animated Skill Bars**: Progress bars animate on scroll
- **Counter Animation**: Stats count up when scrolled into view
- **Parallax Orbs**: Mouse-tracking gradient background
- **Scroll Reveal**: Elements fade in as you scroll
- **Smooth Scrolling**: Click any nav link for smooth scroll

### Sections
1. **Hero** - Name, title, stats, CTA buttons
2. **About** - Professional profile with photo placeholder
3. **Skills** - 4 categories with animated progress bars
4. **Experience** - Timeline with Tech Mahindra & Netcampus
5. **Projects** - 6 project cards with GitHub links
6. **Certifications** - Downloadable certificates section
7. **Education** - TUT & High School details
8. **Contact** - Form + 6 social media links

### Social Media Links
- LinkedIn
- GitHub
- Twitter/X
- Instagram
- Facebook
- WhatsApp (direct message)

### Downloadable Assets
- CV download button (top nav + hero + footer)
- Certificate download links (Azure AI, UiPath, AA, Agile)

## 📁 File Structure

```
portfolio/
├── index.html              # Main HTML file
├── style.css               # All styles (responsive, dark mode)
├── script.js               # All JavaScript functionality
└── assets/
    ├── Bongani_Macu_CV.pdf           # <-- ADD YOUR CV HERE
    └── certificates/
        ├── Azure_AI_Fundamentals.pdf  # <-- ADD CERTIFICATES HERE
        ├── UiPath_Foundation.pdf
        ├── AA_Essentials.pdf
        └── Agile_Scrum.pdf
```

## 🛠️ Setup Instructions

### 1. Add Your CV
- Save your CV as a PDF
- Place it at: `assets/Bongani_Macu_CV.pdf`

### 2. Add Your Certificates
- Save each certificate as a PDF
- Place them in: `assets/certificates/`
- Update the filenames in `index.html` if different

### 3. Add Your Photo (Optional)
- Replace the placeholder in the About section
- Add your image to `assets/images/`
- Update the `<img>` tag in `index.html`

### 4. Update Links
Replace all placeholder URLs in `index.html`:
- `linkedin.com/in/bongani-macu` → Your real LinkedIn
- `github.com/bongani-macu` → Your real GitHub
- `twitter.com/bongani_macu` → Your real Twitter/X
- `instagram.com/bongani.macu` → Your real Instagram
- `facebook.com/bongani.macu` → Your real Facebook
- All GitHub repo links → Your actual repos

### 5. Deploy to GitHub Pages
1. Create a new GitHub repository (e.g., `bongani-macu`)
2. Upload all files to the repository
3. Go to Settings → Pages
4. Select "Deploy from a branch" → "main" → "/ (root)"
5. Your site will be live at `https://yourusername.github.io/repo-name/`

### 6. Custom Domain (Optional)
- Add a CNAME file with your custom domain
- Configure DNS settings with your domain provider
- Update the portfolio URL in your CV and social profiles

## 🎨 Customization

### Colors
Edit CSS variables in `style.css`:
```css
:root {
    --primary: #1B3A5C;      /* Main brand color */
    --accent: #3B82F6;       /* Accent color */
    --success: #10B981;      /* Success green */
}
```

### Content
All content is in `index.html`. Simply edit the text between tags.

### Projects
Update the Projects section with your actual GitHub repos and descriptions.

## 📱 Responsive Breakpoints
- Desktop: > 1024px
- Tablet: 768px - 1024px
- Mobile: < 768px
- Small Mobile: < 480px

## 🌐 Browser Support
- Chrome / Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License
This portfolio template is free to use for personal and professional purposes.

---
Built with ❤️ by Bongani Xolani Macu
