import Image from "next/image";

export default function HeroSection() {
  return (
    // 1. Container: Uses flex on mobile to ensure spacing, then switches to a 2-column grid on desktop.
    <section className="w-full max-w-[1440px] min-h-[calc(100vh-100px)] mx-auto px-6 md:px-12 py-12 lg:py-0 flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-8 xl:gap-24 items-center justify-center">
      
      {/* Left Column: Text & Search */}
      {/* Added pt-8 on mobile so it doesn't hug the navbar too tightly */}
      <div className="flex flex-col gap-6 lg:gap-8 w-full pt-8 lg:pt-0">
        
        {/* 2. Fluid Typography: 
            Mobile (5xl) -> Tablet (6xl) -> Small Desktop (7xl) -> Large Desktop (84px) 
            I also hid the <br /> on mobile so it wraps naturally without awkward cuts. */}
        <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-[84px] font-medium tracking-tighter text-foreground leading-[1.05]">
          Know Exactly <br className="hidden sm:block" /> Where It Goes.
        </h1>
        
        <p className="font-body text-base sm:text-lg xl:text-xl text-foreground/80 max-w-[500px] leading-relaxed">
          Take the guesswork out of segregation. <br className="hidden lg:block" />
          Search for any item to instantly find the correct bin <br className="hidden lg:block" />
          and help keep the campus clean.
        </p>

        {/* Search Bar */}
        <div className="relative w-full max-w-lg mt-2 lg:mt-4">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            {/* Changed: text-gray-400 is now text-foreground/40 */}
            <svg className="h-5 w-5 lg:h-6 lg:w-6 text-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="What are you throwing away?"
            // Changed: bg-white -> bg-background, borders and placeholders use foreground opacities
            className="w-full pl-12 lg:pl-14 pr-6 py-3.5 lg:py-4 rounded-xl border border-foreground/20 bg-background focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground shadow-sm transition-all font-body text-sm lg:text-lg placeholder:text-foreground/40"
          />
        </div>
      </div>

      {/* Right Column: The Diamond Cluster */}
      <div className="relative w-full aspect-square flex items-center justify-center pb-12 lg:pb-0">
        
        <div className="relative w-full h-full max-w-[320px] sm:max-w-[450px] lg:max-w-[500px] xl:max-w-[600px] max-h-[320px] sm:max-h-[450px] lg:max-h-[500px] xl:max-h-[600px]">
          
          {/* 1. Bio (Top Center - Green) */}
          {/* Added 'group' to the wrapper and made sure hover:z-50 is on everything */}
          <div className="group absolute top-[8%] left-1/2 -translate-x-1/2 w-[50%] h-auto z-10 transition-transform hover:scale-105  duration-300">
            <Image src="/images/bio.png" alt="Bio" width={500} height={500} className="object-contain drop-shadow-xl" />
            
            {/* Tooltip Label */}
            <div className="absolute top-[10%] right-[-25%] -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
              <span className="bg-background/90 backdrop-blur-sm border-2 border-bin-bio text-bin-bio font-heading font-semibold px-3 py-1 rounded-lg shadow-sm whitespace-nowrap text-xs md:text-sm lg:text-base">
                Biodegradable
              </span>
            </div>
          </div>

          {/* 2. Recyclable (Middle Left - Yellow) */}
          <div className="group absolute top-[25%] left-[-3%] w-[50%] h-auto z-20 transition-transform hover:scale-105 duration-300">
            <Image src="/images/recyclable.png" alt="Recyclable" width={500} height={500} className="object-contain drop-shadow-xl" />
            
            {/* Tooltip Label */}
            <div className="absolute top-[10%] left-[20%] -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
              <span className="bg-background/90 backdrop-blur-sm border-2 border-bin-recyclable text-bin-recyclable font-heading font-semibold px-3 py-1 rounded-lg shadow-sm whitespace-nowrap text-xs md:text-sm lg:text-base">
                Recyclable
              </span>
            </div>
          </div>

          {/* 3. E-Waste (Middle Right - Red) */}
          <div className="group absolute top-[25%] right-[-3%] w-[50%] h-auto z-30 transition-transform hover:scale-105 duration-300">
            <Image src="/images/ewaste1.png" alt="E-waste" width={500} height={500} className="object-contain drop-shadow-xl" />
            
            {/* Tooltip Label */}
            <div className="absolute top-[10%] right-[-15%] -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
              <span className="bg-background/90 backdrop-blur-sm border-2 border-bin-ewaste text-bin-ewaste font-heading font-semibold px-3 py-1 rounded-lg shadow-sm whitespace-nowrap text-xs md:text-sm lg:text-base">
                E-Waste
              </span>
            </div>
          </div>

          {/* 4. Non-Bio (Bottom Center - Black) */}
          <div className="group absolute top-[43%] left-1/2 -translate-x-1/2 w-[50%] h-auto z-40 transition-transform hover:scale-105 hover:z-50 duration-300">
            <Image src="/images/nonbio.png" alt="Non-bio" width={500} height={500} className="object-contain drop-shadow-2xl" />
            
            {/* Tooltip Label */}
            <div className="absolute top-[10%] left-[20%] -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
              <span className="bg-background/90 backdrop-blur-sm border-2 border-bin-nonbio text-bin-nonbio font-heading font-semibold px-3 py-1 rounded-lg shadow-sm whitespace-nowrap text-xs md:text-sm lg:text-base">
                Non-Biodegradable
              </span>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}