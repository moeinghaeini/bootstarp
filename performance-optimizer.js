// Latest 2025 Performance Optimization Script
// Advanced performance monitoring and optimization

class PerformanceOptimizer {
    constructor() {
        this.metrics = {};
        this.observers = [];
        this.init();
    }

    init() {
        this.setupCoreWebVitals();
        this.setupResourceTiming();
        this.setupMemoryMonitoring();
        this.setupNetworkMonitoring();
        this.optimizeImages();
        this.setupLazyLoading();
    }

    // Core Web Vitals monitoring
    setupCoreWebVitals() {
        if (!('PerformanceObserver' in window)) return;

        // Largest Contentful Paint (LCP)
        const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            this.metrics.lcp = lastEntry.startTime;
            this.reportMetric('LCP', lastEntry.startTime);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        this.observers.push(lcpObserver);

        // First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                this.metrics.fid = entry.processingStart - entry.startTime;
                this.reportMetric('FID', this.metrics.fid);
            }
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
        this.observers.push(fidObserver);

        // Cumulative Layout Shift (CLS)
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            }
            this.metrics.cls = clsValue;
            this.reportMetric('CLS', clsValue);
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
        this.observers.push(clsObserver);

        // First Contentful Paint (FCP)
        const fcpObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.name === 'first-contentful-paint') {
                    this.metrics.fcp = entry.startTime;
                    this.reportMetric('FCP', entry.startTime);
                }
            }
        });
        fcpObserver.observe({ entryTypes: ['paint'] });
        this.observers.push(fcpObserver);
    }

    // Resource timing analysis
    setupResourceTiming() {
        if (!('performance' in window) || !performance.getEntriesByType) return;

        const resources = performance.getEntriesByType('resource');
        let totalSize = 0;
        let slowResources = [];

        resources.forEach(resource => {
            totalSize += resource.transferSize || 0;
            
            // Identify slow resources (>1s)
            if (resource.duration > 1000) {
                slowResources.push({
                    name: resource.name,
                    duration: resource.duration,
                    size: resource.transferSize
                });
            }
        });

        this.metrics.totalResources = resources.length;
        this.metrics.totalSize = totalSize;
        this.metrics.slowResources = slowResources;

        this.reportMetric('Total Resources', resources.length);
        this.reportMetric('Total Size', `${(totalSize / 1024).toFixed(2)} KB`);
    }

    // Memory monitoring
    setupMemoryMonitoring() {
        if (!('memory' in performance)) return;

        setInterval(() => {
            const memory = performance.memory;
            this.metrics.memory = {
                used: memory.usedJSHeapSize,
                total: memory.totalJSHeapSize,
                limit: memory.jsHeapSizeLimit
            };

            // Trigger garbage collection if memory usage is high
            if (memory.usedJSHeapSize / memory.jsHeapSizeLimit > 0.8) {
                if (window.gc) {
                    window.gc();
                    console.log('Garbage collection triggered');
                }
            }
        }, 30000);
    }

    // Network monitoring
    setupNetworkMonitoring() {
        if (!('connection' in navigator)) return;

        const connection = navigator.connection;
        this.metrics.network = {
            effectiveType: connection.effectiveType,
            downlink: connection.downlink,
            rtt: connection.rtt
        };

        // Adjust loading strategy based on connection
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
            this.enableLowBandwidthMode();
        }
    }

    // Image optimization
    optimizeImages() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Add loading="lazy" if not present
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }

            // Add decoding="async" for better performance
            if (!img.hasAttribute('decoding')) {
                img.setAttribute('decoding', 'async');
            }

            // Handle image load errors
            img.addEventListener('error', () => {
                console.warn('Image failed to load:', img.src);
                // Fallback to placeholder or retry
                this.handleImageError(img);
            });
        });
    }

    // Advanced lazy loading
    setupLazyLoading() {
        if (!('IntersectionObserver' in window)) return;

        const lazyElements = document.querySelectorAll('[data-lazy]');
        const lazyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    this.loadLazyElement(element);
                    lazyObserver.unobserve(element);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        lazyElements.forEach(element => {
            lazyObserver.observe(element);
        });
    }

    // Load lazy element
    loadLazyElement(element) {
        const src = element.dataset.lazy;
        if (element.tagName === 'IMG') {
            element.src = src;
        } else if (element.tagName === 'IFRAME') {
            element.src = src;
        } else {
            // Load content via fetch
            fetch(src)
                .then(response => response.text())
                .then(html => {
                    element.innerHTML = html;
                })
                .catch(error => {
                    console.error('Failed to load lazy content:', error);
                });
        }
    }

    // Handle image errors
    handleImageError(img) {
        // Try WebP fallback
        if (img.src.includes('.jpg') || img.src.includes('.jpeg')) {
            const webpSrc = img.src.replace(/\.(jpg|jpeg)$/i, '.webp');
            img.src = webpSrc;
        } else {
            // Use placeholder
            img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlPC90ZXh0Pjwvc3ZnPg==';
        }
    }

    // Enable low bandwidth mode
    enableLowBandwidthMode() {
        // Disable animations
        document.documentElement.style.setProperty('--transition', 'none');
        
        // Reduce image quality
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (img.src.includes('.webp')) {
                img.src = img.src.replace('.webp', '.jpg');
            }
        });

        // Disable non-critical features
        const particles = document.getElementById('particles-js');
        if (particles) {
            particles.style.display = 'none';
        }
    }

    // Report metrics
    reportMetric(name, value) {
        console.log(`Performance Metric - ${name}:`, value);
        
        // Send to analytics if available
        if (typeof gtag !== 'undefined') {
            gtag('event', 'performance_metric', {
                metric_name: name,
                metric_value: value
            });
        }
    }

    // Get performance score
    getPerformanceScore() {
        const scores = {
            lcp: this.metrics.lcp < 2500 ? 100 : this.metrics.lcp < 4000 ? 75 : 50,
            fid: this.metrics.fid < 100 ? 100 : this.metrics.fid < 300 ? 75 : 50,
            cls: this.metrics.cls < 0.1 ? 100 : this.metrics.cls < 0.25 ? 75 : 50,
            fcp: this.metrics.fcp < 1800 ? 100 : this.metrics.fcp < 3000 ? 75 : 50
        };

        const averageScore = Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length;
        return Math.round(averageScore);
    }

    // Cleanup
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers = [];
    }
}

// Initialize performance optimizer
const performanceOptimizer = new PerformanceOptimizer();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PerformanceOptimizer;
}
