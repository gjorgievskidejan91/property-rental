"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import profileDefault from "@/assets/images/profile.png"; // Default profile image
import Spinner from "@/components/Spinner"; // Spinner component for loading state
import { toast } from "react-toastify";

// ProfilePage component definition
const ProfilePage = () => {
  // Retrieving session data using useSession hook from next-auth/react
  const { data: session } = useSession();

  // Extracting user data from session object
  const profileImage = session?.user?.image; // User profile image URL
  const profileName = session?.user?.name; // User's name
  const profileEmail = session?.user?.email; // User's email
  const userId = session?.user?.id; // User's ID

  // State variables for user properties and loading state
  const [properties, setProperties] = useState([]); // Array of user properties
  const [loading, setLoading] = useState(true); // Loading state for fetching properties

  // useEffect hook to fetch user properties when session is available or updated
  useEffect(() => {
    // Asynchronous function to fetch user properties from the server
    const fetchUserProperties = async (userId) => {
      // If userId is not available, return
      if (!userId) {
        return;
      }

      try {
        // Fetch user properties from the server
        const res = await fetch(`/api/properties/user/${userId}`);

        // If the request is successful (status code 200), extract the data
        if (res.status === 200) {
          const data = await res.json();
          // Update the properties state with fetched data
          setProperties(data);
        }
      } catch (error) {
        // Log any errors that occur during the fetch process
        console.log(error);
      } finally {
        // Set loading state to false regardless of success or failure
        setLoading(false);
      }
    };

    // Fetch user properties when session is available or updated
    if (session?.user?.id) {
      fetchUserProperties(session.user.id);
    }
  }, [session]); // Dependence on the session object

  // Function to handle deletion of a property
  const handleDeleteProperty = async (propertyId) => {
    // Prompt the user for confirmation before deleting the property
    const confirmed = window.confirm(
      "Are you sure you want to delete this property?"
    );

    // If user cancels deletion, return
    if (!confirmed) return;

    try {
      // Send a DELETE request to the server to delete the property
      const res = await fetch(`/api/properties/${propertyId}`, {
        method: "DELETE",
      });

      // If deletion is successful (status code 200), update the properties state
      if (res.status === 200) {
        // Remove the deleted property from the properties state
        const updatedProperties = properties.filter(
          (property) => property._id !== propertyId
        );
        // Update the properties state without the deleted property
        setProperties(updatedProperties);
        toast.success("Property deleted successfully");

        // Log a success message to the console
        console.log("Property Deleted");
      } else {
        // Log an error message if deletion fails
        toast.delete("Failed to delete property");
      }
    } catch (error) {
      // Log any errors that occur during the deletion process
      console.log(error);
    }
  };

  return (
    <>
      <section className="bg-blue-50">
        <div className="container m-auto py-24">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
            <div className="flex flex-col md:flex-row">
              {/* Profile Information */}
              <div className="md:w-1/4 mx-20 mt-10">
                <div className="mb-4">
                  {/* Display Profile Image */}
                  <Image
                    className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                    src={profileImage || profileDefault}
                    width={200}
                    height={200}
                    alt="User"
                  />
                </div>
                {/* Display User Name */}
                <h2 className="text-2xl mb-4">
                  <span className="font-bold block">Name: </span> {profileName}
                </h2>
                {/* Display User Email */}
                <h2 className="text-2xl">
                  <span className="font-bold block">Email: </span>{" "}
                  {profileEmail}
                </h2>
              </div>
              {/* User Listings */}
              <div className="md:w-1/3 md:pl-4">
                <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
                {/* Display Spinner during Loading */}
                {loading ? (
                  <Spinner loading={loading} />
                ) : (
                  properties.map((property) => (
                    <div key={property._id} className="mb-10">
                      {/* Link to Property Details Page */}
                      <Link href={`/properties/${property._id}`}>
                        {/* Display Property Image */}
                        <Image
                          className="h-32 w-full rounded-md object-cover"
                          src={property.images[0]}
                          alt="Property 2"
                          width={500}
                          height={100}
                        />
                      </Link>
                      <div className="mt-2">
                        {/* Display Property Name */}
                        <p className="text-lg font-semibold">{property.name}</p>
                        {/* Display Property Address */}
                        <p className="text-gray-600">
                          Address: {property.location.street}{" "}
                          {property.location.city}
                        </p>
                      </div>
                      <div className="mt-2">
                        {/* Link to Property Edit Page */}
                        <Link
                          href={`/properties/${property._id}/edit`}
                          className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                        >
                          Edit
                        </Link>
                        {/* Delete Button for Property */}
                        <button
                          className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                          type="button"
                          onClick={() => handleDeleteProperty(property._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
