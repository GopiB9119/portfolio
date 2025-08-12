"use client";
import { useState } from "react";

type InquiryType = 'project' | 'collaboration' | 'question' | 'other';

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [inquiryType, setInquiryType] = useState<InquiryType>('project');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const body = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
      inquiryType,
      company: formData.get("company"),
      budget: formData.get("budget"),
      timeline: formData.get("timeline"),
      token,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      form.reset();
      setToken(null);
    } catch (err) {
      setStatus("error");
      setError("Could not send message. Please try again later.");
    }
  }

  const inquiryTypes = [
    { 
      id: 'project' as InquiryType, 
      label: 'Project Inquiry', 
      icon: '🚀',
      description: 'Discuss a new project or development work'
    },
    { 
      id: 'collaboration' as InquiryType, 
      label: 'Collaboration', 
      icon: '🤝',
      description: 'Partnership or team collaboration opportunities'
    },
    { 
      id: 'question' as InquiryType, 
      label: 'Technical Question', 
      icon: '❓',
      description: 'Ask about code, architecture, or best practices'
    },
    { 
      id: 'other' as InquiryType, 
      label: 'Other', 
      icon: '💬',
      description: 'General inquiries or other topics'
    }
  ];

  const getPlaceholderText = (type: InquiryType) => {
    switch (type) {
      case 'project':
        return 'Tell me about your project requirements, goals, and any specific technologies you have in mind...';
      case 'collaboration':
        return 'Describe the collaboration opportunity, your team, and how we might work together...';
      case 'question':
        return 'What technical question can I help you with? Feel free to include code snippets or specific scenarios...';
      default:
        return 'How can I help you? Please provide as much detail as possible...';
    }
  };

  return (
    <div className="card max-w-2xl">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">Get in Touch</h3>
        <p className="text-[var(--muted)]">
          I'd love to hear from you! Choose the type of inquiry and I'll get back to you within 24 hours.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Inquiry Type Selection */}
        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-3">What can I help you with?</label>
          <div className="grid grid-cols-2 gap-3">
            {inquiryTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => setInquiryType(type.id)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  inquiryType === type.id
                    ? 'border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]'
                    : 'border-[var(--border)] bg-[var(--panel)] hover:border-[var(--primary)]/50'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{type.icon}</span>
                  <span className="font-medium text-sm">{type.label}</span>
                </div>
                <p className="text-xs text-[var(--muted)]">{type.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Basic Information */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input 
              name="name" 
              placeholder="Your full name" 
              required 
              className="w-full px-4 py-3 bg-[var(--panel)] border border-[var(--border)] rounded-xl text-sm placeholder-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input 
              name="email" 
              placeholder="your.email@example.com" 
              type="email" 
              required 
              className="w-full px-4 py-3 bg-[var(--panel)] border border-[var(--border)] rounded-xl text-sm placeholder-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Company (optional) */}
        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Company (Optional)</label>
          <input 
            name="company" 
            placeholder="Your company or organization" 
            className="w-full px-4 py-3 bg-[var(--panel)] border border-[var(--border)] rounded-xl text-sm placeholder-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
          />
        </div>

        {/* Project-specific fields */}
        {inquiryType === 'project' && (
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Timeline</label>
              <select 
                name="timeline"
                className="w-full px-4 py-3 bg-[var(--panel)] border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
              >
                <option value="">Select timeline</option>
                <option value="asap">ASAP</option>
                <option value="1-2weeks">1-2 weeks</option>
                <option value="1month">Within 1 month</option>
                <option value="2-3months">2-3 months</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Budget Range</label>
              <select 
                name="budget"
                className="w-full px-4 py-3 bg-[var(--panel)] border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
              >
                <option value="">Select budget range</option>
                <option value="under-5k">Under $5,000</option>
                <option value="5k-15k">$5,000 - $15,000</option>
                <option value="15k-50k">$15,000 - $50,000</option>
                <option value="50k-plus">$50,000+</option>
                <option value="discuss">Let's discuss</option>
              </select>
            </div>
          </div>
        )}
        
        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea 
            name="message" 
            placeholder={getPlaceholderText(inquiryType)}
            rows={6} 
            required 
            className="w-full px-4 py-3 bg-[var(--panel)] border border-[var(--border)] rounded-xl text-sm placeholder-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all resize-none"
          />
        </div>
        
        {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? (
          <div className="flex justify-center">
            <div
              className="cf-turnstile"
              data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
              data-callback={(val: string) => setToken(val)}
            />
          </div>
        ) : null}
        
        <div className="flex items-center justify-between">
          <button 
            type="submit" 
            className={`px-8 py-3 rounded-xl font-medium text-sm transition-all ${
              status === "loading"
                ? "bg-[var(--panel)] text-[var(--muted)] cursor-not-allowed"
                : "bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white hover:shadow-lg hover:scale-105"
            }`}
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 animate-spin" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
                Sending...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
                Send Message
              </div>
            )}
          </button>
          
          <div className="flex items-center">
            {status === "sent" && (
              <div className="flex items-center gap-2 text-[var(--success)] text-sm font-medium">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Message sent successfully!
              </div>
            )}
            {status === "error" && (
              <div className="flex items-center gap-2 text-[var(--error)] text-sm font-medium">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

