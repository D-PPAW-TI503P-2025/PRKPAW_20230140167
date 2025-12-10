import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ReportPage() {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // ✅ TAMBAHAN

  const fetchReports = async (query) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const baseUrl = "http://localhost:5000/api/reports/daily";
      const url = query ? `${baseUrl}?nama=${query}` : baseUrl;

      const response = await axios.get(url, config);
      setReports(response.data.data);
      setError(null);
    } catch (err) {
      setReports([]);
      setError(
        err.response ? err.response.data.message : "Gagal mengambil data"
      );
    }
  };

  useEffect(() => {
    fetchReports("");
  }, [navigate]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchReports(searchTerm);
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Laporan Presensi Harian
      </h1>

      <form onSubmit={handleSearchSubmit} className="mb-6 flex space-x-2">
        <input
          type="text"
          placeholder="Cari berdasarkan nama..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow px-3 py-2 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="py-2 px-4 bg-blue-600 text-white rounded-md"
        >
          Cari
        </button>
      </form>

      {error && (
        <p className="text-red-600 bg-red-100 p-4 rounded-md mb-4">{error}</p>
      )}

      {!error && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3">Nama</th>
                <th className="px-6 py-3">Check-In</th>
                <th className="px-6 py-3">Check-Out</th>
                <th className="px-6 py-3">Latitude</th>
                <th className="px-6 py-3">Longitude</th>
                <th className="px-6 py-3">Bukti Foto</th> {/* ✅ TAMBAHAN */}
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {reports.length > 0 ? (
                reports.map((presensi) => {
                  const fotoPath = presensi.buktiFoto
                    ? presensi.buktiFoto.replace(/\\/g, "/")
                    : null;

                  const fotoUrl = fotoPath
                    ? `http://localhost:5000/${fotoPath}`
                    : null;

                  return (
                    <tr key={presensi.id}>
                      <td className="px-6 py-4">
                        {presensi.user ? presensi.user.nama : "N/A"}
                      </td>

                      <td className="px-6 py-4">
                        {new Date(presensi.checkIn).toLocaleString("id-ID", {
                          timeZone: "Asia/Jakarta",
                        })}
                      </td>

                      <td className="px-6 py-4">
                        {presensi.checkOut
                          ? new Date(presensi.checkOut).toLocaleString(
                              "id-ID",
                              { timeZone: "Asia/Jakarta" }
                            )
                          : "Belum Check-Out"}
                      </td>

                      <td className="px-6 py-4">
                        {presensi.latitude || "N/A"}
                      </td>

                      <td className="px-6 py-4">
                        {presensi.longitude || "N/A"}
                      </td>

                      {/* ✅ BUKTI FOTO */}
                      <td className="px-6 py-4">
                        {fotoUrl ? (
                          <img
                            src={fotoUrl}
                            alt="Bukti Foto"
                            className="w-12 h-12 object-cover rounded cursor-pointer border"
                            onClick={() => setSelectedImage(fotoUrl)}
                          />
                        ) : (
                          "Tidak ada foto"
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-4 text-gray-500">
                    Tidak ada data yang ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ✅ MODAL FOTO */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Foto Presensi"
            className="max-w-[90%] max-h-[90%] rounded shadow-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

export default ReportPage;
