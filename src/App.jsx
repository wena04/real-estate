import { Navigate, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import HomeownersUnlockPage from './pages/HomeownersUnlockPage';
import HomeownersSellPage from './pages/HomeownersSellPage';
import HomeownersFeasibilityPage from './pages/HomeownersFeasibilityPage';
import ServicesDesignBuildPage from './pages/ServicesDesignBuildPage';
import ServicesConsultingPage from './pages/ServicesConsultingPage';
import ServicesCMPage from './pages/ServicesCMPage';
import InvestorsJoinPage from './pages/InvestorsJoinPage';
import InvestorsOverviewPage from './pages/InvestorsOverviewPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ContactPage from './pages/ContactPage';
import './App.css';

function App() {
  return (
    <div className="app">
      <NavigationBar />
      <main className="site-main">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/homeowners/unlock-lot" element={<HomeownersUnlockPage />} />
          <Route path="/homeowners/sell-home" element={<HomeownersSellPage />} />
          <Route path="/homeowners/feasibility-review" element={<HomeownersFeasibilityPage />} />

          <Route path="/services/design-build" element={<ServicesDesignBuildPage />} />
          <Route path="/services/development-consulting" element={<ServicesConsultingPage />} />
          <Route path="/services/construction-management" element={<ServicesCMPage />} />

          <Route path="/investors/join" element={<InvestorsJoinPage />} />
          <Route path="/investors/overview" element={<InvestorsOverviewPage />} />

          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />

          <Route path="/about" element={<Navigate to="/" replace />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
