import { withContentlayer } from 'next-contentlayer'

import './env.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
      'files.stripe.com',
      'images.unsplash.com',
      'cdn.pixabay.com'
    ]
  },
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['@prisma/client']
  }
}

export default withContentlayer(nextConfig)
