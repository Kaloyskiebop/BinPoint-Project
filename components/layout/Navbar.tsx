"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const toggleMenu = () => setIsOpen(!isOpen);

  // 1. Smooth Scroll Handler that doesn't touch the URL
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Calculate offset for sticky navbar (approx 90-100px)
      const offset = 100; 
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px", 
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
          // Notice: We removed the window.history.replaceState line 
          // to keep the URL static on scroll.
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const navLinkStyles = (id: string) => 
    `transition-all duration-300 pb-1 cursor-pointer ${
      activeSection === id 
      ? "border-b-2 border-foreground text-foreground" 
      : "text-foreground/60 hover:text-foreground/80 border-b-2 border-transparent"
    }`;

  return (
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

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-10 text-base font-medium font-body">
        {/* Changed to buttons to prevent URL hash updates */}
        <button onClick={() => scrollToSection("home")} className={navLinkStyles("home")}>
          Home
        </button>
        <button onClick={() => scrollToSection("about")} className={navLinkStyles("about")}>
          About us
        </button>
        
        <Link href="/directory" className="text-foreground/60 hover:text-foreground/80 transition-colors pb-1 border-b-2 border-transparent">
          Directory
        </Link>
        <Link href="/suggest" className="text-foreground/60 hover:text-foreground/80 transition-colors pb-1 border-b-2 border-transparent">
          Suggest an Item
        </Link>
      </div>

      {/* Mobile Hamburger */}
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

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-[80px] left-0 w-full bg-background border-b border-foreground/10 shadow-lg py-4 px-8 flex flex-col gap-4 font-body text-base font-medium text-foreground md:hidden">
          <button 
            onClick={() => scrollToSection("home")} 
            className={`text-left w-max ${activeSection === "home" ? "border-b-2 border-foreground" : ""}`}
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection("about")} 
            className={`text-left w-max ${activeSection === "about" ? "border-b-2 border-foreground" : ""}`}
          >
            About us
          </button>
          <Link href="/directory" onClick={toggleMenu} className="hover:text-foreground/70 pb-1">Directory</Link>
          <Link href="/suggest" onClick={toggleMenu} className="hover:text-foreground/70 pb-1">Suggest an Item</Link>
        </div>
      )}
    </nav>
  );
}