import Header from "@/components/Header";
import Section from "@/components/Section";
import data from "@/content/site-data";
import ContactForm from "@/components/ContactForm";
import ChatWidget from "@/components/ChatWidget";
import TestimonialCarousel from "@/components/testimonials/TestimonialCarousel";
import TimelineItem from "@/components/timeline/TimelineItem";
import AnimationWrapper from "@/components/AnimationWrapper";


export default function Home() {
  return (
    <AnimationWrapper>
      <div className="font-sans min-h-screen">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Header />

      <main id="main-content" role="main">
        <section className="py-20 md:py-32 relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 via-transparent to-[var(--accent)]/5"></div>

          <div className="container relative">
            <div className="grid gap-12 lg:grid-cols-[1fr_auto] items-center">
              <div className="animate-slide-in-left">
                <p className="kicker animate-fade-in animate-delay-200">Hello, I am</p>
                <h1 className="hero-name animate-fade-in-up animate-delay-300">{data.name}</h1>
                <p className="hero-title animate-fade-in animate-delay-400">{data.title}</p>
                {data.location && (
                  <div className="flex items-center gap-2 text-[var(--muted)] mb-6 animate-fade-in animate-delay-500">
                    <svg className="w-4 h-4 icon-location icon-hover" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span>{data.location}</span>
                  </div>
                )}

                <div className="flex flex-wrap gap-3 mt-8 animate-fade-in animate-delay-600">
                  {data.links?.filter(l => l.label !== "Phone").map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="btn interactive-element hover-glow"
                    >
                      {l.label === "GitHub" && (
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                        </svg>
                      )}
                      {l.label}
                    </a>
                  ))}
                  
                  {data.resumeUrl && (
                    <a
                      className="btn btn-primary interactive-element hover-glow pulse-attention"
                      href={data.resumeUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Download Resume
                    </a>
                  )}
                </div>
              </div>

              {data.avatarUrl && (
                <div className="scroll-reveal-right">
                  <div className="relative group hover-glow">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                    <img
                      src="/profile.jpg"
                      alt={`${data.name} avatar`}
                      className="relative w-48 h-48 md:w-80 md:h-80 rounded-2xl object-cover shadow-2xl group-hover:scale-105 transition-transform duration-300 animate-float"
                      loading="lazy"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <Section 
          id="about" 
          title="About Me" 
          subtitle="Passionate full-stack developer with expertise in modern web technologies and a focus on creating impactful digital solutions."
        >
          <div className="grid lg:grid-cols-[2fr_1fr] gap-12 items-start">
            <div className="scroll-reveal-left">
              {data.summaryHtml && (
                <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: data.summaryHtml }} />
              )}
            </div>

            <div className="scroll-reveal-right">
              <div className="card p-6 hover-lift">
                <h3 className="font-bold text-lg mb-4 text-[var(--foreground)]">Quick Facts</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[var(--primary)] rounded-full"></div>
                    <span className="text-[var(--muted)]">Based in {data.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[var(--accent)] rounded-full"></div>
                    <span className="text-[var(--muted)]">Full-Stack Developer</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[var(--success)] rounded-full"></div>
                    <span className="text-[var(--muted)]">AI/ML Enthusiast</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[var(--warning)] rounded-full"></div>
                    <span className="text-[var(--muted)]">Open to Opportunities</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section 
          id="experience" 
          title="Professional Experience" 
          subtitle="My journey through various roles and projects, building expertise in full-stack development and modern technologies."
        >
          <div className="grid gap-8 stagger-children">
            {data.experience?.map((exp, index) => (
              <div key={exp.role + exp.company} className="card card-elevated hover-lift interactive-element">
                <div className="card-header">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="card-title text-2xl mb-2">{exp.role}</h3>
                      <div className="flex items-center gap-3 card-subtitle">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 icon-experience icon-hover text-[var(--primary)]" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="font-semibold text-[var(--foreground)]">{exp.company}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[var(--muted)] bg-[var(--panel)] px-4 py-2 rounded-full border border-[var(--border)] hover:border-[var(--primary)] transition-colors">
                      <svg className="w-4 h-4 text-[var(--primary)]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">{exp.period}</span>
                    </div>
                  </div>
                </div>
                <div className="card-content">
                  <p className="text-[var(--muted)] leading-relaxed text-base">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {data.testimonials && data.testimonials.length > 0 && (
          <Section id="testimonials" title="What People Say">
            <div className="text-center mb-12">
              <p className="text-[var(--muted)] text-lg max-w-2xl mx-auto">
                Feedback from colleagues, clients, and collaborators I've had the pleasure of working with
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <TestimonialCarousel testimonials={data.testimonials} />
            </div>

            {/* Social proof stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center animate-fade-in-up animate-delay-300">
                <div className="text-2xl font-bold text-[var(--primary)] mb-2">
                  {data.testimonials.length}
                </div>
                <div className="text-sm text-[var(--muted)]">Testimonials</div>
              </div>
              
              <div className="text-center animate-fade-in-up animate-delay-400">
                <div className="text-2xl font-bold text-[var(--primary)] mb-2">
                  {data.testimonials.filter(t => t.relationship === 'client').length}
                </div>
                <div className="text-sm text-[var(--muted)]">Happy Clients</div>
              </div>
              
              <div className="text-center animate-fade-in-up animate-delay-500">
                <div className="text-2xl font-bold text-[var(--primary)] mb-2">
                  {data.testimonials.filter(t => t.relationship === 'colleague').length}
                </div>
                <div className="text-sm text-[var(--muted)]">Colleagues</div>
              </div>
              
              <div className="text-center animate-fade-in-up animate-delay-600">
                <div className="text-2xl font-bold text-[var(--primary)] mb-2">
                  {Math.round(data.testimonials.reduce((acc, t) => acc + (t.rating || 5), 0) / data.testimonials.length * 10) / 10}
                </div>
                <div className="text-sm text-[var(--muted)]">Avg Rating</div>
              </div>
            </div>

            {/* Skills mentioned across testimonials */}
            <div className="mt-12">
              <h3 className="text-lg font-bold text-[var(--foreground)] text-center mb-6">
                Skills Highlighted by Others
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {Array.from(new Set(data.testimonials.flatMap(t => t.skills))).slice(0, 8).map((skill, index) => (
                  <span key={skill} className={`tag animate-fade-in animate-delay-${index * 50 + 700}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </Section>
        )}

        {data.timeline && data.timeline.length > 0 && (
          <Section id="timeline-preview" title="Professional Journey">
            <div className="text-center mb-12">
              <p className="text-[var(--muted)] text-lg max-w-2xl mx-auto">
                A glimpse into my professional timeline - from education to current projects. 
                Explore my complete journey of growth and achievements.
              </p>
            </div>

            {/* Timeline Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="text-center animate-fade-in-up animate-delay-300">
                <div className="text-2xl font-bold text-[var(--primary)] mb-2">
                  {data.timeline.length}
                </div>
                <div className="text-sm text-[var(--muted)]">Timeline Items</div>
              </div>
              
              <div className="text-center animate-fade-in-up animate-delay-400">
                <div className="text-2xl font-bold text-[var(--primary)] mb-2">
                  {data.timeline.filter(t => t.current).length}
                </div>
                <div className="text-sm text-[var(--muted)]">Current Activities</div>
              </div>
              
              <div className="text-center animate-fade-in-up animate-delay-500">
                <div className="text-2xl font-bold text-[var(--primary)] mb-2">
                  {data.timeline.filter(t => t.type === 'project').length}
                </div>
                <div className="text-sm text-[var(--muted)]">Major Projects</div>
              </div>
              
              <div className="text-center animate-fade-in-up animate-delay-600">
                <div className="text-2xl font-bold text-[var(--primary)] mb-2">
                  {Array.from(new Set(data.timeline.flatMap(t => t.skills))).length}
                </div>
                <div className="text-sm text-[var(--muted)]">Skills Developed</div>
              </div>
            </div>

            {/* Recent Timeline Items Preview */}
            <div className="max-w-4xl mx-auto mb-8">
              <h3 className="text-lg font-bold text-[var(--foreground)] text-center mb-8">
                Recent Milestones
              </h3>
              <div className="space-y-6">
                {data.timeline
                  .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
                  .slice(0, 3)
                  .map((item, index) => (
                    <div key={item.id} className={`card animate-fade-in-up animate-delay-${index * 100 + 300}`}>
                      <div className="flex items-start gap-4">
                        {/* Timeline dot */}
                        <div className="flex-shrink-0 mt-1">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                            item.type === 'work' ? 'bg-blue-500' :
                            item.type === 'education' ? 'bg-green-500' :
                            item.type === 'project' ? 'bg-purple-500' :
                            item.type === 'certification' ? 'bg-yellow-500' :
                            'bg-orange-500'
                          }`}>
                            {item.type === 'work' ? '💼' :
                             item.type === 'education' ? '🎓' :
                             item.type === 'project' ? '🚀' :
                             item.type === 'certification' ? '🏆' : '⭐'}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-bold text-[var(--foreground)] mb-1">
                                {item.title}
                              </h4>
                              <p className="text-[var(--primary)] font-semibold text-sm">
                                {item.organization}
                              </p>
                            </div>
                            <div className="text-right">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                item.type === 'work' ? 'bg-blue-500/10 text-blue-600 border border-blue-500/20' :
                                item.type === 'education' ? 'bg-green-500/10 text-green-600 border border-green-500/20' :
                                item.type === 'project' ? 'bg-purple-500/10 text-purple-600 border border-purple-500/20' :
                                item.type === 'certification' ? 'bg-yellow-500/10 text-yellow-600 border border-yellow-500/20' :
                                'bg-orange-500/10 text-orange-600 border border-orange-500/20'
                              }`}>
                                {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                              </span>
                              {item.current && (
                                <div className="text-xs text-green-600 font-medium mt-1">Current</div>
                              )}
                            </div>
                          </div>
                          
                          <p className="text-[var(--muted)] text-sm leading-relaxed mb-3">
                            {item.description.length > 120 
                              ? item.description.substring(0, 120) + "..." 
                              : item.description}
                          </p>

                          {/* Skills preview */}
                          <div className="flex flex-wrap gap-1">
                            {item.skills.slice(0, 4).map((skill) => (
                              <span key={skill} className="tag text-xs">
                                {skill}
                              </span>
                            ))}
                            {item.skills.length > 4 && (
                              <span className="text-xs text-[var(--muted)] italic">
                                +{item.skills.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="text-center">
              <a href="/timeline" className="btn btn-primary">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                View Complete Timeline
              </a>
            </div>
          </Section>
        )}

        <Section 
          id="projects" 
          title="Featured Projects" 
          subtitle="A showcase of my recent work, demonstrating expertise in full-stack development, real-time applications, and modern web technologies."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
            {data.projects?.map((p, index) => (
              <article key={p.name} className={`card card-elevated group hover-lift hover-glow interactive-element relative overflow-hidden ${p.featured ? 'ring-2 ring-[var(--primary)]/30 hover:ring-[var(--primary)]/60' : ''}`}>
                {/* Featured badge */}
                {p.featured && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      ⭐ Featured
                    </div>
                  </div>
                )}

                {/* Project header */}
                <div className="card-header">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary)]/20 to-[var(--accent)]/20 rounded-xl flex items-center justify-center border border-[var(--border)] group-hover:border-[var(--primary)]/50 transition-colors">
                          {p.category === 'Frontend' ? (
                            <svg className="w-6 h-6 icon-projects icon-hover text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                          ) : p.category === 'Full-Stack' ? (
                            <svg className="w-6 h-6 icon-projects icon-hover text-green-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <svg className="w-6 h-6 icon-projects icon-hover text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[var(--success)] rounded-full border-2 border-[var(--background)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      
                      <div>
                        <h3 className="card-title text-xl mb-1 group-hover:text-[var(--primary)] transition-colors duration-300">
                          {p.name}
                        </h3>
                        {p.category && (
                          <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border transition-all duration-300 ${
                            p.category === 'Frontend' ? 'bg-blue-500/10 text-blue-600 border-blue-500/30 hover:bg-blue-500/20' :
                            p.category === 'Full-Stack' ? 'bg-green-500/10 text-green-600 border-green-500/30 hover:bg-green-500/20' :
                            p.category === 'Backend' ? 'bg-orange-500/10 text-orange-600 border-orange-500/30 hover:bg-orange-500/20' :
                            p.category === 'Mobile' ? 'bg-purple-500/10 text-purple-600 border-purple-500/30 hover:bg-purple-500/20' :
                            'bg-gray-500/10 text-gray-600 border-gray-500/30 hover:bg-gray-500/20'
                          }`}>
                            {p.category}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project content */}
                <div className="card-content mb-6">
                  <p className="text-[var(--muted)] leading-relaxed mb-4 text-base">{p.description}</p>

                  {p.highlights && p.highlights.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-bold text-[var(--foreground)] mb-3 flex items-center gap-2">
                        <div className="w-4 h-4 bg-[var(--primary)]/20 rounded flex items-center justify-center">
                          <div className="w-2 h-2 bg-[var(--primary)] rounded-full"></div>
                        </div>
                        Key Features
                      </h4>
                      <ul className="space-y-2">
                        {p.highlights.slice(0, 3).map((highlight, hIndex) => (
                          <li key={hIndex} className="flex items-start gap-3 text-sm text-[var(--muted)]">
                            <div className="w-1.5 h-1.5 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-full mt-2 flex-shrink-0"></div>
                            <span className="leading-relaxed">{highlight}</span>
                          </li>
                        ))}
                        {p.highlights.length > 3 && (
                          <li className="text-xs text-[var(--muted)] italic pl-5">
                            +{p.highlights.length - 3} more features...
                          </li>
                        )}
                      </ul>
                    </div>
                  )}

                  {/* Tech stack */}
                  {p.tech && p.tech.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-bold text-[var(--foreground)] mb-3 flex items-center gap-2">
                        <div className="w-4 h-4 bg-[var(--accent)]/20 rounded flex items-center justify-center">
                          <div className="w-2 h-2 bg-[var(--accent)] rounded-full"></div>
                        </div>
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {p.tech.map((t, techIndex) => (
                          <span key={t} className="tag hover:scale-105 transition-transform duration-200">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Project actions */}
                <div className="card-footer">
                  <div className="flex flex-wrap gap-3 project-buttons">
                    {p.slug && (
                      <a
                        className="btn btn-outline flex-1 justify-center group/btn"
                        href={`/projects/${p.slug}`}
                      >
                        <svg className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                        View Details
                      </a>
                    )}
                    {p.demo && (
                      <a
                        className="btn btn-outline flex-1 justify-center group/btn"
                        href={p.demo}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <svg className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                        </svg>
                        Live Demo
                      </a>
                    )}
                    {p.source && (
                      <a
                        className="btn btn-primary flex-1 justify-center group/btn"
                        href={p.source}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <svg className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        Source Code
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section 
          id="skills" 
          title="Technical Skills" 
          subtitle="A comprehensive overview of the technologies, frameworks, and tools I use to build modern web applications."
        >
          <div className="grid gap-8">
            <div className="text-center mb-4 scroll-reveal">
              <p className="text-[var(--muted)] text-lg">Technologies and tools I work with</p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 stagger-children">
              {data.skills?.map((s, index) => (
                <div
                  key={s}
                  className="group relative interactive-element"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-full opacity-0 group-hover:opacity-100 transition duration-300 blur"></div>
                  <span className="relative tag bg-[var(--card)] hover:bg-[var(--panel)] px-4 py-2 text-sm font-medium cursor-default">
                    {s}
                  </span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 stagger-children">
              <div className="text-center p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover-lift interactive-element">
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 icon-frontend icon-hover" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-bold text-[var(--foreground)] mb-2">Frontend</h3>
                <p className="text-sm text-[var(--muted)]">React, Next.js, HTML5, CSS3, Tailwind CSS</p>
              </div>

              <div className="text-center p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover-lift interactive-element">
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 icon-backend icon-hover" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-bold text-[var(--foreground)] mb-2">Backend</h3>
                <p className="text-sm text-[var(--muted)]">Node.js, Python, Java, MongoDB</p>
              </div>

              <div className="text-center p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] animate-fade-in-up animate-delay-800">
                <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 icon-tools icon-hover" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-bold text-[var(--foreground)] mb-2">Tools & Cloud</h3>
                <p className="text-sm text-[var(--muted)]">Git/GitHub, Azure, Databricks, CI/CD</p>
              </div>
            </div>
          </div>
        </Section>

        {data.blog?.enabled && (
          <Section id="blog-preview" title="Latest Articles">
            <div className="text-center mb-8">
              <p className="text-[var(--muted)] text-lg">
                Sharing insights, tutorials, and case studies from my development journey
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {/* Featured blog posts preview - these would be fetched from the blog */}
              <article className="card group animate-fade-in-up animate-delay-300">
                <div className="flex items-start justify-between mb-4">
                  <span className="px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-medium rounded-full border border-[var(--primary)]/20">
                    Next.js
                  </span>
                  <span className="text-xs text-[var(--muted)]">8 min read</span>
                </div>

                <h3 className="text-xl font-bold text-[var(--foreground)] mb-3 group-hover:text-[var(--primary)] transition-colors">
                  Getting Started with Next.js 15
                </h3>

                <p className="text-[var(--muted)] leading-relaxed mb-4">
                  Learn how to build modern web applications with Next.js 15, covering App Router, Server Components, and performance optimization.
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="tag text-xs">Next.js</span>
                  <span className="tag text-xs">React</span>
                  <span className="tag text-xs">Tutorial</span>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <span className="text-sm text-[var(--muted)]">Jan 15, 2024</span>
                  <span className="text-[var(--primary)] text-sm font-medium">Read More →</span>
                </div>
              </article>

              <article className="card group animate-fade-in-up animate-delay-400">
                <div className="flex items-start justify-between mb-4">
                  <span className="px-3 py-1 bg-[var(--panel)] text-[var(--foreground)] text-sm font-medium rounded-full border border-[var(--border)]">
                    Firebase
                  </span>
                  <span className="text-xs text-[var(--muted)]">12 min read</span>
                </div>

                <h3 className="text-xl font-bold text-[var(--foreground)] mb-3 group-hover:text-[var(--primary)] transition-colors">
                  Firebase Authentication Guide
                </h3>

                <p className="text-[var(--muted)] leading-relaxed mb-4">
                  Master Firebase Authentication in React applications with this comprehensive guide covering setup and best practices.
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="tag text-xs">Firebase</span>
                  <span className="tag text-xs">React</span>
                  <span className="tag text-xs">Security</span>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <span className="text-sm text-[var(--muted)]">Feb 1, 2024</span>
                  <span className="text-[var(--primary)] text-sm font-medium">Read More →</span>
                </div>
              </article>

              <article className="card group animate-fade-in-up animate-delay-500">
                <div className="flex items-start justify-between mb-4">
                  <span className="px-3 py-1 bg-[var(--panel)] text-[var(--foreground)] text-sm font-medium rounded-full border border-[var(--border)]">
                    Case Studies
                  </span>
                  <span className="text-xs text-[var(--muted)]">15 min read</span>
                </div>

                <h3 className="text-xl font-bold text-[var(--foreground)] mb-3 group-hover:text-[var(--primary)] transition-colors">
                  Building Neighborly: A Case Study
                </h3>

                <p className="text-[var(--muted)] leading-relaxed mb-4">
                  Deep dive into building a real-time community platform using Next.js, Firebase, and modern web technologies.
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="tag text-xs">Case Study</span>
                  <span className="tag text-xs">Real-time</span>
                  <span className="tag text-xs">Community</span>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <span className="text-sm text-[var(--muted)]">Feb 15, 2024</span>
                  <span className="text-[var(--primary)] text-sm font-medium">Read More →</span>
                </div>
              </article>
            </div>

            <div className="text-center">
              <a href="/blog" className="btn btn-primary">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                  <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V9a1 1 0 00-1-1h-1v4a2 2 0 01-2 2H4.5a1.5 1.5 0 010-3H11V7z" />
                </svg>
                View All Articles
              </a>
            </div>
          </Section>
        )}

        <Section id="education" title="Education">
          <div className="grid gap-6">
            {data.education?.map((e, index) => (
              <div key={e.school + e.period} className={`card animate-fade-in-up animate-delay-${index * 100 + 300}`}>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">{e.school}</h3>
                    <p className="text-[var(--muted)] leading-relaxed">{e.degree}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[var(--muted)] bg-[var(--panel)] px-3 py-1 rounded-full">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {e.period}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="contact" title="Contact">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="animate-fade-in-up animate-delay-300">
              <h3 className="text-2xl font-bold mb-6 text-[var(--foreground)]">Let's work together</h3>
              <p className="text-[var(--muted)] text-lg leading-relaxed mb-8">
                I'm always interested in new opportunities and exciting projects.
                Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>

              {data.email && (
                <div className="flex items-center gap-4 p-4 bg-[var(--card)] rounded-xl border border-[var(--border)] mb-6">
                  <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-[var(--primary)]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--muted)]">Email me directly</p>
                    <a
                      className="text-[var(--primary)] font-semibold hover:text-[var(--accent)] transition-colors"
                      href={`mailto:${data.email}`}
                    >
                      {data.email}
                    </a>
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                {data.links?.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="w-12 h-12 bg-[var(--card)] border border-[var(--border)] rounded-xl flex items-center justify-center hover:border-[var(--primary)] hover:bg-[var(--primary)]/10 transition-all duration-300"
                  >
                    {link.label === "GitHub" && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                      </svg>
                    )}
                    {link.label === "Phone" && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            </div>

            <div className="animate-fade-in-up animate-delay-500">
              <ContactForm />
            </div>
          </div>
        </Section>
      </main>

      <footer className="relative border-t border-[var(--border)] bg-[var(--card)] mt-20" role="contentinfo" aria-label="Site footer">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent" aria-hidden="true"></div>

        <div className="container py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* About Column */}
            <div className="md:col-span-2 animate-fade-in-up">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{data.name.charAt(0)}</span>
                </div>
                <h3 className="font-bold text-lg text-[var(--foreground)]">{data.name}</h3>
              </div>
              <p className="text-[var(--muted)] leading-relaxed mb-4">
                Full-Stack Developer passionate about creating innovative solutions
                and building meaningful digital experiences with modern technologies.
              </p>
              <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                <svg className="w-4 h-4 icon-location icon-hover" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>{data.location}</span>
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="animate-fade-in-up animate-delay-200">
              <h4 className="font-semibold mb-4 text-[var(--foreground)] flex items-center gap-2">
                <svg className="w-4 h-4 icon-projects icon-hover" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Quick Links
              </h4>
              <nav className="space-y-3" aria-label="Footer navigation">
                <a href="#about" className="flex items-center gap-2 text-[var(--muted)] hover:text-[var(--primary)] transition-colors group focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--card)] rounded">
                  <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  About
                </a>
                <a href="#experience" className="flex items-center gap-2 text-[var(--muted)] hover:text-[var(--primary)] transition-colors group focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--card)] rounded">
                  <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Experience
                </a>
                <a href="#projects" className="flex items-center gap-2 text-[var(--muted)] hover:text-[var(--primary)] transition-colors group focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--card)] rounded">
                  <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Projects
                </a>
                <a href="#skills" className="flex items-center gap-2 text-[var(--muted)] hover:text-[var(--primary)] transition-colors group focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--card)] rounded">
                  <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Skills
                </a>
                <a href="#contact" className="flex items-center gap-2 text-[var(--muted)] hover:text-[var(--primary)] transition-colors group focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--card)] rounded">
                  <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Contact
                </a>
              </nav>
            </div>

            {/* Connect Column */}
            <div className="animate-fade-in-up animate-delay-400">
              <h4 className="font-semibold mb-4 text-[var(--foreground)] flex items-center gap-2">
                <svg className="w-4 h-4 text-[var(--primary)]" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Connect
              </h4>
              <div className="space-y-3">
                {data.email && (
                  <a
                    href={`mailto:${data.email}`}
                    className="flex items-center gap-3 text-[var(--muted)] hover:text-[var(--primary)] transition-colors group focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--card)] rounded p-1"
                    aria-label={`Send email to ${data.email}`}
                  >
                    <div className="w-8 h-8 bg-[var(--panel)] border border-[var(--border)] rounded-lg flex items-center justify-center group-hover:border-[var(--primary)] group-hover:bg-[var(--primary)]/10 transition-all duration-300">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <span className="text-sm">Email</span>
                  </a>
                )}
                <div className="flex gap-3">
                  {data.links?.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="w-10 h-10 bg-[var(--panel)] border border-[var(--border)] rounded-lg flex items-center justify-center hover:border-[var(--primary)] hover:bg-[var(--primary)]/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--card)]"
                      aria-label={`Visit ${link.label} profile`}
                      title={link.label}
                    >
                      {link.label === "GitHub" && (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                        </svg>
                      )}
                      {link.label === "Phone" && (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-[var(--border)] pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <span className="text-[var(--muted)] text-sm">
                  © {new Date().getFullYear()} {data.name}. All rights reserved.
                </span>
                <div className="flex items-center gap-4 text-xs text-[var(--muted)]">
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Built with Next.js & Tailwind CSS
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                    Made with passion
                  </span>
                </div>
              </div>
              <a
                href="#"
                className="flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--primary)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--card)] rounded px-2 py-1"
                aria-label="Scroll back to top of page"
              >
                <span>Back to top</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
      <ChatWidget />
      </div>
    </AnimationWrapper>
  );
}
