import { Suspense, type FC } from 'react';

import { TotalPage } from '../features/search-result/TotalPage';

export const Home =  (props: {
  searchParams?: {
    search?: string;
    page?: string;
    name?: string;
    details?: string;
  };
}) => {
  const searchParams = props.searchParams;
  const search = searchParams?.search || '';
  const currentPage = Number(searchParams?.page) || 1;

  const nameFilter = searchParams?.name || '';


  const detailsId = searchParams?.details;

  return (
    <div className="container mx-auto pt-40 pb-10 px-4 relative">
      <Suspense fallback={<div className="fixed top-0 left-0 right-0 h-2 bg-blue-200 z-50">
          <div
            className="h-full bg-blue-600 animate-pulse w-100"
            style={{ width: '100%' }}
          ></div>
        </div>} >
      <div className="flex justify-end mb-4">
        <button
          // onClick={() => console.log('onClick')}
          className={`py-2 px-4 rounded-lg bg-accent cursor-pointer text-white`}
        >
          {'Refresh'}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 transition-all duration-300 ease-in-out">
        <div
          className={`transition-all duration-300 ease-in-out ${detailsId ? 'lg:w-2/3' : 'w-full'}`}
        >
        <TotalPage name={search} page={currentPage} />
        </div>

        {detailsId && (
          <div className="relative lg:w-1/3 transition-all duration-300 ease-in-out ml-4">
            {/* <DetailsView /> */}
          </div>
        )}
      </div>
      </Suspense>
    </div>
  );
};

export default Home;
