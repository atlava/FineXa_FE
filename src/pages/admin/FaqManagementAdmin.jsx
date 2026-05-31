import { useState, useEffect } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp, X, ArrowLeft, Save, Eye, EyeOff } from 'lucide-react'; // 👈 Tambah icon Eye & EyeOff

const FaqManagementAdmin = () => {
  const [faqs, setFaqs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isAdding, setIsAdding] = useState(false); 
  const [openFaqId, setOpenFaqId] = useState(null);
  const [deleteFaqTarget, setDeleteFaqTarget] = useState(null);

  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [isActive, setIsActive] = useState(true); 
  const [newCategory, setNewCategory] = useState('Tentang Platform'); 

  // ==========================================
  // PERBAIKAN 1: Hitung Statistik Otomatis dari Database
  // ==========================================
  const totalKonten = faqs.length;
  const publishedCount = faqs.filter(f => f.status === 'published').length;
  const unpublishedCount = faqs.filter(f => f.status === 'unpublished').length; 

  // ==========================================
  // AREA INTEGRASI API (Tarik Data Nyata)
  // ==========================================
  const fetchFaqs = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/api/faqs', {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if (data.status === 'success' && data.data) {
        setFaqs(data.data.reverse()); 
      }
    } catch (error) {
      console.error("Gagal mengambil data FAQ:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const toggleFaq = (id) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  // ==========================================
  // PERBAIKAN 2: Fungsi Baru Untuk Mengubah Status Publish/Unpublish
  // ==========================================
  const handleToggleStatus = async (faq) => {
    // Tentukan status kebalikannya
    const newStatus = faq.status === 'published' ? 'unpublished' : 'published';
    // Ambil ID yang benar (id_faq dari HeidiSQL atau id default)
    const faqId = faq.id_faq || faq.id; 

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8000/api/faqs/${faqId}`, {
        method: 'PUT', // Gunakan PUT untuk mengupdate data
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          kategori: faq.kategori,
          pertanyaan: faq.pertanyaan,
          jawaban: faq.jawaban,
          status: newStatus // Kirim status terbarunya
        })
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        // Jika sukses di DB, langsung ubah tampilannya di layar (React State)
        setFaqs(faqs.map(f => (f.id_faq === faqId || f.id === faqId) ? { ...f, status: newStatus } : f));
      } else {
        alert("Gagal mengubah status FAQ. Pastikan fungsi Update di controller sudah menerima 'status'.");
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const faqId = deleteFaqTarget.id_faq || deleteFaqTarget.id;
      
      const response = await fetch(`http://localhost:8000/api/faqs/${faqId}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.status === 'success') {
        setFaqs(faqs.filter(f => (f.id_faq || f.id) !== faqId));
        setDeleteFaqTarget(null);
      } else {
        alert('Gagal menghapus FAQ');
      }
    } catch (error) {
      console.error("Gagal menghapus FAQ:", error);
    }
  };

  const handleSaveFaq = async (e) => {
    e.preventDefault();
    if (!newQuestion || !newAnswer) return alert("Pertanyaan dan Jawaban wajib diisi!");

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/api/faqs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          kategori: newCategory,
          pertanyaan: newQuestion,
          jawaban: newAnswer,
          status: isActive ? 'published' : 'unpublished'
        })
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        setFaqs([data.data, ...faqs]); 
        setNewQuestion('');
        setNewAnswer('');
        setNewCategory('Tentang Platform');
        setIsActive(true); // Reset checkbox ke true
        setIsAdding(false);
      } else {
        alert("Gagal menyimpan FAQ, pastikan isian benar.");
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat menyimpan:", error);
    }
  };

  return (
    <div className="space-y-6 relative">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-950 tracking-tight">Content Management ✏️</h1>
          <p className="text-gray-500 text-sm mt-1">Kelola konten edukasi dan materi pembelajaran</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)} 
          className="flex items-center gap-2 bg-[#51BA55] hover:bg-[#439c47] text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" /> Tambah FAQ
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">Content</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{totalKonten}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">Published</p>
          <p className="text-3xl font-bold text-emerald-600 mt-2">{publishedCount}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">Unpublished</p>
          <p className="text-3xl font-bold text-amber-500 mt-2">{unpublishedCount}</p>
        </div>
      </div>

      <div className="space-y-6 pt-2">
        {isLoading ? (
           <div className="text-center py-10 text-gray-400 font-medium">Memuat data FAQ...</div>
        ) : faqs.length === 0 ? (
           <div className="text-center py-10 text-gray-400 font-medium">Belum ada data FAQ.</div>
        ) : (
          faqs.map((faq) => {
            const currentId = faq.id_faq || faq.id;
            const isOpen = openFaqId === currentId;
            return (
              <div key={currentId} className="space-y-2 animate-fade-in">
                
                {/* Header Kategori & Label Disembunyikan */}
                <div className="flex items-center gap-2 pl-1">
                  <h3 className="text-sm font-bold text-[#51BA55] tracking-wide">
                    {faq.kategori}
                  </h3>
                  {faq.status === 'unpublished' && (
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] font-bold rounded-md uppercase tracking-wider">
                      Disembunyikan
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-2 w-full">
                  <div 
                    onClick={() => toggleFaq(currentId)}
                    className={`flex-1 bg-white border ${faq.status === 'unpublished' ? 'border-gray-200 opacity-60' : 'border-gray-100'} hover:border-[#51BA55]/30 rounded-xl shadow-sm p-4 flex flex-col cursor-pointer transition-all`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className={`text-sm font-semibold ${faq.status === 'unpublished' ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                        {faq.pertanyaan}
                      </span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                    </div>
                    {isOpen && (
                      <div className="mt-3 pt-3 border-t border-gray-50 text-xs text-gray-500 leading-relaxed">
                        {faq.jawaban}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {/* Tombol Toggle Publish/Unpublish */}
                    <button 
                      onClick={() => handleToggleStatus(faq)}
                      title={faq.status === 'published' ? 'Sembunyikan FAQ' : 'Tampilkan FAQ'}
                      className={`p-3.5 rounded-xl transition shadow-sm flex items-center justify-center ${
                        faq.status === 'published' 
                          ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' 
                          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}
                    >
                      {faq.status === 'published' ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>

                    <button 
                      onClick={() => setDeleteFaqTarget(faq)}
                      className="p-3.5 bg-red-50 text-red-500 hover:bg-red-100 rounded-xl transition shadow-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {isAdding && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-50 flex flex-col animate-fade-in">
            <div className="sticky top-0 bg-white p-6 border-b border-gray-100 flex justify-between items-center z-10 rounded-t-2xl">
              <div className="flex items-center gap-4">
                <button onClick={() => setIsAdding(false)} className="p-2 hover:bg-gray-50 rounded-xl border border-gray-200 text-gray-600 transition">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 tracking-tight">Tambah FAQ Baru</h2>
                  <p className="text-gray-400 text-xs mt-0.5">Tambahkan pertanyaan dan jawaban untuk FAQ</p>
                </div>
              </div>
              <button onClick={handleSaveFaq} className="flex items-center gap-2 bg-[#51BA55] hover:bg-[#439c47] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all">
                <Save className="w-4 h-4" /> Simpan
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-800">Pilih Kategori Konten</label>
                <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#51BA55] focus:bg-white transition-all font-medium text-gray-700 cursor-pointer">
                  <option value="Tentang Platform">Tentang Platform</option>
                  <option value="Rekomendasi Investasi">Rekomendasi Investasi</option>
                  <option value="Edukasi Investasi">Edukasi Investasi</option>
                  <option value="Profil Risiko">Profil Risiko</option>
                  <option value="Keamanan Data">Keamanan Data</option>
                  <option value="Risiko Investasi">Risiko Investasi</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-800">Pertanyaan</label>
                <input type="text" placeholder="Masukkan pertanyaan..." value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#51BA55] focus:bg-white transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-800">Jawaban</label>
                <textarea placeholder="Masukkan jawaban..." rows="5" value={newAnswer} onChange={(e) => setNewAnswer(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#51BA55] focus:bg-white transition-all resize-none leading-relaxed" />
              </div>
              <div className="flex items-start gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <input type="checkbox" id="active-status" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="w-5 h-5 rounded border-gray-300 text-[#51BA55] focus:ring-[#51BA55] accent-[#51BA55] mt-0.5 cursor-pointer" />
                <label htmlFor="active-status" className="flex flex-col cursor-pointer select-none">
                  <span className="text-sm font-bold text-gray-800">Aktif</span>
                  <span className="text-xs text-gray-400 mt-0.5">FAQ akan otomatis ditampilkan kepada pengguna FineXa</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {deleteFaqTarget && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-[320px] p-6 shadow-2xl relative text-center border border-gray-50 animate-fade-in">
            <button onClick={() => setDeleteFaqTarget(null)} className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100 text-gray-400 transition">
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-base font-bold text-gray-900 mt-2 px-4">Yakin untuk Menghapus FAQ ini?</h3>
            <p className="text-gray-400 text-[11px] mt-1 px-4 truncate font-medium">Kategori: {deleteFaqTarget.kategori}</p>
            <div className="mt-6 flex flex-col gap-2">
              <button onClick={handleConfirmDelete} className="w-full py-2.5 bg-red-500 hover:bg-red-600 rounded-xl text-xs font-bold text-white shadow-sm transition-all">Ya, Hapus</button>
              <button onClick={() => setDeleteFaqTarget(null)} className="w-full py-2.5 bg-white border border-gray-300 hover:bg-gray-50 rounded-xl text-xs font-bold text-gray-700 shadow-sm transition-all">Batalkan</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default FaqManagementAdmin;