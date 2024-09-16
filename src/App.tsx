import Vapi from '@vapi-ai/web';
import React, { useState, useEffect, useRef } from 'react';

function App() {
  const vapi_key = process.env.REACT_APP_VAPI_KEY || '';
  const assistant_key = process.env.REACT_APP_ASSISTANT_KEY || '';

  // Initialize vapi only once
  const vapiRef = useRef(new Vapi(vapi_key));
  const vapi = vapiRef.current;

  const [inCall, setInCall] = useState(false);

  const startCall = () => {
    console.log("Starting call");
    vapi.start("8dba2186-5de0-47c8-a300-bcfd22bc1b3d");
  };

  const endCall = () => {
    console.log("Ending call");
    vapi.stop();
  };

  useEffect(() => {
    const handleSpeechStart = () => {
      console.log("Speech has started");
      setInCall(true);
    };

    const handleSpeechEnd = () => {
      console.log("Speech has ended");
      setInCall(false);
    };

    // Attach event listeners
    vapi.on("speech-start", handleSpeechStart);
    vapi.on("speech-end", handleSpeechEnd);

    // Clean up event listeners on unmount
    return () => {
      vapi.off("speech-start", handleSpeechStart);
      vapi.off("speech-end", handleSpeechEnd);
    };
  }, [vapi]);

  return (
    <div>
      <h1>Start a Call</h1>
      <button onClick={inCall ? endCall : startCall}>
        {inCall ? "End Call" : "Start Call"}
      </button>
    </div>
  );
}

export default App;
