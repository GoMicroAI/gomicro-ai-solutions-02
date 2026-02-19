import { Wheat, Apple } from "lucide-react";
import AlmondIcon from "@/components/icons/AlmondIcon";
import heroProduct from "@/assets/hero-product.png";

const categoryButtons = [
  { id: "grains", label: "Grains", icon: Wheat },
  { id: "nuts", label: "Nuts", icon: AlmondIcon },
  { id: "fruits-veg", label: "Vegetables", icon: Apple },
];

const HeroSection = () => {
  return <section className="relative min-h-screen flex items-center justify-center pt-16 lg:pt-20">
      {/* Hero Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroProduct}
          alt="GoMicro AI in a Box device in warehouse setting"
          className="absolute inset-0 w-full h-full object-cover object-[center_65%]"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-background/35 text-primary-foreground" />
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-[40px] flex flex-col items-center lg:items-start justify-end pb-36 text-center lg:text-left h-full min-h-screen">
        {/* Text Content */}
        <div className="animate-fade-in-up flex flex-col items-center lg:items-start">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-foreground leading-tight mb-4">
            <span className="drop-shadow-[0_0_25px_hsl(var(--primary)/0.6)] [text-shadow:_-1px_-1px_0_rgba(255,255,255,0.3),_1px_-1px_0_rgba(255,255,255,0.3),_-1px_1px_0_rgba(255,255,255,0.3),_1px_1px_0_rgba(255,255,255,0.3)] text-white">Quality Intelligence</span>
          </h1>
          
          {/* Category Buttons */}
          <div className="flex flex-wrap gap-3 sm:gap-4 mt-2 items-center justify-center lg:justify-start">
            {categoryButtons.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-primary/60 bg-primary/20 backdrop-blur-md hover:bg-primary/30 transition-colors"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md border border-primary/70 bg-black flex items-center justify-center">
                  <cat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <span className="text-white font-medium text-base sm:text-lg">{cat.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
      
      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
    </section>;
};
export default HeroSection;