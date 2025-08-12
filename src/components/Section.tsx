import { ReactNode } from "react";

interface SectionProps {
  id: string;
  title: string;
  children: ReactNode;
  subtitle?: string;
  className?: string;
}

export default function Section({ id, title, children, subtitle, className = "" }: SectionProps) {
  return (
    <section id={id} className={`py-16 md:py-24 relative overflow-hidden ${className}`}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/2 via-transparent to-[var(--accent)]/2 opacity-30"></div>
      
      <div className="container relative">
        <div className="scroll-reveal">
          {/* Enhanced section header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-[var(--primary)]"></div>
              <div className="w-2 h-2 bg-[var(--primary)] rounded-full animate-pulse"></div>
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-[var(--primary)]"></div>
            </div>
            
            <h2 className="section-title text-center mb-4">
              {title}
            </h2>
            
            {subtitle && (
              <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}
            
            {/* Decorative underline */}
            <div className="flex justify-center mt-6">
              <div className="w-20 h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-full"></div>
            </div>
          </div>
          
          {/* Content with enhanced spacing */}
          <div className="scroll-reveal-delay">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

