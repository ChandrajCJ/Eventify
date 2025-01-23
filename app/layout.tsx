import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "../components/shared/Footer";
import Header from "../components/shared/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eventify",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-screen !scroll-smooth">
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex-1 h-fit bg-[#F7F5EF] dark:bg-s[#1a202c] dark:text-white`} 
      >
        <Header/>
        {children}
        <Footer />
      </body>
    </html>
  );
}
