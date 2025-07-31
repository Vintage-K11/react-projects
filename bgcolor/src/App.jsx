import { useState } from "react";
import AutoColorChange from "./AutoColorChange";

function App() {
  const [color, setColor] = useState("olive");

  return (
    <>
      
      <div className="w-full h-screen duration-500 transition-all ease-in-out"
        style={{ backgroundColor: color }}>

     <div className="fixed top-8 w-full flex justify-center z-50">
  <h1 className="text-2xl font-bold text-black bg-white bg-opacity-60 px-6 py-2 rounded-full shadow-lg border">
    Color Changer App
  </h1>
</div>

        
        <div className="fixed flex flex-wrap justify-center top-24 inset-x-0 px-2">
          <div className="flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-3xl">
            <button
              onClick={() => setColor("white")}
              className="outline-none px-4 py-1 rounded-full text-black shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out"
              style={{backgroundColor: "white"}}
            >White</button>
            <button
              onClick={() => setColor("violet")}
              className="outline-none px-4 py-1 rounded-full text-white shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out"
              style={{backgroundColor: "violet"}}
            >Violet</button>
            <button
              onClick={() => setColor("indigo")}
              className="outline-none px-4 py-1 rounded-full text-white shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out"
              style={{backgroundColor: "indigo"}}
            >Indigo</button>
            <button
              onClick={() => setColor("blue")}
              className="outline-none px-4 py-1 rounded-full text-white shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out"
              style={{backgroundColor: "blue"}}
            >Blue</button>
            <button
              onClick={() => setColor("green")}
              className="outline-none px-4 py-1 rounded-full text-white shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out"
              style={{backgroundColor: "green"}}
            >Green</button>
            <button
              onClick={() => setColor("yellow")}
              className="outline-none px-4 py-1 rounded-full text-black shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out"
              style={{backgroundColor: "yellow"}}
            >Yellow</button>
            <button
              onClick={() => setColor("orange")}
              className="outline-none px-4 py-1 rounded-full text-white shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out"
              style={{backgroundColor: "orange"}}
            >Orange</button>
            <button
              onClick={() => setColor("red")}
              className="outline-none px-4 py-1 rounded-full text-white shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out"
              style={{backgroundColor: "red"}}
            >Red</button>
            <button
              onClick={() => setColor("black")}
              className="outline-none px-4 py-1 rounded-full text-white shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out"
              style={{backgroundColor: "black"}}
            >Black</button>      
          </div>   
        </div>
        <div className="fixed top-40 z-50 flex justify-center w-full">
           <div className="flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-3xl">
              <AutoColorChange setColor={setColor} />
          </div>
        </div>


      </div>
    </>
  )
}

export default App
