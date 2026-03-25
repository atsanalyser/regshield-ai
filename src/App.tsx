import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Shell from './components/layout/Shell';
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';
import RiskResult from './pages/RiskResult';
import Workflow from './pages/Workflow';
import Alerts from './pages/Alerts';
import Templates from './pages/Templates';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function App() {
  return (
    <AppProvider>
      <Router>
      <Routes>
        <Route path="/" element={<Shell />}>
          <Route index element={<Dashboard />} />
          <Route path="onboarding" element={<Onboarding />} />
          <Route path="risk-result/:id" element={<RiskResult />} />
          <Route path="workflow" element={<Workflow />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="templates" element={<Templates />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
    </AppProvider>
  );
}

export default App;
