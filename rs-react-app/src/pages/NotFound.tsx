import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => {
  return (
    <div className="container mx-auto pt-40 pb-10 px-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-2xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-red-400 mb-6">404</h1>
        <h2 className="text-3xl font-semibold text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-300 mb-8">
          The page you are looking for doesn&#39;t exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
