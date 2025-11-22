import PropertyMap from "@/components/PropertyMap";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaTimes,
  FaCheck,
  FaMapMarkerAlt,
} from "react-icons/fa";

const PropertyDetails = ({ property }) => {
  return (
    <main className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
      <div className="md:col-span-2">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-6">
          <div className="text-gray-500 mb-4 text-sm uppercase tracking-wide font-semibold">{property.type}</div>
          <h1 className="text-4xl font-heading font-bold mb-4 text-primary">{property.name}</h1>
          <div className="text-gray-600 mb-6 flex items-center">
            <FaMapMarkerAlt className="text-secondary mr-2 text-lg" />
            <p className="text-lg">
              {property.location.city}, {property.location.state}
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl mb-6">
            <h3 className="text-lg font-bold mb-4 text-primary">Rates & Options</h3>
            <div className="flex flex-col md:flex-row justify-around gap-4">
              <div className="flex items-center justify-between md:flex-col md:justify-center p-4 bg-white rounded-lg shadow-sm w-full">
                <div className="text-gray-500 font-medium mb-1">Nightly</div>
                <div className="text-2xl font-bold text-primary">
                  {property.rates.nightly ? (
                    `$${property.rates.nightly.toLocaleString()}`
                  ) : (
                    <FaTimes className="text-red-400" />
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between md:flex-col md:justify-center p-4 bg-white rounded-lg shadow-sm w-full border-2 border-secondary/20">
                <div className="text-gray-500 font-medium mb-1">Weekly</div>
                <div className="text-2xl font-bold text-secondary">
                  {property.rates.weekly ? (
                    `$${property.rates.weekly.toLocaleString()}`
                  ) : (
                    <FaTimes className="text-red-400" />
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between md:flex-col md:justify-center p-4 bg-white rounded-lg shadow-sm w-full">
                <div className="text-gray-500 font-medium mb-1">Monthly</div>
                <div className="text-2xl font-bold text-primary">
                  {property.rates.monthly ? (
                    `$${property.rates.monthly.toLocaleString()}`
                  ) : (
                    <FaTimes className="text-red-400" />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-primary border-b pb-2">Description</h3>
            <div className="flex gap-8 text-gray-600 mb-6 text-lg">
              <p className="flex items-center gap-2">
                <FaBed className="text-secondary" /> {property.beds} <span className="hidden sm:inline">Beds</span>
              </p>
              <p className="flex items-center gap-2">
                <FaBath className="text-secondary" /> {property.baths} <span className="hidden sm:inline">Baths</span>
              </p>
              <p className="flex items-center gap-2">
                <FaRulerCombined className="text-secondary" />
                {property.square_feet} <span className="hidden sm:inline">sqft</span>
              </p>
            </div>
            <p className="text-gray-600 leading-relaxed">{property.description}</p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-primary border-b pb-2">Amenities</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-4 list-none">
              {property.amenities.map((amenity, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <FaCheck className="mr-2 text-green-500 flex-shrink-0" />
                  {amenity}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="md:col-span-1">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
          <h3 className="text-xl font-bold mb-6 text-primary">Location</h3>
          <div className="h-64 rounded-xl overflow-hidden shadow-inner">
             <PropertyMap property={property} />
          </div>
        </div>
      </div>
    </main>
  );
};
export default PropertyDetails;
