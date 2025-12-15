import { Wheat, Apple, CheckCircle, Tractor, Warehouse, Truck, Box, ArrowRight, Cpu } from "lucide-react";
import AlmondIcon from "@/components/icons/AlmondIcon";
import { Button } from "@/components/ui/button";
import grainsMachine from "@/assets/grains-machine.png";
import nutsMachine from "@/assets/nuts-machine.png";
import spinachQc from "@/assets/spinach-qc.jpeg";

const supplyChainSteps = [
  { icon: Tractor, label: "Farm" },
  { icon: Warehouse, label: "Pack House" },
  { icon: Truck, label: "Distribution" },
];

const solutions = [{
  id: "grains",
  icon: Wheat,
  title: "Grains QC Assessment",
  subtitle: "Wheat, Barley, Lentils & Sorghum",
  description: "Comprehensive grain quality assessment powered by AI to meet trading standards.",
  features: ["Defect Assessment (to meet trading standards)", "Varietal Assessment", "Germination Tests"],
  image: grainsMachine,
  imageAlt: "GoMicro AI grain quality assessment machine"
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
  id: "fruits-veg",
  icon: Apple,
  title: "Fruits & Vegetables",
  subtitle: "Green Leaves, Berries, Tomatoes",
  description: "Advanced inspection for fresh produce to ensure consistent quality.",
  features: ["Defect Assessment (to meet trading standards)", "Varietal Assessment", "Freshness Analysis"],
  image: spinachQc,
  imageAlt: "GoMicro AI fruits and vegetables quality assessment machine"
}];

const SolutionsSection = () => {
  return <section id="solutions" className="py-24 lg:py-32 bg-background">
      {/* Top separator line */}
      <div className="w-full h-px bg-border mb-16 lg:mb-24" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mx-auto mb-16 lg:mb-28 flex flex-col items-center">
          {/* Enhanced Title */}
          <div className="relative">
            <h2 className="uppercase tracking-widest text-4xl sm:text-5xl lg:text-7xl font-black text-foreground inline-block">
              Quality is a{" "}
              <span className="text-primary relative">
                Continuum
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary/30" viewBox="0 0 200 12" preserveAspectRatio="none">
                  <path d="M0,6 Q50,0 100,6 T200,6" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                </svg>
              </span>
            </h2>
          </div>
          
          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl">
            AI-powered quality assessment at every stage of your supply chain
          </p>
          
          {/* Supply Chain Flow Graphic */}
          <div className="mt-16 lg:mt-24 w-full max-w-[700px]">
            <div className="flex justify-between items-center w-full">
              {supplyChainSteps.map((step, index) => (
                <div key={step.label} className="flex items-center">
                  {/* Step Card */}
                  <div className="flex flex-col items-center gap-3 group">
                    <div className="relative">
                      {/* Location Icon */}
                      <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center transition-all duration-300 group-hover:border-primary/60 group-hover:shadow-lg group-hover:shadow-primary/10">
                        <step.icon className="w-14 h-14 md:w-18 md:h-18 text-primary stroke-[1.5] transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      {/* AI Box with fruit being QC'd */}
                      <div className="absolute -bottom-4 -right-4 flex items-center">
                        <div className="w-14 h-14 md:w-18 md:h-18 rounded-xl border-2 border-primary bg-primary/10 backdrop-blur-sm flex items-center justify-center relative shadow-md">
                          <Cpu className="w-7 h-7 md:w-9 md:h-9 text-primary stroke-[1.5]" />
                          <Box className="w-5 h-5 md:w-6 md:h-6 text-primary/80 stroke-[1.5] absolute -top-2 -left-2" />
                        </div>
                      </div>
                    </div>
                    <span className="text-lg md:text-xl font-semibold text-foreground mt-4">{step.label}</span>
                    <span className="text-sm md:text-base text-primary font-bold uppercase tracking-wider">AI in a BOX</span>
                  </div>
                  
                  {/* Animated Arrow between steps */}
                  {index < supplyChainSteps.length - 1 && (
                    <div className="flex items-center mx-4 md:mx-8">
                      <div className="w-10 md:w-16 h-0.5 bg-gradient-to-r from-primary/60 to-primary/20" />
                      <ArrowRight className="w-8 h-8 md:w-10 md:h-10 text-primary stroke-[2] flex-shrink-0 -ml-1" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Benefits Pills */}
          <div className="mt-16 lg:mt-20 w-full max-w-[900px]">
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              <div className="px-8 py-4 rounded-full bg-primary/10 border border-primary/20">
                <span className="text-lg md:text-xl font-semibold text-primary">Reduce Rejections</span>
              </div>
              <div className="px-8 py-4 rounded-full bg-primary/10 border border-primary/20">
                <span className="text-lg md:text-xl font-semibold text-primary">Speed up your QC</span>
              </div>
              <div className="px-8 py-4 rounded-full bg-primary/10 border border-primary/20">
                <span className="text-lg md:text-xl font-semibold text-primary">Reduce QC Cost</span>
              </div>
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
                    <img 
                      src={solution.image} 
                      alt={solution.imageAlt} 
                      className="w-full h-auto object-contain" 
                      loading="lazy"
                      decoding="async"
                    />
                    {/* Subtle overlay for cohesion */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/20 mb-6">
                    <solution.icon className="w-7 h-7 text-primary" />
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">{solution.title}</h3>
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
                  <Button variant="outline" className="hover:bg-primary hover:text-primary-foreground" asChild>
                    <a href="#contact">Learn More</a>
                  </Button>
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
    </section>;
};
export default SolutionsSection;