/* ── VIDEO DATA (from CardInfo.txt) ── */
const videos = [
  {
    type: 'youtube', id: 'Y19dV0GHpso',
    title: 'Spaceship Explosion',
    category: 'HOUDINI FX WORK',
    year: '2025',
    thumb: 'Thumnail/001.png',
  },
  {
    type: 'vimeo', id: '1166855560',
    title: 'DOMO London Fog Ads',
    category: 'AI ADVERTISEMENT VIDEO',
    year: '2026',
    thumb: 'Thumnail/002.png',
  },
  {
    type: 'vimeo', id: '1166855862',
    title: "DOMO Valentine's Day Ads",
    category: 'AI ADVERTISEMENT VIDEO',
    year: '2026',
    thumb: 'Thumnail/003.png',
  },
  {
    type: 'vimeo', id: '1166856113',
    title: 'DOMO Vanilla Matcha Ads',
    category: 'AI ADVERTISEMENT VIDEO',
    year: '2026',
    thumb: 'Thumnail/004.png',
  },
  {
    type: 'youtube', id: 'xcVSfdI7GzU',
    title: 'Ice Age',
    category: 'HOUDINI FX WORK',
    year: '2025',
    thumb: 'Thumnail/005.png',
  },
  {
    type: 'youtube', id: 'NaMJYXNi6JI',
    title: 'Thanos Disintegration Effect',
    category: 'HOUDINI FX WORK',
    year: '2025',
    thumb: 'Thumnail/006.png',
  },
  {
    type: 'youtube', id: 'lgILl71Ya2E',
    title: 'Miserable — Zemistein',
    category: 'AI MUSIC VIDEO',
    year: '2026',
    thumb: 'Thumnail/007.png',
  },
];

/* ── BLOB MOUSE TRACKING ── */
const blobEls = [
  document.querySelector('.bg-blob--1'),
  document.querySelector('.bg-blob--2'),
  document.querySelector('.bg-blob--3'),
];
const blobState = [
  { cx: 0, cy: 0, spd: 0.04, mx:  0.38, my:  0.28 },
  { cx: 0, cy: 0, spd: 0.03, mx: -0.30, my: -0.24 },
  { cx: 0, cy: 0, spd: 0.06, mx: -0.22, my:  0.32 },
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

/* ── STATE ── */
let currentIndex = 0;

/* ── DOM REFS ── */
const showcaseCard  = document.getElementById('showcaseCard');
const showcaseImg   = document.getElementById('showcaseImg');
const showcaseTitle = document.getElementById('showcaseTitle');
const showcaseSub   = document.getElementById('showcaseSub');
const videoGrid     = document.getElementById('videoGrid');

const modal        = document.getElementById('videoModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose   = document.getElementById('modalClose');
const videoInner   = document.getElementById('videoInner');

/* ── SHOWCASE UPDATE ── */
function updateShowcase(index) {
  const v = videos[index];
  currentIndex = index;

  showcaseImg.style.opacity = '0';
  setTimeout(() => {
    showcaseImg.src = v.thumb;
    showcaseImg.style.opacity = '1';
  }, 160);

  showcaseTitle.textContent = v.title;
  showcaseSub.textContent   = `${v.category} · ${v.year}`;
}

/* ── GRID REBUILD ── */
function rebuildGrid() {
  videoGrid.innerHTML = '';
  videos.forEach((v, i) => {
    if (i === currentIndex) return;
    videoGrid.appendChild(createGridCard(v, i));
  });
}

/* ── OPEN VIDEO ── */
function openVideo(video) {
  if (video.type === 'youtube') {
    const win = window.open(
      `https://www.youtube.com/watch?v=${video.id}`,
      '_blank', 'noopener,noreferrer'
    );
    if (win) win.opener = null;
    return;
  }
  openModal(video);
}

/* ── MODAL ── */
function openModal(video) {
  videoInner.innerHTML = `
    <iframe
      src="https://player.vimeo.com/video/${video.id}?autoplay=1&title=0&byline=0&portrait=0&color=ffffff"
      frameborder="0"
      allow="autoplay; fullscreen; picture-in-picture"
      allowfullscreen
    ></iframe>`;
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  videoInner.innerHTML = '';
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

modalOverlay.addEventListener('click', closeModal);
modalClose.addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
});

/* Clicking the showcase card plays the video */
showcaseCard.addEventListener('click', () => openVideo(videos[currentIndex]));

/* ── GRID CARD ── */
function createGridCard(video, index) {
  const card = document.createElement('div');
  card.className = 'grid-card glass-card';

  const thumb = document.createElement('div');
  thumb.className = 'card-thumb';

  const img = document.createElement('img');
  img.alt = video.title;
  img.src = video.thumb;

  /* Title overlay (default visible) */
  const overlay = document.createElement('div');
  overlay.className = 'card-overlay';
  overlay.innerHTML = `
    <p class="ov-title">${video.title}</p>
    <p class="ov-meta">${video.category} · ${video.year}</p>`;

  /* Play overlay (hover visible) */
  const hoverEl = document.createElement('div');
  hoverEl.className = 'card-hover';
  hoverEl.innerHTML = `<div class="play-circle"><div class="play-icon"></div></div>`;

  thumb.appendChild(img);
  thumb.appendChild(overlay);
  thumb.appendChild(hoverEl);
  card.appendChild(thumb);

  /* Click → select as featured + play */
  card.addEventListener('click', () => {
    updateShowcase(index);
    rebuildGrid();
    openVideo(video);
  });

  return card;
}

/* ── INIT ── */
function init() {
  updateShowcase(0);
  rebuildGrid();
}

/* ── NAV SCROLL HIGHLIGHT ── */
const navLinks = document.querySelectorAll('.nav-link');
document.querySelectorAll('section[id]').forEach((s) => {
  new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((l) => l.classList.remove('active'));
          const a = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
          if (a) a.classList.add('active');
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  ).observe(s);
});

init();
