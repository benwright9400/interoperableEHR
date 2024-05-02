import "./App.css";

function getMainAppToken() {
  return window.mainAppToken;
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>This is the react plugin for the testing plugin {getMainAppToken()}.</p>
      </header>
    </div>
  );
}

export default App;
