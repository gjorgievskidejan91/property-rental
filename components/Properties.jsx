"use client";
import { useState, useEffect } from "react";
import PropertyCard from "@/components/PropertyCard";
import Spinner from "./Spinner";
import Pagination from "./Pagination";
import FilterBar from "./FilterBar";
import SkeletonCard from "./SkeletonCard";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6); // Increased page size for better grid view
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(
          `/api/properties?page=${page}&pageSize=${pageSize}`
        );
        if (res.status === 200) {
          const data = await res.json();
          setProperties(data.properties);
          setFilteredProperties(data.properties);
          setTotalItems(data.total);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [page, pageSize]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleFilterChange = (filters) => {
    let tempProperties = [...properties];

    if (filters.minPrice) {
      tempProperties = tempProperties.filter(
        (p) => (p.rates.monthly || p.rates.weekly * 4 || p.rates.nightly * 30) >= parseInt(filters.minPrice)
      );
    }
    if (filters.maxPrice) {
      tempProperties = tempProperties.filter(
        (p) => (p.rates.monthly || p.rates.weekly * 4 || p.rates.nightly * 30) <= parseInt(filters.maxPrice)
      );
    }
    // Note: Amenities filtering would require checking the amenities array in the property object.
    // Assuming property.amenities is an array of strings.
    if (filters.hasWifi) {
      tempProperties = tempProperties.filter((p) => 
        p.amenities && p.amenities.some(a => a.toLowerCase().includes('wifi'))
      );
    }
    if (filters.hasParking) {
      tempProperties = tempProperties.filter((p) => 
        p.amenities && p.amenities.some(a => a.toLowerCase().includes('parking'))
      );
    }

    setFilteredProperties(tempProperties);
  };

  return loading ? (
    <section className="px-4 py-6 bg-background-light min-h-screen">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <h1 className="text-3xl font-heading font-bold mb-6 text-primary">Browse Properties</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    </section>
  ) : (
    <section className="px-4 py-6 bg-background-light min-h-screen">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <h1 className="text-3xl font-heading font-bold mb-6 text-primary">Browse Properties</h1>
        
        <FilterBar onFilterChange={handleFilterChange} />

        {filteredProperties.length === 0 ? (
          <p className="text-gray-500 text-lg">No properties found matching your criteria.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property, index) => (
              <PropertyCard property={property} key={index} />
            ))}
          </div>
        )}
        {totalItems > pageSize && (
          <div className="mt-10">
            <Pagination
              page={page}
              pageSize={pageSize}
              totalItems={totalItems}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Properties;
