import { useState } from 'react';
import { Search, Eye, Trash2, X, Mail, Wallet, Calendar } from 'lucide-react';

const UserManagementAdmin = () => {
  // 1. STATE UNTUK DATA USER
  const [users, setUsers] = useState([
    { id: 1, name: 'Budi Santoso', email: 'budi@email.com', role: 'Moderat', portfolio: 'Rp 150.000.000', joinDate: '10 Jan 2025', lastActive: '8 Apr 2026', roleColor: 'bg-emerald-50 text-emerald-600' },
    { id: 2, name: 'Siti Aminah', email: 'siti@email.com', role: 'Konservatif', portfolio: 'Rp 85.000.000', joinDate: '15 Feb 2025', lastActive: '7 Apr 2026', roleColor: 'bg-blue-50 text-blue-600' },
    { id: 3, name: 'Ahmad Rizki', email: 'ahmad@email.com', role: 'Agresif', portfolio: 'Rp 200.000.000', joinDate: '20 Nov 2024', lastActive: '15 Mar 2026', roleColor: 'bg-amber-50 text-amber-600' },
    { id: 4, name: 'Dewi Lestari', email: 'dewi@email.com', role: 'Moderat', portfolio: 'Rp 120.000.000', joinDate: '5 Mar 2025', lastActive: '6 Apr 2026', roleColor: 'bg-emerald-50 text-emerald-600' },
    { id: 5, name: 'Linda Wijaya', email: 'linda@email.com', role: 'Konservatif', portfolio: 'Rp 95.000.000', joinDate: '1 Apr 2025', lastActive: '8 Apr 2026', roleColor: 'bg-blue-50 text-blue-600' },
  ]);

  // STATE UNTUK PENCARIAN & POP-UP MODAL
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteUserTarget, setDeleteUserTarget] = useState(null);

  // Fungsi Filter Search Bar
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fungsi Hapus User Murni Frontend
  const handleConfirmDelete = () => {
    setUsers(users.filter(u => u.id !== deleteUserTarget.id));
    setDeleteUserTarget(null);
  };

  return (
    <div className="space-y-6">
      
      {/* 1. TITLE SECTION */}
      <div>
        <h1 className="text-3xl font-bold text-gray-950 tracking-tight">User Management</h1>
        <p className="text-gray-500 text-sm mt-1">Kelola pengguna dan akses platform FineXa</p>
      </div>

      {/* 2. SEARCH BAR INPUT */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm relative">
        <div className="relative">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Cari nama atau email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-finexa focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* 3. TABEL USER MANAGEMENT */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-500 text-xs font-semibold uppercase tracking-wider border-b border-gray-100">
              <tr>
                <th className="px-6 py-4.5">User</th>
                <th className="px-6 py-4.5">Profil Risiko</th>
                <th className="px-6 py-4.5">Portfolio</th>
                <th className="px-6 py-4.5">Join Date</th>
                <th className="px-6 py-4.5">Last Active</th>
                <th className="px-6 py-4.5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/50 transition">
                    <td className="px-6 py-4.5 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gray-200 flex-shrink-0"></div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-900 leading-tight">{user.name}</span>
                        <span className="text-xs text-gray-400 mt-0.5">{user.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4.5">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${user.roleColor}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4.5 font-semibold text-gray-900">{user.portfolio}</td>
                    <td className="px-6 py-4.5 text-gray-500 text-xs">{user.joinDate}</td>
                    <td className="px-6 py-4.5 text-gray-500 text-xs">{user.lastActive}</td>
                    <td className="px-6 py-4.5">
                      <div className="flex items-center justify-center gap-2">
                        {/* Tombol Detail (Mata) */}
                        <button 
                          onClick={() => setSelectedUser(user)}
                          className="p-2 bg-blue-50 text-blue-500 rounded-xl hover:bg-blue-100 transition-colors shadow-sm"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {/* Tombol Delete (Sampah) */}
                        <button 
                          onClick={() => setDeleteUserTarget(user)}
                          className="p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors shadow-sm"
                        >
                          <Trash2 className="w-4 h-4" />
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
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-3xl w-[380px] p-6 shadow-2xl relative border border-gray-50">
            {/* Tombol Close */}
            <button 
              onClick={() => setSelectedUser(null)}
              className="absolute right-5 top-5 p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Judul Modal */}
            <h3 className="text-xl font-bold text-gray-900">Detail User</h3>
            <p className="text-gray-400 text-xs mt-0.5">Informasi lengkap mengenai User</p>

            {/* Profil Singkat */}
            <div className="flex items-center gap-4 my-6">
              <div className="w-14 h-14 rounded-full bg-gray-200"></div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-900">{selectedUser.name}</span>
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold mt-1 max-w-max ${selectedUser.roleColor}`}>
                  {selectedUser.role}
                </span>
              </div>
            </div>

            {/* Detail Box */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-700 font-medium">{selectedUser.email}</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                <Wallet className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-700 font-semibold">{selectedUser.portfolio}</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-700 font-medium">{selectedUser.joinDate}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* POP UP MODAL 2: DELETE CONFIRMATION */}
      {/* ======================================================== */}
      {deleteUserTarget && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-2xl w-[320px] p-6 shadow-2xl relative text-center">
            {/* Tombol Close */}
            <button 
              onClick={() => setDeleteUserTarget(null)}
              className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100 text-gray-400 transition"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Isi Konfirmasi */}
            <h3 className="text-base font-bold text-gray-900 mt-2 px-4">
              Yakin untuk Menghapus User ini?
            </h3>
            <p className="text-gray-400 text-xs mt-1 px-4 truncate font-medium">({deleteUserTarget.name})</p>

            {/* Tombol Aksi */}
            <div className="mt-6 flex flex-col gap-2">
              <button 
                onClick={handleConfirmDelete}
                className="w-full py-2.5 bg-white border border-gray-300 hover:bg-gray-50 rounded-xl text-xs font-bold text-gray-700 shadow-sm transition-all"
              >
                Ya
              </button>
              <button 
                onClick={() => setDeleteUserTarget(null)}
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

export default UserManagementAdmin;