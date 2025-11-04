try {
  if (localStorage.getItem('theme') === 'light') {
    document.documentElement.classList.remove('dark');
  } else {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }
} catch (e) {
  console.error('LocalStorage error:', e);
  document.documentElement.classList.add('dark');
}

function check404() {
  try {
    const validPaths = ['/', '/index.html'];
    const pathname = window.location.pathname.toLowerCase();
    if (!validPaths.includes(pathname)) {
      const notFound = document.getElementById('notFound');
      if (notFound) {
        notFound.classList.add('show');
        document.body.style.overflow = 'hidden';
      }
      return true;
    }
    return false;
  } catch (e) {
    console.error('404 check error:', e);
    return false;
  }
}

function updateDiscordStatus() {
  try {
    const statusDot = document.querySelector('.status-dot');
    const statusText = document.querySelector('.status-text');
    const activityDiv = document.querySelector('.discord-activity');
    if (statusText) statusText.textContent = 'Online';
    if (activityDiv) {
      const icon = document.createElement('i');
      icon.className = 'fa-solid fa-code mr-1';
      activityDiv.innerHTML = '';
      activityDiv.appendChild(icon);
      activityDiv.appendChild(document.createTextNode(' PLAYING Visual Studio Code'));
    }
    if (statusDot) statusDot.style.backgroundColor = '#43b581';
  } catch (e) {
    console.error('Discord status error:', e);
  }
}

const particleConfig = {
  particles: {
    number: { value: 25 },
    color: { value: ["#00bfff", "#ff69b4", "#7b68ee"], animation: { enable: false }},
    shape: { type: "circle" },
    blur: { enable: false },
    opacity: { value: 0.2, random: true, anim: { enable: true, speed: 0.3, opacity_min: 0.1 }},
    size: { value: 2, random: true },
    move: { enable: true, speed: 0.5, random: true, outModes: "bounce", attract: { enable: false }},
    links: { enable: true, distance: 120, color: "#808080", opacity: 0.2, width: 1 }
  },
  interactivity: {
    events: { onhover: { enable: true, mode: ["grab"] }, onclick: { enable: false }},
    modes: { grab: { distance: 150, links: { opacity: 0.2 } }}
  },
  detectRetina: true,
  fpsLimit: 30
};

function runCode() {
  const consoleOutput = document.getElementById('consoleOutput');
  const consoleLines = consoleOutput.querySelector('.console-lines');
  consoleLines.innerHTML = '';
  consoleOutput.classList.add('show');
  const now = new Date();
  const utc7Time = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Bangkok',
    dateStyle: 'full',
    timeStyle: 'long'
  }).format(now);

  const printLine = (text, delay) => new Promise(resolve => {
    setTimeout(() => {
      const line = document.createElement('div');
      line.className = 'console-line';
      line.textContent = `> ${text}`;
      consoleLines.appendChild(line);
      consoleOutput.scrollTop = consoleOutput.scrollHeight;
      resolve();
    }, delay);
  });

  (async () => {
    await printLine(`Current time (UTC+7): ${utc7Time}`, 0);
    await printLine('Loading profile data...', 500);
    await printLine('Name: DuyunDz', 800);
    await printLine('Location: Vietnam', 1100);
    await printLine('Interests found: coding, modding, reverse engineering', 1400);
    await printLine('Profile loaded successfully!', 1700);
    setTimeout(() => consoleOutput.classList.remove('show'), 3000);
  })();
}

function copyCode() {
  try {
    const codeBlock = document.querySelector('.code-block pre');
    if (!codeBlock) return;
    const codeText = codeBlock.textContent;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(codeText).then(() => {
        const toast = document.getElementById('copiedToast');
        if (toast) {
          toast.classList.add('show');
          setTimeout(() => toast.classList.remove('show'), 2000);
        }
      }).catch(err => {
        console.error('Clipboard error:', err);
        alert('Failed to copy to clipboard');
      });
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = codeText;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      const toast = document.getElementById('copiedToast');
      if (toast) {
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
      }
    }
  } catch (e) {
    console.error('Copy error:', e);
    alert('Failed to copy to clipboard');
  }
}

let typingEnabled = false;
document.addEventListener('DOMContentLoaded', () => {
  const codeContent = document.getElementById('codeContent');
  const originalHTML = codeContent.innerHTML;
  const originalText = codeContent.textContent;
  const settings = {
    typingDelay: 60,
    deletingDelay: 70,
    spaceDelay: 1,
    pauseAfterTyping: 3000,
    pauseAfterDeleting: 800
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !typingEnabled) {
        typingEnabled = true;
        typeText(0);
      }
    });
  }, { threshold: 0.1 });
  
  const codeBlock = document.getElementById('codeBlock');
  if (codeBlock) observer.observe(codeBlock);
  function typeText(i) {
    codeContent.innerHTML = getHTMLByText(originalHTML, originalText.slice(0, i));
    i++;
    if (i <= originalText.length) {
      setTimeout(() => typeText(i), (originalText[i] === ' ' || originalText[i] === '\n') ? settings.spaceDelay : settings.typingDelay);
    } else {
      setTimeout(() => eraseText(originalText.length), settings.pauseAfterTyping);
    }
  }
  function eraseText(i) {
    codeContent.innerHTML = getHTMLByText(originalHTML, originalText.slice(0, i));
    i--;
    if (i >= 0) {
      setTimeout(() => eraseText(i), (originalText[i] === ' ' || originalText[i] === '\n') ? settings.spaceDelay : settings.deletingDelay);
    } else {
      setTimeout(() => typeText(0), settings.pauseAfterDeleting);
    }
  }
  function getHTMLByText(fullHTML, currentText) {
    const div = document.createElement('div');
    div.innerHTML = fullHTML;
    let textSoFar = '', resultHTML = '';
    function traverse(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        const remaining = currentText.slice(textSoFar.length);
        if (remaining) {
          const take = remaining.slice(0, node.textContent.length);
          textSoFar += take;
          resultHTML += escapeHTML(take);
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        resultHTML += `<${node.nodeName.toLowerCase()}`;
        for (const attr of node.attributes) resultHTML += ` ${attr.name}="${attr.value}"`;
        resultHTML += '>';
        for (const child of node.childNodes) {
          if (textSoFar.length >= currentText.length) break;
          traverse(child);
        }
        resultHTML += `</${node.nodeName.toLowerCase()}>`;
      }
    }
    traverse(div);
    return resultHTML;
  }
  function escapeHTML(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  try {
    if (!check404()) {
      if (typeof AOS !== 'undefined') {
        AOS.init({
          duration: 800,
          once: true,
          disable: 'mobile'
        });
      }
      
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        console.log('Reduced motion preferred, skipping particles');
      } else if (typeof tsParticles !== 'undefined') {
        requestIdleCallback(() => {
          tsParticles.load("tsparticles", particleConfig).catch(e => console.error('Particles error:', e));
        }, { timeout: 2000 });
      }
      updateDiscordStatus();
      
      const isDark = document.documentElement.classList.contains('dark');
      const toggleBtn = document.getElementById('toggleTheme');
      if (toggleBtn) toggleBtn.textContent = isDark ? '☀️' : '🌙';
      
      const lanyardBadge = document.getElementById('lanyardBadge');
      if (lanyardBadge && lanyardBadge.src) {
        const theme = isDark ? 'dark' : 'light';
        lanyardBadge.src = lanyardBadge.src.replace(/theme=(dark|light)/, `theme=${theme}`);
        lanyardBadge.onerror = () => console.error('Failed to load Discord badge');
      }
    }
  } catch (e) {
    console.error('Initialization error:', e);
  }
});
window.addEventListener('popstate', check404);

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggleTheme');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', function() {
      try {
        const html = document.documentElement;
        const isDark = html.classList.toggle('dark');
        try {
          localStorage.setItem('theme', isDark ? 'dark' : 'light');
        } catch (e) {
          console.error('LocalStorage error:', e);
        }
        this.textContent = isDark ? '☀️' : '🌙';
        
        if (typeof tsParticles !== 'undefined') {
          const container = tsParticles.domItem(0);
          if (container && container.options) {
            const darkColors = ["#ffffff", "#00bfff", "#ff69b4"];
            const lightColors = ["#1f2937", "#00bfff", "#ff69b4"];
            container.options.particles.color.value = isDark ? darkColors : lightColors;
            container.options.particles.links.color = isDark ? "#ffffff" : "#1f2937";
            container.refresh();
          }
        }
        
        document.body.style.backgroundColor = isDark ? '#111827' : '#f3f4f6';
        document.body.style.color = isDark ? '#ffffff' : '#111827';
        
        const lanyardBadge = document.getElementById('lanyardBadge');
        if (lanyardBadge && lanyardBadge.src) {
          const theme = isDark ? 'dark' : 'light';
          lanyardBadge.src = lanyardBadge.src.replace(/theme=(dark|light)/, `theme=${theme}`);
        }
      } catch (e) {
        console.error('Theme toggle error:', e);
      }
    });
  }
});