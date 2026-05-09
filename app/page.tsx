import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    // We use bg-background so it perfectly matches the #F8F9FA color from your tailwind config!
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <Footer />
    </main>
  );
}