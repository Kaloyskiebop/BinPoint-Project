"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

const categoryColors: Record<string, string> = {
  "Biodegradable": "bg-[#10B981] text-white border-[#10B981]",
  "Non-Biodegradable": "bg-[#1E293B] text-white border-[#1E293B]",
  "Recyclable": "bg-[#F5A623] text-zinc-900 border-[#F5A623]", 
  "E-Waste": "bg-[#EF4444] text-white border-[#EF4444]",
};

// --- RATE LIMIT SETTINGS ---
const MAX_SUGGESTIONS_PER_HOUR = 3;
const TIME_WINDOW_MS = 60 * 60 * 1000; // 1 hour in milliseconds

export default function SuggestionSection() {
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const categories = [
    "Biodegradable",
    "Non-Biodegradable",
    "Recyclable",
    "E-Waste",
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    
    if (selectedFile) {
      if (selectedFile.size > 10485760) {
        setStatusMsg("File is too large. Please select an image under 10MB.");
        setFile(null); 
        return;
      }
      
      setFile(selectedFile);
      setStatusMsg(""); 
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!itemName || !category) {
      setStatusMsg("Please provide an item name and select a category.");
      return;
    }

    // --- 1. RATE LIMIT CHECK ---
    const now = Date.now();
    const storedData = localStorage.getItem("bp_suggestion_timestamps");
    let timestamps: number[] = storedData ? JSON.parse(storedData) : [];

    // Filter out timestamps that are older than 1 hour
    timestamps = timestamps.filter((t) => now - t < TIME_WINDOW_MS);

    // If they have 3 or more recent timestamps, block the submission!
    if (timestamps.length >= MAX_SUGGESTIONS_PER_HOUR) {
      setStatusMsg("You've reached the limit of 3 suggestions per hour. Please try again later!");
      return;
    }

    setIsSubmitting(true);
    setStatusMsg("Uploading suggestion...");
    let imageUrl = null;

    try {
      if (file) {
        const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
        const fileName = `item-${Date.now()}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from("suggestion_images") 
            .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
            });

        if (uploadError) {
            console.error("Storage Error Details:", uploadError); 
            throw uploadError;
        }

        const { data: publicUrlData } = supabase.storage
          .from("suggestion_images")
          .getPublicUrl(fileName);
          
        imageUrl = publicUrlData.publicUrl;
      }

      const { error: dbError } = await supabase
        .from("suggestions") 
        .insert([
          {
            item_name: itemName,
            category: category,
            image_url: imageUrl,
          },
        ]);

      if (dbError) throw dbError;

      // --- 2. UPDATE RATE LIMIT HISTORY ON SUCCESS ---
      timestamps.push(now);
      localStorage.setItem("bp_suggestion_timestamps", JSON.stringify(timestamps));

      setStatusMsg("Suggestion sent successfully! Thank you.");
      setItemName("");
      setCategory("");
      setFile(null);
      
    } catch (error: any) {
      console.error(error);
      setStatusMsg("Error sending suggestion. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-100px)] bg-background pt-4 pb-12 px-6 flex flex-col items-center">
      
      {/* Header Section */}
      <div className="text-center max-w-2xl mb-4 mt-4">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
          Help Us Grow!
        </h1>
        <p className="font-body text-foreground/70 text-base md:text-lg">
          Found something that isn't in our directory? Let us know so we can add it to the list and help others sort it correctly.
        </p>
      </div>

      {/* Form Card */}
      <div className="w-full max-w-md bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
        <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
          Item Details
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          
          {/* Input: Item Name */}
          <div className="flex flex-col gap-2">
            <label className="font-body text-sm text-foreground/80">
              What is the item?
            </label>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-[#4A85F6]/50 focus:border-[#4A85F6] font-body transition-all"
              placeholder="e.g. Broken umbrella"
            />
          </div>

          {/* Input: Category Grid */}
          <div className="flex flex-col gap-2">
            <label className="font-body text-sm text-foreground/80">
              Where do you think it belongs?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`py-3 px-2 rounded-xl border font-body text-sm font-medium transition-all ${
                    category === cat
                      ? categoryColors[cat]
                      : "border-foreground/20 text-foreground/70 hover:border-foreground/40 hover:bg-foreground/5"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Input: File Upload */}
          <div className="flex flex-col gap-2">
            <label className="font-body text-sm text-foreground/80">
              Add a photo (Optional)
            </label>
            
            {file ? (
              <div className="flex items-center justify-between w-full p-4 rounded-xl border border-foreground/20 bg-foreground/5 transition-all">
                <p className="text-sm text-[#4A85F6] font-medium font-body truncate max-w-[80%]">
                  {file.name}
                </p>
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="text-foreground/40 hover:text-red-500 transition-colors p-1"
                  aria-label="Remove selected image"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-24 rounded-xl border-2 border-dashed border-foreground/20 hover:border-foreground/40 hover:bg-foreground/5 cursor-pointer transition-all">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 text-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <input 
                  type="file" 
                  accept="image/*"
                  className="hidden" 
                  onChange={handleFileChange}
                />
              </label>
            )}
            
            <span className="text-xs text-foreground/50 text-right mt-1">Max size: 10MB</span>
          </div>

          {/* Status Message */}
          {statusMsg && (
            <p className={`text-sm text-center font-body font-medium ${
              statusMsg.includes("successfully") ? "text-green-600" : 
              statusMsg.includes("limit") || statusMsg.includes("large") ? "text-red-500" : "text-foreground/70"
            }`}>
              {statusMsg}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#4A85F6] hover:bg-[#3a73e0] text-white font-body font-medium py-4 rounded-xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {isSubmitting ? "Sending..." : "Send Suggestion"}
          </button>
        </form>
      </div>
    </section>
  );
}