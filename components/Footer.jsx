import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#064343]">
      <div className="max-w-screen-xl mx-auto px-6 py-10 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* logo dan deskripsi */}
          <div>
            <Link href="/">
              <Image src="/icon/logo.png" width={82} height={56} alt="logo" priority/>
            </Link>
            <p className="text-[#CBD5E1] py-6 text-sm leading-relaxed">
              MZM Travel adalah penyelenggara resmi perjalanan ibadah Umroh dan
              Haji yang mengutamakan pelayanan sesuai sunnah dan kenyamanan jamaah sejak 2025.
            </p>
            <div className="flex gap-4">
              <Link href="https://wa.me/6282311000853" target="Perjalanan Ibadah Suci Anda yang Bermakna" rel="noopener noreferrer">
                <Image src="/icon/wa1.png" width={44} height={44} alt="whatsapp"/>
              </Link>
              <Link href="https://instagram.com/@MZMTOUR" target="Perjalanan Ibadah Suci Anda yang Bermakna" rel="noopener noreferrer">
                <Image src="/icon/ig.png" width={44} height={44} alt="instagram"/>
              </Link>
              <Link href="https://tiktok.com/@MZMTOUR" target="Perjalanan Ibadah Suci Anda yang Bermakna" rel="noopener noreferrer">
                <Image src="/icon/tiktok.png" width={44} height={44} alt="tiktok"/>
              </Link>
            </div>
          </div>

          {/* Tautan Langsung */}
          <div>
            <h4 className="mb-6 text-xl font-semibold text-white">Tautan Langsung</h4>
            <ul className="space-y-4 text-[#CBD5E1] text-sm">
              <li>
                <Link href="/#beranda" className="hover:text-white transition-colors duration-200">Beranda</Link>
              </li>
              <li>
                <Link href="/#layanan" className="hover:text-white transition-colors duration-200">Layanan</Link>
              </li>
              <li>
                <Link href="/#tentang-mzm" className="hover:text-white transition-colors duration-200">Tentang MZM</Link>
              </li>
              <li>
                <Link href="/#cek-jadwal" className="hover:text-white transition-colors duration-200">Cek Jadwal</Link>
              </li>
              <li>
                <Link href="/#testimoni" className="hover:text-white transition-colors duration-200">Testimoni</Link>
              </li>
            </ul>
          </div>

          {/*Hubungi Kami */}
          <div>
            <h4 className="mb-6 text-xl font-semibold text-white">Hubungi Kami</h4>
            <ul className="space-y-5 text-[#CBD5E1] text-sm">
              <li className="flex items-start gap-3">
                <Image src="/icon/telphone.png" width={18} height={18} alt="telephone" className="mt-0.5 shrink-0"/>
                <Link href="tel:+6282311000853" className="hover:text-white transition-colors duration-200">
                  +62 823-1100-0853
                </Link>
              </li>
              <li className="flex items-start gap-3">
                <Image src="/icon/mail.png" width={18} height={18} alt="mail" className="mt-0.5 shrink-0"/>
                <Link href="mailto:info@mzmtravel.com" className="hover:text-white transition-colors duration-200">
                  info@mzmtravel.com
                </Link>
              </li>
              <li className="flex items-start gap-3">
                <Image src="/icon/lokasi.png" width={18} height={18} alt="location" className="mt-0.5 shrink-0"/>
                <Link href="https://maps.app.goo.gl/5J7X8Y9Z1A2B3C4D" target="_blank" className="hover:text-white transition-colors duration-200 leading-relaxed">
                  Jl. Kalibata Selatan II No.23 A, RT.12/RW.4, Kalibata, Kec. Pancoran, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12740
                </Link>
              </li>
               <li className="flex items-start gap-3">
                  <Image src="/icon/jam.png" width={22} height={22} alt="jam" className="mt-0.5 shrink-0" />
                  <div className="flex flex-col gap-1 hover:text-white transition-colors duration-200 leading-relaxed">
                    <span>Senin – Jumat: 10.00 – 17.00 WIB</span>
                    <span>Sabtu – Minggu: Libur</span>
                  </div>
                </li>
            </ul>
          </div>

          {/*Kantor Kami */}
          <div>
            <h4 className="mb-4 text-white text-xl font-semibold">Kantor Kami</h4>
            <div className="rounded-md overflow-hidden w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d991.4419716587148!2d106.8466503160969!3d-6.276644995486698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5c9b8a7b8e7%3A0x9c5a5b5c5b5b5b5b!2sMZM%20Travel%20-%20Penyelenggara%20Resmi%20Umroh%20dan%20Haji%20di%20Jakarta%20Selatan!5e0!3m2!1sid!2sid!4v1700000000000"
                width="100%"
                height="180"
                className="border-0 rounded-md"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
              <Link
                href="https://maps.app.goo.gl/5J7X8Y9Z1A2B3C4D"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 mt-3 hover:opacity-80 transition-opacity duration-200 w-fit"
              >
                <Image src="/icon/open.png" width={28} height={18} alt="open" className="object-contain" />
                <span className="text-white text-sm">Buka di Google Maps</span>
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-screen-xl mx-auto px-6 border-t border-gray-600 py-6 text-center text-sm text-gray-400">
        &copy; 2026 MZM Travel. All Rights Reserved. Izin Umroh No. 123/2021
      </div>
    </footer>
  )
}

export default Footer