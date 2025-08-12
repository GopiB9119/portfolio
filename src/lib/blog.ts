import { BlogPost } from "@/content/site-data";

// Sample blog posts data - in a real implementation, this would come from MDX files or a CMS
const blogPosts: (BlogPost & { content: string })[] = [
  {
    slug: "getting-started-with-nextjs",
    title: "Getting Started with Next.js 15: A Complete Guide",
    description: "Learn how to build modern web applications with Next.js 15, covering App Router, Server Components, and best practices for performance optimization.",
    publishedAt: "2024-01-15",
    tags: ["Next.js", "React", "Web Development", "Tutorial"],
    category: "Next.js",
    readingTime: 8,
    featured: true,
    content: `
      <h2>Introduction to Next.js 15</h2>
      <p>Next.js 15 represents a significant leap forward in React-based web development, introducing powerful features like the App Router, Server Components, and enhanced performance optimizations. In this comprehensive guide, we'll explore how to get started with Next.js 15 and build modern, scalable web applications.</p>
      
      <h3>Key Features of Next.js 15</h3>
      <ul>
        <li><strong>App Router:</strong> A new file-system based router built on React Server Components</li>
        <li><strong>Server Components:</strong> Render components on the server for better performance</li>
        <li><strong>Improved Performance:</strong> Faster builds and optimized bundle sizes</li>
        <li><strong>Enhanced Developer Experience:</strong> Better error handling and debugging tools</li>
      </ul>
      
      <h3>Setting Up Your First Next.js 15 Project</h3>
      <p>Getting started with Next.js 15 is straightforward. Here's how to create your first project:</p>
      
      <pre><code>npx create-next-app@latest my-nextjs-app
cd my-nextjs-app
npm run dev</code></pre>
      
      <p>This command creates a new Next.js project with all the latest features and best practices configured out of the box.</p>
      
      <h3>Understanding the App Router</h3>
      <p>The App Router is one of the most significant changes in Next.js 15. Unlike the traditional Pages Router, the App Router uses a file-system based approach where:</p>
      
      <ul>
        <li>Each folder represents a route segment</li>
        <li>Special files like <code>page.tsx</code>, <code>layout.tsx</code>, and <code>loading.tsx</code> define UI components</li>
        <li>Server Components are the default, providing better performance</li>
      </ul>
      
      <h3>Building Your First Component</h3>
      <p>Let's create a simple component that demonstrates Server Components:</p>
      
      <pre><code>// app/components/WelcomeMessage.tsx
export default function WelcomeMessage({ name }: { name: string }) {
  return (
    &lt;div className="p-6 bg-blue-50 rounded-lg"&gt;
      &lt;h2 className="text-2xl font-bold text-blue-900"&gt;
        Welcome to Next.js 15, {name}!
      &lt;/h2&gt;
      &lt;p className="text-blue-700 mt-2"&gt;
        You're now using the latest version of Next.js with Server Components.
      &lt;/p&gt;
    &lt;/div&gt;
  );
}</code></pre>
      
      <h3>Performance Optimization Tips</h3>
      <p>Next.js 15 includes several performance optimizations out of the box:</p>
      
      <ul>
        <li><strong>Automatic Code Splitting:</strong> Only load the JavaScript needed for each page</li>
        <li><strong>Image Optimization:</strong> Use the built-in Image component for optimized loading</li>
        <li><strong>Server-Side Rendering:</strong> Leverage SSR for better SEO and initial load times</li>
        <li><strong>Static Generation:</strong> Pre-render pages at build time when possible</li>
      </ul>
      
      <h3>Conclusion</h3>
      <p>Next.js 15 provides a powerful foundation for building modern web applications. With features like the App Router, Server Components, and built-in optimizations, you can create fast, scalable applications with an excellent developer experience.</p>
      
      <p>In upcoming posts, we'll dive deeper into specific features like data fetching, authentication, and deployment strategies. Stay tuned!</p>
    `
  },
  {
    slug: "firebase-authentication-guide",
    title: "Complete Firebase Authentication Guide for React Apps",
    description: "Master Firebase Authentication in React applications with this comprehensive guide covering setup, implementation, and best practices for secure user management.",
    publishedAt: "2024-02-01",
    tags: ["Firebase", "React", "Authentication", "Security"],
    category: "Firebase",
    readingTime: 12,
    featured: true,
    content: `
      <h2>Introduction to Firebase Authentication</h2>
      <p>Firebase Authentication provides a complete identity solution for your React applications, supporting multiple authentication methods including email/password, social logins, and phone authentication. In this guide, we'll implement a robust authentication system from scratch.</p>
      
      <h3>Setting Up Firebase</h3>
      <p>First, let's set up Firebase in your React project:</p>
      
      <pre><code>npm install firebase</code></pre>
      
      <p>Create a Firebase configuration file:</p>
      
      <pre><code>// lib/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  // ... other config
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);</code></pre>
      
      <h3>Creating an Authentication Context</h3>
      <p>We'll use React Context to manage authentication state across our application:</p>
      
      <pre><code>// context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = () => {
    return signOut(auth);
  };

  const value = {
    currentUser,
    logout
  };

  return (
    &lt;AuthContext.Provider value={value}&gt;
      {!loading && children}
    &lt;/AuthContext.Provider&gt;
  );
}</code></pre>
      
      <h3>Implementing Login and Signup</h3>
      <p>Create components for user authentication:</p>
      
      <pre><code>// components/Login.jsx
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    &lt;form onSubmit={handleSubmit}&gt;
      {error && &lt;div className="error"&gt;{error}&lt;/div&gt;}
      &lt;input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      /&gt;
      &lt;input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      /&gt;
      &lt;button type="submit"&gt;Login&lt;/button&gt;
    &lt;/form&gt;
  );
}</code></pre>
      
      <h3>Protected Routes</h3>
      <p>Implement route protection to secure authenticated areas:</p>
      
      <pre><code>// components/ProtectedRoute.jsx
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  
  return currentUser ? children : &lt;Navigate to="/login" /&gt;;
}</code></pre>
      
      <h3>Best Practices for Security</h3>
      <ul>
        <li><strong>Environment Variables:</strong> Store Firebase config in environment variables</li>
        <li><strong>Security Rules:</strong> Configure Firestore security rules properly</li>
        <li><strong>Input Validation:</strong> Validate user inputs on both client and server</li>
        <li><strong>Error Handling:</strong> Implement proper error handling for auth failures</li>
      </ul>
      
      <h3>Conclusion</h3>
      <p>Firebase Authentication provides a robust foundation for user management in React applications. By following these patterns and best practices, you can build secure, scalable authentication systems that provide excellent user experiences.</p>
    `
  },
  {
    slug: "building-neighborly",
    title: "Building Neighborly: A Real-time Community Platform Case Study",
    description: "Deep dive into building Neighborly, a hyperlocal community platform using Next.js, Firebase, and real-time features. Learn about architecture decisions and implementation challenges.",
    publishedAt: "2024-02-15",
    tags: ["Case Study", "Next.js", "Firebase", "Real-time", "Community"],
    category: "Case Studies",
    readingTime: 15,
    featured: true,
    content: `
      <h2>Project Overview: Neighborly</h2>
      <p>Neighborly is a hyperlocal community platform that enables neighbors to share offers, requests, and announcements with real-time updates and location-based filtering. This case study explores the technical decisions, challenges, and solutions encountered during development.</p>
      
      <h3>Technical Architecture</h3>
      <p>The application is built using a modern tech stack optimized for real-time functionality and scalability:</p>
      
      <ul>
        <li><strong>Frontend:</strong> Next.js 15 with React 19 and TypeScript</li>
        <li><strong>Backend:</strong> Firebase (Firestore, Authentication, Hosting)</li>
        <li><strong>Styling:</strong> Tailwind CSS for responsive design</li>
        <li><strong>Deployment:</strong> Multi-platform (Vercel, Azure, Firebase)</li>
      </ul>
      
      <h3>Key Features Implementation</h3>
      
      <h4>Real-time Community Feed</h4>
      <p>The core feature of Neighborly is the real-time community feed. Here's how we implemented it:</p>
      
      <pre><code>// hooks/usePosts.js
import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'posts'),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(postsData);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { posts, loading };
}</code></pre>
      
      <h4>Location-based Filtering</h4>
      <p>Users can filter posts by location to see hyperlocal content:</p>
      
      <pre><code>// components/LocationFilter.jsx
import { useState, useEffect } from 'react';

export default function LocationFilter({ onLocationChange }) {
  const [userLocation, setUserLocation] = useState(null);
  const [radius, setRadius] = useState(5); // km

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => console.error('Location error:', error)
      );
    }
  }, []);

  const handleRadiusChange = (newRadius) => {
    setRadius(newRadius);
    onLocationChange({ location: userLocation, radius: newRadius });
  };

  return (
    &lt;div className="location-filter"&gt;
      &lt;label&gt;Show posts within:&lt;/label&gt;
      &lt;select value={radius} onChange={(e) => handleRadiusChange(e.target.value)}&gt;
        &lt;option value={1}&gt;1 km&lt;/option&gt;
        &lt;option value={5}&gt;5 km&lt;/option&gt;
        &lt;option value={10}&gt;10 km&lt;/option&gt;
      &lt;/select&gt;
    &lt;/div&gt;
  );
}</code></pre>
      
      <h3>Challenges and Solutions</h3>
      
      <h4>Challenge 1: Real-time Performance</h4>
      <p><strong>Problem:</strong> Managing real-time updates without overwhelming the client with too many re-renders.</p>
      <p><strong>Solution:</strong> Implemented debounced updates and optimistic UI patterns:</p>
      
      <pre><code>// utils/debounce.js
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}</code></pre>
      
      <h4>Challenge 2: Security and Privacy</h4>
      <p><strong>Problem:</strong> Ensuring user data privacy while enabling location-based features.</p>
      <p><strong>Solution:</strong> Implemented Firestore security rules and data anonymization:</p>
      
      <pre><code>// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /posts/{postId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null 
        && request.auth.uid == resource.data.userId;
    }
  }
}</code></pre>
      
      <h3>Performance Optimizations</h3>
      
      <ul>
        <li><strong>Lazy Loading:</strong> Implemented infinite scroll for post loading</li>
        <li><strong>Image Optimization:</strong> Used Next.js Image component with proper sizing</li>
        <li><strong>Caching:</strong> Implemented service worker for offline functionality</li>
        <li><strong>Bundle Splitting:</strong> Code splitting for different user roles</li>
      </ul>
      
      <h3>Deployment Strategy</h3>
      <p>Neighborly supports multiple deployment platforms:</p>
      
      <ul>
        <li><strong>Vercel:</strong> Primary deployment for optimal Next.js performance</li>
        <li><strong>Firebase Hosting:</strong> Alternative deployment with Firebase integration</li>
        <li><strong>Azure:</strong> Enterprise deployment option with custom server configuration</li>
      </ul>
      
      <h3>Lessons Learned</h3>
      
      <ol>
        <li><strong>Real-time Features:</strong> Careful consideration of update frequency is crucial for performance</li>
        <li><strong>Location Services:</strong> Always provide fallbacks for users who don't share location</li>
        <li><strong>Security First:</strong> Implement security rules early in development</li>
        <li><strong>User Experience:</strong> Optimistic updates improve perceived performance</li>
      </ol>
      
      <h3>Future Enhancements</h3>
      <p>Planned improvements for Neighborly include:</p>
      
      <ul>
        <li>Push notifications for relevant posts</li>
        <li>Advanced moderation tools</li>
        <li>Integration with local business directories</li>
        <li>Mobile app development</li>
      </ul>
      
      <h3>Conclusion</h3>
      <p>Building Neighborly provided valuable insights into real-time application development, community platform design, and modern web technologies. The project demonstrates the power of combining Next.js with Firebase to create engaging, scalable applications that bring communities together.</p>
      
      <p>The complete source code and deployment instructions are available on GitHub, showcasing best practices for modern web development.</p>
    `
  }
];

export async function getBlogPosts(): Promise<BlogPost[]> {
  // In a real implementation, this would fetch from MDX files or a CMS
  return blogPosts.map(({ content, ...post }) => post);
}

export async function getBlogPost(slug: string): Promise<(BlogPost & { content: string }) | null> {
  // In a real implementation, this would fetch and parse MDX content
  const post = blogPosts.find(post => post.slug === slug);
  return post || null;
}

export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  const posts = await getBlogPosts();
  return posts.filter(post => post.category === category);
}

export async function getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
  const posts = await getBlogPosts();
  return posts.filter(post => post.tags.includes(tag));
}