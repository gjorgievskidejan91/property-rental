"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { fetchPropertyById } from "@/utils/requests";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertyDetails from "@/components/PropertyDetails";
import BookmarkButton from "@/components/BookmarkButton";
import Spinner from "@/components/Spinner";
import PropertyImages from "@/components/PropertyImages";
import ShareButtons from "@/components/ShareButton";
import PropertyContactForm from "@/components/PropertyContactForm";

const PropertyPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;

      try {
        const property = await fetchPropertyById(id);
        setProperty(property);
      } catch (error) {
        console.error("Error fetching property data", error);
      } finally {
        setLoading(false);
      }
    };
    if (property === null) {
      fetchProperty();
    }
  }, [id, property]);

  return (
    <>
      {!loading && <PropertyHeaderImage image={property.images[0]} />}

      {!loading && (
        <section>
          <div className="container m-auto py-6 px-6">
            <Link
              href="/properties"
              className="text-blue-500 hover:text-blue-600 flex items-center"
            >
              <FaArrowLeft className="mr-2" /> Back to Properties
            </Link>
          </div>
        </section>
      )}

      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <section className="bg-blue-50">
          <div className="container m-auto py-10 px-6">
            <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
              <PropertyDetails property={property} />

              {/* <!-- Sidebar --> */}
              <aside className="space-y-4">
                <BookmarkButton property={property} />
                <ShareButtons property={property} />
                <PropertyContactForm property={property} />
              </aside>
            </div>
          </div>
        </section>
      )}
      {!loading && <PropertyImages images={property.images} />}
    </>
  );
};

export default PropertyPage;
