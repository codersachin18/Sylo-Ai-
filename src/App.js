import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import GetApp from './pages/GetApp';
import FeaturesPage from './pages/FeaturesPage';
import ChatPage from './pages/ChatPage';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/get-app" element={<GetApp />} />
            <Route path="/features" element={<FeaturesPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
