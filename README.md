# 🚀 Enhanced Portfolio Website

A professional, feature-rich Bootstrap website with modern web technologies, PWA capabilities, and advanced user experience features.

## ✨ Features

### 🎨 **Design & UI**
- **Responsive Design**: Mobile-first Bootstrap 5 implementation
- **Dark/Light Mode**: Toggle between themes with persistent storage
- **Modern Animations**: Smooth transitions, hover effects, and scroll animations
- **Particle Background**: Interactive particle system in hero section
- **Gradient Themes**: Beautiful purple gradient color scheme

### 📱 **Progressive Web App (PWA)**
- **Service Worker**: Offline functionality and caching
- **App Manifest**: Installable on mobile devices
- **Install Prompt**: Native app-like installation experience
- **Offline Support**: Works without internet connection

### 🎯 **Enhanced User Experience**
- **Scroll Progress Bar**: Visual progress indicator
- **Smooth Scrolling**: Seamless navigation between sections
- **Lazy Loading**: Optimized content loading
- **Loading States**: Skeleton screens and loading animations
- **Counter Animations**: Animated statistics in hero section
- **Floating Elements**: Interactive tech icons around profile

### 📧 **Contact Form**
- **EmailJS Integration**: Real email sending capability
- **Form Validation**: Client-side validation with error handling
- **Loading States**: Visual feedback during form submission
- **Success/Error Messages**: User-friendly notifications

### 🔍 **SEO & Performance**
- **Meta Tags**: Complete SEO optimization
- **Open Graph**: Social media sharing optimization
- **Twitter Cards**: Enhanced Twitter sharing
- **Performance Optimized**: Debounced scroll events, efficient animations
- **Accessibility**: ARIA labels and keyboard navigation

### 📊 **Sections**
- **Hero Section**: Animated profile with floating tech icons
- **Portfolio**: Project showcase with hover effects
- **Resume**: Timeline experience + animated skills
- **Testimonials**: Client reviews with star ratings
- **Blog**: Sample blog posts with modern cards
- **Miscellaneous**: Languages, hobbies, achievements
- **Contact**: Working form with EmailJS integration

## 📁 Files Structure

```
resume/
├── index.html          # Main HTML file with all sections
├── styles.css          # Enhanced CSS with dark mode & animations
├── script.js           # Advanced JavaScript functionality
├── sw.js              # Service Worker for PWA
├── manifest.json      # PWA manifest file
└── README.md          # This documentation
```

## Customization Guide

### 1. Personal Information
Update the following in `index.html`:
- Replace "Your Name" with your actual name
- Update email, phone, and location in contact section
- Modify social media links in footer

### 2. Portfolio Projects
In the portfolio section, update:
- Project titles and descriptions
- Technology badges
- Project links
- Add/remove project cards as needed

### 3. Resume Content
Update the resume section:
- Work experience timeline
- Skills and proficiency levels
- Certifications
- Education (add if needed)

### 4. Blog Posts
Customize blog section:
- Post titles and descriptions
- Publication dates
- Add real blog post links
- Create actual blog posts

### 5. Styling
Modify `styles.css` to:
- Change color scheme (update gradient colors)
- Adjust fonts and typography
- Modify spacing and layout
- Add custom animations

### 6. Functionality
Update `script.js` to:
- Modify form submission handling
- Add new interactive features
- Customize animations
- Integrate with backend services

## Color Scheme

The website uses a purple gradient theme:
- Primary: `#667eea` to `#764ba2`
- You can change these colors in the CSS file

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Getting Started

1. Open `index.html` in your web browser
2. Customize the content as needed
3. Deploy to your preferred hosting service

## Deployment Options

- **GitHub Pages**: Free hosting for static sites
- **Netlify**: Easy deployment with form handling
- **Vercel**: Fast deployment with custom domains
- **Traditional Web Hosting**: Upload files via FTP

## Form Handling

The contact form currently shows a success message. To make it functional:

1. **Netlify Forms**: Add `netlify` attribute to form tag
2. **Formspree**: Replace form action with Formspree endpoint
3. **Custom Backend**: Implement server-side form processing
4. **EmailJS**: Use EmailJS for client-side email sending

## Performance Tips

- Optimize images before adding them
- Use WebP format for better compression
- Minimize custom CSS and JS if needed
- Enable gzip compression on your server

## License

This project is open source and available under the MIT License.

## Support

For questions or issues, please create an issue in the repository or contact the developer.
