import { useState } from 'react';
import { Link } from 'react-router-dom';

const FAQ = () => {
  // State untuk melacak pertanyaan mana yang lagi dibuka
  const [activeIndex, setActiveIndex] = useState(0); 

  // Data dummy FAQ-nya (Bisa kamu ganti bahasanya kalau kurang pas)
  const faqData = [
    {
      q: "Apa itu FineXa?",
      a: "FineXa adalah platform cerdas yang membantu Anda menganalisis profil risiko dan memberikan rekomendasi investasi yang dipersonalisasi sesuai tujuan finansial Anda."
    },
    {
      q: "Apakah data saya aman di platform ini?",
      a: "Sangat aman. Kami menggunakan sistem enkripsi standar industri dan tidak akan pernah membagikan data pribadi Anda kepada pihak ketiga tanpa izin eksplisit."
    },
    {
      q: "Bagaimana cara mengubah profil risiko saya?",
      a: "Anda dapat mengambil ulang kuesioner profil risiko melalui halaman Profil kapan saja jika ada perubahan dalam tujuan atau kondisi finansial Anda."
    },
    {
      q: "Apakah layanan analisis ini berbayar?",
      a: "Untuk fitur pembuatan akun dan analisis profil risiko dasar, FineXa sepenuhnya gratis. Kami mungkin menawarkan layanan premium dengan fitur mendalam di masa mendatang."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      
      {/* Navbar Simpel */}
      <nav className="bg-white shadow-sm px-6 md:px-12 py-4 flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <img src="/images/Logo.svg" alt="Logo FineXa" className="w-8 h-8" />
          <span className="text-xl font-bold text-gray-800 tracking-wide">FineXa</span>
        </div>
        <Link to="/login" className="text-sm font-medium text-finexa hover:text-finexaDark transition-all">
          Kembali ke Login
        </Link>
      </nav>

      {/* Konten FAQ */}
      <div className="max-w-3xl mx-auto px-6">
        
        {/* Header Teks */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Pusat Bantuan & FAQ</h1>
          <p className="text-gray-500 font-light text-sm md:text-base">
            Ada pertanyaan seputar FineXa? Temukan jawabannya di bawah ini.
          </p>
        </div>

        {/* List Accordion FAQ */}
        <div className="flex flex-col gap-4">
          {faqData.map((item, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300"
            >
              {/* Tombol Pertanyaan */}
              <button 
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none hover:bg-gray-50 transition-colors"
              >
                <span className={`font-semibold text-sm md:text-base ${activeIndex === index ? 'text-finexa' : 'text-gray-800'}`}>
                  {item.q}
                </span>
                
                {/* Ikon Panah (Muter kalau diklik) */}
                <span className={`transform transition-transform duration-300 text-finexa ${activeIndex === index ? 'rotate-180' : ''}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>
              
              {/* Box Jawaban (Animasi buka-tutup) */}
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${activeIndex === index ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-gray-600 text-sm font-light leading-relaxed border-t border-gray-50 pt-3 mt-1">
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default FAQ;