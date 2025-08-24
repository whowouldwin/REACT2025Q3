import { useEffect, useState } from 'react';
import { Modal } from '@/widgets/modal/ui/Modal';
import { cx } from '@/shared/lib/a11y/cx/cx';
import { UncontrolledForm } from '@/features/auth-form/uncontrolled/ui/UncontrolledForm.tsx';
import { ControlledForm } from '@/features/auth-form/react-hook-form/ui/ControlledForm.tsx';
import { RegistrationTile } from '@/widgets/registration-tile/RegistrationTile.tsx';
import {
  registrationActions,
  selectRegistrationEntries,
} from '@/entities/registration';
import { selectJustAddedId } from '@/entities/registration/model/selectors.ts';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '@/app/store.ts';

export function MainPage() {
  const [open, setOpen] = useState<null | 'uncontrolled' | 'rhf'>(null);
  const dispatch = useDispatch<AppDispatch>();
  const entries = useSelector(selectRegistrationEntries);
  const justAddedId = useSelector(selectJustAddedId);

  useEffect(() => {
    if (!justAddedId) return;
    const t = setTimeout(
      () => dispatch(registrationActions.clearJustAdded()),
      3000
    );
    return () => clearTimeout(t);
  }, [justAddedId, dispatch]);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Main Page</h1>

      <div className="flex gap-3">
        <button
          className={cx(
            'rounded-xl px-4 py-2 text-white',
            open === 'uncontrolled'
              ? 'bg-brand'
              : 'bg-gray-500 hover:bg-gray-600'
          )}
          onClick={() => setOpen('uncontrolled')}
        >
          Open uncontrolled
        </button>

        <button
          className={cx(
            'rounded-xl px-4 py-2 text-white',
            open === 'rhf' ? 'bg-brand' : 'bg-gray-500 hover:bg-gray-600'
          )}
          onClick={() => setOpen('rhf')}
        >
          Open RHF
        </button>
      </div>

      {entries.length === 0 ? (
        <p className="text-slate-500">No submissions yet</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {entries.map((el) => (
            <RegistrationTile
              key={el.id}
              entry={el}
              highlighted={el.id === justAddedId}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={open === 'uncontrolled'}
        onClose={() => setOpen(null)}
        title="Uncontrolled form"
      >
        <UncontrolledForm onSuccess={() => setOpen(null)} />
      </Modal>

      <Modal
        isOpen={open === 'rhf'}
        onClose={() => setOpen(null)}
        title="React Hook Form"
      >
        <ControlledForm onSuccess={() => setOpen(null)} />
      </Modal>
    </div>
  );
}
