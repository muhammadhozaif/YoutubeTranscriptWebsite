from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from youtube_transcript_api import YouTubeTranscriptApi, TranscriptsDisabled, NoTranscriptFound
import os
import logging
import traceback
from dotenv import load_dotenv

# Setup
load_dotenv()
app = FastAPI()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Allowed origins
origins = [os.getenv("FRONTEND_URL", "http://localhost:5173")]
vercel_url = os.getenv("VERCEL_URL")
if vercel_url:
    origins.append(f"https://{vercel_url}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class UrlRequest(BaseModel):
    url: str

# Helpers
def get_video_id(url: str) -> str:
    """Extract the video ID from a YouTube URL."""
    if "v=" in url:
        return url.split("v=")[1].split("&")[0]
    elif "youtu.be/" in url:
        return url.split("youtu.be/")[1].split("?")[0]
    return url

# Routes
@app.post("/api/transcript")
async def transcript(req: UrlRequest):
    try:
        logger.info(f"Received URL: {req.url}")
        video_id = get_video_id(req.url)
        logger.info(f"Parsed video_id: {video_id}")

        # ✅ Instance-based usage
        ytt_api = YouTubeTranscriptApi()
        fetched = ytt_api.fetch(video_id, languages=["en"])

        # Handle different return formats
        raw = fetched.to_raw_data() if hasattr(fetched, "to_raw_data") else fetched
        text = "\n".join([entry["text"] for entry in raw])

        logger.info(f"Fetched transcript entries: {len(raw)}")
        return {"transcript": text}

    except TranscriptsDisabled:
        logger.error("Transcripts are disabled for this video.")
        return {"error": "Transcripts are disabled for this video."}
    except NoTranscriptFound:
        logger.error("No transcript found in requested language(s).")
        return {"error": "No transcript found in requested language(s)."}
    except Exception as e:
        tb = traceback.format_exc()
        logger.error(f"Error fetching transcript: {e}\n{tb}")
        return {"error": str(e)}
