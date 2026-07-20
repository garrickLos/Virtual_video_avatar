import {settings} from "./edit_settings.js";

import { Talking, initCharacterPicture, initCharacterScale } from "./characterEdit.js";
import { initGreenscreenColor } from './greenscreenColor.js';
import { initSpeechSettings } from "./speech_settings.js";

import { groupAllSettings } from "./grouped_settings/index.js";

groupAllSettings();

const button_el = document.getElementById("spinButton");

const state = { isTalking: false };

export function Start() {
    state.isTalking = !state.isTalking;
    console.log(state.isTalking ? "Talking" : "Shutting up!");

    Talking(state);
}

button_el.addEventListener("click", Start);

document.addEventListener('DOMContentLoaded', async () => {
    await settings.init();

    initCharacterScale();
    initCharacterPicture();
    
    initGreenscreenColor();
    initSpeechSettings();
});