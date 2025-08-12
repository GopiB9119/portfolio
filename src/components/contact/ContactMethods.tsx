"use client";
import { useState } from "react";
import data from "@/content/site-data";

export default function ContactMethods() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = async () => {
    if (data.email) {
      try {
        await navigator.clipboard.writeText(data.email);
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      } catch (err) {
        console.error('Failed to copy email:', err);
      }
    }
  };

  const contactMethods = [
    {
      id: 'email',
      name: 'Email',
      value: data.email,
      href: `mailto:${data.email}`,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
      ),
      description: 'Best for detailed inquiries and project discussions',
      action: 'copy'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      value: data.socialLinks?.find(l => l.platform === 'LinkedIn')?.username,
      href: data.socialLinks?.find(l => l.platform === 'LinkedIn')?.url,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      description: 'Professional networking and career opportunities'
    },
    {
      id: 'github',
      name: 'GitHub',
      value: data.socialLinks?.find(l => l.platform === 'GitHub')?.username || data.links?.find(l => l.label === 'GitHub')?.href?.split('/').pop(),
      href: data.socialLinks?.find(l => l.platform === 'GitHub')?.url || data.links?.find(l => l.label === 'GitHub')?.href,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
        </svg>
      ),
      description: 'Code collaboration and technical discussions'
    }
  ].filter(method => method.value); // Only show methods with values

  return (
    <div>
      {/* Contact Methods */}
      <div className="grid md:grid-cols-2 gap-6">
        {contactMethods.map((method, index) => (
          <div key={method.id} className={`card card-interactive hover-lift group animate-fade-in-up animate-delay-${index * 100 + 300} relative overflow-hidden`}>
            {/* Background gradient effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[var(--primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            
            <div className="flex items-start gap-4 relative z-10">
              <div className="w-14 h-14 bg-gradient-to-br from-[var(--primary)]/10 to-[var(--accent)]/10 rounded-2xl flex items-center justify-center text-[var(--primary)] group-hover:bg-gradient-to-br group-hover:from-[var(--primary)] group-hover:to-[var(--accent)] group-hover:text-[var(--background)] transition-all duration-300 shadow-lg group-hover:shadow-xl group-hover:scale-110">
                {method.icon}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors text-lg">
                    {method.name}
                  </h4>
                </div>
                
                <p className="text-[var(--muted)] text-sm leading-relaxed mb-4 group-hover:text-[var(--foreground)] transition-colors">
                  {method.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono text-[var(--foreground)] bg-[var(--panel)] px-3 py-1 rounded-lg group-hover:bg-[var(--primary)]/10 transition-colors truncate">
                    {method.value}
                  </span>
                  
                  <div className="flex gap-2 ml-4">
                    {method.action === 'copy' ? (
                      <button
                        onClick={copyEmail}
                        className="btn btn-outline btn-sm group-hover:btn-primary transition-all duration-300 shadow-sm hover:shadow-md"
                        title="Copy email address"
                      >
                        {copiedEmail ? (
                          <>
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Copied!
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                            </svg>
                            Copy
                          </>
                        )}
                      </button>
                    ) : null}
                    
                    {method.href && (
                      <a
                        href={method.href}
                        target={method.id === 'email' ? '_self' : '_blank'}
                        rel={method.id === 'email' ? undefined : 'noreferrer'}
                        className="btn btn-primary btn-sm shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
                      >
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                        </svg>
                        Contact
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Contact Tips */}
      <div className="mt-8">
        <div className="card card-interactive hover-lift group bg-gradient-to-br from-[var(--primary)]/5 via-[var(--accent)]/5 to-transparent border-[var(--primary)]/20 relative overflow-hidden">
          {/* Background animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--primary)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
          
          <h4 className="font-bold text-[var(--foreground)] mb-4 flex items-center gap-2 relative z-10 group-hover:text-[var(--primary)] transition-colors">
            <div className="w-8 h-8 bg-gradient-to-br from-[var(--primary)]/10 to-[var(--accent)]/10 rounded-lg flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[var(--primary)] group-hover:to-[var(--accent)] transition-all duration-300">
              <svg className="w-5 h-5 text-[var(--primary)] group-hover:text-[var(--background)] transition-colors" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            Quick Contact Tips
          </h4>
          <ul className="space-y-3 text-sm text-[var(--muted)] relative z-10">
            <li className="flex items-start gap-3 group-hover:text-[var(--foreground)] transition-colors">
              <div className="w-6 h-6 bg-blue-500/10 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0 group-hover:bg-blue-500/20 transition-colors">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              </div>
              <span><strong className="text-[var(--foreground)]">Project inquiries:</strong> Please include your timeline and budget range</span>
            </li>
            <li className="flex items-start gap-3 group-hover:text-[var(--foreground)] transition-colors">
              <div className="w-6 h-6 bg-green-500/10 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0 group-hover:bg-green-500/20 transition-colors">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <span><strong className="text-[var(--foreground)]">Technical questions:</strong> I love discussing code and architecture</span>
            </li>
            <li className="flex items-start gap-3 group-hover:text-[var(--foreground)] transition-colors">
              <div className="w-6 h-6 bg-purple-500/10 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0 group-hover:bg-purple-500/20 transition-colors">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              </div>
              <span><strong className="text-[var(--foreground)]">Collaboration:</strong> Open source contributions are always interesting</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}