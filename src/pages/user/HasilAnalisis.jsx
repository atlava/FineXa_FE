import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdviceResult = () => {
  const navigate = useNavigate();
  const [profilData, setProfilData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Kamus Teks Deskripsi Statis untuk Profil Utama
  const kamusProfil = {
    'Konservatif': {
      icon: '🛡️',
      warnaTema: 'bg-blue-100',
      teks: 'Anda sangat mengutamakan keamanan dana investasi. Anda cenderung menghindari risiko penurunan nilai pokok dan lebih nyaman dengan instrumen yang stabil meski dengan return yang lebih rendah.'
    },
    'Moderat': {
      icon: '⚖️',
      warnaTema: 'bg-yellow-100',
      teks: 'Anda memiliki toleransi risiko menengah. Anda siap menerima sedikit fluktuasi pada nilai pokok investasi demi mendapatkan tingkat pengembalian yang lebih tinggi daripada produk simpanan biasa.'
    },
    'Agresif': {
      icon: '📈',
      warnaTema: 'bg-orange-100',
      teks: 'Anda siap menghadapi fluktuasi pasar yang cukup besar demi mengejar pertumbuhan modal jangka panjang yang signifikan. Anda paham bahwa risiko sebanding dengan potensi keuntungan.'
    },
    'Sangat Agresif': {
      icon: '🚀',
      warnaTema: 'bg-red-100',
      teks: 'Anda adalah *risk-taker* sejati! Anda berani mengambil risiko maksimal dan siap melihat nilai portofolio Anda naik-turun tajam demi potensi keuntungan luar biasa di masa depan.'
    }
  };

  // 2. Mesin Pengambil Data
  useEffect(() => {
    const fetchAnalisis = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(import.meta.env.VITE_API_URL + '/analisis', {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        
        const data = await response.json();

        if (response.status === 403) {
          // Kalau belum isi kuesioner, tendang ke halaman kuesioner
          navigate('/kuisioner');
        } else if (data.status === 'success') {
          // Simpan data profil ke laci
          setProfilData(data.data.profile);
        }
      } catch (error) {
        console.error("Gagal mengambil data analisis", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalisis();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#51BA55]"></div>
      </div>
    );
  }

  // Kalau data gagal dimuat, jangan tampilkan apa-apa dulu
  if (!profilData) return null;

  // 3. Ambil data dari State untuk dirender
  const profilAktif = profilData.profil_risiko || 'Moderat'; // Default jika kosong
  const infoStatis = kamusProfil[profilAktif] || kamusProfil['Moderat'];

  // 🚨 MERAKIT ARRAY DINAMIS DENGAN DESKRIPSI YANG LEBIH EDUKATIF 🚨
  const alokasiAset = [
    {
      nama: "Pasar Uang / Deposito / Logam Mulia",
      persen: `${parseFloat(profilData.persen_pasar_uang).toFixed(2)}%`,
      warna: "bg-blue-400",
      deskripsi: "Sebagai fondasi pelindung kekayaan, produk investasi ini memiliki tingkat risiko paling rendah dan nilai yang amat stabil. Porsi ini sangat krusial untuk difungsikan sebagai dana darurat. Meskipun imbal hasilnya tidak masif, keunggulan utamanya adalah likuiditas tinggi. uangmu selalu siap dicairkan kapan saja tanpa risiko kerugian saat menghadapi situasi mendesak."
    },
    {
      nama: "Obligasi / Pendapatan Tetap",
      persen: `${parseFloat(profilData.persen_obligasi).toFixed(2)}%`,
      warna: "bg-[#51BA55]",
      deskripsi: "Berperan sebagai bantalan penyeimbang dalam portofoliomu, produk investasi ini memberikan kepastian imbal hasil yang nilainya secara konsisten mengalahkan bunga tabungan dan inflasi. Goncangan harganya sangat terukur dan minim, sehingga amat ideal untuk menjaga kestabilan nilai uangmu sambil tetap menikmati aliran pertumbuhan yang aman."
    },
    {
      nama: "Reksadana Campuran",
      persen: `${parseFloat(profilData.persen_campuran).toFixed(2)}%`,
      warna: "bg-[#FFC107]",
      deskripsi: "Merupakan jembatan penengah yang taktis, produk investasi ini secara otomatis memadukan stabilitas dari pendapatan tetap dan potensi pertumbuhan dari saham. Porsi ini didesain agar uangmu tidak hanya sekadar bertahan dari gerusan inflasi, tetapi juga mampu bertumbuh secara moderat tanpa harus mengalami pergerakan harga yang terlalu ekstrem."
    },
    {
      nama: "Saham / Kripto",
      persen: `${parseFloat(profilData.persen_saham).toFixed(2)}%`,
      warna: "bg-red-400",
      deskripsi: "Ini adalah mesin pendorong utama (booster) untuk melipatgandakan kekayaan. Meski pergerakan harganya bisa sangat tajam dalam waktu singkat, instrumen ini menawarkan potensi keuntungan paling tinggi untuk jangka panjang (di atas 5 tahun). Porsinya telah ditakar secara khusus agar kamu bisa menikmati pertumbuhan maksimal tanpa mengorbankan ketenangan pikiranmu."
    }
  ];

  return (
    <div className="max-w-3xl mx-auto w-full pt-6 md:pt-10 pb-20">
      
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Hasil Analisis Anda 🧠</h1>
        <p className="text-sm text-gray-500">Rekomendasi instrumen berdasarkan jawaban kuesioner terakhir Anda.</p>
      </div>

      {/* Card Hasil Profil Risiko */}
      <div className="bg-white rounded-[24px] md:rounded-[32px] p-8 md:p-12 shadow-sm border border-gray-100 mb-8 text-center relative overflow-hidden">
        {/* Background Hiasan */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-gray-50 rounded-full opacity-50"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-green-50 rounded-full opacity-50"></div>

        <div className="relative z-10">
          <div className={`w-20 h-20 md:w-24 md:h-24 ${infoStatis.warnaTema} rounded-full flex items-center justify-center text-4xl md:text-5xl mx-auto mb-6 shadow-sm`}>
            {infoStatis.icon}
          </div>
          <p className="text-xs md:text-sm text-gray-400 uppercase tracking-widest font-bold mb-2">PROFIL RISIKO</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{profilAktif}</h2>
          
          <p className="text-sm md:text-base text-gray-500 font-light leading-relaxed max-w-lg mx-auto mb-8">
            {infoStatis.teks}
          </p>

          {/* BOX PORSI INVESTASI IDEAL DENGAN KETERANGAN */}
          <div className="bg-gray-50 rounded-2xl p-5 md:p-6 text-left w-full max-w-xl mx-auto border border-gray-100 shadow-inner">
            <p className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">Porsi Investasi Ideal:</p>
            
            <div className="space-y-4">
              {alokasiAset.map((item, index) => (
                <div key={index} className="flex flex-col gap-1 border-b border-gray-200/40 pb-3 last:border-0 last:pb-0">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${item.warna} flex-shrink-0`}></div>
                      <span className="text-sm font-semibold text-gray-700">{item.nama}</span>
                    </div>
                    <span className="text-sm font-extrabold text-gray-900 bg-white px-2.5 py-0.5 rounded-lg border border-gray-100 shadow-sm">
                      {item.persen}
                    </span>
                  </div>
                  {/* Teks Keterangan Dinamis di Bawah Persentase */}
                  <p className="text-xs text-gray-400 ml-6 leading-relaxed font-light">
                    {item.deskripsi}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Tombol Kuis Ulang */}
      <div className="flex flex-col items-center">
        <p className="text-xs md:text-sm text-gray-400 mb-4 text-center">
          Tujuan finansial atau kondisi keuangan Anda berubah?
        </p>
        <button 
          onClick={() => navigate('/kuisioner')}
          className="bg-white border-2 border-[#51BA55] text-[#51BA55] px-8 py-3 rounded-xl text-sm md:text-base font-bold hover:bg-green-50 transition-all w-full md:w-auto"
        >
          🔄 Ambil Ulang Kuesioner
        </button>
      </div>

    </div>
  );
};

export default AdviceResult;