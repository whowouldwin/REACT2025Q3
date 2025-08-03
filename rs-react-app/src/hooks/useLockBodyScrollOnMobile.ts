import { useEffect } from 'react';

export function useLockBodyScrollOnMobile(shouldLock: boolean) {
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1023px)');

    const lock = () => {
      if (shouldLock && mediaQuery.matches) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    };

    lock();

    mediaQuery.addEventListener('change', lock);

    return () => {
      document.body.style.overflow = '';
      mediaQuery.removeEventListener('change', lock);
    };
  }, [shouldLock]);
}
