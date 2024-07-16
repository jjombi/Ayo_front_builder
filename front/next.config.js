module.exports = {
    experimental: {
      forceSwcTransforms: true,
    },
}
/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true, // 개발모드에서만
    swcMinify: true, // 빌드 컴파일러 관련 설정
  
    webpack(config) {
      // svg 파일 loader 관련 설정.
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack']
      });
      // mp3, ogg 파일 loader 관련 설정.
      config.module.rules.push({
        test: /\.(mp3|ogg)$/i,
        loader: 'file-loader'
      })
      return config;
    }
}
module.exports = {
  target: 'serverless',
};