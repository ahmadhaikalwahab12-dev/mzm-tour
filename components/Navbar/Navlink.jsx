"use client";

import Link from "next/link";
import {IoClose, IoMenu} from "react-icons/io5";
import Image from "next/image";
import {useState} from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const WHATSAPP = "https://wa.me/+6282311000853";
const WHATSAPP_MESSAGE = "Halo, saya tertarik dengan layanan MZM Tour. Bisa bantu saya untuk informasi lebih lanjut? Terima kasih!";
const WHATSAPP_URL = `${WHATSAPP}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

const layananPaths = ["/paket-haji", "/paket-umroh", "/paket-wisata"];

const Navlink = () => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const handleClick = () => setOpen(false);

    const isLayanan = layananPaths.includes(pathname);

  return (
    <>
        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
            <Link 
                href={WHATSAPP_URL}
                target="Wujudkan Perjalanan Ibadah Suci Anda yang Bermakna"
                rel="noopener noreferrer"
                className="py-2 px-3 sm:px-4 bg-[#008080] text-white text-sm font-semibold rounded-md hover:bg-[#006666] transition-colors duration-200 flex items-center gap-1.5"
            >
                <Image src="/icon/wa.png" width={25} height={25} alt="WhatsApp Icon" className="hidden sm:inline" />
                WhatsApp
                <span className="hidden sm:inline"></span>
            </Link>
        </div>

        <button onClick={()=> setOpen(!open)} className='inline-flex items-center p-2 justify-center text-sm text-gray-800 rounded-md md:hidden hover:bg-gray-100' aria-label="Toggle menu">
            {open ? <IoClose className="size-7" /> : <IoMenu className="size-7"/>}
        </button>
        
        {/* Menu desktop, mobile dropdown */}
        <div className={clsx("absolute top-full left-0 w-full bg-white shadow-md border-t border-gray-100 md:shadow-none md:border-0 md:static md:w-auto md:block", {
            "hidden": !open
        })}>
            {isLayanan ? (
                /* Link untuk halaman layanan */
                <ul className="flex flex-col font-semibold text-sm md:flex-row md:items-center md:gap-8 p-4 md:p-0">
                    <li>
                        <Link href="/" onClick={handleClick} className="block py-2 pl-3 pr-4 text-[#0F172A] hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0 hover:text-[#008080] transition-colors duration-200">
                            Beranda
                        </Link>
                    </li>
                    <li>
                        <Link href="/paket-umroh" onClick={handleClick} className={clsx("block py-2 pl-3 pr-4 rounded-sm md:p-0 transition-colors duration-200", pathname === "/paket-umroh" ? "text-[#008080] font-bold" : "text-[#0F172A] hover:text-[#008080] hover:bg-gray-100 md:hover:bg-transparent")}>
                            Umroh
                        </Link>
                    </li>
                    <li>
                        <Link href="/paket-haji" onClick={handleClick} className={clsx("block py-2 pl-3 pr-4 rounded-sm md:p-0 transition-colors duration-200", pathname === "/paket-haji" ? "text-[#008080] font-bold" : "text-[#0F172A] hover:text-[#008080] hover:bg-gray-100 md:hover:bg-transparent")}>
                            Haji
                        </Link>
                    </li>
                    <li>
                        <Link href="/paket-wisata" onClick={handleClick} className={clsx("block py-2 pl-3 pr-4 rounded-sm md:p-0 transition-colors duration-200", pathname === "/paket-wisata" ? "text-[#008080] font-bold" : "text-[#0F172A] hover:text-[#008080] hover:bg-gray-100 md:hover:bg-transparent")}>
                            Wisata
                        </Link>
                    </li>
                    <li className="md:ml-40 hidden md:block">
                        <Link 
                            href={WHATSAPP_URL}
                            target="Perjalanan Ibadah Suci Anda yang Bermakna"
                            rel="noopener noreferrer"
                            className="py-2.5 px-6 bg-[#008080] text-white rounded-md hover:bg-[#006666] transition-colors duration-200 flex items-center">
                            <Image src="/icon/wa.png" width={25} height={25} alt="WhatsApp Icon" className="mr-2" />
                            WhatsApp
                        </Link>
                    </li>
                </ul>
            ) : (
                /* Link untuk halaman beranda - original */
                <ul className="flex flex-col font-semibold text-sm md:flex-row md:items-center md:gap-8 p-4 md:p-0">
                    <li>
                        <Link href="/#beranda" onClick={handleClick} className="block py-2 pl-3 pr-4 text-[#0F172A] hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0 hover:text-[#008080] transition-colors duration-200">
                            Beranda
                        </Link>
                    </li>
                    <li>
                        <Link href="/#layanan" onClick={handleClick} className="block py-2 pl-3 pr-4 text-[#0F172A] hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0 hover:text-[#008080] transition-colors duration-200">
                            Layanan
                        </Link>
                    </li>
                    <li>
                        <Link href="/#tentang-mzm" onClick={handleClick} className="block py-2 pl-3 pr-4 text-[#0F172A] hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0 hover:text-[#008080] transition-colors duration-200">
                            Tentang MZM 
                        </Link>
                    </li>
                    <li>
                        <Link href="/#cek-jadwal" onClick={handleClick} className="block py-2 pl-3 pr-4 text-[#0F172A] hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0 hover:text-[#008080] transition-colors duration-200">
                            Cek Jadwal 
                        </Link>
                    </li>
                    <li>
                        <Link href="/#testimoni" onClick={handleClick} className="block py-2 pl-3 pr-4 text-[#0F172A] hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0 hover:text-[#008080] transition-colors duration-200">
                            Testimoni
                        </Link>
                    </li>
                    <li className="md:ml-40 hidden md:block">
                        <Link 
                            href={WHATSAPP_URL}
                            target="Perjalanan Ibadah Suci Anda yang Bermakna"
                            rel="noopener noreferrer"
                            className="py-2.5 px-6 bg-[#008080] text-white rounded-md hover:bg-[#006666] transition-colors duration-200 rounded-sm flex items-center">
                            <Image src="/icon/wa.png" width={25} height={25} alt="WhatsApp Icon" className="mr-2" />
                            WhatsApp
                        </Link>
                    </li>
                </ul>
            )}
        </div>  
    </>
  );
};

export default Navlink;