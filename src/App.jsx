import { useEffect, useRef, useState } from "react";
import "./Styles/App.css";

function App() {
  const [time, setTime] = useState("");
  const [inputGoal, setInputGoal] = useState("");
  const [history, setHistory] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const xRef = useRef(null);
  const gRef = useRef(null);
  const hRef = useRef([]);

  useEffect(() => {
    const stored = localStorage.getItem("darkMode");
    if (stored !== null) {
      setDarkMode(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const startTimer = () => {
    if (xRef.current !== null) return;

    xRef.current = setInterval(() => {
      setTime((prevTime) => {
        const newTime = prevTime + 1;

        if (gRef.current && newTime >= gRef.current) {
          alert(`Goal of ${gRef.current} seconds reached`);
          clearInterval(xRef.current);
          xRef.current = null;
        }
        return newTime;
      });
    }, 1000);
  };

  const pauseTimer = () => {
    clearInterval(xRef.current);
    xRef.current = null;
  };

  const resetTimer = () => {
    clearInterval(xRef.current);
    xRef.current = null;

    if (time > 0) {
      hRef.current.push(time);
      setHistory(!history);
    }
    setTime(0);
  };

  const handleGoalChange = (e) => {
    setInputGoal(e.target.value);
    const numericGoal = parseInt(e.target.value, 10);
    if (!isNaN(numericGoal)) {
      gRef.current = numericGoal;
    } else {
      gRef.current = null;
    }
  };

  const FormatTime = (timeInSeconds) => {
    const min = String(Math.floor(timeInSeconds / 60)).padStart(2, "0");
    const sec = String(timeInSeconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  const clearHistory = () => {
    hRef.current = [];
    setHistory(!history);
  };

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      <div className="container">
        <h1>StopWatch</h1>

        <button onClick={() => setDarkMode(!darkMode)} className="toggle-mode">
          {darkMode ? " Light Mode" : "Dark Mode"}
        </button>

        <p className="time-display">Time: {FormatTime(time)}</p>

        <div className="controls">
          <button onClick={startTimer}>▶️ Start</button>
          <button onClick={pauseTimer}>⏸️ Pause</button>
          <button onClick={resetTimer}>⏹️ Reset</button>
        </div>

        <div className="goal-input">
          <label> Set Goal Time (seconds):</label>
          <input type="number" value={inputGoal} onChange={handleGoalChange} />
        </div>

        <div className="history-section">
          <h3>Session History</h3>
          {hRef.current.length === 0 ? (
            <p>No Previous Sessions</p>
          ) : (
            <>
              <ul className="history-list">
                {hRef.current.map((sessionTime, index) => (
                  <li key={index}> {FormatTime(sessionTime)}</li>
                ))}
              </ul>
              <button onClick={clearHistory}> Clear History</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
