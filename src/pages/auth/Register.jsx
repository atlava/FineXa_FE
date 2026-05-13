import { useState } from 'react'; // Import state untuk menangkap input
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  // --- STATE UNTUK MENANGKAP INPUT USER ---
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false); // State untuk checkbox S&K
  
  // --- STATE UNTUK DUA SAKLAR MATA ---
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // State untuk status proses
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // --- FUNGSI UNTUK MENEMBAK API REGISTER LARAVEL ---
  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // 1. Validasi Frontend Dasar
    if (!termsAgreed) {
      setErrorMsg('Anda harus menyetujui Syarat & Ketentuan.');
      return;
    }
    if (password !== password_confirmation) {
      setErrorMsg('Konfirmasi password tidak cocok.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          password_confirmation: password_confirmation
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Jika registrasi sukses, simpan token (jika API register mereturn token)
        // dan arahkan ke halaman pengisian kuesioner profil risiko
        if (data.token) {
           localStorage.setItem('token', data.token);
        }
        // Asumsi alur: Setelah daftar, user baru wajib isi kuesioner
        navigate('/kuisioner'); 
      } else {
        // Tangkap pesan error dari validasi Laravel (misal: email sudah dipakai)
        if (data.errors) {
            // Ambil pesan error pertama dari object errors
            const firstError = Object.values(data.errors)[0][0];
            setErrorMsg(firstError);
        } else {
            setErrorMsg(data.message || 'Pendaftaran gagal. Periksa kembali data Anda.');
        }
      }
    } catch (err) {
      setErrorMsg('Gagal terhubung ke server. Pastikan Laravel menyala.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      
      {/* Bagian Kiri: Visual Hijau */}
      <div className="md:w-1/2 relative overflow-hidden bg-gradient-to-b from-[#51BA55] to-[#3A8E3F] text-white flex flex-col justify-center px-8 py-12 md:p-16 rounded-b-[30px] md:rounded-none z-0">
        <div className="absolute -top-10 -right-20 w-80 h-80 md:w-[450px] md:h-[450px] bg-white opacity-10 rounded-full pointer-events-none"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 md:w-56 md:h-56 bg-white opacity-10 rounded-full pointer-events-none"></div>

        <div className="relative z-10 flex flex-col h-full justify-center">
          <div className="flex items-center gap-3 mb-10">
            <img src="/images/Logo.svg" alt="Logo FineXa" className="w-10 h-10 md:w-12 md:h-12" />
            <span className="text-3xl font-bold tracking-wide">FineXa</span>
          </div>
          
          <h1 className="text-4xl md:text-[42px] font-bold leading-[1.2] mb-5">
            Mulai Investasi<br/>Anda Hari Ini
          </h1>
          
          <p className="text-sm md:text-base text-white/80 mb-14 max-w-md font-light leading-relaxed">
            Bergabung dengan ribuan investor yang sudah mempercayai FineXa untuk panduan investasi mereka.
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
          
          {/* Tampilkan Pesan Error Jika Ada */}
          {errorMsg && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-sm">
              {errorMsg}
            </div>
          )}

          {/* Form dipasang onSubmit */}
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            
            {/* Input Nama Lengkap */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
              <input 
                type="text" 
                placeholder="Masukkan nama lengkap" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-finexa focus:ring-2 focus:ring-finexa/20 transition-all"
              />
            </div>

            {/* Input Email */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Alamat Email</label>
              <input 
                type="email" 
                placeholder="nama@email.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-finexa focus:ring-2 focus:ring-finexa/20 transition-all"
              />
            </div>
            
            {/* Input Password BERMATA */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 pr-10 focus:outline-none focus:border-finexa focus:ring-2 focus:ring-finexa/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-finexa transition-colors"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1.5 ml-1">
                *Minimal 6 karakter, wajib mengandung huruf kapital, huruf kecil, angka, dan simbol (!@#$%^&*)
              </p>
            </div>

            {/* Input Konfirmasi Password BERMATA */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Konfirmasi Password</label>
              <div className="relative">
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  value={password_confirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 pr-10 focus:outline-none focus:border-finexa focus:ring-2 focus:ring-finexa/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-finexa transition-colors"
                >
                  {showConfirmPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Checkbox Syarat & Ketentuan */}
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="terms" 
                checked={termsAgreed}
                onChange={(e) => setTermsAgreed(e.target.checked)}
                className="h-4 w-4 text-finexa border-gray-300 rounded focus:ring-finexa accent-finexa cursor-pointer" 
              />
              <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
                Saya setuju dengan 
                <Link to="/terms" className="font-medium text-finexa hover:text-finexaDark hover:underline mx-1 transition-all">
                  Syarat & Ketentuan
                </Link>
              </label>
            </div>  

            {/* Tombol Daftar */}
            <button 
              type="submit" 
              disabled={isLoading}
              className={`${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-finexa hover:bg-finexaDark hover:-translate-y-0.5 hover:shadow-lg'} text-white font-semibold rounded-lg p-3 mt-4 shadow-md transition-all duration-300`}
            >
              {isLoading ? 'Mendaftarkan Akun...' : 'Daftar Sekarang'}
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