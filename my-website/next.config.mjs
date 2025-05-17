/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static exports
  output: "export",

  // Set the base path to your repository name
  // Example: If your repo is "my-portfolio", use "/my-portfolio"
  basePath: "/shivam-raval96.github.io",

  // Disable server-based image optimization
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
