import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  return (
    // Container utama
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      
      {/* Bagian Kiri: Visual Hijau (Sesuai Figma) */}
      <div className="md:w-1/2 relative overflow-hidden bg-gradient-to-b from-[#51BA55] to-[#3A8E3F] text-white flex flex-col justify-center px-8 py-12 md:p-16 rounded-b-[30px] md:rounded-none z-0">
        
        {/* Ornamen Lingkaran (Kanan Atas) */}
        <div className="absolute -top-10 -right-20 w-80 h-80 md:w-[450px] md:h-[450px] bg-white opacity-10 rounded-full pointer-events-none"></div>
        
        {/* Ornamen Lingkaran (Kiri Bawah) */}
        <div className="absolute bottom-10 left-10 w-40 h-40 md:w-56 md:h-56 bg-white opacity-10 rounded-full pointer-events-none"></div>

        {/* Konten (relative z-10 biar letaknya di atas lingkaran) */}
        <div className="relative z-10 flex flex-col h-full justify-center">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 mb-10">
            {/* Pakai logo.svg aslinya, kalau di figma logonya kotak ijo muda, ntar svg-nya tinggal disesuaikan */}
            <img src="/images/Logo.svg" alt="Logo FineXa" className="w-10 h-10 md:w-12 md:h-12" />
            <span className="text-3xl font-bold tracking-wide">FineXa</span>
          </div>
          
          {/* Judul Utama */}
          <h1 className="text-4xl md:text-[42px] font-bold leading-[1.2] mb-5">
            Mulai Investasi<br/>Anda Hari Ini
          </h1>
          
          {/* Sub-judul */}
          <p className="text-sm md:text-base text-white/80 mb-14 max-w-md font-light leading-relaxed">
            Bergabung dengan ribuan investor yang sudah mempercayai FineXa untuk panduan investasi mereka.
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
              {/* Note: Di gambar figma pakai logo Rupee (₹), aku samain aja. Kalau mau diganti Rp tinggal ganti */}
              <span className="text-2xl md:text-[28px] font-bold mb-1">24/7</span>
              <span className="text-xs md:text-sm text-white/80 font-light leading-tight">Customer Support</span>
            </div>
          </div>

        </div>
      </div>

      {/* Bagian Kanan: Formulir Putih */}
      <div className="w-full md:w-1/2 flex items-start md:items-center justify-center p-6 md:p-12 -mt-10 md:mt-0 z-10">
        
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Buat Akun</h2>
          <p className="text-sm text-gray-500 mb-6">Lengkapi data di bawah untuk mulai berinvestasi</p>
          
          <form className="flex flex-col gap-4">
            
            {/* Input Nama Lengkap */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
              <input 
                type="text" 
                placeholder="Masukkan nama lengkap" 
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-finexa focus:ring-2 focus:ring-finexa/20 transition-all"
              />
            </div>

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
                placeholder="••••••••" 
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-finexa focus:ring-2 focus:ring-finexa/20 transition-all"
              />
              <p className="text-xs text-gray-500 mt-1.5 ml-1">
                *Minimal 6 karakter, wajib mengandung huruf kapital, huruf kecil, angka, dan simbol (!@#$%^&*)
              </p>
            </div>

            {/* Input Konfirmasi Password */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Konfirmasi Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-finexa focus:ring-2 focus:ring-finexa/20 transition-all"
              />
            </div>

            {/* Checkbox Syarat & Ketentuan */}
            <div className="flex items-center gap-2">
              <input type="checkbox" id="terms" className="h-4 w-4 text-finexa border-gray-300 rounded focus:ring-finexa accent-finexa cursor-pointer" />
              <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
                Saya setuju dengan 
                <Link to="/terms" className="font-medium text-finexa hover:text-finexaDark hover:underline mx-1 transition-all">
                  Syarat & Ketentuan
                </Link>
              </label>
            </div>  

            {/* Tombol Daftar */}
            <button 
              type="button" 
              onClick={(e) => {e.preventDefault(); navigate('/kuisioner');}}
              className="bg-finexa text-white font-semibold rounded-lg p-3 mt-4 hover:bg-finexaDark hover:-translate-y-0.5 shadow-md hover:shadow-lg transition-all duration-300"
            >
              Daftar Sekarang
            </button>

            {/* Link Masuk */}
            <div className="text-center mt-4 text-sm text-gray-500">
              Sudah punya akun? 
              <Link to="/login" className="font-semibold text-finexa hover:text-finexaDark hover:underline ml-1 transition-all">
                Masuk di sini
              </Link>
            </div>

          </form>
        </div>
      </div>

    </div>
  );
};

export default Register;