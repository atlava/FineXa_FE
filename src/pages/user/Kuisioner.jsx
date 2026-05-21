import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Kuisioner = () => {
  const navigate = useNavigate();

  // 1. Data Pertanyaan
  const questions = [
    {
      q: "Kapan Anda berencana mencairkan dana investasi ini?",
      options: ["Kurang dari 1 tahun", "1 sampai 5 tahun", "Lebih dari 5 tahun"]
    },
    {
      q: "Jika nilai investasi Anda tiba-tiba turun 15% dalam sebulan, apa yang Anda lakukan?",
      options: ["Panik dan menjual semuanya agar tidak rugi lebih banyak", "Cemas, tapi membiarkannya saja menunggu naik lagi", "Tenang dan justru membeli lebih banyak mumpung harganya turun"]
    },
    {
      q: "Berapa persen dari pendapatan bulanan yang bisa Anda sisihkan untuk investasi?",
      options: ["Kurang dari 10%", "Antara 10% - 20%", "Lebih dari 20%"]
    },
    {
      q: "Bagaimana kondisi hutang atau cicilan Anda saat ini?",
      options: ["Cicilan sangat berat, sering kurang uang", "Ada cicilan, tapi masih bisa bayar tepat waktu", "Tidak punya hutang / cicilan sangat ringan"]
    },
    {
      q: "Seberapa paham Anda tentang produk investasi (seperti Reksadana atau Saham)?",
      options: ["Sama sekali tidak paham, baru mau belajar", "Cukup paham dasar-dasarnya", "Sangat paham dan sudah pernah berinvestasi"]
    }
  ];

  // 2. Laci Ingatan (State)
  const [currentStep, setCurrentStep] = useState(0); 
  const [answers, setAnswers] = useState(Array(5).fill(null));
  
  // Laci Tambahan untuk Loading dan Error
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // 3. Fungsi Saat Memilih Jawaban
  const handleSelect = (optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = optionIndex;
    setAnswers(newAnswers);
  };

  // 4. Fungsi Kurir Mengirim Jawaban ke Laravel
 const submitKuesioner = async () => {
    setIsLoading(true);
    setErrorMsg('');

    try {
      const token = localStorage.getItem('token');
      
      // --- LOGIKA PENENTUAN PROFIL (Untuk syarat validasi Laravel) ---
      // Kita hitung total skor sementara untuk nentuin label profil
      const totalSkorTemp = answers.reduce((a, b) => a + (b + 1), 0);
      let labelProfil = "Moderat";
      if (totalSkorTemp <= 7) labelProfil = "Konservatif";
      else if (totalSkorTemp >= 12) labelProfil = "Agresif";

      // --- MERAKIT PAKET SESUAI PESANAN LARAVEL ---
      const paketData = {
        skor_waktu: answers[0] + 1,       // +1 karena index 0-2 diubah jadi 1-3
        skor_risiko: answers[1] + 1,
        skor_kapasitas: answers[2] + 1,
        skor_hutang: answers[3] + 1,
        skor_pengetahuan: answers[4] + 1,
        profil_risiko: labelProfil        // Syarat 'required|string' dari Laravel
      };

      const response = await fetch('http://127.0.0.1:8000/api/kuesioner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(paketData) // Kirim paket yang sudah rapi
      });

      const data = await response.json();

      if (response.ok) {
         navigate('/hasil-analisis'); 
      } else {
         // Jika Validasi gagal
         setErrorMsg(data.message || 'Gagal menyimpan hasil kuesioner.');
      }
    } catch (err) {
      setErrorMsg('Gagal terhubung ke server. Pastikan Laravel menyala.');
    } finally {
      setIsLoading(false);
    }
  };

  // 5. Fungsi Navigasi (Maju/Selesai)
  const handleNext = () => {
    if (answers[currentStep] === null) {
      alert("Pilih salah satu jawaban dulu ya!");
      return;
    }
    
    // Jika belum di soal terakhir, maju ke soal berikutnya
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // JIKA SUDAH DI SOAL TERAKHIR (Tombol "Selesai" diklik)
      submitKuesioner(); // Panggil fungsi kurir di atas
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const progressPercent = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto w-full pt-6 md:pt-10 pb-20">
      
      {/* Tampilkan Pesan Error Jika Ada */}
      {errorMsg && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-sm">
          {errorMsg}
        </div>
      )}

      {/* Progress Bar (Tetap Sama) */}
      <div className="mb-10">
        <div className="flex justify-between items-end mb-3">
          <span className="text-sm md:text-base font-semibold text-gray-800">
            Pertanyaan {currentStep + 1} dari {questions.length}
          </span>
          <span className="text-sm font-bold text-[#51BA55]">
            {Math.round(progressPercent)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-[#51BA55] h-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 leading-snug">
        {questions[currentStep].q}
      </h1>

      <div className="flex flex-col gap-4 mb-12">
        {questions[currentStep].options.map((option, index) => (
          <button 
            key={index}
            onClick={() => handleSelect(index)}
            className={`w-full text-left p-4 md:p-5 border rounded-xl transition-all duration-200 text-sm md:text-base ${
              answers[currentStep] === index 
                ? 'border-[#51BA55] bg-green-50/30 font-semibold text-gray-800 ring-1 ring-[#51BA55]'
                : 'border-gray-300 font-medium text-gray-600 hover:border-[#51BA55] hover:bg-gray-50'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <button 
          onClick={handlePrev}
          disabled={isLoading}
          className={`px-6 py-3 border border-gray-200 text-gray-500 font-semibold rounded-xl text-sm md:text-base transition-all hover:bg-gray-50 ${
            currentStep === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          Sebelumnya
        </button>
        
        <button 
          onClick={handleNext}
          disabled={isLoading}
          className={`${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#51BA55] hover:bg-[#3A8E3F] hover:-translate-y-0.5'} text-white px-8 py-3 rounded-xl text-sm md:text-base font-semibold shadow-sm transition-all`}
        >
          {isLoading 
            ? 'Menyimpan...' 
            : (currentStep === questions.length - 1 ? 'Selesai' : 'Selanjutnya')}
        </button>
      </div>

    </div>
  );
};

export default Kuisioner;