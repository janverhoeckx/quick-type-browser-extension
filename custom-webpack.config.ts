import { Configuration } from 'webpack';

module.exports = {
  entry: {
    contentScript: 'src/chrome/content-script.ts'
  },
  optimization: {
    runtimeChunk: false
  }
} as Configuration;
