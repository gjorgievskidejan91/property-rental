// Importing necessary modules and components
import Hero from "@/components/Hero"; // Hero component
import InfoBoxes from "@/components/InfoBoxes"; // InfoBoxes component
import HomeProperties from "@/components/HomeProperties"; // HomeProperties component
import FeaturedProperties from "@/components/FeaturedProperties";

// HomePage component definition
const HomePage = async () => {
  // JSX content for HomePage component
  return (
    <div>
      {/* Hero section */}
      <Hero />
      {/* InfoBoxes section */}
      <InfoBoxes />
      {/* HomeProperties section */}
      <FeaturedProperties />
      <HomeProperties />
    </div>
  );
};

// Export HomePage component
export default HomePage;
