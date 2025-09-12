from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from youtube_transcript_api import YouTubeTranscriptApi
import os
from dotenv import load_dotenv
load_dotenv()
app = FastAPI()
origins = os.getenv("FRONTEND_URL", "http://localhost:5173")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origins],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UrlRequest(BaseModel):
    url: str

def get_video_id(url: str) -> str:
    if "v=" in url:
        return url.split("v=")[1].split("&")[0]
    elif "youtu.be/" in url:
        return url.split("youtu.be/")[1].split("?")[0]
    return url

@app.post("/transcript")
async def transcript(req: UrlRequest):
    try:
        video_id = get_video_id(req.url)
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        text = "\n".join([entry["text"] for entry in transcript])
        return {"transcript": text}
    except Exception as e:
        return {"error": str(e)}