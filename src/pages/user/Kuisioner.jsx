import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Kuisioner = () => {
  const navigate = useNavigate();

  // 1. Data 5 Pertanyaan (masing-masing 3 pilihan)
  const questions = [
    {
      q: "Kapan Anda berencana mencairkan dana investasi ini?",
      options: ["Kurang dari 1 tahun", "1 sampai 5 tahun", "Lebih dari 5 tahun"]
    },
    {
      q: "Jika nilai investasi Anda tiba-tiba turun 15% dalam sebulan, apa yang Anda lakukan?",
      options: ["Panik dan menjual semuanya agar tidak rugi lebih banyak", "Cemas, tapi membiarkannya saja menunggu naik lagi",
         "Tenang dan justru membeli lebih banyak mumpung harganya turun"]
    },
    {
      q: "Berapa persen dari pendapatan bulanan yang bisa Anda sisihkan untuk investasi?",
      options: ["Kurang dari 10%", "Antara 10% - 20%", "Lebih dari 20%"]
    },
    {
      q: "Bagaimana kondisi hutang atau cicilan Anda saat ini?",
      options: ["Cicilan sangat berat, sering kurang uang", "Ada cicilan, tapi masih bisa bayar tepat waktu ", "Tidak punya hutang / cicilan sangat ringan"]
    },
    {
      q: "Seberapa paham Anda tentang produk investasi (seperti Reksadana atau Saham)?",
      options: ["Sama sekali tidak paham, baru mau belajar", "Cukup paham dasar-dasarnya", "Sangat paham dan sudah pernah berinvestasi"]
    }
  ];

  const [currentStep, setCurrentStep] = useState(0); 
  const [answers, setAnswers] = useState(Array(5).fill(null));

  const handleSelect = (optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (answers[currentStep] === null) {
      alert("Pilih salah satu jawaban dulu ya!");
      return;
    }
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/dashboard'); 
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  // Hitung persentase progress
  const progressPercent = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto w-full pt-6 md:pt-10 pb-20">
      
      {/* Progress Bar Section ala Figma */}
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

      {/* Pertanyaan */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 leading-snug">
        {questions[currentStep].q}
      </h1>

      {/* Kotak Pilihan */}
      <div className="flex flex-col gap-4 mb-12">
        {questions[currentStep].options.map((option, index) => (
          <button 
            key={index}
            onClick={() => handleSelect(index)}
            className={`w-full text-left p-4 md:p-5 border rounded-xl transition-all duration-200 text-sm md:text-base ${
              answers[currentStep] === index 
                ? 'border-[#51BA55] bg-green-50/30 font-semibold text-gray-800 ring-1 ring-[#51BA55]' // State Kepilih
                : 'border-gray-300 font-medium text-gray-600 hover:border-[#51BA55] hover:bg-gray-50' // State Biasa
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Tombol Navigasi Bawah */}
      <div className="flex justify-between items-center">
        <button 
          onClick={handlePrev}
          // Kalau di soal pertama, tombolnya disembunyikan tapi ruangnya tetap ada biar nggak geser
          className={`px-6 py-3 border border-gray-200 text-gray-500 font-semibold rounded-xl text-sm md:text-base transition-all hover:bg-gray-50 ${
            currentStep === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          Sebelumnya
        </button>
        
        <button 
          onClick={handleNext}
          className="bg-[#51BA55] text-white px-8 py-3 rounded-xl text-sm md:text-base font-semibold shadow-sm hover:bg-[#3A8E3F] hover:-translate-y-0.5 transition-all"
        >
          {currentStep === questions.length - 1 ? 'Selesai' : 'Selanjutnya'}
        </button>
      </div>

    </div>
  );
};

export default Kuisioner;