import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLayout from './components/admin/AdminLayout';
import LoginAdmin from './pages/admin/LoginAdmin';
import DashboardAdmin from './pages/admin/DashboardAdmin';
import UserManagementAdmin from './pages/admin/UserManagementAdmin';
import FaqManagementAdmin from './pages/admin/FaqManagementAdmin';
import AnalyticsAdmin from './pages/admin/AnalyticsAdmin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rute Login Admin */}
        <Route path="/admin/login" element={<LoginAdmin />} />

        {/* Rute Dashboard Khusus Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardAdmin />} />
          <Route path="user-management" element={<UserManagementAdmin />} />
          <Route path="faq-management" element={<FaqManagementAdmin />} />
          <Route path="analytics" element={<AnalyticsAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;