import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import svgr from "vite-plugin-svgr";

const htmlEntry = "briefing.html";
const landingEntry = "landing.html";

// GitHub Pages serves the site root from index.html, so publish the landing page under that name.
// Runs post so Vite's HTML plugin has already added landing.html to the bundle.
function emitLandingAsIndex(): Plugin {
  return {
    name: "emit-landing-as-index",
    apply: "build",
    enforce: "post",
    generateBundle: {
      order: "post",
      handler(_options, bundle) {
        const landing = bundle[landingEntry];
        if (landing?.type !== "asset") {
          this.error(`Expected ${landingEntry} in the bundle to emit index.html`);
        }
        this.emitFile({ type: "asset", fileName: "index.html", source: landing.source });
      },
    },
  };
}

// actions/configure-pages exposes the project-site prefix (for example "/chiefos").
const pagesBase = process.env.PAGES_BASE?.trim();

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: pagesBase ? `${pagesBase.replace(/\/+$/, "")}/` : "/",
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
    svgr(),
    ...(mode === "singlefile" ? [viteSingleFile()] : [emitLandingAsIndex()]),
  ],
  build: {
    rollupOptions: {
      input: mode === "singlefile" ? htmlEntry : [htmlEntry, landingEntry],
    },
  },
}));
