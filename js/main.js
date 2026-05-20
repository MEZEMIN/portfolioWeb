const videos = [
  {
    type: 'vimeo', id: '1166855560',
    title: 'Between Tides',
    category: 'SHORT FILM',
    year: '2024',
    description: 'A cinematic exploration of memory and solitude, filmed across three tidal cycles at the edge of land and sea.',
  },
  {
    type: 'vimeo', id: '1166855862',
    title: 'Reverence',
    category: 'BRAND FILM',
    year: '2024',
    description: 'Commissioned visual narrative weaving product aesthetics with natural forms and quiet ceremony.',
  },
  {
    type: 'vimeo', id: '1166856113',
    title: 'The Shape of Silence',
    category: 'DOCUMENTARY',
    year: '2024',
    description: 'Documentary portrait of stillness — observing the quiet, unhurried rhythms of daily life.',
  },
  {
    type: 'youtube', id: 'xcVSfdI7GzU',
    title: 'Luminous Days',
    category: 'SHORT FILM',
    year: '2023',
    description: 'A short film about light, time, and the spaces between moments we choose to remember.',
  },
  {
    type: 'youtube', id: 'NaMJYXNi6JI',
    title: 'City Interval',
    category: 'EXPERIMENTAL',
    year: '2023',
    description: 'Urban textures and human movement collapsed into a rhythmic visual essay on density and drift.',
  },
  {
    type: 'youtube', id: 'Y19dV0GHpso',
    title: 'Kinetic Study',
    category: 'DANCE FILM',
    year: '2022',
    description: 'Choreography and camera language in dialogue — motion as meaning, stillness as punctuation.',
  },
  {
    type: 'youtube', id: 'lgILl71Ya2E',
    title: 'Ephemeral',
    category: 'FASHION FILM',
    year: '2022',
    description: 'Fashion as philosophy. A meditation on form, fabric, and the temporary nature of beauty.',
  },
];

/* ── BLOB MOUSE TRACKING ── */
const blobEls = [
  document.querySelector('.bg-blob--1'),
  document.querySelector('.bg-blob--2'),
  document.querySelector('.bg-blob--3'),
];

// speed = lerp factor, mx/my = movement multiplier relative to cursor offset
const blobState = [
  { cx: 0, cy: 0, spd: 0.04, mx:  0.38, my:  0.28 },
  { cx: 0, cy: 0, spd: 0.03, mx: -0.30, my: -0.24 },
  { cx: 0, cy: 0, spd: 0.06, mx: -0.22, my:  0.32 },
];

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

(function tickBlobs() {
  const ox = mouseX - window.innerWidth  / 2;
  const oy = mouseY - window.innerHeight / 2;

  blobState.forEach((b, i) => {
    const tx = ox * b.mx;
    const ty = oy * b.my;
    b.cx += (tx - b.cx) * b.spd;
    b.cy += (ty - b.cy) * b.spd;
    blobEls[i].style.transform = `translate(${b.cx}px, ${b.cy}px)`;
  });

  requestAnimationFrame(tickBlobs);
})();

/* ── THUMBNAILS ── */
function ytThumb(id) {
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}

async function vimeoThumb(id) {
  try {
    const r = await fetch(
      `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${id}&width=800`
    );
    if (!r.ok) return null;
    const d = await r.json();
    return d.thumbnail_url || null;
  } catch { return null; }
}

/* ── STATE ── */
let currentIndex = 0;
let loadedThumbs  = [];

/* ── DOM REFS ── */
const showcaseImg      = document.getElementById('showcaseImg');
const showcaseTitle    = document.getElementById('showcaseTitle');
const showcaseCategory = document.getElementById('showcaseCategory');
const showcaseYear     = document.getElementById('showcaseYear');
const showcasePlayBtn  = document.getElementById('showcasePlayBtn');
const videoGrid        = document.getElementById('videoGrid');

const modal        = document.getElementById('videoModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose   = document.getElementById('modalClose');
const modalCategory = document.getElementById('modalCategory');
const modalTitle   = document.getElementById('modalTitle');
const modalYear    = document.getElementById('modalYear');
const modalText    = document.getElementById('modalText');

/* ── SHOWCASE UPDATE ── */
function updateShowcase(video, thumbSrc) {
  showcaseImg.style.opacity = '0';
  setTimeout(() => {
    showcaseImg.src = thumbSrc || '';
    showcaseImg.style.opacity = '1';
  }, 180);
  showcaseTitle.textContent    = video.title;
  showcaseCategory.textContent = video.category;
  showcaseYear.textContent     = video.year;
}

/* ── GRID REBUILD (all videos except featured) ── */
function rebuildGrid() {
  videoGrid.innerHTML = '';
  videos.forEach((v, i) => {
    if (i === currentIndex) return;
    videoGrid.appendChild(createGridCard(v, i, loadedThumbs[i]));
  });
}

function selectVideo(index) {
  currentIndex = index;
  updateShowcase(videos[index], loadedThumbs[index]);
  rebuildGrid();
}

/* ── OPEN VIDEO ── */
function openVideo(video) {
  if (video.type === 'youtube') {
    const win = window.open(`https://www.youtube.com/watch?v=${video.id}`, '_blank', 'noopener,noreferrer');
    if (win) win.opener = null;
    return;
  }
  openModal(video);
}

/* ── MODAL ── */
function openModal(video) {
  modalCategory.textContent = video.category;
  modalTitle.textContent    = video.title;
  modalYear.textContent     = video.year;
  modalText.textContent     = video.description;

  document.getElementById('videoInner').innerHTML = `
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
  document.getElementById('videoInner').innerHTML = '';
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

modalOverlay.addEventListener('click', closeModal);
modalClose.addEventListener('click', closeModal);
showcasePlayBtn.addEventListener('click', () => openVideo(videos[currentIndex]));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
});

/* ── GRID CARD ── */
function createGridCard(video, index, thumbSrc) {
  const card = document.createElement('div');
  card.className = 'grid-card glass-card';

  const thumb = document.createElement('div');
  thumb.className = 'card-thumb' + (thumbSrc ? '' : ' is-loading');

  const img = document.createElement('img');
  img.alt = video.title;
  img.style.transition = 'opacity 0.3s';

  const playBtn = document.createElement('button');
  playBtn.className = 'play-btn';
  playBtn.setAttribute('aria-label', 'Play');
  playBtn.innerHTML = `<div class="play-circle"><div class="play-icon"></div></div>`;

  thumb.appendChild(img);
  thumb.appendChild(playBtn);

  const info = document.createElement('div');
  info.className = 'card-info';
  info.innerHTML = `
    <p class="card-title-sm">${video.title}</p>
    <div class="card-meta">
      <span class="cat">${video.category}</span>
      <span class="yr">${video.year}</span>
    </div>`;

  card.appendChild(thumb);
  card.appendChild(info);

  // Click card body → make featured
  card.addEventListener('click', (e) => {
    if (e.target.closest('.play-btn')) return;
    selectVideo(index);
  });

  // Click play → make featured + open video
  playBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    selectVideo(index);
    openVideo(video);
  });

  if (thumbSrc) {
    img.src = thumbSrc;
    img.onload  = () => thumb.classList.remove('is-loading');
    img.onerror = () => thumb.classList.remove('is-loading');
  }

  return card;
}

/* ── INIT ── */
async function init() {
  // Load all thumbnails in parallel
  loadedThumbs = await Promise.all(
    videos.map((v) =>
      v.type === 'youtube' ? Promise.resolve(ytThumb(v.id)) : vimeoThumb(v.id)
    )
  );

  // Set showcase to first video
  updateShowcase(videos[0], loadedThumbs[0]);

  // Build grid for remaining 6
  rebuildGrid();
}

/* ── NAV SCROLL HIGHLIGHT ── */
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

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
).observe(sections[0]);

sections.forEach((s) => {
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
