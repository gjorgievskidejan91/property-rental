// Importing necessary modules and functions
import PropertyCard from "@/components/PropertyCard"; // PropertyCard component
import { fetchProperties } from "@/utils/requests"; // Function to fetch properties

// PropertiesPage component definition
const PropertiesPage = async () => {
  // Fetch properties
  const properties = await fetchProperties();

  // Sort the properties by create date
  properties.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // JSX content for PropertiesPage component
  return (
    <section className="px-4 py-6">
      {/* Display message if no properties found */}
      {properties.length === 0 ? (
        <p>No properties found </p>
      ) : (
        // Display properties in a grid layout
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Map through properties and display PropertyCard for each */}
          {properties.map((property, index) => (
            <PropertyCard property={property} key={index} />
          ))}
        </div>
      )}
    </section>
  );
};

// Export PropertiesPage component
export default PropertiesPage;
