// next.config.ts
export const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com"], 
  },
  async redirects() {
    return [
      {
        source: "/auth/callback",
        destination: "/profile",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
