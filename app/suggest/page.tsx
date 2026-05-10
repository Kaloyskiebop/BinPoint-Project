import SuggestionSection from "@/components/suggest/SuggestionSection";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Suggest an Item | BinPoint",
  description: "Help us grow our directory by suggesting items that need proper segregation.",
};

export default function SuggestPage() {
  return (
    <main className="w-full bg-background min-h-screen">
    <Navbar/>
      <SuggestionSection/>
    <Footer/>  
    </main>
  );
}