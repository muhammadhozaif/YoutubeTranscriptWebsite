import React from "react";
import { useState } from "react";
import { fetchTranscript } from "../lib/api";

export default function UrlInput({ setTranscript }) {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleFetch() {
    try {
      setLoading(true);
      setErrorMessage(""); // reset error
      const data = await fetchTranscript(url);
      if (data.error) throw new Error(data.error);
      setTranscript(data);
      console.log(data);
    } catch (error) {
      setErrorMessage(error.message); // set error instead of alert
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto mt-6 flex flex-col gap-2">
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
        <input
          type="text"
          placeholder="Type/Paste YouTube URL here..."
          onChange={(e) => setUrl(e.target.value)}
          value={url}
          className="flex-1 w-full sm:w-auto max-w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 placeholder-gray-400 text-gray-900 transition-all"
        />
        <button
          className="ml-0 sm:ml-5 px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all disabled:bg-indigo-300 disabled:cursor-not-allowed"
          onClick={handleFetch}
          disabled={loading || url == ""}
        >
          {loading ? "Loading" : "Get Transcript"}
        </button>
      </div>

      {/* Error message below the input/button */}
      {errorMessage && (
        <div className="w-full text-left bg-red-100 border border-red-400 text-red-800 px-4 py-3 rounded-lg">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
