import { twMerge } from 'tailwind-merge';

interface LoadingSkeletonProps {
  className?: string;
}

export function LoadingSkeleton({ className }: LoadingSkeletonProps) {
  return (
    <div className={twMerge('animate-pulse', className)}>
      <div className="flex justify-between items-center mb-6">
        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        <div className="h-10 bg-gray-200 rounded w-32"></div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="h-8 bg-gray-200 rounded w-32"></div>
            <div className="h-8 bg-gray-200 rounded w-40"></div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-grow h-10 bg-gray-200 rounded"></div>
            <div className="flex-shrink-0 h-10 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3 lg:w-1/4">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="border-b border-gray-200 p-4 last:border-b-0"
                >
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="md:w-2/3 lg:w-3/4">
          <div className="bg-gray-50 rounded-lg p-8 h-64 flex items-center justify-center">
            <div className="text-center">
              <div className="h-6 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-64 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
