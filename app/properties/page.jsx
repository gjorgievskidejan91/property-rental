import PropertyCard from "@/components/PropertyCard";
import { fetchProperties } from "@/utils/requests";

const PropertyPage = async () => {
  const properties = await fetchProperties();
  //Sort the properties by create date
  properties.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p>No properties found </p>
        ) : (
          <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
            {properties.map((property, index) => (
              <PropertyCard property={property} key={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyPage;
