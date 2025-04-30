const toggleBtn = document.getElementById("modeToggle");
const loopImgs = document.querySelectorAll(".loop");

// Initialize based on localStorage
const isFunMode = localStorage.getItem('funMode') === 'true';
document.body.classList.toggle("fun-mode", isFunMode);
toggleBtn.innerHTML = isFunMode ? '<span class="mode-text">😎Pro😎</span>' : '<span class="mode-text">😈Fun😈</span>';

if (isFunMode) {
  toggleBtn.classList.remove('show');
  setTimeout(() => {
    toggleBtn.classList.add('show');
  }, 4000); 
} else {
  toggleBtn.classList.add('show');
}

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
    toggleBtn.classList.remove('show');

    setTimeout(() => {
      toggleBtn.classList.add('show');
    }, 4000);
  } else {
    toggleBtn.classList.add('show');
  }

  document.body.classList.toggle("fun-mode", isFunNow);
  localStorage.setItem("funMode", isFunNow);
  toggleBtn.innerHTML = isFunNow ? '<span class="mode-text">😎Pro😎</span>' : '<span class="mode-text">😈Fun😈</span>';

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
    if (toggleBtn && !document.body.classList.contains("fun-mode")) {
      toggleBtn.classList.add("popout");
      toggleBtn.addEventListener("animationend", () => {
        toggleBtn.classList.remove("popout");
      }, { once: true });
    }
  }, 1000);
});
