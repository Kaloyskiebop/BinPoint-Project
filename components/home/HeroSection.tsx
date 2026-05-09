import Image from "next/image";

export default function HeroSection() {
  return (
    // 1. Removed 'overflow-hidden' to fix clipping.
    // 2. Removed 'py-32'. 
    // 3. Set strict height to calc(100vh - 100px) assuming your navbar is roughly 100px tall.
    // 4. 'items-center' will now perfectly center everything vertically in this exact space.
    <section className="w-full max-w-[1440px] h-[calc(100vh-100px)] mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
      
      {/* Left Column: Text & Search */}
      <div className="flex flex-col gap-6 lg:gap-8 xl:pr-12">
        
        <h1 className="font-heading text-6xl md:text-[72px] lg:text-[84px] font-medium tracking-tighter text-foreground leading-[1.05]">
          Know Exactly <br /> Where It Goes.
        </h1>
        
        <p className="font-body text-base md:text-lg lg:text-xl text-foreground/80 max-w-[500px] leading-relaxed">
          Take the guesswork out of segregation. <br className="hidden md:block" />
          Search for any item to instantly find the correct bin <br className="hidden md:block" />
          and help keep the campus clean.
        </p>

        {/* Search Bar */}
        <div className="relative w-full max-w-lg mt-4">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="What are you throwing away?"
            className="w-full pl-14 pr-6 py-4 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground shadow-sm transition-all font-body text-base lg:text-lg placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Right Column: The Diamond Cluster */}
      {/* I slightly reduced the xl scale from 125 to 115 so it breathes nicely on the edge without touching the monitor bezel */}
      <div className="relative w-full aspect-square flex items-center justify-center lg:scale-110 xl:scale-115">
        
        <div className="relative w-full h-full max-w-[600px] max-h-[600px]">
          
          {/* 1. Bio (Top Center - Green) */}
          <div className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[50%] h-auto z-10 transition-transform hover:scale-105 duration-300">
            <Image src="/images/bio.png" alt="Bio" width={500} height={500} className="object-contain drop-shadow-xl" />
          </div>

          {/* 2. Recyclable (Middle Left - Yellow) */}
          <div className="absolute top-[25%] left-[-3%] w-[50%] h-auto z-20 transition-transform hover:scale-105 duration-300">
            <Image src="/images/recyclable.png" alt="Recyclable" width={500} height={500} className="object-contain drop-shadow-xl" />
          </div>

          {/* 3. E-Waste (Middle Right - Red) */}
          <div className="absolute top-[25%] right-[-3%] w-[50%] h-auto z-30 transition-transform hover:scale-105 duration-300">
            <Image src="/images/ewaste1.png" alt="E-waste" width={500} height={500} className="object-contain drop-shadow-xl" />
          </div>

          {/* 4. Non-Bio (Bottom Center - Black) */}
          <div className="absolute top-[43%] left-1/2 -translate-x-1/2 w-[50%] h-auto z-40 transition-transform hover:scale-105 hover:z-50 duration-300">
            <Image src="/images/nonbio.png" alt="Non-bio" width={500} height={500} className="object-contain drop-shadow-2xl" />
          </div>

        </div>
      </div>

    </section>
  );
}