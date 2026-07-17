function reset() {
    char_el.style.setProperty("--pos_y", "0px");
    char_el.style.setProperty(css_var, "0deg");
}

export function mic_input(char_el, css_var, state, options = {}) {
    let rotate_left = true;
    const threshold = options.threshold ?? 15; // pas dit aan naar wens

    if (!state.isTalking) {
        reset();
        return;
    }
    navigator.mediaDevices
        .getUserMedia({ video: false, audio: true })
        .then((stream) => {
            if (!window.localAudio) {
                window.localAudio = new Audio();
                window.localAudio.muted = true;
            }
            window.localStream = stream;
            window.localAudio.srcObject = stream;
            window.localAudio.autoplay = true;

            const audiocontext = new AudioContext();
            const analyser = audiocontext.createAnalyser();
            analyser.fftSize = 256;
            const microphone = audiocontext.createMediaStreamSource(stream);
            microphone.connect(analyser);
            const dataArray = new Uint8Array(analyser.frequencyBinCount);

            function meetVolume() {
                analyser.getByteFrequencyData(dataArray);
                let totaal = 0;
                for (let i = 0; i < dataArray.length; i++) {
                    totaal += dataArray[i];
                }
                let gemiddelde = totaal / dataArray.length;
                let spraak_levels = gemiddelde / 1.5;

                // --- NOISE GATE ---
                if (gemiddelde < threshold) {
                    // te zacht -> geen beweging, mond dicht
                    char_el.style.setProperty("--pos_y", "0px");
                    char_el.style.setProperty(css_var, "0deg");
                    if (state.isTalking) {
                        requestAnimationFrame(meetVolume);
                    }
                    return; // stop hier, sla de rest over
                }

                let mondheight = -(gemiddelde / 5);
                if (mondheight > -2) mondheight = 0;
                char_el.style.setProperty("--pos_y", `${mondheight}px`);

                setTimeout(() => {
                    let mondhoek;
                    if (rotate_left) {
                        mondhoek = -(spraak_levels);
                        rotate_left = false;
                    } else {
                        mondhoek = spraak_levels;
                        rotate_left = true;
                    }
                    char_el.style.setProperty("--pos_y", "0px");
                    char_el.style.setProperty(css_var, `${mondhoek}deg`);

                    if (state.isTalking) {
                        requestAnimationFrame(meetVolume);
                    } else {
                        char_el.style.setProperty(css_var, "0deg");
                    }
                }, 50);
            }
            meetVolume();
        })
        .catch((err) => {
            console.error(`you got an error: ${err}`);
        });
}