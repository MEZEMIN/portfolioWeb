/* ── VIDEO DATA (from CardInfo.txt) ── */
const videos = [
  {
    thumb: 'Thumnail/001.png',
    title: 'Spaceship Explosion',
    category: 'HOUDINI FX WORK',
    year: '2025',
    type: 'youtube', id: 'Y19dV0GHpso',
  },
  {
    thumb: 'Thumnail/002.png',
    title: 'DOMO London Fog Ads',
    category: 'AI ADVERTISEMENT VIDEO',
    year: '2026',
    type: 'vimeo', id: '1166855560',
  },
  {
    thumb: 'Thumnail/003.png',
    title: "DOMO Valentine's Day Ads",
    category: 'AI ADVERTISEMENT VIDEO',
    year: '2026',
    type: 'vimeo', id: '1166855862',
  },
  {
    thumb: 'Thumnail/004.png',
    title: 'DOMO Vanilla Matcha Ads',
    category: 'AI ADVERTISEMENT VIDEO',
    year: '2026',
    type: 'vimeo', id: '1166856113',
  },
  {
    thumb: 'Thumnail/005.png',
    title: 'Ice Age',
    category: 'HOUDINI FX WORK',
    year: '2025',
    type: 'youtube', id: 'xcVSfdI7GzU',
  },
  {
    thumb: 'Thumnail/006.png',
    title: 'Thanos Disintegration Effect',
    category: 'HOUDINI FX WORK',
    year: '2025',
    type: 'youtube', id: 'NaMJYXNi6JI',
  },
  {
    thumb: 'Thumnail/007.png',
    title: 'Miserable — Zemistein',
    category: 'AI MUSIC VIDEO',
    year: '2026',
    type: 'youtube', id: 'lgILl71Ya2E',
    featured: true,  // always the large showcase card
  },
  {
    thumb: 'Thumnail/008.png',
    title: 'Campbell River',
    category: 'A FILM BY JAEMIN RYU',
    year: '2024',
    type: 'youtube', id: '5PBApE-Evmc',
  },
  {
    thumb: 'Thumnail/009.png',
    title: 'Saturna Island',
    category: 'A FILM BY JAEMIN RYU',
    year: '2024',
    type: 'youtube', id: 'r97RPVpzYbg',
  },
  {
    thumb: 'Thumnail/010.png',
    title: 'East Point, Saturna Island',
    category: 'A FILM BY JAEMIN RYU',
    year: '2024',
    type: 'youtube', id: 'hWSxcE-dMsg',
  },
  {
    thumb: 'Thumnail/011.png',
    title: 'Saturna Island 2',
    category: 'A FILM BY JAEMIN RYU',
    year: '2024',
    type: 'youtube', id: 'dpNSjN1MrBw',
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
const videoInner    = document.getElementById('videoInner');

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

/* ── VIMEO MODAL ── */
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

/* ── SHOWCASE: always shows the featured video (007) ── */
function initShowcase() {
  showcaseImg.src           = FEATURED.thumb;
  showcaseTitle.textContent = FEATURED.title;
  showcaseSub.textContent   = `${FEATURED.category} · ${FEATURED.year}`;
  showcaseCard.addEventListener('click', () => openVideo(FEATURED));
}

/* ── GRID CARD ── */
function createGridCard(video) {
  const card = document.createElement('div');
  card.className = 'grid-card glass-card';

  const thumb = document.createElement('div');
  thumb.className = 'card-thumb';

  const img = document.createElement('img');
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

/* ── INIT ── */
initShowcase();
buildGrid();
