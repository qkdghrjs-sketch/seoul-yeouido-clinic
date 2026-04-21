import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import StatsSection from "@/components/StatsSection";
import About from "@/components/About";
import Services from "@/components/Services";
import PopularPrograms from "@/components/PopularPrograms";
import Hours from "@/components/Hours";
import Location from "@/components/Location";
import Footer from "@/components/Footer";
import PopupBanner from "@/components/PopupBanner";

export default function Home() {
  return (
    <>
      <PopupBanner />
      <Header />
      <main>
        <HeroSlider />
        <StatsSection />
        <About />
        <Services />
        <PopularPrograms />
        <Hours />
        <Location />
      </main>
      <Footer />
    </>
  );
}
