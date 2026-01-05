/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "plus.unsplash.com",
                pathname: "**",
            },
        ],
    },
    // Performance optimizations
    experimental: {
        // Optimize CSS
        optimizeCss: true,
    },
    // Enable compression
    compress: true,
    // Reduce powered by header
    poweredByHeader: false,
};

module.exports = nextConfig;


