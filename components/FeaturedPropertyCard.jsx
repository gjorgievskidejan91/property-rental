import Image from "next/image";
import Link from "next/link";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMoneyBill,
  FaMapMarkerAlt,
} from "react-icons/fa";

const FeaturedPropertyCard = ({ property }) => {
  const getRateDisplay = () => {
    const { rates } = property;

    if (rates.monthly) {
      return `${rates.monthly.toLocaleString()}/mo`;
    } else if (rates.weekly) {
      return `${rates.weekly.toLocaleString()}/wk`;
    } else if (rates.nightly) {
      return `${rates.nightly.toLocaleString()}/night`;
    }
  };
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 relative flex flex-col md:flex-row border border-gray-100 overflow-hidden group">
      <div className="relative w-full md:w-2/5 h-[250px] md:h-auto">
        <Image
          src={property.images[0]}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6 flex flex-col justify-between w-full md:w-3/5">
        <div>
          <div className="flex justify-between items-start mb-2">
            <div className="text-gray-500 text-sm uppercase tracking-wide font-semibold">{property.type}</div>
            <div className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm font-bold">
              {getRateDisplay()}
            </div>
          </div>
          <h3 className="text-2xl font-heading font-bold text-primary mb-4">{property.name}</h3>
          
          <div className="flex gap-6 text-gray-600 mb-6">
            <p className="flex items-center gap-2">
              <FaBed /> {property.beds} <span className="hidden lg:inline"> Beds</span>
            </p>
            <p className="flex items-center gap-2">
              <FaBath /> {property.baths} <span className="hidden lg:inline"> Baths</span>
            </p>
            <p className="flex items-center gap-2">
              <FaRulerCombined />
              {property.square_feet} <span className="hidden lg:inline"> sqft</span>
            </p>
          </div>

          <div className="flex gap-4 text-green-700 text-sm mb-6">
            {property.rates.nightly && (
              <p className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded">
                <FaMoneyBill /> Nightly
              </p>
            )}

            {property.rates.weekly && (
              <p className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded">
                <FaMoneyBill /> Weekly
              </p>
            )}

            {property.rates.monthly && (
              <p className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded">
                <FaMoneyBill /> Monthly
              </p>
            )}
          </div>
        </div>

        <div>
          <div className="border-t border-gray-100 mb-4"></div>

          <div className="flex flex-col lg:flex-row justify-between items-center gap-3">
            <div className="flex items-center gap-2 text-gray-600">
              <FaMapMarkerAlt className="text-secondary" />
              <span>
                {property.location.city}, {property.location.state}
              </span>
            </div>
            <Link
              href={`/properties/${property._id}`}
              className="w-full lg:w-auto bg-primary hover:bg-primary-light text-white px-6 py-2 rounded-lg text-center font-medium transition-colors"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPropertyCard;
