import Link from "next/link";
import data from "@/content/site-data";
import InteractiveTimeline from "@/components/timeline/InteractiveTimeline";

export default function TimelinePage() {
  const timelineItems = data.timeline || [];

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
            Professional Timeline
          </h1>
          
          <p className="text-xl text-[var(--muted)] max-w-3xl mx-auto">
            A comprehensive journey through my education, work experience, projects, certifications, 
            and achievements. Explore my professional growth and skill development over time.
          </p>
        </div>

        {/* Interactive Timeline */}
        <InteractiveTimeline 
          items={timelineItems} 
          showFilters={true} 
          showStats={true} 
        />

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-[var(--foreground)] mb-4">
              Ready to Add to This Timeline?
            </h3>
            <p className="text-[var(--muted)] mb-6">
              I'm always looking for new opportunities to grow, learn, and contribute to exciting projects. 
              Let's discuss how we can work together to create the next chapter in this journey.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/#contact" className="btn btn-primary">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Get in Touch
              </Link>
              <Link href="/#projects" className="btn btn-outline">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12z" clipRule="evenodd" />
                </svg>
                View My Work
              </Link>
              <Link href="/testimonials" className="btn btn-outline">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                Read Reviews
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}