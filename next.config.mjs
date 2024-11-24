import mdx from '@next/mdx';
import createNextIntlPlugin from 'next-intl/plugin';

const withMDX = mdx({
    extension: /\.mdx?$/,
    options: { },
});

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['ts', 'tsx', 'md', 'mdx'],

    async redirects() {
        return [
            {
                source: '/twitter',
                destination: 'https://x.com',
                permanent: true,
            },
        ];
    },
};

export default withNextIntl(withMDX(nextConfig));