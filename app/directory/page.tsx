import Navbar from "@/components/layout/Navbar";
import CategorySection from "@/components/categories-items/CategorySection";
import Footer from "@/components/layout/Footer";

export default function DirectoryPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <CategorySection />
      <Footer />
    </main>
  );
}