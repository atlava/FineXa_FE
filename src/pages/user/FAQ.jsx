import { useState, useEffect } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null); // Diubah ke null agar tertutup semua di awal
  const [faqData, setFaqData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mesin Penyedot Data FAQ dari Database
  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(import.meta.env.VITE_API_URL + '/faqs', {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        
        const data = await response.json();
        
        if (data.status === 'success') {
          setFaqData(data.data); // Masukkan data dari tabel ke state React
        }
      } catch (error) {
        console.error("Gagal mengambil data FAQ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFaq();
  }, []);

  // SARINGAN: Hanya ambil yang statusnya 'published'
  const faqYangBolehTampil = faqData.filter(faq => faq.status === 'published');


  // FUNGSI SENSOR: Lapor ke Backend setiap kali FAQ diklik
  const handleToggleFaq = async (index, faqId) => {
    // Jika accordion ditutup (klik pertanyaan yang sama), maka tutup saja
    if (activeIndex === index) {
      setActiveIndex(null);
      return;
    }

    // Jika accordion dibuka, buka dulu layarnya biar user nggak nunggu
    setActiveIndex(index);

    // Lalu diam-diam kirim sinyal 'Views' ke API Laravel di belakang layar
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:8000/api/faqs/${faqId}/track`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error("Gagal merekam jejak klik FAQ", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto pt-4 md:pt-8 pb-10">
      
      {/* Header Teks */}
      <div className="text-center mb-8 md:mb-10">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-3">Frequently Asked Questions 🙋‍♂️💬</h1>
        <p className="text-gray-500 font-light text-sm md:text-base px-4">
          Ada pertanyaan seputar FineXa? Temukan jawabannya di bawah ini.
        </p>
      </div>

      {/* Tampilan Loading */}
      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#51BA55]"></div>
        </div>
      ) : faqYangBolehTampil.length === 0 ? (
        /* Menggunakan faqYangBolehTampil untuk mengecek kekosongan data */
        <div className="text-center text-gray-500 py-10">
          Belum ada data FAQ yang dipublikasikan saat ini.
        </div>
      ) : (
        /* List Accordion FAQ */
        <div className="flex flex-col gap-3 md:gap-4">
          {/* Menggunakan faqYangBolehTampil untuk di-looping */}
          {faqYangBolehTampil.map((item, index) => (
            <div 
              key={item.id_faq || index} 
              className="bg-white rounded-[16px] md:rounded-[20px] shadow-sm border border-gray-100 overflow-hidden transition-all duration-300"
            >
              <button 
                onClick={() => handleToggleFaq(index, item.id_faq || item.id)}
                className="w-full text-left px-5 md:px-6 py-4 md:py-5 flex justify-between items-center focus:outline-none hover:bg-gray-50 transition-colors"
              >
                {/* AMBIL DARI KOLOM pertanyaan */}
                <span className={`font-semibold text-sm md:text-base pr-4 ${activeIndex === index ? 'text-[#51BA55]' : 'text-gray-800'}`}>
                  {item.pertanyaan}
                </span>
                
                <span className={`transform transition-transform duration-300 text-[#51BA55] ${activeIndex === index ? 'rotate-180' : ''}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>
              
              <div 
                className={`px-5 md:px-6 overflow-hidden transition-all duration-500 ease-in-out ${activeIndex === index ? 'max-h-[500px] pb-6 md:pb-8 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                {/* AMBIL DARI KOLOM jawaban */}
                <p className="text-gray-500 text-sm md:text-base font-light leading-relaxed text-justify border-t border-gray-100 pt-4 md:pt-6 mt-1">
                  {item.jawaban}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default FAQ;