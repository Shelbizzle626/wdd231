/* Stabby Rats Racing — site behavior */

// --- Mobile nav toggle ---
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  // close menu when a link is tapped
  links.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    })
  );
})();

// --- Gallery lightbox ---
(function () {
  const shots = document.querySelectorAll('.shot');
  if (!shots.length) return;

  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.setAttribute('aria-label', 'Photo viewer');
  lb.innerHTML =
    '<button class="lb-close" aria-label="Close photo viewer">Close ✕</button>' +
    '<div><img alt=""><p class="lb-cap"></p></div>';
  document.body.appendChild(lb);

  const lbImg = lb.querySelector('img');
  const lbCap = lb.querySelector('.lb-cap');
  const closeBtn = lb.querySelector('.lb-close');
  let lastFocused = null;

  function open(src, alt, cap) {
    lastFocused = document.activeElement;
    lbImg.src = src;
    lbImg.alt = alt || '';
    lbCap.textContent = cap || '';
    lb.classList.add('open');
    closeBtn.focus();
  }
  function close() {
    lb.classList.remove('open');
    lbImg.src = '';
    if (lastFocused) lastFocused.focus();
  }

  shots.forEach((shot) => {
    const img = shot.querySelector('img');
    const cap = shot.querySelector('.cap');
    shot.setAttribute('tabindex', '0');
    shot.setAttribute('role', 'button');
    const fire = () => open(img.src, img.alt, cap ? cap.textContent : '');
    shot.addEventListener('click', fire);
    shot.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fire(); }
    });
  });

  closeBtn.addEventListener('click', close);
  lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lb.classList.contains('open')) close();
  });
})();
