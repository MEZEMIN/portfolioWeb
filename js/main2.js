const TOOL_NAMES = {
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

const TOOL_ORDER = Object.keys(TOOL_NAMES);

const projects = [
  {
    slug: 'spaceship-explosion',
    thumb: 'Thumnail/001.png',
    title: 'Spaceship Explosion',
    category: 'Houdini FX Work',
    year: '2025',
    group: 'vfx',
    type: 'youtube',
    id: 'Y19dV0GHpso',
    tools: ['Houdini', 'Nuke', 'FC'],
    description: "Created Pyro, RBD destruction, and POP particle simulations in Houdini. Lighting was completed in Karma and the final shot was composited in Nuke X.",
  },
  {
    slug: 'ice-age',
    thumb: 'Thumnail/005.png',
    title: 'Ice Age',
    category: 'Houdini FX Work',
    year: '2025',
    group: 'vfx',
    type: 'youtube',
    id: 'xcVSfdI7GzU',
    tools: ['Houdini'],
    description: 'Designed, modeled, and simulated the energy shield featured in the short film Ice Age (2025).',
  },
  {
    slug: 'thanos-disintegration',
    thumb: 'Thumnail/006.png',
    title: 'Thanos Disintegration Effect',
    category: 'Houdini FX Work',
    year: '2025',
    group: 'vfx',
    type: 'youtube',
    id: 'NaMJYXNi6JI',
    tools: ['Houdini', 'Nuke', 'FC'],
    description: 'Built the character disintegration with Houdini Pyro, Vellum, smoke, particles, and sparks, then composited the complete effect in Nuke X.',
  },
  {
    slug: 'unryongdo',
    thumb: 'Thumnail/013.png',
    title: 'Unryongdo',
    category: 'AI + VFX Artwork',
    year: '2026',
    group: 'vfx',
    type: 'self',
    src: 'Video/DNAF2026_v2.mp4',
    tools: ['Nuke', 'Higgs', 'FC'],
    description: 'An AI-driven moving image developed through a hybrid generation, compositing, and editorial workflow.',
  },
  {
    slug: 'domo-london-fog',
    thumb: 'Thumnail/002.png',
    title: 'DOMO London Fog Ads',
    category: 'AI Advertisement Video',
    year: '2026',
    group: 'ai',
    type: 'vimeo',
    id: '1166855560',
    aspect: 'portrait',
    tools: ['Higgs', 'FC'],
    description: "Planned and produced a short social advertisement for DOMO Tea's London Fog Earl Grey using an AI-led video workflow.",
  },
  {
    slug: 'miserable-zemistein',
    thumb: 'Thumnail/007.png',
    title: 'Miserable — Zemistein',
    category: 'AI Music Video',
    year: '2026',
    group: 'ai',
    type: 'youtube',
    id: 'lgILl71Ya2E',
    tools: ['Higgs', 'FC'],
    description: 'Created the fictional character Zemistein and produced a complete AI music video around the character.',
  },
  {
    slug: 'domo-vanilla-matcha',
    thumb: 'Thumnail/004.png',
    title: 'DOMO Vanilla Matcha Ads',
    category: 'AI Advertisement Video',
    year: '2026',
    group: 'ai',
    type: 'vimeo',
    id: '1166856113',
    tools: ['Higgs', 'FC'],
    description: "Planned and produced a short social advertisement for DOMO Tea's Vanilla Matcha using AI-generated imagery.",
  },
  {
    slug: 'domo-valentines',
    thumb: 'Thumnail/003.png',
    title: "DOMO Valentine's Day Ads",
    category: 'AI Advertisement Video',
    year: '2026',
    group: 'ai',
    type: 'vimeo',
    id: '1166855862',
    aspect: 'portrait',
    tools: ['Higgs', 'FC'],
    description: "Planned and produced a short social advertisement for DOMO Tea's Valentine's Day campaign using an AI-led production pipeline.",
  },
  {
    slug: 'mare-infinitum',
    thumb: 'Thumnail/012.png',
    title: 'Mare Infinitum',
    category: 'AI Artwork',
    year: '2026',
    group: 'ai',
    type: 'youtube',
    id: '1LM7vSTLtmY',
    tools: ['Higgs', 'FC'],
    description: 'An AI-driven art video produced with Higgsfield and edited in Final Cut Pro.',
  },
  {
    slug: 'campbell-river',
    thumb: 'Thumnail/008.png',
    title: 'Campbell River',
    category: 'A Film by Jaemin Ryu',
    year: '2024',
    group: 'other',
    type: 'youtube',
    id: '5PBApE-Evmc',
    tools: ['FC'],
    description: 'Planned, filmed, and edited by Jaemin Ryu.',
  },
  {
    slug: 'saturna-island',
    thumb: 'Thumnail/009.png',
    title: 'Saturna Island',
    category: 'A Film by Jaemin Ryu',
    year: '2024',
    group: 'other',
    type: 'youtube',
    id: 'r97RPVpzYbg',
    tools: ['FC'],
    description: 'Planned, filmed, and edited by Jaemin Ryu.',
  },
  {
    slug: 'east-point',
    thumb: 'Thumnail/010.png',
    title: 'East Point, Saturna Island',
    category: 'A Film by Jaemin Ryu',
    year: '2024',
    group: 'other',
    type: 'youtube',
    id: 'hWSxcE-dMsg',
    tools: ['FC'],
    description: 'Planned, filmed, and edited by Jaemin Ryu.',
  },
  {
    slug: 'saturna-island-2',
    thumb: 'Thumnail/011.png',
    title: 'Saturna Island 2',
    category: 'A Film by Jaemin Ryu',
    year: '2024',
    group: 'other',
    type: 'youtube',
    id: 'dpNSjN1MrBw',
    start: 2,
    tools: ['FC'],
    description: 'Planned, filmed, and edited by Jaemin Ryu.',
  },
  {
    slug: 'ui-ux-design',
    thumb: 'UiUx/ui001.png',
    title: 'UI/UX Design',
    category: 'Game UI/UX Design',
    year: '2025',
    group: 'other',
    type: 'image',
    src: 'UiUx/ui001.png',
    aspect: 'portrait',
    tools: ['Figma'],
    description: 'Game UI/UX design and art direction developed in collaboration with a programmer during the project planning phase.',
  },
];

const groups = [
  { key: 'vfx', label: 'vfx' },
  { key: 'ai', label: 'ai' },
  { key: 'other', label: 'other' },
];

const workIndex = document.getElementById('workIndex');
const toolFilters = document.getElementById('toolFilters');
const filterStatus = document.getElementById('filterStatus');
const projectModal = document.getElementById('projectModal');
const projectMedia = document.getElementById('projectMedia');
const modalKicker = document.getElementById('projectModalKicker');
const modalTitle = document.getElementById('projectModalTitle');
const modalDescription = document.getElementById('projectModalDescription');
const modalTools = document.getElementById('projectModalTools');
const contactModal = document.getElementById('contactModal');

let activeTool = null;

function belongsToGroup(project, group) {
  return Array.isArray(project.group)
    ? project.group.includes(group)
    : project.group === group;
}

function createCard(project, index) {
  const card = document.createElement('button');
  card.className = 'project-card';
  card.type = 'button';
  card.dataset.tools = project.tools.join(' ');
  card.dataset.project = project.slug;
  card.setAttribute('aria-label', `Open ${project.title}, ${project.year}`);

  if (project.aspect === 'portrait') card.classList.add('is-portrait');

  const image = document.createElement('img');
  image.src = project.thumb;
  image.alt = '';

  const setThumbnailRatio = () => {
    if (!image.naturalWidth || !image.naturalHeight) return;
    card.style.setProperty(
      '--thumbnail-ratio',
      `${image.naturalWidth} / ${image.naturalHeight}`,
    );
  };

  image.addEventListener('load', setThumbnailRatio, { once: true });
  if (image.complete) setThumbnailRatio();

  const number = document.createElement('span');
  number.className = 'card-index';
  number.textContent = String(index + 1).padStart(2, '0');

  const info = document.createElement('span');
  info.className = 'card-info';

  const title = document.createElement('strong');
  title.textContent = project.title;

  const year = document.createElement('span');
  year.textContent = project.year;

  info.append(title, year);
  card.append(image, number, info);
  card.addEventListener('click', () => openProject(project));
  return card;
}

function buildWorkIndex() {
  groups.forEach(group => {
    const section = document.createElement('section');
    section.className = 'work-section';
    section.dataset.group = group.key;
    section.setAttribute('aria-labelledby', `${group.key}-heading`);

    const heading = document.createElement('h2');
    heading.className = 'section-title';
    heading.id = `${group.key}-heading`;
    heading.textContent = group.label;

    const rail = document.createElement('div');
    rail.className = 'work-rail';

    const groupProjects = projects.filter(project => belongsToGroup(project, group.key));
    groupProjects.forEach((project, index) => rail.append(createCard(project, index)));

    const empty = document.createElement('p');
    empty.className = 'empty-message';
    empty.textContent = 'No projects in this section use the selected tool.';

    rail.append(empty);
    section.append(heading, rail);
    workIndex.append(section);
  });
}

function buildToolFilters() {
  TOOL_ORDER.forEach(tool => {
    const button = document.createElement('button');
    button.className = 'tool-button';
    button.type = 'button';
    button.dataset.tool = tool;
    button.title = `Filter by ${TOOL_NAMES[tool]}`;
    button.setAttribute('aria-label', `Filter projects by ${TOOL_NAMES[tool]}`);
    button.setAttribute('aria-pressed', 'false');

    const image = document.createElement('img');
    image.src = `Logo/${tool}.png`;
    image.alt = '';
    image.decoding = 'async';

    button.append(image);
    button.addEventListener('click', () => toggleFilter(tool));
    toolFilters.append(button);
  });
}

function toggleFilter(tool) {
  activeTool = activeTool === tool ? null : tool;

  document.querySelectorAll('.tool-button').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.tool === activeTool));
  });

  document.querySelectorAll('.work-section').forEach(section => {
    let visibleCount = 0;

    section.querySelectorAll('.project-card').forEach(card => {
      const visible = !activeTool || card.dataset.tools.split(' ').includes(activeTool);
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    section.classList.toggle('is-empty', visibleCount === 0);
  });

  filterStatus.textContent = activeTool
    ? `${TOOL_NAMES[activeTool]} — click again to clear`
    : '';
}

function createEmbed(project) {
  if (project.type === 'image') {
    const image = document.createElement('img');
    image.src = project.src;
    image.alt = project.title;
    return image;
  }

  if (project.type === 'self') {
    const video = document.createElement('video');
    video.src = project.src;
    video.controls = true;
    video.autoplay = true;
    video.playsInline = true;
    return video;
  }

  const iframe = document.createElement('iframe');
  const params = new URLSearchParams();
  params.set('autoplay', '1');

  if (project.type === 'youtube') {
    params.set('rel', '0');
    if (project.start) params.set('start', String(project.start));
    iframe.src = `https://www.youtube.com/embed/${project.id}?${params.toString()}`;
  } else {
    params.set('title', '0');
    params.set('byline', '0');
    params.set('portrait', '0');
    iframe.src = `https://player.vimeo.com/video/${project.id}?${params.toString()}`;
  }

  iframe.title = project.title;
  iframe.allow = 'autoplay; fullscreen; picture-in-picture; encrypted-media';
  iframe.referrerPolicy = 'strict-origin-when-cross-origin';
  iframe.allowFullscreen = true;
  return iframe;
}

function openProject(project) {
  projectMedia.replaceChildren(createEmbed(project));
  projectMedia.classList.toggle('is-portrait', project.aspect === 'portrait');
  modalKicker.textContent = `${project.category.toUpperCase()} · ${project.year}`;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalTools.replaceChildren();

  project.tools.forEach(tool => {
    const button = document.createElement('button');
    button.className = 'modal-tool-button';
    button.type = 'button';

    const image = document.createElement('img');
    image.src = `Logo/${tool}.png`;
    image.alt = '';

    const label = document.createElement('span');
    label.textContent = TOOL_NAMES[tool];

    button.append(image, label);
    button.addEventListener('click', () => {
      projectModal.close();
      toggleFilter(tool);
    });
    modalTools.append(button);
  });

  projectModal.showModal();
}

function closeProject() {
  projectModal.close();
}

function closeOnBackdrop(event) {
  if (event.target === event.currentTarget) event.currentTarget.close();
}

document.getElementById('projectModalClose').addEventListener('click', closeProject);
projectModal.addEventListener('click', closeOnBackdrop);
projectModal.addEventListener('close', () => {
  projectMedia.replaceChildren();
  projectMedia.classList.remove('is-portrait');
});

document.getElementById('contactButton').addEventListener('click', () => contactModal.showModal());
document.getElementById('contactModalClose').addEventListener('click', () => contactModal.close());
contactModal.addEventListener('click', closeOnBackdrop);

buildToolFilters();
buildWorkIndex();
