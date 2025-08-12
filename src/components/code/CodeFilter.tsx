"use client";
import { useState } from "react";
import { CodeSnippet } from "@/content/site-data";

interface CodeFilterProps {
  snippets: CodeSnippet[];
  onFilter: (filteredSnippets: CodeSnippet[]) => void;
}

export default function CodeFilter({ snippets, onFilter }: CodeFilterProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");
  const [selectedComplexity, setSelectedComplexity] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Get unique values for filters
  const languages = Array.from(new Set(snippets.map(s => s.language)));
  const complexities = Array.from(new Set(snippets.map(s => s.complexity)));
  const categories = Array.from(new Set(snippets.map(s => s.category)));

  const applyFilters = (language: string, complexity: string, category: string, search: string) => {
    let filtered = snippets;

    // Filter by language
    if (language !== "all") {
      filtered = filtered.filter(snippet => snippet.language === language);
    }

    // Filter by complexity
    if (complexity !== "all") {
      filtered = filtered.filter(snippet => snippet.complexity === complexity);
    }

    // Filter by category
    if (category !== "all") {
      filtered = filtered.filter(snippet => snippet.category === category);
    }

    // Filter by search term
    if (search.trim()) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(snippet => 
        snippet.title.toLowerCase().includes(searchLower) ||
        snippet.description.toLowerCase().includes(searchLower) ||
        snippet.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
        snippet.code.toLowerCase().includes(searchLower)
      );
    }

    onFilter(filtered);
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    applyFilters(language, selectedComplexity, selectedCategory, searchTerm);
  };

  const handleComplexityChange = (complexity: string) => {
    setSelectedComplexity(complexity);
    applyFilters(selectedLanguage, complexity, selectedCategory, searchTerm);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    applyFilters(selectedLanguage, selectedComplexity, category, searchTerm);
  };

  const handleSearchChange = (search: string) => {
    setSearchTerm(search);
    applyFilters(selectedLanguage, selectedComplexity, selectedCategory, search);
  };

  const clearFilters = () => {
    setSelectedLanguage("all");
    setSelectedComplexity("all");
    setSelectedCategory("all");
    setSearchTerm("");
    onFilter(snippets);
  };

  const hasActiveFilters = selectedLanguage !== "all" || selectedComplexity !== "all" || selectedCategory !== "all" || searchTerm.trim() !== "";

  const languageConfig = {
    typescript: { name: "TypeScript", icon: "TS", color: "text-blue-600" },
    javascript: { name: "JavaScript", icon: "JS", color: "text-yellow-600" },
    python: { name: "Python", icon: "PY", color: "text-green-600" },
    css: { name: "CSS", icon: "CSS", color: "text-purple-600" },
    html: { name: "HTML", icon: "HTML", color: "text-orange-600" },
    json: { name: "JSON", icon: "JSON", color: "text-gray-600" }
  };

  const complexityConfig = {
    beginner: { label: "Beginner", icon: "🟢", color: "text-green-600" },
    intermediate: { label: "Intermediate", icon: "🟡", color: "text-yellow-600" },
    advanced: { label: "Advanced", icon: "🔴", color: "text-red-600" }
  };

  return (
    <div className="mb-8">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-[var(--muted)]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search code snippets..."
            className="block w-full pl-10 pr-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--card)] text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
          />
        </div>
      </div>

      {/* Language Filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        <button
          onClick={() => handleLanguageChange("all")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedLanguage === "all"
              ? "bg-[var(--primary)] text-white"
              : "bg-[var(--card)] text-[var(--muted)] hover:bg-[var(--panel)] hover:text-[var(--foreground)]"
          }`}
        >
          All Languages ({snippets.length})
        </button>
        {languages.map((language) => {
          const count = snippets.filter(s => s.language === language).length;
          const config = languageConfig[language as keyof typeof languageConfig] || 
            { name: language.toUpperCase(), icon: language.charAt(0).toUpperCase(), color: "text-gray-600" };
          
          return (
            <button
              key={language}
              onClick={() => handleLanguageChange(language)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                selectedLanguage === language
                  ? "bg-[var(--primary)] text-white"
                  : "bg-[var(--card)] text-[var(--muted)] hover:bg-[var(--panel)] hover:text-[var(--foreground)]"
              }`}
            >
              <span className={`font-bold ${selectedLanguage === language ? 'text-white' : config.color}`}>
                {config.icon}
              </span>
              {config.name} ({count})
            </button>
          );
        })}
      </div>

      {/* Advanced Filters */}
      <div className="flex flex-wrap gap-4 items-center justify-center mb-4">
        {/* Complexity Filter */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-[var(--foreground)]">Complexity:</label>
          <select
            value={selectedComplexity}
            onChange={(e) => handleComplexityChange(e.target.value)}
            className="px-3 py-1 rounded-lg bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          >
            <option value="all">All Levels</option>
            {complexities.map((complexity) => {
              const count = snippets.filter(s => s.complexity === complexity).length;
              const config = complexityConfig[complexity as keyof typeof complexityConfig];
              return (
                <option key={complexity} value={complexity}>
                  {config?.icon} {config?.label || complexity} ({count})
                </option>
              );
            })}
          </select>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-[var(--foreground)]">Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="px-3 py-1 rounded-lg bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => {
              const count = snippets.filter(s => s.category === category).length;
              return (
                <option key={category} value={category}>
                  {category} ({count})
                </option>
              );
            })}
          </select>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="px-3 py-1 text-sm text-[var(--primary)] hover:text-[var(--accent)] transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Clear Filters
          </button>
        )}
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--panel)] rounded-lg border border-[var(--border)]">
            <svg className="w-4 h-4 text-[var(--primary)]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
            </svg>
            <span className="text-sm text-[var(--foreground)]">
              Active filters:
              {selectedLanguage !== "all" && (
                <span className="ml-1 px-2 py-0.5 bg-[var(--primary)]/10 text-[var(--primary)] rounded text-xs">
                  {languageConfig[selectedLanguage as keyof typeof languageConfig]?.name || selectedLanguage}
                </span>
              )}
              {selectedComplexity !== "all" && (
                <span className="ml-1 px-2 py-0.5 bg-[var(--primary)]/10 text-[var(--primary)] rounded text-xs">
                  {complexityConfig[selectedComplexity as keyof typeof complexityConfig]?.label || selectedComplexity}
                </span>
              )}
              {selectedCategory !== "all" && (
                <span className="ml-1 px-2 py-0.5 bg-[var(--primary)]/10 text-[var(--primary)] rounded text-xs">
                  {selectedCategory}
                </span>
              )}
              {searchTerm.trim() && (
                <span className="ml-1 px-2 py-0.5 bg-[var(--primary)]/10 text-[var(--primary)] rounded text-xs">
                  "{searchTerm}"
                </span>
              )}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}