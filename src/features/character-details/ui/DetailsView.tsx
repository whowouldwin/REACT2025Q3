import { type FC } from 'react';
import { useSearchParams } from 'react-router-dom';

import { CharacterDetails } from '@/entities/character/ui/CharacterDetails.tsx';
import { CloseButton } from '@/shared/close-button/ui/CloseButton.tsx';
import { ErrorMessage } from '@/shared/error-message/ui/ErrorMessage.tsx';
import { OverlayWrapper } from '@/shared/overlay-wrapper/ui/OverlayWrapper.tsx';
import { Spinner } from '@/shared/spinner/ui/Spinner.tsx';
import { useGetCharacterByIdQuery } from '@/utils/api/rickAndMorty.ts';
import { useLockBodyScrollOnMobile } from '@/utils/hooks/useLockBodyScrollOnMobile.ts';

export const DetailsView: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const detailsId = searchParams.get('details');
  useLockBodyScrollOnMobile(!!detailsId);

  const {
    data: character,
    isLoading,
    isError,
  } = useGetCharacterByIdQuery(detailsId ?? '', {
    skip: !detailsId,
  });

  const handleClose = () => {
    searchParams.delete('details');
    setSearchParams(searchParams);
  };

  if (!detailsId) return null;

  return (
    <OverlayWrapper onClickOutside={handleClose}>
      <CloseButton onClick={handleClose} />
      {isLoading && <Spinner message="Loading character details..." />}
      {isError && (
        <ErrorMessage message="Character information could not be loaded." />
      )}
      {character && <CharacterDetails character={character} />}
    </OverlayWrapper>
  );
};
