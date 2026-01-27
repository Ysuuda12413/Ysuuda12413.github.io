import { useState, useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Background } from './components/Background';
import { Sidebar } from './components/Sidebar';
import { CodeBlock } from './components/CodeBlock';
import { Console } from './components/Console';
import { NotFound } from './components/NotFound';

const TAGS = [
  { name: 'Minecraft Client', color: 'border-emerald-400/60 bg-emerald-500/10 text-emerald-200' },
  { name: 'Tools & Scripts', color: 'border-sky-400/60 bg-sky-500/10 text-sky-200' },
  { name: 'Reverse Engineering', color: 'border-violet-400/60 bg-violet-500/10 text-violet-200' },
  { name: 'Performance Tuning', color: 'border-slate-400/60 bg-slate-500/10 text-slate-200' },
];

const FloatingShape = ({ className, delay = 0 }: { className?: string, delay?: number }) => (
  <motion.div
    animate={{
      y: [0, -40, 0],
      x: [0, 30, 0],
      rotate: [0, 20, 0],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration: 10,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
    className={`fixed pointer-events-none blur-[100px] z-0 ${className}`}
  />
);

function App() {
  const [consoleLines, setConsoleLines] = useState<string[]>([]);
  const [showConsole, setShowConsole] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  useEffect(() => {
    const path = window.location.pathname;
    if (path !== '/' && path !== '/index.html') {
      setIsNotFound(true);
    }
  }, []);

  const runCode = useCallback(() => {
    setShowConsole(true);
    setConsoleLines([]);
    
    const now = new Date();
    const utc7Time = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Bangkok',
      dateStyle: 'full',
      timeStyle: 'long'
    }).format(now);

    const lines = [
      `Current time (UTC+7): ${utc7Time}`,
      'Loading profile data...',
      'Name: DuyunDz',
      'Location: Vietnam',
      'Interests found: coding, modding, reverse engineering',
      'Profile loaded successfully!',
    ];

    lines.forEach((line, i) => {
      setTimeout(() => {
        setConsoleLines(prev => [...prev, line]);
      }, i * 300);
    });

    setTimeout(() => setShowConsole(false), 5000);
  }, []);

  if (isNotFound) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden selection:bg-emerald-500/30">
      {/* Background Layering */}
      <div className="mesh-gradient" />
      <div className="noise" />
      <Background />
      
      {/* Decorative floating shapes */}
      <FloatingShape className="top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/20 rounded-full" />
      <FloatingShape className="bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-sky-500/20 rounded-full" delay={2} />
      <FloatingShape className="top-[20%] right-[10%] w-[30%] h-[30%] bg-violet-500/10 rounded-full" delay={4} />

      <main className="container mx-auto px-4 py-6 md:py-12 flex items-center justify-center min-h-screen relative z-10">
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="glass-card w-full max-w-5xl flex flex-col md:flex-row overflow-hidden"
        >
          <Sidebar />

          <div className="flex-1 p-5 md:p-10 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-xl md:text-3xl font-black mb-4 tracking-tight leading-tight">
                <span className="bg-gradient-to-r from-white via-emerald-400 to-sky-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">
                  Minecraft Client & Tool Developer · Phạm Hữu Duy
                </span>
              </h2>
              
              <motion.div 
                className="flex flex-wrap gap-1.5 mb-4"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1, delayChildren: 0.5 }
                  }
                }}
              >
                {TAGS.map((tag, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className={`px-2.5 py-0.5 rounded-full border text-[9px] md:text-[11px] font-bold backdrop-blur-md transition-colors cursor-default ${tag.color}`}
                  >
                    {tag.name}
                  </motion.span>
                ))}
              </motion.div>

              <p className="text-slate-400 leading-relaxed max-w-xl text-sm md:text-base mb-6">
                Mình tập trung xây các công cụ, script và client hỗ trợ trải nghiệm chơi Minecraft mượt, trực quan.
              </p>

              <CodeBlock onRun={runCode} />

              <footer className="mt-5 pt-5 border-t border-white/5 text-slate-500 text-[10px] flex items-center justify-between">
                <p>© 2025 DuyunDz • Built with React & Vite</p>
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Available for work</span>
                </div>
              </footer>
            </motion.div>
          </div>
        </motion.div>
      </main>

      <Console show={showConsole} lines={consoleLines} />
    </div>
  );
}

export default App;
