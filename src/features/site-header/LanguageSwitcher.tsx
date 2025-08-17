'use client';
import { useLocale } from 'next-intl';
import { type FC } from 'react';
import { twMerge } from 'tailwind-merge';

import { Link, usePathname } from '../../i18n/navigation';
import { routing } from '../../i18n/routing';

export const LanguageSwitcher: FC = () => {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-2">
      {routing.locales.map((code) => {
        const isActive = code === locale;
        return (
          <Link
            key={code}
            href={pathname}
            locale={code}
            aria-current={isActive ? 'true' : undefined}
            className={twMerge(
              'px-2 py-1 rounded-md text-sm border',
              'bg-bg-secondary text-text-primary border-border',
              'hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-accent',
              isActive ? 'opacity-100 font-semibold' : 'opacity-80'
            )}
          >
            {code.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
};
