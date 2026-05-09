import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-background pt-16 pb-10 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto flex flex-col">
        
        {/* The horizontal divider line - using your foreground color with low opacity */}
        <div className="w-full h-px bg-foreground/10 mb-8"></div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 font-body text-sm text-foreground/60">
          
          {/* Left: Logo */}
          <div className="flex items-center">
            <Image 
              src="/images/logo.png" 
              alt="BinPoint Logo"
              width={110} 
              height={20}
              className="h-6 w-auto object-contain grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all" 
            />
          </div>

          {/* Center: Team Name / Copyright */}
          <div className="text-center font-medium">
            BackBenchers © 2026. All rights reserved.
          </div>

          {/* Right: Privacy Link */}
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-foreground transition-colors font-medium">
              Privacy Policy
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
}