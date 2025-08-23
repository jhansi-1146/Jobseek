import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import UserDashboard from './pages/user/UserDashboard';
import SkillGapAnalyzer from './pages/user/SkillGapAnalyzer';
import ApplicationTracker from './pages/user/ApplicationTracker';
import JobComparison from './pages/user/JobComparison';
import PersonalGrowth from './pages/user/PersonalGrowth';
import PeerComparison from './pages/user/PeerComparison';
import Profile from './pages/user/Profile';
import Settings from './pages/user/Settings';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import RoleLibrary from './pages/admin/RoleLibrary';
import Analytics from './pages/admin/Analytics';
import AdminSettings from './pages/admin/Settings';
import AnalysisPage from './pages/user/AnalysisPage';
import CertificationsPage from './pages/user/CertificationsPage';
import ProgressPage from './pages/user/ProgressPage';
import SignupPage from './pages/SignupPage';
import VerificationPage from './pages/VerificationPage';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verification" element={<VerificationPage />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/user/skill-gap" element={<SkillGapAnalyzer />} />
        <Route path="/user/tracker" element={<ApplicationTracker />} />
        <Route path="/user/job-compare" element={<JobComparison />} />
        <Route path="/user/growth" element={<PersonalGrowth />} />
        <Route path="/user/peer-compare" element={<PeerComparison />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/settings" element={<Settings />} /> {/* ✅ Route to Settings page */}
        <Route path="/analysis" element={<AnalysisPage />} />
        <Route path="/certifications" element={<CertificationsPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/roles" element={<RoleLibrary />} />
        <Route path="/admin/analytics" element={<Analytics />} />
        <Route path="/admin/profile" element={<Profile />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
      </Routes>
    </div>
  );
}


export default App;
