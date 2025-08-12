"use client";
import { useState, useEffect } from "react";
import { Testimonial } from "@/content/site-data";
import TestimonialCard from "./TestimonialCard";

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  interval?: number;
}

export default function TestimonialCarousel({ 
  testimonials, 
  autoPlay = true, 
  interval = 5000 
}: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  useEffect(() => {
    if (!isPlaying || testimonials.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, testimonials.length, interval]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  if (testimonials.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[var(--muted)]">No testimonials available.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Main carousel container */}
      <div className="relative overflow-hidden rounded-2xl">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
              <TestimonialCard testimonial={testimonial} index={0} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation controls */}
      {testimonials.length > 1 && (
        <div className="flex items-center justify-center gap-4 mt-6">
          {/* Previous button */}
          <button
            onClick={goToPrevious}
            className="p-2 rounded-full bg-[var(--card)] border border-[var(--border)] hover:bg-[var(--panel)] transition-colors"
            aria-label="Previous testimonial"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>

          {/* Dots indicator */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex 
                    ? 'bg-[var(--primary)]' 
                    : 'bg-[var(--border)] hover:bg-[var(--muted)]'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Next button */}
          <button
            onClick={goToNext}
            className="p-2 rounded-full bg-[var(--card)] border border-[var(--border)] hover:bg-[var(--panel)] transition-colors"
            aria-label="Next testimonial"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>

          {/* Play/Pause button */}
          <button
            onClick={togglePlayPause}
            className="p-2 rounded-full bg-[var(--card)] border border-[var(--border)] hover:bg-[var(--panel)] transition-colors ml-2"
            aria-label={isPlaying ? "Pause carousel" : "Play carousel"}
          >
            {isPlaying ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
      )}

      {/* Progress bar */}
      {isPlaying && testimonials.length > 1 && (
        <div className="mt-4">
          <div className="w-full bg-[var(--border)] rounded-full h-1">
            <div 
              className="bg-[var(--primary)] h-1 rounded-full transition-all duration-100"
              style={{ 
                width: `${((currentIndex + 1) / testimonials.length) * 100}%` 
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}