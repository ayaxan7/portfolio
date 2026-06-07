import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Syed Mohammad Ayaan | Android Developer",
  description: "Third-year Computer Science student with 1+ year of experience in Android Development. Building apps with backend integrations and solving complex problems.",
  keywords: ["Android Developer", "Kotlin", "Jetpack Compose", "Mobile Developer", "Full Stack"],
  authors: [{ name: "Syed Mohammad Ayaan" }],
  openGraph: {
    title: "Syed Mohammad Ayaan | Android Developer",
    description: "Third-year Computer Science student with 1+ year of experience in Android Development.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
