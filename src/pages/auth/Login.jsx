import { useState } from 'react'; // Tambahan: Import useState untuk nyimpan ketikan
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  
  // --- INI MESIN BARUNYA (State) ---
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // --- INI KABEL COLOKAN KE LARAVEL ---
  const handleLogin = async (e) => {
    e.preventDefault(); // Mencegah halaman refresh
    setErrorMsg('');    // Hapus error lama
    setIsLoading(true); // Ubah tombol jadi "Loading..."

    try {
      // Nembak API Login Laravel kamu
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          email: email, 
          password: password 
        })
      });

      const data = await response.json();

      // Kalau sukses (Status 200 OK)
      if (response.ok) {
        // Simpan "Kunci Akses" (Token) di brankas browser (localStorage)
        localStorage.setItem('token', data.token); // Pastikan API-mu mereturn 'token'
        
        // Buka pintu ke Dashboard
        navigate('/dashboard');
      } else {
        // Kalau gagal (Email/Password salah)
        setErrorMsg(data.message || 'Login gagal. Periksa kembali email dan password Anda.');
      }
    } catch (err) {
      setErrorMsg('Gagal terhubung ke server Backend. Pastikan Laravel menyala.');
    } finally {
      setIsLoading(false); // Kembalikan tombol seperti semula
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      
      {/* Bagian Kiri: Visual Hijau (Tidak diubah sama sekali biar Rian nggak marah) */}
      <div className="md:w-1/2 relative overflow-hidden bg-gradient-to-b from-[#51BA55] to-[#3A8E3F] text-white flex flex-col justify-center px-8 py-12 md:p-16 rounded-b-[30px] md:rounded-none z-0">
        <div className="absolute -top-10 -right-20 w-80 h-80 md:w-[450px] md:h-[450px] bg-white opacity-10 rounded-full pointer-events-none"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 md:w-56 md:h-56 bg-white opacity-10 rounded-full pointer-events-none"></div>

        <div className="relative z-10 flex flex-col h-full justify-center">
          <div className="flex items-center gap-3 mb-10">
            <img src="/images/Logo.svg" alt="Logo FineXa" className="w-10 h-10 md:w-12 md:h-12" />
            <span className="text-3xl font-bold tracking-wide">FineXa</span>
          </div>
          
          <h1 className="text-4xl md:text-[42px] font-bold leading-[1.2] mb-5">
            Platform Investasi<br/>Terpercaya untuk<br/>Masa Depan
          </h1>
          <p className="text-sm md:text-base text-white/80 mb-14 max-w-md font-light leading-relaxed">
            Rekomendasi investasi yang dipersonalisasi berdasarkan profil risiko dan tujuan finansial Anda.
          </p>

          <div className="flex gap-6 md:gap-10">
            <div className="flex flex-col">
              <span className="text-2xl md:text-[28px] font-bold mb-1">5,000+</span>
              <span className="text-xs md:text-sm text-white/80 font-light">Active Users</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl md:text-[28px] font-bold mb-1">98%</span>
              <span className="text-xs md:text-sm text-white/80 font-light">Satisfaction</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl md:text-[28px] font-bold mb-1">₹150B+</span>
              <span className="text-xs md:text-sm text-white/80 font-light leading-tight">Assets Under<br/>Management</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bagian Kanan: Formulir Putih */}
      <div className="w-full md:w-1/2 flex items-start md:items-center justify-center p-6 md:p-16 -mt-10 md:mt-0 z-10">
        
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Masuk</h2>
          <p className="text-sm text-gray-500 mb-6">Silakan masukkan email dan password Anda</p>
          
          {/* Tampilkan Pesan Error Jika Ada */}
          {errorMsg && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-sm">
              {errorMsg}
            </div>
          )}

          {/* Form dipasang onSubmit */}
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            
            {/* Input Email (Ditambah value & onChange) */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Alamat Email</label>
              <input 
                type="email" 
                placeholder="nama@email.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-finexa focus:ring-2 focus:ring-finexa/20 transition-all"
              />
            </div>
            
            {/* Input Password (Ditambah value & onChange) */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-finexa focus:ring-2 focus:ring-finexa/20 transition-all"
              />
            </div>

            <div className="text-right mt-1">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="h-4 w-4 text-finexa border-gray-300 rounded focus:ring-finexaa accent-finexa cursor-pointer" />
                <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">Ingat Saya</label>              
                <Link to="/lupa-password" className="text-sm font-medium text-finexa hover:text-finexaDark hover:underline transition-all ml-auto">
                Lupa Password?
                </Link>
            </div>
            </div>

            {/* Tombol Masuk (Diubah jadi type submit & ditambah efek loading) */}
            <button 
              type="submit" 
              disabled={isLoading}
              className={`${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-finexa hover:bg-finexaDark hover:-translate-y-0.5 hover:shadow-lg'} text-white font-semibold rounded-lg p-3 mt-4 shadow-md transition-all duration-300`}
            >
              {isLoading ? 'Sedang Memproses...' : 'Masuk ke Dashboard'}
            </button>

            <div className="text-center mt-4 text-sm text-gray-500">
              Belum punya akun? 
              <Link to="/register" className="font-semibold text-finexa hover:text-finexaDark hover:underline ml-1 transition-all">
                Daftar di sini
              </Link>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;