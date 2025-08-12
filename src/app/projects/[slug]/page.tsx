import data from "@/content/site-data";
import Link from "next/link";

export async function generateStaticParams() {
  return (data.projects || [])
    .filter((p) => p.slug)
    .map((p) => ({ slug: p.slug! }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = (data.projects || []).find((p) => p.slug === slug);
  
  if (!project) {
    return (
      <div className="min-h-screen bg-[var(--background)]">
        <div className="container py-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[var(--foreground)] mb-4">Project Not Found</h1>
            <p className="text-[var(--muted)] mb-8">The project you're looking for doesn't exist.</p>
            <Link className="btn btn-primary" href="/#projects">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Projects
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="container py-20">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <Link 
              href="/#projects" 
              className="btn btn-outline"
              aria-label="Back to projects"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Projects
            </Link>
            {project.featured && (
              <span className="px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-medium rounded-full border border-[var(--primary)]/20">
                Featured Project
              </span>
            )}
            {project.category && (
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                project.category === 'Frontend' ? 'bg-blue-500/10 text-blue-600 border border-blue-500/20' :
                project.category === 'Full-Stack' ? 'bg-green-500/10 text-green-600 border border-green-500/20' :
                project.category === 'Backend' ? 'bg-orange-500/10 text-orange-600 border border-orange-500/20' :
                project.category === 'Mobile' ? 'bg-purple-500/10 text-purple-600 border border-purple-500/20' :
                'bg-gray-500/10 text-gray-600 border border-gray-500/20'
              }`}>
                {project.category}
              </span>
            )}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-6">
            {project.name}
          </h1>
          
          <p className="text-xl text-[var(--muted)] leading-relaxed mb-8 max-w-3xl">
            {project.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            {project.demo && (
              <a
                className="btn btn-primary"
                href={project.demo}
                target="_blank"
                rel="noreferrer"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                </svg>
                View Live Demo
              </a>
            )}
            {project.source && (
              <a
                className="btn btn-outline"
                href={project.source}
                target="_blank"
                rel="noreferrer"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                View Source Code
              </a>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Project Details */}
            {project.details && (
              <section>
                <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Project Overview</h2>
                <div className="prose prose-lg max-w-none text-[var(--muted)] leading-relaxed">
                  <div dangerouslySetInnerHTML={{ __html: project.details.replace(/\n/g, '<br />') }} />
                </div>
              </section>
            )}

            {/* Technical Architecture */}
            {project.architecture && (
              <section>
                <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Technical Architecture</h2>
                <div className="card p-6">
                  <p className="text-[var(--muted)] leading-relaxed">{project.architecture}</p>
                </div>
              </section>
            )}

            {/* Key Features */}
            {project.highlights && project.highlights.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Key Features</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.highlights.map((highlight, index) => (
                    <div key={index} className="card p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-[var(--primary)] rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-[var(--muted)] text-sm leading-relaxed">{highlight}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Impact */}
            {project.impact && (
              <section>
                <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Project Impact</h2>
                <div className="card p-6 bg-gradient-to-r from-[var(--primary)]/5 to-[var(--accent)]/5 border border-[var(--primary)]/20">
                  <p className="text-[var(--muted)] leading-relaxed">{project.impact}</p>
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Technology Stack */}
            {project.tech && project.tech.length > 0 && (
              <div className="card p-6">
                <h3 className="text-lg font-bold text-[var(--foreground)] mb-4">Technology Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Project Info */}
            <div className="card p-6">
              <h3 className="text-lg font-bold text-[var(--foreground)] mb-4">Project Info</h3>
              <div className="space-y-3">
                {project.category && (
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--muted)] text-sm">Category</span>
                    <span className="text-[var(--foreground)] font-medium">{project.category}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-[var(--muted)] text-sm">Status</span>
                  <span className="text-green-600 font-medium">Completed</span>
                </div>
                {project.featured && (
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--muted)] text-sm">Featured</span>
                    <span className="text-[var(--primary)] font-medium">Yes</span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Links */}
            <div className="card p-6">
              <h3 className="text-lg font-bold text-[var(--foreground)] mb-4">Quick Links</h3>
              <div className="space-y-3">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 text-[var(--muted)] hover:text-[var(--primary)] transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                    </svg>
                    Live Demo
                  </a>
                )}
                {project.source && (
                  <a
                    href={project.source}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 text-[var(--muted)] hover:text-[var(--primary)] transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Source Code
                  </a>
                )}
                <Link
                  href="/#projects"
                  className="flex items-center gap-3 text-[var(--muted)] hover:text-[var(--primary)] transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  All Projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

