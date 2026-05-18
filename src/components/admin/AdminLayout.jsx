import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, BarChart3, LogOut, TrendingUp } from 'lucide-react';
import { useState } from 'react';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  
  // State untuk mengontrol pop-up logout
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'User Management', path: '/admin/user-management', icon: Users },
    { name: 'FAQ Management', path: '/admin/faq-management', icon: FileText },
    { name: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
  ];

  // Fungsi eksekusi saat tombol "Ya, Keluar" diklik
  const handleLogout = () => {
    setIsLogoutModalOpen(false); // Tutup modal
    navigate('/admin/login');    // Arahkan kembali ke halaman login
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans antialiased w-full overflow-x-hidden">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full z-20">
        
        {/* Brand Logo Area */}
        <div className="p-6 border-b border-gray-100">
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
        </div>

        {/* Navigation Menus */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const IconComponent = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
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

        {/* Logout Button (Sekarang jadi tombol untuk memanggil pop-up) */}
        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={() => setIsLogoutModalOpen(true)}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 rounded-xl hover:bg-red-50 transition-all cursor-pointer"
          >
            <LogOut className="w-5 h-5 text-red-500" /> Keluar
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT CONTAINER */}
      <div className="flex-1 pl-64 w-[calc(100%-16rem)] flex flex-col min-w-0">
        <main className="p-6 md:p-8 bg-gray-50 min-h-screen w-full box-border">
          <Outlet />
        </main>
      </div>

      {/* ======================================================== */}
      {/* POP UP MODAL: LOGOUT CONFIRMATION (PERSIS FIGMA) */}
      {/* ======================================================== */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-3xl w-[450px] p-10 shadow-2xl relative text-center">
            
            <h3 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
              Kamu yakin ingin keluar?
            </h3>
            
            <p className="text-gray-500 text-[15px] mb-8 leading-relaxed px-4">
              Sesi Anda akan diakhiri. Anda perlu login kembali untuk mengakses FineXa.
            </p>
            
            {/* Tombol Aksi */}
            <div className="flex items-center justify-center gap-4">
              <button 
                onClick={() => setIsLogoutModalOpen(false)}
                className="px-7 py-3 bg-finexa hover:bg-finexaDark text-white rounded-full text-sm font-bold transition-all shadow-sm"
              >
                Tidak, Kembali
              </button>
              <button 
                onClick={handleLogout}
                className="px-7 py-3 bg-[#EF4444] hover:bg-red-600 text-white rounded-full text-sm font-bold transition-all shadow-sm"
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