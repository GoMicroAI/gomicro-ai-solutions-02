import { Wheat, Apple } from "lucide-react";
import AlmondIcon from "@/components/icons/AlmondIcon";
import { useState, useEffect, useRef } from "react";

const categoryButtons = [
  { id: "grains", label: "Grains", icon: Wheat },
  { id: "nuts", label: "Nuts", icon: AlmondIcon },
  { id: "fruits-veg", label: "Vegetables", icon: Apple },
];

const scrollingTexts = [
  "Super Human QC",
  "with",
  "AI in a BOX"
];

const HeroSection = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Delay video loading until after initial paint
  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldLoadVideo(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Handle video loaded
  useEffect(() => {
    if (shouldLoadVideo && videoRef.current) {
      videoRef.current.load();
    }
  }, [shouldLoadVideo]);

  // Text scrolling animation
  useEffect(() => {
    if (currentTextIndex < scrollingTexts.length - 1) {
      const timer = setTimeout(() => {
        setCurrentTextIndex(prev => prev + 1);
      }, 1200);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
    }
  }, [currentTextIndex]);

  return <section className="relative min-h-screen flex items-center justify-center pt-16 lg:pt-20">
      {/* Hero Background Video - Optimized */}
      <div className="absolute inset-0">
        {/* Poster image shown immediately */}
        <img 
          src="/lovable-uploads/b25b92a4-e494-4fb9-a4ae-63069e23460e.png"
          alt=""
          className={`absolute inset-0 w-full h-full object-cover object-[center_30%] sm:object-center transition-opacity duration-500 ${videoLoaded ? 'opacity-0' : 'opacity-100'}`}
        />
        {shouldLoadVideo && (
          <video 
            ref={videoRef}
            autoPlay 
            muted 
            playsInline
            loop={false}
            preload="auto"
            onCanPlay={() => setVideoLoaded(true)}
            className={`w-full h-full object-cover object-[center_30%] sm:object-center transition-opacity duration-500 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
          >
            <source src="/videos/hero-video.mp4" type="video/mp4" />
          </video>
        )}
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-background/35 text-primary-foreground" />
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-[40px] flex flex-col items-center lg:items-start justify-center text-center lg:text-left">
        {/* Text Content */}
        <div className="animate-fade-in-up flex flex-col items-center lg:items-start">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-foreground leading-tight mb-4 min-h-[1.2em]">
            <span 
              key={currentTextIndex}
              className={`drop-shadow-[0_0_25px_hsl(var(--primary)/0.6)] [text-shadow:_-1px_-1px_0_rgba(255,255,255,0.3),_1px_-1px_0_rgba(255,255,255,0.3),_-1px_1px_0_rgba(255,255,255,0.3),_1px_1px_0_rgba(255,255,255,0.3)] text-white block ${isAnimating ? 'animate-fade-in' : ''} ${currentTextIndex < 2 ? 'text-[0.5em]' : ''}`}
            >
              {scrollingTexts[currentTextIndex]}
            </span>
          </h1>
          
          {/* Category Buttons */}
          <div className="flex flex-wrap gap-3 sm:gap-4 mt-2 justify-center lg:justify-start">
            {categoryButtons.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-primary/40 bg-background/10 backdrop-blur-sm hover:bg-primary/20 transition-colors"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md border border-primary/50 flex items-center justify-center">
                  <cat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <span className="text-foreground font-medium text-base sm:text-lg">{cat.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
      
      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>;
};
export default HeroSection;