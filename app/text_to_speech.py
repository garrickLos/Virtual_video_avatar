import os
import subprocess
from pathlib import Path
import math
import time

from pedalboard._pedalboard import Pedalboard
from pedalboard import PitchShift, Reverb, Compressor, HighpassFilter, PeakFilter, LowShelfFilter, Gain
from pedalboard.io import AudioFile

import pygame

class tts():

    CURRENT_DIR = Path(__file__).parent.resolve()
    AUDIO_DIR = CURRENT_DIR / "resources" / "audio"

    AUDIO_DIR.mkdir(parents=True, exist_ok=True)

    def __init__(self, voice_id= 0, # 0 for male, 1 for female voice
                 rate: float= 1.0, # the speed in which the voice plays (higher is fast, lower is slower)
                 volume: float= 0.20, # the volume at which it speaks (between 0 and 1)
                 pitch: float = 1, # pitch of the voice (between 0 and 1)
                 
                 threshold_db: int= -15, # ()
                 threshold_ratio: float= 2.5,
                 
                 room_size: float= 0.1,
                 damp_level: float= 0,
                 wet_level: float = 0,
                 dry_level: float = 1
                 ):
        
        self.voice_id= voice_id
        self.tts_rate= rate
        self.tts_volume= volume

        self.tts_pitch= pitch

        self.tts_threshold_db= threshold_db
        self.threshold_ratio = threshold_ratio

        self.tts_room_size = room_size
        self.ttst_damp_level = damp_level
        self.tts_wet_level = wet_level
        self.tts_dry_level = dry_level

    def advanced_speak_settings(self, text):
        filename = "temp_pytts3.wav"

        model_path = "resources/voices/en_US-norman-medium.onnx"

        command = [
            "piper",
            "--model", model_path,
            "--output_file", filename,
            "--length_scale", str(self.tts_rate)
        ]

        subprocess.run(command, input=text.encode('utf-8'), check=True)

        tts_settings = {
            "filename": filename
        }

        return tts_settings

    def speak(self, text=""):
        tts = self.advanced_speak_settings(text)

        final_file = str(self.AUDIO_DIR / "final_voice.wav")

        if self.tts_volume <= 0.0:
            volume_db = -100.0
        else:
            volume_db = 20 * math.log10(self.tts_volume)

        board = Pedalboard([

            PitchShift(
                semitones= self.tts_pitch
            ), 

            Compressor(
                threshold_db= self.tts_threshold_db, 
                ratio= self.threshold_ratio
            ),

            LowShelfFilter(
                cutoff_frequency_hz=20.0,
                gain_db=1.5
            ),

            HighpassFilter(cutoff_frequency_hz=80.0),

            PeakFilter(
                cutoff_frequency_hz=5000.0,
                # gain_db=1.0,
                # q=100
            ),

            Reverb(
                room_size= self.tts_room_size,
                damping= self.ttst_damp_level, 
                wet_level= self.tts_wet_level,
                dry_level= self.tts_dry_level
            ),

            Gain(gain_db=volume_db)
        ])

        with AudioFile(tts["filename"]) as f:
            with AudioFile(final_file, 'w', f.samplerate, f.num_channels) as o:
                while f.tell() < f.frames:
                    chunk = f.read(int(f.samplerate))
                    effected_chunk = board(chunk, f.samplerate)
                    o.write(effected_chunk)

        os.remove(tts["filename"])

        pygame.mixer.init()

        pygame.mixer.music.load(final_file)

        pygame.mixer.quit()