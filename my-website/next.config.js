/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // Must match your repository name EXACTLY (case-sensitive)
  basePath: "/shivam-raval96.github.io",
  // Add asset prefix to ensure CSS paths are correct
  assetPrefix: "/shivam-raval96.github.io",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
