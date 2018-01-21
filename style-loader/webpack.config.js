var webpack = require('webpack')
var path = require('path')

module.exports = {
    entry: {
        "app": './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: './dist/', // 发布路径
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // {
                    //     loader: 'style-loader'
                    // },
                    // {
                    //     loader: 'css-loader'
                    // }
                    // 提取引用link标签方法(import 2次 会生成2个  造成网络请求多次)
                    {
                        loader: 'style-loader/url'
                    },
                    {
                        loader: 'file-loader'
                    }
                ]
            }
        ]
    }
}