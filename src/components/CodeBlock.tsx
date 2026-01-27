import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Copy, Terminal } from 'lucide-react';

const CODE_CONTENT = `const profile = {
  aliases: ["DuyunDz", "DuyHayRaDe"],
  works: ["minecraft client", "scripts", "tools"],
  location: "Vietnam",
  interests: ["coding", "modding", "reverse engineering"],
  contacts: {
    discordID: "1101376716670259210",
    facebook: "fb.com/profile.php?id=61556575490667"
  }
}`;

export const CodeBlock = ({ onRun }: { onRun: () => void }) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const typingSpeed = 30;

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (isTyping) {
      if (displayText.length < CODE_CONTENT.length) {
        timeout = setTimeout(() => {
          setDisplayText(CODE_CONTENT.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => setIsTyping(false), 3000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(CODE_CONTENT.slice(0, displayText.length - 1));
        }, typingSpeed / 2);
      } else {
        timeout = setTimeout(() => setIsTyping(true), 1000);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isTyping]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(CODE_CONTENT);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="mt-5 md:mt-6 relative group">
      <div className="glass-card bg-slate-900/80 border-white/5 overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-3 md:px-4 py-2 bg-white/5 border-b border-white/5">
          <div className="flex space-x-1.5 md:space-x-2">
            <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-rose-500/50" />
            <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-amber-500/50" />
            <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-emerald-500/50" />
          </div>
          <div className="text-[9px] md:text-[11px] text-slate-500 font-mono flex items-center gap-2">
            <Terminal size={10} />
            profile.js
          </div>
          <div className="flex items-center space-x-1 md:space-x-1.5">
            <button
              onClick={onRun}
              className="p-1 hover:bg-emerald-500/20 rounded-md transition-colors text-emerald-500"
              title="Run Code"
            >
              <Play size={12} className="md:w-3.5 md:h-3.5" fill="currentColor" />
            </button>
            <button
              onClick={copyToClipboard}
              className="p-1 hover:bg-white/10 rounded-md transition-colors text-slate-400"
              title="Copy Code"
            >
              <Copy size={12} className="md:w-3.5 md:h-3.5" />
            </button>
          </div>
        </div>
        <div className="p-3 md:p-5 font-mono text-[10px] md:text-[13px] leading-relaxed overflow-x-auto min-h-[220px] md:min-h-[280px]">
          <pre className="whitespace-pre">
            {displayText.split('\n').map((line, i, arr) => (
              <div key={i} className="flex">
                <span className="text-slate-600 w-5 md:w-7 inline-block select-none text-right mr-2 md:mr-3">{i + 1}</span>
                <span>
                  {renderHighlightedCode(line)}
                  {i === arr.length - 1 && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="inline-block w-1.5 h-3.5 bg-emerald-500 ml-0.5 align-middle"
                    />
                  )}
                </span>
              </div>
            ))}
          </pre>
        </div>
      </div>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-4 right-4 bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm shadow-xl z-50"
          >
            Copied to clipboard! 📋
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Safe tokenizer that splits code into tokens and renders React elements
function renderHighlightedCode(line: string) {
  if (!line) return null;
  
  // Split by strings, words, and special characters (keeping delimiters)
  // Logic: 
  // 1. Strings: "..."
  // 2. Words: \w+
  // 3. Non-whitespace: any other char
  // 4. Whitespace: \s+
  const tokens = line.split(/(".*?"|[\w]+|[^\s\w]|[\s]+)/g).filter(Boolean);

  return tokens.map((token, index) => {
    // Strings
    if (token.startsWith('"')) {
      return <span key={index} className="code-token-string">{token}</span>;
    }
    
    // Keywords
    if (['const', 'let', 'var', 'function', 'return', 'if', 'else'].includes(token)) {
      return <span key={index} className="code-token-keyword">{token}</span>;
    }
    
    // Properties (heuristic: simple words followed by nothing or special chars later, mostly context dependent but simplified here)
    // To properly detect properties we need context, but for this specific snippet we can check known keys
    if (['aliases', 'works', 'location', 'interests', 'contacts', 'discordID', 'facebook'].includes(token)) {
      return <span key={index} className="code-token-property">{token}</span>;
    }

    // Punctuation
    if (/^[{}[\],:]$/.test(token)) {
      return <span key={index} className="code-token-punctuation">{token}</span>;
    }

    // Operators
    if (token === '=') {
      return <span key={index} className="code-token-operator">{token}</span>;
    }

    // Default (numbers, other identifiers, whitespace)
    return <span key={index}>{token}</span>;
  });
}

