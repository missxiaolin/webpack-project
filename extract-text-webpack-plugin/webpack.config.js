var webpack = require('webpack')
var path = require('path')
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

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
                test: /\.less$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: {
                        loader: 'style-loader',
                        options: {
                            // insertInto: '#app',
                            singleton: true, // 引入的js打包在一起
                            transform: './css.transform.js' // 在浏览器载入的时候执行（可以判断出ua 也就是浏览器）可以判断当前浏览器对css做一些形变
                        }
                    },
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true, // 压缩
                                modules: true
                            }
                        },
                        {
                            loader: 'less-loader'
                        }
                    ]
                })
            }
        ]
    },

    plugins: [
        new ExtractTextWebpackPlugin({
            filename: '[name].min.css',
            allChunks: false, // 指定一个提取css范围
        })
    ]
}