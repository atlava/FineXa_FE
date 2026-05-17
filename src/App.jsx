// 1. AREA IMPORT (Kenalan)
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './components/admin/AdminLayout'; 
import DashboardAdmin from './pages/DashboardAdmin';
import './App.css'; 

function App() {
  // 2. AREA PETA JALAN (Routing)
  return (
    <Router>
      <Routes>
        
        {/* Rute Khusus Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardAdmin />} />
        </Route>

        {/* Nanti rute investor temanmu bisa ditambahkan di bawah sini */}

      </Routes>
    </Router>
  );
}

export default App;