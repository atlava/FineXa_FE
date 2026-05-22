import { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';

const DashboardAdmin = () => {
  // 1. STATE UNTUK GRAFIK (Biar bisa diubah oleh API)
  const [lineData, setLineData] = useState([]);
  const [pieData, setPieData] = useState([]);

  // ==========================================
  // AREA INTEGRASI API
  // ==========================================
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // 🌟 STATE BARU: Untuk menyimpan data 3 Kartu Statistik
  const [stats, setStats] = useState({
    total_users: 0,
    active_sessions: 0,
    total_faqs: 0
  });

  useEffect(() => {
    // Fungsi 1: Ambil data tabel pengguna
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8000/api/users', {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (data.status === 'success' && data.data) {
          setUsers(data.data.slice(0, 5)); 
        }
      } catch (error) {
        console.error("Gagal mengambil data user:", error);
      }
    };

    // 🌟 Fungsi 2: Ambil data API Paket Hemat untuk 3 Kartu Statistik
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8000/api/dashboard-stats', {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}` 
          }
        });
        const data = await response.json();
        
        if (data.status === 'success') {
          // Masukkan isi paket ke dalam state stats
          setStats(data.data);
          if (data.data.chart_pertumbuhan) {
            setLineData(data.data.chart_pertumbuhan);
          }
          if (data.data.chart_risiko) {
            const colors = ['#3B82F6', '#10B981', '#F59E0B'];
            const formattedPie = data.data.chart_risiko.map((item, index) => ({
              ...item,
              color: colors[index % colors.length]
            }));
            setPieData(formattedPie);
          }
        }
      } catch (error) {
        console.error("Gagal mengambil data statistik:", error);
      }
    };

    // Jalankan kedua fungsi di atas secara bersamaan
    setIsLoading(true);
    Promise.all([fetchUsers(), fetchStats()]).finally(() => {
      setIsLoading(false);
    });

  }, []);
  // ==========================================

  return (
    <div className="space-y-6 md:space-y-8">
      
      {/* TITLE SECTION */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
        <p className="text-gray-500 text-xs md:text-sm mt-1">Overview sistem dan aktivitas pengguna FineXa</p>
      </div>

      {/* 3 STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-start">
            <span className="p-2.5 bg-gray-50 rounded-xl text-lg md:text-xl">👥</span>
            <span className="text-emerald-500 text-xs font-bold flex items-center gap-1">↗ +12.5%</span>
          </div>
          <span className="text-gray-400 text-xs font-medium mt-4">Total Users</span>
          <span className="text-2xl md:text-3xl font-bold text-gray-800 mt-1">{stats.total_users}</span>
        </div>

        <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-start">
            <span className="p-2.5 bg-gray-50 rounded-xl text-lg md:text-xl">📈</span>
            <span className="text-emerald-500 text-xs font-bold flex items-center gap-1">↗ +8.2%</span>
          </div>
          <span className="text-gray-400 text-xs font-medium mt-4">Active Sessions / Month</span>
          <span className="text-2xl md:text-3xl font-bold text-gray-800 mt-1">{stats.active_sessions}</span>
        </div>

        <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:col-span-2 md:col-span-1">
          <div className="flex justify-between items-start">
            <span className="p-2.5 bg-gray-50 rounded-xl text-lg md:text-xl">📄</span>
            <span className="text-emerald-500 text-xs font-bold flex items-center gap-1">↗ +24</span>
          </div>
          <span className="text-gray-400 text-xs font-medium mt-4">Content Items</span>
          {/* Menggunakan stats.total_faqs sesuai perubahan backend kita pagi tadi */}
          <span className="text-2xl md:text-3xl font-bold text-gray-800 mt-1">{stats.total_faqs || 0}</span>
        </div>
      </div>

      {/* CHARTS ROW (RECHARTS LIBRARY) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        
        {/* Kiri: Pertumbuhan Pengguna (Line Chart Asli) */}
        <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-sm lg:col-span-2 flex flex-col h-64 md:h-80">
          <h3 className="text-base md:text-lg font-bold text-gray-800 mb-4">Pertumbuhan Pengguna</h3>
          <div className="flex-1 w-full text-[10px] md:text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis dataKey="name" stroke="#9CA3AF" tick={{ fontSize: 11 }} />
                <YAxis stroke="#9CA3AF" domain={[0, 6000]} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey="pengguna" stroke="#10B981" strokeWidth={3} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Kanan: Distribusi Profil Risiko (Donut Chart Asli) */}
        <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col h-72 md:h-80">
          <h3 className="text-base md:text-lg font-bold text-gray-800 mb-2">Distribusi Profil Risiko</h3>
          <div className="flex-1 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Keterangan Persentase */}
          <div className="grid grid-cols-3 gap-1 md:gap-2 text-center text-[10px] md:text-[11px] font-bold mt-2">
            {pieData.map((item) => (
              <div key={item.name} className="flex flex-col items-center">
                <span className="flex items-center gap-1 text-gray-500 font-medium">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }}></span>
                  <span className="truncate">{item.name}</span>
                </span>
                <span className="text-gray-800 mt-0.5">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TABEL PENGGUNA TERBARU */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 md:px-6 py-4 md:py-5 border-b border-gray-100">
          <h3 className="font-bold text-base md:text-lg text-gray-800">Pengguna Terbaru</h3>
        </div>
        
        {/* Wrapper overflow-x-auto untuk horizontal scroll di HP */}
        <div className="overflow-x-auto">
          {/* Tambahkan min-w-[600px] biar tabel nggak menciut berlebihan */}
          <table className="w-full text-left text-sm text-gray-600 min-w-[600px]">
            <thead className="bg-gray-50 text-gray-500 text-xs font-semibold uppercase tracking-wider">
              <tr>
                {/* whitespace-nowrap mencegah teks patah ke baris baru */}
                <th className="px-5 md:px-6 py-3 md:py-4 whitespace-nowrap">Nama</th>
                <th className="px-5 md:px-6 py-3 md:py-4 whitespace-nowrap">Email</th>
                <th className="px-5 md:px-6 py-3 md:py-4 whitespace-nowrap">Role</th>
                <th className="px-5 md:px-6 py-3 md:py-4 whitespace-nowrap">Tanggal Daftar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="text-center py-10 font-medium text-gray-500">Memuat data pengguna...</td>
                </tr>
              ) : !users || users.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-10 font-medium text-gray-500">Belum ada data pengguna.</td>
                </tr>
              ) : (
                users.map((user, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/80 transition">
                    <td className="px-5 md:px-6 py-3 md:py-4 flex items-center gap-3 whitespace-nowrap">
                      {/* Avatar otomatis pakai inisial nama */}
                      <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-emerald-100 text-emerald-600 flex-shrink-0 flex items-center justify-center font-bold text-xs">
                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <span className="font-semibold text-gray-900">{user.name || user.nama_lengkap}</span>
                    </td>
                    <td className="px-5 md:px-6 py-3 md:py-4 whitespace-nowrap text-gray-500">{user.email}</td>
                    <td className="px-5 md:px-6 py-3 md:py-4 whitespace-nowrap">
                      {/* Warna badge Role otomatis menyesuaikan admin/investor */}
                      <span className={`px-2.5 py-1 rounded-full text-[10px] md:text-xs font-bold ${user.role === 'admin' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-5 md:px-6 py-3 md:py-4 whitespace-nowrap text-gray-500">
                      {/* Ubah format tanggal asli Laravel biar rapi */}
                      {user.created_at ? new Date(user.created_at).toLocaleDateString('id-ID') : '-'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default DashboardAdmin;