import ContactMethods from "@/components/contact/ContactMethods";
import EnhancedContactForm from "@/components/contact/EnhancedContactForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen py-24 bg-gradient-to-b from-[var(--background)] via-[var(--background)] to-[var(--panel)]/20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <span className="kicker animate-pulse-attention">Get in Touch</span>
          <h1 className="hero-name mb-8 animate-float">Let&apos;s Work Together</h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-xl text-[var(--muted)] leading-relaxed mb-8">
              Ready to bring your ideas to life? I&apos;m here to help you build amazing digital experiences.
              Whether you have a project in mind or just want to connect, I&apos;d love to hear from you.
            </p>
            <div className="flex items-center justify-center gap-8 text-sm text-[var(--muted)]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Available for new projects</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>24hr response time</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>Remote & worldwide</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto mb-20">
          {/* Left Column - Contact Methods */}
          <div className="space-y-12">
            <div className="scroll-reveal-left">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-r from-[var(--primary)]/10 to-[var(--accent)]/10 rounded-full blur-xl"></div>
                <ContactMethods />
              </div>
            </div>

            {/* Additional Contact Info */}
            <div className="scroll-reveal-left">
              <div className="card p-6 bg-gradient-to-br from-[var(--primary)]/5 via-transparent to-[var(--accent)]/5 border-[var(--primary)]/20">
                <h3 className="text-lg font-bold text-[var(--foreground)] mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Why Work With Me?
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-semibold text-[var(--foreground)] text-sm">Full-Stack Expertise</p>
                      <p className="text-[var(--muted)] text-sm">End-to-end development from concept to deployment</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-semibold text-[var(--foreground)] text-sm">Modern Technologies</p>
                      <p className="text-[var(--muted)] text-sm">Latest frameworks and best practices for optimal performance</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-semibold text-[var(--foreground)] text-sm">Transparent Communication</p>
                      <p className="text-[var(--muted)] text-sm">Regular updates and clear project milestones</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-semibold text-[var(--foreground)] text-sm">Quality Assurance</p>
                      <p className="text-[var(--muted)] text-sm">Thorough testing and code review processes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="relative">
            <div className="absolute -top-8 -right-8 w-40 h-40 bg-gradient-to-l from-green-500/10 to-blue-500/10 rounded-full blur-2xl"></div>
            <div className="scroll-reveal-right">
              <div className="sticky top-24" id="contact-form">
                <EnhancedContactForm />
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="scroll-reveal">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="kicker">FAQ</span>
              <h2 className="section-title">Frequently Asked Questions</h2>
              <p className="text-[var(--muted)] max-w-2xl mx-auto">
                Got questions? Here are answers to the most common inquiries I receive.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 stagger-children">
              <div className="card card-interactive hover-lift group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[var(--foreground)] mb-3 group-hover:text-blue-500 transition-colors">
                      How quickly do you respond?
                    </h3>
                    <p className="text-[var(--muted)] leading-relaxed">
                      I typically respond to all inquiries within 24 hours during business days. 
                      For urgent matters, feel free to call directly for immediate assistance.
                    </p>
                  </div>
                </div>
              </div>

              <div className="card card-interactive hover-lift group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[var(--foreground)] mb-3 group-hover:text-green-500 transition-colors">
                      What&apos;s your availability?
                    </h3>
                    <p className="text-[var(--muted)] leading-relaxed">
                      I&apos;m currently available for new projects and collaborations. 
                      Check my real-time availability status above for the most current information.
                    </p>
                  </div>
                </div>
              </div>

              <div className="card card-interactive hover-lift group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[var(--foreground)] mb-3 group-hover:text-purple-500 transition-colors">
                      Do you work with international clients?
                    </h3>
                    <p className="text-[var(--muted)] leading-relaxed">
                      Absolutely! I work with clients worldwide and am flexible with different 
                      time zones for meetings and communication. Remote collaboration is my specialty.
                    </p>
                  </div>
                </div>
              </div>

              <div className="card card-interactive hover-lift group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[var(--foreground)] mb-3 group-hover:text-orange-500 transition-colors">
                      What information should I include?
                    </h3>
                    <p className="text-[var(--muted)] leading-relaxed">
                      Include your project timeline, budget range, technical requirements, 
                      and any specific goals or challenges you&apos;re facing for the most accurate proposal.
                    </p>
                  </div>
                </div>
              </div>

              <div className="card card-interactive hover-lift group md:col-span-2">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[var(--foreground)] mb-3">
                      Ready to get started?
                    </h3>
                    <p className="text-[var(--muted)] leading-relaxed mb-4">
                      Let&apos;s discuss your project! Choose your preferred method of contact above, 
                      or fill out the form to get started. I&apos;m excited to learn about your vision 
                      and help bring it to life.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="tag bg-blue-500/10 text-blue-500 border-blue-500/20">Quick Response</span>
                      <span className="tag bg-green-500/10 text-green-500 border-green-500/20">Free Consultation</span>
                      <span className="tag bg-purple-500/10 text-purple-500 border-purple-500/20">No Obligation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="card p-12 bg-gradient-to-r from-[var(--primary)]/5 via-[var(--accent)]/5 to-[var(--primary)]/5 border-[var(--primary)]/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--primary)]/5 to-transparent animate-shimmer"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-[var(--foreground)] mb-4">
                Let&apos;s Create Something Amazing Together
              </h3>
              <p className="text-[var(--muted)] mb-8 max-w-2xl mx-auto">
                Whether you have a specific project in mind or just want to explore possibilities, 
                I&apos;m here to help turn your ideas into reality.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a href="#contact-form" className="btn btn-primary px-8 py-4 text-lg hover-glow">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  Start a Project
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}