import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, BarChart3, LogOut, TrendingUp, Menu, X } from 'lucide-react';
import { useState } from 'react';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  
  // State untuk mengontrol pop-up logout & menu mobile
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // <-- State baru untuk HP

  const menuItems = [
    { name: 'Dashboard', path: '/admin-dashboard', icon: LayoutDashboard },
    { name: 'User Management', path: '/admin-dashboard/user-management', icon: Users },
    { name: 'FAQ Management', path: '/admin-dashboard/faq-management', icon: FileText },
    { name: 'Analytics', path: '/admin-dashboard/analytics', icon: BarChart3 },
  ];

  //  FUNGSI LOGOUT 
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // 1. Telpon Dapur Laravel untuk menghancurkan Token di server (Jika token masih ada)
      if (token) {
        await fetch(import.meta.env.VITE_API_URL + '/logout', {
          method: 'POST', 
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat logout:", error);
    } finally {
      // 2. Apapun balasan dari server (sukses/error), KITA WAJIB MEMBERSIHKAN BRANKAS!
      localStorage.removeItem('token');
      localStorage.removeItem('role'); // Jangan lupa hapus role juga!
      
      // 3. Tutup modal pop-up
      setIsLogoutModalOpen(false); 
      
      // 4. Arahkan kembali ke halaman login
      navigate('/login'); 
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans antialiased w-full overflow-x-hidden">
      
      {/* ==========================================
          1. TOP BAR (KHUSUS MUNCUL DI HP)
          ========================================== */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-white h-16 border-b border-gray-100 flex items-center justify-between px-4 z-40 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-finexa rounded-lg flex items-center justify-center text-white shadow-sm">
            <TrendingUp className="w-5 h-5 stroke-[2.5]" />
          </div>
          <span className="text-xl font-bold text-finexa tracking-wide ml-1">FineXa</span>
        </div>
        
        {/* Tombol Hamburger */}
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* ==========================================
          2. OVERLAY GELAP (KHUSUS HP SAAT MENU DIBUKA)
          ========================================== */}
      {isMobileMenuOpen && (
        <div 
          onClick={() => setIsMobileMenuOpen(false)}
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
        />
      )}

      {/* ==========================================
          3. SIDEBAR UTAMA (Responsif Geser)
          ========================================== */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col h-full 
        transition-transform duration-300 ease-in-out md:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        
        {/* Brand Logo Area */}
        <div className="p-6 border-b border-gray-100 relative">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-finexa rounded-lg flex items-center justify-center text-white shadow-sm">
              <TrendingUp className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="text-2xl font-bold text-finexa tracking-wide ml-1">FineXa</span>
          </div>
          <div className="mt-2">
            <span className="text-[10px] font-semibold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
              Admin Panel
            </span>
          </div>

          {/* Tombol Silang Tutup (Khusus HP) */}
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden absolute right-4 top-6 p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Menus */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const IconComponent = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)} // Tutup menu setelah diklik di HP
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-600 shadow-sm'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                }`}
              >
                <IconComponent className={`w-5 h-5 ${isActive ? 'text-emerald-600' : 'text-gray-400'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={() => {
              setIsMobileMenuOpen(false); // Tutup sidebar dulu
              setIsLogoutModalOpen(true); // Baru buka modal
            }}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 rounded-xl hover:bg-red-50 transition-all cursor-pointer"
          >
            <LogOut className="w-5 h-5 text-red-500" /> Keluar
          </button>
        </div>
      </aside>

      {/* ==========================================
          4. MAIN CONTENT CONTAINER
          ========================================== */}
      {/* Ubah pl-64 jadi md:pl-64 supaya di HP nge-full, dan tambah pt-16 buat jarak top bar HP */}
      <div className="flex-1 md:pl-64 flex flex-col min-w-0 pt-16 md:pt-0 w-full">
        <main className="p-4 md:p-8 bg-gray-50 min-h-screen w-full box-border">
          <Outlet />
        </main>
      </div>

      {/* ======================================================== */}
      {/* POP UP MODAL: LOGOUT CONFIRMATION (PERSIS FIGMA) */}
      {/* ======================================================== */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] animate-fade-in p-4">
          <div className="bg-white rounded-3xl w-full max-w-[450px] p-8 md:p-10 shadow-2xl relative text-center">
            
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 tracking-tight">
              Kamu yakin ingin keluar?
            </h3>
            
            <p className="text-gray-500 text-sm md:text-[15px] mb-8 leading-relaxed px-2 md:px-4">
              Sesi Anda akan diakhiri. Anda perlu login kembali untuk mengakses FineXa.
            </p>
            
            {/* Tombol Aksi */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <button 
                onClick={() => setIsLogoutModalOpen(false)}
                className="w-full sm:w-auto px-7 py-3 bg-finexa hover:bg-finexaDark text-white rounded-full text-sm font-bold transition-all shadow-sm"
              >
                Tidak, Kembali
              </button>
              <button 
                onClick={handleLogout}
                className="w-full sm:w-auto px-7 py-3 bg-[#EF4444] hover:bg-red-600 text-white rounded-full text-sm font-bold transition-all shadow-sm"
              >
                Ya, Keluar
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminLayout;