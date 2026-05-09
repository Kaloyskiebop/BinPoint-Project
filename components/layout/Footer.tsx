import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-background pt-16 pb-10 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto flex flex-col">
        
        {/* The horizontal divider line */}
        <div className="w-full h-px bg-foreground/20 mb-8"></div>

        {/* Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 font-body text-sm text-foreground/80">
          
          {/* Left: Logo */}
          <div className="flex items-center">
            <Image 
              src="/images/logo.png" 
              alt="BinPoint Logo"
              width={130} 
              height={24}
              className="h-7 w-auto object-contain" 
            />
          </div>

          {/* Center: Copyright */}
          <div className="text-center font-medium">
            BackBenchers © 2026. All rights reserved.
          </div>

          {/* Right: Links */}
          <div className="flex items-center">
            <Link href="/privacy" className="hover:text-foreground transition-colors font-medium">
              Privacy Policy
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
}