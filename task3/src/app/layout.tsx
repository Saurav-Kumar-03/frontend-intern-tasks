import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { HeartPulse } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MedcareX - Healthcare Dashboard",
  description: "Modern healthcare management platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <header className="border-b bg-card sticky top-0 z-10 shadow-sm">
          <div className="max-w-7xl mx-auto flex h-16 items-center px-4 md:px-6">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
              <HeartPulse className="h-6 w-6" />
              <span>MedcareX</span>
            </Link>
            <nav className="ml-auto flex items-center gap-4 sm:gap-6 text-sm font-medium">
              <Link href="/" className="hover:text-primary transition-colors">Dashboard</Link>
              <Link href="/booking" className="hover:text-primary transition-colors">Book Appointment</Link>
              <Link href="/doctor" className="hover:text-primary transition-colors">Doctor Profile</Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
