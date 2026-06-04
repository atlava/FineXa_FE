import { BrowserRouter, Routes, Route } from 'react-router-dom';

// IMPORT user
import UserLayout from './layout/UserLayout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register'; 
import LupaPassword from './pages/auth/LupaPassword';
import AturUlangPassword from './pages/auth/AturUlangPassword';
import Profil from './pages/user/Profil'; 
import FAQ from './pages/user/FAQ'; 
import Dashboard from './pages/user/Dashboard'; 
import Kuisioner from './pages/user/Kuisioner'; 
import HasilAnalisis from './pages/user/HasilAnalisis';
import NotFound from './pages/NotFound'; 
import SyaratKetentuan from './pages/auth/SyaratKetentuan';

// IMPORT Admin
import AdminLayout from './components/admin/AdminLayout';

import DashboardAdmin from './pages/admin/DashboardAdmin';
import UserManagementAdmin from './pages/admin/UserManagementAdmin';
import FaqManagementAdmin from './pages/admin/FaqManagementAdmin';
import AnalyticsAdmin from './pages/admin/AnalyticsAdmin';


import './index.css'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
       
        {/* RUTE AUTH & USER  */}
       
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/lupa-password" element={<LupaPassword />} />
        <Route path="/atur-ulang-password" element={<AturUlangPassword />} />
        <Route path="/terms" element={<SyaratKetentuan />} />

        {/* Rute User (Dibungkus pakai UserLayout biar ada Navigasinya) */}
        <Route element={<UserLayout />}>
          <Route path="/profil" element={<Profil />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/dashboard" element={<Dashboard />} /> 
          <Route path="/kuisioner" element={<Kuisioner />} /> 
          <Route path="/hasil-analisis" element={<HasilAnalisis />} />
        </Route>


      

        {/* Rute Dashboard Khusus Admin */}
        <Route path="/admin-dashboard" element={<AdminLayout />}>
          <Route index element={<DashboardAdmin />} />
          <Route path="user-management" element={<UserManagementAdmin />} />
          <Route path="faq-management" element={<FaqManagementAdmin />} />
          <Route path="analytics" element={<AnalyticsAdmin />} />
        </Route>

        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;   