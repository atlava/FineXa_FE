import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import Layout
import UserLayout from './layout/UserLayout';

// Import Auth
import Login from './pages/auth/Login';
import Register from './pages/auth/Register'; 
import LupaPassword from './pages/auth/LupaPassword';
import AturUlangPassword from './pages/auth/AturUlangPassword';

// Import User
import Profil from './pages/user/Profil'; 
import FAQ from './pages/user/FAQ'; 
import Dashboard from './pages/user/Dashboard'; 
import Kuisioner from './pages/user/Kuisioner'; 
import HasilAnalisis from './pages/user/HasilAnalisis';

// Import NotFound (Nanti kita bikin filenya)
import NotFound from './pages/NotFound'; 

import './index.css'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rute Auth (Bebas, nggak pakai sidebar) */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/lupa-password" element={<LupaPassword />} />
        <Route path="/atur-ulang-password" element={<AturUlangPassword />} />

        {/* Rute User (Dibungkus pakai UserLayout biar ada Navigasinya) */}
        <Route element={<UserLayout />}>
          <Route path="/profil" element={<Profil />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/dashboard" element={<Dashboard />} /> 
          <Route path="/kuisioner" element={<Kuisioner />} /> 
          <Route path="/hasil-analisis" element={<HasilAnalisis />} />
        </Route>

        {/* Rute Nyasar (404 Not Found) - WAJIB ADA DI PALING BAWAH */}
        {/* 2. Matiin rutenya */}
        { <Route path="*" element={<NotFound />} /> }

      </Routes>
    </BrowserRouter>
  );
}

export default App;