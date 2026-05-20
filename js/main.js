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

/* ── YOUTUBE IFRAME API ── */
let ytApiReady = false;
let pendingYTVideoId = null;
let ytPlayerInstance = null;

(function loadYTApi() {
  const s = document.createElement('script');
  s.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(s);
})();

window.onYouTubeIframeAPIReady = function () {
  ytApiReady = true;
  if (pendingYTVideoId) {
    createYTPlayer(pendingYTVideoId);
    pendingYTVideoId = null;
  }
};

function createYTPlayer(videoId) {
  const inner = document.getElementById('videoInner');
  inner.innerHTML = '<div id="ytPlayerEl" style="width:100%;height:100%;"></div>';

  ytPlayerInstance = new YT.Player('ytPlayerEl', {
    videoId,
    width: '100%',
    height: '100%',
    playerVars: { autoplay: 1, rel: 0, modestbranding: 1 },
    events: {
      onReady(e) { e.target.playVideo(); },
      onError(e) {
        // 101 / 150 = embedding disabled by video owner
        showYTFallback(videoId);
      },
    },
  });
}

function showYTFallback(videoId) {
  document.querySelector('.video-aspect-box').style.display = 'none';
  const fb = document.getElementById('ytFallback');
  fb.style.display = 'flex';
  document.getElementById('ytFallbackLink').href =
    `https://www.youtube.com/watch?v=${videoId}`;
}

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

/* ── DOM REFS ── */
const showcaseImg      = document.getElementById('showcaseImg');
const showcaseTitle    = document.getElementById('showcaseTitle');
const showcaseCategory = document.getElementById('showcaseCategory');
const showcaseYear     = document.getElementById('showcaseYear');
const showcasePlayBtn  = document.getElementById('showcasePlayBtn');
const filmstrip        = document.getElementById('filmstrip');

const modal       = document.getElementById('videoModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose  = document.getElementById('modalClose');
const modalCategory = document.getElementById('modalCategory');
const modalTitle  = document.getElementById('modalTitle');
const modalYear   = document.getElementById('modalYear');
const modalText   = document.getElementById('modalText');

/* ── SHOWCASE UPDATE ── */
function selectVideo(index, imgSrc) {
  const prev = filmstrip.querySelector('.film-card.is-active');
  if (prev) prev.classList.remove('is-active');

  const cards = filmstrip.querySelectorAll('.film-card');
  if (cards[index]) cards[index].classList.add('is-active');

  const v = videos[index];
  currentIndex = index;

  // Fade transition
  showcaseImg.style.opacity = '0';
  setTimeout(() => {
    showcaseImg.src = imgSrc || '';
    showcaseImg.style.opacity = '1';
  }, 150);

  showcaseTitle.textContent    = v.title;
  showcaseCategory.textContent = v.category;
  showcaseYear.textContent     = v.year;
}

/* ── MODAL OPEN / CLOSE ── */
function openModal(video) {
  modalCategory.textContent = video.category;
  modalTitle.textContent    = video.title;
  modalYear.textContent     = video.year;
  modalText.textContent     = video.description;

  // Reset player area
  const aspectBox = document.querySelector('.video-aspect-box');
  aspectBox.style.display = '';
  document.getElementById('ytFallback').style.display = 'none';
  document.getElementById('videoInner').innerHTML = '';

  if (video.type === 'vimeo') {
    document.getElementById('videoInner').innerHTML = `
      <iframe
        src="https://player.vimeo.com/video/${video.id}?autoplay=1&title=0&byline=0&portrait=0&color=ffffff"
        frameborder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowfullscreen
        style="position:absolute;inset:0;width:100%;height:100%;"
      ></iframe>`;
  } else {
    if (ytApiReady) {
      createYTPlayer(video.id);
    } else {
      pendingYTVideoId = video.id;
    }
  }

  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (ytPlayerInstance) {
    try { ytPlayerInstance.destroy(); } catch {}
    ytPlayerInstance = null;
  }
  document.getElementById('videoInner').innerHTML = '';
  document.querySelector('.video-aspect-box').style.display = '';
  document.getElementById('ytFallback').style.display = 'none';

  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

modalOverlay.addEventListener('click', closeModal);
modalClose.addEventListener('click', closeModal);
showcasePlayBtn.addEventListener('click', () => openModal(videos[currentIndex]));

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
});

/* ── FILMSTRIP CARD BUILD ── */
function createFilmCard(video, index, thumbSrc) {
  const card = document.createElement('div');
  card.className = 'film-card glass-card';
  if (index === 0) card.classList.add('is-active');

  const thumb = document.createElement('div');
  thumb.className = 'card-thumb' + (thumbSrc ? '' : ' is-loading');

  const img = document.createElement('img');
  img.alt = video.title;
  img.style.transition = 'opacity 0.3s';

  const playBtn = document.createElement('button');
  playBtn.className = 'play-btn';
  playBtn.setAttribute('aria-label', 'Play');
  playBtn.innerHTML = `
    <div class="play-circle">
      <div class="play-icon"></div>
    </div>`;

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

  // Click card body → select showcase
  card.addEventListener('click', (e) => {
    if (e.target.closest('.play-btn')) return;
    selectVideo(index, img.src);
  });

  // Click play → open modal directly
  playBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    selectVideo(index, img.src);
    openModal(video);
  });

  // Load thumbnail
  if (thumbSrc) {
    img.src = thumbSrc;
    img.onload = () => thumb.classList.remove('is-loading');
  }

  return { card, img, thumb };
}

/* ── INIT ── */
async function init() {
  const thumbPromises = videos.map((v) =>
    v.type === 'youtube'
      ? Promise.resolve(ytThumb(v.id))
      : vimeoThumb(v.id)
  );

  // Build filmstrip immediately with loading state, then fill thumbnails
  const filmCards = videos.map((v, i) => {
    const { card, img, thumb } = createFilmCard(v, i, null);
    filmstrip.appendChild(card);
    return { img, thumb };
  });

  // Set first showcase
  showcaseTitle.textContent    = videos[0].title;
  showcaseCategory.textContent = videos[0].category;
  showcaseYear.textContent     = videos[0].year;
  showcaseImg.style.transition = 'opacity 0.3s';

  // Resolve thumbnails and populate
  const thumbs = await Promise.all(thumbPromises);

  thumbs.forEach((src, i) => {
    const { img, thumb } = filmCards[i];
    if (!src) { thumb.classList.remove('is-loading'); return; }

    img.src = src;
    img.onload = () => thumb.classList.remove('is-loading');
    img.onerror = () => { thumb.classList.remove('is-loading'); };

    if (i === 0) {
      showcaseImg.src = src;
    }
  });
}

/* ── NAV SCROLL HIGHLIGHT ── */
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

const observer = new IntersectionObserver(
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
);

sections.forEach((s) => observer.observe(s));

init();
