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
                                importLoaders: 2,
                                minimize: true, // 压缩
                                modules: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: [
                                    require('autoprefixer')(), // css代码补全
                                    require('postcss-cssnext')()
                                ]
                            }
                        },
                        {
                            loader: 'less-loader'
                        }
                    ]
                })
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    // {
                    //     loader: 'file-loader',
                    //     options: {
                    //         publicPath: '',
                    //         outputPath: 'dist/',
                    //         useRelativePath: true
                    //     }
                    // }
                    {
                        loader: 'url-loader',
                        options: {
                            publicPath: '',
                            outputPath: 'dist/',
                            useRelativePath: true,
                            limit: 10000, // 当图片大于多少k压缩
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new ExtractTextWebpackPlugin({
            filename: 'css/[name].min.css',
            allChunks: false, // 指定一个提取css范围
        })
    ]
}