
import { fetchData } from "../../utils/api/rickAndMorty";
import { SearchResults } from "../../widgets/search-results/SearchResults";


export const TotalPage = async ( {name, page}:{ name: string; page: number }) => {
  const data = await fetchData({name, page})
  return (
      <SearchResults
        data={data?.results ?? []}
        skeletonCount={10}
        page={page}
        totalPages={data?.info?.pages ?? 1}
        // onPrev={() => {
        //   // URLSearchParams((prev) => {
        //   //   prev.set('page', String(page - 1));
        //   //   return prev;
        //   // })
        // }
        // }
        // onNext={() => {
        //   // URLSearchParams((prev) => {
        //   //   prev.set('page', String(page + 1));
        //   //   return prev;
        //   // })
        // }
        // }
        detailsOpen={false}
        error={null}
        crash={false}
      />
  
  )
}

