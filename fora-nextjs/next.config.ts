import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
    qualities: [75, 100], // Добавляем качество 100
    // или используйте более гибкую настройку:
    // qualities: [25, 50, 75, 100],
  },
};

export default nextConfig;
