import type { Controller } from "./controller";

const modules = new Map<string, string>();

function prepare() {
  const islands = document.querySelectorAll<HTMLScriptElement>(
    "script[data-controller-name]",
  );

  for (const island of islands) {
    const controllerName = island.dataset.controllerName;

    if (!controllerName) {
      console.error("`data-controller-name` is required", island);
      continue;
    }

    if (island.src) {
      modules.set(controllerName, island.src);
    } else {
      if (!island.textContent) {
        console.error("island has no content", island);
        continue;
      }

      const blob = new Blob([island.textContent], { type: "text/javascript" });

      const url = URL.createObjectURL(blob);

      modules.set(controllerName, url);
    }
  }

  // @ts-ignore
  window.modules = modules;
}

async function initIslands() {
  const islands = document.querySelectorAll<HTMLElement>("[data-controller]");

  for (const island of islands) {
    const controllerName = island.dataset.controller;

    if (!controllerName) {
      console.error("`data-controller` is required", island);
      continue;
    }

    if (!modules.has(controllerName)) {
      console.error("controller not found", controllerName);
      continue;
    }

    const src = modules.get(controllerName);

    if (!src) {
      console.error("controller not found", controllerName);
      continue;
    }

    const code = await import(src).then(
      (mod) => mod.default as typeof Controller,
    );

    // eslint-disable-next-line no-new, new-cap
    new code(island);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  prepare();

  initIslands();
});
