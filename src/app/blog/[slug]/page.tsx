import Link from "next/link";
import { getBlogPosts, getBlogPost } from "@/lib/blog";
import data from "@/content/site-data";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  
  if (!post) {
    return (
      <div className="min-h-screen bg-[var(--background)]">
        <div className="container py-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[var(--foreground)] mb-4">Post Not Found</h1>
            <p className="text-[var(--muted)] mb-8">The blog post you&#39;re looking for doesn&#39;t exist.</p>
            <Link className="btn btn-primary" href="/blog">
              ← Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="container py-20">
        {/* Header */}
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link 
              href="/blog" 
              className="btn btn-outline mb-6"
              aria-label="Back to blog"
            >
              ← Back to Blog
            </Link>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-medium rounded-full border border-[var(--primary)]/20">
                {post.category}
              </span>
              <span className="text-sm text-[var(--muted)]">
                {post.readingTime} min read
              </span>
              <span className="text-sm text-[var(--muted)]">
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-6">
              {post.title}
            </h1>
            
            <p className="text-xl text-[var(--muted)] leading-relaxed mb-8">
              {post.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Content */}
          <article className="prose prose-lg max-w-none">
            <div className="card p-8">
              <div 
                className="text-[var(--muted)] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </article>

          {/* Author Info */}
          <div className="card p-6 mt-12">
            <div className="flex items-start gap-4">
              {data.avatarUrl && (
                <img
                  src={data.avatarUrl}
                  alt={data.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              )}
              <div>
                <h3 className="text-lg font-bold text-[var(--foreground)] mb-2">
                  About {data.name}
                </h3>
                <p className="text-[var(--muted)] leading-relaxed mb-4">
                  {data.title} passionate about building modern web applications and sharing knowledge 
                  through technical writing and open source contributions.
                </p>
                <div className="flex gap-3">
                  {data.links?.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[var(--primary)] hover:text-[var(--accent)] transition-colors text-sm font-medium"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12">
            <Link 
              href="/blog"
              className="btn btn-outline"
            >
              ← All Posts
            </Link>
            <Link 
              href="/#contact"
              className="btn btn-primary"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}