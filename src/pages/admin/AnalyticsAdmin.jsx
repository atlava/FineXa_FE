import { Eye, Users, Zap } from 'lucide-react';

const AnalyticsAdmin = () => {
  // DATA MOCKUP TOP PERFORMING CONTENT SESUAI FIGMA
  const analyticsData = [
    { id: 1, title: 'Apa itu FineXa?', views: '3,200', engagement: '85%', progress: 'w-[85%]' },
    { id: 2, title: 'Bagaimana sistem rekomendasi investasi FineXa bekerja?', views: '2,100', engagement: '78%', progress: 'w-[78%]' },
    { id: 3, title: 'Apa saja yang dipelajari di Edukasi Investasi FineXa?', views: '1,560', engagement: '72%', progress: 'w-[72%]' },
    { id: 4, title: 'Apa itu Profil Risiko?', views: '1,250', engagement: '68%', progress: 'w-[68%]' },
    { id: 5, title: 'Bagaimana perlindungan data pengguna di FineXa?', views: '890', engagement: '65%', progress: 'w-[65%]' },
    { id: 6, title: 'Bagaimana perlindungan data pengguna di FineXa?', views: '700', engagement: '70%', progress: 'w-[70%]' },
  ];

  return (
    <div className="space-y-6">
      
      {/* 1. TITLE SECTION */}
      <div>
        <h1 className="text-3xl font-bold text-gray-950 tracking-tight">Analytics</h1>
        <p className="text-gray-500 text-sm mt-1">Insight dan performa platform FineXa</p>
      </div>

      {/* 2. THREE STATS CARDS WITH PERFORMANCE INDICATORS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Total FAQ Views */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="p-2.5 bg-emerald-50 rounded-xl max-w-max text-emerald-600">
              <Eye className="w-5 h-5" />
            </div>
            <p className="text-xs font-semibold text-gray-400 mt-4 tracking-wide">Total FAQ Views</p>
            <p className="text-3xl font-extrabold text-gray-900 mt-1">9,700</p>
          </div>
          <span className="text-[11px] font-bold text-emerald-500 mt-4 flex items-center gap-1">
            +12.5% dari minggu lalu
          </span>
        </div>

        {/* Card 2: Active Users */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="p-2.5 bg-blue-50 rounded-xl max-w-max text-blue-600">
              <Users className="w-5 h-5" />
            </div>
            <p className="text-xs font-semibold text-gray-400 mt-4 tracking-wide">Active Users</p>
            <p className="text-3xl font-extrabold text-gray-900 mt-1">3,130</p>
          </div>
          <span className="text-[11px] font-bold text-emerald-500 mt-4 flex items-center gap-1">
            +8.2% dari minggu lalu
          </span>
        </div>

        {/* Card 3: Avg. Engagement */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="p-2.5 bg-emerald-50 rounded-xl max-w-max text-emerald-600">
              <Zap className="w-5 h-5" />
            </div>
            <p className="text-xs font-semibold text-gray-400 mt-4 tracking-wide">Avg. Engagement</p>
            <p className="text-3xl font-extrabold text-gray-900 mt-1">73.5%</p>
          </div>
          <span className="text-[11px] font-bold text-red-500 mt-4 flex items-center gap-1">
            -2.3% dari minggu lalu
          </span>
        </div>

      </div>

      {/* 3. TABLE: TOP PERFORMING CONTENT */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h3 className="font-bold text-lg text-gray-800">Top Performing Content</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-400 text-xs font-bold border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 w-[50%]">Judul</th>
                <th className="px-6 py-4 text-center">Views</th>
                <th className="px-6 py-4 text-center">Engagement</th>
                <th className="px-6 py-4">Performance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
              {analyticsData.map((data) => (
                <tr key={data.id} className="hover:bg-gray-50/40 transition">
                  {/* Judul Konten */}
                  <td className="px-6 py-4.5 font-bold text-gray-900 text-sm max-w-md truncate">
                    {data.title}
                  </td>
                  {/* Views */}
                  <td className="px-6 py-4.5 text-center text-gray-600 font-semibold">{data.views}</td>
                  {/* Engagement */}
                  <td className="px-6 py-4.5 text-center text-gray-600 font-semibold">{data.engagement}</td>
                  {/* Performance Progress Bar */}
                  <td className="px-6 py-4.5 w-48">
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div className={`bg-emerald-500 h-full rounded-full ${data.progress}`}></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default AnalyticsAdmin;