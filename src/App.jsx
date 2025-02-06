import { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += ".,;:!?()[]{}<>/|@#$%^&*-+=_~`";
    console.log(str)


    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
    console.log(pass);

  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(()=> {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  }
  ,[password])

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]); 

  return (
    <div>
      <div className="wrapper">
        <h1>Password generator</h1>
        <div className="box1">
          <input
            type="text"
            value={password}
            placeholder="Password"
            ref={passwordRef}
            readOnly
          />
          <button
          onClick={copyPasswordToClipboard}
          >Copy</button>
        </div>
        <div className="box2">
          <div className="range">
            <input
              type="range"
              value={length}
              min={6}
              max={100}
              onChange={(e) => {
                setLength(Number(e.target.value));
              }}
            />
            <label>Length({length})</label>
          </div>
          <div className="chbox-con">
            <div className="ck-box-1">
              <label>Char</label>
              <input
                type="checkbox"
                checked={charAllowed}
                id="charInput"
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              />
            </div>
            <div className="ck-box-2">
              <label>Num</label>
              <input
                type="checkbox"
                checked={numberAllowed}
                id="numberInput"
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
