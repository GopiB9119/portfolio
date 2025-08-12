import Link from "next/link";
import data from "@/content/site-data";
import CodeSnippet from "@/components/code/CodeSnippet";

export async function generateStaticParams() {
  const codeSnippets = data.codeSnippets || [];
  return codeSnippets.map((snippet) => ({
    id: snippet.id,
  }));
}

export default async function CodeSnippetPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const codeSnippets = data.codeSnippets || [];
  const snippet = codeSnippets.find((s) => s.id === id);
  
  if (!snippet) {
    return (
      <div className="min-h-screen bg-[var(--background)]">
        <div className="container py-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[var(--foreground)] mb-4">Code Snippet Not Found</h1>
            <p className="text-[var(--muted)] mb-8">The code snippet you're looking for doesn't exist.</p>
            <Link className="btn btn-primary" href="/code">
              ← Back to Code Snippets
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Get related snippets (same language or category)
  const relatedSnippets = codeSnippets
    .filter(s => s.id !== snippet.id && (s.language === snippet.language || s.category === snippet.category))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="container py-20">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/code" 
            className="btn btn-outline mb-6"
            aria-label="Back to code snippets"
          >
            ← Back to Code Snippets
          </Link>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <CodeSnippet snippet={snippet} showFullCode={true} />

          {/* Related Snippets */}
          {relatedSnippets.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-8">Related Code Snippets</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedSnippets.map((relatedSnippet, index) => (
                  <Link 
                    key={relatedSnippet.id} 
                    href={`/code/${relatedSnippet.id}`}
                    className={`card group animate-fade-in-up animate-delay-${index * 100 + 300} block`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold ${
                        relatedSnippet.language === 'typescript' ? 'bg-blue-500' :
                        relatedSnippet.language === 'javascript' ? 'bg-yellow-500' :
                        relatedSnippet.language === 'python' ? 'bg-green-500' :
                        relatedSnippet.language === 'css' ? 'bg-purple-500' :
                        'bg-gray-500'
                      }`}>
                        {relatedSnippet.language.charAt(0).toUpperCase()}
                      </div>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-[var(--panel)] text-[var(--foreground)] border border-[var(--border)]">
                        {relatedSnippet.category}
                      </span>
                    </div>
                    
                    <h3 className="font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors mb-2">
                      {relatedSnippet.title}
                    </h3>
                    
                    <p className="text-[var(--muted)] text-sm leading-relaxed mb-3">
                      {relatedSnippet.description.length > 100 
                        ? relatedSnippet.description.substring(0, 100) + "..." 
                        : relatedSnippet.description}
                    </p>

                    <div className="flex flex-wrap gap-1">
                      {relatedSnippet.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="tag text-xs">
                          {tag}
                        </span>
                      ))}
                      {relatedSnippet.tags.length > 3 && (
                        <span className="text-xs text-[var(--muted)] italic">
                          +{relatedSnippet.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-[var(--border)]">
            <Link 
              href="/code"
              className="btn btn-outline"
            >
              ← All Code Snippets
            </Link>
            <Link 
              href="/#contact"
              className="btn btn-primary"
            >
              Discuss Custom Solutions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}