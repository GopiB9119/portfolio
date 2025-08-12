"use client";
import { useState } from "react";
import { Testimonial } from "@/content/site-data";
import TestimonialCard from "./TestimonialCard";

interface TestimonialGridProps {
  testimonials: Testimonial[];
  showFilters?: boolean;
  itemsPerPage?: number;
}

export default function TestimonialGrid({ 
  testimonials, 
  showFilters = true, 
  itemsPerPage = 6 
}: TestimonialGridProps) {
  const [selectedRelationship, setSelectedRelationship] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Get unique relationships for filtering
  const relationships = Array.from(new Set(testimonials.map(t => t.relationship)));

  // Filter testimonials
  const filteredTestimonials = selectedRelationship === "all" 
    ? testimonials 
    : testimonials.filter(t => t.relationship === selectedRelationship);

  // Pagination
  const totalPages = Math.ceil(filteredTestimonials.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTestimonials = filteredTestimonials.slice(startIndex, startIndex + itemsPerPage);

  const handleRelationshipFilter = (relationship: string) => {
    setSelectedRelationship(relationship);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (testimonials.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-[var(--panel)] rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-[var(--muted)]" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">No Testimonials Yet</h3>
        <p className="text-[var(--muted)]">Testimonials from colleagues and clients will appear here.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Filters */}
      {showFilters && relationships.length > 1 && (
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => handleRelationshipFilter("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedRelationship === "all"
                  ? "bg-[var(--primary)] text-white"
                  : "bg-[var(--card)] text-[var(--muted)] hover:bg-[var(--panel)] hover:text-[var(--foreground)]"
              }`}
            >
              All ({testimonials.length})
            </button>
            {relationships.map((relationship) => {
              const count = testimonials.filter(t => t.relationship === relationship).length;
              return (
                <button
                  key={relationship}
                  onClick={() => handleRelationshipFilter(relationship)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
                    selectedRelationship === relationship
                      ? "bg-[var(--primary)] text-white"
                      : "bg-[var(--card)] text-[var(--muted)] hover:bg-[var(--panel)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {relationship}s ({count})
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Results count */}
      <div className="text-center mb-6">
        <p className="text-[var(--muted)]">
          Showing {paginatedTestimonials.length} of {filteredTestimonials.length} testimonials
          {selectedRelationship !== "all" && ` from ${selectedRelationship}s`}
        </p>
      </div>

      {/* Grid */}
      {filteredTestimonials.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {paginatedTestimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={testimonial.id} 
              testimonial={testimonial} 
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
            No testimonials found for "{selectedRelationship}". Try a different filter.
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

          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
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