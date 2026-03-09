import Image from "next/image";
import Link from "next/link";
import Navlink from "@/components/Navbar/Navlink";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm fixed top-0  left-0 w-full z-50">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 sm:px-6 p-4 relative">
        <Link href="/" className="ml-0">
          <Image src="/icon/logo.png" width={82} height={56} alt="logo" priority/>
        </Link>
        <div className="flex flex-1 justify-center"></div>
        <Navlink />
      </div>
    </nav>
  )
}

export default Navbar