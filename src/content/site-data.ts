export type Experience = {
  role: string;
  company: string;
  period: string;
  description: string;
};

export type Project = {
  name: string;
  description: string;
  tech?: string[];
  demo?: string;
  source?: string;
  slug?: string;
  details?: string;
};

export type Education = {
  school: string;
  degree: string;
  period: string;
};

export type SiteData = {
  name: string;
  title: string;
  location?: string;
  email?: string;
  resumeUrl?: string;
  links?: { label: string; href: string }[];
  avatarUrl?: string;
  summaryHtml?: string;
  experience?: Experience[];
  projects?: Project[];
  skills?: string[];
  education?: Education[];
};

const data: SiteData = {
  name: "Gopi Banoth",
  title: "AI & Full-Stack Developer",
  location: "Hyderabad, India",
  email: "banothgopikrishna19@gmail.com",
  resumeUrl: "/resume.html",
  avatarUrl: "/profile.svg",
  links: [
    { label: "GitHub", href: "https://github.com/GopiB9119" },
    { label: "Phone", href: "tel:+917981710621" },
  ],
  summaryHtml: `
    <p>Motivated and self-driven developer with hands-on experience in full-stack web development,
    Android apps, and AI/ML basics. Passionate about solving real-world problems through code and
    eager to grow through professional opportunities.</p>
    <p><strong>Certifications:</strong> Cisco Introduction to Cybersecurity – 22 June 2022</p>
  `,
  experience: [
    {
      role: "Full-Stack Developer (Projects)",
      company: "Self-initiated",
      period: "Ongoing",
      description:
        "Built multiple apps and websites including a community platform (Next.js), real estate UI (React), and a personal portfolio (Next.js).",
    },
  ],
  projects: [
    {
      name: "Neighborly – Community Web App",
      description:
        "Social platform for neighborhood updates with user auth, posting, and real-time local news.",
      tech: ["Next.js", "Tailwind CSS"],
      slug: "neighborly",
      details:
        "A neighborhood social feed with authentication, post creation, and a realtime ticker for local alerts.",
    },
    {
      name: "Dream Castle – Real Estate Web App",
      description:
        "Property listings with filters and contact features. Clean, responsive UI.",
      tech: ["React", "CSS"],
      slug: "dream-castle",
      details:
        "Responsive property catalog with search and filter, property detail views, and contact integrations.",
    },
    {
      name: "Portfolio Website",
      description: "Personal website to showcase projects and skills.",
      tech: ["Next.js"],
      slug: "portfolio-website",
      details:
        "This site: Next.js App Router, Tailwind, dark mode, SEO, contact form (Resend), Gemini AI chat, optional Turnstile.",
    },
  ],
  skills: [
    "Java",
    "JavaScript",
    "HTML5",
    "CSS3",
    "Python",
    "React.js",
    "Next.js",
    "Tailwind CSS",
    "Node.js (basic)",
    "MongoDB",
    "OpenCV",
    "Microsoft Azure",
    "Databricks",
    "Git/GitHub",
    "CI/CD (basic)",
  ],
  education: [
    {
      school: "Sri Chaitanya Junior College, Khammam",
      degree: "Senior Secondary (12th Grade) — Board of Intermediate Education, Telangana",
      period: "Year of Passing: 2020",
    },
  ],
};

export default data;

