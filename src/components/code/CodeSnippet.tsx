"use client";
import { useState } from "react";
import { CodeSnippet as CodeSnippetType } from "@/content/site-data";

interface CodeSnippetProps {
  snippet: CodeSnippetType;
  showFullCode?: boolean;
}

export default function CodeSnippet({ snippet, showFullCode = false }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(showFullCode);

  const languageConfig = {
    typescript: { name: "TypeScript", color: "bg-blue-500", icon: "TS" },
    javascript: { name: "JavaScript", color: "bg-yellow-500", icon: "JS" },
    python: { name: "Python", color: "bg-green-500", icon: "PY" },
    css: { name: "CSS", color: "bg-purple-500", icon: "CSS" },
    html: { name: "HTML", color: "bg-orange-500", icon: "HTML" },
    json: { name: "JSON", color: "bg-gray-500", icon: "JSON" }
  };

  const config = languageConfig[snippet.language as keyof typeof languageConfig] || 
    { name: snippet.language.toUpperCase(), color: "bg-gray-500", icon: "CODE" };

  const complexityConfig = {
    beginner: { color: "bg-green-500/10 text-green-600 border-green-500/20", label: "Beginner" },
    intermediate: { color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20", label: "Intermediate" },
    advanced: { color: "bg-red-500/10 text-red-600 border-red-500/20", label: "Advanced" }
  };

  const complexityStyle = complexityConfig[snippet.complexity];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const previewCode = snippet.code.split('\n').slice(0, 15).join('\n');
  const displayCode = isExpanded ? snippet.code : previewCode;
  const hasMoreCode = snippet.code.split('\n').length > 15;

  return (
    <div className="card group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-8 h-8 ${config.color} rounded-lg flex items-center justify-center text-white text-xs font-bold`}>
              {config.icon}
            </div>
            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${complexityStyle.color}`}>
              {complexityStyle.label}
            </span>
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-[var(--panel)] text-[var(--foreground)] border border-[var(--border)]">
              {snippet.category}
            </span>
          </div>
          
          <h3 className="text-xl font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors mb-2">
            {snippet.title}
          </h3>
          
          <p className="text-[var(--muted)] leading-relaxed">
            {snippet.description}
          </p>
        </div>

        <button
          onClick={copyToClipboard}
          className="p-2 rounded-lg hover:bg-[var(--panel)] transition-colors"
          title="Copy code"
        >
          {copied ? (
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
            </svg>
          )}
        </button>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {snippet.tags.map((tag) => (
          <span key={tag} className="tag text-xs">
            {tag}
          </span>
        ))}
      </div>

      {/* Code Block */}
      <div className="relative">
        <div className="bg-[var(--panel)] border border-[var(--border)] rounded-lg overflow-hidden">
          {/* Code header */}
          <div className="flex items-center justify-between px-4 py-2 bg-[var(--card)] border-b border-[var(--border)]">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <span className="text-sm text-[var(--muted)] ml-2">
                {config.name}
              </span>
            </div>
            
            <div className="text-xs text-[var(--muted)]">
              {snippet.code.split('\n').length} lines
            </div>
          </div>

          {/* Code content */}
          <div className="relative">
            <pre className="p-4 text-sm overflow-x-auto">
              <code className="text-[var(--foreground)]">
                {displayCode}
              </code>
            </pre>
            
            {!isExpanded && hasMoreCode && (
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[var(--panel)] to-transparent"></div>
            )}
          </div>
        </div>

        {/* Expand/Collapse button */}
        {hasMoreCode && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full mt-2 py-2 text-sm text-[var(--primary)] hover:text-[var(--accent)] transition-colors"
          >
            {isExpanded ? 'Show Less' : `Show More (${snippet.code.split('\n').length - 15} more lines)`}
          </button>
        )}
      </div>

      {/* Performance & Best Practices */}
      {(snippet.performance || snippet.bestPractices.length > 0) && (
        <div className="mt-6 pt-4 border-t border-[var(--border)]">
          {snippet.performance && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-[var(--foreground)] mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                Performance
              </h4>
              <p className="text-sm text-[var(--muted)]">{snippet.performance}</p>
            </div>
          )}

          {snippet.bestPractices.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-[var(--foreground)] mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Best Practices
              </h4>
              <ul className="space-y-1">
                {snippet.bestPractices.map((practice, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-[var(--muted)]">
                    <div className="w-1 h-1 bg-[var(--primary)] rounded-full mt-2 flex-shrink-0"></div>
                    <span>{practice}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-[var(--border)]">
        <div className="text-sm text-[var(--muted)]">
          {new Date(snippet.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
        
        <div className="flex items-center gap-3">
          {snippet.githubUrl && (
            <a
              href={snippet.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--primary)] hover:text-[var(--accent)] transition-colors text-sm font-medium flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
              </svg>
              GitHub
            </a>
          )}
          
          <button
            onClick={copyToClipboard}
            className="text-[var(--muted)] hover:text-[var(--primary)] transition-colors text-sm font-medium flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
            </svg>
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
}