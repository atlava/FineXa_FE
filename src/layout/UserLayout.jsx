import { useNavigate, Link, useLocation, Outlet } from 'react-router-dom';
import DashboardIconImg from '/images/Dashboard.svg';
import AnalisisIconImg from '/images/Analisis.svg';
import ProfilIconImg from '/images/Profil.svg';
import FAQIconImg from '/images/Faq.svg';
import KeluarIconImg from '/images/Keluar.svg';

const UserLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    // 1. Buang Token (KTP) dari ingatan browser
    localStorage.removeItem('token');
    
    // 2. Tendang user balik ke halaman Login
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FA] pt-16 pb-20 md:pt-0 md:pb-0">
      
      {/* 1. TOP BAR (MOBILE) */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-white z-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="bg-[#16A34A] p-1.5 rounded-xl flex items-center justify-center shadow-sm shadow-green-200">
          <img src="/images/Logo.svg" alt="Logo" className="w-7 h-7" />
          </div>
          <span className="text-xl font-bold text-gray-800">FineXa</span>
        </div>
        <button onClick={handleLogout} className="text-sm font-medium text-red-500">Keluar</button>
      </div>

      {/* 2. SIDEBAR (DESKTOP) */}
      <aside className="hidden md:flex w-64 bg-white border-r border-gray-100 flex-col p-6 fixed h-full z-40">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-[#16A34A] p-1.5 rounded-xl flex items-center justify-center shadow-sm shadow-green-200">
          <img src="/images/Logo.svg" alt="Logo" className="w-8 h-8" />
          </div>
          <span className="text-xl font-bold text-gray-800">FineXa</span>
        </div>
        <nav className="flex flex-col gap-2 flex-grow">
          <Link to="/dashboard" className={`flex items-center gap-3 p-3 rounded-xl transition-all ${location.pathname === '/dashboard' ? 'bg-green-50 text-[#51BA55] font-semibold' : 'text-gray-500 hover:bg-gray-50'}`}>
            <img src="/images/Dashboard.svg" alt="Dashboard" className="w-6 h-6" />
            <span className="text-base">Dashboard</span>
          </Link>

          <Link to="/hasil-analisis" className={`flex items-center gap-3 p-3 rounded-xl transition-all ${location.pathname === '/hasil-analisis' ? 'bg-green-50 text-[#51BA55] font-semibold' : 'text-gray-500 hover:bg-gray-50'}`} >
            <img src="/images/Analisis.svg" alt="Hasil Analisis" className="w-6 h-6" />
            <span className="text-base">Hasil Analisis</span>
          </Link>

          <Link to="/profil" className={`flex items-center gap-3 p-3 rounded-xl transition-all ${location.pathname === '/profil' ? 'bg-green-50 text-[#51BA55] font-semibold' : 'text-gray-500 hover:bg-gray-50'}`} >
            <img src="/images/Profil.svg" alt="Profil" className="w-6 h-6" />
            <span className="text-base">Profil</span>
          </Link>

          <Link to="/faq" className={`flex items-center gap-3 p-3 rounded-xl transition-all ${location.pathname === '/faq' ? 'bg-green-50 text-[#51BA55] font-semibold' : 'text-gray-500 hover:bg-gray-50'}`} >
            <img src="/images/Faq.svg" alt="Profil" className="w-6 h-6" />
            <span className="text-base">FAQ</span>
          </Link>

        </nav>
        <div className="bg-[#51BA55] p-4 rounded-2xl text-white mb-6">
          <p className="text-xs opacity-80 mb-1 font-light">Tipe Investasi</p>
          <p className="text-sm font-semibold leading-tight text-white">Diversifikasi aset sangat disarankan.</p>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-3 p-3 text-red-500 font-medium hover:bg-red-50 rounded-xl transition-all mt-auto">
          <img src="/images/Keluar.svg" alt="Keluar" className="w-6 h-6" />
          <span className="text-base">Keluar</span>
        </button>
      </aside>

      {/* 3. BOTTOM NAV (MOBILE) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white z-50 border-t border-gray-100 flex justify-around items-center px-2 py-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <Link to="/dashboard" className={`flex flex-col items-center gap-1 p-2 ${location.pathname === '/dashboard' ? 'text-[#51BA55]' : 'text-gray-400'}`}>
          <img 
            src="/images/Dashboard.svg" 
            alt="Dashboard" 
            className={`w-6 h-6 transition-all ${location.pathname === '/dashboard' ? '' : 'opacity-50 grayscale'}`} />
          <span className="text-[10px] font-medium">Home</span>
        </Link>

        <Link to="/hasil-analisis" className={`flex flex-col items-center gap-1 p-2 ${location.pathname === '/hasil-analisis' ? 'text-[#51BA55]' : 'text-gray-400'}`}>
          <img 
            src="/images/Analisis.svg" 
            alt="Analisis" 
            className={`w-6 h-6 transition-all ${location.pathname === '/Analisis' ? '' : 'opacity-50 grayscale'}`} 
          />
          <span className="text-[10px] font-medium">Hasil</span>
        </Link>

        <Link to="/profil" className={`flex flex-col items-center gap-1 p-2 ${location.pathname === '/profil' ? 'text-[#51BA55]' : 'text-gray-400'}`}>
          <img 
            src="/images/Profil.svg" 
            alt="Profil" 
            className={`w-6 h-6 transition-all ${location.pathname === '/profil' ? '' : 'opacity-50 grayscale'}`} 
          />
          <span className="text-[10px] font-medium">Profil</span>
        </Link>

        <Link to="/faq" className={`flex flex-col items-center gap-1 p-2 ${location.pathname === '/faq' ? 'text-[#51BA55]' : 'text-gray-400'}`}>
          <img 
            src="/images/Faq.svg" 
            alt="FAQ" 
            className={`w-6 h-6 transition-all ${location.pathname === '/faq' ? '' : 'opacity-50 grayscale'}`} 
          />
          <span className="text-[10px] font-medium">FAQ</span>
        </Link>
        
      </nav>

      {/* 4. KONTEN UTAMA HALAMAN */}
      <main className="flex-grow ml-0 md:ml-64 p-6 md:p-8">
        {/* <Outlet /> ini adalah portal ajaib. Isi halaman Dashboard, Profil, dll bakal muncul di sini otomatis! */}
        <Outlet /> 
      </main>

    </div>
  );
};

export default UserLayout;