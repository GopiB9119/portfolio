import data from "@/content/site-data";
import Link from "next/link";

export async function generateStaticParams() {
  return (data.projects || [])
    .filter((p) => p.slug)
    .map((p) => ({ slug: p.slug! }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = (data.projects || []).find((p) => p.slug === slug);
  if (!project) {
    return (
      <div className="container py-10">
        <p className="muted">Project not found.</p>
        <Link className="btn mt-2 inline-block" href="#projects">Back to Projects</Link>
      </div>
    );
  }
  return (
    <div className="container py-10 grid gap-4">
      <h1 className="text-2xl font-bold">{project.name}</h1>
      <p className="muted">{project.description}</p>
      {project.details && <p>{project.details}</p>}
      <div className="flex flex-wrap gap-2">
        {project.tech?.map((t) => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>
      <div className="flex gap-2">
        {project.demo && <a className="btn btn-outline" href={project.demo} target="_blank" rel="noreferrer">Live</a>}
        {project.source && <a className="btn" href={project.source} target="_blank" rel="noreferrer">Code</a>}
      </div>
      <Link className="btn mt-4 inline-block" href="/">← Home</Link>
    </div>
  );
}

