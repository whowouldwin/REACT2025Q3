import { type FC, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';


import { ErrorBoundary } from '../features/error-boundary/ErrorBoundary';
import { FallbackUI } from '../shared/fallback-ui/FallbackUI';
import { useGetCharactersQuery } from '../utils/api/rickAndMorty';
import { SearchResults } from '../widgets/search-results/SearchResults';
import { DetailsView } from '../features/character-details/DetailsView';

export const Home: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const nameFilter = searchParams.get('name') || '';

  const { data, isLoading, refetch, isFetching } = useGetCharactersQuery({
    name: nameFilter,
    page: currentPage,
  });

  useEffect(() => {
    if (data?.info?.pages && currentPage > data.info.pages) {
      setSearchParams((prev) => {
        prev.set('page', '1');
        return prev;
      });
    }
  }, [data, currentPage, setSearchParams]);

  const detailsId = searchParams.get('details');

  return (
    <div className="container mx-auto pt-40 pb-10 px-4 relative">
      {(isLoading || isFetching) && (
        <div className="fixed top-0 left-0 right-0 h-2 bg-blue-200 z-50">
          <div
            className="h-full bg-blue-600 animate-pulse w-100"
            style={{ width: '100%' }}
          ></div>
        </div>
      )}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => refetch()}
          className={`py-2 px-4 rounded-lg bg-accent cursor-pointer text-white ${isFetching ? 'opacity-70' : ''}`}
          disabled={isFetching}
        >
          {isFetching ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 transition-all duration-300 ease-in-out">
        <div
          className={`transition-all duration-300 ease-in-out ${detailsId ? 'lg:w-2/3' : 'w-full'}`}
        >
          <ErrorBoundary fallback={<FallbackUI />}>
            <SearchResults
              data={data?.results ?? []}
              loading={isLoading || isFetching}
              skeletonCount={10}
              page={currentPage}
              totalPages={data?.info?.pages ?? 1}
              onPrev={() =>
                setSearchParams((prev) => {
                  prev.set('page', String(currentPage - 1));
                  return prev;
                })
              }
              onNext={() =>
                setSearchParams((prev) => {
                  prev.set('page', String(currentPage + 1));
                  return prev;
                })
              }
              detailsOpen={!!detailsId}
              error={null}
              crash={false}
            />
          </ErrorBoundary>
        </div>

        {detailsId && (
          <div className="relative lg:w-1/3 transition-all duration-300 ease-in-out ml-4">
            <DetailsView />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
