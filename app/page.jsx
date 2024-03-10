import Link from "next/link";
import Hero from "@/components/Hero";
import InfoBoxes from "@/components/InfoBoxes";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import properties from "@/properties.json";

const HomePage = () => {
  const recentProperties = properties
    .sort(() => Math.random() - Math.random())
    .slice(0, 3);
  return (
    <div>
      <Hero />
      <InfoBoxes />
      <section class="px-4 py-6">
        <div class="container-xl lg:container m-auto">
          <h2 class="text-3xl font-bold text-blue-500 mb-6 text-center">
            Recent Properties
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentProperties.map((property, index) => (
              <PropertyCard property={property} key={index} />
            ))}
          </div>
        </div>
      </section>
      <section className="m-auto max-w-lg my-10 px-6">
        <Link
          href="/properties"
          className="block bg-black text-white text-center py-3 px-5 rounded-xl hover:bg-gray-700"
        >
          View All Properties
        </Link>
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;
