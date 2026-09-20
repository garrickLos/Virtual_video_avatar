import asyncio
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

from Backend.components.JsonRead import JsonItems
from Backend.text_to_speech import tts

BASE_DIR = Path(__file__).parent.resolve()
COMPONENT_DIR = BASE_DIR / "components"
JSON_DIR = BASE_DIR / "resources" / "json"

jsonItems = JsonItems()
tts_settings_file = "tts_settings_male001.json"
tts_settings = JsonItems.read_json((JSON_DIR / tts_settings_file), "tts")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Use a thread pool instead of a process pool.
# pyttsx3/SAPI5 uses Windows COM and is not safe in subprocesses.
speech_executor = ThreadPoolExecutor(max_workers=1)


def genereer_en_speel_spraak(settings, text):
    text_to_speech = tts(
        voice_id=settings["voice_id"],
        rate=settings["rate"],
        volume=settings["volume"],
        pitch=settings["pitch"],
        threshold_db=settings["threshold_db"],
        threshold_ratio=settings["threshold_ratio"],
        room_size=settings["room_size"],
        damp_level=settings["damp_level"],
        dry_level=settings["dry_level"],
        wet_level=settings["wet_level"],
    )
    text_to_speech.speak(text)


@app.get("/get-message")
async def read_root():
    loop = asyncio.get_running_loop()

    await loop.run_in_executor(
        speech_executor,
        genereer_en_speel_spraak,
        tts_settings,
        "here I am, testing a new voice",
    )

    audio_path = Path(__file__).parent.resolve() / "resources" / "audio" / "final_voice.wav"

    return FileResponse(
        path=audio_path,
        media_type="audio/wav",
        filename="final_voice.wav"
    )


@app.on_event("shutdown")
def shutdown_event():
    speech_executor.shutdown(wait=True)