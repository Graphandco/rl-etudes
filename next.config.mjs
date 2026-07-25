/** @type {import('next').NextConfig} */
const nextConfig = {
   output: "standalone",
   images: {
      remotePatterns: [
         {
            protocol: "https",
            hostname: "admin.rletudes.fr",
            pathname: "/wp-content/uploads/**",
         },
      ],
   },
};

export default nextConfig;
