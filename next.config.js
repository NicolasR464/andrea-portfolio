/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            allowedOrigins: ['*'],
        },
    },
    serverExternalPackages: ['mongoose'],
    webpack(config) {
        config.experiments = { ...config.experiments, topLevelAwait: true }
        config.resolve.fallback = {
            'mongodb-client-encryption': false,
            aws4: false,
        }
        return config
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
                search: '',
            },
        ],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
}

module.exports = nextConfig
