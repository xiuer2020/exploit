const path = require("path");

let a = path.resolve(__dirname, "./src/assets/less/global.less");
// a: global.less文件的绝对路径字符串
let b = a.split('');
// b: global.less文件的绝对路径转成的数组
let c = b.map(i => i === '\\' ? '\\\\' : i);
// c: 对global.less文件的绝对路径下'\'处理成'\\'后转成的数组
let d = c.join('');
// d: 最终所需global.less依赖字符串

// 将字符'\'转成'\\'
module.exports = {
  publicPath: "./",

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [d]
      // d: 最终所需global.less依赖字符串
    }
  }
};