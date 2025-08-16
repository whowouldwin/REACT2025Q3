import { SkeletonList } from "../../shared/skeleton/SkeletonList";
import { Character } from "../../utils/types/rickAndMorty";
import { ErrorMessage } from "./ErrorMessage";
import { getGridClass } from "./getGridClass";
import { ResultsCard } from "./ResultsCard";



interface Props {
  data: Character[];
  loading: boolean;
  error: string | null;
  skeletonCount: number;
  detailsOpen: boolean;
  selectedId: string | null;
}

export const ResultsListContent: React.FC<Props> = ({
  data,
  loading,
  error,
  skeletonCount,
  detailsOpen,
  selectedId,
}) => {
  if (loading && data.length === 0)
    return <SkeletonList count={skeletonCount} detailsOpen={detailsOpen} />;

  if (error) return <ErrorMessage message={error} />;

  return (
    <div className={getGridClass(detailsOpen)}>
      {data.map((item) => (
        <ResultsCard
          key={item.id}
          character={item}
          isSelected={selectedId === item.id.toString()}
        />
      ))}
    </div>
  );
};
