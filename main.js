const toggleBtn = document.getElementById("modeToggle");
    const loopImgs = document.querySelectorAll(".loop");
  
    const isFunMode = localStorage.getItem('funMode') === 'true';
    document.body.classList.toggle("fun-mode", isFunMode);
    toggleBtn.textContent = isFunMode ? "😎Pro😎" : "😈Fun😈";
  
    loopImgs.forEach(img => {
      const funSrc = img.dataset.fun;
      const seriousSrc = img.dataset.serious;
  
      if (isFunMode) {
        img.style.display = "";
        img.src = funSrc;
      } else {
        if (seriousSrc) {
          img.src = seriousSrc;
          img.style.display = "";
        } else {
          img.style.display = "none";
        }
      }
    });
  
    toggleBtn.addEventListener("click", () => {
      const isFunNow = !document.body.classList.contains("fun-mode");
  
      if (isFunNow) {
        toggleBtn.style.transition = "none";
        toggleBtn.style.opacity = "0";
      }
  
      document.body.classList.toggle("fun-mode", isFunNow);
      localStorage.setItem("funMode", isFunNow);
      toggleBtn.textContent = isFunNow ? "😎Pro😎" : "😈Fun😈";
  
      setTimeout(() => {
        toggleBtn.style.transition = "";
        toggleBtn.style.opacity = "";
      }, 10);
  
      loopImgs.forEach(img => {
        const funSrc = img.dataset.fun;
        const seriousSrc = img.dataset.serious;
  
        if (isFunNow) {
          img.style.display = "";
          img.src = funSrc;
        } else {
          if (seriousSrc) {
            img.src = seriousSrc;
            img.style.display = "";
          } else {
            img.style.display = "none";
          }
        }
      });
    });
  
    document.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', e => {
        localStorage.setItem('funMode', document.body.classList.contains('fun-mode'));
      });
    });

    window.addEventListener("DOMContentLoaded", () => {
      setTimeout(() => {
        const toggleBtn = document.getElementById("modeToggle");
          if (toggleBtn && !document.body.classList.contains("fun-mode")) {
            toggleBtn.classList.add("popout");
            toggleBtn.addEventListener("animationend", () => {
            toggleBtn.classList.remove("popout");
          }, { once: true });
        }
      }, 1000);
    });

    function createEmoji() {
      const emoji = document.createElement('div');
      emoji.classList.add('emoji-rain');
      emoji.style.position = 'fixed';
      emoji.style.top = '-2rem';
      emoji.style.left = Math.random() * 100 + 'vw';
      emoji.style.fontSize = Math.random() * 2 + 1 + 'rem';
      emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
      emoji.style.pointerEvents = 'none';
      emoji.style.opacity = 0.8;
      emoji.style.animation = `fall ${5 + Math.random() * 5}s linear forwards`;
      document.body.appendChild(emoji);
    
      setTimeout(() => {
        emoji.remove();
      }, 10000);
    }
    
    setInterval(() => {
      if (document.body.classList.contains('fun-mode')) {
        createEmoji();
      }
    }, 300);
