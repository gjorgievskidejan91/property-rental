import Hero from "@/components/Hero";
import InfoBoxes from "@/components/InfoBoxes";
import HomeProperties from "@/components/HomeProperties";
import FeaturedProperties from "@/components/FeaturedProperties";
import DemoInfo from "@/components/DemoInfo";

const HomePage = () => {
  return (
    <>
      <Hero />
      <DemoInfo />
      <InfoBoxes />
      <FeaturedProperties />
      <HomeProperties />
    </>
  );
};
export default HomePage;
