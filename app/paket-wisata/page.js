"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function PaketWisata() {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen pt-16" style={{ background: "linear-gradient(180deg, #dbeafe 0%, #eff6ff 100%)" }}>

      {/* Hero */}
      <section
        className="relative text-white pt-16 pb-20 px-4 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #5A74B3 0%, #5A74B3 60%, #5A74B3 100%)" }}
      >
        <div className="absolute inset-0 opacity-25">
          <Image src="/images/layananwisata.png" alt="" fill className="object-cover" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="inline-block bg-white/20 text-white text-[10px] sm:text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 backdrop-blur-sm">
            DESTINASI ISLAMI
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">Wisata Islam</h1>
          <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Jelajahi destinasi bersejarah dan indah di dunia Islam bersama tour leader berpengalaman MZM Travel.
          </p>
        </div>
      </section>
      <div className="max-w-2xl mx-auto px-6 -mt-6 relative z-10 mb-10">
        <div className="bg-white rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3 border border-gray-100">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari destinasi..."
            className="flex-1 text-sm text-gray-700 outline-none placeholder-gray-400 bg-transparent"
          />
          {search && (
            <button onClick={() => setSearch("")} className="text-gray-400 hover:text-gray-600 text-xs shrink-0">✕</button>
          )}
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto px-6 pb-20">
        <div className="text-center py-16">
          <p className="text-gray-400 sm:text-lg">Destinasi tidak ditemukan</p>
        </div>
        <div className="text-center mt-4">
          <Link href="/" className="inline-flex items-center py-2 px-5 gap-3 text-[#5A74B3] text-base sm:text-lg font-semibold hover:gap-3 transition-all duration-200">
           <span className="text-4xl  mt-[-3px] leading-[1]">‹</span>
           <span>Kembali ke Beranda</span>
          </Link>
        </div>
      </div>

    </div>
  );
}