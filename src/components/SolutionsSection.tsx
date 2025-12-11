import { Wheat, Apple, CircleDot, CheckCircle, Tractor, Warehouse, Truck, Box, ArrowRight, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import grainsMachine from "@/assets/grains-machine.png";
import nutsMachine from "@/assets/nuts-machine.png";
import fruitsMachine from "@/assets/fruits-machine.png";

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
  icon: CircleDot,
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
  image: fruitsMachine,
  imageAlt: "GoMicro AI fruits and vegetables quality assessment machine"
}];

const SolutionsSection = () => {
  return <section id="solutions" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 lg:mb-20">
          <span className="uppercase tracking-wider text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-foreground">Quality is a Continuum</span>
          <h2 className="mt-4 text-lg sm:text-2xl lg:text-3xl font-bold text-primary">See Beyond Human Limits. Deliver Beyond Expectations</h2>
          
          {/* Supply Chain Flow Graphic */}
          <div className="mt-12 flex flex-col items-center">
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
              {supplyChainSteps.map((step, index) => (
                <div key={step.label} className="flex items-center gap-4 md:gap-6">
                  {/* Step Card */}
                  <div className="flex flex-col items-center gap-3">
                    <div className="relative">
                      {/* Location Icon */}
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl border-2 border-primary/40 bg-background flex items-center justify-center">
                        <step.icon className="w-10 h-10 md:w-12 md:h-12 text-primary stroke-[1.5]" />
                      </div>
                      {/* AI Box with fruit being QC'd */}
                      <div className="absolute -bottom-3 -right-3 flex items-center">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg border-2 border-primary bg-background flex items-center justify-center relative">
                          <Cpu className="w-5 h-5 md:w-6 md:h-6 text-primary stroke-[1.5]" />
                          <Box className="w-3 h-3 md:w-4 md:h-4 text-primary/70 stroke-[1.5] absolute -top-1 -left-1" />
                        </div>
                      </div>
                    </div>
                    <span className="text-sm md:text-base font-medium text-foreground">{step.label}</span>
                    <span className="text-xs text-primary font-semibold">AI in a BOX</span>
                  </div>
                  
                  {/* Arrow between steps */}
                  {index < supplyChainSteps.length - 1 && (
                    <ArrowRight className="w-6 h-6 md:w-8 md:h-8 text-primary/50 stroke-[1.5] flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <p className="mt-10 text-lg text-muted-foreground">
            Our AI-powered systems deliver superhuman accuracy across grains, nuts, and fresh produce, 
            helping you meet the highest quality standards.
          </p>
          <Button className="mt-8" asChild>
            <a href="#contact">Book a Demo</a>
          </Button>
        </div>

        {/* Solutions List - Vertical Stacked */}
        <div className="space-y-16 lg:space-y-24">
          {solutions.map((solution, index) => <div id={solution.id} key={solution.id} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center scroll-mt-24`}>
              {/* Image */}
              <div className="w-full lg:w-1/2">
                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                  <img src={solution.image} alt={solution.imageAlt} className="w-full h-auto object-contain" />
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
            </div>)}
        </div>
      </div>
    </section>;
};
export default SolutionsSection;