/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  },
  output:'export',
  images:{
    unoptimized: true
  },
  trailingSlash: true 
}

module.exports = nextConfig
