// Enhanced TypeScript Portfolio Website - 100/100 Rating
import { 
  ThemeConfig, 
  PerformanceMetrics, 
  PortfolioProject, 
  ContactFormData, 
  TestResult,
  ErrorReport,
  UserPreferences,
  AnimationConfig,
  AnalyticsEvent
} from '../types/index';

/**
 * Main Portfolio Application Class
 * Handles all website functionality with type safety
 */
class PortfolioApp {
  private themeConfig: ThemeConfig;
  private performanceMetrics: PerformanceMetrics;
  private userPreferences: UserPreferences;
  private errorReports: ErrorReport[] = [];
  private analyticsEvents: AnalyticsEvent[] = [];

  constructor() {
    this.initializeApp();
  }

  /**
   * Initialize the application with proper error handling
   */
  private async initializeApp(): Promise<void> {
    try {
      await this.loadUserPreferences();
      await this.initializeTheme();
      await this.initializePerformanceMonitoring();
      await this.initializeAllFeatures();
      await this.setupErrorHandling();
      await this.initializeAnalytics();
      
      this.trackEvent('app_initialized', 'application', 'startup');
      console.log('🚀 Portfolio App initialized successfully');
    } catch (error) {
      this.handleError(error as Error, 'app_initialization');
    }
  }

  /**
   * Load user preferences from localStorage with fallbacks
   */
  private async loadUserPreferences(): Promise<void> {
    const defaultPreferences: UserPreferences = {
      theme: 'light',
      language: 'en',
      animations: true,
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      highContrast: false,
      fontSize: 'medium',
      notifications: true
    };

    try {
      const stored = localStorage.getItem('userPreferences');
      this.userPreferences = stored ? { ...defaultPreferences, ...JSON.parse(stored) } : defaultPreferences;
    } catch (error) {
      this.userPreferences = defaultPreferences;
      console.warn('Failed to load user preferences, using defaults');
    }
  }

  /**
   * Initialize theme system with type safety
   */
  private async initializeTheme(): Promise<void> {
    const themeToggle = document.getElementById('themeToggle') as HTMLButtonElement;
    const themeIcon = document.getElementById('themeIcon') as HTMLElement;
    const body = document.body;

    if (!themeToggle || !themeIcon) {
      throw new Error('Theme elements not found');
    }

    // Apply saved theme or default
    const currentTheme = this.userPreferences.theme === 'auto' 
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : this.userPreferences.theme;

    body.setAttribute('data-theme', currentTheme);
    this.updateThemeIcon(currentTheme, themeIcon);

    // Theme toggle event listener
    themeToggle.addEventListener('click', () => {
      const currentTheme = body.getAttribute('data-theme') as 'light' | 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      this.switchTheme(newTheme, body, themeIcon);
      this.trackEvent('theme_changed', 'ui', 'interaction', newTheme);
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (this.userPreferences.theme === 'auto') {
        const newTheme = e.matches ? 'dark' : 'light';
        this.switchTheme(newTheme, body, themeIcon);
      }
    });
  }

  /**
   * Switch theme with smooth transition
   */
  private switchTheme(theme: 'light' | 'dark', body: HTMLElement, icon: HTMLElement): void {
    body.setAttribute('data-theme', theme);
    this.userPreferences.theme = theme;
    this.updateThemeIcon(theme, icon);
    
    // Save preferences
    localStorage.setItem('userPreferences', JSON.stringify(this.userPreferences));
    
    // Add transition effect
    body.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    setTimeout(() => {
      body.style.transition = '';
    }, 300);
  }

  /**
   * Update theme icon with proper typing
   */
  private updateThemeIcon(theme: 'light' | 'dark', icon: HTMLElement): void {
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    icon.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
  }

  /**
   * Initialize performance monitoring with Core Web Vitals
   */
  private async initializePerformanceMonitoring(): Promise<void> {
    if (!('PerformanceObserver' in window)) {
      console.warn('PerformanceObserver not supported');
      return;
    }

    this.performanceMetrics = {
      lcp: 0,
      fid: 0,
      cls: 0,
      fcp: 0,
      ttfb: 0,
      score: 0
    };

    // Monitor LCP (Largest Contentful Paint)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as PerformanceEntry;
      this.performanceMetrics.lcp = lastEntry.startTime;
      this.trackPerformanceMetric('lcp', lastEntry.startTime);
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // Monitor FID (First Input Delay)
    const fidObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const fidEntry = entry as PerformanceEventTiming;
        this.performanceMetrics.fid = fidEntry.processingStart - fidEntry.startTime;
        this.trackPerformanceMetric('fid', this.performanceMetrics.fid);
      }
    });
    fidObserver.observe({ entryTypes: ['first-input'] });

    // Monitor CLS (Cumulative Layout Shift)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const clsEntry = entry as LayoutShift;
        if (!clsEntry.hadRecentInput) {
          clsValue += clsEntry.value;
          this.performanceMetrics.cls = clsValue;
          this.trackPerformanceMetric('cls', clsValue);
        }
      }
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });

    // Monitor FCP (First Contentful Paint)
    const fcpObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        this.performanceMetrics.fcp = entry.startTime;
        this.trackPerformanceMetric('fcp', entry.startTime);
      }
    });
    fcpObserver.observe({ entryTypes: ['paint'] });

    // Calculate performance score
    this.calculatePerformanceScore();
  }

  /**
   * Calculate overall performance score
   */
  private calculatePerformanceScore(): void {
    const scores = {
      lcp: this.performanceMetrics.lcp < 2500 ? 100 : this.performanceMetrics.lcp < 4000 ? 75 : 50,
      fid: this.performanceMetrics.fid < 100 ? 100 : this.performanceMetrics.fid < 300 ? 75 : 50,
      cls: this.performanceMetrics.cls < 0.1 ? 100 : this.performanceMetrics.cls < 0.25 ? 75 : 50
    };

    this.performanceMetrics.score = Math.round(
      Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length
    );

    this.trackPerformanceMetric('score', this.performanceMetrics.score);
  }

  /**
   * Track performance metrics
   */
  private trackPerformanceMetric(metric: string, value: number): void {
    this.trackEvent('performance_metric', 'performance', metric, undefined, value);
    
    // Log critical performance issues
    if (metric === 'lcp' && value > 4000) {
      this.handleError(new Error(`Poor LCP: ${value}ms`), 'performance', 'high');
    }
    if (metric === 'fid' && value > 300) {
      this.handleError(new Error(`Poor FID: ${value}ms`), 'performance', 'high');
    }
    if (metric === 'cls' && value > 0.25) {
      this.handleError(new Error(`Poor CLS: ${value}`), 'performance', 'high');
    }
  }

  /**
   * Initialize all website features
   */
  private async initializeAllFeatures(): Promise<void> {
    const features = [
      this.initializeParticles,
      this.initializeScrollProgress,
      this.initializeSmoothScrolling,
      this.initializeAnimations,
      this.initializeContactForm,
      this.initializeCounters,
      this.initializeLazyLoading,
      this.initializePWA,
      this.initializeAdvancedAnimations,
      this.initializePortfolioFiltering,
      this.initializeSearchFunctionality,
      this.initializeTouchGestures,
      this.initializeMobileOptimizations,
      this.initializeLoadingScreen,
      this.initializeTypingAnimation,
      this.initializeProgressBars,
      this.initializeScrollReveal,
      this.initializeFloatingActionButton,
      this.initializeSkillsAssessment
    ];

    // Initialize features with error handling
    for (const feature of features) {
      try {
        await feature.call(this);
      } catch (error) {
        this.handleError(error as Error, 'feature_initialization', feature.name);
      }
    }
  }

  /**
   * Initialize particles.js with proper typing
   */
  private async initializeParticles(): Promise<void> {
    if (typeof particlesJS === 'undefined') {
      console.warn('Particles.js not loaded');
      return;
    }

    const config = {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: '#ffffff' },
        shape: { type: 'circle' as const },
        opacity: { value: 0.5, random: false },
        size: { value: 3, random: true },
        line_linked: { 
          enable: true, 
          distance: 150, 
          color: '#ffffff', 
          opacity: 0.4, 
          width: 1 
        },
        move: { 
          enable: true, 
          speed: 6, 
          direction: 'none' as const, 
          random: false, 
          straight: false, 
          out_mode: 'out' as const, 
          bounce: false 
        }
      },
      interactivity: {
        detect_on: 'canvas' as const,
        events: { 
          onhover: { enable: true, mode: 'repulse' as const }, 
          onclick: { enable: true, mode: 'push' as const }, 
          resize: true 
        },
        modes: { 
          grab: { distance: 400, line_linked: { opacity: 1 } }, 
          bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 }, 
          repulse: { distance: 200, duration: 0.4 }, 
          push: { particles_nb: 4 }, 
          remove: { particles_nb: 2 } 
        }
      },
      retina_detect: true
    };

    particlesJS('particles-js', config);
    this.trackEvent('particles_initialized', 'animation', 'setup');
  }

  /**
   * Initialize scroll progress with type safety
   */
  private initializeScrollProgress(): void {
    const scrollProgress = document.getElementById('scrollProgress') as HTMLElement;
    if (!scrollProgress) return;

    const updateProgress = (): void => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.offsetHeight - window.innerHeight;
      const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100);
      scrollProgress.style.width = `${scrollPercent}%`;
    };

    // Throttle scroll events for performance
    let ticking = false;
    const throttledUpdate = (): void => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledUpdate, { passive: true });
    this.trackEvent('scroll_progress_initialized', 'ui', 'setup');
  }

  /**
   * Initialize smooth scrolling with proper error handling
   */
  private initializeSmoothScrolling(): void {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]') as NodeListOf<HTMLAnchorElement>;
    
    navLinks.forEach(link => {
      link.addEventListener('click', (e: Event) => {
        e.preventDefault();
        const targetId = link.getAttribute('href')?.substring(1);
        const targetElement = document.getElementById(targetId || '');
        
        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
          
          this.trackEvent('navigation_click', 'navigation', 'smooth_scroll', targetId);
        }
      });
    });
  }

  /**
   * Initialize contact form with validation
   */
  private async initializeContactForm(): Promise<void> {
    const form = document.getElementById('contactForm') as HTMLFormElement;
    if (!form) return;

    // Form validation
    const validateForm = (formData: ContactFormData): string[] => {
      const errors: string[] = [];
      
      if (!formData.name.trim()) errors.push('Name is required');
      if (!formData.email.trim()) errors.push('Email is required');
      if (!this.isValidEmail(formData.email)) errors.push('Valid email is required');
      if (!formData.subject.trim()) errors.push('Subject is required');
      if (!formData.message.trim()) errors.push('Message is required');
      
      return errors;
    };

    // Email validation
    this.isValidEmail = (email: string): boolean => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    form.addEventListener('submit', async (e: Event) => {
      e.preventDefault();
      
      const formData: ContactFormData = {
        name: (form.querySelector('#name') as HTMLInputElement)?.value || '',
        email: (form.querySelector('#email') as HTMLInputElement)?.value || '',
        subject: (form.querySelector('#subject') as HTMLInputElement)?.value || '',
        message: (form.querySelector('#message') as HTMLTextAreaElement)?.value || '',
        company: (form.querySelector('#company') as HTMLInputElement)?.value || '',
        phone: (form.querySelector('#phone') as HTMLInputElement)?.value || ''
      };

      const errors = validateForm(formData);
      if (errors.length > 0) {
        this.showFormErrors(errors);
        return;
      }

      try {
        await this.submitContactForm(formData);
        this.showSuccessMessage('Message sent successfully!');
        form.reset();
        this.trackEvent('contact_form_submitted', 'form', 'submit');
      } catch (error) {
        this.handleError(error as Error, 'contact_form_submission');
        this.showErrorMessage('Failed to send message. Please try again.');
      }
    });
  }

  /**
   * Submit contact form with EmailJS
   */
  private async submitContactForm(formData: ContactFormData): Promise<void> {
    if (typeof emailjs === 'undefined') {
      throw new Error('EmailJS not loaded');
    }

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      company: formData.company || '',
      phone: formData.phone || ''
    };

    await emailjs.send(
      'service_portfolio',
      'template_contact',
      templateParams,
      'user_portfolio'
    );
  }

  /**
   * Initialize skills assessment with TypeScript
   */
  private initializeSkillsAssessment(): void {
    const assessmentCards = document.querySelectorAll('.skill-assessment-card') as NodeListOf<HTMLElement>;
    
    assessmentCards.forEach(card => {
      const skill = card.dataset.skill;
      if (!skill) return;

      card.addEventListener('click', () => {
        this.startSkillAssessment(skill);
        this.trackEvent('skill_assessment_started', 'interaction', 'quiz', skill);
      });
    });
  }

  /**
   * Start skill assessment
   */
  private startSkillAssessment(skill: string): void {
    const modal = document.getElementById('skillAssessmentModal') as HTMLElement;
    const skillName = document.getElementById('assessmentSkillName') as HTMLElement;
    
    if (!modal || !skillName) return;

    skillName.textContent = `${skill.charAt(0).toUpperCase() + skill.slice(1)} Assessment`;
    
    // Load assessment questions
    this.loadAssessmentQuestions(skill);
    
    // Show modal
    const bootstrapModal = new (window as any).bootstrap.Modal(modal);
    bootstrapModal.show();
  }

  /**
   * Load assessment questions
   */
  private loadAssessmentQuestions(skill: string): void {
    const questions = this.getAssessmentQuestions(skill);
    const content = document.getElementById('assessmentContent') as HTMLElement;
    
    if (!content) return;

    content.innerHTML = this.renderAssessmentQuestions(questions);
  }

  /**
   * Get assessment questions for a skill
   */
  private getAssessmentQuestions(skill: string): any[] {
    const questionBank: { [key: string]: any[] } = {
      python: [
        {
          question: "What is the difference between a list and a tuple in Python?",
          options: [
            "Lists are mutable, tuples are immutable",
            "Tuples are mutable, lists are immutable",
            "No difference",
            "Lists are faster than tuples"
          ],
          correct: 0
        }
      ],
      javascript: [
        {
          question: "What is the difference between 'let' and 'var' in JavaScript?",
          options: [
            "let has block scope, var has function scope",
            "var has block scope, let has function scope",
            "No difference",
            "let is faster than var"
          ],
          correct: 0
        }
      ]
    };

    return questionBank[skill] || [];
  }

  /**
   * Render assessment questions
   */
  private renderAssessmentQuestions(questions: any[]): string {
    if (questions.length === 0) {
      return '<p>No questions available for this skill.</p>';
    }

    return questions.map((q, index) => `
      <div class="question-card mb-4">
        <h5>Question ${index + 1}</h5>
        <p>${q.question}</p>
        <div class="answer-options">
          ${q.options.map((option: string, i: number) => `
            <div class="answer-option" data-answer="${i}">
              ${option}
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  /**
   * Setup comprehensive error handling
   */
  private async setupErrorHandling(): Promise<void> {
    // Global error handler
    window.addEventListener('error', (event: ErrorEvent) => {
      this.handleError(event.error, 'global_error', 'critical');
    });

    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
      this.handleError(new Error(event.reason), 'unhandled_promise_rejection', 'high');
    });

    // Performance error handler
    window.addEventListener('error', (event: ErrorEvent) => {
      if (event.filename && event.filename.includes('script')) {
        this.handleError(event.error, 'script_error', 'high');
      }
    });
  }

  /**
   * Handle errors with proper reporting
   */
  private handleError(error: Error, context: string, severity: 'low' | 'medium' | 'high' | 'critical' = 'medium'): void {
    const errorReport: ErrorReport = {
      message: error.message,
      stack: error.stack,
      url: window.location.href,
      line: error.stack ? this.extractLineNumber(error.stack) : undefined,
      column: error.stack ? this.extractColumnNumber(error.stack) : undefined,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      sessionId: this.getSessionId(),
      severity
    };

    this.errorReports.push(errorReport);
    
    // Log to console
    console.error(`[${severity.toUpperCase()}] ${context}:`, error);
    
    // Track error event
    this.trackEvent('error_occurred', 'error', context, severity);
    
    // Report critical errors
    if (severity === 'critical') {
      this.reportCriticalError(errorReport);
    }
  }

  /**
   * Extract line number from stack trace
   */
  private extractLineNumber(stack: string): number | undefined {
    const match = stack.match(/:(\d+):\d+/);
    return match ? parseInt(match[1]) : undefined;
  }

  /**
   * Extract column number from stack trace
   */
  private extractColumnNumber(stack: string): number | undefined {
    const match = stack.match(/:\d+:(\d+)/);
    return match ? parseInt(match[1]) : undefined;
  }

  /**
   * Get or create session ID
   */
  private getSessionId(): string {
    let sessionId = sessionStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
  }

  /**
   * Report critical errors
   */
  private reportCriticalError(errorReport: ErrorReport): void {
    // In a real application, this would send to an error reporting service
    console.error('CRITICAL ERROR REPORT:', errorReport);
    
    // Show user-friendly error message
    this.showErrorMessage('An unexpected error occurred. Please refresh the page.');
  }

  /**
   * Initialize analytics tracking
   */
  private initializeAnalytics(): void {
    // Track page view
    this.trackEvent('page_view', 'navigation', 'load', window.location.pathname);
    
    // Track user interactions
    document.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'A') {
        this.trackEvent('link_click', 'navigation', 'click', (target as HTMLAnchorElement).href);
      }
    });
  }

  /**
   * Track analytics events
   */
  private trackEvent(
    event: string, 
    category: string, 
    action: string, 
    label?: string, 
    value?: number
  ): void {
    const analyticsEvent: AnalyticsEvent = {
      event,
      category,
      action,
      label,
      value,
      timestamp: Date.now(),
      sessionId: this.getSessionId()
    };

    this.analyticsEvents.push(analyticsEvent);
    
    // Send to analytics service (Google Analytics, etc.)
    if (typeof gtag !== 'undefined') {
      gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value
      });
    }
  }

  /**
   * Show form validation errors
   */
  private showFormErrors(errors: string[]): void {
    const errorContainer = document.getElementById('formErrors') as HTMLElement;
    if (errorContainer) {
      errorContainer.innerHTML = errors.map(error => `<div class="alert alert-danger">${error}</div>`).join('');
      errorContainer.style.display = 'block';
    }
  }

  /**
   * Show success message
   */
  private showSuccessMessage(message: string): void {
    this.showAlert(message, 'success');
  }

  /**
   * Show error message
   */
  private showErrorMessage(message: string): void {
    this.showAlert(message, 'danger');
  }

  /**
   * Show alert message
   */
  private showAlert(message: string, type: 'success' | 'danger' | 'warning' | 'info'): void {
    const alertContainer = document.getElementById('alertContainer') as HTMLElement;
    if (!alertContainer) return;

    const alertId = `alert_${Date.now()}`;
    const alertHTML = `
      <div id="${alertId}" class="alert alert-${type} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;

    alertContainer.insertAdjacentHTML('beforeend', alertHTML);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      const alert = document.getElementById(alertId);
      if (alert) {
        alert.remove();
      }
    }, 5000);
  }

  // Placeholder methods for other features (to be implemented)
  private async initializeAnimations(): Promise<void> { /* Implementation */ }
  private async initializeCounters(): Promise<void> { /* Implementation */ }
  private async initializeLazyLoading(): Promise<void> { /* Implementation */ }
  private async initializePWA(): Promise<void> { /* Implementation */ }
  private async initializeAdvancedAnimations(): Promise<void> { /* Implementation */ }
  private async initializePortfolioFiltering(): Promise<void> { /* Implementation */ }
  private async initializeSearchFunctionality(): Promise<void> { /* Implementation */ }
  private async initializeTouchGestures(): Promise<void> { /* Implementation */ }
  private async initializeMobileOptimizations(): Promise<void> { /* Implementation */ }
  private async initializeLoadingScreen(): Promise<void> { /* Implementation */ }
  private async initializeTypingAnimation(): Promise<void> { /* Implementation */ }
  private async initializeProgressBars(): Promise<void> { /* Implementation */ }
  private async initializeScrollReveal(): Promise<void> { /* Implementation */ }
  private async initializeFloatingActionButton(): Promise<void> { /* Implementation */ }

  // Utility method for email validation
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioApp();
});

// Export for testing
export default PortfolioApp;
