"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function CekJadwal() {
  const [bulan, setBulan] = useState("Semua Bulan");
  const [layanan, setLayanan] = useState("Semua Layanan");
  const [status, setStatus] = useState("Semua Status");
  const [showRiwayat, setShowRiwayat] = useState(false);
  const [jadwalList, setJadwalList] = useState([]);
  const [riwayatList, setRiwayatList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJadwal();
  }, []);

  async function fetchJadwal() {
    try {
      const [aktifRes, riwayatRes] = await Promise.all([
        fetch("/api/jadwal?status=Aktif"),
        fetch("/api/jadwal?riwayat=true"),
      ]);
      const aktifJson = await aktifRes.json();
      const riwayatJson = await riwayatRes.json();
      if (aktifJson.success && aktifJson.data) setJadwalList(aktifJson.data);
      if (riwayatJson.success && riwayatJson.data) setRiwayatList(riwayatJson.data);
    } catch {
      console.error("Gagal fetch jadwal");
    } finally {
      setLoading(false);
    }
  }

  // parse bulan dari tanggal_berangkat misal "07 Mar 2026" → "Mar"
  const getBulan = (tgl) => tgl?.split(" ")?.[1] || "";
  const getTanggal = (tgl) => tgl?.split(" ")?.[0] || "-";
  const getTahun = (tgl) => tgl?.split(" ")?.[2] || "";

  const filtered = jadwalList.filter((j) => {
    const matchBulan   = bulan   === "Semua Bulan"   || getBulan(j.tanggal_berangkat) === bulan;
    const matchLayanan = layanan === "Semua Layanan" || j.jenis  === layanan;
    const matchStatus  = status  === "Semua Status"  || j.status === status;
    return matchBulan && matchLayanan && matchStatus;
  });

  return (
    <div className="min-h-screen pt-24 sm:pt-28 md:pt-32 px-4 sm:px-8 md:px-10 pb-20" style={{ background: "#edf7f5" }}>
      <div className="max-w-screen-lg mx-auto">

        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
            Jadwal Keberangkatan
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm max-w-lg leading-relaxed">
            Temukan jadwal keberangkatan terbaik untuk perjalanan ibadah Anda. Kami
            menyediakan berbagai pilihan paket Umroh, Haji, dan Wisata Halal.
          </p>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5 mb-6 sm:mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 items-end">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Bulan Keberangkatan</label>
              <select value={bulan} onChange={(e) => setBulan(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#008080]">
                {["Semua Bulan","Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"].map((b) => <option key={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Jenis Layanan</label>
              <select value={layanan} onChange={(e) => setLayanan(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#008080]">
                {["Semua Layanan","Umroh","Haji","Wisata Islam"].map((l) => <option key={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#008080]">
                {["Semua Status","Tersedia","Penuh"].map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <button
              onClick={fetchJadwal}
              className="w-full flex items-center justify-center bg-[#008080] hover:bg-[#006666] text-white font-semibold text-sm px-6 py-2.5 rounded-lg transition-colors duration-200">
              Cari Jadwal
            </button>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-4 border-[#008080]/30 border-t-[#008080] rounded-full animate-spin" />
          </div>
        )}

        {/* List Jadwal Aktif */}
        {!loading && (
          <div className="space-y-4 mb-6">
            {filtered.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-10">Jadwal tidak ditemukan</p>
            ) : filtered.map((j) => (
              <div key={j.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:px-6 sm:py-5">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">

                  {/* Tanggal + Info */}
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    {/* Tanggal */}
                    <div className="text-center shrink-0 w-12 sm:w-14">
                      <p className="text-[#008080] text-[10px] font-bold uppercase">{getBulan(j.tanggal_berangkat)}</p>
                      <p className="text-[#008080] text-3xl sm:text-4xl font-extrabold leading-none">{getTanggal(j.tanggal_berangkat)}</p>
                      <p className="text-gray-400 text-[10px]">{getTahun(j.tanggal_berangkat)}</p>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="bg-[#008080] text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full whitespace-nowrap">
                          {j.jenis}
                        </span>
                        {j.kuota && j.terisi < j.kuota ? (
                          <span className="text-[#008080] text-[10px] sm:text-[11px] font-semibold whitespace-nowrap">
                            ✓ KURSI TERSEDIA ({j.kuota - j.terisi} sisa)
                          </span>
                        ) : (
                          <span className="text-red-500 text-[10px] sm:text-[11px] font-semibold whitespace-nowrap">
                            ✕ PENUH
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1 leading-snug">{j.nama_paket}</h3>
                      <div className="flex items-center gap-3 text-gray-400 text-[10px] sm:text-xs flex-wrap">
                        {j.maskapai && <span>▷ {j.maskapai}</span>}
                        {j.hotel && <span>□ {j.hotel}</span>}
                        {j.tanggal_pulang && <span>s/d {j.tanggal_pulang}</span>}
                      </div>
                    </div>
                  </div>

                  {/* Tombol WA */}
                  <Link
                    href={`https://wa.me/6282311000853?text=${encodeURIComponent(`Halo, saya ingin tanya tentang jadwal ${j.nama_paket}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 bg-[#008080] hover:bg-[#006666] text-white text-sm font-semibold px-5 py-3 rounded-xl transition-colors duration-200 shadow-sm"
                  >
                    <Image src="/icon/wa.png" alt="WA" width={16} height={16} className="object-contain" />
                    Tanya WhatsApp
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Riwayat toggle */}
        {!loading && (
          <>
            <button
              onClick={() => setShowRiwayat(!showRiwayat)}
              className="flex items-center gap-2 text-gray-600 text-sm font-semibold hover:text-[#008080] transition-colors duration-200 mb-4"
            >
              <span className="text-base">{showRiwayat ? "∨" : "›"}</span>
              Riwayat Keberangkatan ({riwayatList.length} jadwal)
            </button>

            {/* List Riwayat */}
            {showRiwayat && (
              <div className="space-y-3 mb-10">
                {riwayatList.length === 0 ? (
                  <p className="text-gray-400 text-sm text-center py-6">Belum ada riwayat keberangkatan</p>
                ) : riwayatList.map((j) => (
                  <div key={j.id} className="bg-gray-50 rounded-2xl border border-gray-100 p-4 sm:px-6 sm:py-4 opacity-75">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                      <div className="flex items-start gap-4 flex-1 min-w-0">
                        {/* Tanggal */}
                        <div className="text-center shrink-0 w-12 sm:w-14">
                          <p className="text-gray-400 text-[10px] font-bold uppercase">{getBulan(j.tanggal_berangkat)}</p>
                          <p className="text-gray-400 text-3xl sm:text-4xl font-extrabold leading-none">{getTanggal(j.tanggal_berangkat)}</p>
                          <p className="text-gray-400 text-[10px]">{getTahun(j.tanggal_berangkat)}</p>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className={`text-[9px] font-bold uppercase px-2.5 py-1 rounded-full ${j.status === "Selesai" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                              {j.jenis} • {j.status}
                            </span>
                          </div>
                          <h3 className="font-bold text-gray-600 text-sm mb-0.5">{j.nama_paket}</h3>
                          <div className="flex items-center gap-3 text-gray-400 text-[10px] flex-wrap">
                            {j.maskapai && <span>▷ {j.maskapai}</span>}
                            {j.tanggal_selesai && <span>Selesai: {j.tanggal_selesai}</span>}
                            {j.catatan && <span className="italic">"{j.catatan}"</span>}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400 shrink-0 font-medium">
                        {j.terisi}/{j.kuota} jamaah
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Kembali */}
        <div className="text-center mt-4">
          <Link href="/" className="inline-flex items-center gap-3 text-[#008080] text-base sm:text-lg font-bold hover:gap-4 transition-all duration-200">
            <span className="text-2xl leading-none">‹</span>
            <span>Kembali ke Beranda</span>
          </Link>
        </div>

      </div>
    </div>
  );
}