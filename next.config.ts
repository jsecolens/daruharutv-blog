import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.daruharutv.com',
          },
        ],
        destination: 'https://daruharutv.com/:path*',
        permanent: true,
      },
      {
        // 'notice'는 별도 카테고리 페이지가 없고 전용 /notice 페이지가 대신함.
        // 과거 색인된 /category/notice 404를 /notice로 영구 이전(301).
        source: '/category/notice',
        destination: '/notice',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
