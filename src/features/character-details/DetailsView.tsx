'use client';

import { useSearchParams } from 'next/dist/client/components/navigation';

import { CharacterDetails } from '../../entities/character';
import { usePathname, useRouter } from '../../i18n/navigation';
import { CloseButton } from '../../shared/close-button';
import { OverlayWrapper } from '../../shared/overlay-wrapper';
import { useLockBodyScrollOnMobile } from '../../utils/hooks';
import { Character } from '../../utils/types/rickAndMorty';

export const DetailsView = ({ character }: { character: Character }) => {
  const searchParams = useSearchParams();

  const detailsId = searchParams?.get('details');
  const pathname = usePathname();
  const { replace } = useRouter();
  useLockBodyScrollOnMobile(Boolean(detailsId));
  if (!detailsId) return null;

  const handleClose = () => {
    const params = new URLSearchParams(searchParams || '');
    params.delete('details');
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <OverlayWrapper onClickOutside={handleClose}>
      <CloseButton onClick={handleClose} />
      {character && <CharacterDetails character={character} />}
    </OverlayWrapper>
  );
};
