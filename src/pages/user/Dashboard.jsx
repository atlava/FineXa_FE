import { useState, useEffect } from 'react';

const Dashboard = () => {
  // 1. Siapkan laci kosong untuk menampung data dari Laravel
  const [instrumen, setInstrumen] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 2. Mesin Penyedot Data otomatis jalan saat halaman dibuka
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const token = localStorage.getItem('token'); // Ambil KTP dari brankas
        
        // Tembak jalur /web/assets milikmu yang dikawal auth
        const response = await fetch('http://localhost:8000/api/assets', {
          headers: {
            'Accept': 'application/json', // Minta Laravel membalas dengan JSON (memicu Tahap D di controller)
            'Authorization': `Bearer ${token}` 
          }
        });
        
        const data = await response.json();
        
        if (data.status === 'success') {
          setInstrumen(data.data); // Masukkan data aset ke laci React
        }
      } catch (error) {
        console.error("Gagal mengambil data aset", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssets();
  }, []);

  // 3. Tips Investasi (Tetap Statis)
  const tips = [
    { title: "Diversifikasi Portfolio", desc: "Jangan menaruh semua telur dalam satu keranjang. Sebarkan investasi Anda ke berbagai instrumen untuk mengurangi risiko.", icon: "🎯" },
    { title: "Investasi Jangka Panjang", desc: "Investasi terbaik adalah yang dilakukan secara konsisten dalam jangka waktu panjang. Bersabar adalah kunci kesuksesan.", icon: "🕒" },
    { title: "Pahami Profil Risiko", desc: "Kenali toleransi risiko Anda sebelum berinvestasi. Investasi yang tepat adalah yang sesuai dengan kondisi finansial Anda.", icon: "🛡️" },
    { title: "Review Berkala", desc: "Evaluasi portofolio investasi Anda secara rutin dan sesuaikan strategi berdasarkan perubahan kondisi pasar dan tujuan finansial.", icon: "💡" }
  ];

  // 4. Pabrik Ikon Otomatis berdasarkan Kategori dari Database
  const getIcon = (kategori) => {
    if (kategori === 'Deposito') return '🛡️';
    if (kategori === 'Reksadana') return '🥧';
    if (kategori === 'Obligasi') return '📄';
    if (kategori === 'Saham') return '📈';
    if (kategori === 'Kripto') return '✨';
    if (kategori === 'Logam Mulia') return '🥇';
    return '💼'; // Default icon
  };

  return (
    <div className="pb-10">
      {/* Welcome Header */}
      <div className="bg-[#51BA55] rounded-[24px] p-8 md:p-10 text-white mb-10 relative overflow-hidden shadow-sm">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Selamat Datang di FineXa! 👋</h1>
          <p className="text-white/90 font-light text-sm md:text-base max-w-2xl leading-relaxed">
            Mulai perjalanan investasi Anda dengan rekomendasi dari tim FineXa.
          </p>
        </div>
        <div className="absolute -top-24 -right-10 w-64 h-64 bg-white opacity-10 rounded-full pointer-events-none"></div>
      </div>

      {/* Instrumen Investasi Section */}
      <div className="mb-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Katalog Instrumen Investasi</h2>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#51BA55]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Lakukan perulangan (Mapping) data dari database */}
            {instrumen.map((item) => (
              <div 
                key={item.id_aset} 
                className="bg-white p-6 rounded-[20px] shadow-sm relative group flex flex-col h-full border border-gray-100 hover:border-[#51BA55] transition-all"
              >
                
                {/* Icon Box Dinamis */}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 bg-gray-50">
                  {getIcon(item.kategori_aset)}
                </div>

                {/* Ambil nama_aset dari tabel */}
                <h3 className="text-lg font-bold text-gray-800 mb-1">{item.nama_aset}</h3>
                
                {/* Ambil kategori_aset dari tabel sebagai deskripsi pengganti */}
                <p className="text-xs text-gray-500 mb-6 font-light">Kategori: {item.kategori_aset}</p>
                
                <div className="flex justify-between items-end mt-auto pt-4 border-t border-gray-50">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-semibold mb-1">Risiko</p>
                    {/* Ambil tingkat_risiko dari tabel */}
                    <p className={`text-sm font-bold ${
                        item.tingkat_risiko.includes('Tinggi') ? 'text-red-500' : 
                        item.tingkat_risiko === 'Sedang' ? 'text-yellow-500' : 'text-green-500'
                    }`}>
                        {item.tingkat_risiko}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tips Investasi Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          Tips Investasi 💡
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tips.map((tip, index) => (
            <div key={index} className="bg-white p-6 rounded-[20px] border border-gray-100 shadow-sm flex gap-4">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-xl flex-shrink-0">
                {tip.icon}
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-2">{tip.title}</h4>
                <p className="text-xs text-gray-500 font-light leading-relaxed">
                  {tip.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;