import { Cpu, Lightbulb, Smartphone, Zap, Layers } from "lucide-react";
import aiTechnologyImg from "@/assets/ai-technology.png";

const technologies = [
  {
    icon: Layers,
    title: "Synthetic Training Images",
    description: "Advanced AI models trained on synthetic data for unparalleled accuracy and consistency.",
  },
  {
    icon: Lightbulb,
    title: "Patented Illumination",
    description: "Proprietary lighting technology ensures consistent image quality across all conditions.",
  },
  {
    icon: Smartphone,
    title: "Edge or Phone Deployment",
    description: "Flexible deployment options — run on edge devices or mobile phones for maximum convenience.",
  },
  {
    icon: Cpu,
    title: "Powered by Nvidia",
    description: "Industry-leading GPU technology delivers real-time processing and analysis.",
  },
  {
    icon: Zap,
    title: "Flexible Deployment",
    description: "Adaptable solutions that integrate seamlessly into existing production lines.",
  },
];

const TechnologySection = () => {
  return (
    <section id="technology" className="py-24 lg:py-32 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Technology</span>
            <h2 className="mt-4 text-2xl sm:text-3xl lg:text-5xl font-bold text-foreground">
              Cutting-Edge AI Technology
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Our proprietary technology stack combines advanced machine learning, patented hardware, 
              and flexible deployment options to deliver unmatched quality control performance.
            </p>

            {/* Tech Grid */}
            <div className="mt-10 space-y-6">
              {technologies.map((tech, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/20 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <tech.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{tech.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{tech.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={aiTechnologyImg}
                alt="AI Technology powered by Nvidia"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
