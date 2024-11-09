/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import('./src/env.js');

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'e9pb986jsmo6fpka.public.blob.vercel-storage.com/',
        port: '',
        search: '',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default config;
