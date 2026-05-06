import './Login.css';
const Login = () => {
  return (
    <div className="login-container">
      
      {/* Bagian Kiri: Visual Hijau */}
      <div className="login-left">
        <div className="left-content">
          {/* Bungkus logo dan judul pakai div baru biar gampang disejajarkan */}
          <div className="logo-wrapper">
            {/* Garis miring (/) di awal otomatis mengarah ke folder public */}
            <img src="/images/Logo.svg" alt="Logo FineXa" className="logo-icon" />
          <h1>FineXa</h1>
          </div>
          <p>Platform Investasi Terpercaya untuk Masa Depan</p>
          {/* Angka statistik di bawahnya nanti bisa ditambahkan di sini */}
          <div className="stats-container">
            <div className="stat-item">
              <h3>5,000+</h3>
              <p>Pengguna Aktif</p>
            </div>
            <div className="stat-item">
              <h3>99%</h3>
              <p>Keberhasilan</p>
            </div>
            <div className="stat-item">
              <h3>24/7</h3>
              <p>Dukungan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bagian Kanan: Formulir Putih */}
      <div className="login-right">
        <div className="form-container">
          <h2>Selamat Datang Kembali</h2>
          <p>Masuk ke akun Anda untuk melanjutkan investasi</p>
          
          {/* Kerangka form */}
          <form>
            <div className="input-group">
              <label>Alamat Email</label>
              <input type="email" placeholder="nama@email.com" />
            </div>
            
            <div className="input-group">
              <label>Password</label>
              <input type="password" placeholder="••••••••" />
            </div>

            <button type="button" className="btn-masuk">Masuk ke Dashboard</button>
          </form>
        </div>
      </div>

    </div>
  );
};

export default Login;