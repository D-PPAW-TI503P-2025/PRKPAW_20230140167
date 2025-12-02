import React from "react";
import { useNavigate } from "react-router-dom";

function DashboardPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-purple-300 flex items-center justify-center p-8">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center w-full max-w-lg">
        <h1 className="text-4xl font-extrabold text-purple-700 mb-4">
          Selamat Datang di Dashboard 🎉
        </h1>

        <p className="text-gray-700 mb-8 text-lg">
          Anda berhasil login! Ini adalah halaman dashboard yang bisa dikembangkan lebih lanjut.
        </p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <button
            className="bg-blue-500 text-white p-4 rounded-lg shadow hover:bg-blue-600"
            onClick={() => navigate("/attendance")}
          >
            Presensi
          </button>

          <button
            className="bg-green-500 text-white p-4 rounded-lg shadow hover:bg-green-600"
            onClick={() => navigate("/reports")}
          >
            Laporan
          </button>

          <div className="bg-yellow-500 text-white p-4 rounded-lg shadow">
            Fitur C
          </div>

          <div className="bg-red-500 text-white p-4 rounded-lg shadow">
            Fitur D
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="py-2 px-6 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default DashboardPage;
