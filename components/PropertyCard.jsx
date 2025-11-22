import React from "react";
import Image from "next/image";
import { FaBed, FaBath, FaRulerCombined, FaMoneyBill, FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";

const PropertyCard = ({ property, index }) => {
  const getRateDisplay = () => {
    const { rates } = property;
    if (rates.monthly) {
      return `$${rates.monthly.toLocaleString()}/mo`;
    } else if (rates.weekly) {
      return `$${rates.weekly.toLocaleString()}/wk`;
    } else if (rates.nightly) {
      return `$${rates.nightly.toLocaleString()}/night`;
    }
  };
  return (
    <div className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white border border-gray-100 relative overflow-hidden group">
      <div className="relative h-[250px] overflow-hidden">
        <Image
          src={property.images[0]}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-secondary font-bold shadow-sm">
          {getRateDisplay()}
        </div>
      </div>
      
      <div className="p-5">
        <div className="mb-4">
          <div className="text-gray-500 text-sm mb-1 uppercase tracking-wide font-semibold">{property.type}</div>
          <h3 className="text-xl font-heading font-bold text-primary truncate">{property.name}</h3>
        </div>

        <div className="flex justify-between gap-4 text-gray-600 mb-4 text-sm">
          <p className="flex items-center gap-1">
            <FaBed /> {property.beds} <span className="hidden lg:inline">Beds</span>
          </p>
          <p className="flex items-center gap-1">
            <FaBath /> {property.baths} <span className="hidden lg:inline">Baths</span>
          </p>
          <p className="flex items-center gap-1">
            <FaRulerCombined />
            {property.square_feet} <span className="hidden lg:inline">sqft</span>
          </p>
        </div>

        <div className="border-t border-gray-100 my-4"></div>

        <div className="flex flex-col lg:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <FaMapMarkerAlt className="text-secondary" />
            <span className="truncate max-w-[150px]">
              {property.location.city}, {property.location.state}
            </span>
          </div>
          <Link
            href={`/properties/${property._id}`}
            className="w-full lg:w-auto bg-primary hover:bg-primary-light text-white px-5 py-2 rounded-lg text-center text-sm font-medium transition-colors"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
