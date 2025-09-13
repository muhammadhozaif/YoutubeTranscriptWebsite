import React, { useState } from "react";

export default function TranscriptBox({ transcript }) {
  const [copied, setCopied] = useState(false);

  function copyTranscript(text) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  }

  const downloadTranscript = () => {
    const blob = new Blob([transcript], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transcript.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="mt-8 bg-gradient-to-b from-white to-gray-50 border border-gray-200 rounded-2xl shadow-lg">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Transcript
        </h2>
      </div>

      <div className="px-6 py-6 flex justify-center">
        <textarea
          value={transcript?.transcript || ""}
          readOnly
          className="w-1/2 max-w-4xl h-96 p-5 border border-gray-300 rounded-xl bg-gray-50 font-mono text-base text-gray-900 shadow-inner resize-none focus:outline-none focus:ring-4 focus:ring-indigo-400 transition-all leading-relaxed"
          style={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}
        />
      </div>

      <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-4">
        <button
          onClick={() => copyTranscript(transcript?.transcript || "")}
          className={`px-5 py-2 rounded-lg font-medium text-sm transition-all focus:outline-none focus:ring-2 ${
            copied
              ? "bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
              : "bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200 focus:ring-indigo-400"
          }`}
        >
          {copied ? "Copied!" : "Copy"}
        </button>

        <button
          onClick={downloadTranscript}
          className="px-5 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
        >
          Download as TXT
        </button>
      </div>
    </section>
  );
}
