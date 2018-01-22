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
                    {
                        loader: 'style-loader',
                        options: {
                            // insertInto: '#app',
                            singleton: true, // 引入的js打包在一起
                            transform: './css.transform.js' // 在浏览器载入的时候执行（可以判断出ua 也就是浏览器）可以判断当前浏览器对css做一些形变
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true, // 压缩
                            modules: true
                        }
                    }
                    // 提取引用link标签方法(import 2次 会生成2个  造成网络请求多次)
                    // {
                    //     loader: 'style-loader/url'
                    // },
                    // {
                    //     loader: 'file-loader'
                    // }
                ]
            }
        ]
    }
}