import React from "react";

export default function Header() {
  return (
    <header className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">
      {/* Increased bottom padding to create canvas for the overlapping card */}
      <div className="max-w-4xl mx-auto px-6 pt-16 pb-24 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white drop-shadow-sm">
          Transcriptify
        </h1>
        <p className="mt-3 text-lg sm:text-xl text-white/90 font-medium">
          The YouTube Transcript Tool
        </p>
      </div>
    </header>
  );
}
