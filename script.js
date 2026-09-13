/* Configuration rapide : modifiez ici les compétences et projets affichés. */
const skills = [
  ['HTML', 92], ['CSS', 90], ['JavaScript', 84], ['Python', 72], ['C#', 68],
  ['Git / GitHub', 85], ['Linux', 73], ['Cybersécurité', 70], ['UI/UX', 82], ['Marketing digital', 75]
];
const projects = [
  { title: 'Portfolio personnel', type: 'WEB DESIGN / 01', desc: 'Une présence en ligne immersive pour présenter un univers, un savoir-faire et des réalisations.', tags: ['HTML', 'CSS', 'JS'], gradient: 'radial-gradient(circle at 75% 20%,#7d67d7 0,transparent 28%),linear-gradient(135deg,#202855,#111426)' },
  { title: 'Projet web', type: 'PLATEFORME / 02', desc: 'Une interface web responsive qui rend un service clair, rapide et agréable à utiliser.', tags: ['UI/UX', 'Frontend'], gradient: 'radial-gradient(circle at 20% 20%,#229b9c 0,transparent 27%),linear-gradient(145deg,#11383f,#101827)' },
  { title: 'Projet cybersécurité', type: 'SÉCURITÉ / 03', desc: 'Un concept de tableau de bord pour visualiser les indicateurs de sécurité essentiels.', tags: ['Linux', 'Python'], gradient: 'radial-gradient(circle at 70% 20%,#d37a6c 0,transparent 22%),linear-gradient(145deg,#472532,#171424)' },
  { title: 'Projet application', type: 'APPLICATION / 04', desc: 'Un concept d’application utile, imaginé avec une navigation simple et une identité forte.', tags: ['UI/UX', 'JavaScript'], gradient: 'radial-gradient(circle at 18% 20%,#628ddc 0,transparent 25%),linear-gradient(145deg,#1d315d,#151824)' },
  { title: 'Projet marketing digital', type: 'CRÉATIVITÉ / 05', desc: 'Une campagne digitale pensée pour engager une communauté et donner de l’élan à une marque.', tags: ['Stratégie', 'Création'], gradient: 'radial-gradient(circle at 25% 15%,#d5a350 0,transparent 25%),linear-gradient(145deg,#49361b,#1c1724)' }
];
const skillGrid = document.querySelector('#skillGrid');
const projectGrid = document.querySelector('#projectGrid');

skillGrid.innerHTML = skills.map(([name, level]) => `<article class="skill-card reveal"><div class="skill-top"><h3>${name}</h3><span>${level}%</span></div><div class="skill-bar"><i data-level="${level}"></i></div></article>`).join('');
projectGrid.innerHTML = projects.map((project, index) => `<article class="project-card reveal" style="--card-gradient:${project.gradient}"><span class="project-number">0${index + 1}</span><div class="project-type">${project.type}</div><h3>${project.title}</h3><p>${project.desc}</p><div class="project-bottom"><div class="tags">${project.tags.map(tag => `<span>${tag}</span>`).join('')}</div><div class="project-actions"><a href="#contact">Voir le projet ↗</a><a href="#" aria-label="GitHub du projet — à configurer">GitHub</a></div></div></article>`).join('');

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); entry.target.querySelectorAll?.('.skill-bar i').forEach(bar => { bar.style.width = `${bar.dataset.level}%`; }); entry.target.querySelectorAll?.('[data-count]').forEach(counter => { const value = Number(counter.dataset.count); if (reducedMotion) { counter.textContent = value; return; } const start = performance.now(); const animate = now => { const current = Math.min(value, Math.round((now - start) / 900 * value)); counter.textContent = current; if (current < value) requestAnimationFrame(animate); }; requestAnimationFrame(animate); }); observer.unobserve(entry.target); } }), { threshold: .12 });
document.querySelectorAll('.reveal, #skillGrid').forEach(element => observer.observe(element));

document.querySelector('#year').textContent = new Date().getFullYear();
const statuses = ['imagining', 'designing', 'building', 'creating']; let statusIndex = 0;
if (!reducedMotion) setInterval(() => { const target = document.querySelector('#typing'); target.style.opacity = 0; setTimeout(() => { statusIndex = (statusIndex + 1) % statuses.length; target.textContent = statuses[statusIndex]; target.style.opacity = 1; }, 180); }, 2100);

document.querySelector('.menu-toggle').addEventListener('click', event => { const nav = document.querySelector('nav'); nav.classList.toggle('open'); event.currentTarget.setAttribute('aria-expanded', nav.classList.contains('open')); });
document.querySelectorAll('nav a').forEach(link => link.addEventListener('click', () => document.querySelector('nav').classList.remove('open')));
document.querySelector('#contactForm').addEventListener('submit', event => { event.preventDefault(); document.querySelector('.form-status').textContent = 'Message prêt — configurez votre service d’envoi ou adresse email dans script.js.'; event.currentTarget.reset(); });
if (!reducedMotion && window.matchMedia('(pointer:fine)').matches) document.addEventListener('pointermove', event => { document.querySelector('.cursor-glow').style.transform = `translate(${event.clientX - 256}px, ${event.clientY - 256}px)`; });
