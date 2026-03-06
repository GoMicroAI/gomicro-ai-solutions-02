import { useState, useRef, useCallback } from "react";
import { Wheat, Apple, CheckCircle, ShieldCheck, Zap, DollarSign, Calculator, Play, Pause } from "lucide-react";
import { Link } from "react-router-dom";
import AlmondIcon from "@/components/icons/AlmondIcon";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import grainsMachine from "@/assets/grains-machine.png";
import nutsMachine from "@/assets/nuts-machine.png";
import spinachQc from "@/assets/spinach-qc.jpeg";


const solutions = [{
  id: "fruits-veg",
  icon: Apple,
  title: "Fruits & Vegetables",
  subtitle: "Green Leaves, Berries, Tomatoes",
  description: "Advanced inspection for fresh produce to ensure consistent quality.",
  features: ["Defect Assessment (to meet trading standards)", "Varietal Assessment", "Freshness Analysis"],
  image: spinachQc,
  imageAlt: "GoMicro AI fruits and vegetables quality assessment machine"
}, {
  id: "nuts",
  icon: AlmondIcon,
  title: "Nuts QC Assessment",
  subtitle: "Almonds",
  description: "USDA-standard compliant defect assessment with top & bottom inspection.",
  features: ["Defect Assessment (to USDA Standards)", "Top & Bottom Inspection", "Quality Grading"],
  image: nutsMachine,
  imageAlt: "GoMicro AI nut quality assessment machine"
}, {
  id: "grains",
  icon: Wheat,
  title: "Grains QC Assessment",
  subtitle: "Wheat, Barley, Lentils & Sorghum",
  description: "Comprehensive grain quality assessment powered by AI to meet trading standards.",
  features: ["Defect Assessment (to meet trading standards)", "Varietal Assessment", "Germination Tests"],
  image: grainsMachine,
  imageAlt: "GoMicro AI grain quality assessment machine"
}];

const SolutionsSection = () => {
  const [videoOpen, setVideoOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlayPause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }, []);

  return <>
    <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
      <DialogContent className="sm:max-w-4xl p-0 bg-black border-none overflow-hidden">
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            src="https://drive.google.com/file/d/1XpnCr_Q4iwGg2p1C5bYTNgVhFxoRakQm/preview"
            className="absolute inset-0 w-full h-full"
            allow="autoplay"
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
    <section id="solutions" className="py-24 lg:py-32 bg-background">
      {/* Top separator line */}
      <div className="w-full h-px bg-border mb-16 lg:mb-24" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mx-auto mb-16 lg:mb-28 flex flex-col items-center">
          {/* Benefits Cards */}
          <div className="w-full max-w-[1100px]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* Reduce Rejections */}
              <div className="group relative px-8 py-8 rounded-2xl bg-gradient-to-br from-primary/15 via-primary/10 to-primary/5 border-2 border-yellow-400/50 shadow-[0_0_15px_rgba(250,204,21,0.3),0_0_30px_rgba(250,204,21,0.15)] hover:shadow-[0_0_20px_rgba(250,204,21,0.4),0_0_40px_rgba(250,204,21,0.25)] hover:border-yellow-400/70 hover:scale-105 transition-all duration-300 cursor-default">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors duration-300">
                    <ShieldCheck className="w-8 h-8 text-primary" />
                  </div>
                  <span className="text-xl md:text-2xl font-bold text-primary text-center">Reduce Rejections</span>
                </div>
              </div>
              
              {/* Speed up your QC */}
              <div className="group relative px-8 py-8 rounded-2xl bg-gradient-to-br from-primary/15 via-primary/10 to-primary/5 border-2 border-yellow-400/50 shadow-[0_0_15px_rgba(250,204,21,0.3),0_0_30px_rgba(250,204,21,0.15)] hover:shadow-[0_0_20px_rgba(250,204,21,0.4),0_0_40px_rgba(250,204,21,0.25)] hover:border-yellow-400/70 hover:scale-105 transition-all duration-300 cursor-default">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors duration-300">
                    <Zap className="w-8 h-8 text-primary" />
                  </div>
                  <span className="text-xl md:text-2xl font-bold text-primary text-center">Speed up your QC</span>
                </div>
              </div>
              
              {/* Reduce QC Cost */}
              <div className="group relative px-8 py-8 rounded-2xl bg-gradient-to-br from-primary/15 via-primary/10 to-primary/5 border-2 border-yellow-400/50 shadow-[0_0_15px_rgba(250,204,21,0.3),0_0_30px_rgba(250,204,21,0.15)] hover:shadow-[0_0_20px_rgba(250,204,21,0.4),0_0_40px_rgba(250,204,21,0.25)] hover:border-yellow-400/70 hover:scale-105 transition-all duration-300 cursor-default">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors duration-300">
                    <DollarSign className="w-8 h-8 text-primary" />
                  </div>
                  <span className="text-xl md:text-2xl font-bold text-primary text-center">Reduce QC Cost</span>
                </div>
              </div>
            </div>

            {/* QC Cost Calculator CTA */}
            <div className="col-span-full mt-6">
              <Link to="/qc-calculator">
                <div className="group relative w-full px-8 py-6 rounded-2xl bg-gradient-to-r from-primary via-primary/90 to-primary border-2 border-yellow-400/60 shadow-[0_0_20px_rgba(250,204,21,0.4),0_0_40px_rgba(250,204,21,0.2)] hover:shadow-[0_0_30px_rgba(250,204,21,0.5),0_0_60px_rgba(250,204,21,0.3)] hover:scale-[1.02] transition-all duration-300 cursor-pointer animate-pulse-subtle">
                  <div className="relative flex flex-col items-center justify-center gap-1">
                    <div className="flex items-center gap-3">
                      <Calculator className="w-7 h-7 text-primary-foreground" />
                      <span className="text-lg md:text-xl font-bold text-primary-foreground">QC Cost Calculator</span>
                    </div>
                    <span className="text-sm md:text-base text-primary-foreground/80 font-medium">Find Your True Cost of Quality Control in Minutes</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

      </div>
      
      {/* Bottom separator line */}
      <div className="w-full h-px bg-border mt-16 lg:mt-24" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16 lg:mt-24">
        {/* Solutions List - Vertical Stacked */}
        <div className="space-y-0">
          {solutions.map((solution, index) => (
            <div key={solution.id}>
              <div id={solution.id} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center scroll-mt-24 py-16 lg:py-24`}>
                {/* Image */}
                <div className="w-full lg:w-1/2">
                  <div className="relative rounded-2xl overflow-hidden shadow-xl">
                    {solution.id === "fruits-veg" ? (
                      <div className="relative group">
                        <video
                          ref={(el) => { if (el) videoRef.current = el; }}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-auto object-contain"
                          onPlay={() => setIsPlaying(true)}
                          onPause={() => setIsPlaying(false)}
                        >
                          <source src="/videos/spinach-video.mp4" type="video/mp4" />
                        </video>
                        <button
                          onClick={togglePlayPause}
                          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                          aria-label={isPlaying ? "Pause video" : "Play video"}
                        >
                          {isPlaying ? (
                            <Pause className="h-5 w-5" />
                          ) : (
                            <Play className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    ) : (
                      <img 
                        src={solution.image} 
                        alt={solution.imageAlt} 
                        className="w-full h-auto object-contain" 
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                    {/* Subtle overlay for cohesion */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2">
                  {/* Icon + Title */}
                  <div className="flex items-center gap-4 mb-2">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-black border-2 border-primary/30 flex-shrink-0">
                      <solution.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">{solution.title}</h3>
                  </div>
                  <p className="text-primary font-medium text-lg mb-4">{solution.subtitle}</p>
                  <p className="text-muted-foreground text-lg mb-8">{solution.description}</p>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {solution.features.map((feature, i) => <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </li>)}
                  </ul>

                  {/* CTA */}
                  <div className="flex gap-3">
                    <Button variant="outline" className="hover:bg-primary hover:text-primary-foreground" asChild>
                      <a href="#contact">Learn More</a>
                    </Button>
                    {solution.id === "fruits-veg" && (
                      <Button variant="outline" className="hover:bg-primary hover:text-primary-foreground" onClick={() => setVideoOpen(true)}>
                        Watch Video
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Separator line between sections */}
              {index < solutions.length - 1 && (
                <div className="w-full h-px bg-border" />
              )}
            </div>
          ))}
        </div>
        
        {/* Line after Fruits & Vegetables section */}
        <div className="w-full h-px bg-border mt-16 lg:mt-24" />
      </div>
    </section>
  </>;
};
export default SolutionsSection;