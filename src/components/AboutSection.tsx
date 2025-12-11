import { MapPin, Lightbulb, Target } from "lucide-react";
import teamPhoto from "@/assets/team-photo.png";
const AboutSection = () => {
  return <section id="about" className="py-24 lg:py-32 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">About Us</span>
            <h2 className="mt-4 text-2xl sm:text-3xl lg:text-5xl font-bold text-foreground">
              AI-First Innovation for Agriculture
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              GoMicro is an AI-first company developing cutting-edge AI solutions for the Agricultural Industry, 
              based at Tonsley Innovation Precinct in South Australia.
            </p>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Our mission is to transform quality control in agriculture through superhuman AI inspection systems 
              that deliver unprecedented accuracy, speed, and consistency.
            </p>

            {/* Info Cards */}
            <div className="mt-10 grid sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Location</h3>
                  <p className="text-sm text-muted-foreground mt-1">Tonsley Innovation Precinct, South Australia</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Focus</h3>
                  <p className="text-sm text-muted-foreground mt-1">AI-Powered Agricultural Solutions</p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
          <div style={{
            backgroundImage: "url(\"/lovable-uploads/da278507-e8f1-4585-8407-d2e1318e4f00.png\")",
            backgroundSize: 'cover',
            backgroundPosition: 'center top'
          }} className="aspect-[4/3] rounded-3xl overflow-hidden flex items-start justify-center relative">
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-transparent" />
              
              <div className="relative text-center text-white p-4 sm:p-8 pt-1 sm:pt-2">
                <div className="w-10 h-10 sm:w-24 sm:h-24 mx-auto mb-2 sm:mb-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Target className="w-5 h-5 sm:w-12 sm:h-12" />
                </div>
                <h3 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2">Our Vision</h3>
                <p className="max-w-sm text-xs sm:text-base text-secondary font-semibold leading-relaxed">
                  Empowering the agricultural industry with AI technology that ensures consistent quality, 
                  reduces waste, and meets global standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default AboutSection;