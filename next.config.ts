import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  // output: 'export',
  distDir: './dist',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  images: {
    remotePatterns: [new URL('https://rickandmortyapi.com/api/character/**')],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
