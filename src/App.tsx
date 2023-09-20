import logo from "./images/teutsch.png";
import "./App.css";
import { useRef, useState } from "react";



function App(): JSX.Element {
  const [screenStr, setScreenStr] = useState<string>('');

  const numbers = useRef<string>("");
  const displayString = useRef<string[]>([])
  const interimResult = useRef<string | number>('')
  const input = useRef<string[]>([]);



  let operations: string[] = ["^", "*", "/", "+", "-"]

  // build a string from user input
  function pushInput(value: string) {
    //the case for an int or float
    const ints: string[] = ['0', "1" , "2", "3", "4", "5", "6", "7", "8", "9"]  
    if (ints.includes(value) || value === '.') {
      if (value === "." && numbers.current.includes(".")) {
        alert("you can't include more than one decimal in a number");
        return;
      }
      numbers.current += value;
      console.log(numbers)
      // the case for operators
    } else {
      // cannot put two operators in a row
      if (numbers.current.length <= 0) {
        alert("You can't input an operator here");
        return;
      }
      input.current = input.current.concat([numbers.current, value])
      numbers.current = '';
    }
    if (value === "=") {
      // if no operations are performed reset the number and input
      if (input.current.length === 2) {
        numbers.current = '';
        input.current = [];
        return;
      }
      compute();
      input.current = []
      numbers.current = interimResult.current.toString();
    } else {
      display();
    }
  }

  function toggleNeg() {
    if (parseFloat(numbers.current) < 0 || numbers.current === '-') {
      numbers.current = numbers.current.slice(1);
    } else {
      numbers.current = "-" + numbers.current;
    }
    display();
  }

  function compute() {
    // loop through operations in the order of operations
    operations.forEach(operation => {
      for (let i = 0; i < input.current.length; i++) {
        // once an operation is found, call handleComputation and pass the operation and the index of that operation
        if (input.current[i] === operation) {
          handleComputation(operation, i);
          // once a computation has occurred, step the index back once to account for missing values
          i--;
        }
      }
    });
    display();
  }
  // function to decide which operation to perform
  function handleComputation(operation: string, index: number) {
    const firstNum = parseFloat(input.current[index - 1]);
    const secondNum = parseFloat(input.current[index + 1]);
    if (operation === "^") {
      exponents(firstNum, secondNum);
    } else if (operation === "*") {
      multiplication(firstNum, secondNum);
    } else if (operation === "/") {
      division(firstNum, secondNum);
    } else if (operation === "+") {
      addition(firstNum, secondNum);
    } else if (operation === "-") {
      subtraction(firstNum, secondNum);
    }
    // adjust input so that it has the interim result rather than the 3 values before calculation
    input.current.splice(index, 2);
    input.current[index - 1] = interimResult.current.toString();
  }

  // operations to perform
  function exponents(firstNum: number, secondNum: number) {
    interimResult.current = (firstNum ** secondNum).toFixed(2);
  }

  function multiplication(firstNum: number, secondNum: number) {
    interimResult.current = (firstNum * secondNum).toFixed(2);
  }

  function division(firstNum: number, secondNum: number) {
    interimResult.current = (firstNum / secondNum).toFixed(2);
  }

  function addition(firstNum: number, secondNum: number) {
    interimResult.current = (firstNum + secondNum).toFixed(2);
  }

  function subtraction(firstNum: number, secondNum: number) {
    interimResult.current = (firstNum - secondNum).toFixed(2);
  }
  // delete function functionality
  function deleteLast() {
    // remove last number pushed
    if (numbers.current.length > 0) {
      numbers.current = numbers.current.slice(0, -1);
    } else if (input.current.length > 0) {
      // pop input if it's an operation
      if (operations.includes(input.current[input.current.length - 1])) {
        input.current = input.current.slice(0, -1);
      } else {
        // set the last input value to the new number so that new numbers can be concatenated
        // cannot use [-1] to get last item for some reason :/
        numbers.current = input.current[input.current.length-1]
        console.log(input, numbers)
        numbers.current = numbers.current.slice(0, -1);
        input.current = input.current.slice(0, -1);
      }
    }
    display();
  }
  // reset display string and cause re-render
  function display() {
    if (input.current.length === 0) {
      displayString.current = [numbers.current]
    } else {
      displayString.current =input.current.concat(numbers.current)
    }
    console.log(displayString.current)
    setScreenStr(displayString.current.join(''))
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const key = event.key;

    if (
      // List of accepted keys
      (key >= '0' && key <= '9') ||
      key === '+' ||
      key === '-' ||
      key === '*' ||
      key === '/' ||
      key === '^' ||
      key === '=' ||
      key === 'Enter' ||
      key === 'Backspace' ||
      key === 'Escape'
    ) {
      event.preventDefault(); // Prevent default behavior

      if (key === 'Enter') {
        pushInput('=')
      } else if (key === 'Backspace') {
        deleteLast()// Handle backspace
      } else if (key === 'Escape') {
        pushInput('C') // Handle escape key as clear (C) button
      } else {
        pushInput(key)
      }
    }
  }; // Function to handle keyboard input

  return (
    <div className="main">
      <section className="calculator-body">
        <div className="input-logo">
          <div className="top-bar">
            <input onKeyDown={handleKeyDown} type="text" readOnly={true} value={screenStr} id="calculator-input" />
            <button onClick={() => deleteLast()} className="del-button">del</button>
          </div>
          <img src={logo} className="teutsch-logo" alt="Teutsch Partners Real Estate Services" />
        </div>
        <div>
          <button onClick={() => pushInput('+')} className="calculator-button">+</button>
          <button onClick={() => pushInput('-')} className="calculator-button">-</button>
          <button onClick={() => pushInput('*')} className="calculator-button">*</button>
          <button onClick={() => pushInput('/')} className="calculator-button">/</button>
          <button onClick={() => pushInput('^')} className="calculator-button">^</button>
        </div>
        <div>
          <button onClick={() => pushInput('7')} className="calculator-button">7</button>
          <button onClick={() => pushInput('8')} className="calculator-button">8</button>
          <button onClick={() => pushInput('9')} className="calculator-button">9</button>
        </div>
        <div>
          <button onClick={() => pushInput('4')} className="calculator-button">4</button>
          <button onClick={() => pushInput('5')} className="calculator-button">5</button>
          <button onClick={() => pushInput('6')} className="calculator-button">6</button>
        </div>
        <div>
          <button onClick={() => pushInput('1')} className="calculator-button">1</button>
          <button onClick={() => pushInput('2')} className="calculator-button">2</button>
          <button onClick={() => pushInput('3')} className="calculator-button">3</button>
        </div>
        <div>
          <button onClick={toggleNeg} className="calculator-button">+/-</button>
          <button onClick={() => pushInput('0')} className="calculator-button">0</button>
          <button onClick={() => pushInput('.')} className="calculator-button">.</button>
          <button onClick={() => pushInput('=')} className="calculator-button">=</button>
        </div>
      </section>
    </div>
  );
}

export default App;
