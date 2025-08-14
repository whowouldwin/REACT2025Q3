import { skipToken } from '@reduxjs/toolkit/query';
import { type FC } from 'react';
import { useSearchParams } from 'react-router-dom';

import { CharacterDetails } from '@/entities/character';
import { CloseButton } from '@/shared/close-button';
import { ErrorMessage } from '@/shared/error-message';
import { OverlayWrapper } from '@/shared/overlay-wrapper';
import { Spinner } from '@/shared/spinner';
import { useGetCharacterByIdQuery } from '@/utils/api';
import { useLockBodyScrollOnMobile } from '@/utils/hooks';

export const DetailsView: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const detailsId = searchParams.get('details');
  useLockBodyScrollOnMobile(Boolean(detailsId));

  const {
    data: character,
    isLoading,
    isError,
  } = useGetCharacterByIdQuery(detailsId ?? skipToken);

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
