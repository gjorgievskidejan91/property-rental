const SkeletonCard = () => {
  return (
    <div className="rounded-2xl shadow-lg bg-white border border-gray-100 overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="h-[250px] bg-gray-200 w-full"></div>
      
      <div className="p-5">
        {/* Type Skeleton */}
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
        {/* Title Skeleton */}
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>

        {/* Details Skeleton */}
        <div className="flex justify-between gap-4 mb-4">
          <div className="h-4 bg-gray-200 rounded w-1/5"></div>
          <div className="h-4 bg-gray-200 rounded w-1/5"></div>
          <div className="h-4 bg-gray-200 rounded w-1/5"></div>
        </div>

        <div className="border border-gray-100 mb-5"></div>

        {/* Footer Skeleton */}
        <div className="flex flex-col lg:flex-row justify-between mb-4 gap-4">
          <div className="flex align-middle gap-2 mb-4 lg:mb-0">
            <div className="h-4 bg-gray-200 rounded w-4"></div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded w-full lg:w-[120px]"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
