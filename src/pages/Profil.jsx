import { Link } from 'react-router-dom';

const Profil = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      
      {/* Header / Navbar Simpel */}
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <img src="/images/Logo.svg" alt="Logo FineXa" className="w-8 h-8" />
          <h1 className="text-2xl font-bold text-gray-800">FineXa</h1>
        </div>
        <Link to="/login" className="text-sm font-medium text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg transition-all">
          Keluar
        </Link>
      </div>

      {/* Konten Utama Profil */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Profil Saya</h2>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Bagian Kiri: Foto Profil */}
          <div className="flex flex-col items-center md:w-1/3">
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-5xl mb-4 overflow-hidden shadow-inner">
              {/* Ini placeholder foto, nanti bisa diganti gambar beneran */}
              👤
            </div>
            <button className="text-sm font-medium text-finexa border border-finexa px-5 py-2 rounded-lg hover:bg-finexa hover:text-white transition-all">
              Ubah Foto
            </button>
            <p className="text-xs text-gray-400 mt-2 text-center">Format: JPG, PNG. Maks: 2MB.</p>
          </div>

          {/* Bagian Kanan: Form Data Diri */}
          <div className="md:w-2/3 flex flex-col gap-5">
            
            {/* Input Nama */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
              <input 
                type="text" 
                defaultValue="Mahasiswa Keren" 
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-finexa focus:ring-2 focus:ring-finexa/20 transition-all" 
              />
            </div>

            {/* Input Email (Read-only) */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Alamat Email</label>
              <input 
                type="email" 
                defaultValue="nama@email.com" 
                className="border border-gray-300 bg-gray-100 text-gray-500 rounded-lg p-3 cursor-not-allowed" 
                readOnly 
                title="Email tidak dapat diubah"
              />
              <p className="text-xs text-gray-500 mt-1">*Email tidak dapat diubah setelah registrasi.</p>
            </div>

            {/* Bagian Keamanan (Ganti Password) */}
            <h3 className="text-lg font-bold text-gray-800 mt-4 border-b pb-2">Keamanan</h3>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Password Baru (Opsional)</label>
              <input 
                type="password" 
                placeholder="Masukkan password baru" 
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-finexa focus:ring-2 focus:ring-finexa/20 transition-all" 
              />
            </div>

            {/* Tombol Simpan */}
            <div className="flex justify-end mt-4">
              <button type="button" className="bg-finexa text-white font-semibold rounded-lg px-8 py-3 hover:bg-finexaDark hover:-translate-y-0.5 shadow-md hover:shadow-lg transition-all duration-300">
                Simpan Perubahan
              </button>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default Profil;