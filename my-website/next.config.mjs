/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static exports
  output: "export",

  // Set the base path to your repository name
  basePath: "/shivam-raval96.github.io/",

  // Disable server-based image optimization
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
