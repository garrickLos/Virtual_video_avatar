import {settings} from "./edit_settings.js";

import { Talking, initCharacterPicture, initCharacterScale } from "./characterEdit.js";
import { initGreenscreenColor } from './greenscreenColor.js';
import { initSpeechSettings } from "./speech_settings.js";

import { groupAllSettings } from "./grouped_settings/index.js";

const button_el = document.getElementById("spinButton");

const state = { isTalking: false };

export function Start() {
    state.isTalking = !state.isTalking;
    console.log(state.isTalking ? "Talking" : "Shutting up!");

    Talking(state);
}

button_el?.addEventListener("click", Start);

document.addEventListener('DOMContentLoaded', async () => {
    await settings.init();

  if (document.getElementById("settings")) {
    groupAllSettings();
  }

    initCharacterScale();
    initCharacterPicture();
    
    initGreenscreenColor();
    initSpeechSettings();
});

function createBrowserWindow(page, key) {
  window.api.createWindow(page, key);
}

const button = document.getElementById("new_settingsWindow");
const faqButton = document.getElementById("new_FAQWindow");

button?.addEventListener("click", (event) => {
  event.preventDefault();
  createBrowserWindow("./window.settings.html", "settings");
});

faqButton?.addEventListener("click", (event) => {
  event.preventDefault();
  createBrowserWindow("./window.faq.html", "faq");
});
