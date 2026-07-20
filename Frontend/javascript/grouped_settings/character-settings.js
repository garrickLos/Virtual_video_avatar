import { createEl, createSettingsGroup, label_component } from "../components/index.js";

export function setCharacterSettings() {

    const scale_container = label_component("scale_container", "input-container",
        [
            {
                label: {
                    for: "character-scale-input",
                    text: "Input scale of the character"
                },
                input: {
                    type: "number",
                    id: "character-scale-input",
                    className: "scale-input",
                    min: 0,
                    max: 2.00,
                    step: 0.1,
                    value: 1
                }
            }
        ]
    );

    const pictures_container = label_component("pictures_container", "input-container",
        [
            {
                label: {
                    for: "head-picture-input",
                    text: "Head picture path"
                },
                input: {
                    type: "text",
                    id: "head-picture-input",
                    className: "text-input picture-input",
                    placeholder: "past path to file (example: C:/images/green.png)"
                }
            },
            {
                label: {
                    for: "body-picture-input",
                    text: "Body picture path"
                },
                input: {
                    type: "text",
                    id: "body-picture-input",
                    className: "text-input picture-input",
                    placeholder: "past path to file (example: C:/images/green.png)"
                }
            }
        ]
    );


    const inputContainer = createEl("div", {
        className: "input_container"
    }, scale_container, pictures_container);

    createSettingsGroup("character settings", inputContainer);
}