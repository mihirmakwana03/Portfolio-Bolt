import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { BookOpen, Calendar, Clock, ArrowRight, Tag, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  category: string;
}

const articles: Article[] = [
  {
    id: 1,
    title: 'Building Scalable Microservices with Node.js',
    excerpt: 'Deep dive into designing and implementing microservices architecture using Node.js, Docker, and Kubernetes for production-ready applications.',
    content: `Microservices architecture has become the de-facto standard for building large-scale distributed systems. In this article, we'll explore how to design, implement, and deploy microservices using Node.js.

**Why Microservices?**

Monolithic applications are easy to develop initially but become challenging to maintain as they grow. Microservices break this problem by splitting the application into small, independently deployable services.

**Key Principles**

Each service should have a single responsibility. Services communicate via well-defined APIs — typically REST or message queues like RabbitMQ or Kafka. This enables independent scaling of services based on their load.

**Implementation with Node.js**

Node.js is an excellent choice for microservices due to its non-blocking I/O model. Each service can be a lightweight Express app with its own database. We use Docker for containerisation and Kubernetes for orchestration.

**Service Discovery & Load Balancing**

In a microservices architecture, services need to find and communicate with each other dynamically. Tools like Consul or Kubernetes built-in DNS handle service discovery. Load balancers ensure traffic is distributed evenly.

**Monitoring & Observability**

With many services running, observability becomes critical. Implement distributed tracing with Jaeger or Zipkin, centralised logging with the ELK stack, and metrics collection with Prometheus and Grafana.`,
    date: '2024-03-15',
    readTime: '8 min',
    tags: ['Node.js', 'Microservices', 'Docker'],
    category: 'Architecture',
  },
  {
    id: 2,
    title: 'React Performance Optimization Techniques',
    excerpt: 'Comprehensive guide to optimizing React applications including memoization, code splitting, lazy loading, and advanced hooks patterns.',
    content: `Performance is a feature. Users expect fast, responsive interfaces, and React gives us many tools to achieve this. Let's explore the most impactful optimization techniques.

**Memoization with useMemo and useCallback**

Expensive computations should be memoized using \`useMemo\`. Event handlers passed as props should be wrapped with \`useCallback\` to prevent child re-renders.

**React.memo for Component Memoization**

Wrap components that receive the same props frequently with \`React.memo\`. This performs a shallow comparison and skips re-rendering if props haven't changed.

**Code Splitting and Lazy Loading**

Use \`React.lazy\` and \`Suspense\` to split your bundle and load components only when needed. This significantly reduces the initial bundle size and improves Time to Interactive.

**Virtualization for Long Lists**

Rendering thousands of items causes performance degradation. Libraries like \`react-window\` or \`react-virtual\` render only visible items, keeping the DOM lean.

**Avoiding Unnecessary State**

Not everything needs to be in state. Derived values should be computed during render, not stored in state. This reduces the number of re-renders and simplifies your component logic.`,
    date: '2024-03-10',
    readTime: '6 min',
    tags: ['React', 'Performance', 'Optimization'],
    category: 'Frontend',
  },
  {
    id: 3,
    title: 'TypeScript Best Practices for Large Scale Applications',
    excerpt: 'Essential TypeScript patterns and practices for maintaining type safety and code quality in enterprise-level projects.',
    content: `TypeScript has transformed how we build large-scale JavaScript applications. Here are the patterns and practices that make TypeScript shine in enterprise environments.

**Strict Mode**

Always enable \`strict: true\` in your tsconfig. This enables all strict type-checking options and catches more bugs at compile time.

**Discriminated Unions**

Use discriminated unions for modelling states. Instead of having nullable fields, use a union type where each variant has a type discriminator.

**Generic Constraints**

When writing generic functions, use constraints to ensure type safety while maintaining flexibility. This makes your utilities both type-safe and reusable.

**Utility Types**

TypeScript ships with powerful utility types like \`Partial<T>\`, \`Required<T>\`, \`Pick<T, K>\`, and \`Omit<T, K>\`. Use them to derive new types from existing ones.

**Type Guards and Narrowing**

Write custom type guards to narrow union types safely. This is preferable to type assertions as it provides runtime safety as well.

**Module Augmentation**

Extend third-party types without modifying their source by using declaration merging and module augmentation. This is essential for working with libraries that have incomplete type definitions.`,
    date: '2024-03-05',
    readTime: '10 min',
    tags: ['TypeScript', 'Best Practices', 'Enterprise'],
    category: 'Development',
  },
  {
    id: 4,
    title: 'Implementing Real-time Features with WebSockets',
    excerpt: 'Learn how to build real-time communication features using WebSockets, Socket.io, and modern messaging patterns.',
    content: `Real-time features — live chat, notifications, collaborative editing — are now expected in modern applications. WebSockets provide the persistent, bidirectional connection we need.

**WebSockets vs HTTP Polling**

Traditional polling sends HTTP requests at intervals — wasteful and slow. WebSockets maintain a persistent connection, enabling instant, server-pushed updates with minimal overhead.

**Getting Started with Socket.io**

Socket.io abstracts over WebSockets and provides useful features like automatic reconnection, room-based messaging, and namespaces. It gracefully falls back to polling when WebSockets aren't available.

**Rooms and Namespaces**

Use namespaces to segment different areas of your application, and rooms to group users for targeted messaging. This architecture scales well for chat applications and collaborative tools.

**Authentication**

Authenticate WebSocket connections by passing a JWT token during the handshake. Validate it server-side before allowing the connection to establish.

**Scaling Horizontally**

Single-server WebSocket solutions don't scale. Use Redis Pub/Sub as an adapter to synchronise state across multiple Node.js instances, enabling horizontal scaling without losing messages.`,
    date: '2024-02-28',
    readTime: '7 min',
    tags: ['WebSockets', 'Real-time', 'Socket.io'],
    category: 'Backend',
  },
  {
    id: 5,
    title: 'CI/CD Pipeline Best Practices with GitHub Actions',
    excerpt: 'Complete guide to setting up automated testing, deployment, and continuous integration workflows using GitHub Actions.',
    content: `Continuous Integration and Deployment is the backbone of modern software delivery. GitHub Actions makes it remarkably easy to automate your entire pipeline.

**Pipeline Structure**

A good pipeline has distinct stages: lint and type-check, unit tests, integration tests, build, and deploy. Each stage must pass before the next begins.

**Matrix Builds**

Test across multiple Node.js versions and operating systems simultaneously using matrix strategy. This catches platform-specific bugs before they reach production.

**Caching Dependencies**

Cache npm dependencies between runs using \`actions/cache\`. This reduces pipeline duration from minutes to seconds.

**Environment-Based Deployments**

Use GitHub Environments to manage deployment targets (staging, production) with required reviewers and environment-specific secrets.

**Security Scanning**

Integrate security scanning tools like Snyk or OWASP Dependency Check into your pipeline. Fail builds when high-severity vulnerabilities are detected.

**Notifications**

Integrate Slack or Teams notifications to alert your team about build failures. Quick feedback loops are essential for maintaining a healthy codebase.`,
    date: '2024-02-20',
    readTime: '9 min',
    tags: ['CI/CD', 'DevOps', 'GitHub'],
    category: 'DevOps',
  },
  {
    id: 6,
    title: 'Database Optimization: PostgreSQL Performance Tuning',
    excerpt: 'Advanced techniques for optimizing PostgreSQL queries, indexing strategies, and database performance monitoring.',
    content: `Database performance is often the bottleneck in web applications. PostgreSQL is incredibly powerful, but requires tuning to perform at scale.

**EXPLAIN ANALYZE**

Always start with \`EXPLAIN ANALYZE\` to understand query execution plans. Look for sequential scans on large tables — these are candidates for indexing.

**Indexing Strategies**

Create indexes on columns used in WHERE clauses, JOIN conditions, and ORDER BY. Use partial indexes for filtered queries, and composite indexes for multi-column conditions.

**Connection Pooling**

PostgreSQL connections are expensive. Use PgBouncer as a connection pooler to reuse connections efficiently, especially in high-concurrency environments.

**Query Optimisation**

Avoid SELECT * — fetch only the columns you need. Use JOINs instead of subqueries where possible. Batch inserts and updates using transactions.

**Vacuuming and Autovacuum**

PostgreSQL uses MVCC (Multi-Version Concurrency Control), which means dead tuples accumulate over time. Ensure autovacuum is configured correctly to reclaim space.

**Read Replicas**

For read-heavy workloads, offload queries to read replicas. This reduces load on the primary and allows it to handle writes more efficiently.`,
    date: '2024-02-15',
    readTime: '12 min',
    tags: ['PostgreSQL', 'Database', 'Performance'],
    category: 'Backend',
  },
];

const categoryColors: Record<string, string> = {
  Architecture: 'bg-[#6366F1]/20 text-[#818CF8] border-[#6366F1]/30',
  Frontend: 'bg-[#22C55E]/20 text-[#4ADE80] border-[#22C55E]/30',
  Development: 'bg-[#F59E0B]/20 text-[#FCD34D] border-[#F59E0B]/30',
  Backend: 'bg-[#EC4899]/20 text-[#F472B6] border-[#EC4899]/30',
  DevOps: 'bg-[#14B8A6]/20 text-[#2DD4BF] border-[#14B8A6]/30',
};

const ArticleModal = ({
  article,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: {
  article: Article;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext) onNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  const colorClass = categoryColors[article.category] ?? 'bg-white/10 text-[#9CA3AF] border-white/10';

  const renderContent = (text: string) =>
    text.split('\n\n').map((para, i) => {
      if (para.startsWith('**') && para.endsWith('**')) {
        return (
          <h3 key={i} className="text-lg font-bold text-[#E5E7EB] mt-6 mb-2">
            {para.replace(/\*\*/g, '')}
          </h3>
        );
      }
      return (
        <p key={i} className="text-[#9CA3AF] leading-relaxed">
          {para.split('`').map((chunk, ci) =>
            ci % 2 === 1 ? (
              <code key={ci} className="px-1.5 py-0.5 bg-white/10 rounded text-[#22C55E] text-sm font-mono">
                {chunk}
              </code>
            ) : (
              chunk
            )
          )}
        </p>
      );
    });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
        className="relative bg-[#111118] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between p-6 border-b border-white/10 flex-shrink-0">
          <div className="flex-1 pr-4">
            <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full border mb-3 ${colorClass}`}>
              {article.category}
            </span>
            <h2 className="text-xl font-bold text-[#E5E7EB] leading-tight">{article.title}</h2>
            <div className="flex items-center gap-4 mt-3 text-sm text-[#6B7280]">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime} read
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[#6B7280] hover:text-[#E5E7EB] hover:bg-white/5 transition-all flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {renderContent(article.content)}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5 mt-6">
            {article.tags.map((tag) => (
              <span key={tag} className="flex items-center gap-1 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-[#9CA3AF]">
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between p-4 border-t border-white/10 flex-shrink-0">
          <button
            onClick={onPrev}
            disabled={!hasPrev}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-[#9CA3AF] hover:text-[#E5E7EB] hover:bg-white/5 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          <span className="text-xs text-[#4B5563]">Press ← → to navigate</span>
          <button
            onClick={onNext}
            disabled={!hasNext}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-[#9CA3AF] hover:text-[#E5E7EB] hover:bg-white/5 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

import { useEffect } from 'react';

const Blog = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openArticle, setOpenArticle] = useState<Article | null>(null);

  const categories = ['All', ...Array.from(new Set(articles.map((a) => a.category)))];
  const filteredArticles = selectedCategory === 'All' ? articles : articles.filter((a) => a.category === selectedCategory);

  const openIdx = openArticle ? filteredArticles.findIndex((a) => a.id === openArticle.id) : -1;

  const colorClass = (category: string) =>
    categoryColors[category] ?? 'bg-white/10 text-[#9CA3AF] border-white/10';

  return (
    <>
      <section id="blog" className="py-20 relative overflow-hidden">
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
                className={`px-5 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-[#6366F1] to-[#22C55E] text-white shadow-lg shadow-[#6366F1]/25'
                    : 'bg-white/5 text-[#9CA3AF] hover:bg-white/10 border border-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  onClick={() => setOpenArticle(article)}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-[#6366F1]/40 hover:shadow-lg hover:shadow-[#6366F1]/10 transition-all duration-300 group cursor-pointer"
                >
                  <div className="h-44 bg-gradient-to-br from-[#6366F1]/15 to-[#22C55E]/15 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BookOpen className="w-14 h-14 text-[#6366F1] opacity-30 group-hover:scale-110 group-hover:opacity-50 transition-all duration-300" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111118]/80 to-transparent" />
                    <div className={`absolute top-3 right-3 text-xs font-medium px-2.5 py-1 rounded-full border ${colorClass(article.category)}`}>
                      {article.category}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-3 text-xs text-[#6B7280] mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#E5E7EB] mb-2 group-hover:text-[#818CF8] transition-colors leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-[#9CA3AF] text-sm mb-4 line-clamp-2 leading-relaxed">
                      {article.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {article.tags.map((tag) => (
                        <span key={tag} className="flex items-center gap-1 px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-[#9CA3AF]">
                          <Tag className="w-2.5 h-2.5" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-[#6366F1] font-medium text-sm group-hover:gap-3 transition-all">
                      Read Article
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-4 p-5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
              <div className="text-left">
                <div className="text-2xl font-bold text-[#E5E7EB] mb-0.5">{articles.length}+ Articles</div>
                <div className="text-sm text-[#9CA3AF]">Technical insights and tutorials</div>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div className="text-left">
                <div className="text-2xl font-bold text-[#22C55E] mb-0.5">50k+ Reads</div>
                <div className="text-sm text-[#9CA3AF]">Community engagement</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {openArticle && (
          <ArticleModal
            article={openArticle}
            onClose={() => setOpenArticle(null)}
            onPrev={() => openIdx > 0 && setOpenArticle(filteredArticles[openIdx - 1])}
            onNext={() => openIdx < filteredArticles.length - 1 && setOpenArticle(filteredArticles[openIdx + 1])}
            hasPrev={openIdx > 0}
            hasNext={openIdx < filteredArticles.length - 1}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Blog;
