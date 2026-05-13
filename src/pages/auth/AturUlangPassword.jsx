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

  const handleReset = async (e) => {
    e.preventDefault();
    setPesanError('');

    if (password !== confirmPassword) {
      setPesanError("Kata sandi dan konfirmasi tidak cocok.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/reset-password', {
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
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Kata Sandi Baru</label>
            <input 
              type="password" 
              required
              minLength={6}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#51BA55] focus:ring-1 focus:ring-[#51BA55] outline-none transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Konfirmasi Kata Sandi</label>
            <input 
              type="password" 
              required
              minLength={6}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#51BA55] focus:ring-1 focus:ring-[#51BA55] outline-none transition-all"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
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