import React, { useState } from "react";
import Header from "../components/header";
import UrlInput from "../components/UrlInput";
import TranscriptBox from "../components/TranscriptBox";
function App() {
  const [transcript, setTranscript] = useState("");

  return (
    <div>
      <Header></Header>
      <UrlInput setTranscript={setTranscript}></UrlInput>
      {transcript && <TranscriptBox transcript={transcript}></TranscriptBox>}
    </div>
  );
}

export default App;
