import Link from "next/link";
import Hero from "@/components/Hero";
import InfoBoxes from "@/components/InfoBoxes";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import HomeProperties from "@/components/HomeProperties";
import { fetchProperties } from "@/utils/requests";

const HomePage = async () => {
  const properties = await fetchProperties();
  const recentProperties = properties
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);
  return (
    <div>
      <Hero />
      <InfoBoxes />
      <HomeProperties />

      <Footer />
    </div>
  );
};

export default HomePage;
