import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AturUlangPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleReset = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Kata sandi nggak cocok, Coba cek lagi.");
      return;
    }
    // Nanti di sini bagian temen backend-mu buat update ke database
    alert("Kata sandi berhasil diubah! Sekarang silakan masuk kembali.");
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo FineXa */}
        <div className="flex items-center gap-2.5 mb-8 justify-center">
          <div className="bg-[#51BA55] p-2 rounded-xl flex items-center justify-center shadow-sm shadow-green-200">
            <img src="/images/Logo.svg" alt="Logo" className="w-6 h-6 brightness-0 invert" />
          </div>
          <span className="text-2xl font-bold text-gray-800 tracking-tight">FineXa</span>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Atur Ulang Kata Sandi</h1>
          <p className="text-gray-500 text-sm">Silakan masukkan kata sandi baru untuk akun Anda.</p>
        </div>

        <form onSubmit={handleReset} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Kata Sandi Baru</label>
            <input 
              type="password" 
              required
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
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#51BA55] focus:ring-1 focus:ring-[#51BA55] outline-none transition-all"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-[#51BA55] text-white py-3.5 rounded-xl font-bold shadow-lg shadow-green-100 hover:bg-[#3A8E3F] transition-all mt-4"
          >
            Simpan Kata Sandi
          </button>
        </form>

        <button 
          onClick={() => navigate('/login')}
          className="w-full text-center text-sm text-gray-500 mt-8 hover:text-[#51BA55] transition-all"
        >
          Batal dan kembali ke Login
        </button>
      </div>
    </div>
  );
};

export default AturUlangPassword;