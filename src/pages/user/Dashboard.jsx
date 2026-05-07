const Dashboard = () => {
  const instrumen = [
    { 
      nama: "Deposito", 
      deskripsi: "Investasi aman dengan bunga tetap", 
      risiko: "Rendah", 
      returnVal: "3-5% p.a",
      rekomendasi: false,
      icon: "🛡️"
    },
    { 
      nama: "Reksadana Pasar Uang", 
      deskripsi: "Likuiditas tinggi, risiko minimal", 
      risiko: "Rendah", 
      returnVal: "4-6% p.a",
      rekomendasi: false,
      icon: "📊"
    },
    { 
      nama: "Reksadana Campuran", 
      deskripsi: "Kombinasi saham dan obligasi", 
      risiko: "Sedang", 
      returnVal: "8-12% p.a",
      rekomendasi: true,
      icon: "🥧"
    },
    { 
      nama: "Reksadana Saham", 
      deskripsi: "Potensi return lebih tinggi", 
      risiko: "Sedang", 
      returnVal: "10-15% p.a",
      rekomendasi: true,
      icon: "📈"
    },
    { 
      nama: "Saham", 
      deskripsi: "Potensi keuntungan maksimal", 
      risiko: "Tinggi", 
      returnVal: "15-30% p.a",
      rekomendasi: false,
      icon: "📉"
    },
    { 
      nama: "Kripto", 
      deskripsi: "Volatilitas sangat tinggi", 
      risiko: "Tinggi", 
      returnVal: "Variatif",
      rekomendasi: false,
      icon: "✨"
    },
  ];

  const tips = [
    { title: "Diversifikasi Portfolio", desc: "Jangan menaruh semua telur dalam satu keranjang. Sebarkan investasi Anda ke berbagai instrumen untuk mengurangi risiko.", icon: "🎯" },
    { title: "Investasi Jangka Panjang", desc: "Investasi terbaik adalah yang dilakukan secara konsisten dalam jangka waktu panjang. Bersabar adalah kunci kesuksesan.", icon: "🕒" },
    { title: "Pahami Profil Risiko", desc: "Kenali toleransi risiko Anda sebelum berinvestasi. Investasi yang tepat adalah yang sesuai dengan kondisi finansial Anda.", icon: "🛡️" },
    { title: "Review Berkala", desc: "Evaluasi portofolio investasi Anda secara rutin dan sesuaikan strategi berdasarkan perubahan kondisi pasar dan tujuan finansial.", icon: "💡" }
  ];

  return (
    <div className="pb-10">
      {/* Welcome Header */}
      <div className="bg-[#51BA55] rounded-[24px] p-8 md:p-10 text-white mb-10 relative overflow-hidden shadow-sm">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Selamat Datang di FineXa! 👋</h1>
          <p className="text-white/90 font-light text-sm md:text-base max-w-2xl leading-relaxed">
            Mulai perjalanan investasi Anda dengan rekomendasi berbasis AI yang disesuaikan dengan profil risiko dan tujuan finansial Anda.
          </p>
        </div>
        {/* Ornamen Lingkaran ala Figma */}
        <div className="absolute -top-24 -right-10 w-64 h-64 bg-white opacity-10 rounded-full pointer-events-none"></div>
      </div>

      {/* Instrumen Investasi Section */}
      <div className="mb-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Instrumen Investasi</h2>
          <p className="text-sm text-gray-500 mt-1">Rekomendasi instrumen berdasarkan profil risiko <span className="font-bold text-gray-800">Moderat</span></p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {instrumen.map((item, index) => (
            <div 
              key={index} 
              className={`bg-white p-6 rounded-[20px] shadow-sm relative group flex flex-col h-full ${
                item.rekomendasi ? 'border-2 border-[#FFC107]' : 'border border-gray-100'
              }`}
            >
              {item.rekomendasi && (
                <span className="absolute top-4 right-4 text-[#FFC107] text-[10px] font-bold uppercase tracking-wider">
                  Rekomendasi
                </span>
              )}
              
              {/* Icon Box */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 ${
                item.rekomendasi ? 'bg-yellow-50' : 'bg-gray-50'
              }`}>
                {item.icon}
              </div>

              <h3 className="text-lg font-bold text-gray-800 mb-1">{item.nama}</h3>
              <p className="text-xs text-gray-500 mb-6 font-light">{item.deskripsi}</p>
              
              <div className="flex justify-between items-end mt-auto pt-4 border-t border-gray-50">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-semibold mb-1">Risiko</p>
                  <p className="text-sm font-bold text-gray-800">{item.risiko}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-400 uppercase font-semibold mb-1">Return</p>
                  <p className={`text-sm font-bold ${item.returnVal === 'Variatif' ? 'text-[#51BA55]' : 'text-[#51BA55]'}`}>
                    {item.returnVal}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips Investasi Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          Tips Investasi 💡
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tips.map((tip, index) => (
            <div key={index} className="bg-white p-6 rounded-[20px] border border-gray-100 shadow-sm flex gap-4">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-xl flex-shrink-0">
                {tip.icon}
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-2">{tip.title}</h4>
                <p className="text-xs text-gray-500 font-light leading-relaxed">
                  {tip.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;