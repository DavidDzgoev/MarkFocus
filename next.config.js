/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Отключаем серверные функции для статического экспорта
  experimental: {
    appDir: false
  }
}

module.exports = nextConfig
