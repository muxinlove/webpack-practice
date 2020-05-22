const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    autoprefixer({
      // 最近2个版本  
      // 全球浏览器占比 >1% 的浏览器
      overrideBrowserslist: ['last 2 versions', '>1%']
    })
  ]
}