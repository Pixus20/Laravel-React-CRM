/** @type {import('next').NextConfig} */
const nextConfig = {
   webpack: (config) => {
      config.module.rules.push({
         test: /\.(mp4|webm|ogg|ogv|mov)$/, 
         use: {
            loader: "file-loader",
            options: {
               publicPath: "/_next/static/media/", 
               outputPath: "static/media/", 
               name: "[name].[hash].[ext]",
            },
         },
      });
      return config;
   },
};

export default nextConfig;
