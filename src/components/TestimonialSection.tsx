import { Quote } from "lucide-react";
import mikeFeildon from "@/assets/mike-feildon.png";
import amanpreetSingh from "@/assets/amanpreet-singh.png";
import kateMcintyre from "@/assets/kate-mcintyre.png";
import vijeeshSathyanesan from "@/assets/vijeesh-sathyanesan.png";

const testimonials = [
  {
    quote: "This technology allows us to respond faster to quality issues and consistently meet the high standards expected by our retail partners. It also enables us to look objectively at our quality and consistency.",
    name: "Mike Feildon",
    role: "CEO, PM Fresh",
    image: mikeFeildon,
  },
  {
    quote: "GoMicro Assessor is one of the most reliable technology on repeatability and reproducability.",
    name: "Amanpreet Singh",
    role: "CEO Grain Analyser Ltd.",
    image: amanpreetSingh,
  },
  {
    quote: "GoMicro will allow us to establish the quality of the soybeans at intake more quickly and accurately.",
    name: "Kate McIntyre",
    role: "Field Officer PB Agrifood",
    image: kateMcintyre,
  },
  {
    quote: "We are impressed with GoMicro's AI assessment technology for accurate assessment of cardamom quality.",
    name: "Vijeesh Sathyanesan",
    role: "Founder Circular Farms",
    image: vijeeshSathyanesan,
  },
];

const TestimonialSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-8">
            <Quote className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">What Our Clients Say</h2>
        </div>

        {/* Testimonials grid - 2 rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-card border border-border rounded-2xl p-8 flex flex-col items-center text-center"
            >
              <blockquote className="text-lg font-medium text-foreground leading-relaxed mb-6">
                "{testimonial.quote}"
              </blockquote>
              
              <img 
                src={testimonial.image} 
                alt={testimonial.name} 
                className="w-16 h-16 rounded-full object-cover mb-4"
              />
              <div>
                <div className="font-semibold text-foreground">{testimonial.name}</div>
                <div className="text-muted-foreground text-sm">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative line */}
        <div className="mt-16 flex items-center justify-center gap-2">
          <div className="w-12 h-1 rounded-full bg-primary/30" />
          <div className="w-4 h-1 rounded-full bg-primary" />
          <div className="w-12 h-1 rounded-full bg-primary/30" />
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
