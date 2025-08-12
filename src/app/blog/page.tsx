import Link from "next/link";
import data from "@/content/site-data";
import { getBlogPosts } from "@/lib/blog";

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const blogConfig = data.blog;

  if (!blogConfig?.enabled) {
    return (
      <div className="min-h-screen bg-[var(--background)]">
        <div className="container py-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[var(--foreground)] mb-4">Blog Coming Soon</h1>
            <p className="text-[var(--muted)] mb-8">I'm working on some great content. Check back soon!</p>
            <Link className="btn btn-primary" href="/">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const featuredPosts = posts.filter(post => blogConfig.featuredPosts.includes(post.slug));
  const regularPosts = posts.filter(post => !blogConfig.featuredPosts.includes(post.slug));

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="container py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-6">
            Technical Blog
          </h1>
          <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto">
            Insights, tutorials, and case studies from my development journey. 
            Sharing knowledge about React, Next.js, Firebase, and modern web development.
          </p>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-8">Featured Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <article key={post.slug} className={`card group animate-fade-in-up animate-delay-${index * 100 + 300}`}>
                  <div className="flex items-start justify-between mb-4">
                    <span className="px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-medium rounded-full border border-[var(--primary)]/20">
                      {post.category}
                    </span>
                    <span className="text-xs text-[var(--muted)]">
                      {post.readingTime} min read
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[var(--foreground)] mb-3 group-hover:text-[var(--primary)] transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-[var(--muted)] leading-relaxed mb-4">
                    {post.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="tag text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-sm text-[var(--muted)]">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="text-[var(--primary)] hover:text-[var(--accent)] transition-colors text-sm font-medium"
                    >
                      Read More →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* All Posts */}
        <section>
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-8">All Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <article key={post.slug} className={`card group animate-fade-in-up animate-delay-${index * 100 + 300}`}>
                <div className="flex items-start justify-between mb-4">
                  <span className="px-3 py-1 bg-[var(--panel)] text-[var(--foreground)] text-sm font-medium rounded-full border border-[var(--border)]">
                    {post.category}
                  </span>
                  <span className="text-xs text-[var(--muted)]">
                    {post.readingTime} min read
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[var(--foreground)] mb-3 group-hover:text-[var(--primary)] transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>

                <p className="text-[var(--muted)] leading-relaxed mb-4">
                  {post.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="tag text-xs">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <span className="text-sm text-[var(--muted)]">
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="text-[var(--primary)] hover:text-[var(--accent)] transition-colors text-sm font-medium"
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Back to Home */}
        <div className="text-center mt-16">
          <Link className="btn btn-outline" href="/">
            ← Back to Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}