import heroBg from "@/assets/hero-bg.png";
const HeroSection = () => {
  return <section className="relative min-h-screen flex items-center justify-center">
      {/* Hero Background Image */}
      <div className="absolute inset-0">
        <img alt="GoMicro AI Quality Control System" className="w-full h-full object-cover object-center" loading="eager" fetchPriority="high" decoding="async" src="/lovable-uploads/b25b92a4-e494-4fb9-a4ae-63069e23460e.png" />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-background/35 text-primary-foreground" />
      </div>
      
      {/* Text Content - Centered on Image */}
      <div className="relative z-10 px-4 sm:px-6 text-center animate-fade-in-up flex-col lg:px-[40px] flex items-center justify-center my-[2px]">
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-foreground leading-tight mb-2">
          <span className="drop-shadow-[0_0_25px_hsl(var(--primary)/0.6)] [text-shadow:_-1px_-1px_0_rgba(255,255,255,0.3),_1px_-1px_0_rgba(255,255,255,0.3),_-1px_1px_0_rgba(255,255,255,0.3),_1px_1px_0_rgba(255,255,255,0.3)] text-white">AI in a Box</span>
        </h1>
        
        <h2 className="text-sm sm:text-lg md:text-xl text-foreground/90 font-medium lg:text-2xl">
          QC Grains, Nuts and Vegetables
        </h2>
        
        <div className="flex-1" />
        
      </div>
      
      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>;
};
export default HeroSection;