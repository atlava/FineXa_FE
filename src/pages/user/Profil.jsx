const Profil = () => {
  return (
    <div className="max-w-4xl mx-auto pt-4">
      <div className="bg-white rounded-[24px] md:rounded-[32px] shadow-sm border border-gray-100 p-6 md:p-10">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Profil Saya</h2>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Bagian Kiri: Foto Profil */}
          <div className="flex flex-col items-center md:w-1/3">
            <div className="w-28 h-28 md:w-32 md:h-32 bg-gray-100 rounded-full flex items-center justify-center text-4xl md:text-5xl mb-4 overflow-hidden shadow-inner border-4 border-white ring-1 ring-gray-100">
              👤
            </div>
            <button className="text-xs md:text-sm font-semibold text-[#51BA55] border-2 border-[#51BA55] px-5 py-2 rounded-xl hover:bg-[#51BA55] hover:text-white transition-all">
              Ubah Foto
            </button>
            <p className="text-[10px] md:text-xs text-gray-400 mt-3 text-center font-medium">Format: JPG, PNG. Maks: 2MB.</p>
          </div>

          {/* Bagian Kanan: Form Data Diri */}
          <div className="md:w-2/3 flex flex-col gap-5">
            <div className="flex flex-col">
              <label className="text-xs md:text-sm font-semibold text-gray-700 mb-1.5">Nama Lengkap</label>
              <input 
                type="text" 
                defaultValue="Mahasiswa Keren" 
                className="border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-[#51BA55] focus:ring-2 focus:ring-[#51BA55]/20 transition-all text-sm md:text-base" 
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xs md:text-sm font-semibold text-gray-700 mb-1.5">Alamat Email</label>
              <input 
                type="email" 
                defaultValue="nama@email.com" 
                className="border border-gray-200 bg-gray-50 text-gray-500 rounded-xl p-3 cursor-not-allowed text-sm md:text-base" 
                readOnly 
              />
            </div>

            <h3 className="text-lg font-bold text-gray-800 mt-4 border-b pb-2">Keamanan</h3>

            <div className="flex flex-col">
              <label className="text-xs md:text-sm font-semibold text-gray-700 mb-1.5">Password Baru (Opsional)</label>
              <input 
                type="password" 
                placeholder="Masukkan password baru" 
                className="border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-[#51BA55] focus:ring-2 focus:ring-[#51BA55]/20 transition-all text-sm md:text-base" 
              />
            </div>

            <div className="flex justify-end mt-4">
              <button type="button" className="bg-[#51BA55] text-white font-semibold rounded-xl px-8 py-3 hover:bg-[#3A8E3F] hover:-translate-y-0.5 shadow-md shadow-green-100 transition-all w-full md:w-auto">
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