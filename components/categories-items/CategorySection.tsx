"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import wasteData from "@/data/wasteData.json";

const colorMap: Record<string, string> = {
  "bin-recyclable": "bg-bin-recyclable",
  "bin-bio": "bg-bin-bio",
  "bin-ewaste": "bg-bin-ewaste",
  "bin-nonbio": "bg-bin-nonbio",
};

// 2. The Liquid Flood Animation
const cardBackgroundVariants: Variants = {
  closed: {
    clipPath: "circle(0px at 35% 124px)", 
    opacity: 0,
    transition: {
      clipPath: { type: "spring", stiffness: 400, damping: 40 },
      opacity: { duration: 0.2 } 
    },
  },
  open: {
    clipPath: "circle(700px at 35% 124px)",
    opacity: 1,
    transition: {
      clipPath: { type: "spring", stiffness: 25, restDelta: 1 },
      opacity: { duration: 0.01 } 
    },
  },
};

export default function CategorySection() {
  return (
    <section id="directory" className="w-full bg-background min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 pt-8 pb-24">
        
        <h2 className="font-heading text-5xl md:text-6xl font-semibold text-foreground mb-24 text-left">
          Waste Categories
        </h2>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-32">
          {wasteData.map((cat) => (
            <motion.div 
              key={cat.id}
              initial="closed"
              whileHover="open"
              className="relative w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] max-w-[260px] group cursor-pointer"
            >
              {/* TRASH ASSET */}
              <div className={`absolute left-1/2 -translate-x-1/2 w-full z-20 pointer-events-none transition-transform duration-500 group-hover:scale-110 ${cat.containerTop} ${cat.containerHeight}`}>
                <div 
                  className="relative w-full h-full" 
                  style={{ transform: `scale(${cat.imgScale}) translateY(${cat.imgY}px)` }}
                >
                  <Image src={cat.image} alt={cat.title} fill className="object-contain" priority />
                </div>
              </div>

              {/* CARD BASE */}
              <div className="relative bg-background rounded-[32px] pt-28 pb-10 px-8 shadow-[4px_4px_14.8px_4px_rgba(0,0,0,0.45)] h-full overflow-hidden">
                
                {/* THE LIQUID FLOOD LAYER (Safely using the colorMap) */}
                <motion.div 
                  variants={cardBackgroundVariants}
                  className={`absolute inset-0 ${colorMap[cat.color]} z-0`}
                />

                {/* CONTENT LAYER */}
                <div className="relative z-10 flex flex-col items-center h-full">
                  
                  {/* HEADER ROW: Centered flexbox */}
                  <div className="flex items-center justify-center gap-0 transition-all duration-500 ease-in-out group-hover:text-white">
                    
                    {/* INDICATOR DOT: Safely using the colorMap */}
                    <motion.div 
                      className={`rounded-full ${colorMap[cat.color]}`}
                      variants={{ 
                        open: { 
                          opacity: 0, 
                          width: 0, 
                          height: 16, 
                          marginRight: 0 
                        }, 
                        closed: { 
                          opacity: 1, 
                          width: 16, 
                          height: 16, 
                          marginRight: 12 
                        } 
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    <h4 className="font-bold text-2xl font-bold whitespace-nowrap">
                      {cat.title}
                    </h4>
                  </div>

                  {/* DESCRIPTION */}
                  <p className="mt-4 font-body text-sm text-foreground/70 text-center leading-relaxed transition-all duration-500 group-hover:text-white">
                    {cat.items}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}