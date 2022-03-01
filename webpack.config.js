const path = require('path');

module.exports = {
    entry: {
        main: path.resolve(__dirname, 'frontend/main.js'),
    },
    output: {
        path: path.resolve(__dirname, 'public/javascripts/'),
        filename: '[name].bundle.js',
        
    },
    mode: 'production',
    module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ]
      }
}



