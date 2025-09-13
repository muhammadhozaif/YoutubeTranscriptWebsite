import React, { useState } from "react";
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
    <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-3xl mx-auto mt-6 px-4">
      <input
        type="text"
        placeholder="Type or paste YouTube URL here..."
        onChange={(e) => setUrl(e.target.value)}
        value={url}
        className="flex-1 w-full sm:w-auto px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all text-gray-900 placeholder-gray-400"
      />
      <button
        onClick={handleFetch}
        disabled={loading || !url}
        className={`px-6 py-3 rounded-lg font-medium text-white transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
          loading || !url
            ? "bg-indigo-300 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700"
        }`}
      >
        {loading ? "Loading..." : "Get Transcript"}
      </button>
    </div>
  );
}
