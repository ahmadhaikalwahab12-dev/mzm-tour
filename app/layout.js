import {Plus_Jakarta_Sans} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "MZM TOUR",
  description: "Travel Umroh & Haji Berizin Resmi",
  icons: {
    icon: "/icon/logo.png",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${plusJakartaSans.variable} antialiased pt-[80x]`}>
        <Navbar />
        <main className="bg-gray-50 min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
