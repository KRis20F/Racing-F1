import { Skeleton, SkeletonGroup } from './index';

export const StatCardSkeleton = () => (
  <div className="bg-[#111C44] rounded-[20px] p-4 relative overflow-hidden">
    <div className="flex items-center justify-between">
      <div>
        <Skeleton variant="text" className="h-8 w-24 mb-2" />
        <div className="flex items-center gap-2">
          <Skeleton variant="text" className="h-4 w-32" />
          <Skeleton variant="text" className="h-4 w-16" />
        </div>
      </div>
      <Skeleton variant="circular" className="w-12 h-12" />
    </div>
  </div>
);

export const WelcomeCardSkeleton = () => (
  <div className="rounded-[20px] bg-[#111C44] p-4 mb-4">
    <div className="flex justify-between items-start">
      <div>
        <Skeleton variant="text" className="h-4 w-32 mb-2" />
        <Skeleton variant="text" className="h-8 w-48 mb-3" />
        <Skeleton variant="text" className="h-4 w-40 mb-2" />
        <div className="space-y-2">
          <Skeleton variant="text" className="h-4 w-36" />
          <Skeleton variant="text" className="h-4 w-48" />
        </div>
      </div>
      <div className="text-right">
        <Skeleton variant="text" className="h-4 w-36 mb-2" />
        <Skeleton variant="text" className="h-6 w-24 mb-4" />
        <Skeleton variant="text" className="h-4 w-32 mb-2" />
        <Skeleton variant="text" className="h-6 w-20" />
      </div>
    </div>
  </div>
);

export const RacingPerformanceSkeleton = () => (
  <div className="bg-[#111C44] rounded-[20px] p-6">
    <Skeleton variant="text" className="h-6 w-48 mb-2" />
    <Skeleton variant="text" className="h-4 w-64 mb-6" />
    <div className="flex justify-center mb-6">
      <Skeleton variant="circular" className="w-48 h-48" />
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-[#1B254B] rounded-xl p-4">
        <Skeleton variant="text" className="h-4 w-20 mb-2" />
        <Skeleton variant="text" className="h-6 w-16" />
      </div>
      <div className="bg-[#1B254B] rounded-xl p-4">
        <Skeleton variant="text" className="h-4 w-20 mb-2" />
        <Skeleton variant="text" className="h-6 w-16" />
      </div>
    </div>
  </div>
);

export const CarCollectionSkeleton = () => (
  <div className="bg-[#111C44] rounded-[20px] p-6">
    <div className="flex justify-between items-start mb-8">
      <div>
        <Skeleton variant="text" className="h-6 w-40 mb-2" />
        <Skeleton variant="text" className="h-4 w-32" />
      </div>
      <Skeleton variant="rectangular" className="h-8 w-24 rounded-lg" />
    </div>
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-[#1B254B] rounded-xl p-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Skeleton variant="rectangular" className="w-12 h-12 rounded-lg" />
            <div>
              <Skeleton variant="text" className="h-4 w-32 mb-1" />
              <Skeleton variant="text" className="h-3 w-24" />
            </div>
          </div>
          <Skeleton variant="circular" className="w-6 h-6" />
        </div>
      ))}
    </div>
  </div>
);

export const ChartSkeleton = () => (
  <div className="bg-[#111C44] rounded-[20px] p-6">
    <div className="mb-4">
      <Skeleton variant="text" className="h-6 w-48 mb-2" />
      <Skeleton variant="text" className="h-4 w-32" />
    </div>
    <Skeleton variant="rectangular" className="w-full h-[250px] rounded-lg" />
  </div>
);

export const DashboardSkeleton = () => (
  <SkeletonGroup>
    {/* Stats Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      {[1, 2, 3, 4].map((i) => (
        <StatCardSkeleton key={i} />
      ))}
    </div>

    {/* Welcome Card */}
    <WelcomeCardSkeleton />

    {/* Racing Performance & Car Collection Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <RacingPerformanceSkeleton />
      <CarCollectionSkeleton />
    </div>

    {/* Charts Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <ChartSkeleton />
      <ChartSkeleton />
    </div>
  </SkeletonGroup>
); 