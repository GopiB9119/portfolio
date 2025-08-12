"use client";
import { useState, useEffect } from "react";

interface GitHubStatsProps {
  username: string;
  showPrivate?: boolean;
}

interface GitHubData {
  user: {
    name: string;
    login: string;
    avatar_url: string;
    public_repos: number;
    followers: number;
    following: number;
    created_at: string;
    bio: string;
  } | null;
  repos: Array<{
    name: string;
    description: string;
    language: string;
    stargazers_count: number;
    forks_count: number;
    updated_at: string;
    html_url: string;
  }>;
  languages: Record<string, number>;
  totalStars: number;
  totalForks: number;
  loading: boolean;
  error: string | null;
}

export default function GitHubStats({ username, showPrivate = false }: GitHubStatsProps) {
  const [data, setData] = useState<GitHubData>({
    user: null,
    repos: [],
    languages: {},
    totalStars: 0,
    totalForks: 0,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setData(prev => ({ ...prev, loading: true, error: null }));

        // Fetch user data
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        if (!userResponse.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await userResponse.json();

        // Fetch repositories
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
        if (!reposResponse.ok) {
          throw new Error('Failed to fetch repositories');
        }
        const reposData = await reposResponse.json();

        // Filter out private repos if not showing them
        const filteredRepos = showPrivate ? reposData : reposData.filter((repo: any) => !repo.private);

        // Calculate statistics
        const languages: Record<string, number> = {};
        let totalStars = 0;
        let totalForks = 0;

        filteredRepos.forEach((repo: any) => {
          if (repo.language) {
            languages[repo.language] = (languages[repo.language] || 0) + 1;
          }
          totalStars += repo.stargazers_count;
          totalForks += repo.forks_count;
        });

        setData({
          user: userData,
          repos: filteredRepos.slice(0, 6), // Show top 6 repos
          languages,
          totalStars,
          totalForks,
          loading: false,
          error: null
        });

      } catch (error) {
        setData(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to fetch GitHub data'
        }));
      }
    };

    if (username) {
      fetchGitHubData();
    }
  }, [username, showPrivate]);

  if (data.loading) {
    return (
      <div className="card p-6">
        <div className="animate-pulse">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-[var(--panel)] rounded-full"></div>
            <div>
              <div className="h-4 bg-[var(--panel)] rounded w-32 mb-2"></div>
              <div className="h-3 bg-[var(--panel)] rounded w-24"></div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="text-center">
                <div className="h-6 bg-[var(--panel)] rounded w-8 mx-auto mb-1"></div>
                <div className="h-3 bg-[var(--panel)] rounded w-16 mx-auto"></div>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-4 bg-[var(--panel)] rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (data.error) {
    return (
      <div className="card p-6 text-center">
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="font-semibold text-[var(--foreground)] mb-2">Unable to Load GitHub Stats</h3>
        <p className="text-sm text-[var(--muted)]">{data.error}</p>
      </div>
    );
  }

  if (!data.user) {
    return null;
  }

  const topLanguages = Object.entries(data.languages)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  const languageColors: Record<string, string> = {
    JavaScript: '#f1e05a',
    TypeScript: '#2b7489',
    Python: '#3572A5',
    Java: '#b07219',
    CSS: '#563d7c',
    HTML: '#e34c26',
    React: '#61dafb',
    'C++': '#f34b7d',
    Go: '#00ADD8',
    Rust: '#dea584'
  };

  return (
    <div className="card p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={data.user.avatar_url}
          alt={data.user.name || data.user.login}
          className="w-16 h-16 rounded-full border-2 border-[var(--border)]"
        />
        <div>
          <h3 className="text-lg font-bold text-[var(--foreground)]">
            {data.user.name || data.user.login}
          </h3>
          <a
            href={`https://github.com/${data.user.login}`}
            target="_blank"
            rel="noreferrer"
            className="text-[var(--primary)] hover:text-[var(--accent)] transition-colors text-sm flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
            </svg>
            @{data.user.login}
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-[var(--primary)]">{data.user.public_repos}</div>
          <div className="text-sm text-[var(--muted)]">Repositories</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-[var(--primary)]">{data.totalStars}</div>
          <div className="text-sm text-[var(--muted)]">Stars</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-[var(--primary)]">{data.user.followers}</div>
          <div className="text-sm text-[var(--muted)]">Followers</div>
        </div>
      </div>

      {/* Top Languages */}
      {topLanguages.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-[var(--foreground)] mb-3">Top Languages</h4>
          <div className="space-y-2">
            {topLanguages.map(([language, count]) => {
              const percentage = (count / data.repos.length) * 100;
              const color = languageColors[language] || '#6b7280';
              
              return (
                <div key={language} className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: color }}
                  ></div>
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-sm text-[var(--foreground)]">{language}</span>
                    <span className="text-xs text-[var(--muted)]">{count} repos</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recent Repositories */}
      {data.repos.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-[var(--foreground)] mb-3">Recent Repositories</h4>
          <div className="space-y-3">
            {data.repos.slice(0, 3).map((repo) => (
              <a
                key={repo.name}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="block p-3 bg-[var(--panel)] rounded-lg border border-[var(--border)] hover:border-[var(--primary)] transition-colors group"
              >
                <div className="flex items-start justify-between mb-2">
                  <h5 className="font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                    {repo.name}
                  </h5>
                  <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
                    {repo.stargazers_count > 0 && (
                      <div className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {repo.stargazers_count}
                      </div>
                    )}
                    {repo.language && (
                      <span 
                        className="px-2 py-0.5 rounded text-xs"
                        style={{ 
                          backgroundColor: `${languageColors[repo.language] || '#6b7280'}20`,
                          color: languageColors[repo.language] || '#6b7280'
                        }}
                      >
                        {repo.language}
                      </span>
                    )}
                  </div>
                </div>
                {repo.description && (
                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    {repo.description.length > 100 
                      ? repo.description.substring(0, 100) + "..." 
                      : repo.description}
                  </p>
                )}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-[var(--border)] text-center">
        <a
          href={`https://github.com/${data.user.login}`}
          target="_blank"
          rel="noreferrer"
          className="btn btn-outline btn-sm"
        >
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
          </svg>
          View on GitHub
        </a>
      </div>
    </div>
  );
}