import {useState} from "react";

function App() {

    const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).join('');
    const numbers = "0123456789";

    const [type, setType] = useState("UUID");
    const [range, setRange] = useState(50);
    const [num,setNum] = useState(false);
    const [char,setChar] = useState(false);
    const [output, setOutput] = useState("");
    const [opac, setOpac] = useState(0);

    function generateKey() {
        let characters;

        if(char) characters += alphabet;

        if(num) characters += numbers;

        let key = '';
        for (let i = 0; i < 20; i++) {
            key += characters.charAt(Math.floor(Math.random() * characters.length));
            if (i === 3 || i === 7 || i === 11 || i === 15) key += '-';
        }
        return key;
    }

    const create = () => {
        let pass = '';
        if(type === "UUID") {
            pass = generateKey();
        } else if (type === "Password") {
            for (let i = 0; i < range; i++) {
                if (!char && num) {
                    let rand = Math.floor(Math.random() * numbers.length);
                    pass += numbers.charAt(rand);
                }
                if (!num && char) {
                    let rand = Math.floor(Math.random() * alphabet.length);
                    pass += alphabet.charAt(rand);
                }

                if (num && char) {
                    let rand = Math.floor(Math.random() * alphabet.length);
                    pass += alphabet.charAt(rand);
                    let randa = Math.floor(Math.random() * numbers.length);
                    pass += numbers.charAt(randa);
                }
            }
        }
        setOutput(pass);

    }

  return (
    <div className={"Encryption"}>
      <div className={"Input"}>
          <p>{type}</p>
          <span className={"Types"}>
              <label>
                  <button onClick={() => setType("UUID")}>UUID</button>
              </label>
              <label>
                  <button onClick={() => setType("Password")}>Password</button>
              </label>
          </span>
          <span className={"Options"}>
              {
                  type === "Password" ? (
                      <>
                          <label>
                              <input onChange={(e) => setRange(e.currentTarget.value)} type={"range"}/>
                              Current Length: {(char && num) === true ? range*2 : range}
                          </label>
                          <div className={"Contains"}>
                              <label style={{flexDirection: 'row', placeItems: 'center', justifyItems: 'center'}}>
                                  <input onChange={(e) => setNum(!num)} type={"checkbox"}/>
                                  Number
                              </label>
                              <label style={{flexDirection: 'row', placeItems: 'center', justifyItems: 'center'}}>
                                  <input onChange={(e) => setChar(!char)} type={"checkbox"}/>
                                  Chars
                              </label>
                          </div>
                      </>
                  ) : type === "UUID" ? (
                      <div style={{marginTop: '34px'}}>
                          <div className={"Contains"}>
                              <label style={{flexDirection: 'row', placeItems: 'center', justifyItems: 'center'}}>
                                  <input onChange={(e) => setNum(!num)} type={"checkbox"}/>
                                  Number
                              </label>
                              <label style={{flexDirection: 'row', placeItems: 'center', justifyItems: 'center'}}>
                                  <input onChange={(e) => setChar(!char)} type={"checkbox"}/>
                                  Chars
                              </label>
                          </div>
                      </div>
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
                  <p style={{cursor: 'pointer'}} onClick={() => {
                      setOpac(1)
                      navigator.clipboard.writeText(output)
                      setInterval(() => {
                          setOpac(0)
                      }, 2000)
                  }
                  }>{output}</p>
                  <strong style={{opacity: opac}}>Copied</strong>
              </div>
              <p style={{fontSize: '11px', textAlign: 'center'}}>Press Shift + Scroll click to scroll.<br/>Click password to copy</p>
          </span>
      </div>
    </div>
  );
}

export default App;
