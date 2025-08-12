import Link from "next/link";
import data from "@/content/site-data";
import TestimonialGrid from "@/components/testimonials/TestimonialGrid";

export default function TestimonialsPage() {
  const testimonials = data.testimonials || [];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="container py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <Link 
            href="/" 
            className="btn btn-outline mb-6"
            aria-label="Back to portfolio"
          >
            ← Back to Portfolio
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-6">
            Testimonials & Recommendations
          </h1>
          
          <p className="text-xl text-[var(--muted)] max-w-3xl mx-auto">
            Feedback and recommendations from colleagues, clients, mentors, and peers I've had the 
            privilege of working with throughout my career.
          </p>
        </div>

        {/* Stats Overview */}
        {testimonials.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="card text-center p-6">
              <div className="text-3xl font-bold text-[var(--primary)] mb-2">
                {testimonials.length}
              </div>
              <div className="text-sm text-[var(--muted)]">Total Testimonials</div>
            </div>
            
            <div className="card text-center p-6">
              <div className="text-3xl font-bold text-[var(--primary)] mb-2">
                {testimonials.filter(t => t.relationship === 'client').length}
              </div>
              <div className="text-sm text-[var(--muted)]">Client Reviews</div>
            </div>
            
            <div className="card text-center p-6">
              <div className="text-3xl font-bold text-[var(--primary)] mb-2">
                {testimonials.filter(t => t.relationship === 'colleague').length}
              </div>
              <div className="text-sm text-[var(--muted)]">Colleague Endorsements</div>
            </div>
            
            <div className="card text-center p-6">
              <div className="text-3xl font-bold text-[var(--primary)] mb-2">
                {testimonials.filter(t => t.rating && t.rating >= 4).length}
              </div>
              <div className="text-sm text-[var(--muted)]">4+ Star Reviews</div>
            </div>
          </div>
        )}

        {/* Skills Mentioned */}
        {testimonials.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-[var(--foreground)] text-center mb-8">
              Skills & Qualities Highlighted
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {Array.from(new Set(testimonials.flatMap(t => t.skills)))
                .sort((a, b) => {
                  const countA = testimonials.filter(t => t.skills.includes(a)).length;
                  const countB = testimonials.filter(t => t.skills.includes(b)).length;
                  return countB - countA;
                })
                .slice(0, 12)
                .map((skill, index) => {
                  const count = testimonials.filter(t => t.skills.includes(skill)).length;
                  return (
                    <div key={skill} className={`group relative animate-fade-in-up animate-delay-${index * 50 + 300}`}>
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-full opacity-0 group-hover:opacity-100 transition duration-300 blur"></div>
                      <span className="relative tag bg-[var(--card)] hover:bg-[var(--panel)] px-4 py-2 text-sm font-medium cursor-default">
                        {skill} ({count})
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* Testimonials Grid */}
        <TestimonialGrid testimonials={testimonials} />

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-[var(--foreground)] mb-4">
              Want to Work Together?
            </h3>
            <p className="text-[var(--muted)] mb-6">
              I'm always interested in new opportunities and exciting projects. 
              Let's discuss how we can create something amazing together.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/#contact" className="btn btn-primary">
                Get in Touch
              </Link>
              <Link href="/#projects" className="btn btn-outline">
                View My Work
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}