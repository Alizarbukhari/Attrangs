/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allowing the Supabase domain
    domains: ['ewrtlcqucjbafojeyjem.supabase.co'],

    // Remote patterns to match Supabase image URLs
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ewrtlcqucjbafojeyjem.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],

    // Default loader is sufficient; no need to change unless using a custom loader
    loader: 'default',

    // Remove unoptimized if you want Next.js to optimize images
    unoptimized: false,
  },

  // Custom headers (CORS headers, useful for API routes)
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ];
  },

  // Ignore ESLint during builds (useful for CI/CD pipelines, but ideally fix linting issues)
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
