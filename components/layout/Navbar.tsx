"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();
  const router = useRouter();

  const clearHashAfterScroll = () => {
    window.setTimeout(() => {
      window.history.replaceState(null, "", window.location.pathname);
    }, 600);
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const scrollToSection = (id: string) => {
    if (pathname !== "/") {
      router.push(`/#${id}`);
      clearHashAfterScroll();
      setIsOpen(false);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      clearHashAfterScroll();
    }
    setIsOpen(false);
  };

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(""); 
      return;
    }

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
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  const navLinkStyles = (path: string, isPage = false) => {
    const isActive = isPage ? pathname === path : activeSection === path;
    return `transition-all duration-300 pb-1 cursor-pointer ${
      isActive 
      ? "border-b-2 border-foreground text-foreground" 
      : "text-foreground/60 hover:text-foreground/80 border-b-2 border-transparent"
    }`;
  };

  return (
    <nav className="w-full px-8 py-6 flex justify-between items-center max-w-[1440px] mx-auto bg-background sticky top-0 z-50">
      <Link href="/" className="cursor-pointer">
        <Image src="/images/logo.png" alt="BinPoint Logo" height={18} width={130} priority className="h-8 w-auto object-contain" />
      </Link>

      <div className="hidden md:flex gap-10 text-base font-medium font-body">
        <button onClick={() => scrollToSection("home")} className={navLinkStyles("home")}>Home</button>
        <button onClick={() => scrollToSection("about")} className={navLinkStyles("about")}>About us</button>
        <Link href="/directory" className={navLinkStyles("/directory", true)}>Directory</Link>
        <Link href="/suggest" className={navLinkStyles("/suggest", true)}>Suggest an Item</Link>
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
            className={`${navLinkStyles("home")} w-fit self-start text-left`}
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className={`${navLinkStyles("about")} w-fit self-start text-left`}
          >
            About us
          </button>
          <Link
            href="/directory"
            onClick={toggleMenu}
            className={`${navLinkStyles("/directory", true)} w-fit self-start`}
          >
            Directory
          </Link>
          <Link
            href="/suggest"
            onClick={toggleMenu}
            className={`${navLinkStyles("/suggest", true)} w-fit self-start`}
          >
            Suggest an Item
          </Link>
        </div>
      )}
    </nav>
  );
}