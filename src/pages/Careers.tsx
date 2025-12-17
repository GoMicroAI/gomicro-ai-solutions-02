import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Upload, Briefcase, Users, Lightbulb, TrendingUp, Brain, Megaphone, Cog } from "lucide-react";

const Careers = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    coverLetter: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or Word document.",
          variant: "destructive",
        });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 5MB.",
          variant: "destructive",
        });
        return;
      }
      setResumeFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resumeFile) {
      toast({
        title: "Resume required",
        description: "Please upload your resume.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const fileExt = resumeFile.name.split('.').pop();
      const fileName = `${Date.now()}-${formData.name.replace(/\s+/g, '-')}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(fileName, resumeFile);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('resumes')
        .getPublicUrl(fileName);

      const { error } = await supabase.functions.invoke('send-internship-email', {
        body: {
          ...formData,
          resumeUrl: urlData.publicUrl,
          resumeName: resumeFile.name,
        },
      });

      if (error) throw error;

      toast({
        title: "Application submitted!",
        description: "Thank you for your interest. We'll review your application and get back to you soon.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        linkedin: "",
        coverLetter: "",
      });
      setResumeFile(null);
      const fileInput = document.getElementById('resume') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (error: any) {
      console.error("Error submitting application:", error);
      toast({
        title: "Submission failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: Briefcase,
      title: "Real-World Projects",
      description: "Work on practical systems and initiatives that have real impact across technology, business, and engineering domains.",
    },
    {
      icon: Users,
      title: "Expert Mentorship",
      description: "Learn directly from experienced professionals across technical, business, and engineering backgrounds.",
    },
    {
      icon: Lightbulb,
      title: "Innovation-Driven Culture",
      description: "Be part of a collaborative environment that values creativity, problem-solving, and continuous learning.",
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "High-performing interns may be considered for long-term or full-time opportunities based on performance and business needs.",
    },
  ];

  const domains = [
    { icon: Brain, text: "AI / Machine Learning / Computer Vision" },
    { icon: Megaphone, text: "Marketing, Growth & Business Strategy" },
    { icon: Cog, text: "Mechanical, Industrial & Product Engineering" },
  ];

  const requirements = [
    "Currently pursuing or recently completed a degree in a relevant field",
    "Strong interest in learning and applying skills in real-world projects",
    "Ability to work independently and in a team environment",
    "Good communication and problem-solving skills",
    "Technical or domain-specific skills relevant to the chosen area of interest",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Internship Program
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Join our team and gain hands-on experience across multiple domains while working on real-world, production-level projects.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* Main Content - Form and Description */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden">
              <div className="grid lg:grid-cols-2">
                {/* Left Side - Form */}
                <div className="p-8 lg:p-12">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Apply Now
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <Label htmlFor="name" className="mb-2 block">
                        Full Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="bg-background"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="mb-2 block">
                        Email Address <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        className="bg-background"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="mb-2 block">
                        Phone Number <span className="text-muted-foreground">(Optional)</span>
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className="bg-background"
                      />
                    </div>

                    <div>
                      <Label htmlFor="linkedin" className="mb-2 block">
                        LinkedIn Profile <span className="text-muted-foreground">(Optional)</span>
                      </Label>
                      <Input
                        id="linkedin"
                        name="linkedin"
                        type="url"
                        value={formData.linkedin}
                        onChange={handleChange}
                        placeholder="https://linkedin.com/in/yourprofile"
                        className="bg-background"
                      />
                    </div>

                    <div>
                      <Label htmlFor="resume" className="mb-2 block">
                        Resume <span className="text-destructive">*</span>
                      </Label>
                      <div className="relative">
                        <Input
                          id="resume"
                          name="resume"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="bg-background file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                        />
                        {resumeFile && (
                          <p className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
                            <Upload className="w-4 h-4" />
                            {resumeFile.name}
                          </p>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        PDF or Word document, max 5MB
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="coverLetter" className="mb-2 block">
                        Cover Letter <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="coverLetter"
                        name="coverLetter"
                        required
                        value={formData.coverLetter}
                        onChange={handleChange}
                        placeholder="Tell us about yourself, your interests, and why you want to join our internship program. Please mention your area of interest (AI / ML / Machine Vision, Marketing, or Mechanical)."
                        rows={6}
                        className="bg-background resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full"
                      size="lg"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                    </Button>
                  </form>
                </div>

                {/* Right Side - Description */}
                <div className="bg-primary/5 p-8 lg:p-12 border-l border-border">
                  {/* Domains Section */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-foreground mb-4">
                      Domains / Areas of Work
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      Internship opportunities may span one or more of the following areas:
                    </p>
                    <div className="space-y-4">
                      {domains.map((domain, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-4 bg-card border border-border rounded-lg p-4"
                        >
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <domain.icon className="w-5 h-5 text-primary" />
                          </div>
                          <span className="text-foreground font-medium">{domain.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Requirements Section */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-foreground mb-4">General Requirements</h3>
                    <ul className="space-y-3">
                      {requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground text-sm">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Note */}
                  <div className="bg-primary/10 border border-primary/20 rounded-xl p-5">
                    <p className="text-foreground font-medium">
                      Please mention your area of interest in your cover letter
                    </p>
                    <p className="text-muted-foreground text-sm mt-1">
                      (AI / ML / Machine Vision, Marketing, or Mechanical)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Careers;
