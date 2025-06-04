import type { HTMLAttributes } from 'react';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'rectangular' | 'circular' | 'text';
  width?: string | number;
  height?: string | number;
  className?: string;
  animation?: 'pulse' | 'wave' | 'none';
}

export const Skeleton = ({
  variant = 'rectangular',
  width,
  height,
  className = '',
  animation = 'pulse',
  ...props
}: SkeletonProps) => {
  const baseClasses = 'bg-[#1B254B]';
  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer',
    none: ''
  };
  const variantClasses = {
    rectangular: 'rounded-xl',
    circular: 'rounded-full',
    text: 'rounded-md'
  };

  const style = {
    width: width,
    height: height
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
      style={style}
      {...props}
    />
  );
};

export const SkeletonGroup = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      {children}
    </div>
  );
};

// Componentes predefinidos comunes
export const CardSkeleton = () => (
  <div className="bg-[#111C44] rounded-2xl p-6 h-full">
    <div className="flex justify-between items-start">
      <div className="space-y-3 w-full">
        <Skeleton variant="text" className="h-6 w-1/3" />
        <Skeleton variant="text" className="h-4 w-1/2" />
      </div>
      <Skeleton variant="circular" className="w-12 h-12" />
    </div>
  </div>
);

export const TransactionSkeleton = () => (
  <div className="flex items-center justify-between py-4">
    <div className="flex items-center gap-4">
      <Skeleton variant="circular" className="w-10 h-10" />
      <div className="space-y-2">
        <Skeleton variant="text" className="h-4 w-32" />
        <Skeleton variant="text" className="h-3 w-24" />
      </div>
    </div>
    <Skeleton variant="text" className="h-4 w-20" />
  </div>
);

export const WalletCardSkeleton = () => (
  <div className="bg-[#111C44] rounded-2xl p-6">
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <Skeleton variant="text" className="h-6 w-24" />
        <div className="flex -space-x-3">
          <Skeleton variant="circular" className="w-7 h-7" />
          <Skeleton variant="circular" className="w-7 h-7" />
        </div>
      </div>
      <Skeleton variant="text" className="h-8 w-48" />
      <div className="flex gap-6">
        <div className="space-y-1">
          <Skeleton variant="text" className="h-3 w-20" />
          <Skeleton variant="text" className="h-4 w-16" />
        </div>
        <div className="space-y-1">
          <Skeleton variant="text" className="h-3 w-20" />
          <Skeleton variant="text" className="h-4 w-16" />
        </div>
      </div>
    </div>
  </div>
); 