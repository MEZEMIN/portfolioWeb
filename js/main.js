/* ── VIDEO DATA (from CardInfo.txt) ── */
const videos = [
  {
    thumb: 'Thumnail/001.png',
    title: 'Spaceship Explosion',
    category: 'HOUDINI FX WORK',
    year: '2025',
    type: 'youtube', id: 'Y19dV0GHpso',
    tools: ['Houdini', 'Nuke', 'FC'],
    description: "Created Pyro, RBD (Destruction), and POP (Particle) simulations using Houdini. Lighting was done with SideFX's Karma, and compositing was handled in Nuke X.",
  },
  {
    thumb: 'Thumnail/002.png',
    title: 'DOMO London Fog Ads',
    category: 'AI ADVERTISEMENT VIDEO',
    year: '2026',
    type: 'vimeo', id: '1166855560',
    aspect: 'portrait',
    tools: ['Higgs', 'FC'],
    description: "Planned and produced a short social media advertisement for DOMO Tea's London Fog Earl Grey, with the ad video created using AI.",
  },
  {
    thumb: 'Thumnail/003.png',
    title: "DOMO Valentine's Day Ads",
    category: 'AI ADVERTISEMENT VIDEO',
    year: '2026',
    type: 'vimeo', id: '1166855862',
    aspect: 'portrait',
    tools: ['Higgs', 'FC'],
    description: "Planned and produced a short social media advertisement for DOMO Tea's Valentine's Day campaign, with the ad video created using AI.",
  },
  {
    thumb: 'Thumnail/004.png',
    title: 'DOMO Vanilla Matcha Ads',
    category: 'AI ADVERTISEMENT VIDEO',
    year: '2026',
    type: 'vimeo', id: '1166856113',
    tools: ['Higgs', 'FC'],
    description: "Planned and produced a short social media advertisement for DOMO Tea's London Vanilla Matcha, with the ad video created using AI.",
  },
  {
    thumb: 'Thumnail/005.png',
    title: 'Ice Age',
    category: 'HOUDINI FX WORK',
    year: '2025',
    type: 'youtube', id: 'xcVSfdI7GzU',
    tools: ['Houdini'],
    description: 'Responsible for the design, modeling, and simulation of the energy shield in the short film Ice Age (2025).',
  },
  {
    thumb: 'Thumnail/006.png',
    title: 'Thanos Disintegration Effect',
    category: 'HOUDINI FX WORK',
    year: '2025',
    type: 'youtube', id: 'NaMJYXNi6JI',
    tools: ['Houdini', 'Nuke', 'FC'],
    description: `For this project, I handled all aspects of production, utilizing pre-existing assets for the 3D model and animation. My primary focus was on the simulation and compositing work.

Here's a brief breakdown of the process:
The zombie's dissolving effect was created using a combination of Houdini's Pyro source spread and Vellum simulations.
Building on the Vellum simulation, I layered additional Smoke, POPs (particles), and Spark effects to add richness and depth.
To create a realistic "burning away" look, I linked the character material's displacement values directly with the Vellum simulation data.
Finally, all visual elements were composited and enhanced in NukeX to achieve the final look.`,
  },
  {
    thumb: 'Thumnail/007.png',
    title: 'Miserable - Zemistein',
    category: 'AI MUSIC VIDEO',
    year: '2026',
    type: 'youtube', id: 'lgILl71Ya2E',
    featured: true,
    tools: ['Higgs', 'FC'],
    description: 'Created a fictional character named Zemistein and produced a music video using AI.',
  },
  {
    thumb: 'Thumnail/008.png',
    title: 'Campbell River',
    category: 'A FILM BY JAEMIN RYU',
    year: '2024',
    type: 'youtube', id: '5PBApE-Evmc',
    tools: ['FC'],
    description: 'Planned, filmed, and edited the video.',
  },
  {
    thumb: 'Thumnail/009.png',
    title: 'Saturna Island',
    category: 'A FILM BY JAEMIN RYU',
    year: '2024',
    type: 'youtube', id: 'r97RPVpzYbg',
    tools: ['FC'],
    description: 'Planned, filmed, and edited the video.',
  },
  {
    thumb: 'Thumnail/010.png',
    title: 'East Point, Saturna Island',
    category: 'A FILM BY JAEMIN RYU',
    year: '2024',
    type: 'youtube', id: 'hWSxcE-dMsg',
    tools: ['FC'],
    description: 'Planned, filmed, and edited the video.',
  },
  {
    thumb: 'Thumnail/011.png',
    title: 'Saturna Island 2',
    category: 'A FILM BY JAEMIN RYU',
    year: '2024',
    type: 'youtube', id: 'dpNSjN1MrBw',
    start: 2,
    tools: ['FC'],
    description: 'Planned, filmed, and edited the video.',
  },
];

const FEATURED = videos.find((v) => v.featured); // always 007

/* ── BLOB MOUSE TRACKING ── */
const blobEls = [
  document.querySelector('.bg-blob--1'),
  document.querySelector('.bg-blob--2'),
  document.querySelector('.bg-blob--3'),
];
const blobState = [
  { cx: 0, cy: 0, spd: 0.035, mx:  0.22, my:  0.18 }, // center blob: subtle movement
  { cx: 0, cy: 0, spd: 0.030, mx: -0.28, my: -0.22 },
  { cx: 0, cy: 0, spd: 0.055, mx: -0.20, my:  0.28 },
];

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
window.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });

(function tickBlobs() {
  const ox = mouseX - window.innerWidth  / 2;
  const oy = mouseY - window.innerHeight / 2;
  blobState.forEach((b, i) => {
    b.cx += (ox * b.mx - b.cx) * b.spd;
    b.cy += (oy * b.my - b.cy) * b.spd;
    blobEls[i].style.transform = `translate(${b.cx}px, ${b.cy}px)`;
  });
  requestAnimationFrame(tickBlobs);
})();

/* ── DOM REFS ── */
const showcaseCard  = document.getElementById('showcaseCard');
const showcaseImg   = document.getElementById('showcaseImg');
const showcaseTitle = document.getElementById('showcaseTitle');
const showcaseSub   = document.getElementById('showcaseSub');
const videoGrid     = document.getElementById('videoGrid');
const modal         = document.getElementById('videoModal');
const modalOverlay  = document.getElementById('modalOverlay');
const modalClose    = document.getElementById('modalClose');
const modalDialog   = modal.querySelector('.modal-dialog');
const modalTitle    = document.getElementById('modalTitle');
const modalDesc     = document.getElementById('modalDescription');
const modalTools    = document.getElementById('modalTools');
const videoInner    = document.getElementById('videoInner');

/* ── OPEN VIDEO ── */
function openVideo(video) {
  openModal(video);
}

/* ── VIMEO MODAL ── */
function openModal(video) {
  const youtubeParams = new URLSearchParams({
    autoplay: '1',
    rel: '0',
    modestbranding: '1',
  });
  if (video.start) youtubeParams.set('start', String(video.start));

  const src = video.type === 'youtube'
    ? `https://www.youtube.com/embed/${video.id}?${youtubeParams}`
    : `https://player.vimeo.com/video/${video.id}?autoplay=1&title=0&byline=0&portrait=0&color=ffffff`;

  modalDialog.classList.toggle('is-portrait', video.aspect === 'portrait');
  modalTitle.textContent = `${video.title} (${video.year})`;
  modalDesc.textContent = video.description || 'Video description coming soon.';
  modalTools.replaceChildren(buildToolLogos(video.tools || [], 'modal-tool-logos'));

  const iframe = document.createElement('iframe');
  iframe.src = src;
  iframe.title = video.title;
  iframe.frameBorder = '0';
  iframe.allow = 'autoplay; fullscreen; picture-in-picture; encrypted-media';
  iframe.referrerPolicy = 'strict-origin-when-cross-origin';
  iframe.allowFullscreen = true;
  videoInner.replaceChildren(iframe);

  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  videoInner.replaceChildren();
  modalTools.replaceChildren();
  modalDialog.classList.remove('is-portrait');
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

modalOverlay.addEventListener('click', closeModal);
modalClose.addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
});

/* ── TOOL LOGOS: build a row of logo imgs ── */
function buildToolLogos(tools, className = 'card-tools') {
  const el = document.createElement('div');
  el.className = className;
  tools.forEach((t) => {
    const toolName = t.trim();
    const img = document.createElement('img');
    img.src = `Logo/${toolName}.png`;
    img.alt = `${toolName} logo`;
    img.title = toolName;
    img.className = 'tool-logo';
    img.loading = 'lazy';
    img.decoding = 'async';
    el.appendChild(img);
  });
  return el;
}

/* ── SHOWCASE: always shows the featured video (007) ── */
function initShowcase() {
  showcaseImg.src           = FEATURED.thumb;
  showcaseTitle.textContent = FEATURED.title;
  showcaseSub.textContent   = `${FEATURED.category} · ${FEATURED.year}`;
  showcaseCard.addEventListener('click', () => openVideo(FEATURED));

  if (FEATURED.tools?.length) {
    document.querySelector('.showcase-thumb').appendChild(buildToolLogos(FEATURED.tools));
  }
}

/* ── GRID CARD ── */
function createGridCard(video) {
  const card = document.createElement('div');
  card.className = 'grid-card glass-card';

  const thumb = document.createElement('div');
  thumb.className = 'card-thumb';

  const img = document.createElement('img');
  img.className = 'thumbnail-img';
  img.alt = video.title;
  img.src = video.thumb;

  const overlay = document.createElement('div');
  overlay.className = 'card-overlay';
  overlay.innerHTML = `
    <p class="ov-title">${video.title}</p>
    <p class="ov-meta">${video.category} · ${video.year}</p>`;

  const hoverEl = document.createElement('div');
  hoverEl.className = 'card-hover';
  hoverEl.innerHTML = `<div class="play-circle"><div class="play-icon"></div></div>`;

  thumb.appendChild(img);
  thumb.appendChild(overlay);
  thumb.appendChild(hoverEl);
  if (video.tools?.length) thumb.appendChild(buildToolLogos(video.tools));
  card.appendChild(thumb);

  card.addEventListener('click', () => openVideo(video));
  return card;
}

/* ── BUILD GRID (all non-featured videos) ── */
function buildGrid() {
  videos
    .filter((v) => !v.featured)
    .forEach((v) => videoGrid.appendChild(createGridCard(v)));
}

/* ── NAV SCROLL HIGHLIGHT ── */
document.querySelectorAll('section[id]').forEach((s) => {
  new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        document.querySelectorAll('.nav-link').forEach((l) => l.classList.remove('active'));
        const a = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (a) a.classList.add('active');
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  ).observe(s);
});

/* ── SCROLL: nav alignment + Jaemin Ryu FLIP animation ── */
document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.nav-link').forEach((l) => l.classList.remove('active'));
    link.classList.add('active');
  });
});

const navEl      = document.querySelector('nav');
const nameBadge  = document.getElementById('nameBadge');
const headerH1   = document.querySelector('header h1');
const subtitleEl = document.querySelector('.subtitle');
const NAV_H      = 70; // matches CSS nav height
const SCROLL_THRESHOLD = 90;
let isScrolledPast  = false;
let badgeOutTimeout = null;

function updateScrollChrome() {
  fadeSubtitle();
  const past = window.scrollY > SCROLL_THRESHOLD;
  navEl.classList.toggle('scrolled', past);
  if (past === isScrolledPast) return;
  isScrolledPast = past;
  past ? flyBadgeIn() : flyBadgeOut();
}

window.addEventListener('scroll', updateScrollChrome, { passive: true });
window.addEventListener('hashchange', () => setTimeout(updateScrollChrome, 0));

function fadeSubtitle() {
  const progress = Math.min(window.scrollY / SCROLL_THRESHOLD, 1);
  subtitleEl.style.opacity = String(1 - progress);
  subtitleEl.style.transform = `translateY(${-8 * progress}px)`;
  subtitleEl.style.filter = `blur(${2 * progress}px)`;
}

function flyBadgeIn() {
  clearTimeout(badgeOutTimeout);
  const h1Rect = headerH1.getBoundingClientRect();
  const badgeRight = parseFloat(getComputedStyle(nameBadge).right) || 78;

  // Badge natural center (top-right, vertically centred in nav)
  const badgeCenterX = window.innerWidth - badgeRight - nameBadge.offsetWidth / 2;
  const badgeCenterY = NAV_H / 2;

  const dx    = (h1Rect.left + h1Rect.width  / 2) - badgeCenterX;
  const dy    = (h1Rect.top  + h1Rect.height / 2) - badgeCenterY;
  const scale = h1Rect.height / (nameBadge.offsetHeight || 1);

  // Hide the header h1 instantly (keeps layout space)
  headerH1.style.transition = 'none';
  headerH1.style.opacity    = '0';

  // Teleport badge to h1's visual position
  nameBadge.style.transition = 'none';
  nameBadge.style.opacity    = '1';
  nameBadge.style.transform  = `translate(${dx}px,${dy}px) scale(${scale})`;
  nameBadge.classList.add('visible');

  // Force reflow, then fly to natural position
  nameBadge.offsetHeight; // eslint-disable-line no-unused-expressions
  nameBadge.style.transition = 'transform 0.65s cubic-bezier(0.4,0,0.2,1)';
  nameBadge.style.transform  = 'none';
}

function flyBadgeOut() {
  nameBadge.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
  nameBadge.style.opacity    = '0';
  nameBadge.style.transform  = 'translateX(14px)';

  badgeOutTimeout = setTimeout(() => {
    nameBadge.classList.remove('visible');
    nameBadge.removeAttribute('style');
    headerH1.style.transition = 'opacity 0.35s ease';
    headerH1.style.opacity    = '1';
    setTimeout(() => { headerH1.style.transition = ''; headerH1.style.opacity = ''; }, 400);
  }, 260);
}

/* ── DARK MODE (default on; light mode is the toggle) ── */
let isDark = localStorage.getItem('dark-mode') !== 'false';
// Class already applied by inline <head> script; keep state in sync
document.documentElement.classList.toggle('dark-mode', isDark);

document.getElementById('darkToggle').addEventListener('click', () => {
  isDark = !isDark;
  document.documentElement.classList.toggle('dark-mode', isDark);
  document.getElementById('darkToggle').setAttribute('aria-pressed', String(isDark));
  localStorage.setItem('dark-mode', String(isDark));
});

/* ── SCROLL TO TOP ── */
document.getElementById('toTopBtn').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── INIT ── */
updateScrollChrome();
setTimeout(updateScrollChrome, 0);
initShowcase();
buildGrid();
