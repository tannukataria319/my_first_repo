# John Doe — Developer Portfolio

Premium professional portfolio website built with **HTML5**, **CSS3**, and **JavaScript (ES6+)**.

## 🚀 Quick Start

Open `index.html` in any browser, or start a local server:

```powershell
cd portfolio-website
python -m http.server 3000
# Visit http://localhost:3000
```

## ✅ Features

| Feature | Status |
|---|---|
| Sticky navbar with scroll effects | ✅ Working |
| Mobile hamburger menu | ✅ Working |
| Smooth scrolling navigation | ✅ Working |
| Active link scroll spy | ✅ Working |
| Hero particle canvas animation | ✅ Working |
| Scroll reveal animations | ✅ Working |
| Back-to-top button | ✅ Working |
| Skills cards (8 technologies) | ✅ Working |
| Project cards with Live Demo & Source Code links | ✅ Working |
| Contact form with full validation | ✅ Working |
| mailto: integration (opens real email client) | ✅ Working |
| Social links (GitHub, LinkedIn, Instagram) | ✅ Working |
| Responsive design (mobile/tablet/desktop) | ✅ Working |
| Dynamic copyright year | ✅ Working |
| Resume download button (with setup instructions) | ✅ Working |

## 📝 Customization Guide

### To personalize this portfolio:

1. **Name & Bio**: Edit the hero section in `index.html`
2. **Profile Photo**: Replace the SVG placeholder in the `.avatar-container` with your `<img>` tag
3. **Resume**: Add your PDF to the folder and update the `resumeBtn` handler in `script.js`
4. **Projects**: Update the three project cards with your real project details and GitHub/demo URLs
5. **Social Links**: Replace `https://github.com` etc. with your actual profile URLs
6. **Contact Email**: Change `johndoe@example.com` in both `index.html` and `script.js`
7. **Colors**: All theme colors are in CSS variables at the top of `style.css`

### Contact Form

The form uses **mailto:** to compose a real email in the user's default email client. No fake success messages. To connect a backend service:

1. Sign up for [Formspree](https://formspree.io) or [EmailJS](https://emailjs.com)
2. Replace the mailto logic in `script.js` with the service's API endpoint
3. Update the success message text accordingly

## 📁 Files

- `index.html` — Semantic HTML5 structure
- `style.css` — CSS custom properties, glass effects, responsive design
- `script.js` — Form validation, Intersection Observer, canvas animation
