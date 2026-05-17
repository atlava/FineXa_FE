import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* BAGIAN KIRI: Sidebar */}
      <aside className="w-64 bg-blue-900 text-white p-5">
        <h2 className="text-2xl font-bold">Admin FineXa</h2>
        <ul className="mt-10">
          <li className="mb-4">Dashboard</li>
          <li className="mb-4">Kelola Pengguna</li>
        </ul>
      </aside>

      {/* BAGIAN KANAN: Isi Halaman Utama */}
      <main className="flex-1 p-8">
        {/* <Outlet /> */}
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;