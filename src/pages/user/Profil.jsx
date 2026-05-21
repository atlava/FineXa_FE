import { useState, useEffect } from 'react';

const Profil = () => {
  // State untuk menyimpan data
  const [idUser, setIdUser] = useState('');
  const [namaLengkap, setNamaLengkap] = useState('');
  const [email, setEmail] = useState('');
  const [passwordBaru, setPasswordBaru] = useState('');
  
  // State untuk status loading dan pesan
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [pesan, setPesan] = useState({ type: '', text: '' });

  // 1. Mesin Penyedot Data (Berjalan saat halaman dibuka)
  useEffect(() => {
    const fetchProfil = async () => {
      try {
        const token = localStorage.getItem('token');
        // Panggil rute bawaan Laravel untuk mengambil KTP user yang sedang login
        const response = await fetch('http://localhost:8000/api/user', {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setIdUser(data.id_user);
          setNamaLengkap(data.nama_lengkap);
          setEmail(data.email);
        }
      } catch (error) {
        console.error("Gagal mengambil data profil", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfil();
  }, []);

  // 2. Mesin Penyimpan Data (Berjalan saat tombol disubmit)
  const handleSimpan = async (e) => {
    e.preventDefault(); // Mencegah halaman reload
    setIsSaving(true);
    setPesan({ type: '', text: '' });

    try {
      const token = localStorage.getItem('token');
      
      // Siapkan paket data yang mau dikirim
      const payload = {
        nama_lengkap: namaLengkap,
        // Jika password diisi, ikut sertakan. Jika tidak, abaikan.
        ...(passwordBaru && { password: passwordBaru }) 
      };

      const response = await fetch(`http://localhost:8000/api/users/${idUser}`, {
        method: 'PUT', // Gunakan PUT untuk update data
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        setPesan({ type: 'success', text: 'Data berhasil diperbarui!' });
        setPasswordBaru(''); // Kosongkan kolom password setelah sukses
      } else {
        setPesan({ type: 'error', text: data.message || 'Gagal memperbarui profil.' });
      }
    } catch (error) {
      setPesan({ type: 'error', text: 'Gagal terhubung ke server.' });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#51BA55]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pt-4 pb-20">
      <div className="bg-white rounded-[24px] md:rounded-[32px] shadow-sm border border-gray-100 p-6 md:p-10">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Profil Saya</h2>

        {/* Tempat Menampilkan Notifikasi Sukses/Error */}
        {pesan.text && (
          <div className={`mb-6 p-4 rounded-xl text-sm font-medium ${pesan.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {pesan.text}
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Bagian Kiri: Foto Profil (Statis Dulu Sesuai Rencana) */}
          <div className="flex flex-col items-center md:w-1/3">
            <div className="w-28 h-28 md:w-32 md:h-32 bg-gray-100 rounded-full flex items-center justify-center text-4xl md:text-5xl mb-4 overflow-hidden shadow-inner border-4 border-white ring-1 ring-gray-100">
              👤</div>
          </div>

          {/* Bagian Kanan: Form Data Diri */}
          <form onSubmit={handleSimpan} className="md:w-2/3 flex flex-col gap-5">
            <div className="flex flex-col">
              <label className="text-xs md:text-sm font-semibold text-gray-700 mb-1.5">Nama Lengkap</label>
              <input 
                type="text" 
                value={namaLengkap}
                onChange={(e) => setNamaLengkap(e.target.value)}
                required
                className="border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-[#51BA55] focus:ring-2 focus:ring-[#51BA55]/20 transition-all text-sm md:text-base" 
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xs md:text-sm font-semibold text-gray-700 mb-1.5">Alamat Email</label>
              <input 
                type="email" 
                value={email}
                className="border border-gray-200 bg-gray-50 text-gray-500 rounded-xl p-3 cursor-not-allowed text-sm md:text-base" 
                readOnly 
              />
              <p className="text-[10px] text-gray-400 mt-1">Email tidak dapat diubah.</p>
            </div>

            <h3 className="text-lg font-bold text-gray-800 mt-4 border-b pb-2">Keamanan</h3>

            <div className="flex flex-col">
              <label className="text-xs md:text-sm font-semibold text-gray-700 mb-1.5">Password Baru (Opsional)</label>
              <input 
                type="password" 
                placeholder="Kosongkan jika tidak ingin mengubah password" 
                value={passwordBaru}
                onChange={(e) => setPasswordBaru(e.target.value)}
                minLength={6}
                className="border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-[#51BA55] focus:ring-2 focus:ring-[#51BA55]/20 transition-all text-sm md:text-base" 
              />
            </div>

            <div className="flex justify-end mt-4">
              <button 
                type="submit" 
                disabled={isSaving}
                className={`${isSaving ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#51BA55] hover:bg-[#3A8E3F] hover:-translate-y-0.5 shadow-md shadow-green-100'} text-white font-semibold rounded-xl px-8 py-3 transition-all w-full md:w-auto`}
              >
                {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profil;