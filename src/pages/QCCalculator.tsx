import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ROICalculator from "@/components/ROICalculator";

const QCCalculator = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="pt-32 pb-8 container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground text-center">QC Cost Calculator</h1>
          
        </div>
        <ROICalculator />
      </main>
      <Footer />
    </div>
  );
};

export default QCCalculator;
