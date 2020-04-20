module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-tower-defense/'
    : '/',
  outputDir: 'docs',
  productionSourceMap: false,
  devServer: {
    overlay: false,
  },
};
