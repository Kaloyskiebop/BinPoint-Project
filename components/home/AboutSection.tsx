export default function AboutSection() {
  return (
    <section id="about" className="w-full flex flex-col pt-10 md:pt-14 bg-background scroll-mt-28">
      
      {/* Top Text Area */}
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 text-center pb-8">
        <h2 className="font-heading text-5xl md:text-[64px] font-semibold text-foreground mb-4">
          About BinPoint
        </h2>
        <h3 className="font-body text-xl md:text-2xl font-medium text-foreground mb-6">
          Smarter waste segregation for a cleaner environment.
        </h3>
        <p className="font-body text-sm md:text-base text-foreground/80 max-w-[650px] mx-auto leading-relaxed">
          Proper waste disposal shouldn't be a guessing game. BinPoint was built to bridge the gap 
          between intention and action, providing students with a frictionless way to identify exactly 
          where their everyday items belong before they throw them away.
        </p>
      </div>

      {/* Gray Background Area */}
      {/* APPLIED FIGMA INNER SHADOW HERE */}
      <div className="w-full bg-[#B3B3B3] py-16 md:py-18 mt-4 md:mt-8 relative shadow-[inset_0_4px_28.6px_12px_rgba(0,0,0,0.37)]">
        
        {/* Cards Container */}
        <div className="max-w-[1100px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 relative z-10">
          
          {/* Card 1 */}
          {/* APPLIED FIGMA DROP SHADOW HERE */}
          <div className="bg-background rounded-xl shadow-[4px_4px_14.8px_4px_rgba(0,0,0,0.45)] hover:shadow-[8px_12px_24px_4px_rgba(0,0,0,0.35)] px-8 py-12 md:py-16 text-center flex flex-col items-center gap-4 transition-all duration-300 hover:-translate-y-2">
            <h4 className="font-heading text-xl md:text-[22px] font-semibold text-foreground flex items-center justify-center gap-2">
              Instant Search ⚡
            </h4>
            <p className="font-body text-sm text-foreground/70 leading-relaxed px-2">
              Don't stand at the bins wondering. Use our lightning-fast directory to 
              find the right category for any item in milliseconds.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-background rounded-xl shadow-[4px_4px_14.8px_4px_rgba(0,0,0,0.45)] hover:shadow-[8px_12px_24px_4px_rgba(0,0,0,0.35)] px-8 py-12 md:py-16 text-center flex flex-col items-center gap-4 transition-all duration-300 hover:-translate-y-2">
            <h4 className="font-heading text-xl md:text-[22px] font-semibold text-foreground flex items-center justify-center gap-2">
              Visual Recognition 🔍
            </h4>
            <p className="font-body text-sm text-foreground/70 leading-relaxed px-2">
              Designed with usability in mind. We use clear, highly recognizable 
              visual cues so you learn proper segregation habits naturally.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-background rounded-xl shadow-[4px_4px_14.8px_4px_rgba(0,0,0,0.45)] hover:shadow-[8px_12px_24px_4px_rgba(0,0,0,0.35)] px-8 py-12 md:py-16 text-center flex flex-col items-center gap-4 transition-all duration-300 hover:-translate-y-2">
            <h4 className="font-heading text-xl md:text-[22px] font-semibold text-foreground flex items-center justify-center gap-2">
              Lasting Impact 🎯
            </h4>
            <p className="font-body text-sm text-foreground/70 leading-relaxed px-2">
              Small, accurate actions scale up. By eliminating bin contamination, 
              we help create a more sustainable and eco-friendly campus environment.
            </p>
          </div>

        </div>
      </div>
      
    </section>
  );
}