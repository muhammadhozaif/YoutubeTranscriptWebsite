import React from "react";

export default function Header() {
  return (
    <header className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-lg">
      <div className="max-w-4xl mx-auto px-6 py-10 text-center">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-white drop-shadow-md">
          Transcriptify
        </h1>
        <p className="mt-4 text-xl sm:text-2xl text-white/90">
          The YouTube Transcript Tool
        </p>
      </div>
    </header>
  );
}
