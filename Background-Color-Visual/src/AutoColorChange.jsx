import { useState, useEffect } from "react"

function AutoColorChange({setColor})
{
  const [autoMode, setAutoMode] = useState(false);
  
  const generateRandomHexColor = () => {
    const hex = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    return hex;
  };
  
 useEffect(() => {
    let intervalId;

    if (autoMode) {
      intervalId = setInterval(() => {
        const randomColor = generateRandomHexColor();
        setColor(randomColor);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [autoMode, setColor]);

  return (
    <>
      <button
        onClick={() => setAutoMode(true)}
        disabled={autoMode}
        className="outline-none px-4 py-1 rounded-full text-white bg-green-700 shadow-lg 
             hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out "
      >
        Start
      </button>

      <button
        onClick={() => setAutoMode(false)}
        disabled={!autoMode}
        className="outline-none px-4 py-1 rounded-full text-white bg-red-700 shadow-lg 
             hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out "
      >
        Stop
      </button>
    </>
  );
}

export default AutoColorChange;