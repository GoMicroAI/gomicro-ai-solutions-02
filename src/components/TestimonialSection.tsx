import mikeFeildon from "@/assets/mike-feildon.png";
import amanpreetSingh from "@/assets/amanpreet-singh.png";
import kateMcintyre from "@/assets/kate-mcintyre.png";
import vijeeshSathyanesan from "@/assets/vijeesh-sathyanesan.png";
import grainsMachine from "@/assets/grains-machine.png";
import nutsMachine from "@/assets/nuts-machine.png";
import fruitsMachine from "@/assets/fruits-machine.png";

const testimonials = [
  {
    quote: "We have deployed and integrated a host of technologies and found GoMicro Assessor as one of the most reliable technology on repeatability and reproducibility.",
    name: "Amanpreet Singh",
    role: "CEO",
    company: "Grain Analyser Ltd.",
    subtitle: "Investor/Advisor-GoMicro",
    image: amanpreetSingh,
    bgImage: grainsMachine,
  },
  {
    quote: "The technology developed by GoMicro will allow us to establish the quality of the soybeans at intake more quickly and accurately.",
    name: "Kate McIntyre",
    role: "Field Officer",
    company: "PB Agrifood",
    subtitle: "",
    image: kateMcintyre,
    bgImage: nutsMachine,
  },
  {
    quote: "We are impressed with GoMicro's AI assessment technology. We can now assess the quality of cardamom accurately.",
    name: "Vijeesh Sathyanesan",
    role: "Founder",
    company: "Connectfarm",
    subtitle: "",
    image: vijeeshSathyanesan,
    bgImage: fruitsMachine,
  },
];

const TestimonialSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Testimonials grid - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="relative rounded-2xl overflow-hidden h-[320px] group"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img 
                  src={testimonial.bgImage} 
                  alt="" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>
              
              {/* Quote Card */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-5 shadow-lg">
                  <div className="flex gap-4">
                    {/* Quote Text */}
                    <div className="flex-1">
                      <blockquote className="text-gray-800 text-sm leading-relaxed">
                        <span className="text-primary text-2xl font-serif leading-none">"</span>
                        {testimonial.quote}
                        <span className="text-primary text-2xl font-serif leading-none">"</span>
                      </blockquote>
                    </div>
                    
                    {/* Avatar & Info */}
                    <div className="flex flex-col items-center text-center min-w-[80px]">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-14 h-14 rounded-full object-cover border-2 border-primary/30 mb-2"
                      />
                      <div className="text-xs font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-[10px] text-gray-600">{testimonial.role}</div>
                      <div className="text-[10px] text-primary font-medium">{testimonial.company}</div>
                      {testimonial.subtitle && (
                        <div className="text-[9px] text-gray-500">{testimonial.subtitle}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;