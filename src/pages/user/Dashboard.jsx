import { useState, useEffect } from 'react';

const Dashboard = () => {
  // 1. menampung data dari Laravel
  const [instrumen, setInstrumen] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Laci untuk Modal Pop-Up
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // buat dropdown tips
  const [activeTip, setActiveTip] = useState(null);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'; // Kunci scroll
    } else {
      document.body.style.overflow = 'unset';  // Lepas kuncian scroll
    }

    // Bersihin efeknya kalau halamannya ditutup
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const bukaPopUp = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const tutupPopUp = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };

  // 2. memuat Data otomatis jalan saat halaman dibuka
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const token = localStorage.getItem('token'); // Ambil KTP dari brankas
        
        // Tembak jalur /web/assets milikmu yang dikawal auth
        const response = await fetch(import.meta.env.VITE_API_URL + '/assets', {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (data.status === 'success') {
          setInstrumen(data.data); // Masukkan data aset ke laci React
          console.log("Cek Data Laravel:", data.data);
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

  // 4. Pabrik Ikon Otomatis
  const getIcon = (kategori) => {
    if (kategori === 'Deposito') return '🛡️';
    if (kategori === 'Reksadana') return '🥧';
    if (kategori === 'Obligasi') return '📄';
    if (kategori === 'Saham') return '📈';
    if (kategori === 'Kripto') return '✨';
    if (kategori === 'Logam Mulia') return '🥇';
    return '💼';
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
          <h2 className="text-2xl font-bold text-gray-800">Katalog Instrumen Investasi 📚</h2>
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
                onClick={() => bukaPopUp(item)}
                className="bg-white p-6 rounded-[20px] shadow-sm relative group flex flex-col h-full border border-gray-100 hover:border-[#51BA55] cursor-pointer transition-all hover:-translate-y-1"
              >
                {/* Icon Box Dinamis */}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 bg-gray-50">
                  {getIcon(item.kategori_aset)}
                </div>

                {/* Ambil nama_aset dari tabel */}
                <h3 className="text-lg font-bold text-gray-800 mb-1">{item.nama_aset}</h3>

                {/* Ambil kategori_aset dari tabel */}
                <p className="text-xs text-gray-500 mb-6 font-light">Kategori: {item.kategori_aset}</p>

                <div className="flex justify-between items-end mt-auto pt-4 border-t border-gray-50">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-semibold mb-1">Risiko</p>
                    <p className={`text-sm font-bold ${item.tingkat_risiko?.includes('Tinggi') ? 'text-red-500' :
                      item.tingkat_risiko === 'Sedang' ? 'text-yellow-500' : 'text-green-500'
                      }`}>
                      {item.tingkat_risiko || 'Belum diatur'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tips Investasi Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          Tips Investasi 💡
        </h2>
        {/* List Accordion (Persis kayak FAQ) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 items-start" >
          {tips.map((tip, index) => (
            <div
              key={index}
              className="bg-white rounded-[16px] md:rounded-[20px] shadow-sm border border-gray-100 overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setActiveTip(activeTip === index ? null : index)}
                className="w-full text-left px-5 md:px-6 py-4 md:py-5 flex justify-between items-center focus:outline-none hover:bg-gray-50 transition-colors"
              >
                {/* Ikon dan Judul Tips */}
                <div className="flex items-center gap-3">
                  <span className="text-xl">{tip.icon}</span>
                  <span className={`font-semibold text-sm md:text-base pr-4 ${activeTip === index ? 'text-[#51BA55]' : 'text-gray-800'}`}>
                    {tip.title}
                  </span>
                </div>

                {/* Panah Interaktif */}
                <span className={`transform transition-transform duration-300 text-[#51BA55] flex-shrink-0 ${activeTip === index ? 'rotate-180' : ''}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>

              {/* Deskripsi (Dropdown Content) */}
              <div
                className={`px-5 md:px-6 overflow-hidden transition-all duration-500 ease-in-out ${activeTip === index ? 'max-h-[500px] pb-6 md:pb-8 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-gray-500 text-sm md:text-base font-light leading-relaxed text-justify border-t border-gray-100 pt-4 md:pt-6 mt-1">
                  {tip.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PopUP */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          {/* Latar Belakang Klik untuk Tutup */}
          <div
            onClick={tutupPopUp}
            className="absolute inset-0 bg-transparent"
          ></div>

          {/* Kotak Putih Utama Pop-Up */}
          <div className="bg-white w-full max-w-md p-6 md:p-8 rounded-[24px] shadow-2xl relative z-10 transform transition-all animate-scaleUp">
            <button
              onClick={tutupPopUp}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 font-bold text-xl transition-all">
              &times;
            </button>

            {/* Konten Pop-Up */}
            <div className="flex flex-col items-center text-center mt-2">
              <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center text-4xl mb-4 shadow-sm">
                {getIcon(selectedItem?.kategori_aset)}
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-1 px-4">
                {selectedItem?.nama_aset || 'Nama Aset Tidak Diketahui'}
              </h2>
              <p className="text-sm text-gray-400 font-light mb-6">Kategori: {selectedItem?.kategori_aset || '-'}</p>

              <div className="w-full space-y-4 text-left border-t border-b border-gray-100 py-4 mb-6">
                <div>
                  <p className="text-[11px] text-gray-400 uppercase font-semibold mb-1">Tingkat Risiko</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${selectedItem?.tingkat_risiko?.includes('Tinggi') ? 'bg-red-50 text-red-500' :
                    selectedItem?.tingkat_risiko === 'Sedang' ? 'bg-yellow-50 text-yellow-600' : 'bg-green-50 text-green-600'
                    }`}>
                    🛡️ Risiko {selectedItem?.tingkat_risiko || 'Tidak Diketahui'}
                  </span>
                </div>

                <div>
                  <p className="text-[11px] text-gray-400 uppercase font-semibold mb-1">Deskripsi Instrumen</p>
                  <p className="text-sm text-gray-600 font-light leading-relaxed">
                    {selectedItem?.deskripsi || `Instrumen ${selectedItem?.nama_aset || 'ini'} merupakan pilihan investasi kategori ${selectedItem?.kategori_aset || 'umum'} dengan profil risiko ${selectedItem?.tingkat_risiko || 'yang belum ditentukan'}. Cocok digunakan untuk melatih diversifikasi portofolio finansial Anda di FineXa.`}
                  </p>
                </div>
              </div>

              <button
                onClick={tutupPopUp}
                className="w-full bg-[#51BA55] text-white py-3 rounded-xl font-bold hover:bg-green-600 active:scale-[0.98] shadow-md shadow-green-100 transition-all duration-200"
              >
                Kembali
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;