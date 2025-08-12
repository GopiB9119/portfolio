"use client";
import { useState } from "react";
import { CodeSnippet } from "@/content/site-data";
import CodeCard from "./CodeCard";
import CodeFilter from "./CodeFilter";

interface CodeGridProps {
  snippets: CodeSnippet[];
  showFilters?: boolean;
  itemsPerPage?: number;
}

export default function CodeGrid({ 
  snippets, 
  showFilters = true, 
  itemsPerPage = 9 
}: CodeGridProps) {
  const [filteredSnippets, setFilteredSnippets] = useState(snippets);
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination
  const totalPages = Math.ceil(filteredSnippets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSnippets = filteredSnippets.slice(startIndex, startIndex + itemsPerPage);

  const handleFilter = (filtered: CodeSnippet[]) => {
    setFilteredSnippets(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of grid
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (snippets.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-[var(--panel)] rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-[var(--muted)]" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">No Code Snippets Yet</h3>
        <p className="text-[var(--muted)]">Code examples and snippets will appear here when available.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Filters */}
      {showFilters && (
        <CodeFilter snippets={snippets} onFilter={handleFilter} />
      )}

      {/* Results count */}
      <div className="text-center mb-8">
        <p className="text-[var(--muted)]">
          Showing {paginatedSnippets.length} of {filteredSnippets.length} code snippets
          {filteredSnippets.length !== snippets.length && ` (filtered from ${snippets.length} total)`}
        </p>
      </div>

      {/* Grid */}
      {filteredSnippets.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {paginatedSnippets.map((snippet, index) => (
            <CodeCard 
              key={snippet.id} 
              snippet={snippet} 
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-[var(--panel)] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-[var(--muted)]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">No Results Found</h3>
          <p className="text-[var(--muted)]">
            No code snippets match your current filters. Try adjusting your search criteria.
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg bg-[var(--card)] border border-[var(--border)] hover:bg-[var(--panel)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous page"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>

          {/* Page numbers */}
          {[...Array(Math.min(totalPages, 5))].map((_, index) => {
            let page;
            if (totalPages <= 5) {
              page = index + 1;
            } else if (currentPage <= 3) {
              page = index + 1;
            } else if (currentPage >= totalPages - 2) {
              page = totalPages - 4 + index;
            } else {
              page = currentPage - 2 + index;
            }

            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === page
                    ? "bg-[var(--primary)] text-white"
                    : "bg-[var(--card)] text-[var(--muted)] hover:bg-[var(--panel)] hover:text-[var(--foreground)]"
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg bg-[var(--card)] border border-[var(--border)] hover:bg-[var(--panel)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Next page"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}