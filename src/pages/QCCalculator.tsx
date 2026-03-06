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
        <div className="pt-28" />
        <ROICalculator />
      </main>
      <Footer />
    </div>
  );
};

export default QCCalculator;
