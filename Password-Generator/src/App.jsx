import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [digitOn, setDigits] = useState(false);
  const [SpecialCharOn, setSpecialChar] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (digitOn) str += "0123456789";
    if (SpecialCharOn) str += "!@#$%^&*()_+[]{}|;:,.<>?";

    for (let i = 1; i <= length; i++)
    {
      let char = Math.floor(Math.random() * str.length + 1); 
      pass += str.charAt(char);
    }
    setPassword(pass);

  }, [length, digitOn, SpecialCharOn, setPassword]);

  const copyPasswordtoClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {passwordGenerator()}, [length, digitOn, SpecialCharOn, passwordGenerator])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md text-center
          rounded-lg px-5 py-3 my-8 text-orange-500 bg-gray-900">
          <h1 className="text-white text-center my-3">Password Generator</h1>
          <div className="flex shadow rounded-lg overflow-hidden bg-amber-50 mb-4">
              <input type="text" value={password}
                className="outline-none w-full py-1 px-3"
                placeholder="Password"
                readOnly
                ref={passwordRef}/>
              <button
                onClick={copyPasswordtoClipboard}
                className="outline-none bg-blue-700
               text-white px-3 py-0.5 shrink-0">Copy</button>
          </div>

        <div className="flex text-sm gap-x-2">
            <div className="flex items-center gap-x-1">
                <input type="range" min={8} max={32} value={length}
                  className="cursor-pointer"
                  onChange={(e) => {setLength(e.target.value)}}/>
                <label>Length : { length}</label>
            </div>
                <input type="checkbox"
                  defaultChecked={digitOn}
                  id="numberInput"
                  onChange={() => {
                  setDigits((prev) => !prev);
                  }
                  } />
                <label htmlFor="numberInput">Numbers</label>
                   <input type="checkbox"
            defaultChecked={SpecialCharOn}
            id="characterInput"
            onChange={() => {
              setSpecialChar((prev) => !prev);
            }
          } />
          <label htmlFor="characterInput">Characters</label>
         </div>
     </div>
    </>
  )
}

export default App
