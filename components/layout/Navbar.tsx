"use client"; 

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    // Changed: 'bg-white' is now 'bg-background'
    <nav className="w-full px-8 py-6 flex justify-between items-center max-w-[1440px] mx-auto bg-background sticky top-0 z-50">
      
      <Link href="/" className="cursor-pointer">
        <Image 
            src="/images/logo.png" 
            alt="BinPoint Logo"
            height={18} 
            width={130} 
            priority               
            className="h-8 w-auto object-contain" 
        />
      </Link>

      <div className="hidden md:flex gap-10 text-base font-medium text-foreground font-body">
        <Link href="/" className="border-b-2 border-foreground pb-1">Home</Link>
        <Link href="/about" className="hover:text-foreground/70 transition-colors pb-1">About us</Link>
        <Link href="/directory" className="hover:text-foreground/70 transition-colors pb-1">Directory</Link>
        <Link href="/suggest" className="hover:text-foreground/70 transition-colors pb-1">Suggest an Item</Link>
      </div>

      <button 
        onClick={toggleMenu}
        className="md:hidden p-2 text-foreground focus:outline-none"
        aria-label="Toggle Menu"
      >
        {isOpen ? (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {isOpen && (
        // Changed: 'bg-white' -> 'bg-background', and border colors use foreground opacity
        <div className="absolute top-[80px] left-0 w-full bg-background border-b border-foreground/10 shadow-lg py-4 px-8 flex flex-col gap-4 font-body text-base font-medium text-foreground md:hidden">
          <Link href="/" onClick={toggleMenu} className="border-b-2 border-foreground w-max pb-1">Home</Link>
          <Link href="/about" onClick={toggleMenu} className="hover:text-foreground/70 pb-1">About us</Link>
          <Link href="/directory" onClick={toggleMenu} className="hover:text-foreground/70 pb-1">Directory</Link>
          <Link href="/suggest" onClick={toggleMenu} className="hover:text-foreground/70 pb-1">Suggest an Item</Link>
        </div>
      )}
      
    </nav>
  );
}