/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
            protocol: "https",
            hostname: "images.pexels.com",
            },
            {
            protocol: "https",
            hostname: "static.wixstatic.com",
            },
            {
            protocol: "https",
            hostname: "people.pic1.co",
            },
            {
            protocol: "https",
            hostname: "app-uploads-cdn.fera.ai",
            },
        ],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
      },
};

export default nextConfig;
