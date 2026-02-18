import { Link } from "react-router-dom";
import { Wheat, Apple, Play } from "lucide-react";
import AlmondIcon from "@/components/icons/AlmondIcon";
import { Button } from "@/components/ui/button";
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
          className="absolute inset-0 w-full h-full object-cover object-[center_30%] sm:object-center"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-background/35 text-primary-foreground" />
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-[40px] flex flex-col items-center lg:items-start justify-center text-center lg:text-left">
        {/* Text Content */}
        <div className="animate-fade-in-up flex flex-col items-center lg:items-start">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-foreground leading-tight mb-4">
            <span className="drop-shadow-[0_0_25px_hsl(var(--primary)/0.6)] [text-shadow:_-1px_-1px_0_rgba(255,255,255,0.3),_1px_-1px_0_rgba(255,255,255,0.3),_-1px_1px_0_rgba(255,255,255,0.3),_1px_1px_0_rgba(255,255,255,0.3)] text-white">Quality Intelligence</span>
          </h1>
          
          {/* Category Buttons */}
          <div className="flex flex-wrap gap-3 sm:gap-4 mt-2 justify-center lg:justify-start">
            {categoryButtons.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-primary/60 bg-primary/20 backdrop-blur-md hover:bg-primary/30 transition-colors"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md border border-primary/70 bg-primary/15 flex items-center justify-center">
                  <cat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <span className="text-white font-medium text-base sm:text-lg">{cat.label}</span>
              </a>
            ))}
          </div>

          {/* Join Demo Button with Border Light Animation */}
          <div className="mt-6 sm:mt-8">
            <Link to="/joindemo" className="group relative inline-block">
              {/* Animated border wrapper */}
              <div className="absolute -inset-[2px] rounded-xl bg-gradient-to-r from-white/10 via-white/60 to-white/10 bg-[length:200%_100%] animate-border-light opacity-80" />
              <Button 
                size="lg" 
                className="relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold rounded-xl shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                  <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
                  Join Our Next Online Demo
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>;
};
export default HeroSection;