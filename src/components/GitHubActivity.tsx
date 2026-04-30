import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Github, GitFork, Code2, Activity, Star } from 'lucide-react';

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
}

const GitHubActivity = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ repos: 0, stars: 0, forks: 0 });

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const [userResponse, reposResponse] = await Promise.all([
          fetch('https://api.github.com/users/mihirmakwana03'),
          fetch('https://api.github.com/users/mihirmakwana03/repos?sort=updated&per_page=100'),
        ]);
        const userData = await userResponse.json();
        const allRepos: Repository[] = await reposResponse.json();

        const recentRepos = allRepos.slice(0, 6);
        setRepos(recentRepos);

        const totalStars = allRepos.reduce((acc: number, repo: Repository) => acc + repo.stargazers_count, 0);
        const totalForks = allRepos.reduce((acc: number, repo: Repository) => acc + repo.forks_count, 0);
        setStats({ repos: userData.public_repos ?? allRepos.length, stars: totalStars, forks: totalForks });
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  const languageColors: { [key: string]: string } = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Python: '#3572A5',
    Java: '#b07219',
    PHP: '#4F5D95',
    HTML: '#e34c26',
    CSS: '#563d7c',
  };

  return (
    <section id="github" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#6366F1]/10 rounded-full filter blur-[128px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#6366F1] font-medium text-sm tracking-wider uppercase">
            Open Source
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#E5E7EB] mt-4 mb-6">
            GitHub Activity
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#6366F1] to-[#22C55E] mx-auto rounded-full" />
          <p className="text-[#9CA3AF] mt-6 max-w-2xl mx-auto">
            Active contributor building and sharing projects on GitHub
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 gap-3 sm:gap-6 mb-10 sm:mb-12"
        >
          <div className="p-4 sm:p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-center">
            <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-[#6366F1] mx-auto mb-2 sm:mb-3" />
            <div className="text-2xl sm:text-3xl font-bold text-[#E5E7EB] mb-1">{stats.repos}</div>
            <div className="text-[#9CA3AF] text-xs sm:text-sm">Public Repositories</div>
          </div>
          <div className="p-4 sm:p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-center">
            <GitFork className="w-6 h-6 sm:w-8 sm:h-8 text-[#22C55E] mx-auto mb-2 sm:mb-3" />
            <div className="text-2xl sm:text-3xl font-bold text-[#E5E7EB] mb-1">{stats.forks}</div>
            <div className="text-[#9CA3AF] text-xs sm:text-sm">Total Forks</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-[#E5E7EB] mb-6 text-center">
            Recent Repositories
          </h3>

          {loading ? (
            <div className="text-center text-[#9CA3AF] py-12">Loading repositories...</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {repos.slice(0, 6).map((repo, index) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="group p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#6366F1]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#6366F1]/20"
                >
                  <div className="flex items-start justify-between mb-3">
                    <Code2 className="w-5 h-5 text-[#6366F1] flex-shrink-0" />
                    <div className="flex items-center gap-3 text-[#9CA3AF] text-sm">
                      <span className="flex items-center gap-1">
                        <Star size={14} />
                        {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork size={14} />
                        {repo.forks_count}
                      </span>
                    </div>
                  </div>

                  <h4 className="text-[#E5E7EB] font-semibold mb-2 group-hover:text-[#6366F1] transition-colors">
                    {repo.name}
                  </h4>
                  <p className="text-[#9CA3AF] text-sm mb-4 line-clamp-2">
                    {repo.description || 'No description available'}
                  </p>

                  <div className="flex items-center gap-2">
                    {repo.language && (
                      <span className="flex items-center gap-1 text-xs text-[#9CA3AF]">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: languageColors[repo.language] || '#888' }}
                        />
                        {repo.language}
                      </span>
                    )}
                    <span className="text-xs text-[#9CA3AF]">
                      Updated {new Date(repo.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <a
            href="https://github.com/mihirmakwana03"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#6366F1] to-[#22C55E] text-white rounded-lg font-medium hover:shadow-lg hover:shadow-[#6366F1]/50 transition-all duration-300"
          >
            <Github size={20} />
            View Full GitHub Profile
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubActivity;
