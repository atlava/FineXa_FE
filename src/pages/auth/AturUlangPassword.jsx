import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const AturUlangPassword = () => {
  const navigate = useNavigate();
  // Tangkap data token dan email dari URL browser
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pesanError, setPesanError] = useState('');

  // --- STATE UNTUK DUA SAKLAR MATA ---
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setPesanError('');

    if (password !== confirmPassword) {
      setPesanError("Kata sandi dan konfirmasi tidak cocok.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ 
          token: token, 
          email: email, 
          password: password, 
          password_confirmation: confirmPassword 
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Kata sandi berhasil diubah! Sekarang silakan masuk kembali.");
        navigate('/login');
      } else {
        setPesanError(data.pesan || data.message || "Gagal mengatur ulang kata sandi.");
      }
    } catch (error) {
      setPesanError('Gagal terhubung ke server.');
    } finally {
      setIsLoading(false);
    }
  };

  // Keamanan tambahan: Kalau URL nggak punya token/email, suruh kembali
  if (!token || !email) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold mb-4">Link tidak valid atau rusak.</h1>
        <button onClick={() => navigate('/lupa-password')} className="text-[#51BA55] underline">Kembali ke Lupa Password</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2.5 mb-8 justify-center">
          <div className="bg-[#51BA55] p-2 rounded-xl flex items-center justify-center shadow-sm shadow-green-200">
            <img src="/images/Logo.svg" alt="Logo" className="w-6 h-6 brightness-0 invert" />
          </div>
          <span className="text-2xl font-bold text-gray-800 tracking-tight">FineXa</span>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Atur Ulang Kata Sandi</h1>
          <p className="text-gray-500 text-sm">Silakan masukkan kata sandi baru untuk {email}.</p>
        </div>

        {pesanError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center">
            {pesanError}
          </div>
        )}

        <form onSubmit={handleReset} className="space-y-5">
          
          {/* Input Kata Sandi Baru BERMATA */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Kata Sandi Baru</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                required
                minLength={6}
                className="w-full px-4 py-3 pr-10 rounded-xl border border-gray-200 focus:border-[#51BA55] focus:ring-1 focus:ring-[#51BA55] outline-none transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#51BA55] transition-colors"
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
          </div>

          {/* Input Konfirmasi Kata Sandi BERMATA */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Konfirmasi Kata Sandi</label>
            <div className="relative">
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                required
                minLength={6}
                className="w-full px-4 py-3 pr-10 rounded-xl border border-gray-200 focus:border-[#51BA55] focus:ring-1 focus:ring-[#51BA55] outline-none transition-all"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#51BA55] transition-colors"
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

          <button 
            type="submit"
            disabled={isLoading}
            className={`w-full text-white py-3.5 rounded-xl font-bold shadow-lg transition-all mt-4 ${isLoading ? 'bg-gray-400' : 'bg-[#51BA55] hover:bg-[#3A8E3F] shadow-green-100'}`}
          >
            {isLoading ? 'Menyimpan...' : 'Simpan Kata Sandi'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AturUlangPassword;