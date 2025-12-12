import { Wheat, CircleDot, Apple } from "lucide-react";
import gomicroDevice from "@/assets/gomicro-device.png";

const categoryButtons = [
  { id: "grains", label: "Grains", icon: Wheat },
  { id: "nuts", label: "Nuts", icon: CircleDot },
  { id: "fruits-veg", label: "Vegetables", icon: Apple },
];

const HeroSection = () => {
  return <section className="relative min-h-screen flex items-center justify-center">
      {/* Hero Background Video */}
      <div className="absolute inset-0">
        <video 
          autoPlay 
          muted 
          playsInline
          className="w-full h-full object-cover object-center"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-background/35 text-primary-foreground" />
      </div>
      
      {/* Two-column layout: Text Left, Image Right */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-[40px] flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Text Content - Left */}
        <div className="text-left animate-fade-in-up flex-col flex items-start justify-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-foreground leading-tight mb-2">
            <span className="drop-shadow-[0_0_25px_hsl(var(--primary)/0.6)] [text-shadow:_-1px_-1px_0_rgba(255,255,255,0.3),_1px_-1px_0_rgba(255,255,255,0.3),_-1px_1px_0_rgba(255,255,255,0.3),_1px_1px_0_rgba(255,255,255,0.3)] text-white">AI in a BOX</span>
          </h1>
          
          {/* Category Buttons */}
          <div className="flex flex-wrap gap-4 mt-4">
            {categoryButtons.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="flex items-center gap-3 px-4 py-3 rounded-lg border border-primary/40 bg-background/10 backdrop-blur-sm hover:bg-primary/20 transition-colors"
              >
                <div className="w-10 h-10 rounded-md border border-primary/50 flex items-center justify-center">
                  <cat.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-foreground font-medium text-lg">{cat.label}</span>
              </a>
            ))}
          </div>
        </div>
        
        {/* Product Image - Right */}
        <div className="flex-shrink-0 animate-fade-in-up">
          <img 
            src={gomicroDevice} 
            alt="GoMicro Device" 
            className="w-64 sm:w-80 md:w-96 lg:w-[450px] h-auto object-contain"
          />
        </div>
      </div>
      
      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>;
};
export default HeroSection;