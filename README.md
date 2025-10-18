# Moein Ghaeini - Professional Portfolio

A modern, high-performance portfolio website showcasing expertise in Data Engineering, Machine Learning, and Web Development.

## 🚀 Features

- **Modern Design**: Clean, professional design with dark/light theme support
- **High Performance**: Optimized for Core Web Vitals with perfect scores
- **Responsive**: Mobile-first design that works on all devices
- **PWA Ready**: Progressive Web App with offline capabilities
- **Accessibility**: WCAG 2.1 AA compliant with full keyboard navigation
- **SEO Optimized**: Structured data and meta tags for better search visibility
- **Interactive**: Skills assessment, portfolio filtering, and smooth animations

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with CSS Grid, Flexbox, and CSS Variables
- **Performance**: Service Workers, Resource Hints, Lazy Loading
- **Build Tools**: Clean CSS, Terser, ESLint, Stylelint
- **Testing**: Custom test suite with automated validation

## 📁 Project Structure

```
portfolio/
├── src/                          # Source files
│   ├── assets/                   # Static assets
│   │   ├── images/              # Images and photos
│   │   ├── icons/               # Icon files
│   │   └── fonts/               # Font files
│   ├── components/              # Reusable components
│   ├── styles/                  # CSS files
│   │   └── main.css            # Main stylesheet
│   ├── scripts/                 # JavaScript files
│   │   ├── main.js             # Main application script
│   │   ├── service-worker.js   # PWA service worker
│   │   ├── performance-optimizer.js
│   │   └── advanced-performance.js
│   ├── utils/                   # Utility functions
│   ├── index.html              # Main HTML file
│   └── manifest.json           # PWA manifest
├── public/                      # Built/optimized files
│   ├── css/                    # Minified CSS
│   ├── js/                     # Minified JavaScript
│   └── images/                 # Optimized images
├── tests/                       # Test files
│   ├── test-dashboard.html     # Test dashboard
│   └── test-suite.js           # Test suite
├── docs/                        # Documentation
│   └── TESTING.md              # Testing documentation
├── config/                      # Configuration files
├── package.json                # Dependencies and scripts
└── README.md                   # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm 8+
- Python 3.x (for local development server)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/moeinghaeini/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build optimized production files
- `npm run test` - Run test suite
- `npm run lint` - Lint JavaScript files
- `npm run lint:css` - Lint CSS files
- `npm run serve` - Serve built files
- `npm run deploy` - Deploy to production

## 🎨 Customization

### Colors and Themes

The website uses CSS custom properties for easy theming. Main colors are defined in `src/styles/main.css`:

```css
:root {
    --primary-color: #8B7355;    /* Warm taupe */
    --secondary-color: #D4AF37;  /* Elegant gold */
    --accent-color: #C9A96E;     /* Soft metallic gold */
    --text-color: #2C2C2C;       /* Rich charcoal */
    --bg-color: #FAFAFA;         /* Off-white */
}
```

### Content Updates

1. **Personal Information**: Update `src/index.html` with your details
2. **Portfolio Projects**: Modify the portfolio section in `src/index.html`
3. **Skills**: Update the skills section with your expertise
4. **Contact Information**: Update contact details and social links

## 🧪 Testing

The project includes a comprehensive testing suite:

1. **Quick Test**: Press `Ctrl + Shift + T` on the main page
2. **Test Dashboard**: Open `tests/test-dashboard.html`
3. **URL Parameter**: Add `?test=true` to enable testing mode

### Test Categories

- Core Functionality Tests
- Performance Tests
- Accessibility Tests
- Responsive Design Tests
- Integration Tests
- Animation Tests
- Form Tests
- Navigation Tests
- Content Tests
- PWA Features Tests

## 📊 Performance

The website is optimized for perfect Core Web Vitals scores:

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Performance Features

- Critical CSS inlining
- Resource preloading and prefetching
- Image optimization with WebP/AVIF support
- Lazy loading with Intersection Observer
- Service Worker caching
- Memory optimization
- Network optimization

## ♿ Accessibility

The website follows WCAG 2.1 AA guidelines:

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Focus management

## 📱 PWA Features

- Web App Manifest
- Service Worker with caching strategies
- Offline functionality
- Install prompt
- Push notifications support

## 🔧 Configuration

### Service Worker

Configure caching strategies in `src/scripts/service-worker.js`:

```javascript
const CACHE_STRATEGIES = {
    CACHE_FIRST: 'cache-first',
    NETWORK_FIRST: 'network-first',
    STALE_WHILE_REVALIDATE: 'stale-while-revalidate'
};
```

### Performance Monitoring

Enable performance monitoring in `src/scripts/advanced-performance.js`:

```javascript
const performanceOptimizer = new AdvancedPerformanceOptimizer();
performanceOptimizer.monitorPerformance();
```

## 🚀 Deployment

### GitHub Pages

1. Build the project: `npm run build`
2. Push to GitHub repository
3. Enable GitHub Pages in repository settings
4. Select source branch (usually `main` or `gh-pages`)

### Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `public`
4. Deploy automatically on push

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Moein Ghaeini Hesarooeyeh**
- Email: moeinghaeini@gmail.com
- LinkedIn: [moeinghaeini](https://www.linkedin.com/in/moeinghaeini)
- GitHub: [moeinghaeini](https://github.com/moeinghaeini)
- Portfolio: [moeinghaeini.github.io](https://moeinghaeini.github.io)

## 🙏 Acknowledgments

- [Bootstrap](https://getbootstrap.com/) for responsive components
- [Font Awesome](https://fontawesome.com/) for icons
- [Google Fonts](https://fonts.google.com/) for typography
- [Particles.js](https://vincentgarreau.com/particles.js/) for animations

---

**Built with ❤️ by Moein Ghaeini**
