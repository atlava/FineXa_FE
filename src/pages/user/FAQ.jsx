import { useState } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0); 

  const faqData = [
    { 
      q: "Apa itu FineXa?", 
      a: "FineXa adalah platform layanan konsultasi rekomendasi investasi mandiri yang dirancang untuk membantu investor dalam membuat keputusan investasi yang lebih cerdas dan berdasarkan data. Melalui pendekatan berbasis teknologi, FineXa menyediakan analisis mendalam terhadap berbagai instrumen investasi, mulai dari saham, obligasi, hingga reksa dana, yang disesuaikan dengan profil risiko dan tujuan keuangan setiap individu. Dengan fitur-fitur inovatifnya, FineXa menjadi mitra terpercaya bagi investor pemula maupun berpengalaman untuk mengelola portofolio investasi mereka dengan lebih efisien dan terarah menuju kemandirian finansial." 
    },
    { 
      q: "Bagaimana sistem rekomendasi investasi FineXa bekerja?", 
      a: "Sistem rekomendasi investasi FineXa beroperasi dengan menggunakan algoritma canggih yang dirancang khusus untuk memadukan berbagai data pasar keuangan terkini, analisis fundamental perusahaan, serta tren ekonomi makro secara real-time. Melalui pemrosesan data yang mendalam, sistem ini mampu menyaring ribuan instrumen investasi untuk memberikan saran yang paling relevan dengan profil risiko dan tujuan keuangan pengguna. Selain itu, sistem FineXa juga bersifat dinamis, secara berkala memperbarui rekomendasinya seiring dengan perubahan kondisi pasar dan perkembangan teknologi keuangan terkini." 
    },
    { 
      q: "Apa saja yang dipelajari di Edukasi Investasi FineXa?", 
      a: "Belajar investasi kini lebih mudah melalui Edukasi Investasi FineXa. Dapatkan akses ke berbagai materi pembelajaran yang informatif mulai dari konsep dasar investasi hingga strategi pengelolaan portofolio yang lebih canggih. Melalui artikel, video edukatif, dan webinar interaktif, FineXa berkomitmen untuk meningkatkan literasi keuangan pengguna agar dapat mengambil keputusan investasi yang lebih bijak dan terinformasi." 
    },
    { 
      q: "Apa itu Profil Risiko?", 
      a: "Profil risiko adalah gambaran kemampuan dan kesediaan seseorang dalam menghadapi risiko fluktuasi nilai investasi. Setiap orang memiliki toleransi risiko yang berbeda-beda, mulai dari yang sangat konservatif hingga sangat agresif. Dengan memahami profil risiko kamu, FineXa dapat memberikan rekomendasi produk investasi yang paling sesuai agar perjalanan investasimu terasa lebih nyaman dan terarah sesuai dengan tujuan keuangan jangka panjang." 
    },
    {
      q: "Bagaimana perlindungan data pengguna di FineXa?",
      a: "Keamanan data pengguna adalah prioritas utama kami di FineXa. Kami mengimplementasikan standar keamanan teknologi informasi terkini guna melindungi informasi pribadi dan finansial kamu dari akses yang tidak sah. Melalui penggunaan enkripsi tingkat tinggi dan sistem pemantauan yang ketat, kami berupaya memastikan seluruh data pengguna tersimpan dengan aman dan tetap terjaga kerahasiaannya sesuai dengan regulasi perlindungan data yang berlaku. "
    },
    {
      q: "Memahami Risiko Investasi",
      a: "Berinvestasi selalu memiliki risiko, namun dengan pemahaman yang tepat, risiko tersebut dapat dikelola dengan bijak. Setiap instrumen investasi memiliki karakteristik risiko yang berbeda-beda, seperti risiko pasar, risiko likuiditas, hingga risiko kredit. FineXa membantu pengguna untuk mengenali berbagai jenis risiko ini melalui analisis data yang transparan sehingga kamu dapat mengambil langkah investasi yang lebih terencana dan sesuai dengan batas toleransi risikomu."
    },
  ];

  return (
    <div className="max-w-3xl mx-auto pt-4 md:pt-8 pb-10">
      
      {/* Header Teks */}
      <div className="text-center mb-8 md:mb-10">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-3">Frequently Ask Question</h1>
        <p className="text-gray-500 font-light text-sm md:text-base px-4">
          Ada pertanyaan seputar FineXa? Temukan jawabannya di bawah ini.
        </p>
      </div>

      {/* List Accordion FAQ */}
      <div className="flex flex-col gap-3 md:gap-4">
        {faqData.map((item, index) => (
          <div 
            key={index} 
            className="bg-white rounded-[16px] md:rounded-[20px] shadow-sm border border-gray-100 overflow-hidden transition-all duration-300"
          >
            <button 
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              className="w-full text-left px-5 md:px-6 py-4 md:py-5 flex justify-between items-center focus:outline-none hover:bg-gray-50 transition-colors"
            >
              <span className={`font-semibold text-sm md:text-base pr-4 ${activeIndex === index ? 'text-[#51BA55]' : 'text-gray-800'}`}>
                {item.q}
              </span>
              
              <span className={`transform transition-transform duration-300 text-[#51BA55] ${activeIndex === index ? 'rotate-180' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </button>
            
            <div 
              className={`px-5 md:px-6 overflow-hidden transition-all duration-500 ease-in-out ${activeIndex === index ? 'max-h-[500] pb-6 md:pb-8 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <p className="text-gray-500 text-sm md:text-base font-light leading-relaxed text-justify border-t border-gray-100 pt-4 md:pt-6 mt-1">
                {item.a}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default FAQ;