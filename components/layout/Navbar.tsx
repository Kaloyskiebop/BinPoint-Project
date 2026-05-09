import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full px-8 py-6 flex justify-between items-center max-w-7xl mx-auto">
      {/* Logo Placeholder */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold">
          {/* Replace with your actual SVG logo later */}
          B
        </div>
        <span className="text-2xl font-bold tracking-tight">BinPoint</span>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-8 text-sm font-medium text-gray-700">
        <Link href="/" className="border-b-2 border-black pb-1 text-black">Home</Link>
        <Link href="/about" className="hover:text-black transition-colors">About us</Link>
        <Link href="/directory" className="hover:text-black transition-colors">Directory</Link>
        <Link href="/suggest" className="hover:text-black transition-colors">Suggest an Item</Link>
      </div>
    </nav>
  );
}