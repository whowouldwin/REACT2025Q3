import { Suspense, type PropsWithChildren } from 'react';
import { LoadingSkeleton } from '@/shared/ui/loading-skeleton';
import { ErrorBoundary } from '@/shared/ui/error-boundary';

export function Boundary({ children }: PropsWithChildren) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSkeleton className="max-w-7xl mx-auto" />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}
