// 1. AREA IMPORT (Kenalan)
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './components/admin/AdminLayout'; 
import DashboardAdmin from './pages/admin/DashboardAdmin';
import LoginAdmin from './pages/admin/LoginAdmin'; // <-- Tambahkan baris ini
import './App.css'; 

function App() {
  // 2. AREA PETA JALAN (Routing)
  return (
    <Router>
      <Routes>
        
        {/* Rute Halaman Login Admin (Berdiri sendiri tanpa Layout Sidebar) */}
        <Route path="/admin/login" element={<LoginAdmin />} />

        {/* Rute Dashboard Khusus Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardAdmin />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;