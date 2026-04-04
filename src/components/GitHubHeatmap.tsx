import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

const GitHubHeatmap = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [stats, setStats] = useState({
    totalContributions: 0,
    currentStreak: 0,
    longestStreak: 0,
  });

  useEffect(() => {
    const generateMockData = () => {
      const data: ContributionDay[] = [];
      const today = new Date();
      const startDate = new Date(today);
      startDate.setDate(today.getDate() - 364);

      for (let i = 0; i < 365; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);

        const random = Math.random();
        let count = 0;
        let level: 0 | 1 | 2 | 3 | 4 = 0;

        if (random > 0.3) {
          if (random > 0.85) {
            count = Math.floor(Math.random() * 10) + 10;
            level = 4;
          } else if (random > 0.7) {
            count = Math.floor(Math.random() * 6) + 5;
            level = 3;
          } else if (random > 0.5) {
            count = Math.floor(Math.random() * 4) + 2;
            level = 2;
          } else {
            count = 1;
            level = 1;
          }
        }

        data.push({
          date: currentDate.toISOString().split('T')[0],
          count,
          level,
        });
      }

      const total = data.reduce((sum, day) => sum + day.count, 0);

      let currentStreak = 0;
      let longestStreak = 0;
      let tempStreak = 0;

      for (let i = data.length - 1; i >= 0; i--) {
        if (data[i].count > 0) {
          tempStreak++;
          if (i === data.length - 1 || currentStreak > 0) {
            currentStreak = tempStreak;
          }
          longestStreak = Math.max(longestStreak, tempStreak);
        } else {
          if (i === data.length - 1) {
            currentStreak = 0;
          }
          tempStreak = 0;
        }
      }

      setContributions(data);
      setStats({
        totalContributions: total,
        currentStreak,
        longestStreak,
      });
    };

    generateMockData();
  }, []);

  const getLevelColor = (level: number) => {
    const colors = [
      'bg-white/5',
      'bg-[#22C55E]/20',
      'bg-[#22C55E]/40',
      'bg-[#22C55E]/60',
      'bg-[#22C55E]',
    ];
    return colors[level];
  };

  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
        >
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="text-3xl font-bold text-[#22C55E] mb-1">
                {stats.totalContributions}
              </div>
              <div className="text-sm text-[#9CA3AF]">Total Contributions</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="text-3xl font-bold text-[#6366F1] mb-1">
                {stats.currentStreak}
              </div>
              <div className="text-sm text-[#9CA3AF]">Current Streak</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="text-3xl font-bold text-[#22C55E] mb-1">
                {stats.longestStreak}
              </div>
              <div className="text-sm text-[#9CA3AF]">Longest Streak</div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              <div className="flex gap-1 mb-2">
                <div className="w-8"></div>
                {months.map((month, i) => (
                  <div
                    key={i}
                    className="text-xs text-[#9CA3AF] flex-1 text-center"
                    style={{ minWidth: '60px' }}
                  >
                    {month}
                  </div>
                ))}
              </div>

              <div className="flex gap-1">
                <div className="flex flex-col gap-1 justify-between py-1">
                  {days.filter((_, i) => i % 2 === 1).map((day) => (
                    <div key={day} className="text-xs text-[#9CA3AF] h-3 flex items-center">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="flex gap-1 flex-1">
                  {weeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-1">
                      {week.map((day, dayIndex) => (
                        <motion.div
                          key={`${weekIndex}-${dayIndex}`}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{
                            duration: 0.2,
                            delay: (weekIndex * 7 + dayIndex) * 0.001,
                          }}
                          className={`w-3 h-3 rounded-sm ${getLevelColor(day.level)} border border-white/5 hover:border-[#22C55E] transition-all cursor-pointer group relative`}
                          title={`${day.count} contributions on ${day.date}`}
                        >
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#1F2937] border border-white/10 rounded text-xs text-[#E5E7EB] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                            {day.count} contributions
                            <br />
                            {day.date}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4 text-xs text-[#9CA3AF]">
                <span>Less</span>
                {[0, 1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`w-3 h-3 rounded-sm ${getLevelColor(level)} border border-white/5`}
                  />
                ))}
                <span>More</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubHeatmap;
