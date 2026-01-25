import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, 
  ArrowRight,  
  Linkedin, 
  Github, 
  X, 
  GraduationCap, 
  Terminal, 
  BookOpen, 
  Code2,
  Globe, 
  Clock, 
  Compass,
  FileText,
  PenTool
} from 'lucide-react';

import meImg from '../assets/me_mario.jpeg';
import homeImg from '../assets/Roomantics.png';
import pulsebuyImg from '../assets/Pulsebuy.png';
import demoVideo from '../assets/full_demo (1).mp4';

const PROJECTS = [
  {
    id: 1,
    title: "Roomantics - AR interior design app",
    category: "Product Design • Development",
    year: "2025",
    image: homeImg,
    details: "A sophisticated AR-driven interface focusing on interior design visualization. Built to bridge the gap between imagination and spatial reality.",
    stack: ["Flutter", "Dart", "ARCore", "Firebase"],
    github: "https://github.com/shar-c0des/Roomantics-AR-App",
    demoVideo: demoVideo
  },
  {
    id: 2,
    title: "PulseBuy",
    category: "Ecommerce • C2C",
    year: "2025",
    image: pulsebuyImg,
    details: "High-performance C2C ecommerce platform focused on speed, security, and a seamless user experience.",
    stack: ["PHP", "MySQL", "Docker", "HTML", "CSS"],
    github: "https://github.com/shar-c0des/PulseBuy",
    demo: "https://shar-c0des.github.io/PulseBuy-demo"
  },
  {
    id: 3,
    title: "Literary Pharmacy",
    category: "Backend Engineering • In Progress",
    year: "2025",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200",
    details: "A literary prescription engine that matches emotional states with targeted literature. Currently developing the core backend architecture and API endpoints.",
    stack: ["Python", "FastAPI", "SQLModel", "PostgreSQL"],
    github: "https://github.com/shar-c0des/literary-pharmacy"
  }
];

const WORKFLOW = [
  { step: "01", name: "DECONSTRUCT", desc: "I start by reducing the problem to its smallest testable parts." },
  { step: "02", name: "DESIGN FOR CHANGE", desc: "Design systems that can change without breaking." },
  { step: "03", name: "BUILD, MEASURE, REFINE", desc: "Ship early, observe behavior, and iterate until the system is stable, fast, and understandable." }
];

const Portfolio = () => {
  const [scrolled, setScrolled] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const timer = setInterval(() => setTime(new Date()), 1000);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/shar-c0des', Icon: Github },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/sharleen-ngomakapile', Icon: Linkedin },
    { name: 'HackerRank', href: 'https://www.hackerrank.com/profile/ngomakapileshar1', Icon: Code2 },
    { name: 'WakaTime', href: 'https://wakatime.com/@meta_angel', Icon: Clock }
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }

        @keyframes pulse-glow {
  0% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.2); }
  50% { box-shadow: 0 0 25px rgba(255, 255, 255, 0.6); }
  100% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.2); }
}

.resume-glow:hover {
  animation: pulse-glow 2s infinite;
  background-color: #ffffff;
  color: #000000;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
      `}</style>
      
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4 bg-black/80 backdrop-blur-xl border-b border-white/5' : 'py-8 bg-transparent'}`}>
        <div className="max-w-screen-2xl mx-auto px-8 md:px-12 flex justify-between items-center">
          <div className="flex items-center space-x-12">
            <Link to="/" className="text-lg font-semibold tracking-tight uppercase">
              SHARLEEN NGOMAKAPILE
            </Link>
            
            <div className="hidden lg:flex items-center space-x-6 border-l border-white/10 pl-12 h-6">
              <div className="flex items-center space-x-2 text-[10px] font-mono text-zinc-500">
                <Clock size={12} />
                <span>{formatTime(time)}</span>
              </div>
              <div className="flex items-center space-x-2 text-[10px] font-mono text-zinc-500">
                <Globe size={12} />
                <span>CPT, SA</span>
              </div>
              <div className="flex items-center space-x-2 text-[10px] font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-zinc-400">OPEN TO NEW OPPORTUNITIES</span>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-10 text-[11px] font-medium tracking-widest text-zinc-400 uppercase">
            <Link to="/blog" className="hover:text-white transition-colors duration-300 flex items-center space-x-1">
              <PenTool size={12} />
              <span>Blog</span>
            </Link>
            {['Work', 'About', 'Resume', 'Contact'].map((item) => {
              if (item === 'Resume') {
                return (
                  <a 
                    key={item} 
                    href="/resume.pdf" 
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors duration-300 flex items-center space-x-1"
                  >
                    <span>{item}</span>
                    <FileText size={12} />
                  </a>
                );
              }
              return (
                <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors duration-300">
                  {item}
                </a>
              );
            })}
          </div>
        </div>
      </nav>

      <main>
        <section className="relative min-h-screen flex flex-col justify-center px-8 md:px-12 pt-20">
          <div className="max-w-screen-2xl mx-auto w-full grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-8 z-10">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <div className="text-zinc-600 mb-8">
                  <span className="text-[10px] font-mono tracking-[0.4em] uppercase">Status: Learning and Building cool stuff</span>
                </div>
                <h1 className="text-[12vw] md:text-[8vw] lg:text-[7.5vw] font-serif italic leading-[1] mb-12 tracking-tight">
                  Designer <span className="font-sans not-italic font-bold tracking-tighter text-zinc-900">&</span> <br />
                  <span className="not-italic font-bold">DEVELOPER</span>
                </h1>
                <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16">
                  <p className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed max-w-md italic">
                     I build things by breaking them, learning fast, and refining until they make sense.
                  </p>
                  <motion.a 
                    href="#work"
                    whileHover={{ scale: 1.05 }}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-zinc-800 flex items-center justify-center group hover:bg-white hover:border-white transition-all duration-500"
                  >
                    <ArrowRight size={24} className="text-zinc-400 group-hover:text-black -rotate-45 group-hover:rotate-0 transition-all duration-500" />
                  </motion.a>
                </div>
              </motion.div>
            </div>
            
            <div className="md:col-span-4 relative flex justify-end group">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                className="w-full aspect-[3/4] md:w-[120%] bg-zinc-950 rounded-sm overflow-hidden border border-white/5 shadow-2xl shadow-white/5"
              >
                <img 
                  src={meImg} 
                  alt="Avatar" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out scale-110 group-hover:scale-100" 
                />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-32 px-8 md:px-12 bg-[#050505] overflow-hidden">
          <div className="max-w-screen-2xl mx-auto">
            <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between border-b border-white/5 pb-12">
              <h2 className="text-5xl md:text-7xl font-serif italic tracking-tight">How I <br /> Build</h2>
              <div className="max-w-xs text-zinc-500 text-sm font-light mt-6 md:mt-0">
                Structure creates freedom. 
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12">
              {WORKFLOW.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="group"
                >
                  <div className="text-[10vw] md:text-[6vw] font-sans font-bold text-zinc-900 group-hover:text-zinc-800 transition-colors leading-none mb-6">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 tracking-widest">{item.name}</h3>
                  <p className="text-zinc-500 leading-relaxed font-light">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="py-40 px-8 md:px-12 border-t border-white/5">
          <div className="max-w-screen-2xl mx-auto grid md:grid-cols-12 gap-24">
            <div className="md:col-span-6 space-y-32">
              <div>
                <div className="flex items-center space-x-3 mb-12">
                  <GraduationCap className="text-zinc-600" size={18} />
                  <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-600">Education</span>
                </div>
                {['B.S. Software Engineering — EDUVOS • 2023-2025'].map((edu, i) => (
                  <div key={i} className="border-b border-zinc-900 py-8 flex justify-between items-center group">
                    <div>
                      <span className="text-xl font-medium group-hover:translate-x-2 transition-transform">B.S. Software Engineering — EDUVOS</span>
                      <div className="text-sm text-zinc-600 font-mono mt-1">2023 - 2025</div>
                    </div>
                    <ArrowUpRight className="text-zinc-800 group-hover:text-white transition-colors" size={20} />
                  </div>
                ))}
              </div>
              
              <div>
                <div className="flex items-center space-x-3 mb-12">
                  <BookOpen className="text-zinc-600" size={18} />
                  <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-600">Current Focus</span>
                </div>
                <div className="flex flex-wrap gap-4">
                  {['FASTAPI', 'SQLModel', 'Typescript Foundations', 'Systems Design'].map((item) => (
                    <span key={item} className="px-6 py-3 border border-zinc-900 rounded-sm text-sm font-medium hover:bg-white hover:text-black transition-all cursor-default">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-6">
              <div className="flex items-center space-x-3 mb-12">
                <Terminal className="text-zinc-600" size={18} />
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-600">The Tech Stack</span>
              </div>
              <div className="space-y-12">
                {[
                  { label: "FRONTEND", tech: "React / TypeScript / TailwindCSS / Vite / JavaScript" },
                  { label: "BACKEND", tech: "Python / FastAPI / PHP / MySQL / PostgreSQL / Firebase" },
                  { label: "CREATIVE", tech: "Figma / Three.js / Motion / AR Development" }
                ].map((stack, i) => (
                  <div key={i} className="group">
                    <div className="text-[10px] text-zinc-700 mb-2 uppercase tracking-widest">{stack.label}</div>
                    <div className="text-3xl font-light tracking-tight group-hover:text-zinc-400 transition-colors">{stack.tech}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="py-32 px-8 md:px-12 bg-[#050505]">
          <div className="max-w-screen-2xl mx-auto">
            <div className="flex justify-between items-baseline mb-24 border-b border-white/5 pb-12">
              <h2 className="text-4xl md:text-6xl font-serif italic tracking-tight">Featured <br /> Projects</h2>
              <span className="text-zinc-600 font-mono text-[10px] tracking-widest uppercase italic">PRECISION ARCHIVE 0.01</span>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
              {PROJECTS.map((project, i) => (
                <motion.div 
                  key={project.id} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="overflow-hidden bg-zinc-950 aspect-[16/11] mb-6 rounded-sm border border-white/5 relative group/card">
                    <img 
                      src={project.image} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-105 group-hover/card:scale-100" 
                      alt={project.title} 
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/card:opacity-100 transition-all duration-500 flex items-center justify-center">
                      <div className="transform translate-y-4 group-hover/card:translate-y-0 transition-transform duration-500">
                        <span className="bg-white text-black px-6 py-3 rounded-sm font-bold text-xs tracking-widest uppercase">View Details</span>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-black/60 text-white px-3 py-1 rounded text-xs font-mono">{project.year}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-2xl font-bold tracking-tight group-hover:text-zinc-300 transition-colors">{project.title}</h3>
                      <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.2em] mt-1">{project.category}</p>
                    </div>
                    
                    <p className="text-zinc-600 text-sm leading-relaxed line-clamp-2">
                      {project.details}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.stack.slice(0, 3).map(tech => (
                        <span key={tech} className="px-3 py-1 border border-zinc-800 rounded text-[9px] uppercase font-mono tracking-widest text-zinc-500">
                          {tech}
                        </span>
                      ))}
                      {project.stack.length > 3 && (
                        <span className="px-3 py-1 border border-zinc-800 rounded text-[9px] uppercase font-mono tracking-widest text-zinc-500">
                          +{project.stack.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-60 px-8 md:px-12 border-t border-white/5 text-center relative overflow-hidden">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <h2 className="text-[8vw] md:text-[6vw] font-serif italic tracking-tighter leading-[0.9] mb-4">
              Collabor<span className="font-mono not-italic font-light text-zinc-900 tracking-[0.1em]">ation</span>
            </h2>
            <div className="text-[12vw] md:text-[10vw] font-sans not-italic font-black tracking-[-0.08em] leading-none mb-16">
              <span className="inline-block transform -rotate-2">s</span>
              <span className="inline-block">t</span>
              <span className="inline-block transform rotate-1">a</span>
              <span className="inline-block">r</span>
              <span className="inline-block transform -rotate-1">t</span>
              <span className="inline-block">s</span>
              <br />
              <span className="text-zinc-900">h</span>
              <span className="inline-block transform rotate-1">e</span>
              <span className="inline-block">r</span>
              <span className="inline-block transform -rotate-2">e</span>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-12 mb-20 relative z-10">
              <a href="mailto:ngomakapilesharleen703@gmail.com" className="text-xl md:text-2xl font-light hover:text-zinc-500 transition-colors border-b border-zinc-900 pb-1 relative z-10">
                ngomakapilesharleen703@gmail.com
              </a>
              <div className="w-2 h-2 rounded-full bg-zinc-800 hidden md:block"></div>
              <span className="text-zinc-600 font-mono text-[10px] tracking-[0.3em] uppercase italic">TECHNICAL PRECISION. BUSINESS IMPACT.</span>
            </div>
            
            <div className="flex space-x-6 items-center justify-center">
              {socialLinks.map((social, idx) => (
                <a 
                  key={idx} 
                  href={social.href} 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-4 rounded-full border border-zinc-950 text-zinc-700 hover:text-white hover:border-white transition-all duration-300 group/icon"
                >
                  <social.Icon size={18} />
                  <span className="sr-only">{social.name}</span>
                </a>
              ))}
            </div>
          </motion.div>
        </section>
      </main>

      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-6 md:p-12 overflow-y-auto"
          >
            <button 
              onClick={() => setSelectedProject(null)}
              className="fixed top-4 right-4 md:top-8 md:right-8 z-[110] text-zinc-500 hover:text-white transition-all duration-300 p-3 md:p-4 bg-black/60 hover:bg-black/80 rounded-full backdrop-blur-sm border border-white/10 hover:border-white/20 min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <X size={20} className="md:w-8 md:h-8" />
            </button>
            
            <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="aspect-video lg:aspect-square bg-zinc-900 overflow-hidden rounded-sm border border-white/10"
              >
                {selectedProject.demoVideo ? (
                  <video 
                    src={selectedProject.demoVideo} 
                    className="w-full h-full object-cover"
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <img src={selectedProject.image} className="w-full h-full object-cover" alt="" />
                )}
              </motion.div>
              
              <motion.div 
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-12"
              >
                <div>
                  <div className="text-zinc-600 font-mono text-xs uppercase tracking-widest mb-4 flex items-center">
                    <Compass size={14} className="mr-2" />
                    Archive {selectedProject.id} — {selectedProject.year}
                  </div>
                  <h2 className="text-6xl md:text-8xl font-serif italic tracking-tighter">{selectedProject.title}</h2>
                </div>
                
                <p className="text-xl text-zinc-400 font-light leading-relaxed max-w-xl italic">
                  "{selectedProject.details}"
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {selectedProject.stack.map(tag => (
                    <span key={tag} className="px-5 py-2 border border-zinc-800 rounded-sm text-[10px] uppercase font-mono tracking-widest text-zinc-500">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="pt-8 border-t border-white/5 space-y-4">
                  <a 
                    href={selectedProject.github} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center space-x-6 text-white hover:text-zinc-500 transition-all group"
                  >
                    <span className="text-2xl font-bold tracking-tighter">VIEW GITHUB REPO</span>
                    <ArrowRight size={28} className="group-hover:translate-x-4 transition-transform" />
                  </a>
                  
                  {selectedProject.demo && (
                    <a 
                      href={selectedProject.demo} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center space-x-6 text-white hover:text-zinc-500 transition-all group"
                    >
                      <span className="text-2xl font-bold tracking-tighter">VIEW LIVE DEMO</span>
                      <ArrowRight size={28} className="group-hover:translate-x-4 transition-transform" />
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div 
        className="fixed bottom-0 left-0 h-0.5 bg-zinc-800 z-[100]"
        style={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: scrolled ? 1 : 0 }}
      />
    </>
  );
};

export default Portfolio;