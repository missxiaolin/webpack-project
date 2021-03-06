var webpack = require('webpack')
var path = require('path')
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HtmlInlinkChunkPlugin = require('html-webpack-inline-chunk-plugin')

module.exports = {
    entry: {
        "app": './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: './', // 发布路径
        filename: 'js/[name]-bundle-[hash:5].js',
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
                                plugins: function(loader){
                                    return [
                                        require('autoprefixer')(), // css代码补全
                                        require('postcss-cssnext')()
                                    ]
                                }
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
                            name: '[name]-[hash:5].[ext]',
                            publicPath: '',
                            outputPath: 'assets/img/',
                            // useRelativePath: true,
                            limit: 10000, // 当图片大于多少k使用路径不然使用base64
                        }
                    },
                    // {
                    //     loader: 'img-loader', // 压缩图片
                    //     options: {
                    //         pngquant: {
                    //             quality: 80
                    //         }
                    //     }
                    // }
                ]
            },



            // 处理字体
            {
                test: /\.(eot|woff2|woff|ttf|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            publicPath: '',
                            outputPath: 'dist/',
                            useRelativePath: true,
                            limit: 5000, // 当图片大于多少k使用路径不然使用base64
                        }
                    }
                ]
            },

            // 处理图片
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            attrs: ['img:src', 'img:data-src'] // 懒加载情况
                        }
                    }
                ]
            }
        ]
    },

    // 引入本地的jquery
    // resolve: {
    //     alias: {
    //         jquery$: path.resolve(__dirname, 'src/libs/jquery.js')
    //     }
    // },

    plugins: [
        new webpack.ProvidePlugin({
          $: 'jquery'  
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        }),
        new HtmlInlinkChunkPlugin({
            inlineChunks: ['manifest']
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html', // 名称
            template: './index.html',
            // inject: false, // 生成的css js不打包
            // chunks: ['app'], // 指定app插入该html
            minify: {
                collapseWhitespace: true, // 压缩html
            }
        }),
        new ExtractTextWebpackPlugin({
            filename: 'css/[name]-bundle-[hash:5].css',
            allChunks: false, // 指定一个提取css范围
        })
    ]
}