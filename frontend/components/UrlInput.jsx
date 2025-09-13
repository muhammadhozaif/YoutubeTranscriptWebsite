import React from "react";
import { useState } from "react";
import { fetchTranscript } from "../lib/api";

export default function UrlInput({ setTranscript }) {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  async function handleFetch() {
    try {
      setLoading(true);
      const data = await fetchTranscript(url);
      if (data.error) throw new Error(data.error);
      setTranscript(data);
      console.log(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div>
      <input
        type="text"
        placeholder="Type/Paste YouTube URL here..."
        onChange={(e) => setUrl(e.target.value)}
        value={url}
        className="flex-1 border rounded px-3 py-2 shadow-sm"
      />
      <button className="ml-5" onClick={handleFetch} disabled={loading}>
        {loading ? "Loading" : "Get Transcript"}
      </button>
    </div>
  );
}
