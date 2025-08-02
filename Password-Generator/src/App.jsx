import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [digitOn, setDigits] = useState(true);
  const [SpecialCharOn, setSpecialChar] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (digitOn) str += "0123456789";
    if (SpecialCharOn) str += "!@#$%^&*()_+[]{}|;:,.<>?";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, digitOn, SpecialCharOn]);

  const copyPasswordtoClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, digitOn, SpecialCharOn, passwordGenerator]);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-900 to-slate-700 flex items-center justify-center px-4">
      <div className="bg-white max-w-md w-full rounded-2xl p-6 shadow-2xl relative">

        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          🔐 Password Generator
        </h1>

        <div className="flex mb-4 rounded-lg overflow-hidden shadow border">
          <input
            type="text"
            value={password}
            ref={passwordRef}
            readOnly
            className="w-full px-4 py-2 text-gray-700 focus:outline-none"
          />
          <button
            onClick={copyPasswordtoClipboard}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 text-sm font-medium transition-all"
          >
            Copy
          </button>
        </div>

        {copied && (
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-1.5 text-sm rounded-full shadow-md animate-pulse">
            ✅ Copied to clipboard!
          </div>
        )}

        <div className="space-y-4 text-gray-700">
          <div className="flex items-center justify-between">
            <label className="font-medium">Length: {length}</label>
            <input
              type="range"
              min={8}
              max={32}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-2/3 cursor-pointer accent-indigo-600"
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="digits">Include Numbers</label>
            <input
              id="digits"
              type="checkbox"
              checked={digitOn}
              onChange={() => setDigits((prev) => !prev)}
              className="h-4 w-4 accent-indigo-600"
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="specialChars">Include Special Characters</label>
            <input
              id="specialChars"
              type="checkbox"
              checked={SpecialCharOn}
              onChange={() => setSpecialChar((prev) => !prev)}
              className="h-4 w-4 accent-indigo-600"
            />
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Made with 🧠 & 💻 by{" "}
          <a
            href="https://github.com/Vintage-K11"
            target="_blank"
            className="text-indigo-600 hover:underline"
          >
            Vishal
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
