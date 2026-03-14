"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const FALLBACK_HAJI = [
  {
    id: "static-1",
    gambar: "/images/paketHaji2.png",
    nama: "Haji Percepatan 1448H",
    kategori: "Khusus",
    durasi: "24 Hari",
    maskapai: "Garuda Indonesia",
    hotel: "Bintang 4",
    harga: "425.000.000",
    berangkat: "Awal Dzulhijjah",
    keberangkatan: "JAKARTA (CGK)",
    status: "Tersedia",
  },
];

export default function PaketHaji() {
  const [search, setSearch] = useState("");
  const [lightbox, setLightbox] = useState(null);
  const [paketList, setPaketList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPaket();
  }, []);

  async function fetchPaket() {
    try {
      const res = await fetch("/api/paket?jenis=Haji");
      const json = await res.json();
      const dbData = (json.success && json.data) ? json.data : [];
      const dbIds = dbData.map(p => p.nama);
      const filtered = FALLBACK_HAJI.filter(f => !dbIds.includes(f.nama));
      setPaketList([...filtered, ...dbData]);
    } catch {
      setPaketList(FALLBACK_HAJI);
    } finally {
      setLoading(false);
    }
  }

  const filtered = paketList.filter((p) =>
    search === "" || p.nama.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-16 bg-[#fdf8ee]">

      {/* Hero */}
      <section
        className="relative text-white pt-16 pb-20 px-4 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #78350f 0%, #c97d20 100%)" }}
      >
        <div className="absolute inset-0 opacity-20">
          <Image src="/images/layananumroh.png" alt="" fill className="object-cover" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="inline-block bg-white/20 text-white text-[10px] sm:text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 backdrop-blur-sm">
            Program Spesial
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">Layanan Haji</h1>
          <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Rencanakan ibadah Haji Anda dengan tenang dan nyaman bersama bimbingan muthawif bersertifikat.
          </p>
        </div>
      </section>

      {/* Search */}
      <div className="max-w-xl mx-auto px-6 -mt-6 relative z-10 mb-10">
        <div className="bg-white rounded-2xl shadow-xl px-5 py-3.5 flex items-center gap-3 border border-gray-100">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari paket haji..."
            className="flex-1 text-sm text-gray-700 outline-none placeholder-gray-400 bg-transparent"
          />
          {search && (
            <button onClick={() => setSearch("")} className="text-gray-400 hover:text-gray-600 text-xs shrink-0">✕</button>
          )}
        </div>
      </div>

      {/* Konten */}
      <div className="max-w-screen-xl mx-auto px-6 pb-20">

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin" />
          </div>
        )}

        {/* Kosong */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-sm">
              {search ? "Paket tidak ditemukan" : "Paket segera hadir"}
            </p>
            {search && (
              <button onClick={() => setSearch("")} className="mt-3 text-[#c97d20] text-xs font-semibold hover:underline">
                Reset pencarian
              </button>
            )}
          </div>
        )}

        {/* Daftar paket */}
        {!loading && filtered.length > 0 && (
          <div className="flex flex-wrap gap-6 justify-start">
            {filtered.map((paket) => (
              <PaketCard
                key={paket.id}
                paket={paket}
                onLightbox={setLightbox}
                fallbackImg="/images/paketHaji2.png"
              />
            ))}
          </div>
        )}

        {/* Kembali */}
        <div className="text-center mt-14">
          <Link href="/" className="inline-flex items-center py-2 px-5 gap-3 text-[#c97d20] text-base sm:text-lg font-semibold hover:gap-3 transition-all duration-200">
            <span className="text-4xl mt-[-3px] leading-[1]">‹</span>
            <span>Kembali ke Beranda</span>
          </Link>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <div className="relative w-full max-w-sm sm:max-w-md" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-3 right-3 z-10 w-9 h-9 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-colors duration-200 text-lg font-bold shadow-lg"
            >
              ✕
            </button>
            <Image
              src={lightbox}
              alt="Preview Paket"
              width={1080}
              height={1350}
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}

function PaketCard({ paket, onLightbox, fallbackImg = "/images/paket-Haji1.png" }) {
  const bintang = paket.hotel?.includes("5") ? 5 : paket.hotel?.includes("3") ? 3 : 4;
  const imgSrc = paket.gambar || fallbackImg;

  return (
    <div className="w-full max-w-sm bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">

      {/* Gambar */}
      <div className="relative cursor-zoom-in group" onClick={() => onLightbox(imgSrc)}>
        <Image
          src={imgSrc}
          alt={paket.nama}
          width={1080}
          height={1350}
          className="w-full h-auto"
          onError={(e) => { e.currentTarget.src = fallbackImg; }}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-200 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-all duration-200 scale-75 group-hover:scale-100 bg-white/20 backdrop-blur-sm border-2 border-white/60 text-white text-3xl font-thin w-16 h-16 rounded-full flex items-center justify-center shadow-xl">
            +
          </span>
        </div>
        {paket.status && paket.status !== "Tersedia" && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
            {paket.status}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="font-extrabold text-gray-900 text-base mb-4 uppercase tracking-wide">{paket.nama}</h3>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-gray-500">
              <Image src="/icon/Calendar.png" alt="" width={16} height={16} className="object-contain opacity-70" />
              Jadwal Berangkat
            </span>
            <span className="font-semibold text-gray-800">{paket.berangkat || "-"}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-gray-500">
              <Image src="/icon/jam1.png" alt="" width={16} height={16} className="object-contain opacity-70" />
              Durasi Perjalanan
            </span>
            <span className="font-semibold text-gray-800">{paket.durasi || "-"}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-gray-500">
              <Image src="/icon/location_on.png" alt="" width={16} height={16} className="object-contain opacity-70" />
              Keberangkatan
            </span>
            <span className="font-semibold text-gray-800">{paket.keberangkatan || "JAKARTA (CGK)"}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-gray-500">
              <Image src="/icon/Vector.png" alt="" width={16} height={16} className="object-contain opacity-70" />
              Maskapai
            </span>
            <span className="font-semibold text-gray-800">{paket.maskapai || "-"}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-gray-500">
              <Image src="/icon/hotel1.png" alt="" width={16} height={16} className="object-contain opacity-70" />
              Hotel
            </span>
            <span className="flex items-center gap-0.5">
              {[...Array(bintang)].map((_, i) => <span key={i} className="text-amber-400 text-sm">★</span>)}
              {[...Array(5 - bintang)].map((_, i) => <span key={i} className="text-gray-300 text-sm">★</span>)}
            </span>
          </div>
        </div>

        <div className="border-t border-dashed border-gray-200 pt-4 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-sm font-medium">Harga Paket</span>
            <span className="text-amber-500 font-extrabold text-xl">{paket.harga || "-"}</span>
          </div>
        </div>

        <Link
          href={`https://wa.me/6282311000853?text=${encodeURIComponent(`Halo, saya ingin tanya tentang ${paket.nama}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-[#008080] hover:bg-[#006666] text-white text-sm font-bold py-3.5 rounded-2xl transition-colors duration-200 shadow-sm"
        >
          <Image src="/icon/wa.png" alt="WhatsApp" width={20} height={20} className="object-contain" />
          Hubungi via WhatsApp
        </Link>
      </div>
    </div>
  );
}