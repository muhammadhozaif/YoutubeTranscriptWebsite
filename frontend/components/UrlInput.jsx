import React, { useState } from "react";
import { fetchTranscript } from "../lib/api";

export default function UrlInput({ setTranscript }) {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleFetch() {
    try {
      setLoading(true);
      setErrorMessage("");
      const data = await fetchTranscript(url);
      if (data.error) throw new Error(data.error);
      setTranscript(data);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-4">
      {/* The floating white pill card */}
      <div className="bg-white p-2 sm:p-2.5 rounded-2xl sm:rounded-full shadow-xl shadow-indigo-900/5 ring-1 ring-slate-100 flex flex-col sm:flex-row items-center w-full transition-all hover:shadow-2xl hover:shadow-indigo-900/10 gap-2 sm:gap-0">
        <div className="flex-1 w-full flex items-center pl-4 sm:pl-6 bg-transparent">
          {/* Link Icon for polish */}
          <svg
            className="w-5 h-5 text-slate-400 mr-3 hidden sm:block shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
          <input
            type="text"
            placeholder="Paste YouTube URL here..."
            onChange={(e) => setUrl(e.target.value)}
            value={url}
            className="w-full py-3 bg-transparent outline-none placeholder-slate-400 text-slate-700 font-medium text-lg"
          />
        </div>

        <button
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl sm:rounded-full bg-indigo-600 text-white font-semibold text-base hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all disabled:bg-indigo-300 disabled:cursor-not-allowed shadow-md shrink-0"
          onClick={handleFetch}
          disabled={loading || !url.trim()}
        >
          {loading ? "Extracting..." : "Get Transcript"}
        </button>
      </div>

      {/* Elegant error state */}
      {errorMessage && (
        <div className="w-full text-center bg-red-50 text-red-600 px-4 py-3 rounded-xl border border-red-100 font-medium text-sm">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
