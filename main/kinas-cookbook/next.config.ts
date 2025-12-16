import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* other configs */
  turbopack: {
    root: path.join(__dirname)
  }
};

export default nextConfig;