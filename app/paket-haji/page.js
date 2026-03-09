"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function PaketHaji() {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen pt-16 bg-[#fdf8ee]">

      {/* Hero */}
      <section
        className="relative text-white pt-16 pb-16 px-4 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #78350f 0%, #c97d20 100%)" }}
      >
        <div className="absolute inset-0 opacity-20">
          <Image src="/images/Haji-Card.png" alt="" fill className="object-cover" />
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
      <div className="max-w-xl mx-auto px-6 -mt-5 relative z-10 mb-10">
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
      <div className="max-w-screen-xl mx-auto px-6 pb-20">
        {!search ? (
          <div className="flex justify-start">
            <div className="transition-all duration-300 w-full max-w-sm relative">
              <Image
                src="/images/paket-Haji1.png"
                alt="Paket Haji"
                width={384}
                height={826}
                className="w-full h-auto"
              />
              <div className="px-6 absolute bottom-0 -translate-y-6 left-0 right-0">
                <Link
                  href={`https://wa.me/6282311000853?text=${encodeURIComponent("Halo, saya ingin tanya tentang Paket Haji")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 flex items-center justify-center gap-2 bg-[#008080] hover:bg-[#006666] text-white text-sm font-semibold rounded-xl transition-colors duration-200 shadow-lg"
                >
                  <Image src="/icon/wa.png" alt="WhatsApp" width={18} height={18} className="object-contain" />
                  Daftar Sekarang
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400 text-sm">Paket tidak ditemukan</p>
            <button onClick={() => setSearch("")} className="mt-3 text-[#008080] text-xs font-semibold hover:underline">
              Reset pencarian
            </button>
          </div>
        )}
        <div className="text-center mt-14">
          <Link href="/" className="inline-flex items-center py-2 px-5 gap-3 text-[#c97d20] text-base sm:text-lg font-semibold hover:gap-3 transition-all duration-200">
           <span className="text-4xl  mt-[-3px] leading-[1]">‹</span>
           <span>Kembali ke Beranda</span>
          </Link>
        </div>
      </div>

    </div>
  );
}