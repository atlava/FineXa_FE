import { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp, X, ArrowLeft, Save } from 'lucide-react';

const FaqManagementAdmin = () => {
  // 1. STATE UTAMA DATA FAQ
  const [faqs, setFaqs] = useState([
    { id: 1, category: 'Tentang Platform', question: 'Apa itu FineXa?', answer: 'FineXa adalah platform penasihat investasi digital yang membantu Anda mengelola finansial berdasarkan profil risiko pribadi.', status: 'published' },
    { id: 2, category: 'Rekomendasi Investasi', question: 'Bagaimana sistem rekomendasi investasi FineXa bekerja?', answer: 'Sistem kami menganalisis jawaban kuesioner profil risiko Anda lalu mencocokkannya dengan algoritma alokasi aset yang optimal.', status: 'published' },
    { id: 3, category: 'Edukasi Investasi', question: 'Apa saja yang dipelajari di Edukasi Investasi FineXa?', answer: 'Mulai dari dasar-dasar reksa dana, saham, obligasi, hingga manajemen portofolio tingkat lanjut.', status: 'published' },
    { id: 4, category: 'Profil Risiko', question: 'Apa itu Profil Risiko?', answer: 'Profil risiko adalah tingkat toleransi atau kesiapan seorang investor dalam menghadapi kemungkinan penurunan nilai investasi.', status: 'published' },
    { id: 5, category: 'Keamanan Data', question: 'Bagaimana perlindungan data pengguna di FineXa?', answer: 'Semua data pengguna dienkripsi dengan standar bank tingkat tinggi dan diproteksi ketat sesuai regulasi yang berlaku.', status: 'published' },
    { id: 6, category: 'Risiko Investasi', question: 'Memahami Risiko Investasi', answer: 'Setiap investasi memiliki risiko, termasuk risiko pasar, risiko likuiditas, dan risiko inflasi yang wajib dipahami sebelum memulai.', status: 'published' },
  ]);

  // 2. STATE UNTUK NAVIGASI VIEW & INTERAKSI
  const [isAdding, setIsAdding] = useState(false); // Mengontrol swap ke halaman form
  const [openFaqId, setOpenFaqId] = useState(null);
  const [deleteFaqTarget, setDeleteFaqTarget] = useState(null);

  // 3. STATE INPUT FORM TAMBAH FAQ BARU
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [newCategory, setNewCategory] = useState('Tentang Platform'); // Default kategori

  // Hitung Data Statistik Mini Cards
  const totalKonten = faqs.length;
  const publishedCount = faqs.filter(f => f.status === 'published').length;
  const unpublishedCount = faqs.filter(f => f.status === 'unpublished').length + 2; // Plus cadangan statis figma

  // Toggle Akordion
  const toggleFaq = (id) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  // Fungsi Hapus FAQ
  const handleConfirmDelete = () => {
    setFaqs(faqs.filter(f => f.id !== deleteFaqTarget.id));
    setDeleteFaqTarget(null);
  };

  // Fungsi Simpan FAQ Baru ke List Utama
  const handleSaveFaq = (e) => {
    e.preventDefault();
    if (!newQuestion || !newAnswer) return alert("Pertanyaan dan Jawaban wajib diisi!");

    const newFaqItem = {
      id: Date.now(),
      category: newCategory,
      question: newQuestion,
      answer: newAnswer,
      status: isActive ? 'published' : 'unpublished'
    };

    setFaqs([newFaqItem, ...faqs]); // Masukkan ke urutan paling atas
    
    // Reset Form & Kembali ke Tampilan List
    setNewQuestion('');
    setNewAnswer('');
    setIsActive(false);
    setIsAdding(false);
  };

  // ========================================================
  // TAMPILAN KEDUA: FORM TAMBAH FAQ BARU (PERSIS FIGMA)
  // ========================================================
  if (isAdding) {
    return (
      <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
        
        {/* HEADER FORM */}
        <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsAdding(false)} 
              className="p-2 hover:bg-gray-50 rounded-xl border border-gray-200 text-gray-600 transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Tambah FAQ Baru</h1>
              <p className="text-gray-400 text-xs mt-0.5">Tambahkan pertanyaan dan jawaban untuk FAQ</p>
            </div>
          </div>
          <button 
            onClick={handleSaveFaq}
            className="flex items-center gap-2 bg-finexa hover:bg-finexaDark text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all"
          >
            <Save className="w-4 h-4" /> Simpan
          </button>
        </div>

        {/* INPUT PILIHAN KATEGORI */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-2">
          <label className="text-sm font-bold text-gray-800">Pilih Kategori Konten</label>
          <select 
            value={newCategory} 
            onChange={(e) => setNewCategory(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-finexa focus:bg-white transition-all font-medium text-gray-700"
          >
            <option value="Tentang Platform">Tentang Platform</option>
            <option value="Rekomendasi Investasi">Rekomendasi Investasi</option>
            <option value="Edukasi Investasi">Edukasi Investasi</option>
            <option value="Profil Risiko">Profil Risiko</option>
            <option value="Keamanan Data">Keamanan Data</option>
            <option value="Risiko Investasi">Risiko Investasi</option>
          </select>
        </div>

        {/* BOX 1: PERTANYAAN */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-2">
          <label className="text-sm font-bold text-gray-800">Pertanyaan</label>
          <input
            type="text"
            placeholder="Masukkan pertanyaan..."
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-finexa focus:bg-white transition-all"
          />
        </div>

        {/* BOX 2: JAWABAN */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-2">
          <label className="text-sm font-bold text-gray-800">Jawaban</label>
          <textarea
            placeholder="Masukkan jawaban..."
            rows="6"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-finexa focus:bg-white transition-all resize-none leading-relaxed"
          />
        </div>

        {/* BOX 3: STATUS AKTIF CHECKBOX */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
          <input
            type="checkbox"
            id="active-status"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="w-5 h-5 rounded border-gray-300 text-finexa focus:ring-finexa accent-finexa mt-0.5 cursor-pointer"
          />
          <label htmlFor="active-status" className="flex flex-col cursor-pointer select-none">
            <span className="text-sm font-bold text-gray-800">Aktif</span>
            <span className="text-xs text-gray-400 mt-0.5">FAQ akan ditampilkan kepada pengguna</span>
          </label>
        </div>

      </div>
    );
  }

  // ========================================================
  // TAMPILAN UTAMA: HALAMAN LIST CONTENT MANAGEMENT
  // ========================================================
  return (
    <div className="space-y-6">
      
      {/* HEADER SECTION */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-950 tracking-tight">Content Management</h1>
          <p className="text-gray-500 text-sm mt-1">Kelola konten edukasi dan materi pembelajaran</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)} // Klik ini untuk masuk halaman tambah FAQ
          className="flex items-center gap-2 bg-finexa hover:bg-finexaDark text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" /> Tambah FAQ
        </button>
      </div>

      {/* THREE STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-[11px] font-medium text-gray-400">Total Konten</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{totalKonten}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-[11px] font-medium text-gray-400">Published</p>
          <p className="text-3xl font-bold text-emerald-600 mt-2">{publishedCount}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-[11px] font-medium text-gray-400">Unpublished</p>
          <p className="text-3xl font-bold text-amber-500 mt-2">{unpublishedCount}</p>
        </div>
      </div>

      {/* CATEGORIZED FAQ LIST */}
      <div className="space-y-6 pt-2">
        {faqs.map((faq) => {
          const isOpen = openFaqId === faq.id;
          return (
            <div key={faq.id} className="space-y-2">
              <h3 className="text-sm font-bold text-finexa tracking-wide pl-1">
                {faq.category}
              </h3>
              
              <div className="flex items-center gap-3 w-full">
                <div 
                  onClick={() => toggleFaq(faq.id)}
                  className="flex-1 bg-white border border-gray-100 hover:border-gray-200 rounded-xl shadow-sm p-4 flex flex-col cursor-pointer transition-all"
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="text-sm font-semibold text-gray-800">{faq.question}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </div>
                  {isOpen && (
                    <div className="mt-3 pt-3 border-t border-gray-50 text-xs text-gray-500 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => setDeleteFaqTarget(faq)}
                  className="p-3.5 bg-red-50 text-red-500 hover:bg-red-100 rounded-xl transition shadow-sm flex-shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* POP UP MODAL: DELETE CONFIRMATION */}
      {deleteFaqTarget && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-[320px] p-6 shadow-2xl relative text-center border border-gray-50">
            <button 
              onClick={() => setDeleteFaqTarget(null)}
              className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100 text-gray-400 transition"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-base font-bold text-gray-900 mt-2 px-4">
              Yakin untuk Menghapus FAQ ini?
            </h3>
            <p className="text-gray-400 text-[11px] mt-1 px-4 truncate font-medium">
              Kategori: {deleteFaqTarget.category}
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <button 
                onClick={handleConfirmDelete}
                className="w-full py-2.5 bg-white border border-gray-300 hover:bg-gray-50 rounded-xl text-xs font-bold text-gray-700 shadow-sm transition-all"
              >
                Ya
              </button>
              <button 
                onClick={() => setDeleteFaqTarget(null)}
                className="w-full py-2.5 bg-white border border-gray-300 hover:bg-gray-50 rounded-xl text-xs font-bold text-gray-700 shadow-sm transition-all"
              >
                Batalkan
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default FaqManagementAdmin;