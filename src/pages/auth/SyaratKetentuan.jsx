import { Link } from 'react-router-dom';

const SyaratKetentuan = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
        
        {/* Tombol Kembali */}
        <Link 
          to="/register" 
          className="inline-flex items-center text-sm font-medium text-[#51BA55] hover:text-[#3A8E3F] transition-colors mb-8"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Kembali ke Pendaftaran
        </Link>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Syarat & Ketentuan</h1>
          <p className="text-gray-500 text-sm">mohon untuk membaca dengan seksama</p>
        </div>

        {/* Konten S&K */}
        <div className="space-y-8 text-gray-600 text-sm leading-relaxed text-justify">
          
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">1. Pendahuluan</h2>
            <p>
              Selamat datang di FineXa. Syarat dan Ketentuan ini mengatur penggunaan platform edukasi dan rekomendasi investasi kami. Dengan mendaftar dan menggunakan layanan FineXa, Anda menyatakan bahwa Anda telah membaca, memahami, dan menyetujui seluruh syarat dan ketentuan yang berlaku.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">2. Profil Risiko & Rekomendasi</h2>
            <p>
              FineXa menyediakan fitur kuesioner untuk menilai profil risiko Anda. Rekomendasi investasi yang diberikan oleh sistem kami bersifat informatif dan edukatif, didasarkan pada algoritma analisis data. FineXa <strong>tidak bertanggung jawab</strong> atas kerugian finansial yang mungkin timbul dari keputusan investasi Anda. Segala risiko investasi ditanggung sepenuhnya oleh pengguna.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">3. Keamanan Akun & Data Pribadi</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Pengguna wajib menjaga kerahasiaan *password* dan informasi akun.</li>
              <li>Segala aktivitas yang terjadi di bawah akun Anda adalah tanggung jawab Anda sepenuhnya.</li>
              <li>FineXa berkomitmen untuk melindungi data pribadi Anda dan tidak akan menjual data tersebut kepada pihak ketiga tanpa persetujuan Anda.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">4. Penggunaan Layanan</h2>
            <p>
              Anda setuju untuk menggunakan platform FineXa hanya untuk tujuan yang sah dan tidak melanggar hukum yang berlaku di Republik Indonesia. Tindakan manipulasi data, peretasan (*hacking*), atau penggunaan *bot* di dalam platform akan mengakibatkan pemblokiran akun secara permanen.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">5. Perubahan Syarat & Ketentuan</h2>
            <p>
              FineXa berhak untuk mengubah, memodifikasi, atau memperbarui Syarat dan Ketentuan ini kapan saja tanpa pemberitahuan sebelumnya. Pengguna disarankan untuk meninjau halaman ini secara berkala. Penggunaan platform secara berkelanjutan setelah adanya perubahan dianggap sebagai persetujuan terhadap syarat yang baru.
            </p>
          </section>

        </div>

        {/* Footer S&K */}
        <div className="mt-12 pt-8 border-t border-gray-100 text-center">
          <p className="text-gray-500 text-sm">
            Terimakasih sudah memmbaca syarat dan ketentuan kami dengan seksama. <br></br><span className="text-[#51BA55] font-medium">FineXa</span>
          </p>
        </div>

      </div>
    </div>
  );
};

export default SyaratKetentuan;