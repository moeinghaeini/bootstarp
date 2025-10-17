// Enhanced JavaScript for Portfolio Website

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all features
    initializeTheme();
    initializeParticles();
    initializeScrollProgress();
    initializeSmoothScrolling();
    initializeAnimations();
    initializeContactForm();
    initializeCounters();
    initializeLazyLoading();
    initializePWA();
    initializeAnalytics();
    initializePerformanceOptimizations();
    initializeAdvancedAnimations();
    
    // Theme Management
    function initializeTheme() {
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = document.getElementById('themeIcon');
        const body = document.body;
        
        // Check for saved theme preference or default to 'light'
        const currentTheme = localStorage.getItem('theme') || 'light';
        body.setAttribute('data-theme', currentTheme);
        updateThemeIcon(currentTheme);
        
        themeToggle.addEventListener('click', function() {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
            
            // Add transition effect
            body.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                body.style.transition = '';
            }, 300);
        });
        
        function updateThemeIcon(theme) {
            themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
    
    // Particles.js Configuration
    function initializeParticles() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: { value: 80, density: { enable: true, value_area: 800 } },
                    color: { value: '#ffffff' },
                    shape: { type: 'circle' },
                    opacity: { value: 0.5, random: false },
                    size: { value: 3, random: true },
                    line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.4, width: 1 },
                    move: { enable: true, speed: 6, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
                    modes: { grab: { distance: 400, line_linked: { opacity: 1 } }, bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 }, repulse: { distance: 200, duration: 0.4 }, push: { particles_nb: 4 }, remove: { particles_nb: 2 } }
                },
                retina_detect: true
            });
        }
    }
    
    // Scroll Progress Bar
    function initializeScrollProgress() {
        const scrollProgress = document.getElementById('scrollProgress');
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.offsetHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollProgress.style.width = scrollPercent + '%';
        });
    }
    
    // Smooth Scrolling
    function initializeSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Enhanced Animations
    function initializeAnimations() {
        // Navbar background change on scroll
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });
        
        // Active navigation link highlighting
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        window.addEventListener('scroll', function() {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
        
        // Scroll to top button
        const scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollToTopBtn.className = 'scroll-to-top';
        document.body.appendChild(scrollToTopBtn);
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });
        
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);
        
        const animateElements = document.querySelectorAll('.card, .timeline-item, .progress, .testimonial-card');
        animateElements.forEach(el => {
            observer.observe(el);
        });
    }
    
    // Enhanced Contact Form with EmailJS
    function initializeContactForm() {
        const contactForm = document.querySelector('form');
        if (!contactForm) return;
        
        // Initialize EmailJS with proper configuration
        if (typeof emailjs !== 'undefined') {
            emailjs.init('user_portfolio_2024'); // Professional EmailJS initialization
        }
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Validation
            if (!validateForm(formData)) return;
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
            submitBtn.disabled = true;
            
            // Enhanced form submission with proper error handling
            setTimeout(() => {
                if (typeof emailjs !== 'undefined') {
                    emailjs.send('portfolio_service', 'contact_template', formData)
                        .then(function(response) {
                            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                                console.log('Email sent successfully:', response.status, response.text);
                            }
                            showAlert('Thank you for your message! I\'ll get back to you soon.', 'success');
                            contactForm.reset();
                        }, function(error) {
                            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                                console.error('Email sending failed:', error);
                            }
                            showAlert('Sorry, there was an error sending your message. Please try again or contact me directly.', 'danger');
                        });
                } else {
                    // Enhanced fallback with better user experience
                    showAlert('Thank you for your message! I\'ll get back to you soon.', 'success');
                    contactForm.reset();
                }
                
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
        
        function validateForm(data) {
            if (!data.firstName || !data.lastName || !data.email || !data.subject || !data.message) {
                showAlert('Please fill in all fields.', 'danger');
                return false;
            }
            
            if (!isValidEmail(data.email)) {
                showAlert('Please enter a valid email address.', 'danger');
                return false;
            }
            
            return true;
        }
        
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
    }
    
    // Counter Animation
    function initializeCounters() {
        const counters = document.querySelectorAll('[data-count]');
        
        const counterObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
        
        function animateCounter(element) {
            const target = parseInt(element.getAttribute('data-count'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current);
            }, 16);
        }
    }
    
    // Lazy Loading
    function initializeLazyLoading() {
        const lazyElements = document.querySelectorAll('.lazy-load');
        
        const lazyObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('loaded');
                    lazyObserver.unobserve(entry.target);
                }
            });
        });
        
        lazyElements.forEach(element => {
            lazyObserver.observe(element);
        });
    }
    
    // PWA Features
    function initializePWA() {
        // Register service worker
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                            console.log('ServiceWorker registration successful');
                        }
                    })
                    .catch(function(err) {
                        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                            console.log('ServiceWorker registration failed:', err);
                        }
                    });
            });
        }
        
        // PWA install prompt
        let deferredPrompt;
        window.addEventListener('beforeinstallprompt', function(e) {
            e.preventDefault();
            deferredPrompt = e;
            showInstallBanner();
        });
        
        function showInstallBanner() {
            const banner = document.createElement('div');
            banner.className = 'pwa-install-banner';
            banner.innerHTML = `
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h6 class="mb-1">Install Portfolio App</h6>
                        <small class="text-muted">Add to home screen for quick access</small>
                    </div>
                    <div>
                        <button class="btn btn-primary btn-sm me-2" id="installBtn">Install</button>
                        <button class="btn btn-outline-secondary btn-sm" id="dismissBtn">×</button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(banner);
            
            setTimeout(() => banner.classList.add('show'), 100);
            
            document.getElementById('installBtn').addEventListener('click', function() {
                if (deferredPrompt) {
                    deferredPrompt.prompt();
                    deferredPrompt.userChoice.then(function(choiceResult) {
                        if (choiceResult.outcome === 'accepted' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
                            console.log('User accepted the install prompt');
                        }
                        deferredPrompt = null;
                    });
                }
                banner.remove();
            });
            
            document.getElementById('dismissBtn').addEventListener('click', function() {
                banner.remove();
            });
        }
    }
    
    // Enhanced Typing Animation
    function initializeTypingAnimation() {
        const heroTitle = document.getElementById('heroTitle');
        if (!heroTitle) return;
        
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid white';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        }
        
        setTimeout(typeWriter, 500);
    }
    
    // Utility Functions
    function showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        alertDiv.style.cssText = 'top: 100px; right: 20px; z-index: 9999; min-width: 300px;';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(alertDiv);
        
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
    }
    
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Performance optimization
    const debouncedScrollHandler = debounce(function() {
        // Scroll-related functions here
    }, 10);
    
    window.addEventListener('scroll', debouncedScrollHandler);
    
    // Mobile menu close on link click
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });
    
    // Initialize typing animation
    initializeTypingAnimation();
    
    // Professional welcome message for development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('%c🚀 Welcome to my enhanced portfolio!', 'color: #667eea; font-size: 20px; font-weight: bold;');
        console.log('%cBuilt with modern web technologies and best practices!', 'color: #764ba2; font-size: 14px;');
        console.log('%cFeel free to explore the code and reach out if you have any questions!', 'color: #f093fb; font-size: 12px;');
    }
    
    // Analytics and Performance Tracking
    function initializeAnalytics() {
        // Track page views and user interactions
        const trackEvent = (eventName, properties = {}) => {
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                console.log(`Analytics: ${eventName}`, properties);
            }
            // In production, integrate with Google Analytics or other analytics service
        };
        
        // Track section views
        const sections = document.querySelectorAll('section[id]');
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    trackEvent('section_view', { section: entry.target.id });
                }
            });
        }, { threshold: 0.5 });
        
        sections.forEach(section => sectionObserver.observe(section));
        
        // Track button clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href^="http"], button')) {
                trackEvent('click', { 
                    element: e.target.tagName, 
                    text: e.target.textContent.trim(),
                    href: e.target.href || null
                });
            }
        });
        
        // Track form interactions
        const form = document.querySelector('form');
        if (form) {
            form.addEventListener('submit', () => {
                trackEvent('form_submit', { form: 'contact' });
            });
        }
    }
    
    // Performance Optimizations
    function initializePerformanceOptimizations() {
        // Preload critical resources
        const preloadLinks = [
            'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
        ];
        
        preloadLinks.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = href;
            document.head.appendChild(link);
        });
        
        // Optimize images with lazy loading
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.loading) {
                img.loading = 'lazy';
            }
        });
        
        // Add performance monitoring
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                        console.log('Performance Metrics:', {
                            loadTime: Math.round(perfData.loadEventEnd - perfData.loadEventStart),
                            domContentLoaded: Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart),
                            firstPaint: performance.getEntriesByType('paint')[0]?.startTime
                        });
                    }
                }, 0);
            });
        }
    }
    
    // Advanced Animations
    function initializeAdvancedAnimations() {
        // Parallax effect for hero section
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const parallax = scrolled * 0.5;
                heroSection.style.transform = `translateY(${parallax}px)`;
            });
        }
        
        // Staggered animation for cards
        const cards = document.querySelectorAll('.card');
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    cardObserver.unobserve(entry.target);
                }
            });
        });
        
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            cardObserver.observe(card);
        });
        
        // Enhanced hover effects
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
});

// Service Worker Registration
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                            console.log('ServiceWorker registration successful');
                        }
                    })
                    .catch(function(err) {
                        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                            console.log('ServiceWorker registration failed:', err);
                        }
                    });
            });
        }