import localFont from "next/font/local";

// Load the TTF file directly into this component
// Path: Go up two folders (../../) to get out of components/home, then into fonts/
const clash = localFont({
  src: "../../fonts/Clash-display/ClashDisplay-Variable.ttf",
  display: "swap",
});

export default function HeroSection() {
  return (
    <section className="w-full max-w-7xl mx-auto px-8 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      
      <div className="flex flex-col gap-6">
        
        {/* Look how clean this is! Just 'font-heading' */}
        <h1 className="font-heading text-6xl md:text-[72px] font-medium tracking-tighter text-foreground leading-[1.05]">
          Know Exactly <br /> Where It Goes.
        </h1>
        
        {/* And 'font-body' here! */}
        <p className="font-body text-base md:text-lg text-foreground/80 max-w-[420px] leading-relaxed">
          Take the guesswork out of segregation. <br className="hidden md:block" />
          Search for any item to instantly find the correct bin <br className="hidden md:block" />
          and help keep the campus clean.
        </p>

        <div className="relative w-full max-w-md mt-2">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="What are you throwing away?"
            className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground shadow-sm transition-all font-body text-sm placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="w-full aspect-[4/3] flex items-center justify-center">
         {/* The image will go right here! */}
      </div>

    </section>
  );
}