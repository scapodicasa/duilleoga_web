/* ============================================================
   Navbar: scroll effect
   ============================================================ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ============================================================
   Hamburger menu
   ============================================================ */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close on any nav link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

/* ============================================================
   Scroll-reveal via IntersectionObserver
   ============================================================ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ============================================================
   Dynamic copyright year
   ============================================================ */
const yearEl = document.getElementById('copyright-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ============================================================
   Member bio modal
   ============================================================ */
const memberData = {
  cheip: {
    name: 'Simone Capodicasa',
    instrument: '— Uilleann Pipes e Flauti —',
    photo: 'images/cheip_sq.jpg',
    bio: 'Flautista sin dalla giovane età, approfondisce le tecniche di flauto irlandese e uilleann pipes studiando con alcuni tra i più riconosciuti artisti a livello mondiale. Nel 2018 fonda il trio trad Duilleoga e nel 2023 la band The Cracking Reeds. Dal 2024 fa parte della formazione stabile della band neo-trad Bards From Yesterday. Occasionalmente collabora con formazioni di musica pop e moderna suonando nel 2022 con il Sunshine Gospel Choir.'
  },
  bea: {
    name: 'Beatrice Tola',
    instrument: '— Violino —',
    photo: 'images/bea_sq.jpg',
    bio: 'Violinista classe 1999, si forma inizialmente nello studio del pianoforte e del violino classico, per poi avvicinarsi alla musica tradizionale irlandese nel 2023 grazie all\'incontro con Tóla Custy, fiddler di fama internazionale. Approfondisce il repertorio irlandese frequentando session e perfezionando la tecnica con artisti affermati ed emergenti del panorama trad contemporaneo.'
  },
  saimon: {
    name: 'Simone Dani',
    instrument: '— Chitarra —',
    photo: 'images/saimon_sq.jpg',
    bio: 'Formato come chitarrista fingerstyle e jazz, ha pubblicato come solista due album e tre singoli. Dopo concerti in Italia e Svizzera, si avvicina alla musica irlandese partecipando alle storiche session torinesi. Perfeziona la tecnica di accompagnamento irlandese in accordatura aperta, fonda nel 2018 il trio trad Duilleoga e nel 2023 la formazione The Cracking Reeds, esibendosi in festival e rassegne in Italia e all\'estero.'
  }
};

const modal = document.getElementById('bio-modal');

if (modal) {
  const modalClose      = document.getElementById('bio-modal-close');
  const modalPhoto      = document.getElementById('modal-photo');
  const modalName       = document.getElementById('modal-name');
  const modalInstrument = document.getElementById('modal-instrument');
  const modalBio        = document.getElementById('modal-bio');
  const backdrop        = modal.querySelector('.bio-modal-backdrop');

  function openModal(key) {
    const data = memberData[key];
    if (!data) return;
    modalPhoto.src        = data.photo;
    modalPhoto.alt        = data.name;
    modalName.textContent = data.name;
    modalInstrument.textContent = data.instrument;
    modalBio.textContent  = data.bio;
    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    modalClose.focus();
  }

  function closeModal() {
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.member-card[data-member]').forEach(card => {
    card.addEventListener('click', () => openModal(card.dataset.member));
  });

  modalClose.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.hasAttribute('hidden')) closeModal();
  });
}
