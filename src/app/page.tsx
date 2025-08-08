import Header from "@/components/Header";
import Section from "@/components/Section";
import data from "@/content/site-data";
import ContactForm from "@/components/ContactForm";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <div className="font-sans min-h-screen">
      <Header />

      <main>
        <section className="py-14">
          <div className="container grid gap-6 md:grid-cols-[1fr_auto] items-center">
            <div>
              <p className="kicker">Hello, I am</p>
              <h1 className="hero-name">{data.name}</h1>
              <p className="muted font-semibold">{data.title}</p>
              {data.location && <p className="muted">{data.location}</p>}

              <div className="flex flex-wrap gap-2 mt-4">
                {data.links?.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="btn">
                    {l.label}
                  </a>
                ))}
                {data.resumeUrl && (
                  <a className="btn btn-primary" href={data.resumeUrl} target="_blank" rel="noreferrer">
                    Download Resume
                  </a>
                )}
              </div>
            </div>
            {data.avatarUrl && (
              <img
                src={data.avatarUrl}
                alt={`${data.name} avatar`}
                className="w-36 h-36 md:w-40 md:h-40 rounded-2xl border border-[var(--border)] object-cover"
                loading="lazy"
              />
            )}
          </div>
        </section>

        <Section id="about" title="About">
          {data.summaryHtml && (
            <div className="prose" dangerouslySetInnerHTML={{ __html: data.summaryHtml }} />
          )}
        </Section>

        <Section id="experience" title="Experience">
          <ul className="grid gap-3">
            {data.experience?.map((exp) => (
              <li key={exp.role + exp.company} className="card">
                <div className="font-bold">{exp.role}</div>
                <div className="muted">{exp.company}</div>
                <div className="text-sm muted">{exp.period}</div>
                <p className="mt-1">{exp.description}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="projects" title="Projects">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {data.projects?.map((p) => (
              <article key={p.name} className="card">
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <p className="muted">{p.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {p.tech?.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
                <div className="flex gap-2 mt-2">
                  {p.slug && (
                    <a className="btn btn-outline" href={`/projects/${p.slug}`}>Details</a>
                  )}
                  {p.demo && (
                    <a className="btn btn-outline" href={p.demo} target="_blank" rel="noreferrer">Live</a>
                  )}
                  {p.source && (
                    <a className="btn" href={p.source} target="_blank" rel="noreferrer">Code</a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section id="skills" title="Skills">
          <div className="flex flex-wrap gap-2">
            {data.skills?.map((s) => (
              <span key={s} className="tag">{s}</span>
            ))}
          </div>
        </Section>

        <Section id="education" title="Education">
          <ul className="grid gap-3">
            {data.education?.map((e) => (
              <li key={e.school + e.period} className="card">
                <div className="font-bold">{e.school}</div>
                <div className="muted">{e.degree}</div>
                <div className="text-sm muted">{e.period}</div>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="contact" title="Contact">
          <div className="grid gap-4">
            {data.email && (
              <p>
                Prefer email? Reach me at {" "}
                <a className="underline" href={`mailto:${data.email}`}>{data.email}</a>.
              </p>
            )}
            <ContactForm />
          </div>
        </Section>
      </main>

      <footer className="border-t border-[var(--border)] py-4 text-sm muted">
        <div className="container flex items-center justify-between">
          <span>© {new Date().getFullYear()} {data.name}. All rights reserved.</span>
          <a className="hover:underline" href="#">Back to top ↑</a>
        </div>
      </footer>
      <ChatWidget />
    </div>
  );
}
