import { useRef, useState } from "react";

function App() {
  const [time, setTime] = useState(0);
  const xRef = useRef(null);

  const startTimer = () => {
    if (xRef.current !== null) return;

    xRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const pauseTimer = () => {
    clearInterval(xRef.current);
    xRef.current = null;
  };

  const resetTimer = () => {
    clearInterval(xRef.current);
    xRef.current = null;
    setTime(0);
  };

  return (
    <div>
      <h1>StopWatch</h1>
      <p>Time : {time}</p>

      <button onClick={startTimer}>start</button>
      <button onClick={pauseTimer}>Pause</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}

export default App;
