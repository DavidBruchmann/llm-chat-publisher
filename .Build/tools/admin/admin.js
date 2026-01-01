const loadForm = document.getElementById('loadForm');
const settingsForm = document.getElementById('settingsForm');
const fileInput = document.getElementById('settingsFile');

loadForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const file = fileInput.files[0];
  if (!file) return;

  const data = JSON.parse(await file.text());
  populateForm(data);
});

settingsForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = collectForm();
  downloadJSON(data);
});

function populateForm(cfg) {
  settingsForm.light_link.value = cfg.colors.light.link;
  settingsForm.light_active.value = cfg.colors.light.active;
  settingsForm.light_bg.value = cfg.colors.light.background;

  settingsForm.dark_link.value = cfg.colors.dark.link;
  settingsForm.dark_active.value = cfg.colors.dark.active;
  settingsForm.dark_bg.value = cfg.colors.dark.background;

  settingsForm.font_base.value = cfg.fonts.base;
  settingsForm.font_mono.value = cfg.fonts.monospace;

  settingsForm.kofi.value = cfg.branding.kofiName;
  settingsForm.logo.value = cfg.branding.logoFile;
}

function collectForm() {
  return {
    colors: {
      light: {
        link: settingsForm.light_link.value,
        active: settingsForm.light_active.value,
        background: settingsForm.light_bg.value
      },
      dark: {
        link: settingsForm.dark_link.value,
        active: settingsForm.dark_active.value,
        background: settingsForm.dark_bg.value
      }
    },
    fonts: {
      base: settingsForm.font_base.value,
      monospace: settingsForm.font_mono.value
    },
    branding: {
      kofiName: settingsForm.kofi.value,
      logoFile: settingsForm.logo.value
    }
  };
}

function downloadJSON(data) {
  const blob = new Blob(
    [JSON.stringify(data, null, 2)],
    { type: 'application/json' }
  );
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'custom-settings.json';
  a.click();
}
