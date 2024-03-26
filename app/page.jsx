// Importing necessary modules and components
import Link from "next/link"; // Next.js Link component
import Hero from "@/components/Hero"; // Hero component
import InfoBoxes from "@/components/InfoBoxes"; // InfoBoxes component
import PropertyCard from "@/components/PropertyCard"; // PropertyCard component
import HomeProperties from "@/components/HomeProperties"; // HomeProperties component
import { fetchProperties } from "@/utils/requests"; // Function to fetch properties

// HomePage component definition
const HomePage = async () => {
  // Fetch properties
  const properties = await fetchProperties();

  // Sort properties by create date and select the most recent three
  const recentProperties = properties
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  // JSX content for HomePage component
  return (
    <div>
      {/* Hero section */}
      <Hero />
      {/* InfoBoxes section */}
      <InfoBoxes />
      {/* HomeProperties section */}
      <HomeProperties />
    </div>
  );
};

// Export HomePage component
export default HomePage;
