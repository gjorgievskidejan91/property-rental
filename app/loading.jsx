import SkeletonCard from "@/components/SkeletonCard";

const LoadingPage = () => {
  return (
    <section className="px-4 py-6 bg-background-light min-h-screen">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoadingPage;
