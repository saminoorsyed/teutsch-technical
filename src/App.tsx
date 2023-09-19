import logo from "./images/teutsch.png";
import "./App.css";



function App(): JSX.Element {
  return (
    <div className="main">
      <section className="calculator-body">
        <div className="input-logo">
          <div className="top-bar">
            <input type="text" value={"TODO: make this work ;)"} id="calculator-input" />
            <button className="del-button">del</button>
          </div>
          <img src={logo} className="teutsch-logo" alt="logo" />
        </div>
        <div>
          <button className="calculator-button">+</button>
          <button className="calculator-button">-</button>
          <button className="calculator-button">*</button>
          <button className="calculator-button">^</button>
        </div>
        <div>
          <button className="calculator-button">7</button>
          <button className="calculator-button">8</button>
          <button className="calculator-button">9</button>
        </div>
        <div>
          <button className="calculator-button">4</button>
          <button className="calculator-button">5</button>
          <button className="calculator-button">6</button>
        </div>
        <div>
          <button className="calculator-button">1</button>
          <button className="calculator-button">2</button>
          <button className="calculator-button">3</button>
        </div>
      </section>
    </div>
  );
}

export default App;
