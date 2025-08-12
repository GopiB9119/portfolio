import Link from "next/link";
import data from "@/content/site-data";
import CodeGrid from "@/components/code/CodeGrid";

export default function CodePage() {
  const codeSnippets = data.codeSnippets || [];

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
            Code Snippets & Examples
          </h1>
          
          <p className="text-xl text-[var(--muted)] max-w-3xl mx-auto">
            A collection of useful code snippets, utilities, and examples showcasing different programming 
            languages, patterns, and best practices. Each snippet includes explanations, performance notes, 
            and implementation details.
          </p>
        </div>

        {/* Stats Overview */}
        {codeSnippets.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="card text-center p-6">
              <div className="text-3xl font-bold text-[var(--primary)] mb-2">
                {codeSnippets.length}
              </div>
              <div className="text-sm text-[var(--muted)]">Code Snippets</div>
            </div>
            
            <div className="card text-center p-6">
              <div className="text-3xl font-bold text-[var(--primary)] mb-2">
                {Array.from(new Set(codeSnippets.map(s => s.language))).length}
              </div>
              <div className="text-sm text-[var(--muted)]">Languages</div>
            </div>
            
            <div className="card text-center p-6">
              <div className="text-3xl font-bold text-[var(--primary)] mb-2">
                {Array.from(new Set(codeSnippets.map(s => s.category))).length}
              </div>
              <div className="text-sm text-[var(--muted)]">Categories</div>
            </div>
            
            <div className="card text-center p-6">
              <div className="text-3xl font-bold text-[var(--primary)] mb-2">
                {codeSnippets.reduce((acc, s) => acc + s.code.split('\n').length, 0)}
              </div>
              <div className="text-sm text-[var(--muted)]">Lines of Code</div>
            </div>
          </div>
        )}

        {/* Languages Overview */}
        {codeSnippets.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-[var(--foreground)] text-center mb-8">
              Programming Languages
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {Array.from(new Set(codeSnippets.map(s => s.language)))
                .map(language => {
                  const count = codeSnippets.filter(s => s.language === language).length;
                  const languageConfig = {
                    typescript: { name: "TypeScript", color: "bg-blue-500", textColor: "text-blue-600" },
                    javascript: { name: "JavaScript", color: "bg-yellow-500", textColor: "text-yellow-600" },
                    python: { name: "Python", color: "bg-green-500", textColor: "text-green-600" },
                    css: { name: "CSS", color: "bg-purple-500", textColor: "text-purple-600" },
                    html: { name: "HTML", color: "bg-orange-500", textColor: "text-orange-600" },
                    json: { name: "JSON", color: "bg-gray-500", textColor: "text-gray-600" }
                  };
                  
                  const config = languageConfig[language as keyof typeof languageConfig] || 
                    { name: language.toUpperCase(), color: "bg-gray-500", textColor: "text-gray-600" };
                  
                  return (
                    <div key={language} className="group relative">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 blur"></div>
                      <div className="relative card p-4 flex items-center gap-3">
                        <div className={`w-10 h-10 ${config.color} rounded-lg flex items-center justify-center text-white font-bold text-sm`}>
                          {language.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-semibold text-[var(--foreground)]">{config.name}</div>
                          <div className="text-sm text-[var(--muted)]">{count} snippet{count !== 1 ? 's' : ''}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* Code Snippets Grid */}
        <CodeGrid snippets={codeSnippets} />

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-[var(--foreground)] mb-4">
              Need Custom Code Solutions?
            </h3>
            <p className="text-[var(--muted)] mb-6">
              These snippets represent just a fraction of the solutions I can create. 
              Let's discuss your specific requirements and build something amazing together.
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
                View Projects
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}