import React, { useState, useEffect, useRef } from "react";

export default function Stopwatch() {
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  // Update the timer every second when running
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    } else if (!isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Cleanup on unmount
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSecondsElapsed(0);
  };

  const minutes = Math.floor(secondsElapsed / 60);
  const seconds = secondsElapsed % 60;

  return (
    <div style={{ textAlign: "center", marginTop: "50px", fontFamily: "Arial" }}>
      <h2>Stopwatch</h2>
      <p>
        <strong>Time:</strong> {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </p>

      <div style={{ marginTop: "20px" }}>
        <button onClick={handleStartStop}>
          {isRunning ? "Stop" : "Start"}
        </button>
        <button onClick={handleReset} style={{ marginLeft: "10px" }}>
          Reset
        </button>
      </div>
    </div>
  );
}
