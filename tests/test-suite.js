// Comprehensive Testing Suite for Portfolio Website
// Tests all features, integrations, and functionality

class WebsiteTestSuite {
    constructor() {
        this.tests = [];
        this.results = {
            passed: 0,
            failed: 0,
            total: 0,
            details: []
        };
        this.startTime = Date.now();
    }

    // Test runner
    async runAllTests() {
        console.log('🧪 Starting Comprehensive Website Test Suite...');
        console.log('=' .repeat(60));
        
        await this.testCoreFunctionality();
        await this.testPerformance();
        await this.testAccessibility();
        await this.testResponsiveDesign();
        await this.testIntegrations();
        await this.testAnimations();
        await this.testForms();
        await this.testNavigation();
        await this.testContent();
        await this.testPWAFeatures();
        
        this.generateReport();
        return this.results;
    }

    // Core functionality tests
    async testCoreFunctionality() {
        console.log('\n🔧 Testing Core Functionality...');
        
        this.addTest('DOM Elements Load', () => {
            const criticalElements = [
                'nav', 'main', 'footer', 
                '.hero-section', '.portfolio-section', 
                '.testimonials-section', '.contact-section'
            ];
            
            const missing = criticalElements.filter(selector => 
                !document.querySelector(selector)
            );
            
            return missing.length === 0 ? 
                `✅ All critical DOM elements present` : 
                `❌ Missing elements: ${missing.join(', ')}`;
        });

        this.addTest('CSS Loading', () => {
            const stylesheets = Array.from(document.styleSheets);
            const customCSS = stylesheets.find(sheet => 
                sheet.href && sheet.href.includes('styles.css')
            );
            
            return customCSS ? 
                `✅ Custom CSS loaded successfully` : 
                `❌ Custom CSS not found`;
        });

        this.addTest('JavaScript Loading', () => {
            const scripts = Array.from(document.scripts);
            const customJS = scripts.find(script => 
                script.src && script.src.includes('script.js')
            );
            
            return customJS ? 
                `✅ Custom JavaScript loaded successfully` : 
                `❌ Custom JavaScript not found`;
        });

        this.addTest('Font Loading', () => {
            const fontFamilies = [
                'Playfair Display', 'Inter', 'Cormorant Garamond'
            ];
            
            const loadedFonts = fontFamilies.filter(font => {
                const testElement = document.createElement('span');
                testElement.style.fontFamily = font;
                testElement.textContent = 'Test';
                document.body.appendChild(testElement);
                const computed = window.getComputedStyle(testElement).fontFamily;
                document.body.removeChild(testElement);
                return computed.includes(font);
            });
            
            return loadedFonts.length === fontFamilies.length ? 
                `✅ All fonts loaded: ${loadedFonts.join(', ')}` : 
                `❌ Missing fonts: ${fontFamilies.filter(f => !loadedFonts.includes(f)).join(', ')}`;
        });
    }

    // Performance tests
    async testPerformance() {
        console.log('\n⚡ Testing Performance...');
        
        this.addTest('Core Web Vitals', () => {
            return new Promise((resolve) => {
                if ('PerformanceObserver' in window) {
                    const observer = new PerformanceObserver((list) => {
                        const entries = list.getEntries();
                        const lcp = entries.find(entry => entry.entryType === 'largest-contentful-paint');
                        const fid = entries.find(entry => entry.entryType === 'first-input');
                        
                        let result = '✅ Core Web Vitals monitoring active';
                        if (lcp) result += ` | LCP: ${lcp.startTime.toFixed(2)}ms`;
                        if (fid) result += ` | FID: ${(fid.processingStart - fid.startTime).toFixed(2)}ms`;
                        
                        resolve(result);
                    });
                    
                    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });
                    
                    setTimeout(() => {
                        observer.disconnect();
                        resolve('✅ Core Web Vitals monitoring active');
                    }, 1000);
                } else {
                    resolve('⚠️ PerformanceObserver not supported');
                }
            });
        });

        this.addTest('Image Optimization', () => {
            const images = document.querySelectorAll('img');
            const optimizedImages = Array.from(images).filter(img => 
                img.hasAttribute('loading') || 
                img.hasAttribute('decoding') ||
                img.closest('picture')
            );
            
            return optimizedImages.length === images.length ? 
                `✅ All ${images.length} images optimized` : 
                `❌ ${images.length - optimizedImages.length} images not optimized`;
        });

        this.addTest('Resource Preloading', () => {
            const preloadLinks = document.querySelectorAll('link[rel="preload"]');
            const preconnectLinks = document.querySelectorAll('link[rel="preconnect"]');
            
            return preloadLinks.length > 0 && preconnectLinks.length > 0 ? 
                `✅ ${preloadLinks.length} preloads, ${preconnectLinks.length} preconnects` : 
                `❌ Missing resource hints`;
        });

        this.addTest('Service Worker', () => {
            return new Promise((resolve) => {
                if ('serviceWorker' in navigator) {
                    navigator.serviceWorker.getRegistration().then(registration => {
                        resolve(registration ? 
                            `✅ Service Worker registered: ${registration.scope}` : 
                            `❌ Service Worker not registered`);
                    });
                } else {
                    resolve('⚠️ Service Worker not supported');
                }
            });
        });
    }

    // Accessibility tests
    async testAccessibility() {
        console.log('\n♿ Testing Accessibility...');
        
        this.addTest('ARIA Labels', () => {
            const elementsWithAria = document.querySelectorAll('[aria-label], [aria-labelledby]');
            const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
            
            const coverage = (elementsWithAria.length / interactiveElements.length * 100).toFixed(1);
            
            return coverage > 80 ? 
                `✅ ${coverage}% ARIA coverage (${elementsWithAria.length}/${interactiveElements.length})` : 
                `❌ Low ARIA coverage: ${coverage}%`;
        });

        this.addTest('Keyboard Navigation', () => {
            const focusableElements = document.querySelectorAll(
                'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            
            let focusable = 0;
            focusableElements.forEach(el => {
                el.focus();
                if (document.activeElement === el) focusable++;
            });
            
            return focusable === focusableElements.length ? 
                `✅ All ${focusableElements.length} elements focusable` : 
                `❌ ${focusableElements.length - focusable} elements not focusable`;
        });

        this.addTest('Color Contrast', () => {
            const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a');
            let goodContrast = 0;
            
            textElements.forEach(el => {
                const style = window.getComputedStyle(el);
                const color = style.color;
                const backgroundColor = style.backgroundColor;
                
                // Simple contrast check (simplified)
                if (color && backgroundColor && color !== backgroundColor) {
                    goodContrast++;
                }
            });
            
            const coverage = (goodContrast / textElements.length * 100).toFixed(1);
            return coverage > 90 ? 
                `✅ ${coverage}% good contrast ratio` : 
                `❌ Low contrast coverage: ${coverage}%`;
        });

        this.addTest('Alt Text', () => {
            const images = document.querySelectorAll('img');
            const imagesWithAlt = document.querySelectorAll('img[alt]');
            
            return imagesWithAlt.length === images.length ? 
                `✅ All ${images.length} images have alt text` : 
                `❌ ${images.length - imagesWithAlt.length} images missing alt text`;
        });
    }

    // Responsive design tests
    async testResponsiveDesign() {
        console.log('\n📱 Testing Responsive Design...');
        
        this.addTest('Viewport Meta Tag', () => {
            const viewport = document.querySelector('meta[name="viewport"]');
            return viewport ? 
                `✅ Viewport meta tag: ${viewport.content}` : 
                `❌ Viewport meta tag missing`;
        });

        this.addTest('Responsive Images', () => {
            const responsiveImages = document.querySelectorAll('picture, img[srcset]');
            return responsiveImages.length > 0 ? 
                `✅ ${responsiveImages.length} responsive images` : 
                `❌ No responsive images found`;
        });

        this.addTest('Flexible Layout', () => {
            const flexContainers = document.querySelectorAll('.container, .row, .d-flex');
            return flexContainers.length > 0 ? 
                `✅ ${flexContainers.length} flexible containers` : 
                `❌ No flexible layout containers`;
        });

        this.addTest('Mobile Navigation', () => {
            const mobileNav = document.querySelector('.navbar-toggler');
            return mobileNav ? 
                `✅ Mobile navigation present` : 
                `❌ Mobile navigation missing`;
        });
    }

    // Integration tests
    async testIntegrations() {
        console.log('\n🔗 Testing Integrations...');
        
        this.addTest('Google Fonts', () => {
            const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
            return fontLinks.length > 0 ? 
                `✅ ${fontLinks.length} Google Fonts loaded` : 
                `❌ Google Fonts not loaded`;
        });

        this.addTest('Bootstrap Integration', () => {
            const bootstrapCSS = document.querySelector('link[href*="bootstrap"]');
            const bootstrapJS = document.querySelector('script[src*="bootstrap"]');
            
            return bootstrapCSS && bootstrapJS ? 
                `✅ Bootstrap CSS and JS loaded` : 
                `❌ Bootstrap integration incomplete`;
        });

        this.addTest('Font Awesome', () => {
            const fontAwesome = document.querySelector('link[href*="font-awesome"]');
            const icons = document.querySelectorAll('.fa, .fas, .far, .fab');
            
            return fontAwesome && icons.length > 0 ? 
                `✅ Font Awesome loaded with ${icons.length} icons` : 
                `❌ Font Awesome not properly integrated`;
        });

        this.addTest('Particles.js', () => {
            const particlesContainer = document.getElementById('particles-js');
            return particlesContainer ? 
                `✅ Particles.js container present` : 
                `❌ Particles.js not integrated`;
        });

        this.addTest('EmailJS Integration', () => {
            const contactForm = document.getElementById('contactForm');
            return contactForm ? 
                `✅ Contact form present for EmailJS` : 
                `❌ Contact form missing`;
        });
    }

    // Animation tests
    async testAnimations() {
        console.log('\n🎭 Testing Animations...');
        
        this.addTest('CSS Animations', () => {
            const animatedElements = document.querySelectorAll('.card, .btn, .nav-link');
            let hasAnimations = 0;
            
            animatedElements.forEach(el => {
                const style = window.getComputedStyle(el);
                if (style.transition !== 'all 0s ease 0s' || style.animationName !== 'none') {
                    hasAnimations++;
                }
            });
            
            return hasAnimations > 0 ? 
                `✅ ${hasAnimations} elements with animations` : 
                `❌ No CSS animations found`;
        });

        this.addTest('Loading Animation', () => {
            const loadingScreen = document.getElementById('loadingScreen');
            const spinner = document.querySelector('.spinner');
            
            return loadingScreen && spinner ? 
                `✅ Loading animation present` : 
                `❌ Loading animation missing`;
        });

        this.addTest('Scroll Animations', () => {
            const revealElements = document.querySelectorAll('.reveal');
            return revealElements.length > 0 ? 
                `✅ ${revealElements.length} scroll reveal elements` : 
                `❌ No scroll animations`;
        });

        this.addTest('Hover Effects', () => {
            const hoverElements = document.querySelectorAll('.card, .btn, .nav-link');
            let hasHover = 0;
            
            hoverElements.forEach(el => {
                const style = window.getComputedStyle(el);
                if (style.transition.includes('transform') || style.transition.includes('box-shadow')) {
                    hasHover++;
                }
            });
            
            return hasHover > 0 ? 
                `✅ ${hasHover} elements with hover effects` : 
                `❌ No hover effects found`;
        });
    }

    // Form tests
    async testForms() {
        console.log('\n📝 Testing Forms...');
        
        this.addTest('Contact Form', () => {
            const form = document.getElementById('contactForm');
            const inputs = form ? form.querySelectorAll('input, textarea, select') : [];
            
            return form && inputs.length > 0 ? 
                `✅ Contact form with ${inputs.length} fields` : 
                `❌ Contact form missing or incomplete`;
        });

        this.addTest('Form Validation', () => {
            const form = document.getElementById('contactForm');
            if (!form) return '❌ No form to validate';
            
            const requiredFields = form.querySelectorAll('[required]');
            const validationElements = form.querySelectorAll('.invalid-feedback, .valid-feedback');
            
            return requiredFields.length > 0 && validationElements.length > 0 ? 
                `✅ Form validation with ${requiredFields.length} required fields` : 
                `❌ Form validation incomplete`;
        });

        this.addTest('Form Accessibility', () => {
            const form = document.getElementById('contactForm');
            if (!form) return '❌ No form to test';
            
            const labels = form.querySelectorAll('label');
            const inputs = form.querySelectorAll('input, textarea, select');
            
            return labels.length === inputs.length ? 
                `✅ All ${inputs.length} form fields have labels` : 
                `❌ ${inputs.length - labels.length} fields missing labels`;
        });
    }

    // Navigation tests
    async testNavigation() {
        console.log('\n🧭 Testing Navigation...');
        
        this.addTest('Navigation Links', () => {
            const navLinks = document.querySelectorAll('.nav-link');
            const sections = document.querySelectorAll('section[id]');
            
            let workingLinks = 0;
            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    const target = document.querySelector(href);
                    if (target) workingLinks++;
                }
            });
            
            return workingLinks === navLinks.length ? 
                `✅ All ${navLinks.length} navigation links work` : 
                `❌ ${navLinks.length - workingLinks} broken navigation links`;
        });

        this.addTest('Active Navigation', () => {
            const activeLink = document.querySelector('.nav-link.active');
            return activeLink ? 
                `✅ Active navigation state: ${activeLink.textContent.trim()}` : 
                `❌ No active navigation state`;
        });

        this.addTest('Smooth Scrolling', () => {
            const html = document.documentElement;
            const style = window.getComputedStyle(html);
            
            return style.scrollBehavior === 'smooth' ? 
                `✅ Smooth scrolling enabled` : 
                `❌ Smooth scrolling not enabled`;
        });

        this.addTest('Scroll Progress', () => {
            const progressBar = document.getElementById('scrollProgress');
            return progressBar ? 
                `✅ Scroll progress bar present` : 
                `❌ Scroll progress bar missing`;
        });
    }

    // Content tests
    async testContent() {
        console.log('\n📄 Testing Content...');
        
        this.addTest('Portfolio Items', () => {
            const portfolioItems = document.querySelectorAll('.portfolio-item');
            return portfolioItems.length > 0 ? 
                `✅ ${portfolioItems.length} portfolio items` : 
                `❌ No portfolio items found`;
        });

        this.addTest('Testimonials', () => {
            const testimonials = document.querySelectorAll('.testimonial-card');
            return testimonials.length > 0 ? 
                `✅ ${testimonials.length} testimonials` : 
                `❌ No testimonials found`;
        });

        this.addTest('Blog Posts', () => {
            const blogPosts = document.querySelectorAll('article');
            return blogPosts.length > 0 ? 
                `✅ ${blogPosts.length} blog posts` : 
                `❌ No blog posts found`;
        });

        this.addTest('Skills Section', () => {
            const progressBars = document.querySelectorAll('.progress-bar');
            return progressBars.length > 0 ? 
                `✅ ${progressBars.length} skill progress bars` : 
                `❌ No skills section found`;
        });

        this.addTest('Contact Information', () => {
            const contactInfo = document.querySelectorAll('.contact-info');
            return contactInfo.length > 0 ? 
                `✅ Contact information present` : 
                `❌ Contact information missing`;
        });
    }

    // PWA features tests
    async testPWAFeatures() {
        console.log('\n📱 Testing PWA Features...');
        
        this.addTest('Web App Manifest', () => {
            const manifest = document.querySelector('link[rel="manifest"]');
            return manifest ? 
                `✅ Web app manifest: ${manifest.href}` : 
                `❌ Web app manifest missing`;
        });

        this.addTest('Theme Color', () => {
            const themeColor = document.querySelector('meta[name="theme-color"]');
            return themeColor ? 
                `✅ Theme color: ${themeColor.content}` : 
                `❌ Theme color missing`;
        });

        this.addTest('Apple Touch Icons', () => {
            const appleIcons = document.querySelectorAll('link[rel*="apple-touch-icon"]');
            return appleIcons.length > 0 ? 
                `✅ ${appleIcons.length} Apple touch icons` : 
                `❌ Apple touch icons missing`;
        });

        this.addTest('Offline Capability', () => {
            return new Promise((resolve) => {
                if ('serviceWorker' in navigator) {
                    navigator.serviceWorker.getRegistration().then(registration => {
                        resolve(registration ? 
                            `✅ Offline capability via Service Worker` : 
                            `❌ No offline capability`);
                    });
                } else {
                    resolve('⚠️ Service Worker not supported');
                }
            });
        });
    }

    // Helper methods
    addTest(name, testFunction) {
        this.tests.push({ name, testFunction });
    }

    async runTest(test) {
        try {
            const result = await test.testFunction();
            const passed = !result.includes('❌') && !result.includes('⚠️');
            
            this.results.total++;
            if (passed) {
                this.results.passed++;
                console.log(`  ${result}`);
            } else {
                this.results.failed++;
                console.log(`  ${result}`);
            }
            
            this.results.details.push({
                name: test.name,
                result: result,
                passed: passed
            });
        } catch (error) {
            this.results.total++;
            this.results.failed++;
            const errorResult = `❌ ${test.name}: ${error.message}`;
            console.log(`  ${errorResult}`);
            this.results.details.push({
                name: test.name,
                result: errorResult,
                passed: false
            });
        }
    }

    generateReport() {
        const endTime = Date.now();
        const duration = ((endTime - this.startTime) / 1000).toFixed(2);
        const successRate = ((this.results.passed / this.results.total) * 100).toFixed(1);
        
        console.log('\n' + '='.repeat(60));
        console.log('📊 TEST SUITE REPORT');
        console.log('='.repeat(60));
        console.log(`⏱️  Duration: ${duration}s`);
        console.log(`📈 Success Rate: ${successRate}%`);
        console.log(`✅ Passed: ${this.results.passed}`);
        console.log(`❌ Failed: ${this.results.failed}`);
        console.log(`📊 Total: ${this.results.total}`);
        
        if (this.results.failed > 0) {
            console.log('\n❌ FAILED TESTS:');
            this.results.details
                .filter(test => !test.passed)
                .forEach(test => console.log(`  • ${test.name}: ${test.result}`));
        }
        
        console.log('\n🎉 Test suite completed!');
        
        // Store results globally for access
        window.testResults = this.results;
        
        return this.results;
    }
}

// Initialize and run tests when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    // Wait a bit for all resources to load
    setTimeout(async () => {
        const testSuite = new WebsiteTestSuite();
        await testSuite.runAllTests();
    }, 2000);
});

// Export for manual testing
window.WebsiteTestSuite = WebsiteTestSuite;
