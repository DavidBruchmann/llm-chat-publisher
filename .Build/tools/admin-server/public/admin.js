console.log('[Admin] UI loaded');

async function loadSettings() {
  const res = await fetch('/api/settings');
  if (!res.ok) {
    throw new Error('Failed to load settings');
  }
  return res.json();
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

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const settings = await loadSettings();
    console.log('[Admin] Loaded settings:', settings);

    // Map settings → form fields
    const form = document.getElementById('theme-form');

    if (form) {
      form.primaryColor.value =
        settings.colors?.light?.primary ?? '#2563eb';

      form.fontFamily.value =
        settings.typography?.fontFamily ?? 'system-ui';

      form.kofiUser.value =
        settings.kofi?.username ?? '';
    }
  } catch (err) {
    console.error(err);
    alert('Failed to load settings file');
  }
});


/*console.log('[Admin] UI loaded');

document.addEventListener('DOMContentLoaded', () => {
  const themeBtn = document.getElementById('open-theme');

  themeBtn?.addEventListener('click', () => {
    alert('Theme settings UI will be implemented next.');
  });
});
*/
