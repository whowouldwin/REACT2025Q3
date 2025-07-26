import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="container mx-auto pt-40 pb-10 px-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-400 mb-6">
          About This App
        </h1>
        <div className="text-white space-y-4">
          <p>This is a Rick & Morty application built with React.</p>
          <div className="border-t border-gray-700 pt-4 mt-4">
            <h2 className="text-xl font-semibold text-blue-300 mb-2">
              Author Information
            </h2>
            <p>
              <span className="font-medium">Author:</span> whowouldwin
            </p>
            <p>
              <span className="font-medium">GitHub:</span>{' '}
              <a
                href="https://github.com/whowouldwin/REACT2025Q3"
                className="text-blue-400 hover:underline"
              >
                github.com/whowouldwin/REACT2025Q3
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
