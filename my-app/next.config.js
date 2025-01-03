/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['ewrtlcqucjbafojeyjem.supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ewrtlcqucjbafojeyjem.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    loader: 'default',
    path: '',
    unoptimized: true
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
          },
        ],
      },
    ]
  },  
  eslint: {
    ignoreDuringBuilds: true
  }
}

module.exports = nextConfig