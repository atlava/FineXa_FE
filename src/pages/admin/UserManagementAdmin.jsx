import { useState, useEffect } from 'react';
import { Search, Eye, Trash2, X, Mail, Shield, Calendar } from 'lucide-react';

const UserManagementAdmin = () => {
  // 1. STATE UNTUK DATA USER DARI API
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // STATE UNTUK PENCARIAN & POP-UP MODAL
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteUserTarget, setDeleteUserTarget] = useState(null);

  // ==========================================
  // AREA INTEGRASI API (Tarik Data User Nyata)
  // ==========================================
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/api/users', {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if (data.status === 'success' && data.data) {
        setUsers(data.data); // Memasukkan data asli dari database
      }
    } catch (error) {
      console.error("Gagal mengambil data user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  // ==========================================

  // Fungsi Filter Search Bar (Berdasarkan nama_lengkap atau email)
  const filteredUsers = users.filter(user =>
    user.nama_lengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fungsi Hapus User 
  const handleConfirmDelete = async () => {
    try {
      const token = localStorage.getItem('token'); // Ambil kunci
      
      // Kirim perintah DELETE ke API Laravel beserta ID User-nya
      const response = await fetch(`http://localhost:8000/api/users/${deleteUserTarget.id_user}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.status === 'success') {
        // Jika Dapur Laravel sukses menghapus dari database, baru hapus dari layar!
        setUsers(users.filter(u => u.id_user !== deleteUserTarget.id_user));
        setDeleteUserTarget(null); // Tutup pop-up
      } else {
        alert('Gagal menghapus user: ' + (data.message || 'Error tidak diketahui'));
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat menghapus user:", error);
      alert('Gagal menghubungi server untuk menghapus user.');
    }
  };

  // Fungsi Pembantu: Format Tanggal
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  // Fungsi Pembantu: Warna Profil Risiko
  const getRoleColor = (profilRisiko) => {
    switch (profilRisiko?.toLowerCase()) {
      case 'agresif': return 'bg-amber-50 text-amber-600';
      case 'moderat': return 'bg-emerald-50 text-emerald-600';
      case 'konservatif': return 'bg-blue-50 text-blue-600';
      default: return 'bg-gray-100 text-gray-600'; // Untuk Admin atau yang belum isi
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      
      {/* 1. TITLE SECTION */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-950 tracking-tight">User Management ⚙️</h1>
        <p className="text-gray-500 text-xs md:text-sm mt-1">Kelola pengguna dan akses platform FineXa</p>
      </div>

      {/* 2. SEARCH BAR INPUT */}
      <div className="bg-white p-3 md:p-4 rounded-xl border border-gray-100 shadow-sm relative">
        <div className="relative">
          <Search className="absolute left-3 md:left-4 top-3.5 h-4 w-4 md:h-5 md:w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Cari nama atau email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 md:pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs md:text-sm focus:outline-none focus:border-finexa focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* 3. TABEL USER MANAGEMENT */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Wrapper overflow-x-auto untuk horizontal scroll di HP */}
        <div className="overflow-x-auto">
          {/* min-w-[800px] memaksa tabel tetap lebar dan bisa di-scroll di layar sempit */}
          <table className="w-full text-left text-sm text-gray-600 min-w-[800px]">
            <thead className="bg-emerald-50 text-gray-700 text-[10px] md:text-xs font-semibold uppercase tracking-wider border-b border-gray-100" >
              <tr>
                <th className="px-4 md:px-6 py-3 md:py-4.5 whitespace-nowrap">User</th>
                <th className="px-4 md:px-6 py-3 md:py-4.5 whitespace-nowrap">Profil Risiko</th>
                <th className="px-4 md:px-6 py-3 md:py-4.5 whitespace-nowrap">Role</th>
                <th className="px-4 md:px-6 py-3 md:py-4.5 whitespace-nowrap">Join Date</th>
                <th className="px-4 md:px-6 py-3 md:py-4.5 whitespace-nowrap">Last Active</th>
                <th className="px-4 md:px-6 py-3 md:py-4.5 text-center whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center text-gray-400 font-medium">Memuat data pengguna...</td>
                </tr>
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id_user} className="hover:bg-gray-50/50 transition">
                    <td className="px-4 md:px-6 py-3 md:py-4.5 flex items-center gap-2 md:gap-3 whitespace-nowrap">
                      <div className="w-7 h-7 md:w-9 md:h-9 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-gray-500 font-bold uppercase text-[10px] md:text-xs">
                         {user.nama_lengkap ? user.nama_lengkap.charAt(0) : 'U'}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-900 leading-tight text-xs md:text-sm">{user.nama_lengkap}</span>
                        <span className="text-[10px] md:text-xs text-gray-400 mt-0.5">{user.email}</span>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4.5 whitespace-nowrap">
                      <span className={`px-2 md:px-2.5 py-1 rounded-full text-[10px] md:text-xs font-bold ${getRoleColor(user.profil_risiko)}`}>
                        {user.profil_risiko ? user.profil_risiko : 'Belum Ada'}
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4.5 font-semibold text-gray-900 uppercase text-xs md:text-sm whitespace-nowrap">
                      {user.role} 
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4.5 text-gray-500 text-[10px] md:text-xs whitespace-nowrap">
                      {formatDate(user.created_at)}
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4.5 text-gray-500 text-[10px] md:text-xs whitespace-nowrap">
                      {formatDate(user.last_login_at) || '-'}
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4.5 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1 md:gap-2">
                        {/* Tombol Detail (Mata) */}
                        <button 
                          onClick={() => setSelectedUser(user)}
                          className="p-1.5 md:p-2 bg-blue-50 text-blue-500 rounded-lg md:rounded-xl hover:bg-blue-100 transition-colors shadow-sm"
                        >
                          <Eye className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        </button>
                        {/* Tombol Delete (Sampah) */}
                        <button 
                          onClick={() => setDeleteUserTarget(user)}
                          className="p-1.5 md:p-2 bg-red-50 text-red-500 rounded-lg md:rounded-xl hover:bg-red-100 transition-colors shadow-sm"
                        >
                          <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center text-gray-400 text-sm">
                    Data user tidak ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ======================================================== */}
      {/* POP UP MODAL 1: DETAIL USER */}
      {/* ======================================================== */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4">
          <div className="bg-white rounded-2xl md:rounded-3xl w-full max-w-[380px] p-5 md:p-6 shadow-2xl relative border border-gray-50">
            {/* Tombol Close */}
            <button 
              onClick={() => setSelectedUser(null)}
              className="absolute right-4 md:right-5 top-4 md:top-5 p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition"
            >
              <X className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            {/* Judul Modal */}
            <h3 className="text-lg md:text-xl font-bold text-gray-900">Detail User</h3>
            <p className="text-gray-400 text-[10px] md:text-xs mt-0.5">Informasi lengkap mengenai User</p>

            {/* Profil Singkat */}
            <div className="flex items-center gap-3 md:gap-4 my-5 md:my-6">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gray-200 flex items-center justify-center text-xl md:text-2xl font-bold text-gray-500 uppercase flex-shrink-0">
                 {selectedUser.nama_lengkap ? selectedUser.nama_lengkap.charAt(0) : 'U'}
              </div>
              <div className="flex flex-col">
                <span className="text-base md:text-lg font-bold text-gray-900">{selectedUser.nama_lengkap}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] md:text-[11px] font-bold mt-1 max-w-max uppercase bg-gray-100 text-gray-600`}>
                  {selectedUser.role}
                </span>
              </div>
            </div>

            {/* Detail Box */}
            <div className="space-y-2 md:space-y-3">
              <div className="flex items-center gap-3 p-3 md:p-3.5 bg-gray-50 rounded-xl md:rounded-2xl border border-gray-100">
                <Mail className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400 flex-shrink-0" />
                <span className="text-[11px] md:text-xs text-gray-700 font-medium truncate">{selectedUser.email}</span>
              </div>
              <div className="flex items-center gap-3 p-3 md:p-3.5 bg-gray-50 rounded-xl md:rounded-2xl border border-gray-100">
                <Shield className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400 flex-shrink-0" />
                <span className="text-[11px] md:text-xs text-gray-700 font-semibold uppercase truncate">{selectedUser.profil_risiko || 'Belum Ada Profil Risiko'}</span>
              </div>
              <div className="flex items-center gap-3 p-3 md:p-3.5 bg-gray-50 rounded-xl md:rounded-2xl border border-gray-100">
                <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400 flex-shrink-0" />
                <span className="text-[11px] md:text-xs text-gray-700 font-medium truncate">Bergabung: {formatDate(selectedUser.created_at)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* POP UP MODAL 2: DELETE CONFIRMATION */}
      {/* ======================================================== */}
      {deleteUserTarget && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4">
          <div className="bg-white rounded-2xl w-full max-w-[320px] p-5 md:p-6 shadow-2xl relative text-center">
            {/* Tombol Close */}
            <button 
              onClick={() => setDeleteUserTarget(null)}
              className="absolute right-3 md:right-4 top-3 md:top-4 p-1 rounded-full hover:bg-gray-100 text-gray-400 transition"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Isi Konfirmasi */}
            <h3 className="text-sm md:text-base font-bold text-gray-900 mt-2 px-2 md:px-4">
              Yakin untuk Menghapus User ini?
            </h3>
            <p className="text-gray-400 text-[10px] md:text-xs mt-1 px-2 md:px-4 truncate font-medium">({deleteUserTarget.nama_lengkap})</p>

            {/* Tombol Aksi */}
            <div className="mt-5 md:mt-6 flex flex-col gap-2">
              <button 
                onClick={handleConfirmDelete}
                className="w-full py-2 md:py-2.5 bg-red-500 hover:bg-red-600 rounded-lg md:rounded-xl text-[11px] md:text-xs font-bold text-white shadow-sm transition-all"
              >
                Ya, Hapus
              </button>
              <button 
                onClick={() => setDeleteUserTarget(null)}
                className="w-full py-2 md:py-2.5 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg md:rounded-xl text-[11px] md:text-xs font-bold text-gray-700 shadow-sm transition-all"
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

export default UserManagementAdmin;