import {    characterSettings, backgroundSettings, talkingSettings } from "./index.js";

export function groupAllSettings(){
    characterSettings();
    backgroundSettings();
    talkingSettings();
}