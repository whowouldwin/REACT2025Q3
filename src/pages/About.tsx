import { useTranslations } from 'next-intl';
import type { FC } from 'react';

export const About: FC = () => {
  const t = useTranslations('About');
  return (
    <div className="container mx-auto pt-40 pb-10 px-4">
      <div
        className="p-8 rounded-lg shadow-lg max-w-2xl mx-auto border"
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          borderColor: 'var(--color-border)',
        }}
      >
        <h1
          className="text-3xl font-bold mb-6"
          style={{ color: 'var(--color-accent)' }}
        >
          {t('aboutApp')}
        </h1>
        <div className="space-y-4" style={{ color: 'var(--text-primary)' }}>
          <p>{t('intro')}</p>
          <p>
            {t('coursePrefix')}{' '}
            <a
              href="https://rs.school/courses/reactjs"
              className="hover:underline"
              style={{ color: 'var(--color-accent)' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('courseText')}
            </a>
          </p>

          <div
            className="pt-4 mt-4 border-t"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <h2
              className="text-xl font-semibold mb-2"
              style={{ color: 'var(--color-accent)' }}
            >
              {t('authorInfo')}
            </h2>
            <p>
              <span className="font-medium">{t('authorLabel')}</span> {t('authorName')}
            </p>
            <p>
              <span className="font-medium">{t('githubLabel')}</span>{' '}
              <a
                href="https://github.com/whowouldwin/REACT2025Q3"
                className="hover:underline"
                style={{ color: 'var(--color-accent)' }}
              >
                {t('repoText')}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
