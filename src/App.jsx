import { Routes, Route } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import './App.css';

function App() {
  return (
    <div className="app">
      <NavigationBar />
      <main className="site-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
