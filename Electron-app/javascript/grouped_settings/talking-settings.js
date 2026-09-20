import { createEl, createSettingsGroup, label_component } from "../components/index.js";

export function setTalkingSettings() {
    const rotationMarker_wrapper = rotationMarker_container();
    const rotationMarker_pos = rotationMarkerPosition_container();

    const inputContainer = createEl("div", {
        className: "input_container"
    }, rotationMarker_wrapper, rotationMarker_pos)

    createSettingsGroup("speech settings", inputContainer);
}

function rotationMarker_container() {
    const rotationMarker = label_component(
        "rotation-container", "input-container",
        [
            {
                label: {
                    for: "hideRotationMarker",
                    text: "Toggle the rotation marker"
                },
                input: {
                    type: "checkbox",
                    id: "hideRotationMarker",
                    className: "rotationMarker"
                }
            }
        ]
    )

    return rotationMarker;
}

function rotationMarkerPosition_container() {
    const rotation_mark_pos = createEl("div", {
        className: "rot_mark_pos"
    }, label_component(
        "rotation-position-container", "input-container",
        [
            {
                label: {
                    for: "setRotationMarker_x",
                    text: "Set x position for the rotation marker in %"
                },
                input: {
                    type: "number",
                    id: "setRotationPosX",
                    className: "RotationPosX scale-input input",
                    
                    min: 0,
                    max: 1,
                    step: 0.01,
                    value: 0.5
                }
            },
            {
                label: {
                    for: "setRotationMarker_y",
                    text: "Set y position for the rotation marker in %"
                },
                input: {
                    type: "number",
                    id: "setRotationPosY",
                    className: "RotationPosY scale-input input",
                    
                    min: 0,
                    max: 1,
                    step: 0.01,
                    value: 0.5
                }
            }
        ])
    )

    return rotation_mark_pos;
}