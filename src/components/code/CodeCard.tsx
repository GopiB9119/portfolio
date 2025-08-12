"use client";
import { CodeSnippet } from "@/content/site-data";
import Link from "next/link";

interface CodeCardProps {
  snippet: CodeSnippet;
  index?: number;
}

export default function CodeCard({ snippet, index = 0 }: CodeCardProps) {
  const languageConfig = {
    typescript: { name: "TypeScript", color: "bg-blue-500", textColor: "text-blue-600", bgColor: "bg-blue-500/10", borderColor: "border-blue-500/20" },
    javascript: { name: "JavaScript", color: "bg-yellow-500", textColor: "text-yellow-600", bgColor: "bg-yellow-500/10", borderColor: "border-yellow-500/20" },
    python: { name: "Python", color: "bg-green-500", textColor: "text-green-600", bgColor: "bg-green-500/10", borderColor: "border-green-500/20" },
    css: { name: "CSS", color: "bg-purple-500", textColor: "text-purple-600", bgColor: "bg-purple-500/10", borderColor: "border-purple-500/20" },
    html: { name: "HTML", color: "bg-orange-500", textColor: "text-orange-600", bgColor: "bg-orange-500/10", borderColor: "border-orange-500/20" },
    json: { name: "JSON", color: "bg-gray-500", textColor: "text-gray-600", bgColor: "bg-gray-500/10", borderColor: "border-gray-500/20" }
  };

  const config = languageConfig[snippet.language as keyof typeof languageConfig] || 
    { name: snippet.language.toUpperCase(), color: "bg-gray-500", textColor: "text-gray-600", bgColor: "bg-gray-500/10", borderColor: "border-gray-500/20" };

  const complexityConfig = {
    beginner: { color: "bg-green-500/10 text-green-600 border-green-500/20", label: "Beginner", icon: "🟢" },
    intermediate: { color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20", label: "Intermediate", icon: "🟡" },
    advanced: { color: "bg-red-500/10 text-red-600 border-red-500/20", label: "Advanced", icon: "🔴" }
  };

  const complexityStyle = complexityConfig[snippet.complexity];
  const linesOfCode = snippet.code.split('\n').length;
  const previewLines = snippet.code.split('\n').slice(0, 8).join('\n');

  return (
    <article className={`card group animate-fade-in-up animate-delay-${index * 100 + 300} h-full flex flex-col`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 ${config.color} rounded-xl flex items-center justify-center text-white text-sm font-bold`}>
            {snippet.language.charAt(0).toUpperCase()}
          </div>
          <div>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.bgColor} ${config.textColor} border ${config.borderColor}`}>
              {config.name}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${complexityStyle.color}`}>
            {complexityStyle.icon} {complexityStyle.label}
          </span>
        </div>
      </div>

      {/* Title and Description */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-[var(--foreground)] mb-2 group-hover:text-[var(--primary)] transition-colors">
          {snippet.title}
        </h3>
        
        <p className="text-[var(--muted)] leading-relaxed text-sm">
          {snippet.description}
        </p>
      </div>

      {/* Category and Stats */}
      <div className="flex items-center justify-between mb-4 text-sm">
        <span className="px-2 py-1 bg-[var(--panel)] text-[var(--foreground)] rounded-full border border-[var(--border)]">
          {snippet.category}
        </span>
        
        <div className="flex items-center gap-3 text-[var(--muted)]">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12z" clipRule="evenodd" />
            </svg>
            {linesOfCode} lines
          </div>
          
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            {new Date(snippet.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
          </div>
        </div>
      </div>

      {/* Code Preview */}
      <div className="mb-4 flex-1">
        <div className="bg-[var(--panel)] border border-[var(--border)] rounded-lg overflow-hidden">
          <div className="px-3 py-2 bg-[var(--card)] border-b border-[var(--border)] flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            </div>
            <span className="text-xs text-[var(--muted)]">Preview</span>
          </div>
          
          <div className="relative">
            <pre className="p-3 text-xs overflow-hidden">
              <code className="text-[var(--foreground)]">
                {previewLines}
              </code>
            </pre>
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-[var(--panel)] to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-4">
        {snippet.tags.slice(0, 4).map((tag) => (
          <span key={tag} className="tag text-xs">
            {tag}
          </span>
        ))}
        {snippet.tags.length > 4 && (
          <span className="text-xs text-[var(--muted)] italic">
            +{snippet.tags.length - 4} more
          </span>
        )}
      </div>

      {/* Performance Highlight */}
      {snippet.performance && (
        <div className="mb-4 p-3 bg-green-500/5 border border-green-500/20 rounded-lg">
          <div className="flex items-start gap-2">
            <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            <p className="text-xs text-green-600 leading-relaxed">
              {snippet.performance.length > 80 
                ? snippet.performance.substring(0, 80) + "..." 
                : snippet.performance}
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-2">
          {snippet.githubUrl && (
            <a
              href={snippet.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--muted)] hover:text-[var(--primary)] transition-colors"
              title="View on GitHub"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
              </svg>
            </a>
          )}
        </div>
        
        <Link 
          href={`/code/${snippet.id}`}
          className="btn btn-outline btn-sm"
        >
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
          </svg>
          View Code
        </Link>
      </div>
    </article>
  );
}