import Link from "next/link";
import { FaUserPlus, FaHome, FaSignInAlt } from "react-icons/fa";

const DemoInfo = () => {
  return (
    <section className="bg-white py-12 border-b border-gray-100">
      <div className="container-xl lg:container m-auto px-4">
        <div className="bg-primary/5 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-heading font-bold text-primary mb-4">
            Welcome to PropertyPulse Demo
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            This application is a demonstration of a modern property rental platform. 
            Feel free to explore the features, register a new account, and test the functionality.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="bg-white p-4 rounded-full shadow-sm mb-4 text-secondary">
                <FaUserPlus className="text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-primary">Register & Login</h3>
              <p className="text-gray-500">
                Create an account using email/password or Google to unlock all features.
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-white p-4 rounded-full shadow-sm mb-4 text-secondary">
                <FaHome className="text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-primary">Browse Properties</h3>
              <p className="text-gray-500">
                Use our advanced filters to find properties by price, location, and amenities.
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-white p-4 rounded-full shadow-sm mb-4 text-secondary">
                <FaSignInAlt className="text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-primary">List Your Property</h3>
              <p className="text-gray-500">
                Sign in to list your own properties and manage them through your profile.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoInfo;
