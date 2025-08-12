"use client";
import { useState } from "react";

interface InquiryType {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface FormData {
  name: string;
  email: string;
  inquiryType: string;
  subject: string;
  message: string;
  budget?: string;
  timeline?: string;
}

const inquiryTypes: InquiryType[] = [
  {
    id: "general",
    name: "General Inquiry",
    description: "General questions or information requests",
    icon: "💬"
  },
  {
    id: "project",
    name: "Project Discussion",
    description: "Discuss a potential project or collaboration",
    icon: "🚀"
  },
  {
    id: "freelance",
    name: "Freelance Work",
    description: "Hire me for freelance development work",
    icon: "💼"
  },
  {
    id: "fulltime",
    name: "Full-time Opportunity",
    description: "Full-time job opportunities and positions",
    icon: "🏢"
  }
];

export default function EnhancedContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    inquiryType: "",
    subject: "",
    message: "",
    budget: "",
    timeline: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: "",
          email: "",
          inquiryType: "",
          subject: "",
          message: "",
          budget: "",
          timeline: ""
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedInquiry = inquiryTypes.find(type => type.id === formData.inquiryType);

  return (
    <div className="card p-8">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-[var(--foreground)] mb-2">
          Send a Message
        </h3>
        <p className="text-[var(--muted)] leading-relaxed">
          Ready to start a conversation? Choose your inquiry type and let&apos;s discuss how we can work together.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Inquiry Type Selection */}
        <div>
          <label className="block text-sm font-semibold text-[var(--foreground)] mb-4">
            What can I help you with?
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {inquiryTypes.map((type) => (
              <label
                key={type.id}
                className={`relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                  formData.inquiryType === type.id
                    ? 'border-[var(--primary)] bg-[var(--primary)]/5'
                    : 'border-[var(--border)] hover:border-[var(--primary)]/50 hover:bg-[var(--panel)]'
                }`}
              >
                <input
                  type="radio"
                  name="inquiryType"
                  value={type.id}
                  checked={formData.inquiryType === type.id}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{type.icon}</span>
                  <div>
                    <div className="font-semibold text-[var(--foreground)]">{type.name}</div>
                    <div className="text-sm text-[var(--muted)]">{type.description}</div>
                  </div>
                </div>
                {formData.inquiryType === type.id && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-[var(--primary)] rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-[var(--background)]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-[var(--foreground)] mb-2">
              Your Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--panel)] text-[var(--foreground)] placeholder-[var(--muted)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 focus:outline-none transition-colors"
              placeholder="Enter your full name"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-[var(--foreground)] mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--panel)] text-[var(--foreground)] placeholder-[var(--muted)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 focus:outline-none transition-colors"
              placeholder="your.email@example.com"
            />
          </div>
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-sm font-semibold text-[var(--foreground)] mb-2">
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--panel)] text-[var(--foreground)] placeholder-[var(--muted)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 focus:outline-none transition-colors"
            placeholder={selectedInquiry ? `${selectedInquiry.name} - Brief description` : "Brief description of your inquiry"}
          />
        </div>

        {/* Project-specific fields */}
        {(formData.inquiryType === 'project' || formData.inquiryType === 'freelance') && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="budget" className="block text-sm font-semibold text-[var(--foreground)] mb-2">
                Budget Range
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--panel)] text-[var(--foreground)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 focus:outline-none transition-colors"
              >
                <option value="">Select budget range</option>
                <option value="under-5k">Under $5,000</option>
                <option value="5k-10k">$5,000 - $10,000</option>
                <option value="10k-25k">$10,000 - $25,000</option>
                <option value="25k-50k">$25,000 - $50,000</option>
                <option value="50k-plus">$50,000+</option>
                <option value="discuss">Let's discuss</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="timeline" className="block text-sm font-semibold text-[var(--foreground)] mb-2">
                Timeline
              </label>
              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--panel)] text-[var(--foreground)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 focus:outline-none transition-colors"
              >
                <option value="">Select timeline</option>
                <option value="asap">ASAP</option>
                <option value="1-month">Within 1 month</option>
                <option value="2-3-months">2-3 months</option>
                <option value="3-6-months">3-6 months</option>
                <option value="6-months-plus">6+ months</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
          </div>
        )}

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-[var(--foreground)] mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            rows={6}
            className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--panel)] text-[var(--foreground)] placeholder-[var(--muted)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 focus:outline-none transition-colors resize-vertical"
            placeholder="Tell me more about your project, requirements, or any questions you have..."
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between pt-4">
          <div className="text-sm text-[var(--muted)]">
            * Required fields
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting || !formData.name || !formData.email || !formData.subject || !formData.message}
            className="btn btn-primary px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Sending...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Send Message
              </div>
            )}
          </button>
        </div>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="p-4 bg-[var(--success)]/10 border border-[var(--success)]/20 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[var(--success)] rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-[var(--success)]">Message Sent Successfully!</h4>
                <p className="text-sm text-[var(--success)]/80">Thank you for reaching out. I'll get back to you within 24 hours.</p>
              </div>
            </div>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="p-4 bg-[var(--error)]/10 border border-[var(--error)]/20 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[var(--error)] rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-[var(--error)]">Message Failed to Send</h4>
                <p className="text-sm text-[var(--error)]/80">Please try again or contact me directly at banothgopikrishna19@gmail.com</p>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}