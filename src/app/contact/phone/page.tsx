import Link from "next/link";
import data from "@/content/site-data";

export default function PhonePage() {
  const phoneNumber = data.links?.find(l => l.label === 'Phone')?.href?.replace('tel:', '') || '+917981710621';
  const phoneHref = `tel:${phoneNumber}`;
  const whatsappHref = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}`;
  const smsHref = `sms:${phoneNumber}`;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="container py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <Link 
            href="/contact" 
            className="btn btn-outline mb-6"
            aria-label="Back to contact page"
          >
            ← Back to Contact
          </Link>
          
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-6">
            Let&apos;s Talk!
          </h1>
          
          <p className="text-xl text-[var(--muted)] max-w-3xl mx-auto mb-8">
            Ready to discuss your project? I&apos;m just a phone call away. 
            Let&apos;s have a conversation about how we can bring your ideas to life.
          </p>

          <div className="flex flex-col items-center gap-4 mb-12">
            <div className="text-3xl font-bold text-[var(--primary)]">
              {phoneNumber}
            </div>
            <div className="text-sm text-[var(--muted)]">
              Available Monday - Friday, 9 AM - 6 PM IST
            </div>
          </div>
        </div>

        {/* Main Call Button */}
        <div className="text-center mb-16">
          <a 
            href={phoneHref}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-12 py-6 rounded-2xl text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            Call Now
          </a>
        </div>

        {/* Alternative Contact Methods */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {/* WhatsApp */}
          <a 
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="card p-6 hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-green-500 group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.108"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[var(--foreground)] group-hover:text-green-500 transition-colors">
                  WhatsApp
                </h3>
                <p className="text-sm text-[var(--muted)]">Quick message or call</p>
              </div>
            </div>
          </a>

          {/* SMS */}
          <a 
            href={smsHref}
            className="card p-6 hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-blue-500 group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[var(--foreground)] group-hover:text-blue-500 transition-colors">
                  Text Message
                </h3>
                <p className="text-sm text-[var(--muted)]">Send a quick SMS</p>
              </div>
            </div>
          </a>

          {/* Schedule Call */}
          <Link 
            href="/contact"
            className="card p-6 hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-purple-500 group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[var(--foreground)] group-hover:text-purple-500 transition-colors">
                  Schedule Call
                </h3>
                <p className="text-sm text-[var(--muted)]">Book a meeting time</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Call Guidelines */}
        <div className="card p-8 mb-16">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6 text-center">
            What We Can Discuss
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-[var(--foreground)] flex items-center gap-2">
                <svg className="w-5 h-5 text-[var(--primary)]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Project Requirements
              </h3>
              <ul className="space-y-2 text-sm text-[var(--muted)]">
                <li>• Web application development</li>
                <li>• E-commerce solutions</li>
                <li>• Custom business applications</li>
                <li>• Technical architecture planning</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-[var(--foreground)] flex items-center gap-2">
                <svg className="w-5 h-5 text-[var(--primary)]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Technical Consultation
              </h3>
              <ul className="space-y-2 text-sm text-[var(--muted)]">
                <li>• Technology stack recommendations</li>
                <li>• Performance optimization</li>
                <li>• Code review and best practices</li>
                <li>• Integration solutions</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ for Phone Calls */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6 text-center">
            Call Information
          </h2>
          
          <div className="space-y-4">
            <details className="group">
              <summary className="font-semibold text-[var(--foreground)] cursor-pointer flex items-center justify-between p-4 rounded-lg hover:bg-[var(--muted)]/10">
                When is the best time to call?
                <svg className="w-5 h-5 group-open:rotate-180 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </summary>
              <div className="mt-3 text-[var(--muted)] text-sm leading-relaxed px-4 pb-4">
                I&apos;m available Monday through Friday, 9 AM to 6 PM IST (Indian Standard Time). 
                For urgent matters, you can also reach me via WhatsApp outside these hours.
              </div>
            </details>

            <details className="group">
              <summary className="font-semibold text-[var(--foreground)] cursor-pointer flex items-center justify-between p-4 rounded-lg hover:bg-[var(--muted)]/10">
                How long do consultation calls typically last?
                <svg className="w-5 h-5 group-open:rotate-180 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </summary>
              <div className="mt-3 text-[var(--muted)] text-sm leading-relaxed px-4 pb-4">
                Initial consultation calls usually last 15-30 minutes. For detailed project discussions, 
                we might need 45-60 minutes. I&apos;ll always let you know the expected duration beforehand.
              </div>
            </details>

            <details className="group">
              <summary className="font-semibold text-[var(--foreground)] cursor-pointer flex items-center justify-between p-4 rounded-lg hover:bg-[var(--muted)]/10">
                Do you charge for consultation calls?
                <svg className="w-5 h-5 group-open:rotate-180 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </summary>
              <div className="mt-3 text-[var(--muted)] text-sm leading-relaxed px-4 pb-4">
                Initial consultation calls are completely free! I believe in understanding your needs first 
                before discussing any project details. Extended technical consultations may have a fee, 
                which I&apos;ll discuss with you beforehand.
              </div>
            </details>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-[var(--muted)] mb-6">
            Prefer to start with a message? No problem!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn btn-outline">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Send Email Instead
            </Link>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.108"/>
              </svg>
              Message on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
