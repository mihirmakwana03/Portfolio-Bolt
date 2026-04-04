import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, MapPin, Phone, Send, Github, Linkedin, Copy, Check } from 'lucide-react';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('mihirpmakwana786@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    setSubmitStatus({
      type: 'success',
      message: 'Thank you for your message! I\'ll get back to you soon.',
    });
    const formDataCopy = { ...formData };
    setFormData({ name: '', email: '', subject: '', message: '' });

    fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/contact`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(formDataCopy),
      }
    ).catch(() => {});

    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'mihirpmakwana786@gmail.com',
      link: 'mailto:mihirpmakwana786@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+44 7901037057',
      link: 'tel:+447901037057',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'London, United Kingdom',
      link: null,
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      link: 'https://github.com/mihirmakwana03',
      color: 'hover:text-[#6366F1]',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      link: 'https://www.linkedin.com/in/mihir-makwana-a098a21b7/',
      color: 'hover:text-[#22C55E]',
    },
  ];

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6366F1]/10 rounded-full filter blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#22C55E]/10 rounded-full filter blur-[128px]" />
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
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#E5E7EB] mt-4 mb-6">
            Let's Work Together
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#6366F1] to-[#22C55E] mx-auto rounded-full" />
          <p className="text-[#9CA3AF] mt-6 max-w-2xl mx-auto">
            Have a project in mind or want to discuss opportunities? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-[#E5E7EB] mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#6366F1]/50 transition-all duration-300"
                  >
                    <div className="p-3 rounded-lg bg-gradient-to-br from-[#6366F1] to-[#22C55E]">
                      <info.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[#9CA3AF] text-sm mb-1">{info.label}</p>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-[#E5E7EB] hover:text-[#6366F1] transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-[#E5E7EB]">{info.value}</p>
                      )}
                    </div>
                    {info.label === 'Email' && (
                      <button
                        onClick={handleCopyEmail}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        {copied ? (
                          <Check size={18} className="text-[#22C55E]" />
                        ) : (
                          <Copy size={18} className="text-[#9CA3AF]" />
                        )}
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-[#E5E7EB] mb-6">Connect</h3>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#6366F1]/50 text-[#9CA3AF] ${social.color} transition-all duration-300 hover:shadow-lg hover:shadow-[#6366F1]/20`}
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-[#E5E7EB] text-sm font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-[#E5E7EB] placeholder-[#9CA3AF] focus:border-[#6366F1]/50 focus:outline-none transition-colors"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-[#E5E7EB] text-sm font-medium mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-[#E5E7EB] placeholder-[#9CA3AF] focus:border-[#6366F1]/50 focus:outline-none transition-colors"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-[#E5E7EB] text-sm font-medium mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-[#E5E7EB] placeholder-[#9CA3AF] focus:border-[#6366F1]/50 focus:outline-none transition-colors"
                placeholder="Project Inquiry"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-[#E5E7EB] text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-[#E5E7EB] placeholder-[#9CA3AF] focus:border-[#6366F1]/50 focus:outline-none transition-colors resize-none"
                placeholder="Tell me about your project..."
                required
              />
            </div>

            {submitStatus.type && (
              <div
                className={`p-4 rounded-lg ${
                  submitStatus.type === 'success'
                    ? 'bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E]'
                    : 'bg-red-500/10 border border-red-500/20 text-red-400'
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-4 bg-gradient-to-r from-[#6366F1] to-[#22C55E] text-white rounded-lg font-medium hover:shadow-lg hover:shadow-[#6366F1]/50 transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
              <Send size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
