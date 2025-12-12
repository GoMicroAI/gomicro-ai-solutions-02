import kurtWalter from "@/assets/kurt-walter.jpg";
import amanpreetSingh from "@/assets/amanpreet-singh-new.jpg";
import kateMcintyre from "@/assets/kate-mcintyre-new.jpg";
import vijeeshSathyanesan from "@/assets/vijeesh-sathyanesan-new.jpg";
import lentilsBg from "@/assets/lentils-bg.jpg";
import wheatBg from "@/assets/wheat-bg.jpg";
import soyBg from "@/assets/soy-bg.jpg";
import cardamomBg from "@/assets/cardamom-bg.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote: "GoMicro Assessor can accurately predict the final outcome of the grade of their grain after cleaning",
    name: "Kurt Walter",
    role: "Director",
    company: "Walco Seed Cleaning",
    subtitle: "",
    image: kurtWalter,
    bgImage: lentilsBg,
  },
  {
    quote: "We have deployed and integrated a host of technologies and have found GoMicro Assessor as one of the most reliable technology on repeatability and reproducibility.",
    name: "Amanpreet Singh",
    role: "CEO",
    company: "Grain Analyser Ltd.",
    subtitle: "Investor/Advisor-GoMicro",
    image: amanpreetSingh,
    bgImage: wheatBg,
  },
  {
    quote: "The technology developed by GoMicro will allow us to establish the quality of the soybeans at intake more quickly and accurately.",
    name: "Kate McIntyre",
    role: "Field Officer",
    company: "PB Agrifood",
    subtitle: "",
    image: kateMcintyre,
    bgImage: soyBg,
  },
  {
    quote: "We are impressed with GoMicro's AI assessment technology. We can now assess the quality of cardamom accurately.",
    name: "Vijeesh Sathyanesan",
    role: "Founder",
    company: "ConnectOne Club",
    subtitle: "",
    image: vijeeshSathyanesan,
    bgImage: cardamomBg,
  },
];

const TestimonialSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
          What our users say
        </h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="relative rounded-2xl overflow-hidden h-[400px] group">
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
                    <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                      <div className="flex gap-3">
                        {/* Quote Text */}
                        <div className="flex-1">
                          <blockquote className="text-gray-800 text-xs leading-relaxed">
                            <span className="text-primary text-xl font-serif leading-none">"</span>
                            {testimonial.quote}
                            <span className="text-primary text-xl font-serif leading-none">"</span>
                          </blockquote>
                        </div>
                        
                        {/* Avatar & Info */}
                        <div className="flex flex-col items-center text-center min-w-[70px]">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                            className="w-12 h-12 rounded-full object-cover border-2 border-primary/30 mb-2"
                          />
                          <div className="text-[10px] font-semibold text-gray-900">{testimonial.name}</div>
                          <div className="text-[9px] text-gray-600">{testimonial.role}</div>
                          <div className="text-[9px] text-primary font-medium">{testimonial.company}</div>
                          {testimonial.subtitle && (
                            <div className="text-[8px] text-gray-500">{testimonial.subtitle}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12" />
          <CarouselNext className="hidden md:flex -right-12" />
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialSection;
