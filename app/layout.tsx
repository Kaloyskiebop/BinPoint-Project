import type { Metadata } from "next";
import localFont from "next/font/local";
import { Archivo } from "next/font/google";
import "./globals.css";

const archivo = Archivo({ 
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const clash = localFont({
  src: "../fonts/Clash-display/ClashDisplay-Variable.ttf",
  variable: "--font-clash",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BinPoint | Smart Waste Segregation",
  description: "Take the guesswork out of campus waste segregation.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Look here! The variables are now on the HTML tag.
    <html lang="en" className={`${archivo.variable} ${clash.variable} h-full`}>
      {/* And the body tag is clean! */}
      <body className="font-body bg-background text-foreground antialiased min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}