import { useState } from 'react';
import { Link } from 'react-router-dom';

const LupaPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pesan, setPesan] = useState({ type: '', text: '' });

  const handleKirimEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setPesan({ type: '', text: '' });

    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        setPesan({ type: 'success', text: data.pesan || 'Link reset password telah dikirim ke email Anda!' });
        setEmail('');
      } else {
        setPesan({ type: 'error', text: data.pesan || 'Maaf, email tersebut tidak terdaftar.' });
      }
    } catch (error) {
      setPesan({ type: 'error', text: 'Gagal terhubung ke server.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Visual Kiri Tetap Sama */}
      <div className="md:w-1/2 bg-[#51BA55] text-white flex flex-col justify-center px-8 py-12 md:p-16 rounded-b-[30px] md:rounded-none shadow-lg md:shadow-none z-0">
        <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
          <img src="/images/Logo.svg" alt="Logo FineXa" className="w-10 h-10 brightness-0 invert" />
          <h1 className="text-3xl font-bold">FineXa</h1>
        </div>
        <p className="text-center md:text-left text-sm md:text-base font-light opacity-90">
          Jangan khawatir. Masukkan email Anda dan kami akan mengirimkan instruksi untuk mengatur ulang password.
        </p>
      </div>

      {/* Formulir Kanan */}
      <div className="w-full md:w-1/2 flex items-start md:items-center justify-center p-6 md:p-16 -mt-10 md:mt-0 z-10">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Lupa Password? 🔒</h2>
          <p className="text-sm text-gray-500 mb-6">Kami akan mengirimkan link reset password ke email Anda.</p>
          
          {/* Tempat Menampilkan Notifikasi */}
          {pesan.text && (
            <div className={`mb-4 p-3 rounded-lg text-sm ${pesan.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {pesan.text}
            </div>
          )}

          <form onSubmit={handleKirimEmail} className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Alamat Email Terdaftar</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com" 
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#51BA55] focus:ring-2 focus:ring-green-200 transition-all"
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className={`${isLoading ? 'bg-gray-400' : 'bg-[#51BA55] hover:bg-[#3A8E3F] hover:-translate-y-0.5 shadow-md'} text-white font-semibold rounded-lg p-3 mt-4 transition-all duration-300`}
            >
              {isLoading ? 'Mengirim...' : 'Kirim Link Reset'}
            </button>

            <div className="text-center mt-4 text-sm text-gray-500">
              Ingat password Anda? 
              <Link to="/login" className="font-semibold text-[#51BA55] hover:underline ml-1 transition-all">
                Kembali ke Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LupaPassword;