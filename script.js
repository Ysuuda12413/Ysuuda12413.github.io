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
    number: { value: 40 },
    color: { 
      value: ["#00bfff", "#ff69b4", "#7b68ee", "#00ff88"], 
      animation: { enable: true, speed: 20, sync: false }
    },
    shape: { type: ["circle", "triangle"] },
    opacity: { 
      value: 0.4, 
      random: true, 
      anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
    },
    size: { 
      value: 3, 
      random: { enable: true, minimumValue: 1 },
      anim: { enable: true, speed: 2, size_min: 0.5, sync: false }
    },
    move: { 
      enable: true, 
      speed: 1.5, 
      direction: "none",
      random: true, 
      straight: false,
      outModes: "out", 
      bounce: false,
      attract: { enable: true, rotateX: 600, rotateY: 1200 }
    },
    links: { 
      enable: true, 
      distance: 150, 
      color: "#808080", 
      opacity: 0.3, 
      width: 1.5,
      triangles: { enable: true, opacity: 0.05 }
    }
  },
  interactivity: {
    events: { 
      onhover: { enable: true, mode: ["grab", "bubble"] }, 
      onclick: { enable: true, mode: "push" }
    },
    modes: { 
      grab: { distance: 200, links: { opacity: 0.5 } },
      bubble: { distance: 200, size: 6, duration: 2, opacity: 0.8 },
      push: { quantity: 2 }
    }
  },
  detectRetina: true,
  fpsLimit: 60,
  smooth: true
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

/*
let typingEnabled = false;
document.addEventListener('DOMContentLoaded', () => {
  const codeContent = document.getElementById('codeContent');
  const originalHTML = codeContent.innerHTML;
  const originalText = codeContent.textContent;
  const settings = {
    typingDelay: 40,
    deletingDelay: 25,
    spaceDelay: 1,
    pauseAfterTyping: 4000,
    pauseAfterDeleting: 1000
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
    }
    else {
      setTimeout(() => eraseText(originalText.length), settings.pauseAfterTyping);
    }
  }
  function eraseText(i) {
    codeContent.innerHTML = getHTMLByText(originalHTML, originalText.slice(0, i));
    i--;
    if (i >= 0) {
      setTimeout(() => eraseText(i), (originalText[i] === ' ' || originalText[i] === '\n') ? settings.spaceDelay : settings.deletingDelay);
    }
    else {
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
      }
      else if (node.nodeType === Node.ELEMENT_NODE) {
        resultHTML += `<${node.nodeName.toLowerCase()}`;
        for (const attr of node.attributes) resultHTML += ` ${attr.name}=\"${attr.value}\"`;
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
*/

document.addEventListener('DOMContentLoaded', () => {
  try {
    if (!check404()) {
      if (typeof AOS !== 'undefined') {
        AOS.init({
          duration: 1200,
          easing: 'ease-in-out-cubic',
          once: false,
          mirror: true,
          anchorPlacement: 'top-bottom',
          offset: 50,
          delay: 100,
          disable: false
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

document.addEventListener('DOMContentLoaded', () => {
  const touchMeBtn = document.getElementById('touch-me-btn');
  if (touchMeBtn) {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      touchMeBtn.addEventListener('click', () => {
        window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
      });
    } else {
      touchMeBtn.addEventListener('mouseover', () => {
        const x = Math.random() * (window.innerWidth - touchMeBtn.offsetWidth);
        const y = Math.random() * (window.innerHeight - touchMeBtn.offsetHeight);
        touchMeBtn.style.left = `${x}px`;
        touchMeBtn.style.top = `${y}px`;
      });
    }
  }
});

// Anti-source reading measures. Note: These are not foolproof and can be bypassed by experienced users.
document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('keydown', event => {
  if (event.ctrlKey && event.shiftKey && (event.key === 'I' || event.key === 'i' || event.key === 'J' || event.key === 'j' || event.key === 'C' || event.key === 'c')) {
    event.preventDefault();
  }
  if (event.ctrlKey && (event.key === 'U' || event.key === 'u' || event.key === 'S' || event.key === 's')) {
    event.preventDefault();
  }
  if (event.key === 'F12') {
    event.preventDefault();
  }
});

window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.style.display = 'none';
  }
});