import React, { useState } from "react";
import Header from "../components/header";
import UrlInput from "../components/UrlInput";
function App() {
  const [transcript, setTranscript] = useState("");

  return (
    <div>
      <Header></Header>
      <UrlInput setTranscript={setTranscript}></UrlInput>
    </div>
  );
}

export default App;
