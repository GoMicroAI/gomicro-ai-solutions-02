import testimonialAman from "@/assets/testimonial-aman.png";
import testimonialKate from "@/assets/testimonial-kate.png";
import testimonialVijay from "@/assets/testimonial-vijay.png";
import testimonialMike from "@/assets/testimonial-mike.png";
import testimonialKurt from "@/assets/testimonial-kurt.png";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  { image: testimonialKurt, alt: "Kurt Walter - Director at Walco Seed Cleaning" },
  { image: testimonialAman, alt: "Amanpreet Singh - CEO at Grain Analyser Ltd." },
  { image: testimonialKate, alt: "Kate McIntyre - Field Officer at PB Agrifood" },
  { image: testimonialVijay, alt: "Vijeesh Sathyanesan - Founder at ConnectOne Club" },
  { image: testimonialMike, alt: "Mike Feildon - CEO at PM Fresh" },
];

const TestimonialSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-foreground mb-16">
          What our <span className="text-primary">users</span> say
        </h2>
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ]}
          className="w-full max-w-[1400px] mx-auto"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="rounded-3xl overflow-hidden shadow-2xl border border-border/20 transition-transform duration-300 hover:scale-[1.02]">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.alt}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-14 h-12 w-12" />
          <CarouselNext className="hidden md:flex -right-14 h-12 w-12" />
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialSection;
