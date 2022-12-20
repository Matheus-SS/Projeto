const path = require('path');

module.exports = {
    entry: './src/main.tsx', 
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    stats: {
        modules: false
    },
    devServer: { 
        static: {
            directory: path.resolve(__dirname, './dist')
        },
        historyApiFallback: true
    },
    module: {
        rules: [
          {
            test: /\.(js|ts)x?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
            },
          },
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
          },
        ],
      },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
}