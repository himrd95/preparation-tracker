/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com', 'lh3.googleusercontent.com'],
  },
  compiler: {
    styledComponents: true,
  },
}

module.exports = nextConfig
