import type { Metadata } from "next";
import localFont from "next/font/local";
import { Archivo } from "next/font/google";
import "./globals.css";

// 1. Fetch Archivo directly from Google (100% reliable)
const archivo = Archivo({ 
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

// 2. Load your Variable TTF file
const clash = localFont({
  src: "../fonts/Clash-display/ClashDisplay-Variable.ttf",
  variable: "--font-clash",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BinPoint | Smart Waste Segregation",
  description: "Take the guesswork out of campus waste segregation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      {/* We inject both font variables into the body tag here */}
      <body className={`${archivo.variable} ${clash.variable} font-body bg-background text-foreground antialiased min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}