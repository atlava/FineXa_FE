import { Link } from 'react-router-dom';

const LupaPassword = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      
      {/* Bagian Kiri: Visual Hijau */}
      <div className="md:w-1/2 bg-finexa text-white flex flex-col justify-center px-8 py-12 md:p-16 rounded-b-[30px] md:rounded-none shadow-lg md:shadow-none z-0">
        <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
          <img src="/images/Logo.svg" alt="Logo FineXa" className="w-10 h-10" />
          <h1 className="text-3xl font-bold">FineXa</h1>
        </div>
        <p className="text-center md:text-left text-sm md:text-base font-light opacity-90">
          Jangan khawatir. Masukkan email Anda dan kami akan mengirimkan instruksi untuk mengatur ulang password.
        </p>
      </div>

      {/* Bagian Kanan: Formulir Putih */}
      <div className="w-full md:w-1/2 flex items-start md:items-center justify-center p-6 md:p-16 -mt-10 md:mt-0 z-10">
        
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Lupa Password? 🔒</h2>
          <p className="text-sm text-gray-500 mb-6">Kami akan mengirimkan link reset password ke email Anda.</p>
          
          <form className="flex flex-col gap-4">
            
            {/* Input Email */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Alamat Email Terdaftar</label>
              <input 
                type="email" 
                placeholder="nama@email.com" 
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-finexa focus:ring-2 focus:ring-finexa/20 transition-all"
              />
            </div>

            {/* Tombol Kirim Email */}
            <button 
              type="button" 
              className="bg-finexa text-white font-semibold rounded-lg p-3 mt-4 hover:bg-finexaDark hover:-translate-y-0.5 shadow-md hover:shadow-lg transition-all duration-300"
            >
              Kirim Link Reset
            </button>

            {/* Link Kembali ke Login */}
            <div className="text-center mt-4 text-sm text-gray-500">
              Ingat password Anda? 
              <Link to="/login" className="font-semibold text-finexa hover:text-finexaDark hover:underline ml-1 transition-all">
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