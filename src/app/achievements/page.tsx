import Link from "next/link";
import data from "@/content/site-data";
import CertificationBadge from "@/components/achievements/CertificationBadge";
import GitHubStats from "@/components/achievements/GitHubStats";
import SkillsRadar from "@/components/achievements/SkillsRadar";

export default function AchievementsPage() {
  const achievements = data.achievements || [];
  const githubUsername = data.metrics?.githubUsername || "";

  // Sample skills data for radar chart
  const skillsData = [
    { name: "React", level: 9, category: "Frontend" },
    { name: "Next.js", level: 8, category: "Frontend" },
    { name: "TypeScript", level: 8, category: "Languages" },
    { name: "JavaScript", level: 9, category: "Languages" },
    { name: "Firebase", level: 7, category: "Backend" },
    { name: "Node.js", level: 6, category: "Backend" },
    { name: "Python", level: 7, category: "Languages" },
    { name: "CSS/Tailwind", level: 8, category: "Frontend" }
  ];

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
            Achievements & Certifications
          </h1>
          
          <p className="text-xl text-[var(--muted)] max-w-3xl mx-auto">
            A comprehensive overview of my professional certifications, achievements, skills assessment, 
            and contributions to the development community. Showcasing continuous learning and growth.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="card text-center p-6">
            <div className="text-3xl font-bold text-[var(--primary)] mb-2">
              {achievements.length}
            </div>
            <div className="text-sm text-[var(--muted)]">Total Achievements</div>
          </div>
          
          <div className="card text-center p-6">
            <div className="text-3xl font-bold text-[var(--primary)] mb-2">
              {achievements.filter(a => a.type === 'certification').length}
            </div>
            <div className="text-sm text-[var(--muted)]">Certifications</div>
          </div>
          
          <div className="card text-center p-6">
            <div className="text-3xl font-bold text-[var(--primary)] mb-2">
              {skillsData.length}
            </div>
            <div className="text-sm text-[var(--muted)]">Core Skills</div>
          </div>
          
          <div className="card text-center p-6">
            <div className="text-3xl font-bold text-[var(--primary)] mb-2">
              {Math.round(skillsData.reduce((acc, skill) => acc + skill.level, 0) / skillsData.length)}
            </div>
            <div className="text-sm text-[var(--muted)]">Avg Skill Level</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="space-y-12">
            {/* Certifications & Achievements */}
            <section>
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-8">
                Certifications & Achievements
              </h2>
              
              {achievements.length > 0 ? (
                <div>
                  {/* Achievement Badges */}
                  <div className="flex flex-wrap justify-center gap-6 mb-8">
                    {achievements.map((achievement, index) => (
                      <div key={achievement.id} className={`animate-fade-in-up animate-delay-${index * 100 + 300}`}>
                        <CertificationBadge 
                          achievement={achievement} 
                          size="large" 
                          showDetails={true}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Achievement Details */}
                  <div className="space-y-6">
                    {achievements.map((achievement, index) => (
                      <div key={achievement.id} className={`card animate-fade-in-up animate-delay-${index * 100 + 600}`}>
                        <div className="flex items-start gap-4">
                          <CertificationBadge 
                            achievement={achievement} 
                            size="small" 
                            showDetails={false}
                          />
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-bold text-[var(--foreground)] mb-1">
                                  {achievement.title}
                                </h3>
                                <p className="text-[var(--primary)] font-semibold text-sm">
                                  {achievement.issuer}
                                </p>
                              </div>
                              
                              <div className="text-right">
                                <div className="text-sm text-[var(--muted)]">
                                  {new Date(achievement.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long'
                                  })}
                                </div>
                                {achievement.credentialId && (
                                  <div className="text-xs text-[var(--muted)]">
                                    ID: {achievement.credentialId}
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <p className="text-[var(--muted)] text-sm leading-relaxed mb-3">
                              {achievement.description}
                            </p>

                            {/* Skills */}
                            {achievement.skills.length > 0 && (
                              <div className="mb-3">
                                <div className="flex flex-wrap gap-1">
                                  {achievement.skills.map((skill) => (
                                    <span key={skill} className="tag text-xs">
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Actions */}
                            <div className="flex items-center gap-3">
                              {achievement.verificationUrl && (
                                <a
                                  href={achievement.verificationUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-[var(--primary)] hover:text-[var(--accent)] transition-colors text-sm font-medium flex items-center gap-1"
                                >
                                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                  Verify
                                </a>
                              )}
                              
                              {achievement.badgeUrl && (
                                <a
                                  href={achievement.badgeUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-[var(--muted)] hover:text-[var(--primary)] transition-colors text-sm font-medium flex items-center gap-1"
                                >
                                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                  </svg>
                                  Badge
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-[var(--panel)] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-[var(--muted)]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">No Achievements Yet</h3>
                  <p className="text-[var(--muted)]">Certifications and achievements will appear here.</p>
                </div>
              )}
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-12">
            {/* Skills Radar */}
            <section>
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-8 text-center">
                Skills Assessment
              </h2>
              <div className="card p-6">
                <SkillsRadar skills={skillsData} size={350} showLabels={true} />
              </div>
            </section>

            {/* GitHub Stats */}
            {githubUsername && (
              <section>
                <h2 className="text-2xl font-bold text-[var(--foreground)] mb-8">
                  GitHub Contributions
                </h2>
                <GitHubStats username={githubUsername} showPrivate={false} />
              </section>
            )}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-[var(--foreground)] mb-4">
              Continuous Learning Journey
            </h3>
            <p className="text-[var(--muted)] mb-6">
              I&#39;m committed to continuous learning and professional development. 
              These achievements represent my dedication to staying current with technology trends and best practices.
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
                View My Work
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}