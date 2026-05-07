import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center p-6 text-center">
      {/* Ikon Nyasar */}
      <div className="text-[100px] md:text-[120px] leading-none mb-4 drop-shadow-md animate-bounce">
        🛸
      </div>
      
      {/* Teks Error */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
        404 - Halaman Tidak DiTemukan!
      </h1>
      <p className="text-gray-500 font-light text-sm md:text-base max-w-md mb-8 leading-relaxed">
        Halaman yang kamu cari sepertinya udah diculik alien, pindah alamat, atau memang nggak pernah ada di FineXa.
      </p>

      {/* Tombol Balik */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button 
          onClick={() => navigate(-1)} // Jurus react-router buat tombol "Back"
          className="px-8 py-3 rounded-xl font-bold text-gray-600 bg-white border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all"
        >
          Kembali
        </button>
        <button 
          onClick={() => navigate('/dashboard')}
          className="bg-[#51BA55] text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-green-100 hover:bg-[#3A8E3F] hover:-translate-y-0.5 transition-all"
        >
          Ke Beranda
        </button>
      </div>
    </div>
  );
};

export default NotFound;