import logo from "./images/teutsch.png"
import "./App.css"
import { useRef, useState } from "react"
import { compute, pushInput, toggleNeg } from './functions/calcUtils'

import ButtonContainer from "./components/ButtonContainer"
import HistoryBox from "./components/HistoryBox"
import InputBox from "./components/InputBox"
import Legend from "./components/Legend"

function App(): JSX.Element {
  const [screenStr, setScreenStr] = useState<string>('')
  const [previousLines, setPreviousLines] = useState<string[]>([])
  // useRef hook instead of global vars
  const numbers = useRef<string | undefined>("");
  const displayString = useRef<string[]>([])
  const input = useRef<string[]>([]);


  function display() {
    if (numbers.current === undefined) {
      numbers.current = ''
    }

    if (input.current.length === 0) {
      displayString.current = [numbers.current]
    } else {
      displayString.current = input.current.concat([numbers.current])
    }
    setScreenStr(displayString.current.join(''))
  }

  function handleInput(value: string) {
    if (value === "n") {
      makeNegative()
      return
    }
    const { numbers: newNumbers, input: newInput } = pushInput(value, numbers.current, input.current)
    numbers.current = newNumbers
    input.current = newInput
    // if the user has entered the "=" character, run compute on all input and append an = to the end
    if (numbers.current[numbers.current.length - 1] === "=") {
      // save a copy of the input and number for history
      const currentInputCopy: string = input.current.concat(numbers.current).join('')
      const { numbers: compNumber, input: compInput } = compute(numbers.current.slice(0, -1), input.current)
      numbers.current = compNumber
      input.current = compInput
      // include answer in history
      setPreviousLines(previousLines.concat([currentInputCopy + input.current[0]]))
    }
    display()
    // if a result is achieved, make that result available for the next calculation
    if (numbers.current === "=") {
      const result: string | undefined = input.current.pop()
      numbers.current = result
    }
  }

  // toggle the current number to negative
  function makeNegative() {
    numbers.current = toggleNeg(numbers.current);
    // Trigger a re-render by updating the state
    display()
  }

  return (
    <div className="main">
      <section className="calculator-body">
        <div className="input-logo">
          <div className="top-bar">
            <HistoryBox previousLines={previousLines} />
            <InputBox handleInput={handleInput} screenStr={screenStr} />
          </div>
          <img src={logo} className="teutsch-logo" alt="Teutsch Partners Real Estate Services" />
        </div>
        <ButtonContainer handleInput={handleInput} makeNegative={makeNegative} />
      </section>
      <Legend />
    </div>
  );
}

export default App;
