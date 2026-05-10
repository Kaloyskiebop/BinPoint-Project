import { notFound } from "next/navigation";
import wasteData from "@/data/wasteData.json";
import CategoryItemSection from "@/components/categories-items/CategoryItemSection";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// 1. Make the page async and update the params type to a Promise
export default async function CategoryItemsPage({ params }: { params: Promise<{ id: string }> }) {
  
  // 2. Await the params to extract the actual ID from the URL
  const resolvedParams = await params;
  const urlId = resolvedParams.id;

  // 3. Find the specific category in your JSON that matches the resolved URL ID
  const categoryData = wasteData.find((cat) => cat.id === urlId);

  // 4. If the category doesn't exist, trigger the 404
  if (!categoryData) {
    notFound();
  }

  // 5. Render the page! 
  return (
    <main className="w-full min-h-screen bg-background">
      <Navbar/>
      <CategoryItemSection categoryData={categoryData as any} />
      <Footer/>
    </main>
  );
}