import { type FC } from 'react';
import { Link } from 'react-router-dom';

export const NotFound: FC = () => {
  return (
    <div className="container mx-auto pt-40 pb-10 px-4">
      <div
        className="p-8 rounded-lg shadow-lg max-w-2xl mx-auto text-center"
        style={{
          backgroundColor: 'var(--bg-secondary)',
        }}
      >
        <h1
          className="text-5xl font-bold mb-6"
          style={{ color: 'var(--error-boundary-text)' }}
        >
          404
        </h1>
        <h2
          className="text-3xl font-semibold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Page Not Found
        </h2>
        <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>
          The page you are looking for doesn&#39;t exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block font-medium py-2 px-6 rounded-lg transition-colors"
          style={{
            backgroundColor: 'var(--accent-color)',
            color: 'white',
          }}
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
