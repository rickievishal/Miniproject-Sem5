import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router';
import ReaderPage from './pages/ReaderPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ReaderPage />} />
      </Routes>
    </div>
  );
}

export default App;
