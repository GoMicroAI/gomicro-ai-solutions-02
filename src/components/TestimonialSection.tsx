import testimonialAman from "@/assets/testimonial-aman.png";
import testimonialKate from "@/assets/testimonial-kate.png";
import testimonialVijay from "@/assets/testimonial-vijay.png";
import testimonialMike from "@/assets/testimonial-mike.png";
import testimonialKurt from "@/assets/testimonial-kurt.png";
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
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.alt}
                    className="w-full h-auto object-cover"
                  />
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
