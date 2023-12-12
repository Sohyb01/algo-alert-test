import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Algo Alert",
  description: "The Options Platform for you",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} bg-[#121F2D] bodybg flex flex-col items-center bg-center bg-cover`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
