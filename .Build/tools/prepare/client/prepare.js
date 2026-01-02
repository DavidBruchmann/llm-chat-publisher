async function loadSettings() {
  const res = await fetch('/api/settings');
  if (!res.ok) {
    throw new Error('Failed to load settings');
  }
  return res.json();
}

function applySettings(settings) {
  const form = document.getElementById('theme-form');
  if (!form) return;

  form.primaryColor.value =
    settings.primaryColor ?? '#2563eb';

  form.fontFamily.value =
    settings.fontFamily ?? 'system-ui';

  form.kofiUser.value =
    settings.kofiUser ?? '';
}

async function init() {
  try {
    const settings = await loadSettings();
    console.log('[Admin] Loaded settings:', settings);
    applySettings(settings);
  } catch (err) {
    console.error(err);
    alert('Failed to load settings file');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

const views = {
  dashboard: document.getElementById('view-dashboard'),
  theme: document.getElementById('view-theme')
};

function show(view) {
  Object.values(views).forEach(v => v.classList.remove('active'));
  views[view].classList.add('active');
}

document.getElementById('open-theme')?.addEventListener('click', () => {
  show('theme');
});

document.getElementById('back')?.addEventListener('click', () => {
  show('dashboard');
});

document.getElementById('theme-form')?.addEventListener('submit', e => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(e.target));
  console.log('[Admin] Theme form data:', data);

  alert('Saved for preview (no file written yet)');
});

/*console.log('[Admin] UI loaded');

document.addEventListener('DOMContentLoaded', () => {
  const themeBtn = document.getElementById('open-theme');

  themeBtn?.addEventListener('click', () => {
    alert('Theme settings UI will be implemented next.');
  });
});
*/
