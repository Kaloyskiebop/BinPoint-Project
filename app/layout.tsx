import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// 1. Setup Archivo (Loading your local .otf files)
const archivo = localFont({
  src: [
    {
      path: "../fonts/Archivo/Archivo-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Archivo/Archivo-Bold.otf",
      weight: "700",
      style: "normal",
    }
  ],
  variable: "--font-archivo",
  display: "swap",
});

// 2. Setup Clash Display (Loading your local .otf files)
const clash = localFont({
  src: [
    {
      path: "../fonts/Clash-display/ClashDisplay-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Clash-display/ClashDisplay-Bold.otf",
      weight: "700",
      style: "normal",
    }
  ],
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
      <body className={`${archivo.variable} ${clash.variable} font-body bg-background text-foreground antialiased min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}