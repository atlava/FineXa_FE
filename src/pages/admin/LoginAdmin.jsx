import { Link, useNavigate } from 'react-router-dom';

const LoginAdmin = () => {
  const navigate = useNavigate();
  return (
    // Container utama: Atas-bawah di HP, Kiri-kanan di Desktop (md:flex-row)
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      
      {/* Bagian Kiri: Visual Hijau (Sesuai Figma) */}
      <div className="md:w-1/2 relative overflow-hidden bg-gradient-to-b from-[#51BA55] to-[#3A8E3F] text-white flex flex-col justify-center px-8 py-12 md:p-16 rounded-b-[30px] md:rounded-none z-0">
        
        {/* Ornamen Lingkaran (Kanan Atas dan Kiri Bawah) */}
        <div className="absolute -top-10 -right-20 w-80 h-80 md:w-[450px] md:h-[450px] bg-white opacity-10 rounded-full pointer-events-none"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 md:w-56 md:h-56 bg-white opacity-10 rounded-full pointer-events-none"></div>

        {/* Konten (relative z-10 biar letaknya di atas lingkaran) */}
        <div className="relative z-10 flex flex-col h-full justify-center">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 mb-10">
            <img src="/images/Logo.svg" alt="Logo FineXa" className="w-10 h-10 md:w-12 md:h-12" />
            <span className="text-3xl font-bold tracking-wide">FineXa</span>
          </div>
          
          {/* Judul Utama */}
          <h1 className="text-4xl md:text-[42px] font-bold leading-[1.2] mb-5">
            Platform Investasi<br/>Terpercaya untuk<br/>Masa Depan
          </h1>
          
          {/* Sub-judul */}
          <p className="text-sm md:text-base text-white/80 mb-14 max-w-md font-light leading-relaxed">
            Rekomendasi investasi yang dipersonalisasi berdasarkan profil risiko dan tujuan finansial Anda.
          </p>

          {/* Statistik (3 Kolom) */}
          <div className="flex gap-6 md:gap-10">
            {/* Stat 1 */}
            <div className="flex flex-col">
              <span className="text-2xl md:text-[28px] font-bold mb-1">5,000+</span>
              <span className="text-xs md:text-sm text-white/80 font-light">Active Users</span>
            </div>
            
            {/* Stat 2 */}
            <div className="flex flex-col">
              <span className="text-2xl md:text-[28px] font-bold mb-1">98%</span>
              <span className="text-xs md:text-sm text-white/80 font-light">Satisfaction</span>
            </div>
            
            {/* Stat 3 */}
            <div className="flex flex-col">
              <span className="text-2xl md:text-[28px] font-bold mb-1">₹150B+</span>
              <span className="text-xs md:text-sm text-white/80 font-light leading-tight">Assets Under<br/>Management</span>
            </div>
          </div>

        </div>
      </div>

      {/* Bagian Kanan: Formulir Putih (MODIFIKASI UNTUK ADMIN) */}
      <div className="w-full md:w-1/2 flex items-start md:items-center justify-center p-6 md:p-16 -mt-10 md:mt-0 z-10">
        
        {/* Kotak Form */}
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          {/* Sesuai dengan Gambar Figma Admin */}
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Selamat Datang Kembali</h2>
          <p className="text-sm text-gray-500 mb-6">Masuk ke akun FineXa Anda untuk melanjutkan</p>
          
          <form className="flex flex-col gap-4">
            
            {/* Input Email */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Alamat Email</label>
              <input 
                type="email" 
                placeholder="nama@email.com" 
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-finexa focus:ring-2 focus:ring-finexa/20 transition-all"
              />
            </div>
            
            {/* Input Password */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                placeholder="Masukkan password" 
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-finexa focus:ring-2 focus:ring-finexa/20 transition-all"
              />
            </div>

            {/* Lupa Password */}
            <div className="text-right mt-1">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="h-4 w-4 text-finexa border-gray-300 rounded focus:ring-finexa accent-finexa cursor-pointer" />
                <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">Ingat Saya</label>              
                <Link to="#" className="text-sm font-medium text-finexa hover:text-finexaDark hover:underline transition-all ml-auto">
                  Lupa password?
                </Link>
              </div>
            </div>

            {/* Tombol Masuk (ARAHKAN KE /admin) */}
            <button 
              type="button" 
              onClick={(e) => {e.preventDefault(); navigate('/admin');}}
              className="bg-finexa text-white font-semibold rounded-lg p-3 mt-4 hover:bg-finexaDark hover:-translate-y-0.5 shadow-md hover:shadow-lg transition-all duration-300"
            >
              Masuk ke Dashboard
            </button>

            {/* Link Daftar */}
            <div className="text-center mt-4 text-sm text-gray-500">
              Belum punya akun? 
              <Link to="#" className="font-semibold text-finexa hover:text-finexaDark hover:underline ml-1 transition-all">
                Daftar sekarang
              </Link>
            </div>

          </form>
        </div>
      </div>

    </div>
  );
};

export default LoginAdmin;