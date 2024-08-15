/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["image.tmdb.org", "m.media-amazon.com", "rb.gy"],
	},
};

module.exports = nextConfig;
