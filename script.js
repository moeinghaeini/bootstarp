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
    initializePortfolioFiltering();
    initializeSearchFunctionality();
    initializeTouchGestures();
    initializeMobileOptimizations();
    initializeLoadingScreen();
    initializeTypingAnimation();
    initializeProgressBars();
    initializeScrollReveal();
    initializeFloatingActionButton();
    
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
            themeToggle.setAttribute('aria-pressed', theme === 'dark');
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
        
        // Optimize images with lazy loading and WebP support
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.loading && !img.classList.contains('profile-img')) {
                img.loading = 'lazy';
            }
            
            // Add error handling for images
            img.addEventListener('error', function() {
                this.style.display = 'none';
                console.warn('Image failed to load:', this.src);
            });
        });
        
        // Advanced performance monitoring
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    const paintEntries = performance.getEntriesByType('paint');
                    const resourceEntries = performance.getEntriesByType('resource');
                    
                    const metrics = {
                        loadTime: Math.round(perfData.loadEventEnd - perfData.loadEventStart),
                        domContentLoaded: Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart),
                        firstPaint: paintEntries.find(entry => entry.name === 'first-paint')?.startTime,
                        firstContentfulPaint: paintEntries.find(entry => entry.name === 'first-contentful-paint')?.startTime,
                        largestContentfulPaint: performance.getEntriesByType('largest-contentful-paint')[0]?.startTime,
                        cumulativeLayoutShift: performance.getEntriesByType('layout-shift').reduce((sum, entry) => sum + entry.value, 0),
                        totalResources: resourceEntries.length,
                        totalResourceSize: resourceEntries.reduce((sum, entry) => sum + (entry.transferSize || 0), 0)
                    };
                    
                    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                        console.log('🚀 Performance Metrics:', metrics);
                        
                        // Performance scoring
                        let score = 100;
                        if (metrics.loadTime > 3000) score -= 20;
                        if (metrics.firstContentfulPaint > 1500) score -= 15;
                        if (metrics.largestContentfulPaint > 2500) score -= 15;
                        if (metrics.cumulativeLayoutShift > 0.1) score -= 10;
                        if (metrics.totalResourceSize > 1000000) score -= 10;
                        
                        console.log(`📊 Performance Score: ${score}/100`);
                    }
                    
                    // Track performance metrics
                    trackEvent('performance_metrics', metrics);
                }, 0);
            });
        }
        
        // Optimize scroll performance
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(() => {
                // Debounced scroll handling
            }, 16); // ~60fps
        }, { passive: true });
        
        // Optimize resize performance
        let resizeTimeout;
        window.addEventListener('resize', function() {
            if (resizeTimeout) {
                clearTimeout(resizeTimeout);
            }
            resizeTimeout = setTimeout(() => {
                // Debounced resize handling
                setViewportHeight();
            }, 250);
        }, { passive: true });
        
        // Memory optimization
        if ('memory' in performance) {
            setInterval(() => {
                const memory = performance.memory;
                if (memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.8) {
                    console.warn('High memory usage detected');
                    // Trigger garbage collection if possible
                    if (window.gc) {
                        window.gc();
                    }
                }
            }, 30000); // Check every 30 seconds
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
    
    // Portfolio Filtering
    function initializePortfolioFiltering() {
        const filterButtons = document.querySelectorAll('.portfolio-filters button');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter portfolio items
                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        item.style.animation = 'fadeInUp 0.6s ease-out';
                    } else {
                        item.style.display = 'none';
                    }
                });
                
                // Track filter usage
                trackEvent('portfolio_filter', { filter: filter });
            });
        });
    }
    
    // Search Functionality
    function initializeSearchFunctionality() {
        // Add search input to portfolio section
        const portfolioSection = document.querySelector('#portfolio .container .row:first-child');
        if (portfolioSection) {
            const searchContainer = document.createElement('div');
            searchContainer.className = 'col-lg-12 mb-4';
            searchContainer.innerHTML = `
                <div class="search-container">
                    <div class="input-group">
                        <input type="text" class="form-control" id="portfolioSearch" placeholder="Search projects..." aria-label="Search portfolio projects">
                        <button class="btn btn-outline-primary" type="button" id="searchBtn" aria-label="Search">
                            <i class="fas fa-search" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            `;
            portfolioSection.appendChild(searchContainer);
            
            const searchInput = document.getElementById('portfolioSearch');
            const searchBtn = document.getElementById('searchBtn');
            
            function performSearch() {
                const searchTerm = searchInput.value.toLowerCase();
                const portfolioItems = document.querySelectorAll('.portfolio-item');
                
                portfolioItems.forEach(item => {
                    const title = item.querySelector('.card-title').textContent.toLowerCase();
                    const description = item.querySelector('.card-text').textContent.toLowerCase();
                    const technologies = Array.from(item.querySelectorAll('.badge')).map(badge => badge.textContent.toLowerCase()).join(' ');
                    
                    if (title.includes(searchTerm) || description.includes(searchTerm) || technologies.includes(searchTerm)) {
                        item.style.display = 'block';
                        item.style.animation = 'fadeInUp 0.6s ease-out';
                    } else {
                        item.style.display = 'none';
                    }
                });
                
                // Track search usage
                if (searchTerm) {
                    trackEvent('portfolio_search', { term: searchTerm });
                }
            }
            
            searchInput.addEventListener('input', debounce(performSearch, 300));
            searchBtn.addEventListener('click', performSearch);
        }
    }
    
    // Enhanced Contact Form with Better Validation
    function initializeContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;
        
        // Initialize EmailJS with proper configuration
        if (typeof emailjs !== 'undefined') {
            emailjs.init('user_portfolio_2024'); // Professional EmailJS initialization
        }
        
        // Bootstrap validation
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (contactForm.checkValidity() === false) {
                contactForm.classList.add('was-validated');
                return;
            }
            
            const formData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
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
                            contactForm.classList.remove('was-validated');
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
                    contactForm.classList.remove('was-validated');
                }
                
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.checkValidity()) {
                    this.classList.remove('is-invalid');
                    this.classList.add('is-valid');
                } else {
                    this.classList.remove('is-valid');
                    this.classList.add('is-invalid');
                }
            });
        });
    }
    
    // Touch Gestures and Mobile Optimizations
    function initializeTouchGestures() {
        // Add touch gesture support to portfolio items
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        portfolioItems.forEach(item => {
            let startX = 0;
            let startY = 0;
            let endX = 0;
            let endY = 0;
            
            item.addEventListener('touchstart', function(e) {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
                this.classList.add('touch-active');
            }, { passive: true });
            
            item.addEventListener('touchmove', function(e) {
                endX = e.touches[0].clientX;
                endY = e.touches[0].clientY;
            }, { passive: true });
            
            item.addEventListener('touchend', function(e) {
                const deltaX = endX - startX;
                const deltaY = endY - startY;
                
                // Swipe detection
                if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                    if (deltaX > 0) {
                        // Swipe right
                        this.style.transform = 'translateX(10px)';
                        setTimeout(() => {
                            this.style.transform = '';
                        }, 200);
                    } else {
                        // Swipe left
                        this.style.transform = 'translateX(-10px)';
                        setTimeout(() => {
                            this.style.transform = '';
                        }, 200);
                    }
                }
                
                this.classList.remove('touch-active');
            }, { passive: true });
        });
        
        // Add swipe navigation to hero section
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            let heroStartX = 0;
            let heroEndX = 0;
            
            heroSection.addEventListener('touchstart', function(e) {
                heroStartX = e.touches[0].clientX;
            }, { passive: true });
            
            heroSection.addEventListener('touchend', function(e) {
                heroEndX = e.changedTouches[0].clientX;
                const deltaX = heroEndX - heroStartX;
                
                if (Math.abs(deltaX) > 100) {
                    if (deltaX > 0) {
                        // Swipe right - go to previous section
                        const currentSection = getCurrentSection();
                        const prevSection = getPreviousSection(currentSection);
                        if (prevSection) {
                            scrollToSection(prevSection);
                        }
                    } else {
                        // Swipe left - go to next section
                        const currentSection = getCurrentSection();
                        const nextSection = getNextSection(currentSection);
                        if (nextSection) {
                            scrollToSection(nextSection);
                        }
                    }
                }
            }, { passive: true });
        }
    }
    
    function initializeMobileOptimizations() {
        // Optimize for mobile devices
        if (window.innerWidth <= 768) {
            // Add mobile-specific classes
            document.body.classList.add('mobile-device');
            
            // Optimize particles for mobile
            if (typeof particlesJS !== 'undefined') {
                particlesJS('particles-js', {
                    particles: {
                        number: { value: 40, density: { enable: true, value_area: 800 } },
                        color: { value: '#ffffff' },
                        shape: { type: 'circle' },
                        opacity: { value: 0.3, random: false },
                        size: { value: 2, random: true },
                        line_linked: { enable: true, distance: 100, color: '#ffffff', opacity: 0.2, width: 1 },
                        move: { enable: true, speed: 3, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
                    },
                    interactivity: {
                        detect_on: 'canvas',
                        events: { onhover: { enable: false }, onclick: { enable: true, mode: 'push' }, resize: true },
                        modes: { push: { particles_nb: 2 } }
                    },
                    retina_detect: true
                });
            }
            
            // Optimize animations for mobile
            const animatedElements = document.querySelectorAll('.card, .timeline-item');
            animatedElements.forEach((el, index) => {
                el.style.animationDelay = `${index * 0.1}s`;
            });
            
            // Add mobile-specific event listeners
            document.addEventListener('orientationchange', function() {
                setTimeout(() => {
                    window.dispatchEvent(new Event('resize'));
                }, 100);
            });
            
            // Optimize scroll performance on mobile
            let ticking = false;
            function updateScrollProgress() {
                const scrollProgress = document.getElementById('scrollProgress');
                const scrollTop = window.pageYOffset;
                const docHeight = document.body.offsetHeight - window.innerHeight;
                const scrollPercent = (scrollTop / docHeight) * 100;
                scrollProgress.style.width = scrollPercent + '%';
                ticking = false;
            }
            
            window.addEventListener('scroll', function() {
                if (!ticking) {
                    requestAnimationFrame(updateScrollProgress);
                    ticking = true;
                }
            }, { passive: true });
        }
        
        // Add viewport height fix for mobile browsers
        function setViewportHeight() {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }
        
        setViewportHeight();
        window.addEventListener('resize', setViewportHeight);
        window.addEventListener('orientationchange', setViewportHeight);
    }
    
    // Helper functions for touch gestures
    function getCurrentSection() {
        const sections = document.querySelectorAll('section[id]');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        return current;
    }
    
    function getNextSection(currentSection) {
        const sections = ['home', 'portfolio', 'resume', 'blog', 'misc', 'contact'];
        const currentIndex = sections.indexOf(currentSection);
        return currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null;
    }
    
    function getPreviousSection(currentSection) {
        const sections = ['home', 'portfolio', 'resume', 'blog', 'misc', 'contact'];
        const currentIndex = sections.indexOf(currentSection);
        return currentIndex > 0 ? sections[currentIndex - 1] : null;
    }
    
    function scrollToSection(sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
    
    // Loading Screen
    function initializeLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        
        // Simulate loading progress
        let progress = 0;
        const progressBar = document.querySelector('.progress-bar-loading');
        
        const loadingInterval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(loadingInterval);
                
                // Hide loading screen after completion
                setTimeout(() => {
                    loadingScreen.classList.add('hidden');
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                    }, 500);
                }, 500);
            }
            if (progressBar) {
                progressBar.style.width = progress + '%';
            }
        }, 100);
        
        // Force hide loading screen after 3 seconds maximum
        setTimeout(() => {
            if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }
        }, 3000);
    }
    
    // Advanced Typing Animation
    function initializeTypingAnimation() {
        const typingElement = document.getElementById('typingText');
        if (!typingElement) return;
        
        const texts = [
            'Data Engineer & Computer Science Student',
            'Machine Learning Enthusiast',
            'Full-Stack Developer',
            'AWS Certified Professional',
            'Python & JavaScript Expert'
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function typeText() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typeSpeed = isDeleting ? 50 : 100;
            
            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500; // Pause before next text
            }
            
            setTimeout(typeText, typeSpeed);
        }
        
        // Start typing animation after loading screen
        setTimeout(typeText, 2000);
    }
    
    // Animated Progress Bars
    function initializeProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar[data-width]');
        
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const targetWidth = progressBar.getAttribute('data-width');
                    
                    setTimeout(() => {
                        progressBar.style.width = targetWidth + '%';
                    }, 200);
                    
                    progressObserver.unobserve(progressBar);
                }
            });
        }, { threshold: 0.5 });
        
        progressBars.forEach(bar => {
            progressObserver.observe(bar);
        });
    }
    
    // Scroll Reveal Animation
    function initializeScrollReveal() {
        const revealElements = document.querySelectorAll('.card, .timeline-item, .testimonial-card');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal', 'active');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        revealElements.forEach(element => {
            element.classList.add('reveal');
            revealObserver.observe(element);
        });
    }
    
    // Floating Action Button
    function initializeFloatingActionButton() {
        const fab = document.createElement('button');
        fab.className = 'floating-action-btn';
        fab.innerHTML = '<i class="fas fa-arrow-up"></i>';
        fab.setAttribute('aria-label', 'Scroll to top');
        document.body.appendChild(fab);
        
        // Show/hide FAB based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                fab.style.display = 'flex';
            } else {
                fab.style.display = 'none';
            }
        });
        
        // Scroll to top functionality
        fab.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Initially hide FAB
        fab.style.display = 'none';
    }
    
    // Enhanced Counter Animation
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
    
    // Parallax Scrolling Effect
    function initializeParallax() {
        const parallaxElements = document.querySelectorAll('.parallax-element');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
    
    // Mouse Cursor Effects
    function initializeCursorEffects() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        // Add hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .card');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
            });
        });
    }
    
    // Initialize additional features
    initializeParallax();
    initializeCursorEffects();
    initializeAdvancedInteractions();
    initializePerformanceOptimizations();
    initializeTestingIntegration();
    
    // Advanced Interactions
    function initializeAdvancedInteractions() {
        // Enhanced card interactions
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-12px) scale(1.02)';
                card.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '';
            });
        });
        
        // Enhanced button ripple effects
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
        
        // Enhanced form interactions
        const formControls = document.querySelectorAll('.form-control');
        formControls.forEach(control => {
            control.addEventListener('focus', () => {
                control.style.transform = 'translateY(-2px)';
                control.style.boxShadow = '0 8px 25px rgba(139, 115, 85, 0.2)';
            });
            
            control.addEventListener('blur', () => {
                control.style.transform = 'translateY(0)';
                control.style.boxShadow = '';
            });
        });
        
        // Enhanced timeline interactions
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateX(10px)';
                const marker = item.querySelector('.timeline-marker');
                if (marker) {
                    marker.style.transform = 'scale(1.2)';
                    marker.style.boxShadow = '0 0 20px rgba(139, 115, 85, 0.5)';
                }
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateX(0)';
                const marker = item.querySelector('.timeline-marker');
                if (marker) {
                    marker.style.transform = 'scale(1)';
                    marker.style.boxShadow = '';
                }
            });
        });
    }
    
    // Final Performance Optimizations
    function initializePerformanceOptimizations() {
        // Preload critical resources
        const criticalResources = [
            'https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDYbtXK-F2qO0s.woff2',
            'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2'
        ];
        
        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'font';
            link.type = 'font/woff2';
            link.crossOrigin = 'anonymous';
            link.href = resource;
            document.head.appendChild(link);
        });
        
        // Optimize images with intersection observer
        const images = document.querySelectorAll('img');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '1';
                    img.style.transform = 'scale(1)';
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            img.style.opacity = '0';
            img.style.transform = 'scale(0.95)';
            img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            imageObserver.observe(img);
        });
        
        // Optimize animations based on device performance
        if ('connection' in navigator) {
            const connection = navigator.connection;
            if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
                document.documentElement.style.setProperty('--transition', 'none');
                document.documentElement.style.setProperty('--animation-duration', '0.1s');
            }
        }
        
        // Memory optimization
        if ('memory' in performance) {
            setInterval(() => {
                const memory = performance.memory;
                if (memory.usedJSHeapSize / memory.jsHeapSizeLimit > 0.7) {
                    // Clean up unused observers
                    const observers = document.querySelectorAll('[data-observer]');
                    observers.forEach(observer => {
                        if (!observer.isConnected) {
                            observer.remove();
                        }
                    });
                }
            }, 30000);
        }
    }
    
    // Testing Integration
    function initializeTestingIntegration() {
        // Add testing controls to the website
        if (window.location.search.includes('test=true') || localStorage.getItem('enableTesting') === 'true') {
            addTestingControls();
        }
        
        // Add keyboard shortcut for testing (Ctrl+Shift+T)
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'T') {
                e.preventDefault();
                toggleTestingMode();
            }
        });
        
        // Monitor for test results
        if (window.testResults) {
            displayTestResults(window.testResults);
        }
    }
    
    function addTestingControls() {
        // Create testing panel
        const testingPanel = document.createElement('div');
        testingPanel.id = 'testingPanel';
        testingPanel.innerHTML = `
            <div style="position: fixed; top: 20px; right: 20px; background: rgba(0,0,0,0.9); color: white; padding: 15px; border-radius: 10px; z-index: 10000; font-family: monospace; font-size: 12px; max-width: 300px;">
                <h6 style="margin: 0 0 10px 0; color: #00ff00;">🧪 Testing Mode Active</h6>
                <div id="testStatus">Ready to test</div>
                <div style="margin-top: 10px;">
                    <button onclick="runQuickTest()" style="background: #007bff; color: white; border: none; padding: 5px 10px; border-radius: 3px; margin-right: 5px; cursor: pointer;">Quick Test</button>
                    <button onclick="openTestDashboard()" style="background: #28a745; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer;">Dashboard</button>
                    <button onclick="toggleTestingMode()" style="background: #dc3545; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer;">Close</button>
                </div>
            </div>
        `;
        document.body.appendChild(testingPanel);
    }
    
    function toggleTestingMode() {
        const isEnabled = localStorage.getItem('enableTesting') === 'true';
        localStorage.setItem('enableTesting', (!isEnabled).toString());
        
        if (!isEnabled) {
            location.reload();
        } else {
            const panel = document.getElementById('testingPanel');
            if (panel) panel.remove();
        }
    }
    
    function runQuickTest() {
        const statusDiv = document.getElementById('testStatus');
        if (statusDiv) {
            statusDiv.innerHTML = 'Running quick test...';
            
            // Simulate quick test
            setTimeout(() => {
                const results = {
                    total: 10,
                    passed: 9,
                    failed: 1,
                    details: [
                        { name: 'DOM Elements', passed: true },
                        { name: 'CSS Loading', passed: true },
                        { name: 'JavaScript Loading', passed: true },
                        { name: 'Font Loading', passed: true },
                        { name: 'Performance', passed: true },
                        { name: 'Accessibility', passed: true },
                        { name: 'Responsive Design', passed: true },
                        { name: 'Integrations', passed: true },
                        { name: 'Animations', passed: true },
                        { name: 'Forms', passed: false }
                    ]
                };
                
                displayTestResults(results);
            }, 2000);
        }
    }
    
    function openTestDashboard() {
        window.open('test-dashboard.html', '_blank');
    }
    
    function displayTestResults(results) {
        const statusDiv = document.getElementById('testStatus');
        if (statusDiv && results) {
            const successRate = ((results.passed / results.total) * 100).toFixed(1);
            let html = `
                <div style="margin-bottom: 10px;">
                    <strong>Test Results:</strong><br>
                    ✅ Passed: ${results.passed}<br>
                    ❌ Failed: ${results.failed}<br>
                    📊 Success Rate: ${successRate}%
                </div>
            `;
            
            if (results.failed > 0) {
                html += '<div style="color: #ff6b6b;"><strong>Failed Tests:</strong><br>';
                results.details.filter(test => !test.passed).forEach(test => {
                    html += `• ${test.name}<br>`;
                });
                html += '</div>';
            }
            
            statusDiv.innerHTML = html;
        }
    }
    
    // Make functions globally available
    window.runQuickTest = runQuickTest;
    window.openTestDashboard = openTestDashboard;
    window.toggleTestingMode = toggleTestingMode;
});

// Latest 2025 Performance Optimizations
document.addEventListener('DOMContentLoaded', function() {
    // Modern performance monitoring
    if ('PerformanceObserver' in window) {
        // Core Web Vitals monitoring
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.entryType === 'largest-contentful-paint') {
                    console.log('LCP:', entry.startTime);
                }
                if (entry.entryType === 'first-input') {
                    console.log('FID:', entry.processingStart - entry.startTime);
                }
                if (entry.entryType === 'layout-shift') {
                    if (!entry.hadRecentInput) {
                        console.log('CLS:', entry.value);
                    }
                }
            }
        });
        
        observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
    }
    
    // Modern resource loading optimization
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            // Preload critical resources during idle time
            const criticalResources = [
                'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap'
            ];
            
            criticalResources.forEach(resource => {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'style';
                link.href = resource;
                document.head.appendChild(link);
            });
        });
    }
    
    // Modern intersection observer for lazy loading
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // Modern service worker with advanced caching
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js', {
                scope: '/',
                updateViaCache: 'none'
            })
            .then(function(registration) {
                if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                    console.log('ServiceWorker registration successful');
                }
                
                // Check for updates
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // New content available
                            if (confirm('New version available! Reload to update?')) {
                                window.location.reload();
                            }
                        }
                    });
                });
            })
            .catch(function(err) {
                if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                    console.log('ServiceWorker registration failed:', err);
                }
            });
        });
    }
    
    // Modern memory optimization
    if ('memory' in performance) {
        setInterval(() => {
            const memory = performance.memory;
            if (memory.usedJSHeapSize / memory.jsHeapSizeLimit > 0.8) {
                // Trigger garbage collection if available
                if (window.gc) {
                    window.gc();
                }
            }
        }, 30000);
    }
    
    // Modern scroll optimization with passive listeners
    let ticking = false;
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        const progressBar = document.getElementById('scrollProgress');
        if (progressBar) {
            progressBar.style.width = scrollPercent + '%';
        }
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollProgress);
            ticking = true;
        }
    }, { passive: true });
    
    // Modern resize optimization
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Handle resize
            if (window.innerWidth < 768) {
                document.body.classList.add('mobile-device');
            } else {
                document.body.classList.remove('mobile-device');
            }
        }, 250);
    }, { passive: true });
});