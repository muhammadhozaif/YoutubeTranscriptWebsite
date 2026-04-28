import React, { useState } from "react";
import Header from "../components/header";
import UrlInput from "../components/UrlInput";
import TranscriptBox from "../components/TranscriptBox";

function App() {
  const [transcript, setTranscript] = useState("");

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      <Header />
      {/* This main wrapper uses -mt-12 to pull the content UP over the header */}
      <main className="max-w-4xl mx-auto px-4 relative z-10 -mt-12 sm:-mt-14">
        <UrlInput setTranscript={setTranscript} />
        {transcript && <TranscriptBox transcript={transcript} />}
      </main>
    </div>
  );
}

export default App;
