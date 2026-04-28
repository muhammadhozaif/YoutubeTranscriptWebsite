import React, { useState } from "react";

export default function TranscriptBox({ transcript }) {
  const [copied, setCopied] = useState(false);

  function copyTranscript(text) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  }

  const downloadTranscript = () => {
    const blob = new Blob([transcript?.transcript || ""], {
      type: "text/plain",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transcript.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="mt-10 bg-white border border-slate-200 rounded-3xl shadow-lg shadow-slate-200/50 overflow-hidden transform transition-all duration-500">
      {/* Header section with integrated buttons */}
      <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
          <svg
            className="w-5 h-5 text-indigo-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Your Transcript
        </h2>

        <div className="flex gap-3 w-full sm:w-auto">
          <button
            onClick={() => copyTranscript(transcript?.transcript || "")}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-full font-medium text-sm transition-all focus:outline-none focus:ring-4 ${
              copied
                ? "bg-emerald-100 text-emerald-700 ring-emerald-100"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 ring-slate-100"
            }`}
          >
            {copied ? "✓ Copied" : "Copy Text"}
          </button>

          <button
            onClick={downloadTranscript}
            className="flex-1 sm:flex-none px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium hover:bg-indigo-100 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all flex items-center justify-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download
          </button>
        </div>
      </div>

      {/* Clean, borderless reading area */}
      <div className="p-2 sm:p-4">
        <textarea
          value={transcript?.transcript || ""}
          readOnly
          className="w-full h-[500px] p-4 sm:p-6 border-0 bg-transparent font-mono text-sm sm:text-base text-slate-700 resize-none focus:outline-none focus:ring-0 leading-relaxed"
          style={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}
        />
      </div>
    </section>
  );
}
