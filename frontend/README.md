# 🎬 YouTube Transcript Fetcher (FastAPI + Vite)

A simple full-stack app to fetch YouTube video transcripts using [youtube-transcript-api](https://github.com/jdepoix/youtube-transcript-api).  
Built with **FastAPI** on the backend and **Vite + React** on the frontend.

---

## ⚡ Features

- Paste a YouTube URL and get the transcript (if available).
- Handles both `youtube.com/watch?v=` and `youtu.be/` links.
- Error handling for:
  - Transcripts disabled
  - No transcript found in English
  - Unexpected API issues

---

## 🚀 Running Locally

### Backend (FastAPI)

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/yt-transcript-app.git
   cd yt-transcript-app/backend
   ```

````

2. Create a virtual environment and install dependencies:

   ```bash
   python -m venv venv
   source venv/bin/activate   # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. Create a `.env` file in `backend/`:

   ```env
   FRONTEND_URL=http://localhost:5173
   ```

4. Run the backend:

   ```bash
   uvicorn main:app --reload --port 8000
   ```

---

### Frontend (Vite + React)

1. Go to the frontend folder:

   ```bash
   cd ../frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in `frontend/`:

   ```env
   VITE_API_URL=http://localhost:8000
   ```

4. Run the dev server:

   ```bash
   npm run dev
   ```

---

## 🛑 Important: Hosting Limitations

This project **will not work on Vercel or most cloud providers** out of the box because:

- YouTube **blocks IPs from cloud providers** (AWS, GCP, Azure, Vercel, etc.).
- You’ll see errors like:

  ```
  Could not retrieve a transcript for the video! YouTube is blocking requests from your IP.
  ```

### ✅ Workarounds

1. **Run locally** — works fine on your machine.
2. **Self-host** on a personal server / Raspberry Pi / VPS.
3. **Use proxies** with `youtube-transcript-api`. See [docs here](https://github.com/jdepoix/youtube-transcript-api?tab=readme-ov-file#working-around-ip-bans-requestblocked-or-ipblocked-exception).

---

## 🙌 Acknowledgments

- [FastAPI](https://fastapi.tiangolo.com/)
- [Vite](https://vitejs.dev/)
- [youtube-transcript-api](https://github.com/jdepoix/youtube-transcript-api)

```

---


```
````
