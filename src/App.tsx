import logo from "./images/teutsch.png";
import "./App.css";
import { useState } from "react";


let numbers: string = '';
let displayString: string[] = []
let operations: string[] = ["^", "*", "/", "+", "-"]
let interimResult: string | number;
let result: string = '';
let input: string[] = [];

function App(): JSX.Element {
  const [screenStr, setScreenStr] = useState<string>('');

  // build a string from user input
  function pushInput(value: string) {
    //the case for an int or float
    const re = new RegExp('[0-9]');
    if (re.test(value) || value === '.') {
      if (value === "." && numbers.includes(".")) {
        alert("you can't include more than one decimal in a number");
        return;
      }
      numbers += value;
      console.log(numbers)
      // the case for operators
    } else {
      // cannot put two operators in a row
      if (numbers.length <= 0) {
        alert("You can't input an operator here");
        return;
      }
      input = [...input, numbers, value]
      numbers = '';
    }
    if (value === "=") {
      // if no operations are performed reset the number and input
      if (input.length === 2) {
        numbers = input[0].toString();
        input = []
        return;
      }
      compute();
      input = []
      numbers = interimResult.toString();
    } else {
      display();
    }
  }

  function compute() {
    // loop through operations in the order of operations
    operations.forEach(operation => {
      for (let i = 0; i < input.length; i++) {
        // once an operation is found, call handleComputation and pass the operation and the index of that operation
        if (input[i] === operation) {
          console.log(i);
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
    const firstNum = parseFloat(input[index - 1].toString());
    const secondNum = parseFloat(input[index + 1].toString());
    if (operation === "^") {
      exponents(firstNum, secondNum);
    } else if (operation === "x") {
      multiplication(firstNum, secondNum);
    } else if (operation === "/") {
      division(firstNum, secondNum);
    } else if (operation === "+") {
      addition(firstNum, secondNum);
    } else if (operation === "-") {
      subtraction(firstNum, secondNum);
    }
    // adjust input so that it has the interim result rather than the 3 values before calculation
    input.splice(index, 2);
    input[index - 1] = interimResult.toString();
    console.log(input);
  }
  // operations to perform
  function exponents(firstNum: number, secondNum: number) {
    interimResult = (firstNum ** secondNum).toFixed(2);
  }

  function multiplication(firstNum: number, secondNum: number) {
    interimResult = (firstNum * secondNum).toFixed(2);
  }

  function division(firstNum: number, secondNum: number) {
    interimResult = (firstNum / secondNum).toFixed(2);
  }

  function addition(firstNum: number, secondNum: number) {
    interimResult = (firstNum + secondNum).toFixed(2);
  }

  function subtraction(firstNum: number, secondNum: number) {
    interimResult = (firstNum - secondNum).toFixed(2);
  }

  function deleteLast() {
    // remove last number pushed
    if (numbers.length > 0) {
      numbers = numbers.slice(0, -1);
    } else if (input.length > 0) {
      // pop input if it's an operation
      if (operations.includes(input[input.length - 1])) {
        input = input.slice(0, -1);
      } else {
        // set the last input value to the new number so that new numbers can be concatenated
        numbers = input[-1]
        numbers = numbers.slice(0, -1);
        input = input.slice(0, -1);
      }
    }
    display();
  }
  // reset display string and cause re-render
  function display() {
    if (input.length === 0) {
      displayString = [numbers]
    } else {
      displayString = [...input, numbers]
    }
    setScreenStr(displayString.join(''))
  }


  return (
    <div className="main">
      <section className="calculator-body">
        <div className="input-logo">
          <div className="top-bar">
            <input type="text" readOnly={true} value={screenStr} id="calculator-input" />
            <button onClick= {()=>deleteLast()}className="del-button">del</button>
          </div>
          <img src={logo} className="teutsch-logo" alt="Teutsch Partners Real Estate Services" />
        </div>
        <div>
          <button onClick={() => pushInput('+')} className="calculator-button">+</button>
          <button onClick={() => pushInput('-')} className="calculator-button">-</button>
          <button onClick={() => pushInput('*')} className="calculator-button">X</button>
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
          <button onClick={() => pushInput('0')} className="calculator-button">0</button>
          <button onClick={() => pushInput('.')} className="calculator-button">.</button>
          <button onClick={() => pushInput('=')} className="calculator-button">=</button>
        </div>
      </section>
    </div>
  );
}

export default App;
