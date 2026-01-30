import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Clock, Monitor, MessageCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo.png";
import heroProduct from "@/assets/hero-product.png";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50),
  lastName: z.string().min(1, "Last name is required").max(50),
  workEmail: z.string().email("Please enter a valid email address").max(100),
  company: z.string().min(1, "Company name is required").max(100),
  role: z.string().optional(),
  industry: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const roles = [
  "CEO / Founder",
  "CTO / Technical Lead",
  "Quality Control Manager",
  "Operations Manager",
  "Procurement Manager",
  "Product Manager",
  "Engineer",
  "Researcher",
  "Other",
];

const industries = [
  "Agriculture",
  "Food Processing",
  "Grain Trading",
  "Nut Processing",
  "Fresh Produce",
  "Food Manufacturing",
  "Retail / Supermarket",
  "Import / Export",
  "Research & Development",
  "Other",
];

const JoinDemo = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      workEmail: "",
      company: "",
      role: "",
      industry: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke('send-demo-email', {
        body: data,
      });

      if (error) throw error;

      toast({
        title: "Registration Successful!",
        description: "We'll send you the demo details to your email shortly.",
      });
      form.reset();
    } catch (error) {
      console.error("Error submitting demo registration:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Image with Blur */}
      <div className="fixed inset-0 z-0">
        <img 
          src={heroProduct}
          alt=""
          className="w-full h-full object-cover object-[center_30%] sm:object-center blur-sm scale-105"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-background/70" />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="GoMicro" className="h-10 sm:h-12 w-auto" />
              <span className="font-bold text-foreground text-lg sm:text-2xl">GoMicro AI</span>
            </Link>
            <Link
              to="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 pt-24 lg:pt-28 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-10">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 drop-shadow-lg">
                Join Our Next Online Demo
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                See AI-powered quality assessment in action. 30-minute live demonstration with Q&A.
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/90 backdrop-blur-sm border border-primary shadow-md">
                  <Clock className="w-5 h-5 text-primary-foreground" />
                  <span className="text-primary-foreground font-medium">30 minutes</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/90 backdrop-blur-sm border border-primary shadow-md">
                  <Monitor className="w-5 h-5 text-primary-foreground" />
                  <span className="text-primary-foreground font-medium">Live demo</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/90 backdrop-blur-sm border border-primary shadow-md">
                  <MessageCircle className="w-5 h-5 text-primary-foreground" />
                  <span className="text-primary-foreground font-medium">Q&A session</span>
                </div>
              </div>
            </div>

            {/* Form Card - Enhanced visibility */}
            <div className="bg-card/95 backdrop-blur-md border-2 border-primary/20 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/20">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Smith" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Work Email */}
                  <FormField
                    control={form.control}
                    name="workEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Work Email *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@company.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Company */}
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company / Organisation *</FormLabel>
                        <FormControl>
                          <Input placeholder="Company name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Role */}
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Role</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select role..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {roles.map((role) => (
                              <SelectItem key={role} value={role}>
                                {role}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Industry */}
                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Industry</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select industry..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {industries.map((industry) => (
                              <SelectItem key={industry} value={industry}>
                                {industry}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JoinDemo;
