// TypeScript type definitions for Portfolio Website

export interface ThemeConfig {
  name: 'light' | 'dark';
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  textColor: string;
  backgroundColor: string;
  cardBackground: string;
  borderColor: string;
}

export interface PerformanceMetrics {
  lcp: number;
  fid: number;
  cls: number;
  fcp: number;
  ttfb: number;
  score: number;
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  category: 'web' | 'data' | 'ml' | 'mobile';
  technologies: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  impact?: string;
  duration?: string;
  featured: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  readTime: number;
  views: number;
  tags: string[];
  featured: boolean;
  imageUrl: string;
  url: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
  phone?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  imageUrl?: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'data' | 'tools' | 'languages';
  yearsOfExperience: number;
  certifications?: string[];
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
  type: 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance';
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  gpa?: number;
  description: string;
  achievements: string[];
  relevantCoursework: string[];
}

export interface AnimationConfig {
  duration: number;
  easing: string;
  delay?: number;
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
  iterationCount?: number | 'infinite';
}

export interface CacheConfig {
  strategy: 'cache-first' | 'network-first' | 'stale-while-revalidate' | 'network-only' | 'cache-only';
  maxAge: number;
  maxEntries: number;
  name: string;
}

export interface ServiceWorkerConfig {
  version: string;
  cacheNames: {
    static: string;
    dynamic: string;
    images: string;
    fonts: string;
  };
  strategies: {
    [key: string]: CacheConfig;
  };
}

export interface AnalyticsEvent {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  timestamp: number;
  userId?: string;
  sessionId: string;
}

export interface TestResult {
  name: string;
  passed: boolean;
  message: string;
  duration: number;
  category: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface TestSuite {
  name: string;
  tests: TestResult[];
  passed: number;
  failed: number;
  total: number;
  duration: number;
  timestamp: number;
}

export interface ErrorReport {
  message: string;
  stack?: string;
  url: string;
  line?: number;
  column?: number;
  timestamp: number;
  userAgent: string;
  userId?: string;
  sessionId: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface PerformanceReport {
  metrics: PerformanceMetrics;
  timestamp: number;
  url: string;
  userAgent: string;
  connectionType?: string;
  deviceMemory?: number;
  hardwareConcurrency?: number;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  animations: boolean;
  reducedMotion: boolean;
  highContrast: boolean;
  fontSize: 'small' | 'medium' | 'large';
  notifications: boolean;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  external?: boolean;
  children?: NavigationItem[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  label: string;
  color: string;
}

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  author: string;
  image: string;
  url: string;
  type: string;
  locale: string;
  siteName: string;
}

export interface PWAConfig {
  name: string;
  shortName: string;
  description: string;
  startUrl: string;
  display: 'fullscreen' | 'standalone' | 'minimal-ui' | 'browser';
  orientation: 'portrait' | 'landscape' | 'any';
  themeColor: string;
  backgroundColor: string;
  icons: Array<{
    src: string;
    sizes: string;
    type: string;
    purpose?: string;
  }>;
}

export interface BuildConfig {
  environment: 'development' | 'staging' | 'production';
  version: string;
  buildTime: string;
  features: {
    [key: string]: boolean;
  };
  analytics: {
    enabled: boolean;
    trackingId?: string;
  };
  performance: {
    monitoring: boolean;
    reporting: boolean;
  };
}

// Utility types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type EventHandler<T = Event> = (event: T) => void;

export type AsyncFunction<T, R> = (arg: T) => Promise<R>;

export type DebouncedFunction<T extends (...args: any[]) => any> = (
  ...args: Parameters<T>
) => void;

export type ThrottledFunction<T extends (...args: any[]) => any> = (
  ...args: Parameters<T>
) => void;
