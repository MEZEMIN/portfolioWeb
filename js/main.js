/* ── VIDEO DATA ── */
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
    description: "Planned and produced a short social media advertisement for DOMO Tea's Vanilla Matcha, with the ad video created using AI.",
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

/* ── VIDEO MODAL ── */
const modal        = document.getElementById('videoModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose   = document.getElementById('modalClose');
const modalDialog  = modal.querySelector('.modal-dialog');
const modalTitle   = document.getElementById('modalTitle');
const modalDesc    = document.getElementById('modalDescription');
const modalTools   = document.getElementById('modalTools');
const videoInner   = document.getElementById('videoInner');

function openVideoModal(video) {
  const qs = new URLSearchParams({ autoplay: '1', rel: '0', modestbranding: '1' });
  if (video.start) qs.set('start', String(video.start));

  const src = video.type === 'youtube'
    ? `https://www.youtube.com/embed/${video.id}?${qs}`
    : `https://player.vimeo.com/video/${video.id}?autoplay=1&title=0&byline=0&portrait=0&color=ffffff`;

  modalDialog.classList.toggle('is-portrait', video.aspect === 'portrait');
  modalTitle.textContent = `${video.title} (${video.year})`;
  modalDesc.textContent = video.description || '';

  modalTools.replaceChildren();
  (video.tools || []).forEach(t => {
    const img = document.createElement('img');
    img.src = `Logo/${t.trim()}.png`;
    img.alt = t;
    img.title = t;
    img.loading = 'lazy';
    img.decoding = 'async';
    modalTools.appendChild(img);
  });

  const iframe = document.createElement('iframe');
  iframe.src = src;
  iframe.title = video.title;
  iframe.allow = 'autoplay; fullscreen; picture-in-picture; encrypted-media';
  iframe.referrerPolicy = 'strict-origin-when-cross-origin';
  iframe.allowFullscreen = true;
  videoInner.replaceChildren(iframe);

  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
  videoInner.replaceChildren();
  modalTools.replaceChildren();
  modalDialog.classList.remove('is-portrait');
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

modalOverlay.addEventListener('click', closeVideoModal);
modalClose.addEventListener('click', closeVideoModal);

/* ── INFO MODAL (About / Contact / Other / Image) ── */
const infoModal   = document.getElementById('infoModal');
const infoOverlay = document.getElementById('infoOverlay');
const infoClose   = document.getElementById('infoClose');
const infoContent = document.getElementById('infoContent');
const infoDialog  = document.getElementById('infoDialog');

function openInfoModal(html) {
  infoContent.innerHTML = html;
  infoModal.classList.add('is-open');
  infoModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function openImageModal(src, title) {
  infoContent.innerHTML = `
    <h2 class="info-heading">${title}</h2>
    <img src="${src}" class="image-modal-img" alt="${title}">
  `;
  infoDialog.classList.add('is-image');
  infoModal.classList.add('is-open');
  infoModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function openOtherModal() {
  const otherVideos = videos.filter((_, i) => !BENTO_VIDEOS.includes(i));
  const grid = otherVideos.map(v => {
    const idx = videos.indexOf(v);
    return `
      <div class="other-thumb-card" data-index="${idx}">
        <img src="${v.thumb}" alt="${v.title}" loading="lazy">
        <div class="other-thumb-overlay"></div>
        <div class="other-thumb-info">
          <div class="other-thumb-title">${v.title}</div>
          <div class="other-thumb-meta">${v.category} · ${v.year}</div>
        </div>
        <div class="other-thumb-play"><div class="play-circle"><div class="play-tri"></div></div></div>
      </div>
    `;
  }).join('');

  infoContent.innerHTML = `
    <h2 class="info-heading">More Work</h2>
    <div class="other-grid">${grid}</div>
  `;
  infoDialog.classList.add('is-other');
  infoModal.classList.add('is-open');
  infoModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  infoContent.querySelectorAll('.other-thumb-card').forEach(card => {
    const idx = parseInt(card.dataset.index);
    card.addEventListener('click', () => {
      closeInfoModal();
      openVideoModal(videos[idx]);
    });
  });
}

function closeInfoModal() {
  infoModal.classList.remove('is-open');
  infoModal.setAttribute('aria-hidden', 'true');
  infoDialog.classList.remove('is-image', 'is-other');
  document.body.style.overflow = '';
}

infoOverlay.addEventListener('click', closeInfoModal);
infoClose.addEventListener('click', closeInfoModal);

document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if (modal.classList.contains('is-open')) closeVideoModal();
  if (infoModal.classList.contains('is-open')) closeInfoModal();
});

/* ── CARD FACTORIES ── */
const ALL_LOGOS = ['Houdini', 'Maya', 'Nuke', 'Higgs', 'Ae', 'Pr', 'FC', 'Ps', 'Ai', 'Figma'];

function createVideoCard(video, featured = false) {
  const card = document.createElement('div');
  card.className = 'bcard bcard-video' + (featured ? ' bcard-featured' : '');

  const img = document.createElement('img');
  img.className = 'thumb';
  img.src = video.thumb;
  img.alt = video.title;
  img.loading = 'lazy';

  const grad = document.createElement('div');
  grad.className = 'vcard-grad';

  const bottom = document.createElement('div');
  bottom.className = 'vcard-bottom';

  const titleEl = document.createElement('div');
  titleEl.className = 'vcard-title';
  titleEl.textContent = video.title;

  const metaEl = document.createElement('div');
  metaEl.className = 'vcard-meta';
  metaEl.textContent = `${video.category} · ${video.year}`;

  const toolsEl = document.createElement('div');
  toolsEl.className = 'vcard-tools';
  (video.tools || []).forEach(t => {
    const tImg = document.createElement('img');
    tImg.src = `Logo/${t.trim()}.png`;
    tImg.alt = t;
    tImg.loading = 'lazy';
    toolsEl.appendChild(tImg);
  });

  bottom.append(titleEl, metaEl, toolsEl);

  const playWrap = document.createElement('div');
  playWrap.className = 'play-wrap';
  playWrap.innerHTML = '<div class="play-circle"><div class="play-tri"></div></div>';

  card.append(img, grad, bottom, playWrap);
  card.addEventListener('click', () => openVideoModal(video));
  return card;
}

function createToolsCard() {
  const card = document.createElement('div');
  card.className = 'bcard bcard-tools';

  const label = document.createElement('span');
  label.className = 'tools-label';
  label.textContent = 'Tools';

  const logos = document.createElement('div');
  logos.className = 'tools-logos';
  ALL_LOGOS.forEach(name => {
    const img = document.createElement('img');
    img.src = `Logo/${name}.png`;
    img.alt = name;
    img.title = name;
    img.loading = 'lazy';
    logos.appendChild(img);
  });

  card.append(label, logos);
  return card;
}

function createContactCard() {
  const card = document.createElement('div');
  card.className = 'bcard bcard-contact';
  card.style.cursor = 'pointer';
  card.innerHTML = `
    <div class="contact-icon-ring">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
      </svg>
    </div>
    <span class="contact-label">Contact</span>
  `;
  card.addEventListener('click', () => {
    openInfoModal(`
      <h2 class="info-heading">Contact</h2>
      <div class="contact-rows">
        <div>
          <div class="contact-row-label">Email</div>
          <a class="contact-row-val" href="mailto:zemin2k@gmail.com">zemin2k@gmail.com</a>
        </div>
        <div>
          <div class="contact-row-label">Phone</div>
          <a class="contact-row-val" href="tel:+12369718044">+1 236 971 8044</a>
        </div>
      </div>
    `);
  });
  return card;
}

function createNameCard() {
  const card = document.createElement('div');
  card.className = 'bcard bcard-name';
  card.innerHTML = '<span class="name-text">[Jaemin Ryu]</span>';
  return card;
}

function createResumeCard() {
  const card = document.createElement('a');
  card.className = 'bcard bcard-resume';
  card.href = 'Resum_FX.pdf';
  card.download = 'Resum_FX.pdf';
  card.innerHTML = `
    <svg width="54" height="60" viewBox="0 0 54 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="2" width="34" height="44" rx="4" fill="#f0f0f0" stroke="#222" stroke-width="2.5"/>
      <line x1="11" y1="13" x2="31" y2="13" stroke="#444" stroke-width="2" stroke-linecap="round"/>
      <line x1="11" y1="20" x2="31" y2="20" stroke="#444" stroke-width="2" stroke-linecap="round"/>
      <line x1="11" y1="27" x2="23" y2="27" stroke="#444" stroke-width="2" stroke-linecap="round"/>
      <circle cx="38" cy="46" r="12" fill="#111"/>
      <path d="M34 46.5l3.5 3.5 6-6" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <span class="resume-label">Resume</span>
  `;
  return card;
}

function createAboutCard() {
  const card = document.createElement('div');
  card.className = 'bcard bcard-about';
  card.innerHTML = `
    <div class="about-inner">
      <div class="about-left">
        <span class="about-title">About</span>
        <p class="about-intro">VFX Artist · Filmmaker · Designer</p>
      </div>
      <div class="about-skills">
        <div class="about-skill-item">
          <span class="about-skill-cat">VFX &amp; 3D</span>
          <span class="about-skill-tools">Houdini · Maya · Nuke X</span>
        </div>
        <div class="about-skill-item">
          <span class="about-skill-cat">AI Video Generation</span>
          <span class="about-skill-tools">Kling · Seedance · Higgsfield</span>
        </div>
        <div class="about-skill-item">
          <span class="about-skill-cat">Video Editing</span>
          <span class="about-skill-tools">Premiere Pro · Final Cut Pro</span>
        </div>
        <div class="about-skill-item">
          <span class="about-skill-cat">Motion Graphics &amp; Compositing</span>
          <span class="about-skill-tools">After Effects</span>
        </div>
        <div class="about-skill-item">
          <span class="about-skill-cat">Graphic Design</span>
          <span class="about-skill-tools">Photoshop · Illustrator</span>
        </div>
        <div class="about-skill-item">
          <span class="about-skill-cat">UI/UX Design</span>
          <span class="about-skill-tools">Figma</span>
        </div>
        <div class="about-skill-item">
          <span class="about-skill-cat">Development</span>
          <span class="about-skill-tools">VS Code (Vibe Coding)</span>
        </div>
      </div>
    </div>
  `;
  return card;
}

function createUiuxCard() {
  const card = document.createElement('div');
  card.className = 'bcard bcard-video bcard-uiux';

  const img = document.createElement('img');
  img.className = 'thumb';
  img.src = 'UiUx/ui001.png';
  img.alt = 'UI/UX Design';
  img.loading = 'lazy';

  const grad = document.createElement('div');
  grad.className = 'vcard-grad';

  const bottom = document.createElement('div');
  bottom.className = 'vcard-bottom';

  const titleEl = document.createElement('div');
  titleEl.className = 'vcard-title';
  titleEl.textContent = 'UI/UX Design';

  const metaEl = document.createElement('div');
  metaEl.className = 'vcard-meta';
  metaEl.textContent = 'UI/UX DESIGN · 2025';

  const toolsEl = document.createElement('div');
  toolsEl.className = 'vcard-tools';
  const figmaImg = document.createElement('img');
  figmaImg.src = 'Logo/Figma.png';
  figmaImg.alt = 'Figma';
  figmaImg.loading = 'lazy';
  toolsEl.appendChild(figmaImg);

  bottom.append(titleEl, metaEl, toolsEl);

  const viewWrap = document.createElement('div');
  viewWrap.className = 'play-wrap';
  viewWrap.innerHTML = '<div class="play-circle" style="font-size:18px;color:rgba(255,255,255,0.95);">&#128065;</div>';

  card.append(img, grad, bottom, viewWrap);
  card.addEventListener('click', () => openImageModal('UiUx/ui001.png', 'UI/UX Design'));
  return card;
}

function createOtherCard() {
  const otherCount = videos.filter((_, i) => !BENTO_VIDEOS.includes(i)).length;
  const card = document.createElement('div');
  card.className = 'bcard bcard-other';
  card.innerHTML = `
    <div class="other-grid-icon">
      <div class="other-dot"></div><div class="other-dot"></div>
      <div class="other-dot"></div><div class="other-dot"></div>
    </div>
    <span class="other-label">Other</span>
    <span class="other-count">${otherCount} Videos</span>
  `;
  card.addEventListener('click', openOtherModal);
  return card;
}

/* ── BENTO GRID ── */
// Row 1: [Spaceship (span 2)] [Tools      ] [Contact   ]
// Row 2: [Miserable          ] [Jaemin Ryu (span 2)] [Ice Age   ]
// Row 3: [Resume ] [Thanos  ] [Campbell   ] [Other     ]
// Row 4: [UIUX (span 2)     ] [About (span 2)        ]
const BENTO_VIDEOS = [0, 6, 4, 5, 7]; // Spaceship, Miserable, Ice Age, Thanos, Campbell

function buildBento() {
  const bento = document.getElementById('bento');
  let vi = 0;

  const cells = [
    'video-featured', 'tools',   'contact',
    'video',          'name',    'video',
    'resume',         'video',   'video',   'other',
    'uiux',           'about',
  ];

  cells.forEach(type => {
    let el;
    switch (type) {
      case 'video-featured': el = createVideoCard(videos[BENTO_VIDEOS[vi++]], true); break;
      case 'video':          el = createVideoCard(videos[BENTO_VIDEOS[vi++]]);       break;
      case 'tools':          el = createToolsCard();   break;
      case 'contact':        el = createContactCard(); break;
      case 'name':           el = createNameCard();    break;
      case 'resume':         el = createResumeCard();  break;
      case 'about':          el = createAboutCard();   break;
      case 'uiux':           el = createUiuxCard();    break;
      case 'other':          el = createOtherCard();   break;
    }
    bento.appendChild(el);
  });
}

buildBento();
