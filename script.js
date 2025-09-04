document.documentElement.classList.add('dark');
localStorage.theme = 'dark';

function check404() {
  const validPaths = ['/', '/index.html'];
  if (!validPaths.includes(window.location.pathname)) {
    document.getElementById('notFound').classList.add('show');
    document.body.style.overflow = 'hidden';
    return true;
  }
  return false;
}

function updateDiscordStatus() {
  const statusDot = document.querySelector('.status-dot');
  const statusText = document.querySelector('.status-text');
  const activityDiv = document.querySelector('.discord-activity');
  if (statusText) statusText.textContent = 'Online';
  if (activityDiv) activityDiv.innerHTML = `<i class="fa-solid fa-code mr-1"></i> PLAYING Visual Studio Code`;
  if (statusDot) statusDot.style.backgroundColor = '#43b581';
}

const particleConfig = {
  particles: {
    number: { value: 40 },
    color: { value: ["#00bfff", "#ff69b4", "#7b68ee"], animation: { enable: true, speed: 10 }},
    shape: { type: "circle" },
    blur: { enable: true, value: 1 },
    opacity: { value: 0.2, random: true, anim: { enable: true, speed: 0.5, opacity_min: 0.1 }},
    size: { value: 2, random: true },
    move: { enable: true, speed: 0.8, random: true, outModes: "bounce", attract: { enable: true, rotateX: 600, rotateY: 1200 }},
    links: { enable: true, distance: 150, color: "#808080", opacity: 0.3, width: 1 }
  },
  interactivity: {
    events: { onhover: { enable: true, mode: ["grab"] }, onclick: { enable: true, mode: "push" }},
    modes: { grab: { distance: 200, links: { opacity: 0.3 } }, push: { quantity: 2 }}
  },
  detectRetina: true
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
  const codeText = document.querySelector('.code-block pre').textContent;
  navigator.clipboard.writeText(codeText).then(() => {
    const toast = document.getElementById('copiedToast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const codeContent = document.getElementById('codeContent');
  const originalHTML = codeContent.innerHTML;
  const originalText = codeContent.textContent;
  const settings = {
    typingDelay: 55,
    deletingDelay: 65,
    spaceDelay: 1,
    pauseAfterTyping: 2000,
    pauseAfterDeleting: 500
  };
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
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  typeText(0);
});

document.addEventListener('DOMContentLoaded', () => {
  if (!check404()) {
    AOS.init();
    tsParticles.load("tsparticles", particleConfig);
    updateDiscordStatus();
  }
});
window.addEventListener('popstate', check404);

document.getElementById('toggleTheme').addEventListener('click', function() {
  const html = document.documentElement;
  const isDark = html.classList.toggle('dark');
  localStorage.theme = isDark ? 'dark' : 'light';
  this.textContent = isDark ? '☀️' : '🌙';
  const container = tsParticles.domItem(0);
  if (container) {
    const darkColors = ["#ffffff", "#00bfff", "#ff69b4"];
    const lightColors = ["#1f2937", "#00bfff", "#ff69b4"];
    container.options.particles.color.value = isDark ? darkColors : lightColors;
    container.options.particles.links.color = isDark ? "#ffffff" : "#1f2937";
    container.refresh();
  }
  document.body.style.backgroundColor = isDark ? '#111827' : '#f3f4f6';
  document.body.style.color = isDark ? '#ffffff' : '#111827';
});