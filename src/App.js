import logo from './logo.svg';
import './App.css';
import AppRouter from './AppRouter';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Deepfake Detection</h1>
      </header>
      <main>
        <AppRouter />
      </main>
    </div>
  );
}

export default App;
