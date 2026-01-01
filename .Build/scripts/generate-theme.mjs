import fs from 'fs';
import path from 'path';

const settings = JSON.parse(
  fs.readFileSync('.Build/config/custom-settings.json', 'utf8')
);

const scss = `
/* AUTO-GENERATED – DO NOT EDIT */

:root {
  --theme-link-color: ${settings.colors.light.link};
  --theme-link-active-color: ${settings.colors.light.active};
  --ifm-font-family-base: ${settings.fonts.base};
  --ifm-font-family-monospace: ${settings.fonts.monospace};
}

html[data-theme='dark'] {
  --theme-link-color: ${settings.colors.dark.link};
  --theme-link-active-color: ${settings.colors.dark.active};
}

:root {
  --ifm-link-color: var(--theme-link-color);
  --ifm-menu-color-active: var(--theme-link-active-color);
  --ifm-navbar-link-active-color: var(--theme-link-active-color);
}
`;

fs.writeFileSync('src/scss/custom_variables.scss', scss);
console.log('Theme variables generated.');
