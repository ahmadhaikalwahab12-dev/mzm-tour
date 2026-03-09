"use client";
import Image from 'next/image';
import React, { useRef, useEffect } from 'react';
import Link from 'next/link';

export default function TentangMzm() {
    const scrollRef = useRef(null);
    const scrollLeft = () => scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
    const scrollRight = () => scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });

    useEffect(() => {
        const interval = setInterval(() => {
            if (scrollRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
                if (scrollLeft + clientWidth >= scrollWidth - 10) {
                    scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
                } else {
                    scrollRef.current.scrollBy({ left: 280, behavior: "smooth" });
                }
            }
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen pt-16 bg-white">
          {/*Hero Section*/}
          <section id="tentang-mzm" className="relative w-full h-[45vh] sm:h-[55vh] md:h-[65vh] overflow-hidden">
                <Image
                    src="/images/tentang-mzm.png"
                    alt="Hero Section"
                    fill
                    className="object-cover object-center"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end px-6 sm:px-12 md:px-20 pb-10 sm:pb-14">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-2">
                    MZM{" "}
                    <span className="text-[#008080]">Tour</span>{" "}
                    <span className="text-white">&amp; Travel</span>
                    </h1>
                    <div className="flex items-center gap-2 mt-1">
                    <p className="text-white/80 text-sm sm:text-base font-medium tracking-wide">
                        Sahabat Menuju Baitullah
                    </p>
                    </div>
                </div>
          </section>

          {/*Content Section */}
          <section className="w-full py-12 px-6 sm:px-10">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl sm:text-3xl font-bold">
                    Momen <span className="text-[#008080]">Kebahagiaan</span>
                    </h2>
                    <div className="flex items-center gap-2">
                    <button
                        onClick={scrollLeft}
                        className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 hover:border-[#008080] hover:text-[#008080] transition-all text-gray-500 text-base"
                    >
                        ←
                    </button>
                    <button
                        onClick={scrollRight}
                        className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 hover:border-[#008080] hover:text-[#008080] transition-all text-gray-500 text-base"
                    >
                        →
                    </button>
                    </div>
                </div>

                <div
                    ref={scrollRef}
                    className="flex gap-5 overflow-x-auto pb-2"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {[
                    "/images/perjalanan1.png",
                    "/images/perjalanan2.png",
                    "/images/perjalanan3.png",
                    "/images/perjalanan4.png",
                    "/images/perjalanan5.png",
                    "/images/perjalanan6.png",
                    "/images/perjalanan7.png",
                    "/images/perjalanan8.png",
                    "/images/perjalanan9.png",
                    "/images/perjalanan10.png",
                    "/images/perjalanan12.png",
                    "/images/perjalanan13.png",
                    ].map((src, index) => (
                    <div
                        key={index}
                        className="relative flex-shrink-0 w-[280px] h-[280px] rounded-2xl overflow-hidden shadow-sm group"
                    >
                        <Image
                        src={src}
                        alt={`Perjalanan ${index + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                    ))}
                </div>
           </section>

            {/*kisah perjalanan*/}
            <section className="max-w-screen-xl mx-auto px-6 sm:px-10 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                <div className="relative rounded-3xl overflow-hidden h-[420px] sm:h-[480px] shadow-xl bg-white">
                    <Image src="/images/gambar2.png" alt="Kisah Perjalanan" fill className="object-contain" />
                    <div className="absolute bottom-5 left-5 bg-white rounded-2xl px-5 py-4 shadow-lg">
                    </div>
                </div>

                <div className="flex flex-col justify-center">
                    <span className="inline-block border border-[#008080] text-[#008080] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-5 w-fit">
                    Our Journey Story
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-[#008080] mb-6 leading-tight">
                    Kisah Perjalanan Kami
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    Bermula dari sebuah niat suci untuk memfasilitasi perjalanan spiritual umat Muslim
                    ke Tanah Suci, MZM TOUR tumbuh menjadi sahabat perjalanan terpercaya bagi ratusan jamaah.
                    Selama lebih dari 3 tahun, MZM TOUR tidak hanya sekadar menyediakan paket perjalanan,
                    namun juga menghadirkan pengalaman ibadah yang khusyuk dan berkesan.
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    Dengan berpegang teguh pada nilai-nilai profesionalisme dan dedikasi, setiap detail perjalanan
                    dirancang dengan cermat, mulai dari akomodasi yang nyaman, transportasi yang aman,
                    hingga bimbingan ibadah yang berkualitas.
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed mb-8">
                    Dari tahun ke tahun, MZM TOUR terus berinovasi dan beradaptasi untuk memberikan
                    pelayanan terbaik. Mendengarkan kebutuhan dan aspirasi jamaah menjadi prioritas utama kami,
                    sehingga setiap perjalanan umroh bersama MZM TOUR terasa bermakna.
                    </p>
                    <div className="border-t border-gray-200 pt-6">
                    <Link href="#visi-misi" className="inline-flex items-center gap-2 text-[#008080] font-semibold text-sm hover:gap-3 transition-all duration-200">
                        Pelajari Visi &amp; Misi Kami
                        <span className="text-xl font-bold">↓</span>
                    </Link>
                    </div>
                </div>
                </div>
            </section>

            {/*misi dan visi*/}  
            <section id="visi-misi" className="bg-gray-50 py-16 sm:py-20">
                <div className="max-w-screen-xl mx-auto px-6 sm:px-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">

                    {/* VISI */}
                    <div className="md:sticky md:top-24">
                    <div className="bg-gradient-to-br from-[#008080] to-[#006666] rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden">
                        <div className="absolute top-[-30px] right-[-30px] w-40 h-40 rounded-full bg-white/5" />
                        <div className="absolute bottom-[-20px] left-[-20px] w-28 h-28 rounded-full bg-white/5" />
                        <span className="inline-block bg-white/20 text-white text-[20px] font-bold tracking-widest px-3 py-1 rounded-full mb-6">
                        Visi Kami
                        </span>
                        <p className="text-white text-base sm:text-lg leading-relaxed font-medium italic">
                        &ldquo;Menjadi penyelenggara perjalanan umroh yang amanah, profesional,
                        dan meraih mabrur, serta menjadi sahabat menuju baitullah.&rdquo;
                        </p>
                    </div>
                    </div>

                    {/* MISI */}
                    <div>
                    <div className="flex items-center gap-3 mb-8">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                        Misi <span className="text-[#008080]">Kami</span>
                        </h2>
                        <div className="flex-1" />
                    </div>
                    <div className="space-y-4">
                        {[
                        { icon: "/icon/Amanah.png",       title: "Amanah & Terpercaya",    desc: "Menjunjung tinggi kepercayaan jamaah dengan pelayanan yang jujur dan transparan." },
                        { icon: "/icon/keamana.png",       title: "Keamanan Utama",         desc: "Menjamin kenyamanan dan keselamatan jamaah selama proses keberangkatan hingga kepulangan." },
                        { icon: "/icon/pembimbing2.png",   title: "Pembimbing Ibadah Ahli", desc: "Didampingi oleh muthowif yang berpengalaman sesuai dengan tuntunan sunnah." },
                        { icon: "/icon/jejaring.png",      title: "Jejaring Luas",          desc: "Bekerjasama dengan maskapai dan hotel terbaik di tanah suci." },
                        { icon: "/icon/inovasi.png",       title: "Inovasi Layanan",        desc: "Terus berinovasi untuk memudahkan pendaftaran dan pengelolaan perjalanan jamaah." },
                        ].map((item, i) => (
                        <div key={i} className="flex items-start gap-4 bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 hover:border-[#008080]/30 hover:shadow-md transition-all duration-200">
                            <div className="w-11 h-11 flex-shrink-0 flex items-center justify-center">
                            <Image src={item.icon} alt={item.title} width={40} height={40} className="object-contain" />
                            </div>
                            <div className="pt-0.5">
                            <p className="font-bold text-gray-900 text-sm mb-1">{item.title}</p>
                            <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                        ))}
                    </div>
                    </div>

                </div>
                </div>
            </section>

            {/*Komitmen*/} 
            <section className="relative py-16 px-6 sm:px-10 overflow-hidden bg-gradient-to-br from-[#0F9F9F] via-[#008080] to-[#006666]">
                <div className="absolute top-[-60px] right-[-60px] w-72 h-72 rounded-full bg-white/5 pointer-events-none" />
                <div className="absolute bottom-[-80px] left-[-40px] w-80 h-80 rounded-full bg-white/5 pointer-events-none" />

                <div className="relative max-w-screen-xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white text-center uppercase tracking-widest mb-10">
                    Komitmen MZM Tour
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                        {
                        icon: "/icon/sahabat.png",
                        title: "Sahabat Perjalanan Anda",
                        desc: "Kami bukan sekadar agen travel, melainkan sahabat yang akan membimbing dan menemani setiap langkah Anda menuju Baitullah dengan sepenuh hati.",
                        },
                        {
                        icon: "/icon/kepuasan.png",
                        title: "Kepuasan Jamaah",
                        desc: "Fokus utama kami adalah memastikan kepuasan dan kenyamanan jamaah dalam beribadah, sehingga dapat mencapai predikat Umroh yang mabrur.",
                        },
                    ].map((item, i) => (
                        <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 flex flex-col items-center text-center gap-4">
                        <div className="w-14 h-14 flex items-center justify-center bg-white/20 rounded-full">
                            <Image src={item.icon} alt={item.title} width={32} height={32} className="object-contain" />
                        </div>
                        <h3 className="font-bold text-white text-base">{item.title}</h3>
                        <p className="text-white/80 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                    </div>
                </div>
            </section>

            {/*legalitas*/}
            <section className="max-w-screen-xl mx-auto py-16 px-6 sm:px-10 pb-16">
                <div className="text-center mb-10">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                    Legalitas <span className="text-[#008080]">Resmi</span>
                    </h2>
                    <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
                    MZM Tour beroperasi di bawah legalitas hukum yang sah untuk memberikan rasa aman
                    bagi setiap calon jamaah.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                    <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                        <Image
                        src="/images/legalitas1.png"
                        alt="SK Pengesahan Pendirian Badan Hukum"
                        width={600}
                        height={850}
                        className="w-full h-auto object-cover"
                        />
                    </div>
                    </div>
                    <div>
                    <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                        <Image
                        src="/images/legalitas2.png"
                        alt="Lampiran Keputusan Menteri Hukum"
                        width={600}
                        height={850}
                        className="w-full h-auto object-cover"
                        />
                    </div>
                    </div>
                </div>
            </section>

            {/*Kantor pusat*/}
            <section className="bg-[#f0f7f7] py-16 px-6 sm:px-10">
                <div className="max-w-screen-xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#008080] mb-8">
                        Kantor Pusat
                        </h2>
                        <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center bg-white border border-gray-200 rounded-full shadow-sm mt-0.5">
                            <Image src="/icon/lokasi.png" alt="Lokasi" width={18} height={18} className="object-contain" />
                            </div>
                            <p className="text-gray-700 text-sm leading-relaxed">
                            Jl. Kalibata Selatan II No.23 A, RT.12/RW.4, Kalibata, Kec.
                            Pancoran, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta
                            12740, Jakarta, Indonesia, 12740
                            </p>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center bg-white border border-gray-200 rounded-full shadow-sm mt-0.5">
                            <Image src="/icon/telphone.png" alt="Telepon" width={18} height={18} className="object-contain" />
                            </div>
                            <div>
                            <p className="text-gray-800 text-sm font-medium">+62 823–1100–0853</p>
                            <Link
                                href="https://wa.me/6282311000853"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#008080] text-xs hover:underline"
                            >
                                Hubungi kami via WhatsApp
                            </Link>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-md h-64 sm:h-72 relative">
                        <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.121!2d106.8458!3d-6.2297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e5a5a5a5a5%3A0x0!2sJl.+Kalibata+Selatan+II+No.23+A%2C+Kalibata%2C+Jakarta+Selatan!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full"
                        />
                    </div>
                    </div>
                </div>
            </section>
        </div>
    );
};