import {useState} from "react";

function App() {

    const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).join('');
    const numbers = "0123456789";

    const [type, setType] = useState("UUID");
    const [range, setRange] = useState(50);
    const [opacity, setOpacity] = useState(0);
    const [num,setNum] = useState(true);
    const [char,setChar] = useState(true);
    const [output, setOutput] = useState("");

    const create = () => {
        let pass = '';

        for(let i = 0; i<range;i++) {
            if (!char) {
                let rand = Math.floor(Math.random() * numbers.length);
                pass += numbers.charAt(rand);
            }
            if (!num) {
                let rand = Math.floor(Math.random() * alphabet.length);
                pass += alphabet.charAt(rand);
            }
        }
        setOutput(pass);

    }

  return (
    <div className={"Encryption"}>
      <div className={"Input"}>
          <p>Types</p>
          <span className={"Types"}>
              <label>
                  <button onClick={() => setType("UUID")}>UUID</button>
              </label>
              <label>
                  <button onClick={() => setType("Password")}>Password</button>
              </label>
              <label>
                  <button onClick={() => setType("Hash")}>Hash</button>
              </label>
          </span>
          <span className={"Options"}>
              {
                  type === "Password" ? (
                      <>
                          <label>
                              <input onChange={(e) => setRange(e.currentTarget.value)} type={"range"}/>
                              Current Length: {(!char && !num) === true ? range*2 : range}

                          </label>
                          <div className={"Contains"}>
                              <label style={{flexDirection: 'row', placeItems: 'center', justifyItems: 'center'}}>
                                  <input value={num} onChange={(e) => setNum(!num)} type={"checkbox"}/>
                                  Number
                              </label>
                              <label style={{flexDirection: 'row', placeItems: 'center', justifyItems: 'center'}}>
                                  <input value={char} onChange={(e) => setChar(!char)} type={"checkbox"}/>
                                  Chars
                              </label>
                          </div>
                      </>
                  ) : type === "UUID" ? (
                      <>
                          <label>
                              <input onChange={(e) => setRange(e.currentTarget.value)} type={"range"}/>
                              Current Length: {(char && num) === true ? range * 2 : range}

                          </label>
                      </>
                  ) : type === "Hash" ? (
                      <>
                          <label>
                              <input onChange={(e) => setRange(e.currentTarget.value)} type={"range"}/>
                              Current Length: {(char && num) === true ? range * 2 : range}

                          </label>
                      </>
                  ) : <>
                      <label>
                          <input onChange={(e) => setRange(e.currentTarget.value)} type={"range"}/>
                          Current Length: {(char && num) === true ? range * 2 : range}

                      </label>
                      </>
              }
          </span>
          <br/>
          <span className={"Output"}>
              <button onClick={() => create()}>Create</button>
              <div className={"Main"}>
                  <p onClick={() => {
                      navigator.clipboard.writeText(output)
                  }
                  }>{output}</p>
              </div>
              <p style={{fontSize: '11px', textAlign: 'center'}}>Press Shift + Scroll click to scroll.<br/>Click password to copy</p>
          </span>
      </div>
    </div>
  );
}

export default App;
