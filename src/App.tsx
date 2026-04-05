import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import GitHubActivity from './components/GitHubActivity';
import GitHubHeatmap from './components/GitHubHeatmap';
import Journey from './components/Journey';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AIChatbot from './components/AIChatbot';

function App() {
  return (
    <div className="min-h-screen bg-[#0B0B0F] text-[#E5E7EB] overflow-x-hidden">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <GitHubActivity />
      <GitHubHeatmap />
      <Journey />
      <Contact />
      <Footer />
      <AIChatbot />
    </div>
  );
}

export default App;
