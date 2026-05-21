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
    total_assets: 0
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
    <div className="space-y-8">
      
      {/* TITLE SECTION */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Overview sistem dan aktivitas pengguna FineXa</p>
      </div>

      {/* 3 STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-start">
            <span className="p-3 bg-gray-50 rounded-xl text-xl">👥</span>
            <span className="text-emerald-500 text-xs font-bold flex items-center gap-1">↗ Live</span>
          </div>
          <span className="text-gray-400 text-xs font-medium mt-4">Total Users</span>
          <span className="text-3xl font-bold text-gray-800 mt-1">{stats.total_users}</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-start">
            <span className="p-3 bg-gray-50 rounded-xl text-xl">📈</span>
            <span className="text-emerald-500 text-xs font-bold flex items-center gap-1">↗ Live</span>
          </div>
          <span className="text-gray-400 text-xs font-medium mt-4">Active Sessions / Month</span>
          <span className="text-3xl font-bold text-gray-800 mt-1">{stats.active_sessions}</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-start">
            <span className="p-3 bg-gray-50 rounded-xl text-xl">📄</span>
            <span className="text-emerald-500 text-xs font-bold flex items-center gap-1">↗ Live</span>
          </div>
          <span className="text-gray-400 text-xs font-medium mt-4">Content Items</span>
          <span className="text-3xl font-bold text-gray-800 mt-1">{stats.total_assets}</span>
        </div>
      </div>

      {/* CHARTS ROW (RECHARTS LIBRARY) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm lg:col-span-2 flex flex-col h-80">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Pertumbuhan Pengguna</h3>
          <div className="flex-1 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" domain={[0, 6000]} />
                <Tooltip />
                <Line type="monotone" dataKey="pengguna" stroke="#10B981" strokeWidth={3} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col h-80">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Distribusi Profil Risiko</h3>
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
          <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-bold mt-2">
            {pieData.map((item) => (
              <div key={item.name} className="flex flex-col items-center">
                <span className="flex items-center gap-1 text-gray-500 font-medium">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                  {item.name}
                </span>
                <span className="text-gray-800 mt-0.5">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TABEL PENGGUNA TERBARU */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h3 className="font-bold text-lg text-gray-800">Pengguna Terbaru</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-500 text-xs font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Nama</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Tanggal Daftar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="text-center py-10">Memuat data pengguna...</td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-10">Belum ada pengguna terdaftar.</td>
                </tr>
              ) : (
                users.map((user, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/80 transition">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                      <span className="font-semibold text-gray-900">{user.nama_lengkap}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600 uppercase">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {user.created_at ? user.created_at.split('T')[0] : '-'}
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