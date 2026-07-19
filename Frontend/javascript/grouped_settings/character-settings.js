import { createEl, createSettingsGroup } from "../components/index.js";

export function setCharacterSettings() {

    const scale_container = createEl("div", {
        classname: "scale_container"
    }, createEl("div", {
        className: "input-container"
    },
        createEl("label", {
            for: "character-scale-input",
            text: "Input scale of the character"
        }),

        createEl("input", {
            type: "number",
            id: "character-scale-input",
            className: "scale-input",
            min: 0,
            max: 2.00,
            step: 0.1,
            value: 1
        })
    ));

    const pictures_container = createEl("div", {
        className: "pictures_container"
    }, createEl("div", {
        className: "input-container"
    },
        createEl("label", {
            for: "head-picture-input",
            text: "Head picture path"
        }),

        createEl("input", {
            type: "text",
            id: "head-picture-input",
            className: "text-input picture-input",
            placeholder: "past path to file (example: C:/images/green.png)"
        }),

        createEl("label", {
            for: "body-picture-input",
            text: "Body picture path"
        }),

        createEl("input", {
            type: "text",
            id: "body-picture-input",
            className: "text-input picture-input",
            placeholder: "past path to file (example: C:/images/green.png)"
        })
    ))

    const inputContainer = createEl("div", {
        className: "input_container"
    }, scale_container, pictures_container);

    createSettingsGroup("character settings", inputContainer);
}