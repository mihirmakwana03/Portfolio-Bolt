import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Calendar, GitCommitVertical as GitCommit, Flame, TrendingUp } from 'lucide-react';
import { fetchGitHubContributionsLastYear, GITHUB_USERNAME } from '../lib/githubContributions';
import type { ContributionDay } from '../lib/githubContributions';

const GitHubHeatmap = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalContributions: 0,
    currentStreak: 0,
    longestStreak: 0,
  });

  useEffect(() => {
    let cancelled = false;

    fetchGitHubContributionsLastYear()
      .then((data) => {
        if (cancelled) return;
        setContributions(data.contributions);
        setStats({
          totalContributions: data.totalContributions,
          currentStreak: data.currentStreak,
          longestStreak: data.longestStreak,
        });
      })
      .catch(() => {
        if (cancelled) return;
        setContributions([]);
        setStats({ totalContributions: 0, currentStreak: 0, longestStreak: 0 });
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const getLevelColor = (level: number) => {
    const colors = [
      'bg-white/5',
      'bg-[#22C55E]/25',
      'bg-[#22C55E]/45',
      'bg-[#22C55E]/70',
      'bg-[#22C55E]',
    ];
    return colors[level];
  };

  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }

  const getMonthLabels = () => {
    const labels: { label: string; weekIndex: number }[] = [];
    let lastMonth = -1;
    weeks.forEach((week, wi) => {
      if (week[0]) {
        const m = new Date(week[0].date).getMonth();
        if (m !== lastMonth) {
          labels.push({
            label: new Date(week[0].date).toLocaleString('default', { month: 'short' }),
            weekIndex: wi,
          });
          lastMonth = m;
        }
      }
    });
    return labels;
  };

  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthLabels = getMonthLabels();

  const statCards = [
    { icon: GitCommit, label: 'Total Contributions', value: stats.totalContributions, color: 'text-[#22C55E]' },
    { icon: Flame, label: 'Current Streak', value: `${stats.currentStreak}d`, color: 'text-[#F97316]' },
    { icon: TrendingUp, label: 'Longest Streak', value: `${stats.longestStreak}d`, color: 'text-[#6366F1]' },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#22C55E]/10 rounded-full filter blur-[128px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calendar className="w-6 h-6 text-[#22C55E]" />
            <span className="text-[#6366F1] font-medium text-sm tracking-wider uppercase">
              Activity
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#E5E7EB] mb-4">
            GitHub Contributions
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#6366F1] to-[#22C55E] mx-auto rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6 md:p-8"
        >
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8">
            {statCards.map((card) => (
              <div
                key={card.label}
                className="text-center p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
              >
                <card.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${card.color} mx-auto mb-1.5 sm:mb-2`} />
                <div className={`text-lg sm:text-2xl md:text-3xl font-bold ${card.color} mb-1`}>
                  {loading ? '—' : card.value}
                </div>
                <div className="text-[10px] sm:text-xs text-[#9CA3AF]">{card.label}</div>
              </div>
            ))}
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-40 text-[#9CA3AF] text-sm">
              Loading contributions...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full">
                <div className="relative flex mb-1 ml-8">
                  {monthLabels.map((m) => (
                    <div
                      key={`${m.label}-${m.weekIndex}`}
                      className="absolute text-xs text-[#9CA3AF]"
                      style={{ left: `${m.weekIndex * 14}px` }}
                    >
                      {m.label}
                    </div>
                  ))}
                  <div style={{ height: '16px' }} />
                </div>

                <div className="flex gap-0.5 mt-1">
                  <div className="flex flex-col gap-0.5 mr-1 justify-around">
                    {dayLabels.map((day, i) => (
                      <div
                        key={day}
                        className={`text-[10px] text-[#9CA3AF] h-3 flex items-center ${i % 2 === 0 ? 'opacity-0' : ''}`}
                        style={{ width: '24px' }}
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-0.5">
                    {weeks.map((week, weekIndex) => (
                      <div key={weekIndex} className="flex flex-col gap-0.5">
                        {week.map((day, dayIndex) => (
                          <motion.div
                            key={`${weekIndex}-${dayIndex}`}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{
                              duration: 0.15,
                              delay: (weekIndex * 7 + dayIndex) * 0.0008,
                            }}
                            className={`w-3 h-3 rounded-sm ${getLevelColor(day.level)} border border-white/5 hover:border-[#22C55E]/60 transition-all cursor-pointer group relative`}
                          >
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#1F2937] border border-white/10 rounded text-xs text-[#E5E7EB] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                              {day.count} contribution{day.count !== 1 ? 's' : ''}
                              <br />
                              {day.date}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 text-xs text-[#9CA3AF] ml-8">
                  <span>Less</span>
                  {[0, 1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`w-3 h-3 rounded-sm ${getLevelColor(level)} border border-white/5`}
                    />
                  ))}
                  <span>More</span>
                  <span className="ml-auto text-[#6B7280]">
                    <a
                      href={`https://github.com/${GITHUB_USERNAME}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#22C55E] transition-colors"
                    >
                      @{GITHUB_USERNAME}
                    </a>
                  </span>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubHeatmap;
