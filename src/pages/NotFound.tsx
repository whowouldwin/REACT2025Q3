

import Link from 'next/link';
import { type FC } from 'react';
import { twMerge } from 'tailwind-merge';

export const NotFound: FC = () => {
  return (
    <div className="container mx-auto pt-40 pb-10 px-4">
      <div
        className={twMerge(
          'p-8 rounded-lg shadow-lg max-w-2xl mx-auto text-center bg-bg-secondary'
        )}
      >
        <h1 className="text-5xl font-bold mb-6 text-error-text">404</h1>
        <h2 className="text-3xl font-semibold mb-4 text-text-primary">
          Page Not Found
        </h2>
        <p className="mb-8 text-text-secondary">
          The page you are looking for doesn&#39;t exist or has been moved.
        </p>
        <Link
          href="/"
          className={twMerge(
            'inline-block font-medium py-2 px-6 rounded-lg transition-colors',
            'bg-accent text-white hover:opacity-90 focus:outline-none focus:ring ring-offset-2'
          )}
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
