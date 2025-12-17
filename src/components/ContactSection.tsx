import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Send, Linkedin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
const ContactSection = () => {
  const {
    toast
  } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    message: ""
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const {
        error
      } = await supabase.functions.invoke("send-contact-email", {
        body: formData
      });
      if (error) throw error;
      toast({
        title: "Demo Request Received!",
        description: "We'll get back to you within 24 hours."
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        message: ""
      });
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Failed to send request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return <section id="contact" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Contact Info */}
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Contact</span>
            <h2 className="mt-4 text-2xl sm:text-3xl lg:text-5xl font-bold text-foreground">
              Book a Demo Today
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Ready to transform your quality control process? Get in touch with our team to schedule 
              a quick call, to discuss your QC challenges, assess your current QC costs and see our AI solutions in action.
            </p>

            {/* Contact Details */}
            <div className="mt-10 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Email</div>
                  <a className="font-medium text-foreground hover:text-primary transition-colors" href="mailto:sivam@gomicro.ai">
                    sivam@gomicro.ai
                  </a>
                </div>
              </div>

              <a href="https://share.google/8rt0eWcEsW8iqF0XJ" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Address</div>
                  <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                    Suite 9, T8Tonsley<br />
                    6 MAB Eastern Promenade<br />
                    Tonsley SA 5042
                  </div>
                </div>
              </a>

              {/* LinkedIn Button */}
              <a href="https://www.linkedin.com/company/gomicro/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-[#0A66C2] flex items-center justify-center flex-shrink-0 group-hover:bg-[#004182] transition-colors">
                  <Linkedin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Social</div>
                  <span className="font-medium text-foreground group-hover:text-primary transition-colors">Follow us on LinkedIn</span>
                </div>
              </a>

            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
            <h3 className="text-xl font-semibold text-foreground mb-6">Request a Demo</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                    First Name
                  </label>
                  <Input id="firstName" placeholder="John" required value={formData.firstName} onChange={handleChange} />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                    Last Name
                  </label>
                  <Input id="lastName" placeholder="Doe" required value={formData.lastName} onChange={handleChange} />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Work Email
                </label>
                <Input id="email" type="email" placeholder="john@company.com" required value={formData.email} onChange={handleChange} />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                  Company
                </label>
                <Input id="company" placeholder="Company Name" required value={formData.company} onChange={handleChange} />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <Textarea id="message" placeholder="Tell us about your quality control needs..." rows={4} required value={formData.message} onChange={handleChange} />
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : <>
                    Send Request
                    <Send className="w-4 h-4 ml-2" />
                  </>}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>;
};
export default ContactSection;