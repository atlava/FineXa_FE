import { useNavigate } from 'react-router-dom';

const LoginAdmin = () => {
  const navigate = useNavigate();

  // Fungsi pura-pura login, langsung arahkan ke Dashboard Admin
  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/admin');
  };

  return (
    <div className="flex min-h-screen bg-white font-sans">
      
      {/* BAGIAN KIRI - HIJAU (Hanya muncul di Desktop) */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#12A853] relative flex-col justify-center px-16 xl:px-24 overflow-hidden">
        
        {/* Dekorasi Lingkaran */}
        <div className="absolute top-10 right-20 w-64 h-64 bg-white opacity-10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-10 w-48 h-48 bg-white opacity-10 rounded-full blur-xl"></div>

        {/* Konten Teks */}
        <div className="relative z-10 text-white">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <span className="text-3xl font-bold tracking-wide">FineXa</span>
          </div>

          <h1 className="text-4xl xl:text-5xl font-bold leading-tight mb-4">
            Platform Investasi Terpercaya untuk Masa Depan
          </h1>
          <p className="text-white/80 text-lg mb-12 max-w-md">
            Rekomendasi investasi yang dipersonalisasi berdasarkan profil risiko dan tujuan finansial Anda.
          </p>

          {/* Statistik */}
          <div className="flex gap-8">
            <div>
              <h3 className="text-2xl font-bold">5,000+</h3>
              <p className="text-sm text-white/70">Active Users</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold">98%</h3>
              <p className="text-sm text-white/70">Satisfaction</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold">₹150B+</h3>
              <p className="text-sm text-white/70">Assets Under Management</p>
            </div>
          </div>
        </div>
      </div>

      {/* BAGIAN KANAN - FORM LOGIN */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md">
          
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Selamat Datang Kembali</h2>
          <p className="text-gray-500 mb-8">Masuk ke akun FineXa Anda untuk melanjutkan</p>

          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Input Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Alamat Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input 
                  type="email" 
                  className="block w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-[#12A853] focus:border-[#12A853] outline-none transition" 
                  placeholder="nama@email.com" 
                  required
                />
              </div>
            </div>

            {/* Input Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <input 
                  type="password" 
                  className="block w-full pl-10 pr-10 px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-[#12A853] focus:border-[#12A853] outline-none transition" 
                  placeholder="Masukkan password" 
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 hover:text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Lupa Password & Submit */}
            <div className="flex justify-end">
              <a href="#" className="text-sm font-medium text-[#12A853] hover:underline">Lupa password?</a>
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#12A853] hover:bg-[#0e8a43] text-white font-medium py-3 rounded-lg shadow-lg shadow-green-500/30 transition duration-200"
            >
              Masuk ke Dashboard
            </button>
            
          </form>

          {/* Register Link */}
          <p className="text-center text-sm text-gray-600 mt-8">
            Belum punya akun? <a href="#" className="text-[#12A853] font-bold hover:underline">Daftar sekarang</a>
          </p>

        </div>
      </div>
      
    </div>
  );
};

export default LoginAdmin;