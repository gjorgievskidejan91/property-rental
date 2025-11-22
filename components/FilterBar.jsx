"use client";
import { useState } from "react";

const FilterBar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    hasWifi: false,
    hasParking: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newFilters = {
      ...filters,
      [name]: type === "checkbox" ? checked : value,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-100 mb-6">
      <h3 className="text-lg font-heading font-bold mb-4 text-primary">Filter Properties</h3>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
          <div className="flex gap-2">
            <input
              type="number"
              name="minPrice"
              placeholder="Min"
              value={filters.minPrice}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <input
              type="number"
              name="maxPrice"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>
        
        <div className="flex-1 flex items-center gap-4 pt-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="hasWifi"
              checked={filters.hasWifi}
              onChange={handleChange}
              className="w-5 h-5 text-primary rounded focus:ring-primary"
            />
            <span className="text-gray-700">Wifi</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="hasParking"
              checked={filters.hasParking}
              onChange={handleChange}
              className="w-5 h-5 text-primary rounded focus:ring-primary"
            />
            <span className="text-gray-700">Parking</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
