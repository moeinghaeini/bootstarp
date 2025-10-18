// Enhanced Service Worker for Portfolio Website PWA

// Latest 2025 Service Worker with Advanced Caching
const CACHE_NAME = 'portfolio-v2025.1';
const STATIC_CACHE = 'portfolio-static-v2025.1';
const DYNAMIC_CACHE = 'portfolio-dynamic-v2025.1';
const IMAGE_CACHE = 'portfolio-images-v2025.1';
const FONT_CACHE = 'portfolio-fonts-v2025.1';

// Cache strategies
const CACHE_STRATEGIES = {
    CACHE_FIRST: 'cache-first',
    NETWORK_FIRST: 'network-first',
    STALE_WHILE_REVALIDATE: 'stale-while-revalidate',
    NETWORK_ONLY: 'network-only',
    CACHE_ONLY: 'cache-only'
};

// Critical resources for immediate caching
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/manifest.json',
    '/profile.jpg',
    '/profile.webp',
    '/profile.avif',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js',
    'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js',
    'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js',
    'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap'
];

// Font resources for separate caching
const fontUrls = [
    'https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDYbtXK-F2qO0s.woff2',
    'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2',
    'https://fonts.gstatic.com/s/cormorantgaramond/v16/co3WmX5slCNuHLi8bLeY9MK7whWMhyjQrEtE.woff2'
];

// Image resources for separate caching
const imageUrls = [
    '/profile.jpg',
    '/profile.webp',
    '/profile.avif'
];

// Install event
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(function(cache) {
                console.log('Opened static cache');
                return cache.addAll(urlsToCache);
            })
    );
    self.skipWaiting();
});

// Fetch event with advanced caching strategies
self.addEventListener('fetch', function(event) {
    const { request } = event;
    const url = new URL(request.url);
    
    // Handle different types of requests
    if (request.method === 'GET') {
        // Static assets - Cache First strategy
        if (urlsToCache.includes(url.href) || url.pathname.endsWith('.css') || url.pathname.endsWith('.js')) {
            event.respondWith(
                caches.match(request)
                    .then(function(response) {
                        if (response) {
                            return response;
                        }
                        return fetch(request)
                            .then(function(response) {
                                if (response.status === 200) {
                                    const responseClone = response.clone();
                                    caches.open(STATIC_CACHE)
                                        .then(function(cache) {
                                            cache.put(request, responseClone);
                                        });
                                }
                                return response;
                            });
                    })
            );
        }
        // API requests - Network First strategy
        else if (url.pathname.startsWith('/api/')) {
            event.respondWith(
                fetch(request)
                    .then(function(response) {
                        if (response.status === 200) {
                            const responseClone = response.clone();
                            caches.open(DYNAMIC_CACHE)
                                .then(function(cache) {
                                    cache.put(request, responseClone);
                                });
                        }
                        return response;
                    })
                    .catch(function() {
                        return caches.match(request);
                    })
            );
        }
        // Other requests - Stale While Revalidate
        else {
            event.respondWith(
                caches.match(request)
                    .then(function(response) {
                        const fetchPromise = fetch(request)
                            .then(function(networkResponse) {
                                if (networkResponse.status === 200) {
                                    const responseClone = networkResponse.clone();
                                    caches.open(DYNAMIC_CACHE)
                                        .then(function(cache) {
                                            cache.put(request, responseClone);
                                        });
                                }
                                return networkResponse;
                            });
                        
                        return response || fetchPromise;
                    })
            );
        }
    }
});

// Activate event
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Background sync for form submissions
self.addEventListener('sync', function(event) {
    if (event.tag === 'contact-form') {
        event.waitUntil(syncContactForm());
    }
});

function syncContactForm() {
    // Handle offline form submissions
    return Promise.resolve();
}

// Push notifications
self.addEventListener('push', function(event) {
    const options = {
        body: event.data ? event.data.text() : 'New update available!',
        icon: '/profile.jpg',
        badge: '/profile.jpg',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'View Portfolio',
                icon: '/profile.jpg'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/profile.jpg'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('Portfolio Update', options)
    );
});

// Notification click
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});
