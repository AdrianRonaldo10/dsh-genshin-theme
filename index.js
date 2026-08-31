import { readFileSync } from 'node:fs';

const bootCssUrl = new URL('./boot.css', import.meta.url);
// Intentionally empty: an !important body background here would hide the
// wallpaper backdrop that the client plugin applies later.
const FALLBACK_BOOT_CSS = ``;

function readBootCss() {
  try {
    return readFileSync(bootCssUrl, 'utf8');
  } catch (_) {
    // boot.css is optional; the full boot skin is bundled when available.
    return FALLBACK_BOOT_CSS;
  }
}

export const inject = ['webServer'];

export function apply(ctx) {
  ctx.effect(() => ctx.webServer.tapIndex((html) => {
    if (html.includes('data-genshin-boot')) return html;
    return html.replace('</head>', `<style data-genshin-boot>${readBootCss()}</style></head>`);
  }), 'genshin-theme: pre-plugin boot skin');
}
