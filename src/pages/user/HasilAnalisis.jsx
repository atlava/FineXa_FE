import { useNavigate } from 'react-router-dom';

const AdviceResult = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto w-full pt-6 md:pt-10 pb-20">
      
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Hasil Analisis Anda</h1>
        <p className="text-sm text-gray-500">Rekomendasi instrumen berdasarkan jawaban kuesioner terakhir Anda.</p>
      </div>

      {/* Card Hasil Profil Risiko */}
      <div className="bg-white rounded-[24px] md:rounded-[32px] p-8 md:p-12 shadow-sm border border-gray-100 mb-8 text-center relative overflow-hidden">
        {/* Background Hiasan */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-50 rounded-full opacity-50"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-green-50 rounded-full opacity-50"></div>

        <div className="relative z-10">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-yellow-100 rounded-full flex items-center justify-center text-4xl md:text-5xl mx-auto mb-6 shadow-sm">
            ⚖️
          </div>
          <p className="text-xs md:text-sm text-gray-400 uppercase tracking-widest font-bold mb-2">PROFIL RISIKO</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Moderat</h2>
          
          <p className="text-sm md:text-base text-gray-500 font-light leading-relaxed max-w-lg mx-auto mb-8">
            Anda memiliki toleransi risiko menengah. Anda siap menerima sedikit fluktuasi pada nilai pokok investasi demi mendapatkan tingkat pengembalian yang lebih tinggi daripada produk simpanan biasa.
          </p>

          <div className="bg-gray-50 rounded-xl p-4 md:p-6 inline-block text-left w-full max-w-md border border-gray-100">
            <p className="text-xs font-bold text-gray-800 mb-3 uppercase">Porsi Investasi Ideal:</p>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 rounded-full bg-[#51BA55]"></div>
              <span className="text-sm text-gray-600 flex-grow">Reksadana Campuran</span>
              <span className="text-sm font-bold text-gray-800">50%</span>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 rounded-full bg-[#FFC107]"></div>
              <span className="text-sm text-gray-600 flex-grow">Reksadana Saham</span>
              <span className="text-sm font-bold text-gray-800">30%</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-blue-400"></div>
              <span className="text-sm text-gray-600 flex-grow">Deposito / Pasar Uang</span>
              <span className="text-sm font-bold text-gray-800">20%</span>
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