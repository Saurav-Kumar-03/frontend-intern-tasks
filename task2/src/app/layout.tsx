import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextGen SaaS | Transform Your Workflow",
  description: "A modern, animated SaaS landing page showcasing powerful features and seamless integrations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased dark scroll-smooth`}>
      <body className="bg-background text-foreground font-sans min-h-screen selection:bg-primary selection:text-white">
        {children}
      </body>
    </html>
  );
}
