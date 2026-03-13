"use client";
import React, { useRef, useEffect, useState } from "react";
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
  { images: "/images/Umrohcard2.png",   title: "Layanan Umroh",  href: "/paket-umroh"  },
  { images: "/images/wisataIslam2.png", title: "Wisata Islam",   href: "/paket-wisata" },
];

const tentangFeatures = [
  { icons: "/icon/izin.png",       label: "Izin Resmi" },
  { icons: "/icon/pembimbing.png", label: "Pembimbing Ahli" },
  { icons: "/icon/fasilitas.png",  label: "Fasilitas Premium" },
];

const emptyForm = { nama: "", lokasi: "", rating: 5, pesan: "" };

export default function MzmTourApp() {
  const reviewRef = useRef(null);

  // testimoni state
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(""); // "success" | "error"

  // fetch testimoni yang tampil = true
  useEffect(() => {
    fetchTestimoni();
  }, []);

  async function fetchTestimoni() {
    try {
      const res = await fetch("/api/testimoni");
      const json = await res.json();
      if (json.success && json.data) setReviews(json.data);
    } catch {
      console.error("Gagal fetch testimoni");
    }
  }

  // auto scroll review
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

  // submit review
  const handleSubmit = async () => {
    if (!form.nama.trim() || !form.pesan.trim()) {
      setSubmitStatus("error-empty");
      return;
    }
    setSubmitting(true);
    setSubmitStatus("");
    try {
      const res = await fetch("/api/testimoni", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama: form.nama.trim(),
          lokasi: form.lokasi.trim(),
          rating: form.rating,
          pesan: form.pesan.trim(),
        }),
      });
      const json = await res.json();
      setSubmitting(false);
      if (json.success) {
        setSubmitStatus("success");
        setForm(emptyForm);
        fetchTestimoni();
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitting(false);
      setSubmitStatus("error");
    }
  };

  // tampilkan reviews dari DB, fallback ke static jika kosong
  const displayReviews = reviews.length > 0 ? reviews : [
    { nama: "H. Ahmad Fauzi",   lokasi: "Jakarta Selatan", rating: 5, pesan: "Alhamdulillah, perjalanan umroh bersama MZM Travel sangat berkesan. Pembimbingnya sangat sabar dan lokasi hotel sangat dekat dengan masjid." },
    { nama: "Hj. Siti Aminah",  lokasi: "Jakarta Timur",   rating: 5, pesan: "Fasilitas VIP benar-benar terasa. Haji dengan MZM Travel adalah keberkahan tersendiri, terimakasih MZM Travel atas bantuannya." },
    { nama: "Bp. Budi Santoso", lokasi: "Bekasi",          rating: 5, pesan: "Paket Wisata Islami ke Turki sangat menyenangkan. Makanan selalu terjamin serta jadwal shalat tetap terjaga dengan baik." },
  ];

  return (
    <main className="bg-[#edf7f7]">

      {/*HERO*/}
      <section id="beranda" className="relative w-full min-h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/gambar1.png" alt="Hero Section 1" width={1440} height={797}
            className="w-full h-full object-cover" priority />
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
            Nikmati kenyamanan beribadah dengan pelayanan profesional, pembimbing sesuai sunnah, dan fasilitas terbaik.
            Kami siap melayani langkah suci Anda menuju baitullah.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/#layanan"
              className="inline-flex items-center justify-center gap-2 bg-[#008080] hover:bg-[#006666] text-white font-semibold px-6 py-3 rounded-md transition-colors duration-200 text-sm sm:text-base">
              Layanan Kami →
            </Link>
            <Link href={`https://wa.me/6282311000853?text=${encodeURIComponent("Halo, saya ingin tanya tentang layanan MZM Tour")}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-[#008080] text-[#008080] bg-white font-semibold px-6 py-3 rounded-md text-sm sm:text-base">
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
            Kami memahami kebutuhan beribadah spiritual Anda. Pilih paket yang dirancang khusus untuk kenyamanan dan kekhusyukan Ibadah Anda.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {layananData.map((item, index) => (
            <div key={index} className="group relative transition-all duration-300 aspect-[4/5] sm:aspect-[3/4]">
              <Image src={item.images} alt={item.title} fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
              <div className="absolute bottom-0 left-0 right-0 z-10 p-5 sm:p-6">
                <Link href={item.href}
                  className="inline-flex items-center py-14 px-8 gap-1 text-white text-sm font-semibold hover:gap-2 transition-all duration-200">
                  Lihat Detail →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TENTANG */}
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
            <Image src="/images/tentang-mzm.png" alt="Tentang MZM" fill className="object-cover" />
          </div>
          <div>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Bermula dari sebuah niat suci untuk memfasilitasi perjalanan spiritual umat Muslim ke Tanah Suci, MZM TOUR tumbuh menjadi sahabat perjalanan terpercaya
              bagi ratusan jamaah. Selama lebih dari 3 tahun, MZM TOUR tidak hanya sekadar menyediakan paket perjalanan,
              namun juga menghadirkan pengalaman ibadah yang khusyuk dan berkesan.
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
            <Link href="/tentang-mzm"
              className="inline-flex items-center gap-2 bg-[#008080] hover:bg-[#006666] text-white font-semibold text-sm px-6 py-3 rounded-full transition-all duration-200">
              Pelajari Selengkapnya
              <span className="text-base leading-none">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CEK JADWAL */}
      <section id="cek-jadwal" className="relative py-16 sm:py-20 overflow-hidden" style={{ background: "#008080" }}>
        <div className="relative max-w-screen-xl mx-auto px-8 sm:px-16 md:px-20">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-16">
            <div className="relative max-w-screen-xl mx-auto px-6 sm:px-10 md:px-20 lg:px-32">
              <p className="text-white/70 text-[11px] font-bold uppercase tracking-widest mb-3">Jadwal Keberangkatan</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
                Cek Jadwal <br />Keberangkatan Terbaru
              </h2>
              <p className="text-white/75 text-sm sm:text-base leading-relaxed mb-6 max-w-md">
                Jangan lewatkan kesempatan untuk berangkat di musim umroh terbaik. Lihat jadwal tersedia dan amankan kursi Anda segera.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="flex items-center gap-2 text-white font-medium">
                  <span className="w-5 h-5 rounded-full border border-white/50 flex items-center justify-center text-[10px]">✓</span>
                  Berizin Kemenag RI
                </span>
                <span className="flex items-center gap-2 text-white font-medium">
                  <span className="w-5 h-5 rounded-full border border-white/50 flex items-center justify-center text-[10px]">✓</span>
                  Pasti Berangkat
                </span>
              </div>
            </div>
            <div className="shrink-0 w-full md:w-auto">
              <Link href="/cek-jadwal"
                className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-[#006666] hover:bg-[#005555] text-white font-bold px-7 py-4 rounded-2xl transition-colors duration-200 text-sm sm:text-base shadow-xl">
                <Image src="/icon/calender1.png" alt="kalender" width={20} height={20} className="opacity-80" />
                Lihat Jadwal Keberangkatan
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEW */}
      <section id="testimoni" className="py-16 sm:py-20 overflow-hidden">
        <div className="max-w-screen-xl mx-auto px-6">
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
                {[...Array(5)].map((_, i) => <span key={i} className="text-[#F59E0B] text-lg">★</span>)}
              </div>
              <span className="text-gray-800 font-bold text-sm">4.9</span>
              <span className="text-gray-500 text-sm">dari 500+ ulasan jamaah</span>
            </div>
          </div>

          {/* Scroll review cards */}
          <div ref={reviewRef} className="flex gap-5 overflow-x-auto py-6"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {[...displayReviews, ...displayReviews, ...displayReviews].map((r, index) => (
              <div key={index}
                className="flex-shrink-0 w-[280px] sm:w-[300px] bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < (r.rating || 5) ? "text-[#F59E0B] text-sm" : "text-gray-200 text-sm"}>★</span>
                    ))}
                  </div>
                  <span className="text-gray-400 text-xs">
                    {r.created_at ? new Date(r.created_at).toLocaleDateString("id-ID", { month: "short", year: "numeric" }) : "Mar 2026"}
                  </span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed flex-1 mb-5">&ldquo;{r.pesan || r.text}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-9 h-9 rounded-full bg-[#008080]/10 flex items-center justify-center flex-shrink-0 text-sm font-bold text-[#008080]">
                    {(r.nama || r.name)?.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{r.nama || r.name}</p>
                    <p className="text-gray-400 text-xs">{r.lokasi || r.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Form Review */}
          <div id="form-review" className="max-w-lg mx-auto mt-6">
            <h3 className="text-xl sm:text-2xl font-bold text-center text-[#008080] mb-8">Tulis Review Anda</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap <span className="text-red-500">*</span></label>
                <input type="text" value={form.nama} onChange={e => setForm({...form, nama: e.target.value})}
                  placeholder="Masukkan nama Anda..."
                  className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#008080]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kota Asal</label>
                <input type="text" value={form.lokasi} onChange={e => setForm({...form, lokasi: e.target.value})}
                  placeholder="Contoh: Jakarta Selatan..."
                  className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#008080]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <div className="flex gap-2">
                  {[1,2,3,4,5].map(n => (
                    <button key={n} onClick={() => setForm({...form, rating: n})}
                      className={`text-2xl transition-transform hover:scale-110 ${n <= form.rating ? "text-amber-400" : "text-gray-300"}`}>★</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pesan Review <span className="text-red-500">*</span></label>
                <textarea rows={4} value={form.pesan} onChange={e => setForm({...form, pesan: e.target.value})}
                  placeholder="Bagikan pengalaman Anda..."
                  className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#008080] resize-none" />
              </div>

              {/* Status messages */}
              {submitStatus === "success" && (
                <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-lg flex items-center gap-2">
                  ✓ Terima kasih! Review Anda berhasil dikirim dan sudah tampil.
                </div>
              )}
              {submitStatus === "error-empty" && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg">
                  Nama dan pesan review wajib diisi.
                </div>
              )}
              {submitStatus === "error" && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg">
                  Terjadi kesalahan. Silakan coba lagi.
                </div>
              )}

              <button onClick={handleSubmit} disabled={submitting}
                className="w-full bg-[#008080] hover:bg-[#006666] disabled:opacity-60 text-white font-semibold py-3 rounded-md transition-colors duration-200 text-sm sm:text-base inline-flex items-center justify-center gap-2">
                {submitting ? "Mengirim..." : (
                  <>Kirim Review <Image src="/icon/send.png" alt="Send" width={19} height={16} /></>
                )}
              </button>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}