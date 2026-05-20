const videos = [
  {
    type: 'vimeo',
    id: '1166855560',
    title: 'Between Tides',
    category: 'SHORT FILM',
    year: '2024',
  },
  {
    type: 'vimeo',
    id: '1166855862',
    title: 'Reverence',
    category: 'BRAND FILM',
    year: '2024',
  },
  {
    type: 'vimeo',
    id: '1166856113',
    title: 'The Shape of Silence',
    category: 'DOCUMENTARY',
    year: '2024',
  },
  {
    type: 'youtube',
    id: 'xcVSfdI7GzU',
    title: 'Luminous Days',
    category: 'SHORT FILM',
    year: '2023',
  },
  {
    type: 'youtube',
    id: 'NaMJYXNi6JI',
    title: 'City Interval',
    category: 'EXPERIMENTAL',
    year: '2023',
  },
  {
    type: 'youtube',
    id: 'Y19dV0GHpso',
    title: 'Kinetic Study',
    category: 'DANCE FILM',
    year: '2022',
  },
  {
    type: 'youtube',
    id: 'lgILl71Ya2E',
    title: 'Ephemeral',
    category: 'FASHION FILM',
    year: '2022',
  },
];

const modal = document.getElementById('videoModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const videoFrame = document.getElementById('videoFrame');

function getEmbedUrl(video) {
  if (video.type === 'vimeo') {
    return `https://player.vimeo.com/video/${video.id}?autoplay=1&title=0&byline=0&portrait=0&color=ffffff`;
  }
  return `https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`;
}

function getYoutubeThumbnail(id) {
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}

async function getVimeoThumbnail(id) {
  try {
    const res = await fetch(
      `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${id}&width=800`
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.thumbnail_url || null;
  } catch {
    return null;
  }
}

function openModal(video) {
  videoFrame.src = getEmbedUrl(video);
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  videoFrame.src = '';
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

modalOverlay.addEventListener('click', closeModal);
modalClose.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('is-open')) {
    closeModal();
  }
});

function createCard(video) {
  const card = document.createElement('div');
  card.className = 'card';

  const thumb = document.createElement('div');
  thumb.className = 'card-thumb loading';

  const img = document.createElement('img');
  img.alt = video.title;

  const playBtn = document.createElement('div');
  playBtn.className = 'play-btn';
  playBtn.innerHTML = `
    <div class="play-circle">
      <div class="play-icon"></div>
    </div>
  `;

  thumb.appendChild(img);
  thumb.appendChild(playBtn);

  const info = document.createElement('div');
  info.className = 'card-info';
  info.innerHTML = `
    <p class="card-title">${video.title}</p>
    <div class="card-meta">
      <span class="card-category">${video.category}</span>
      <span class="card-year">${video.year}</span>
    </div>
  `;

  card.appendChild(thumb);
  card.appendChild(info);

  card.addEventListener('click', () => openModal(video));

  if (video.type === 'youtube') {
    img.src = getYoutubeThumbnail(video.id);
    img.onload = () => thumb.classList.remove('loading');
    img.onerror = () => thumb.classList.remove('loading');
  } else {
    getVimeoThumbnail(video.id).then((url) => {
      thumb.classList.remove('loading');
      if (url) img.src = url;
    });
  }

  return card;
}

const grid = document.getElementById('videoGrid');
videos.forEach((video) => grid.appendChild(createCard(video)));

/* ── Active nav on scroll ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach((s) => observer.observe(s));
