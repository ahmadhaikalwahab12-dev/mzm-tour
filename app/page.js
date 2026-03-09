"use client";
import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const statsData = [
  { value: "10k+", label: "Jamaah Puas" },
  { value: "15+",  label: "Tahun Pengalaman" },
  { value: "99%",  label: "Tingkat Keberhasilan" },
  { value: "B+",   label: "Akreditasi PPIU" },
];

const layananData = [
  { images: "/images/Haji-Card.png",    title: "Layanan Haji",   href: "/paket-haji"   },
  { images: "/images/Umroh-Card.png",   title: "Layanan Umroh",  href: "/paket-umroh"  },
  { images: "/images/Wisata-Islam.png", title: "Wisata Islam",   href: "/paket-wisata" },
];


const tentangFeatures = [
  { icons: "/icon/izin.png",       label: "Izin Resmi" },
  { icons: "/icon/pembimbing.png", label: "Pembimbing Ahli" },
  { icons: "/icon/fasilitas.png",  label: "Fasilitas Premium" },
];

const reviewsData = [
  { name: "H. Ahmad Fauzi",   avatar: "/images/Ahmad.png", location: "Jakarta Selatan", text: "Alhamdulillah, perjalanan umroh bersama MZM Travel sangat berkesan. Pembimbingnya sangat sabar dan lokasi hotel sangat dekat dengan masjid." },
  { name: "Hj. Siti Aminah",  avatar: "/images/Siti.png",  location: "Jakarta Timur",   text: "Fasilitas VIP benar-benar terasa. Haji dengan MZM Travel adalah keberkahan tersendiri, terimakasih MZM Travel atas bantuannya." },
  { name: "Bp. Budi Santoso", avatar: "/images/Budi.png",  location: "Bekasi",          text: "Paket Wisata Islami ke Turki sangat menyenangkan. Makanan selalu terjamin serta jadwal shalat tetap terjaga dengan baik." },
];

export default function MzmTourApp() {
  const reviewRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (reviewRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = reviewRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          reviewRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          reviewRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main>

      {/*HERO*/}
      <section id="beranda" className="relative w-full min-h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image  
            src="/images/gambar1.png"
            alt="Hero Section 1"
            width={1440}
            height={797}
            className="w-full h-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative z-20 max-w-screen-xl mx-auto px-6 sm:px-12 md:px-20 py-24 w-full pt-20 pb-32">
          <div className="inline-flex items-center gap-2 mt-10 bg-[#008080]/80 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider">
            Travel Umroh &amp; Haji Berizin Resmi
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-2xl mb-6">
            Wujudkan Perjalanan{" "}
            <span className="text-[#00D4AA]">Ibadah Suci</span>{" "}
            Anda yang Bermakna
          </h1>

          <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-xl mb-10 leading-relaxed">
            Nikmati kenyamanan beribadah dengan pelayanan profesional,
            pembimbing sesuai sunnah, dan fasilitas terbaik. Kami siap melayani
            langkah suci Anda menuju baitullah.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/#layanan"
              className="inline-flex items-center justify-center gap-2 bg-[#008080] hover:bg-[#006666] text-white font-semibold px-6 py-3 rounded-md transition-colors duration-200 text-sm sm:text-base"
            >
              Layanan Kami →
            </Link>
            <Link
              href={`https://wa.me/6282311000853?text=${encodeURIComponent("Halo, saya ingin tanya tentang layanan MZM Tour")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-[#008080] text-[#008080] bg-white font-semibold px-6 py-3 rounded-md text-sm sm:text-base"
            >
              <Image src="/icon/wa2.png" width={20} height={20} alt="wa" />
              Tanya via WhatsApp
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="bg-white shadow-xl rounded-2xl -mt-10 relative z-10 px-6 sm:px-10 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {statsData.map((s, index) => (
              <div key={index} className="flex flex-col items-center">
                <p className="text-2xl sm:text-3xl font-bold text-[#008080]">{s.value}</p>
                <p className="text-gray-500 text-xs sm:text-sm mt-1 uppercase tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LAYANAN */}
      <section id="layanan" className="max-w-screen-xl mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-block bg-[#008080]/10 text-[#008080] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
              Layanan Kami
          </span>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#008080] mb-2">
              Pilihan Paket <span className="text-gray-600">Perjalanan Kami</span>
          </h3>
          <div className="w-16 h-1 bg-[#008080] mx-auto rounded-full mb-5" />
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed px-2">
            Kami memahami kebutuhan beribadah spiritual Anda. Pilih paket yang dirancang khusus
            untuk kenyamanan dan kekhusyukan Ibadah Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {layananData.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl transition-all duration-300 aspect-[4/5] sm:aspect-[3/4]"
            >
              <Image
                src={item.images}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute bottom-0 left-0 right-0 z-10 p-5 sm:p-6">
                <Link
                  href={item.href}
                  className="inline-flex items-center  py-14 px-8 gap-1 text-white text-sm font-semibold hover:gap-2 transition-all duration-200"
                >
                  Lihat Detail →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/*TENTANG */}
      <section id="tentang-mzm" className="max-w-screen-xl mx-auto px-6 pt-4 pb-16 sm:pb-20">
        <div className="text-center mb-10">
          <span className="inline-block bg-[#008080]/10 text-[#008080] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
              Tentang MZM Tour
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-600 mb-2">
              #SAHABAT <span className="text-[#008080]"> MENUJU BAITULLAH</span>
          </h2>
          <div className="w-16 h-1 bg-[#008080] mx-auto rounded-full mb-5" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
          <div className="relative rounded-2xl overflow-hidden h-72 sm:h-80 md:h-96 shadow-lg">
            <Image src="/images/tentang mzm.png" alt="Tentang MZM" fill className="object-cover" />
          </div>
          <div>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Bermula dari sebuah niat suci untuk memfasilitasi perjalanan spiritual umat Muslim ke Tanah Suci, MZM TOUR tumbuh menjadi sahabat perjalanan terpercaya
              bagi ratusan jamaah. Selama lebih dari 3 tahun, MZM TOUR tidak hanya sekadar menyediakan paket perjalanan,
              namun juga menghadirkan pengalaman ibadah yang khusyuk dan berkesan. Dengan berpegang teguh pada nilai-nilai
              profesionalisme dan dedikasi, setiap detail perjalanan dirancang dengan cermat, mulai dari akomodasi yang nyaman,
              transportasi yang aman, hingga bimbingan ibadah yang berkualitas. Dari tahun ke tahun, MZM TOUR terus berinovasi dan beradaptasi untuk memberikan
              pelayanan terbaik. Mendengarkan kebutuhan dan aspirasi jamaah menjadi prioritas utama kami, sehingga setiap perjalanan umroh bersama MZM TOUR terasa bermakna.
            </p>
            <div className="flex gap-12 sm:gap-16 mb-6 items-end">
              {tentangFeatures.map((f) => (
                <div key={f.label} className="flex flex-col items-center gap-2 text-center">
                  <div className="w-12 h-12 flex items-center justify-center">
                    <Image src={f.icons} alt={f.label} width={40} height={40} className="object-contain" />
                  </div>
                  <span className="text-xs text-black font-bold">{f.label}</span>
                </div>
              ))}
            </div>
              <Link href="/tentang-mzm" className="inline-flex items-center gap-2 bg-[#008080] hover:bg-[#006666] text-white font-semibold text-sm px-6 py-3 rounded-full transition-all duration-200">
                Pelajari Selengkapnya
                <span className="text-base leading-none">→</span>
              </Link>
          </div>
        </div>
      </section>

      {/*CEK JADWAL */}
      <section id="cek-jadwal" className="relative py-16 sm:py-20 overflow-hidden bg-gradient-to-br from-[#0F9F9F] via-[#008080] to-[#006666]">
        <div className="absolute top-[-60px] right-[-60px] w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute bottom-[-80px] left-[-40px] w-80 h-80 rounded-full bg-white/5 pointer-events-none" />

        <div className="relative max-w-screen-xl mx-auto px-6">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl px-8 sm:px-12 py-10 sm:py-12">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="max-w-lg">
                <span className="inline-block bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                  Jadwal Keberangkatan
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-snug mb-3">
                  Cek Jadwal<br />Keberangkatan Terbaru
                </h2>
                <p className="text-white/80 text-sm leading-relaxed mb-6">
                  Jangan lewatkan kesempatan untuk berangkat di musim umroh terbaik.
                  Lihat jadwal dan amankan kursi Anda segera melalui WhatsApp.
                </p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="flex items-center gap-2 text-white font-medium bg-white/10 px-3 py-1.5 rounded-full">
                    <Image src="/icon/ceklis.png" alt="Izin Kemenag" width={18} height={18} />
                    Berizin Kemenag RI
                  </span>
                  <span className="flex items-center gap-2 text-white font-medium bg-white/10 px-3 py-1.5 rounded-full">
                    <Image src="/icon/ceklis.png" alt="Pasti Berangkat" width={18} height={18} />
                    Pasti Berangkat
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
                <Link
                  href="/cek-jadwal"
                  className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-[#008080] font-bold px-6 sm:px-8 py-4 rounded-xl transition-colors duration-200 whitespace-nowrap text-sm sm:text-base shadow-lg"
                >
                  <Image src="/icon/calender.png" alt="kalender" width={22} height={22} />
                  Lihat Jadwal Keberangkatan
                </Link>
                <p className="text-white/60 text-xs">
                  Tersedia jadwal umroh & haji 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEW */}
      <section id="testimoni" className="bg-[#edf7f7] py-16 sm:py-20 overflow-hidden">
        <div className="max-w-screen-xl mx-auto px-6">

          {/* Header */}
          <div className="text-center mb-8">
            <span className="inline-block bg-[#008080]/10 text-[#008080] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
              Testimoni Jamaah
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Kata Mereka tentang <span className="text-[#008080]">MZM Tour</span>
            </h2>
            <div className="w-16 h-1 bg-[#008080] mx-auto rounded-full mb-5" />
            <div className="flex items-center justify-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-[#F59E0B] text-lg">★</span>
                ))}
              </div>
              <span className="text-gray-800 font-bold text-sm">4.9</span>
              <span className="text-gray-500 text-sm">dari 500+ ulasan jamaah</span>
            </div>
          </div>
          <div
            ref={reviewRef}
            className="flex gap-5 overflow-x-auto py-6"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {[...reviewsData, ...reviewsData, ...reviewsData].map((r, index) => (
              <div key={index}
                className="flex-shrink-0 w-[280px] sm:w-[300px] bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-[#F59E0B] text-sm">★</span>
                    ))}
                  </div>
                  <span className="text-gray-400 text-xs">Mar 2026</span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed flex-1 mb-5">
                  &ldquo;{r.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-9 h-9 rounded-full bg-[#008080]/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <Image src={r.avatar} alt={r.name} width={36} height={36} className="rounded-full object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{r.name}</p>
                    <p className="text-gray-400 text-xs">{r.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Form Review */}
          <div id="form-review" className="max-w-lg mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-8">Tulis Review Anda</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  placeholder="Masukkan nama Anda..."
                  className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kota Asal</label>
                <input
                  type="text"
                  placeholder="Contoh: Jakarta Selatan..."
                  className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <select className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#008080]">
                  <option>★★★★★ (Sangat Puas)</option>
                  <option>★★★★ (Puas)</option>
                  <option>★★★ (Cukup)</option>
                  <option>★★ (Kurang)</option>
                  <option>★ (Tidak Puas)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pesan Review</label>
                <textarea
                  rows={4}
                  placeholder="Bagikan pengalaman Anda..."
                  className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#008080] resize-none"
                />
              </div>
              <button className="w-full bg-[#008080] hover:bg-[#006666] text-white font-semibold py-3 rounded-md transition-colors duration-200 text-sm sm:text-base inline-flex items-center justify-center gap-2">
                Kirim Review
                <Image src="/icon/send.png" alt="Send Icon" width={19} height={16} />
              </button>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}