import React from "react";
import PropertySearch from "./PropertySearch";

const Hero = () => {
  return (
    <section className="relative h-[600px] flex flex-col justify-center items-center text-center mb-4">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
        }}
      ></div>
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl font-heading drop-shadow-lg">
          Find The Perfect Rental
        </h1>
        <p className="my-4 text-xl text-gray-200 drop-shadow-md max-w-2xl">
          Discover the perfect property that suits your needs with our premium selection of homes and apartments.
        </p>
        <PropertySearch />
      </div>
    </section>
  );
};

export default Hero;
