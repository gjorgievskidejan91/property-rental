import PropertySearch from "@/components/PropertySearch";
import Properties from "@/components/Properties";

// PropertiesPage component definition
const PropertiesPage = async () => {
  // JSX content for PropertiesPage component
  return (
    <>
      <section className="bg-primary py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <PropertySearch />
        </div>
      </section>
      <Properties />
    </>
  );
};

// Export PropertiesPage component
export default PropertiesPage;
