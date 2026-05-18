import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';

const DashboardAdmin = () => {
  // 1. DATA UNTUK GRAFIK GARIS (LINE CHART)
  const lineData = [
    { name: 'Jan', pengguna: 3100 },
    { name: 'Feb', pengguna: 3600 },
    { name: 'Mar', pengguna: 4100 },
    { name: 'Apr', pengguna: 4500 },
    { name: 'May', pengguna: 4900 },
    { name: 'Jun', pengguna: 5247 },
  ];

  // 2. DATA UNTUK GRAFIK LINGKARAN (PIE / DONUT CHART)
  const pieData = [
    { name: 'Konservatif', value: 35, color: '#3B82F6' }, // Biru
    { name: 'Moderat', value: 45, color: '#10B981' },     // Hijau
    { name: 'Agresif', value: 20, color: '#F59E0B' },      // Amber/Kuning
  ];

  // 3. DATA UNTUK TABEL PENGGUNA TERBARU
  const users = [
    { name: 'Budi Santoso', email: 'budi@email.com', role: 'Moderat', date: '8/4/2026', roleColor: 'bg-emerald-50 text-emerald-600' },
    { name: 'Siti Aminah', email: 'siti@email.com', role: 'Konservatif', date: '7/4/2026', roleColor: 'bg-blue-50 text-blue-600' },
    { name: 'Ahmad Rizki', email: 'ahmad@email.com', role: 'Agresif', date: '6/4/2026', roleColor: 'bg-amber-50 text-amber-600' },
    { name: 'Dewi Lestari', email: 'dewi@email.com', role: 'Moderat', date: '5/4/2026', roleColor: 'bg-emerald-50 text-emerald-600' },
  ];

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
            <span className="text-emerald-500 text-xs font-bold flex items-center gap-1">↗ +12.5%</span>
          </div>
          <span className="text-gray-400 text-xs font-medium mt-4">Total Users</span>
          <span className="text-3xl font-bold text-gray-800 mt-1">5,247</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-start">
            <span className="p-3 bg-gray-50 rounded-xl text-xl">📈</span>
            <span className="text-emerald-500 text-xs font-bold flex items-center gap-1">↗ +8.2%</span>
          </div>
          <span className="text-gray-400 text-xs font-medium mt-4">Active Sessions / Month</span>
          <span className="text-3xl font-bold text-gray-800 mt-1">892</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-start">
            <span className="p-3 bg-gray-50 rounded-xl text-xl">📄</span>
            <span className="text-emerald-500 text-xs font-bold flex items-center gap-1">↗ +24</span>
          </div>
          <span className="text-gray-400 text-xs font-medium mt-4">Content Items</span>
          <span className="text-3xl font-bold text-gray-800 mt-1">9,700</span>
        </div>
      </div>

      {/* CHARTS ROW (RECHARTS LIBRARY) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Kiri: Pertumbuhan Pengguna (Line Chart Asli) */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm lg:col-span-2 flex flex-col h-80">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Pertumbuhan Pengguna</h3>
          <div className="flex-1 w-full text-xs">
            <ResponsiveContainer width="100%" h="100%">
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

        {/* Kanan: Distribusi Profil Risiko (Donut Chart Asli) */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col h-80">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Distribusi Profil Risiko</h3>
          <div className="flex-1 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" h="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Keterangan Persentase */}
          <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-bold mt-2">
            {pieData.map((item) => (
              <div key={item.name} className="flex flex-col items-center">
                <span className="flex items-center gap-1 text-gray-500 font-medium">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                  {item.name}
                </span>
                <span className="text-gray-800 mt-0.5">{item.value}%</span>
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
                <th className="px-6 py-4">Profil Risiko</th>
                <th className="px-6 py-4">Tanggal Daftar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {users.map((user, idx) => (
                <tr key={idx} className="hover:bg-gray-50/80 transition">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                    <span className="font-semibold text-gray-900">{user.name}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${user.roleColor}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{user.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default DashboardAdmin;