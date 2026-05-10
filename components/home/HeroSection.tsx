"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import wasteData from "@/data/wasteData.json";

// 1. UPDATED: Now grabs the 'tags' array from the new JSON structure
const allSearchableItems = wasteData.flatMap((category) => 
  category.itemsList.map((item) => {
    return {
      name: item.name,
      tags: item.tags || [], // Grab tags (or empty array if none)
      categoryId: category.id,
      categoryTitle: category.title,
      color: category.color
    };
  })
);

const colorMap: Record<string, string> = {
  "bin-recyclable": "text-bin-recyclable",
  "bin-bio": "text-bin-bio",
  "bin-ewaste": "text-bin-ewaste",
  "bin-nonbio": "text-bin-nonbio",
};

export default function HeroSection() {
  const router = useRouter();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // 2. UPDATED: Smart Search (checks both Name and Tags)
  const filteredItems = allSearchableItems.filter((item) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesName = item.name.toLowerCase().includes(searchLower);
    const matchesTag = item.tags.some((tag) => tag.toLowerCase().includes(searchLower));
    return matchesName || matchesTag;
  });

  return (
    <section id="home" className="w-full max-w-[1440px] min-h-[calc(100vh-100px)] mx-auto px-6 md:px-12 py-12 lg:py-0 flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-8 xl:gap-24 items-center justify-start lg:justify-center">
      
      {/* LEFT COLUMN */}
      {/* FIX: Added items-center & text-center for mobile/tablet. Reverts to left on lg */}
      <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6 lg:gap-8 w-full relative z-50 mt-0 lg:-mt-24">
        
        <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-[84px] font-medium tracking-tighter text-foreground leading-[1.05]">
          Know Exactly <br className="hidden sm:block" /> Where It Goes.
        </h1>
        
        {/* FIX: Added mx-auto for centering on tablet, mx-0 for desktop */}
        <p className="font-body text-base sm:text-lg xl:text-xl text-foreground/80 max-w-[500px] leading-relaxed mx-auto lg:mx-0">
          Take the guesswork out of segregation. <br className="hidden lg:block" />
          Search for any item to instantly find the correct bin <br className="hidden lg:block" />
          and help keep the campus clean.
        </p>

        {/* SEARCH BAR CONTAINER */}
        <div className="relative w-full max-w-lg mt-2 lg:mt-4">
          
          {/* SEARCH ICON */}
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-[60]">
            <svg className="h-5 w-5 lg:h-6 lg:w-6 text-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <input
            type="text"
            placeholder="What are you throwing away?"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsDropdownOpen(true);
            }}
            onFocus={() => setIsDropdownOpen(true)}
            onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
            // FIX: Added text-left so what you type isn't centered even if the container is
            className="w-full pl-12 lg:pl-14 pr-6 py-3.5 lg:py-4 rounded-xl border border-foreground/20 bg-background focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground shadow-sm transition-all font-body text-left text-sm lg:text-lg placeholder:text-foreground/40 relative z-50"
          />

          {/* SEARCH DROPDOWN */}
          {isDropdownOpen && searchTerm.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-background border border-foreground/10 shadow-2xl rounded-xl overflow-hidden z-50 text-left">
              {filteredItems.length > 0 ? (
                <ul className="py-2 max-h-[220px] overflow-y-auto">
                  {filteredItems.map((item, index) => (
                    <li 
                        key={index}
                        onMouseDown={() => router.push(`/directory/${item.categoryId}?item=${encodeURIComponent(item.name)}`)}
                        // justify-between automatically pushes the text to opposite sides!
                        className="px-6 py-3 hover:bg-foreground/5 cursor-pointer flex items-center justify-between transition-colors group"
                    >
                        {/* 1. The Trash Item Name */}
                        <span className="font-body text-foreground font-medium group-hover:text-primary transition-colors">
                        {item.name}
                        </span>
                        
                        {/* 2. The Colored Category Text (Dots removed) */}
                        <span className={`text-xs sm:text-sm font-heading font-bold uppercase tracking-wider ${colorMap[item.color]}`}>
                        {item.categoryTitle}
                        </span>
                    </li>
                    ))}
                </ul>
              ) : (
                <div className="px-6 py-8 text-center font-body text-foreground/60">
                  <p>No exact match found.</p>
                  <p className="text-sm mt-1">Try a more general term like "plastic" or "paper".</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: The Diamond Cluster */}
      {/* FIX: Combined the wrappers to eliminate the massive empty height gap on tablets */}
      <div className="relative w-full max-w-[340px] sm:max-w-[450px] lg:max-w-[500px] xl:max-w-[600px] aspect-square flex items-center justify-center mx-auto lg:mx-0 z-0 mt-8 lg:mt-0">
        <div className="relative w-full h-full">
          
          <div className="group absolute top-[8%] left-1/2 -translate-x-1/2 w-[50%] h-auto z-10 transition-transform hover:scale-105 duration-300">
            <Image src="/images/heroes/bio.png" alt="Bio" width={500} height={500} className="object-contain drop-shadow-xl" priority />
            <div className="absolute top-[10%] right-[-25%] -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
              <span className="bg-background/90 backdrop-blur-sm border-2 border-bin-bio text-bin-bio font-heading font-semibold px-3 py-1 rounded-lg shadow-sm whitespace-nowrap text-xs md:text-sm lg:text-base">
                Biodegradable
              </span>
            </div>
          </div>

          <div className="group absolute top-[25%] left-[-3%] w-[50%] h-auto z-20 transition-transform hover:scale-105 duration-300">
            <Image src="/images/heroes/recyclable.png" alt="Recyclable" width={500} height={500} className="object-contain drop-shadow-xl" priority />
            <div className="absolute top-[10%] left-[20%] -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
              <span className="bg-background/90 backdrop-blur-sm border-2 border-bin-recyclable text-bin-recyclable font-heading font-semibold px-3 py-1 rounded-lg shadow-sm whitespace-nowrap text-xs md:text-sm lg:text-base">
                Recyclable
              </span>
            </div>
          </div>

          <div className="group absolute top-[25%] right-[-3%] w-[50%] h-auto z-30 transition-transform hover:scale-105 duration-300">
            <Image src="/images/heroes/ewaste1.png" alt="E-waste" width={500} height={500} className="object-contain drop-shadow-xl" priority />
            <div className="absolute top-[10%] right-[-15%] -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
              <span className="bg-background/90 backdrop-blur-sm border-2 border-bin-ewaste text-bin-ewaste font-heading font-semibold px-3 py-1 rounded-lg shadow-sm whitespace-nowrap text-xs md:text-sm lg:text-base">
                E-Waste
              </span>
            </div>
          </div>

          <div className="group absolute top-[43%] left-1/2 -translate-x-1/2 w-[50%] h-auto z-40 transition-transform hover:scale-105 duration-300">
            <Image src="/images/heroes/nonbio.png" alt="Non-bio" width={500} height={500} className="object-contain drop-shadow-2xl" priority />
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