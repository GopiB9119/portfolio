"use client";
import { Testimonial } from "@/content/site-data";

interface TestimonialCardProps {
  testimonial: Testimonial;
  index?: number;
}

export default function TestimonialCard({ testimonial, index = 0 }: TestimonialCardProps) {
  const relationshipColors = {
    colleague: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    client: "bg-green-500/10 text-green-600 border-green-500/20",
    mentor: "bg-purple-500/10 text-purple-600 border-purple-500/20",
    peer: "bg-orange-500/10 text-orange-600 border-orange-500/20"
  };

  return (
    <div className={`card group animate-fade-in-up animate-delay-${index * 100 + 300} h-full`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {testimonial.avatar ? (
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-[var(--border)]"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {testimonial.name.charAt(0)}
              </span>
            </div>
          )}
          <div>
            <h3 className="font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
              {testimonial.name}
            </h3>
            <p className="text-sm text-[var(--muted)]">
              {testimonial.role} at {testimonial.company}
            </p>
          </div>
        </div>
        
        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${relationshipColors[testimonial.relationship]}`}>
          {testimonial.relationship}
        </span>
      </div>

      {/* Quote */}
      <div className="relative mb-6">
        <svg 
          className="absolute -top-2 -left-2 w-8 h-8 text-[var(--primary)]/20" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
        </svg>
        <blockquote className="text-[var(--muted)] leading-relaxed italic pl-6">
          "{testimonial.content}"
        </blockquote>
      </div>

      {/* Skills mentioned */}
      {testimonial.skills && testimonial.skills.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-semibold text-[var(--foreground)] mb-2">Skills mentioned:</p>
          <div className="flex flex-wrap gap-1">
            {testimonial.skills.slice(0, 4).map((skill) => (
              <span key={skill} className="tag text-xs">
                {skill}
              </span>
            ))}
            {testimonial.skills.length > 4 && (
              <span className="text-xs text-[var(--muted)] italic">
                +{testimonial.skills.length - 4} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--border)]">
        <span className="text-sm text-[var(--muted)]">
          {new Date(testimonial.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long'
          })}
        </span>
        
        <div className="flex items-center gap-2">
          {testimonial.rating && (
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < testimonial.rating! 
                      ? 'text-yellow-400' 
                      : 'text-[var(--border)]'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          )}
          
          {testimonial.linkedinUrl && (
            <a
              href={testimonial.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--primary)] hover:text-[var(--accent)] transition-colors"
              aria-label={`View ${testimonial.name}'s LinkedIn profile`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}