import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { BookOpen, Calendar, Clock, ArrowRight, Tag } from 'lucide-react';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  category: string;
}

const Blog = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const articles: Article[] = [
    {
      id: 1,
      title: 'Building Scalable Microservices with Node.js',
      excerpt: 'Deep dive into designing and implementing microservices architecture using Node.js, Docker, and Kubernetes for production-ready applications.',
      date: '2024-03-15',
      readTime: '8 min',
      tags: ['Node.js', 'Microservices', 'Docker'],
      category: 'Architecture',
    },
    {
      id: 2,
      title: 'React Performance Optimization Techniques',
      excerpt: 'Comprehensive guide to optimizing React applications including memoization, code splitting, lazy loading, and advanced hooks patterns.',
      date: '2024-03-10',
      readTime: '6 min',
      tags: ['React', 'Performance', 'Optimization'],
      category: 'Frontend',
    },
    {
      id: 3,
      title: 'TypeScript Best Practices for Large Scale Applications',
      excerpt: 'Essential TypeScript patterns and practices for maintaining type safety and code quality in enterprise-level projects.',
      date: '2024-03-05',
      readTime: '10 min',
      tags: ['TypeScript', 'Best Practices', 'Enterprise'],
      category: 'Development',
    },
    {
      id: 4,
      title: 'Implementing Real-time Features with WebSockets',
      excerpt: 'Learn how to build real-time communication features using WebSockets, Socket.io, and modern messaging patterns.',
      date: '2024-02-28',
      readTime: '7 min',
      tags: ['WebSockets', 'Real-time', 'Socket.io'],
      category: 'Backend',
    },
    {
      id: 5,
      title: 'CI/CD Pipeline Best Practices with GitHub Actions',
      excerpt: 'Complete guide to setting up automated testing, deployment, and continuous integration workflows using GitHub Actions.',
      date: '2024-02-20',
      readTime: '9 min',
      tags: ['CI/CD', 'DevOps', 'GitHub'],
      category: 'DevOps',
    },
    {
      id: 6,
      title: 'Database Optimization: PostgreSQL Performance Tuning',
      excerpt: 'Advanced techniques for optimizing PostgreSQL queries, indexing strategies, and database performance monitoring.',
      date: '2024-02-15',
      readTime: '12 min',
      tags: ['PostgreSQL', 'Database', 'Performance'],
      category: 'Backend',
    },
  ];

  const categories = ['All', ...Array.from(new Set(articles.map(a => a.category)))];

  const filteredArticles = selectedCategory === 'All'
    ? articles
    : articles.filter(a => a.category === selectedCategory);

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#6366F1]/10 rounded-full filter blur-[128px]" />
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
            <BookOpen className="w-6 h-6 text-[#6366F1]" />
            <span className="text-[#6366F1] font-medium text-sm tracking-wider uppercase">
              Technical Writing
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#E5E7EB] mb-4">
            Articles & Insights
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#6366F1] to-[#22C55E] mx-auto rounded-full" />
          <p className="text-[#9CA3AF] mt-4 max-w-2xl mx-auto">
            Sharing knowledge about software development, architecture, and best practices
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-[#6366F1] to-[#22C55E] text-white shadow-lg shadow-[#6366F1]/30'
                  : 'bg-white/5 text-[#9CA3AF] hover:bg-white/10 border border-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-[#6366F1]/50 transition-all duration-300 group cursor-pointer"
            >
              <div className="h-48 bg-gradient-to-br from-[#6366F1]/20 to-[#22C55E]/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[#1F2937]/50 backdrop-blur-sm flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-[#6366F1] opacity-50 group-hover:scale-110 transition-transform" />
                </div>
                <div className="absolute top-4 right-4 px-3 py-1 bg-[#6366F1] text-white text-xs font-medium rounded-full">
                  {article.category}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-[#9CA3AF] mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#E5E7EB] mb-3 group-hover:text-[#6366F1] transition-colors">
                  {article.title}
                </h3>

                <p className="text-[#9CA3AF] text-sm mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-[#9CA3AF]"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>

                <button className="flex items-center gap-2 text-[#6366F1] font-medium text-sm group-hover:gap-3 transition-all">
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-4 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
            <div className="text-left">
              <div className="text-2xl font-bold text-[#E5E7EB] mb-1">
                {articles.length}+ Articles
              </div>
              <div className="text-sm text-[#9CA3AF]">
                Technical insights and tutorials
              </div>
            </div>
            <div className="h-12 w-px bg-white/10"></div>
            <div className="text-left">
              <div className="text-2xl font-bold text-[#22C55E] mb-1">
                50k+ Reads
              </div>
              <div className="text-sm text-[#9CA3AF]">
                Community engagement
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
