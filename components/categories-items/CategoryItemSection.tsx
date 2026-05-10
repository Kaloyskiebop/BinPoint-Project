"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion"; // <-- NEW IMPORT

// 1. Updated Interface to support the new item details
interface TrashItem {
  name: string;
  image: string;
  description?: string;
  prepNotes?: string[];
}

interface CategoryData {
  id: string;
  title: string;
  color: string;
  categoryTitle: string;
  description: string;
  note: string;
  image: string;       
  heroImage?: string;  
  itemsList: TrashItem[];
}

const tagColors: Record<string, string> = {
  "bin-bio": "text-[#10B981]", 
  "bin-nonbio": "text-[#1E293B]", 
  "bin-recyclable": "text-[#F5A623]", 
  "bin-ewaste": "text-[#EF4444]", 
};

export default function CategoryItemSection({ categoryData }: { categoryData: CategoryData }) {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Tracks which item card the user clicked on
  const [selectedItem, setSelectedItem] = useState<TrashItem | null>(null);

  const filteredItems = categoryData.itemsList.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="w-full max-w-[1440px] mx-auto px-6 py-8 md:py-12 min-h-[calc(100vh-100px)] relative">
      
      <Link 
        href="/directory" 
        className="inline-flex items-center gap-2 font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 hover:opacity-80 transition-opacity"
      >
        <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Categories
      </Link>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
        
        {/* LEFT COLUMN: The Dynamic Context/Details Card (Sticky on Desktop) */}
        {/* Hidden on mobile when an item is selected, so it doesn't distract from the drawer */}
        <div className={`w-full lg:w-[400px] xl:w-[450px] shrink-0 bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] overflow-hidden relative transition-all duration-300 lg:sticky lg:top-8 ${selectedItem ? "hidden lg:block" : "block"}`}>
          
          {/* Close Button (Desktop Only) */}
          {selectedItem && (
            <button 
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-20 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-gray-100 transition-colors shadow-sm hidden lg:block"
              aria-label="Close item details"
            >
              <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          {/* Dynamic Image Box */}
          <div className="w-full h-48 md:h-64 bg-gray-100 relative overflow-hidden">
            {selectedItem ? (
              selectedItem.image ? (
                <div className="absolute inset-0">
                  <Image 
                    src={selectedItem.image} 
                    alt={selectedItem.name} 
                    fill 
                    className="object-cover mix-blend-multiply" 
                    priority 
                  />
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-body text-sm bg-gray-50">
                    [Item Image Placeholder]
                </div>
              )
            ) : (
              categoryData.heroImage ? (
                <Image src={categoryData.heroImage} alt={`${categoryData.title} hero`} fill className="object-cover" priority />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-body text-sm bg-gray-200">
                    [Hero Image Placeholder]
                </div>
              )
            )}
          </div>

          {/* Dynamic Text Info */}
          <div className="p-8">
            <h1 className="font-heading text-4xl font-bold text-foreground mb-1">
              {selectedItem ? selectedItem.name : categoryData.title}
            </h1>
            <p className={`font-heading text-lg font-bold mb-6 ${tagColors[categoryData.color] || "text-foreground"}`}>
              {categoryData.categoryTitle || "Category"}
            </p>
            
            <p className="font-body text-sm md:text-base text-foreground/80 leading-relaxed mb-6">
              {selectedItem 
                ? (selectedItem.description || "No specific details available for this item.") 
                : categoryData.description}
            </p>

            {selectedItem ? (
              selectedItem.prepNotes && selectedItem.prepNotes.length > 0 && (
                <div className="font-body text-xs md:text-sm text-foreground/80 leading-relaxed">
                  <p className="italic mb-2 text-foreground/60">How to prep:</p>
                  <ul className="flex flex-col gap-2">
                    {selectedItem.prepNotes.map((note, idx) => {
                      const splitNote = note.split(":");
                      return (
                        <li key={idx} className="flex items-start">
                          <span className="mr-2 mt-[2px]">•</span>
                          <span>
                            {splitNote.length > 1 ? (
                              <><strong>{splitNote[0]}:</strong>{splitNote.slice(1).join(":")}</>
                            ) : (
                              note
                            )}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )
            ) : (
              <p className="font-body text-xs md:text-sm italic text-foreground/60 leading-relaxed">
                {categoryData.note}
              </p>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Search & Item Grid */}
        <div className="flex-1 w-full flex flex-col gap-6">
          
          <div className="relative w-full shadow-[0_4px_20px_rgb(0,0,0,0.05)] rounded-xl">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-4 rounded-xl border border-transparent focus:outline-none focus:ring-2 focus:ring-[#4A85F6]/50 focus:border-[#4A85F6] font-body text-base bg-white transition-all"
            />
          </div>

          {filteredItems.length > 0 ? (
            // MOBILE SCROLL FIX: Added max-h-[60vh] and overflow-y-auto, while hiding the scrollbar visually for a cleaner look
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 max-h-[60vh] overflow-y-auto lg:max-h-none lg:overflow-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {filteredItems.map((item, index) => {
                const isActive = selectedItem?.name === item.name;

                return (
                  <div 
                    key={index}
                    onClick={() => setSelectedItem(item)}
                    className={`relative rounded-2xl p-4 transition-all duration-300 flex flex-col items-center gap-4 cursor-pointer group ${
                      isActive 
                        ? "bg-[#f0f5ff] border-2 border-[#4A85F6] shadow-[0_8px_20px_rgba(74,133,246,0.15)] -translate-y-1 lg:ring-4 lg:ring-[#4A85F6]/10" 
                        : "bg-white border-2 border-transparent shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:-translate-y-1 hover:shadow-[0_12px_25px_rgba(0,0,0,0.06)] hover:border-foreground/10"
                    }`}
                  >
                    <div className="w-full aspect-square rounded-xl flex items-center justify-center overflow-hidden relative">
                      {item.image ? (
                        <Image 
                          src={item.image} 
                          alt={item.name} 
                          fill 
                          className="object-contain p-2 md:p-4 mix-blend-multiply group-hover:scale-110 transition-transform duration-500 ease-out" 
                        />
                      ) : (
                        <span className="text-xs text-foreground/40">No Img</span>
                      )}
                    </div>

                    <p className={`font-body text-sm font-medium text-center line-clamp-2 transition-colors ${
                      isActive ? "text-[#4A85F6]" : "text-foreground group-hover:text-[#4A85F6]"
                    }`}>
                      {item.name}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="w-full py-16 flex flex-col items-center justify-center bg-white rounded-3xl border border-dashed border-foreground/20 text-center px-4">
                <p className="font-heading text-xl font-bold text-foreground mb-2">Item not found</p>
                <p className="font-body text-foreground/60 mb-6 text-sm">We couldn't find "{searchQuery}" in this category.</p>
                <Link 
                    href="/suggest" 
                    className="bg-foreground/5 hover:bg-foreground/10 text-foreground font-body font-medium py-2 px-6 rounded-lg transition-colors"
                >
                    Suggest an Item
                </Link>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE BOTTOM DRAWER (Framer Motion) */}
      <AnimatePresence>
        {selectedItem && (
          <>
            {/* Dark Overlay Background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            />
            
            {/* The Sliding Drawer */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              drag="y"
              
              // 1. UPDATED: Resist dragging UP, but allow free dragging DOWN
              dragConstraints={{ top: 0, bottom: 0 }} 
              dragElastic={{ top: 0.1, bottom: 1 }} 
              
              onDragEnd={(e, info) => {
                // 2. UPDATED: Close if dragged down 100px OR if flicked down quickly (> 500 velocity)
                if (info.offset.y > 100 || info.velocity.y > 500) {
                  setSelectedItem(null);
                }
              }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-[32px] shadow-[0_-8px_30px_rgb(0,0,0,0.12)] h-[80vh] flex flex-col lg:hidden"
            >
              {/* Drag Handle Bar */}
              <div className="w-full flex justify-center pt-4 pb-2 shrink-0">
                <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
              </div>

              {/* Scrollable Content Inside Drawer */}
              <div className="overflow-y-auto px-6 pb-12">
                <div className="w-full h-48 relative mb-6">
                  {selectedItem.image ? (
                    <Image src={selectedItem.image} alt={selectedItem.name} fill className="object-cover mix-blend-multiply" priority />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-2xl text-gray-400 text-sm">No Image</div>
                  )}
                </div>

                <h2 className="font-heading text-3xl font-bold text-foreground mb-1">
                  {selectedItem.name}
                </h2>
                <p className={`font-heading text-base font-bold mb-6 ${tagColors[categoryData.color] || "text-foreground"}`}>
                  {categoryData.categoryTitle}
                </p>

                <p className="font-body text-sm text-foreground/80 leading-relaxed mb-6">
                  {selectedItem.description || "No specific details available for this item."}
                </p>

                {selectedItem.prepNotes && selectedItem.prepNotes.length > 0 && (
                  <div className="font-body text-sm text-foreground/80 leading-relaxed bg-gray-50 p-4 rounded-2xl">
                    <p className="italic mb-3 font-medium">How to prep:</p>
                    <ul className="flex flex-col gap-3">
                      {selectedItem.prepNotes.map((note, idx) => {
                        const splitNote = note.split(":");
                        return (
                          <li key={idx} className="flex items-start">
                            <span className="mr-2 mt-[2px] text-foreground/40">•</span>
                            <span>
                              {splitNote.length > 1 ? (
                                <><strong>{splitNote[0]}:</strong>{splitNote.slice(1).join(":")}</>
                              ) : (
                                note
                              )}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </section>
  );
}