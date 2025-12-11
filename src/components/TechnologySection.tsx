import { Cpu, Lightbulb, Zap, Layers } from "lucide-react";
import nvidiaInceptionImg from "@/assets/nvidia-inception.jpeg";

const technologies = [
  {
    icon: Layers,
    title: "Synthetic Training Images",
    description: "Advanced AI models trained on synthetic data for unparalleled accuracy and consistency.",
  },
  {
    icon: Lightbulb,
    title: "Patented Imaging Technology",
    description: "Proprietary lighting technology ensures consistent image quality across all conditions.",
  },
  {
    icon: Zap,
    title: "Flexible Deployment",
    description: "Adaptable solutions that integrate seamlessly into existing production lines.",
  },
  {
    icon: Cpu,
    title: "Powered by Nvidia",
    description: "Industry-leading GPU technology delivers real-time processing and analysis.",
  },
];

const TechnologySection = () => {
  return (
    <section id="technology" className="py-24 lg:py-32 bg-[#0a0a0a]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Content */}
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Technology</span>
            <h2 className="mt-4 text-2xl sm:text-3xl lg:text-5xl font-bold text-white">
              Gen AI Technology
            </h2>
            <p className="mt-6 text-lg text-gray-400">
              Our proprietary technology stack combines advanced machine learning, patented hardware, 
              and flexible deployment options to deliver unmatched quality control performance - enabling us to exceed human accuracy.
            </p>

            {/* Tech Grid */}
            <div className="mt-10 space-y-4">
              {technologies.map((tech, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-5 rounded-xl bg-[#141414] border-l-2 border-primary/60 hover:border-primary transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <tech.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{tech.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{tech.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual - NVIDIA Inception Badge */}
          <div className="relative flex items-start justify-center lg:justify-end pt-[140px]">
            <div className="rounded-2xl overflow-hidden shadow-2xl w-full max-w-2xl">
              <img
                src={nvidiaInceptionImg}
                alt="NVIDIA Inception Program Member"
                className="w-full h-auto object-contain scale-110"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
