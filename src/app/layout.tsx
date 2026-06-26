import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MysticMate - Uplifting Spiritual Guidance",
  description: "Bespoke, uplifting spiritual guidance through G-rated AI readings. Tarot, Spirit Animal, Love, and Career insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${inter.variable}`}>
      <body className="bg-[#0f051d] text-white min-h-screen font-sans selection:bg-purple-500/30">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
