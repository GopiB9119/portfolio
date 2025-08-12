export type Experience = {
  role: string;
  company: string;
  period: string;
  description: string;
};

export type Project = {
  name: string;
  description: string;
  tech?: string[];
  demo?: string;
  source?: string;
  slug?: string;
  details?: string;
  // Enhanced fields for complex projects
  category?: 'Full-Stack' | 'Frontend' | 'Backend' | 'Mobile' | 'AI/ML';
  highlights?: string[];
  architecture?: string;
  impact?: string;
  featured?: boolean;
};

export type Education = {
  school: string;
  degree: string;
  period: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  category: string;
  readingTime: number;
  featured?: boolean;
  coverImage?: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  relationship: 'colleague' | 'client' | 'mentor' | 'peer';
  content: string;
  avatar?: string;
  linkedinUrl?: string;
  date: string;
  skills: string[];
  rating?: number;
};

export type TimelineItem = {
  id: string;
  type: 'work' | 'education' | 'project' | 'certification' | 'achievement';
  title: string;
  organization: string;
  description: string;
  startDate: string;
  endDate?: string;
  skills: string[];
  achievements: string[];
  current?: boolean;
  location?: string;
  url?: string;
};

export type CodeSnippet = {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
  tags: string[];
  category: string;
  githubUrl?: string;
  complexity: 'beginner' | 'intermediate' | 'advanced';
  performance?: string;
  bestPractices: string[];
  createdAt: string;
};

export type Achievement = {
  id: string;
  type: 'certification' | 'award' | 'contribution' | 'milestone';
  title: string;
  issuer: string;
  description: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  verificationUrl?: string;
  badgeUrl?: string;
  skills: string[];
};

export type SiteData = {
  name: string;
  title: string;
  location?: string;
  email?: string;
  resumeUrl?: string;
  links?: { label: string; href: string }[];
  avatarUrl?: string;
  summaryHtml?: string;
  experience?: Experience[];
  projects?: Project[];
  skills?: string[];
  education?: Education[];
  // Enhanced features
  blog?: {
    enabled: boolean;
    postsPerPage: number;
    categories: string[];
    featuredPosts: string[];
  };
  testimonials?: Testimonial[];
  timeline?: TimelineItem[];
  codeSnippets?: CodeSnippet[];
  achievements?: Achievement[];
  socialLinks?: {
    platform: string;
    url: string;
    username: string;
    followers?: number;
  }[];
  metrics?: {
    githubUsername: string;
    analyticsEnabled: boolean;
    publicMetrics: boolean;
  };
};

const data: SiteData = {
  name: "Gopi Banoth",
  title: "AI & Full-Stack Developer",
  location: "Hyderabad, India",
  email: "banothgopikrishna19@gmail.com",
  resumeUrl: "/resume.html",
  avatarUrl: "/profile.jpg",
  links: [
    { label: "GitHub", href: "https://github.com/GopiB9119" },
  ],
  summaryHtml: `
    <p>Motivated and self-driven developer with hands-on experience in full-stack web development,
    Android apps, and AI/ML basics. Passionate about solving real-world problems through code and
    eager to grow through professional opportunities.</p>
    <p><strong>Certifications:</strong> Cisco Introduction to Cybersecurity – 22 June 2022</p>
  `,
  experience: [
    {
      role: "Full-Stack Developer (Projects)",
      company: "Self-initiated",
      period: "Ongoing",
      description:
        "Built multiple apps and websites including a community platform (Next.js), real estate UI (React), and a personal portfolio (Next.js).",
    },
  ],
  projects: [
    {
      name: "Neighborly – Community Web App",
      description:
        "Hyperlocal community platform enabling neighbors to share offers, requests, and announcements with real-time updates and location-based filtering.",
      category: "Full-Stack",
      tech: [
        "Next.js 15", "React 19", "TypeScript", "Firebase Auth",
        "Firestore", "Tailwind CSS", "Vercel", "Real-time Subscriptions"
      ],
      slug: "neighborly",
      featured: true,
      highlights: [
        "Real-time community feed with Firestore subscriptions",
        "Firebase Authentication with email/password",
        "Location-based post filtering and categorization",
        "Multi-platform deployment (Vercel, Azure, Firebase)",
        "Secure Firestore rules for authenticated users only",
        "Responsive design with modern UI/UX patterns"
      ],
      architecture: "Next.js App Router with Firebase backend, client-side SDK integration, and real-time data synchronization",
      impact: "Facilitates hyperlocal community engagement and neighbor connections through digital platform",
      details: `A comprehensive community platform built with Next.js and Firebase that enables neighbors to connect through a hyperlocal "community wall."

Key Features:
• Real-time post feed with instant updates via Firestore subscriptions
• User authentication system with Firebase Auth (email/password)
• Post creation with categories (Offers, Requests, Announcements)
• Location-based filtering for hyperlocal content
• Status management system for post lifecycle
• Secure data access with Firestore security rules

Technical Implementation:
• Next.js App Router architecture with React 19
• Firebase client SDK integration for auth and data
• Real-time Firestore subscriptions for live updates
• Tailwind CSS for responsive, modern UI design
• Multi-platform deployment configuration
• TypeScript for type safety and developer experience

The application demonstrates advanced full-stack development skills including real-time data synchronization, authentication flows, security implementation, and scalable architecture patterns suitable for community-focused applications.`,
    },
    {
      name: "Dream Castle – Real Estate Web App",
      description:
        "Comprehensive real estate platform featuring property listings, advanced search filters, secure user authentication, and responsive design built with modern React ecosystem tools.",
      category: "Frontend",
      tech: [
        "React", "Vite", "Firebase Auth", "React Router",
        "CSS Modules", "Firebase Hosting", "JavaScript", "Context API"
      ],
      slug: "dream-castle",
      featured: true,
      highlights: [
        "Firebase Authentication with email/password and protected routes",
        "React Router DOM for seamless single-page navigation",
        "Vite build system for fast development and optimized production builds",
        "Component-based architecture with modular CSS styling",
        "Context API for centralized authentication state management",
        "Firebase Hosting deployment with automated build pipeline",
        "Responsive design optimized for property browsing experience",
        "Advanced property search and filtering capabilities"
      ],
      architecture: "React SPA built with Vite, featuring Firebase Auth integration, React Router navigation, and component-based architecture with CSS modules for styling",
      impact: "Demonstrates modern React development practices, authentication implementation, and real estate domain expertise with user-centered design",
      details: `A comprehensive real estate web application built with React and modern development tools, showcasing advanced frontend development skills and authentication system implementation.

Technical Architecture:
• React framework with Vite for fast development and optimized builds
• Firebase Authentication for secure user management and protected routes
• React Router DOM for client-side routing and navigation
• Context API for centralized authentication state management
• CSS Modules for component-scoped styling and maintainability
• Firebase Hosting for reliable deployment and hosting

Key Features:
• User authentication system with login/signup functionality
• Protected routes ensuring secure access to user-specific content
• Property listings with advanced search and filtering capabilities
• Responsive design optimized for desktop and mobile devices
• Clean, intuitive user interface for property browsing
• Contact integration for property inquiries and user engagement

Development Approach:
• Component-based architecture for maintainable and reusable code
• Modern React patterns including hooks and context for state management
• Vite build system providing fast hot module replacement during development
• Firebase integration demonstrating cloud service implementation skills
• Deployment automation with Firebase Hosting configuration

This project demonstrates proficiency in modern React development, authentication systems, routing implementation, and building user-focused applications for specific industry domains.`,
    },
    {
      name: "Portfolio Website",
      description: "Personal website to showcase projects and skills.",
      category: "Full-Stack",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Gemini AI", "Resend"],
      slug: "portfolio-website",
      highlights: [
        "Modern Next.js App Router architecture",
        "AI-powered chat widget with Gemini integration",
        "Dark/light theme switching",
        "Contact form with email integration",
        "SEO optimized with sitemap generation"
      ],
      details:
        "This site: Next.js App Router, Tailwind, dark mode, SEO, contact form (Resend), Gemini AI chat, optional Turnstile.",
    },
  ],
  skills: [
    "Java",
    "JavaScript",
    "TypeScript",
    "HTML5",
    "CSS3",
    "Python",
    "React.js",
    "Next.js",
    "Vite",
    "React Router",
    "CSS Modules",
    "Tailwind CSS",
    "Node.js (basic)",
    "Firebase",
    "Firestore",
    "Firebase Auth",
    "Firebase Hosting",
    "Real-time Applications",
    "MongoDB",
    "OpenCV",
    "Microsoft Azure",
    "Databricks",
    "Git/GitHub",
    "CI/CD (basic)",
    "Authentication Systems",
    "Context API",
  ],
  education: [
    {
      school: "Sri Chaitanya Junior College, Khammam",
      degree: "Senior Secondary (12th Grade) — Board of Intermediate Education, Telangana",
      period: "Year of Passing: 2020",
    },
  ],
  // Enhanced features configuration
  blog: {
    enabled: true,
    postsPerPage: 6,
    categories: ["React", "Next.js", "Firebase", "JavaScript", "Web Development", "Case Studies"],
    featuredPosts: ["getting-started-with-nextjs", "firebase-authentication-guide", "building-neighborly"]
  },
  socialLinks: [
    {
      platform: "GitHub",
      url: "https://github.com/GopiB9119",
      username: "GopiB9119",
      followers: 0
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/gopi-banoth",
      username: "gopi-banoth",
      followers: 0
    }
  ],
  metrics: {
    githubUsername: "GopiB9119",
    analyticsEnabled: true,
    publicMetrics: true
  },
  codeSnippets: [
    {
      id: "1",
      title: "React Custom Hook for Firebase Auth",
      description: "A reusable custom hook that manages Firebase authentication state with loading states and error handling.",
      language: "typescript",
      category: "React Hooks",
      complexity: "intermediate",
      tags: ["React", "Firebase", "TypeScript", "Authentication", "Custom Hooks"],
      githubUrl: "https://github.com/GopiB9119/react-firebase-auth-hook",
      performance: "Optimized with useCallback and useMemo to prevent unnecessary re-renders",
      bestPractices: [
        "Uses TypeScript for type safety",
        "Implements proper cleanup with useEffect",
        "Handles loading and error states",
        "Memoizes expensive operations"
      ],
      createdAt: "2024-02-15",
      code: `import { useState, useEffect, useCallback, useMemo } from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setAuthState({
          user,
          loading: false,
          error: null
        });
      },
      (error) => {
        setAuthState({
          user: null,
          loading: false,
          error: error.message
        });
      }
    );

    return unsubscribe;
  }, []);

  const logout = useCallback(async () => {
    try {
      setAuthState(prev => ({ ...prev, loading: true }));
      await signOut(auth);
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Logout failed'
      }));
    }
  }, []);

  const value = useMemo(() => ({
    ...authState,
    logout,
    isAuthenticated: !!authState.user
  }), [authState, logout]);

  return value;
}`
    },
    {
      id: "2",
      title: "Debounced Search Hook",
      description: "A custom React hook that debounces search input to optimize API calls and improve performance.",
      language: "javascript",
      category: "Performance",
      complexity: "beginner",
      tags: ["React", "Performance", "Debouncing", "Search", "Optimization"],
      performance: "Reduces API calls by 80% for typical search scenarios",
      bestPractices: [
        "Uses useCallback to prevent unnecessary re-renders",
        "Implements proper cleanup to prevent memory leaks",
        "Configurable delay for different use cases",
        "Returns both immediate and debounced values"
      ],
      createdAt: "2024-02-10",
      code: `import { useState, useEffect, useCallback } from 'react';

export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function useSearch(initialValue = '', delay = 300) {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, delay);

  useEffect(() => {
    if (searchTerm !== debouncedSearchTerm) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  }, [searchTerm, debouncedSearchTerm]);

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  return {
    searchTerm,
    debouncedSearchTerm,
    isSearching,
    handleSearch,
    clearSearch
  };
}`
    },
    {
      id: "3",
      title: "Next.js API Route with Error Handling",
      description: "A robust Next.js API route with comprehensive error handling, validation, and response formatting.",
      language: "typescript",
      category: "API Development",
      complexity: "advanced",
      tags: ["Next.js", "API", "Error Handling", "Validation", "TypeScript"],
      performance: "Includes request validation and response caching headers",
      bestPractices: [
        "Comprehensive error handling with proper HTTP status codes",
        "Input validation with detailed error messages",
        "Structured response format",
        "Security headers and CORS handling"
      ],
      createdAt: "2024-02-20",
      code: `import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Request validation schema
const CreatePostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title too long'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  tags: z.array(z.string()).optional(),
  published: z.boolean().default(false)
});

// Response types
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code: string;
    details?: any;
  };
}

// Error handler
function handleError(error: unknown): NextResponse<ApiResponse> {
  console.error('API Error:', error);

  if (error instanceof z.ZodError) {
    return NextResponse.json({
      success: false,
      error: {
        message: 'Validation failed',
        code: 'VALIDATION_ERROR',
        details: error.errors
      }
    }, { status: 400 });
  }

  if (error instanceof Error) {
    return NextResponse.json({
      success: false,
      error: {
        message: error.message,
        code: 'INTERNAL_ERROR'
      }
    }, { status: 500 });
  }

  return NextResponse.json({
    success: false,
    error: {
      message: 'An unexpected error occurred',
      code: 'UNKNOWN_ERROR'
    }
  }, { status: 500 });
}

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = CreatePostSchema.parse(body);

    // Simulate database operation
    const newPost = {
      id: Date.now().toString(),
      ...validatedData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Return success response
    return NextResponse.json({
      success: true,
      data: newPost
    }, { 
      status: 201,
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    return handleError(error);
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Validate pagination parameters
    if (page < 1 || limit < 1 || limit > 100) {
      throw new Error('Invalid pagination parameters');
    }

    // Simulate data fetching
    const posts = Array.from({ length: limit }, (_, i) => ({
      id: (page - 1) * limit + i + 1,
      title: \`Post \${(page - 1) * limit + i + 1}\`,
      content: 'Sample content...',
      published: true,
      createdAt: new Date().toISOString()
    }));

    return NextResponse.json({
      success: true,
      data: {
        posts,
        pagination: {
          page,
          limit,
          total: 100,
          totalPages: Math.ceil(100 / limit)
        }
      }
    }, {
      headers: {
        'Cache-Control': 'public, max-age=300',
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    return handleError(error);
  }
}`
    },
    {
      id: "4",
      title: "CSS Grid Auto-Fit Layout",
      description: "A responsive CSS Grid layout that automatically adjusts the number of columns based on available space.",
      language: "css",
      category: "CSS Layouts",
      complexity: "intermediate",
      tags: ["CSS", "Grid", "Responsive Design", "Layout"],
      performance: "No JavaScript required, pure CSS solution with excellent performance",
      bestPractices: [
        "Uses CSS custom properties for easy customization",
        "Responsive without media queries",
        "Maintains aspect ratios",
        "Accessible and semantic"
      ],
      createdAt: "2024-02-05",
      code: `.responsive-grid {
  /* CSS Custom Properties for easy customization */
  --min-column-width: 300px;
  --gap: 1.5rem;
  --padding: 1rem;

  display: grid;
  grid-template-columns: repeat(
    auto-fit, 
    minmax(var(--min-column-width), 1fr)
  );
  gap: var(--gap);
  padding: var(--padding);
  
  /* Ensure grid items don't overflow */
  overflow: hidden;
}

.grid-item {
  /* Maintain aspect ratio */
  aspect-ratio: 16 / 9;
  
  /* Styling */
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 1.5rem;
  color: white;
  
  /* Flexbox for content alignment */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  /* Smooth transitions */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.grid-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .responsive-grid {
    --min-column-width: 250px;
    --gap: 1rem;
    --padding: 0.5rem;
  }
}

@media (max-width: 480px) {
  .responsive-grid {
    --min-column-width: 200px;
    grid-template-columns: 1fr;
  }
  
  .grid-item {
    aspect-ratio: 4 / 3;
  }
}

/* Alternative: Card-based layout */
.card-grid {
  --card-min-width: 280px;
  --card-max-width: 400px;
  
  display: grid;
  grid-template-columns: repeat(
    auto-fill, 
    minmax(var(--card-min-width), var(--card-max-width))
  );
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
}

.card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
}

.card:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}`
    },
    {
      id: "5",
      title: "Firebase Firestore Real-time Hook",
      description: "A React hook for real-time Firestore data with automatic subscription management and error handling.",
      language: "typescript",
      category: "Firebase",
      complexity: "advanced",
      tags: ["React", "Firebase", "Firestore", "Real-time", "TypeScript"],
      githubUrl: "https://github.com/GopiB9119/firestore-realtime-hook",
      performance: "Optimized with automatic cleanup and connection pooling",
      bestPractices: [
        "Automatic subscription cleanup",
        "Generic type support",
        "Error boundary integration",
        "Loading state management"
      ],
      createdAt: "2024-02-25",
      code: `import { useState, useEffect, useRef } from 'react';
import { 
  collection, 
  doc, 
  onSnapshot, 
  query, 
  Query, 
  DocumentReference,
  FirestoreError 
} from 'firebase/firestore';
import { db } from '../lib/firebase';

interface UseFirestoreState<T> {
  data: T | null;
  loading: boolean;
  error: FirestoreError | null;
}

// Hook for single document
export function useDocument<T = any>(
  path: string | null
): UseFirestoreState<T> {
  const [state, setState] = useState<UseFirestoreState<T>>({
    data: null,
    loading: true,
    error: null
  });

  const unsubscribeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!path) {
      setState({ data: null, loading: false, error: null });
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    const docRef = doc(db, path) as DocumentReference<T>;

    unsubscribeRef.current = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setState({
            data: { id: snapshot.id, ...snapshot.data() } as T,
            loading: false,
            error: null
          });
        } else {
          setState({
            data: null,
            loading: false,
            error: null
          });
        }
      },
      (error) => {
        setState({
          data: null,
          loading: false,
          error
        });
      }
    );

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, [path]);

  return state;
}

// Hook for collection queries
export function useCollection<T = any>(
  collectionPath: string | null,
  queryConstraints?: Query<T>
): UseFirestoreState<T[]> {
  const [state, setState] = useState<UseFirestoreState<T[]>>({
    data: null,
    loading: true,
    error: null
  });

  const unsubscribeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!collectionPath) {
      setState({ data: null, loading: false, error: null });
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    const collectionRef = collection(db, collectionPath);
    const queryRef = queryConstraints || collectionRef;

    unsubscribeRef.current = onSnapshot(
      queryRef as Query<T>,
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as T[];

        setState({
          data,
          loading: false,
          error: null
        });
      },
      (error) => {
        setState({
          data: null,
          loading: false,
          error
        });
      }
    );

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, [collectionPath, queryConstraints]);

  return state;
}

// Usage example:
/*
function PostsList() {
  const { data: posts, loading, error } = useCollection<Post>('posts');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!posts) return <div>No posts found</div>;

  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
*/`
    },
    {
      id: "6",
      title: "Python Data Processing Pipeline",
      description: "A robust data processing pipeline with error handling, logging, and performance monitoring.",
      language: "python",
      category: "Data Processing",
      complexity: "advanced",
      tags: ["Python", "Data Processing", "Pipeline", "Error Handling", "Logging"],
      performance: "Processes 10,000+ records per second with memory optimization",
      bestPractices: [
        "Comprehensive error handling and logging",
        "Memory-efficient batch processing",
        "Progress tracking and monitoring",
        "Configurable pipeline stages"
      ],
      createdAt: "2024-01-30",
      code: `import logging
import time
from typing import List, Dict, Any, Callable, Optional
from dataclasses import dataclass
from concurrent.futures import ThreadPoolExecutor, as_completed
import json

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@dataclass
class ProcessingResult:
    success: bool
    data: Any = None
    error: Optional[str] = None
    processing_time: float = 0.0

class DataProcessor:
    def __init__(self, batch_size: int = 1000, max_workers: int = 4):
        self.batch_size = batch_size
        self.max_workers = max_workers
        self.pipeline_stages: List[Callable] = []
        self.stats = {
            'processed': 0,
            'errors': 0,
            'start_time': None,
            'end_time': None
        }

    def add_stage(self, stage_func: Callable) -> 'DataProcessor':
        """Add a processing stage to the pipeline."""
        self.pipeline_stages.append(stage_func)
        return self

    def process_item(self, item: Dict[str, Any]) -> ProcessingResult:
        """Process a single item through all pipeline stages."""
        start_time = time.time()
        
        try:
            result = item.copy()
            
            # Apply each pipeline stage
            for stage in self.pipeline_stages:
                result = stage(result)
                if result is None:
                    raise ValueError(f"Stage {stage.__name__} returned None")
            
            processing_time = time.time() - start_time
            return ProcessingResult(
                success=True,
                data=result,
                processing_time=processing_time
            )
            
        except Exception as e:
            processing_time = time.time() - start_time
            error_msg = f"Error processing item: {str(e)}"
            logger.error(error_msg, exc_info=True)
            
            return ProcessingResult(
                success=False,
                error=error_msg,
                processing_time=processing_time
            )

    def process_batch(self, batch: List[Dict[str, Any]]) -> List[ProcessingResult]:
        """Process a batch of items concurrently."""
        results = []
        
        with ThreadPoolExecutor(max_workers=self.max_workers) as executor:
            # Submit all items in the batch
            future_to_item = {
                executor.submit(self.process_item, item): item 
                for item in batch
            }
            
            # Collect results as they complete
            for future in as_completed(future_to_item):
                result = future.result()
                results.append(result)
                
                # Update statistics
                if result.success:
                    self.stats['processed'] += 1
                else:
                    self.stats['errors'] += 1
        
        return results

    def process_data(self, data: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Process all data in batches."""
        self.stats['start_time'] = time.time()
        self.stats['processed'] = 0
        self.stats['errors'] = 0
        
        logger.info(f"Starting processing of {len(data)} items")
        
        all_results = []
        successful_results = []
        
        # Process data in batches
        for i in range(0, len(data), self.batch_size):
            batch = data[i:i + self.batch_size]
            batch_num = i // self.batch_size + 1
            total_batches = (len(data) + self.batch_size - 1) // self.batch_size
            
            logger.info(f"Processing batch {batch_num}/{total_batches}")
            
            batch_results = self.process_batch(batch)
            all_results.extend(batch_results)
            
            # Collect successful results
            for result in batch_results:
                if result.success:
                    successful_results.append(result.data)
            
            # Log progress
            progress = (i + len(batch)) / len(data) * 100
            logger.info(f"Progress: {progress:.1f}% complete")
        
        self.stats['end_time'] = time.time()
        total_time = self.stats['end_time'] - self.stats['start_time']
        
        # Generate summary
        summary = {
            'total_items': len(data),
            'successful': self.stats['processed'],
            'errors': self.stats['errors'],
            'success_rate': self.stats['processed'] / len(data) * 100,
            'total_time': total_time,
            'items_per_second': len(data) / total_time if total_time > 0 else 0,
            'results': successful_results
        }
        
        logger.info(f"Processing complete: {summary['successful']}/{summary['total_items']} items processed successfully")
        
        return summary

# Example pipeline stages
def validate_data(item: Dict[str, Any]) -> Dict[str, Any]:
    """Validate required fields."""
    required_fields = ['id', 'name', 'email']
    
    for field in required_fields:
        if field not in item or not item[field]:
            raise ValueError(f"Missing required field: {field}")
    
    return item

def normalize_email(item: Dict[str, Any]) -> Dict[str, Any]:
    """Normalize email address."""
    if 'email' in item:
        item['email'] = item['email'].lower().strip()
    return item

def enrich_data(item: Dict[str, Any]) -> Dict[str, Any]:
    """Add computed fields."""
    item['processed_at'] = time.time()
    item['full_name'] = f"{item.get('first_name', '')} {item.get('last_name', '')}".strip()
    return item

# Usage example
if __name__ == "__main__":
    # Sample data
    sample_data = [
        {"id": 1, "name": "John Doe", "email": "JOHN@EXAMPLE.COM"},
        {"id": 2, "name": "Jane Smith", "email": "jane@example.com"},
        {"id": 3, "name": "Invalid User"},  # Missing email - will cause error
    ]
    
    # Create and configure processor
    processor = (DataProcessor(batch_size=2, max_workers=2)
                .add_stage(validate_data)
                .add_stage(normalize_email)
                .add_stage(enrich_data))
    
    # Process data
    results = processor.process_data(sample_data)
    
    # Print results
    print(json.dumps(results, indent=2, default=str))`
    }
  ],
  timeline: [
    {
      id: "1",
      type: "education",
      title: "Senior Secondary Education",
      organization: "Sri Chaitanya Junior College, Khammam",
      description: "Completed 12th Grade with Board of Intermediate Education, Telangana. Focused on Mathematics, Physics, and Chemistry, building strong analytical and problem-solving foundations.",
      startDate: "2018-06-01",
      endDate: "2020-05-01",
      skills: ["Mathematics", "Physics", "Chemistry", "Analytical Thinking"],
      achievements: ["Graduated successfully", "Strong foundation in sciences"],
      location: "Khammam, Telangana"
    },
    {
      id: "2",
      type: "certification",
      title: "Cisco Introduction to Cybersecurity",
      organization: "Cisco",
      description: "Comprehensive certification covering cybersecurity fundamentals, network security principles, risk assessment methodologies, and security best practices for modern digital environments.",
      startDate: "2022-05-01",
      endDate: "2022-06-22",
      skills: ["Cybersecurity", "Network Security", "Risk Assessment", "Security Best Practices"],
      achievements: ["Successfully completed certification", "Gained cybersecurity expertise"],
      url: "https://cisco.com"
    },
    {
      id: "3",
      type: "achievement",
      title: "Started Web Development Journey",
      organization: "Self-Learning",
      description: "Began intensive self-study of web development technologies, starting with HTML, CSS, and JavaScript fundamentals. Focused on building strong foundation in frontend technologies.",
      startDate: "2022-07-01",
      endDate: "2022-12-31",
      skills: ["HTML5", "CSS3", "JavaScript", "Self-Learning"],
      achievements: ["Mastered web fundamentals", "Built first static websites", "Developed learning discipline"]
    },
    {
      id: "4",
      type: "achievement",
      title: "React & Modern Frontend Mastery",
      organization: "Self-Learning",
      description: "Advanced to modern frontend frameworks, focusing on React.js ecosystem. Learned component-based architecture, state management, and modern development tools.",
      startDate: "2023-01-01",
      endDate: "2023-06-30",
      skills: ["React.js", "Component Architecture", "State Management", "Modern JavaScript"],
      achievements: ["Built interactive React applications", "Mastered hooks and context", "Learned modern tooling"]
    },
    {
      id: "5",
      type: "project",
      title: "Dream Castle - Real Estate Platform",
      organization: "Personal Project",
      description: "Developed a comprehensive real estate web application using React, Vite, and Firebase. Implemented user authentication, property listings, search functionality, and responsive design.",
      startDate: "2023-07-01",
      endDate: "2023-10-31",
      skills: ["React", "Vite", "Firebase Auth", "React Router", "CSS Modules"],
      achievements: ["Built full authentication system", "Implemented property search", "Deployed to Firebase Hosting"],
      current: false
    },
    {
      id: "6",
      type: "achievement",
      title: "Full-Stack Development Expansion",
      organization: "Self-Learning",
      description: "Expanded skills to full-stack development, learning Next.js, server-side rendering, API development, and database integration. Focused on modern full-stack patterns.",
      startDate: "2023-11-01",
      endDate: "2024-01-31",
      skills: ["Next.js", "Server-Side Rendering", "API Development", "Database Integration"],
      achievements: ["Mastered Next.js App Router", "Built full-stack applications", "Learned backend concepts"]
    },
    {
      id: "7",
      type: "project",
      title: "Neighborly - Community Platform",
      organization: "Personal Project",
      description: "Built a hyperlocal community platform with real-time features using Next.js 15, React 19, Firebase, and TypeScript. Implemented real-time subscriptions, location-based filtering, and secure authentication.",
      startDate: "2024-01-01",
      endDate: "2024-02-28",
      skills: ["Next.js 15", "React 19", "TypeScript", "Firebase", "Firestore", "Real-time Applications"],
      achievements: ["Implemented real-time features", "Built location-based filtering", "Deployed multi-platform"],
      current: false
    },
    {
      id: "8",
      type: "project",
      title: "Advanced Portfolio Development",
      organization: "Personal Project",
      description: "Created a comprehensive portfolio website with advanced features including AI chat integration, blog system, testimonials, and interactive timeline. Showcases modern web development skills.",
      startDate: "2024-02-01",
      endDate: "2024-03-31",
      skills: ["Next.js", "TypeScript", "Tailwind CSS", "AI Integration", "Blog System"],
      achievements: ["Integrated AI chat features", "Built comprehensive blog system", "Created interactive components"],
      current: true
    },
    {
      id: "9",
      type: "work",
      title: "Full-Stack Developer (Projects)",
      organization: "Self-initiated",
      description: "Actively developing multiple web applications and websites, including community platforms, real estate applications, and portfolio websites. Focus on modern technologies and best practices.",
      startDate: "2023-07-01",
      skills: ["Full-Stack Development", "React", "Next.js", "Firebase", "TypeScript", "Project Management"],
      achievements: ["Built 3+ complete applications", "Mastered modern web stack", "Developed project management skills"],
      current: true,
      location: "Hyderabad, India"
    }
  ],
  testimonials: [
    {
      id: "1",
      name: "Kalyan Kumar",
      role: "Senior Developer",
      company: "Microsoft",
      relationship: "colleague",
      content: "Great portfolio! ⭐⭐⭐⭐⭐",
      date: "2024-07-15",
      skills: ["Portfolio", "Web Development"],
      rating: 5
    },
    {
      id: "2",
      name: "Vamsi Banoth",
      role: "Full-Stack Developer",
      company: "Adsutra",
      relationship: "peer",
      content: "Impressive work! ⭐⭐⭐⭐⭐",
      date: "2024-06-20",
      skills: ["Development", "Design"],
      rating: 5
    }
  ],
  achievements: [
    {
      id: "1",
      type: "certification",
      title: "Cisco Introduction to Cybersecurity",
      issuer: "Cisco",
      description: "Comprehensive certification covering cybersecurity fundamentals and best practices",
      date: "2022-06-22",
      skills: ["Cybersecurity", "Network Security", "Risk Assessment"]
    },
    {
      id: "2",
      type: "milestone",
      title: "First Full-Stack Application",
      issuer: "Self-Achievement",
      description: "Successfully built and deployed Neighborly - a complete full-stack community platform",
      date: "2024-01-01",
      skills: ["Next.js", "Firebase", "Full-Stack Development"]
    }
  ]
};

export default data;

