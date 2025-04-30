const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    const duration = 2000;
  
    function randomChar() {
      return charset[Math.floor(Math.random() * charset.length)];
    }
  
    function scrambleText(el) {
      const original = el.dataset.original;
      if (!original) return;
  
      const chars = original.split('');
      const spans = chars.map(char => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? ' ' : randomChar();
        return span;
      });
  
      el.textContent = '';
      spans.forEach(span => el.appendChild(span));
  
      let start = null;
      function scramble(time) {
        if (!start) start = time;
        const progress = time - start;
        const percent = Math.min(progress / duration, 1);
  
        spans.forEach((span, i) => {
          if (chars[i] !== ' ') {
            const revealThreshold = i / chars.length;
            span.textContent = percent >= revealThreshold ? chars[i] : randomChar();
          }
        });
  
        if (percent < 1) requestAnimationFrame(scramble);
      }
  
      requestAnimationFrame(scramble);
    }
  
    function animateH1() {
      const h1 = document.querySelector('h1');
      if (!h1) return;
  
      const shouldAnimate = document.body.classList.contains('fun-mode');
  
      h1.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  
      if (shouldAnimate) {
        h1.style.opacity = '0';
        h1.style.transform = 'translateY(20px)';
        setTimeout(() => {
          h1.style.opacity = '1';
          h1.style.transform = 'translateY(0)';
          scrambleText(h1);
        }, 300);
      } else {
        h1.textContent = h1.dataset.original;
        h1.style.opacity = '1';
        h1.style.transform = 'none';
      }
    }
  
    function resetAnimations() {
      const icons = document.querySelectorAll('.left-icons a img, .button li a');
      icons.forEach(icon => {
        icon.style.animation = 'none';
        void icon.offsetHeight;
        icon.style.animation = '';
      });
  
      const home = document.querySelector('.home-button');
      if (home) {
        home.style.animation = 'none';
        void home.offsetHeight;
        home.style.animation = '';
      }
  
      const emoji = document.querySelector('.emoji-toggle');
      if (emoji) {
        emoji.style.animation = 'none';
        void emoji.offsetHeight;
        emoji.style.animation = '';
      }
    }
  
    window.addEventListener('DOMContentLoaded', () => {
      const h1 = document.querySelector('h1');
      if (h1) {
        h1.dataset.original = h1.textContent.trim();
      }
  
      const savedMode = localStorage.getItem('funMode');
      const isFun = savedMode === 'true';
      document.body.classList.toggle('fun-mode', isFun);
  
      const toggle = document.getElementById('funToggle');
      if (toggle) {
        toggle.textContent = isFun ? '😎' : '😈';
  
        toggle.addEventListener('click', () => {
          const isNowFun = document.body.classList.toggle('fun-mode');
          localStorage.setItem('funMode', isNowFun);
          toggle.textContent = isNowFun ? '😎' : '😈';
          resetAnimations();
          animateH1();
        });
      }
  
      animateH1();
    });

    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', e => {
          localStorage.setItem('funMode', document.body.classList.contains('fun-mode'));
      });
    });