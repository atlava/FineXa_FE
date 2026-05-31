import { useState, useEffect } from 'react';
import { Eye, Users, Zap } from 'lucide-react';

const AnalyticsAdmin = () => {
  // 1. STATE UNTUK DATA DINAMIS DARI API
  const [analyticsData, setAnalyticsData] = useState([]);
  const [stats, setStats] = useState({
    total_views: 0,
    active_users: 0,
    avg_engagement: 0,
    views_growth: 0,
    users_growth: 0,
    engagement_growth: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  // ==========================================
  // AREA INTEGRASI API (Menarik Data Asli)
  // ==========================================
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8000/api/analytics', {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        
        if (data.status === 'success') {
          setStats(data.data.stats);
          setAnalyticsData(data.data.top_content);
        }
      } catch (error) {
        console.error("Gagal mengambil data analytics:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, []);
  // ==========================================

  return (
    <div className="space-y-4 md:space-y-6">
      
      {/* 1. TITLE SECTION */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-950 tracking-tight">Analytics 👁️👁️</h1>
        <p className="text-gray-500 text-xs md:text-sm mt-1">Insight dan performa platform FineXa</p>
      </div>

      {/* 2. THREE STATS CARDS WITH PERFORMANCE INDICATORS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        
        {/* Card 1: Total FAQ Views */}
        <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="p-2 md:p-2.5 bg-emerald-50 rounded-xl max-w-max text-emerald-600">
              <Eye className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <p className="text-[11px] md:text-xs font-semibold text-gray-400 mt-4 tracking-wide">Total FAQ Views</p>
            <p className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-1">
              {isLoading ? '...' : stats.total_views.toLocaleString('id-ID')}
            </p>
          </div>
          <span className={`text-[10px] md:text-[11px] font-bold mt-4 flex items-center gap-1 ${stats.views_growth >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
            {stats.views_growth >= 0 ? '↗ +' : '↘ '}{stats.views_growth}% dari minggu lalu
          </span>
        </div>

        {/* Card 2: Active Users */}
        <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="p-2 md:p-2.5 bg-blue-50 rounded-xl max-w-max text-blue-600">
              <Users className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <p className="text-[11px] md:text-xs font-semibold text-gray-400 mt-4 tracking-wide">Login Sessions</p>
            <p className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-1">
              {isLoading ? '...' : stats.active_users.toLocaleString('id-ID')}
            </p>
          </div>
          <span className={`text-[10px] md:text-[11px] font-bold mt-4 flex items-center gap-1 ${stats.users_growth >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
            {stats.users_growth >= 0 ? '↗ +' : '↘ '}{stats.users_growth}% dari minggu lalu
          </span>
        </div>

        {/* Card 3: Avg. Engagement */}
        <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between sm:col-span-2 md:col-span-1">
          <div>
            <div className="p-2 md:p-2.5 bg-emerald-50 rounded-xl max-w-max text-emerald-600">
              <Zap className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <p className="text-[11px] md:text-xs font-semibold text-gray-400 mt-4 tracking-wide">Avg. Engagement</p>
            <p className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-1">
              {isLoading ? '...' : `${stats.avg_engagement}%`}
            </p>
          </div>
          <span className={`text-[10px] md:text-[11px] font-bold mt-4 flex items-center gap-1 ${stats.engagement_growth >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
            {stats.engagement_growth >= 0 ? '↗ +' : '↘ '}{stats.engagement_growth}% dari minggu lalu
          </span>
        </div>

      </div>

      {/* 3. TABLE: TOP PERFORMING CONTENT */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 md:px-6 py-4 md:py-5 border-b border-gray-100">
          <h3 className="font-bold text-base md:text-lg text-gray-800">Top Performing Content 📈</h3>
        </div>
        
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"></div>  
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600 min-w-[600px]">
            <thead className="bg-emerald-50 text-gray-700 text-[10px] md:text-xs font-bold border-b border-gray-100 uppercase tracking-wider">
              <tr>
                <th className="px-5 md:px-6 py-3 md:py-4 w-[50%] whitespace-nowrap">Judul</th>
                <th className="px-5 md:px-6 py-3 md:py-4 text-center whitespace-nowrap">Views</th>
                <th className="px-5 md:px-6 py-3 md:py-4 text-center whitespace-nowrap">Engagement</th>
                <th className="px-5 md:px-6 py-3 md:py-4 whitespace-nowrap">Performance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="text-center py-10 text-gray-400">Memuat data analitik...</td>
                </tr>
              ) : analyticsData.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-10 text-gray-400">Belum ada data analitik tersedia.</td>
                </tr>
              ) : (
                analyticsData.map((data, index) => (
                  <tr key={index} className="hover:bg-gray-50/40 transition">
                    <td className="px-5 md:px-6 py-3 md:py-4.5 font-bold text-gray-900 text-[11px] md:text-sm max-w-[200px] md:max-w-md truncate">
                      {data.title}
                    </td>
                    <td className="px-5 md:px-6 py-3 md:py-4.5 text-center text-gray-600 font-semibold text-[11px] md:text-sm">
                      {data.views.toLocaleString('id-ID')}
                    </td>
                    <td className="px-5 md:px-6 py-3 md:py-4.5 text-center text-gray-600 font-semibold text-[11px] md:text-sm">
                      {data.engagement}%
                    </td>
                    <td className="px-5 md:px-6 py-3 md:py-4.5 w-32 md:w-48">
                      <div className="w-full bg-gray-100 h-1.5 md:h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-emerald-500 h-full rounded-full" 
                          style={{ width: `${data.engagement}%` }}
                        ></div>
                      </div>
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

export default AnalyticsAdmin;