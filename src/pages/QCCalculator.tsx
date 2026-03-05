import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ROICalculator from "@/components/ROICalculator";

const QCCalculator = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <ROICalculator />
      </main>
      <Footer />
    </div>
  );
};

export default QCCalculator;
