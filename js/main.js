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
  {
    thumb: 'UiUx/ui001.png',
    title: 'UI/UX Design',
    category: 'UI/UX DESIGN',
    year: '2025',
    type: 'image',
    src: 'UiUx/ui001.png',
    tools: ['Figma'],
    description: 'Collaborated with a programmer to develop a game, where I was responsible for the UI/UX design and overall art direction. This image is a design plan created during the current development planning phase of the project.',
  },
  {
    thumb: 'Thumnail/012.png',
    title: 'Mare Infinitum',
    category: 'AI ART WORK',
    year: '2026',
    type: 'youtube', id: '1LM7vSTLtmY',
    tools: ['Higgs', 'FC'],
    description: 'Created an AI-driven art video, Mare Infinitum, produced with Higgsfield and edited in Final Cut Pro.',
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
    img.alt = TOOL_DISPLAY_NAMES[t] || t;
    img.title = `Filter by ${TOOL_DISPLAY_NAMES[t] || t}`;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      closeVideoModal();
      enterFilterMode(t.trim());
    });
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

function openImageModal(src, title, description) {
  const descHtml = description
    ? `<p class="image-modal-desc">${description}</p>`
    : '';
  infoContent.innerHTML = `
    <h2 class="info-heading">${title}</h2>
    ${descHtml}
    <div class="image-zoom-controls">
      <span class="zoom-toggle-label">Zoom</span>
      <button class="zoom-toggle is-on" aria-label="Toggle zoom lens"></button>
    </div>
    <div class="image-zoom-wrap">
      <img src="${src}" class="image-modal-img" alt="${title}">
      <div class="image-zoom-lens"></div>
      <div class="image-zoom-hint">Hover to zoom</div>
    </div>
  `;

  const wrap    = infoContent.querySelector('.image-zoom-wrap');
  const img     = infoContent.querySelector('.image-modal-img');
  const lens    = infoContent.querySelector('.image-zoom-lens');
  const hint    = infoContent.querySelector('.image-zoom-hint');
  const toggleBtn = infoContent.querySelector('.zoom-toggle');
  const ZOOM  = 3;
  const LSIZE = 420;
  let zoomEnabled = true;

  toggleBtn.addEventListener('click', () => {
    zoomEnabled = !zoomEnabled;
    toggleBtn.classList.toggle('is-on', zoomEnabled);
    if (!zoomEnabled) {
      lens.style.opacity = '0';
      hint.style.opacity = '0';
      wrap.style.cursor = 'default';
    } else {
      hint.style.opacity = '1';
      wrap.style.cursor = 'crosshair';
    }
  });

  wrap.addEventListener('mousemove', e => {
    if (!zoomEnabled) return;
    const r  = img.getBoundingClientRect();
    const cx = e.clientX - r.left;
    const cy = e.clientY - r.top;
    if (cx < 0 || cy < 0 || cx > r.width || cy > r.height) {
      lens.style.opacity = '0';
      return;
    }
    lens.style.left               = `${cx - LSIZE / 2}px`;
    lens.style.top                = `${cy - LSIZE / 2}px`;
    lens.style.backgroundImage    = `url('${src}')`;
    lens.style.backgroundSize     = `${r.width * ZOOM}px ${r.height * ZOOM}px`;
    lens.style.backgroundPosition = `${-(cx * ZOOM - LSIZE / 2)}px ${-(cy * ZOOM - LSIZE / 2)}px`;
    lens.style.opacity = '1';
    hint.style.opacity = '0';
  });

  wrap.addEventListener('mouseleave', () => {
    lens.style.opacity = '0';
    if (zoomEnabled) hint.style.opacity = '1';
  });

  infoDialog.classList.add('is-image');
  infoModal.classList.add('is-open');
  infoModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function openOtherModal() {
  const otherVideos = videos.filter((v, i) => !BENTO_VIDEOS.includes(i) && v.type !== 'image');
  const grid = otherVideos.map(v => {
    const idx = videos.indexOf(v);
    const toolIcons = (v.tools || []).map(t =>
      `<img src="Logo/${t.trim()}.png" alt="${t}" title="${t}" loading="lazy">`
    ).join('');
    return `
      <div class="other-thumb-card" data-index="${idx}">
        <img src="${v.thumb}" alt="${v.title}" loading="lazy">
        <div class="other-thumb-overlay"></div>
        <div class="other-thumb-info">
          <div class="other-thumb-title">${v.title}</div>
          <div class="other-thumb-meta">${v.category} · ${v.year}</div>
          <div class="other-thumb-tools">${toolIcons}</div>
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
      const v = videos[idx];
      if (v.type === 'image') {
        openImageModal(v.src || v.thumb, v.title, v.description);
      } else {
        openVideoModal(v);
      }
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

const TOOL_DISPLAY_NAMES = {
  Houdini: 'Houdini',
  Maya: 'Maya',
  Nuke: 'Nuke X',
  Higgs: 'Higgsfield',
  Ae: 'After Effects',
  Pr: 'Premiere Pro',
  FC: 'Final Cut Pro',
  Ps: 'Photoshop',
  Ai: 'Illustrator',
  Figma: 'Figma',
};

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
  if (video.type === 'image') {
    playWrap.innerHTML = '<div class="play-circle" style="font-size:18px;color:rgba(255,255,255,0.95);">&#128065;</div>';
  } else {
    playWrap.innerHTML = '<div class="play-circle"><div class="play-tri"></div></div>';
  }

  card.append(img, grad, bottom, playWrap);
  if (video.type === 'image') {
    card.addEventListener('click', () => openImageModal(video.src || video.thumb, video.title, video.description));
  } else {
    card.addEventListener('click', () => openVideoModal(video));
  }
  return card;
}

function createToolsCard() {
  const card = document.createElement('div');
  card.className = 'bcard bcard-tools';

  const label = document.createElement('span');
  label.className = 'tools-label';
  label.textContent = 'Tools';

  const desc = document.createElement('span');
  desc.className = 'tools-desc';
  desc.textContent = 'Click an icon to see all works made with that tool';

  const logos = document.createElement('div');
  logos.className = 'tools-logos';
  ALL_LOGOS.forEach(name => {
    const img = document.createElement('img');
    img.src = `Logo/${name}.png`;
    img.alt = name;
    img.title = name;
    img.loading = 'lazy';
    img.dataset.tool = name;
    img.addEventListener('click', e => {
      e.stopPropagation();
      enterFilterMode(name);
    });
    logos.appendChild(img);
  });

  card.append(label, desc, logos);
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
        <div>
          <div class="contact-row-label">LinkedIn</div>
          <a class="contact-row-val" href="https://www.linkedin.com/in/jaemin-ryu/" target="_blank" rel="noopener">linkedin.com/in/jaemin-ryu</a>
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

  card.addEventListener('click', () => openImageModal(
    'UiUx/ui001.png',
    'UI/UX Design',
    'Collaborated with a programmer to develop a game, where I was responsible for the UI/UX design and overall art direction. This image is a design plan created during the current development planning phase of the project.'
  ));
  return card;
}

function createOtherCard() {
  const otherCount = videos.filter((v, i) => !BENTO_VIDEOS.includes(i) && v.type !== 'image').length;
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

/* ── SELF-HOSTED VIDEO CARD ── */
function createSelfVideoCard() {
  const card = document.createElement('div');
  card.className = 'bcard bcard-selfvideo';

  const video = document.createElement('video');
  video.className = 'selfvideo-video';
  video.src = 'Video/DNAF2026_v2.mp4';
  video.autoplay = true;
  video.muted = true;
  video.loop = true;
  video.playsInline = true;

  const grad = document.createElement('div');
  grad.className = 'vcard-grad selfvideo-overlay';

  const bottom = document.createElement('div');
  bottom.className = 'vcard-bottom selfvideo-info';

  const titleEl = document.createElement('div');
  titleEl.className = 'vcard-title';
  titleEl.textContent = '운룡도 [Unryongdo]';

  const metaEl = document.createElement('div');
  metaEl.className = 'vcard-meta';
  metaEl.textContent = 'AI + VFX(Compositing) ART WORK';

  const toolsEl = document.createElement('div');
  toolsEl.className = 'vcard-tools';
  ['Nuke', 'Higgs', 'FC'].forEach(t => {
    const tImg = document.createElement('img');
    tImg.src = `Logo/${t.trim()}.png`;
    tImg.alt = TOOL_DISPLAY_NAMES[t] || t;
    tImg.loading = 'lazy';
    toolsEl.appendChild(tImg);
  });

  bottom.append(titleEl, metaEl, toolsEl);

  const fsBtn = document.createElement('button');
  fsBtn.className = 'selfvideo-fs-btn';
  fsBtn.setAttribute('aria-label', 'View fullscreen');
  fsBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M8 3H5a2 2 0 0 0-2 2v3"/>
    <path d="M21 8V5a2 2 0 0 0-2-2h-3"/>
    <path d="M3 16v3a2 2 0 0 0 2 2h3"/>
    <path d="M16 21h3a2 2 0 0 0 2-2v-3"/>
  </svg>`;
  fsBtn.addEventListener('click', e => {
    e.stopPropagation();
    const el = video;
    if (el.requestFullscreen) el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
  });

  card.append(video, grad, bottom, fsBtn);
  return card;
}

/* ── PROMO OVERLAY (NEW badge + workflow breakdown CTA) ── */
function createPromoOverlay() {
  const wrap = document.createElement('div');
  wrap.className = 'promo-overlay';
  wrap.innerHTML = `
    <span class="promo-badge">NEW</span>
    <div class="promo-bubble">
      <span>Check out the Video Workflow Breakdown here &rarr;</span>
      <a class="promo-click-btn" href="https://www.youtube.com/watch?v=oWY_7OpGzA4" target="_blank" rel="noopener">CLICK ME</a>
    </div>
  `;
  return wrap;
}

/* ── SHORTCUT SIDEBAR (AI / VFX / Design category filters) ── */
function createShortcutColumn() {
  const wrap = document.createElement('div');
  wrap.className = 'shortcut-col';
  wrap.innerHTML = `
    <span class="shortcut-label">Shortcut</span>
    <button class="shortcut-btn shortcut-ai" type="button">AI</button>
    <button class="shortcut-btn shortcut-vfx" type="button">VFX</button>
    <button class="shortcut-btn shortcut-design" type="button">Design</button>
  `;
  wrap.querySelector('.shortcut-ai').addEventListener('click', () => enterFilterMode('AI'));
  wrap.querySelector('.shortcut-vfx').addEventListener('click', () => enterFilterMode('VFX'));
  wrap.querySelector('.shortcut-design').addEventListener('click', () => enterFilterMode('Design'));
  return wrap;
}

function createHeroRow() {
  const row = document.createElement('div');
  row.className = 'hero-row';

  const selfCard = createSelfVideoCard();
  selfCard.appendChild(createPromoOverlay());

  row.append(selfCard, createShortcutColumn());
  return row;
}

/* ── BENTO GRID ── */
// Row 1: [Spaceship (span 2)] [Tools      ] [Mare Infinitum]
// Row 2: [Miserable          ] [Jaemin Ryu (span 2)] [Ice Age   ]
// Row 3: [Resume ] [Thanos  ] [Contact    ] [Other     ]
// Row 4: [UIUX (span 2)     ] [About (span 2)        ]
const BENTO_VIDEOS = [0, 12, 6, 4, 5]; // Spaceship, Mare Infinitum, Miserable, Ice Age, Thanos

function buildBento() {
  const bento = document.getElementById('bento');

  // Hero row (self-video + shortcut sidebar) sits above the bento grid, outside it
  bento.parentNode.insertBefore(createHeroRow(), bento);

  let vi = 0;
  const cells = [
    'video-featured', 'tools',   'video',
    'video',          'name',    'video',
    'resume',         'video',   'contact', 'other',
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

/* ── FILTER MODE ── */
let filterActive = false;

const CATEGORY_FILTERS = {
  AI: {
    label: 'AI',
    icons: ['Higgs'],
    predicate: v => v.tools && v.tools.includes('Higgs'),
  },
  VFX: {
    label: 'VFX',
    icons: ['Houdini', 'Maya', 'Nuke'],
    predicate: v => v.tools && v.tools.some(t => ['Houdini', 'Maya', 'Nuke'].includes(t)),
  },
  Design: {
    label: 'Design',
    icons: ['Ps', 'Ai', 'Figma'],
    predicate: v => !(v.tools && v.tools.some(t => ['Higgs', 'Houdini', 'Maya', 'Nuke'].includes(t))),
  },
};

function enterFilterMode(toolName) {
  if (filterActive) return;
  filterActive = true;

  const bento = document.getElementById('bento');
  const cards = [...bento.children];
  const totalDelay = (cards.length - 1) * 35 + 400;

  cards.forEach((card, i) => {
    card.style.setProperty('--stagger', `${i * 35}ms`);
    card.classList.add('card-exit');
  });

  setTimeout(() => {
    bento.style.display = 'none';
    showFilteredView(toolName);
  }, totalDelay);
}

function showFilteredView(filterKey) {
  const category = CATEGORY_FILTERS[filterKey];
  const matching = category
    ? videos.filter(category.predicate)
    : videos.filter(v => v.tools && v.tools.includes(filterKey));
  const filteredView = document.getElementById('filteredView');

  // Header
  const header = document.createElement('div');
  header.className = 'filtered-header';

  const backBtn = document.createElement('button');
  backBtn.className = 'filter-back-btn';
  backBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> Back`;
  backBtn.addEventListener('click', exitFilterMode);

  const toolInfo = document.createElement('div');
  toolInfo.className = 'filtered-tool-info';

  (category ? category.icons : [filterKey]).forEach(name => {
    const toolImg = document.createElement('img');
    toolImg.src = `Logo/${name}.png`;
    toolImg.alt = name;
    toolInfo.appendChild(toolImg);
  });

  const toolText = document.createElement('span');
  toolText.textContent = category ? category.label : (TOOL_DISPLAY_NAMES[filterKey] || filterKey);
  toolInfo.appendChild(toolText);

  const toolCount = document.createElement('span');
  toolCount.className = 'filtered-tool-count';
  toolCount.textContent = `${matching.length} work${matching.length !== 1 ? 's' : ''}`;
  toolInfo.appendChild(toolCount);

  header.append(backBtn, toolInfo);

  // Grid
  const grid = document.createElement('div');
  grid.className = 'filtered-grid';

  if (matching.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'filtered-empty';
    empty.textContent = 'Projects using this tool are actively in progress and will be showcased here soon.';
    grid.appendChild(empty);
  } else {
    matching.forEach((video, i) => {
      const card = createVideoCard(video, false);
      card.classList.add('filtered-grid-card');
      card.style.setProperty('--stagger', `${i * 60}ms`);
      grid.appendChild(card);
    });
  }

  filteredView.replaceChildren(header, grid);
  filteredView.classList.add('is-active');
}

function exitFilterMode() {
  const filteredView = document.getElementById('filteredView');
  const bento = document.getElementById('bento');
  const cards = [...bento.children];

  filteredView.classList.remove('is-active');

  // Prepare cards for enter animation before showing bento
  cards.forEach((card, i) => {
    card.classList.remove('card-exit');
    card.style.setProperty('--stagger', `${i * 35}ms`);
    card.classList.add('card-enter');
  });

  bento.style.display = '';

  const totalDelay = (cards.length - 1) * 35 + 500;
  setTimeout(() => {
    cards.forEach(card => {
      card.classList.remove('card-enter');
      card.style.removeProperty('--stagger');
    });
    filterActive = false;
  }, totalDelay);
}
