// Unified Jiu-Jitsu — site scripts (no dependencies)

(() => {
  // Mobile navigation
  const toggle = document.querySelector('.nav-toggle');
  const links = document.getElementById('nav-links');

  const setNav = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    links.classList.toggle('open', open);
    document.body.classList.toggle('nav-open', open);
  };

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      setNav(toggle.getAttribute('aria-expanded') !== 'true');
    });
    links.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setNav(false)));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setNav(false); });
    window.matchMedia('(min-width: 901px)').addEventListener('change', (e) => { if (e.matches) setNav(false); });
  }

  // Footer year
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

  // Schedule: highlight today
  const dayKeys = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const today = dayKeys[new Date().getDay()];
  document.querySelectorAll(`.day[data-day="${today}"]`).forEach((d) => d.classList.add('is-today'));

  // Schedule: filter by program
  const chips = document.querySelectorAll('.chip[data-filter]');
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const filter = chip.dataset.filter;
      chips.forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));

      document.querySelectorAll('.session').forEach((s) => {
        s.hidden = filter !== 'all' && s.dataset.program !== filter;
      });
      document.querySelectorAll('.day').forEach((d) => {
        d.classList.toggle('is-empty', !d.querySelector('.session:not([hidden])'));
      });
    });
  });

  // Contact form: preselect program from ?program=fundamentals
  const select = document.getElementById('program');
  const wanted = new URLSearchParams(location.search).get('program');
  if (select && wanted && select.querySelector(`option[value="${CSS.escape(wanted)}"]`)) {
    select.value = wanted;
  }
})();
