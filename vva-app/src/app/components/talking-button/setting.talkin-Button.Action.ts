import { mic_input } from "./settings.talking-Button.micInput";

import { TalkingButtonState } from "./talking-button.interfaces";

export function Talking(state: TalkingButtonState): void {
    const talkingButton = document.querySelector(".talking_button");
    const character_head_el = document.getElementById("rotating");
    const min_rotate = -40
    const max_rotate = -min_rotate

    const huidige_rotatie_css = "--huidige-rotatie"

    character_head_el?.style.setProperty("--min-rotate-deg", `${min_rotate}deg`);
    character_head_el?.style.setProperty("--max-rotate-deg", `${max_rotate}deg`);
    character_head_el?.style.setProperty("--transition_style", `ease-in-out`);

    talkingButton?.classList.toggle("listening");

    console.log(state.isTalking);
    if (state.isTalking && character_head_el) {
        mic_input(character_head_el, huidige_rotatie_css, state);
    }

    character_head_el?.style.setProperty(huidige_rotatie_css, `0deg`);
}