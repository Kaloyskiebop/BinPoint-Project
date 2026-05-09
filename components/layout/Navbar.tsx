import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full px-8 py-6 flex justify-between items-center max-w-7xl mx-auto">
      
      {/* Logo Area: A single streamlined brandmark */}
      <Link href="/" className="cursor-pointer">
        <Image 
          src="/images/BinPoint-logo.png" // The brandmark shown above
          alt="BinPoint Logo"
          width={128}              
          height={32}
          priority               
          className="object-fill"
        />
      </Link>

      {/* Navigation Links (Unchanged) */}
      <div className="hidden md:flex gap-10 text-sm font-medium text-foreground font-body">
        <Link href="/" className="border-b-2 border-foreground pb-1">
          Home
        </Link>
        <Link href="/about" className="hover:text-foreground/70 transition-colors pb-1">
          About us
        </Link>
        <Link href="/directory" className="hover:text-foreground/70 transition-colors pb-1">
          Directory
        </Link>
        <Link href="/suggest" className="hover:text-foreground/70 transition-colors pb-1">
          Suggest an Item
        </Link>
      </div>
      
    </nav>
  );
}