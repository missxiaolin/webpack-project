var webpack = require('webpack')
var path = require('path')
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HtmlInlinkChunkPlugin = require('html-webpack-inline-chunk-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    entry: {
        "app": './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/', // 发布路径
        filename: 'js/[name]-bundle-[hash:5].js',
        chunkFilename: '[name].chunk.js'
    },

    // 打开Source map 本地调试(js)
    devtool: 'cheap-module-source-map',

    devServer: {
        // inline: false, // 可以在页面看到打包状态 false
        port: 9001,
        // 代理
        proxy: {
            '/rest': {
                target: 'http://www.system.com',
                changeOrigin: true,
                logLevel: 'debug', // 开启debug模式  可以在控制台看到设置那些代理
                // 设置请求的header
                headers: {

                }
            }
        },
        hot: true,
        hotOnly: true,
        // 单页面应用路由 使用#请求的是某一个页面 使用historyApiFallback不造成浏览器刷新 直接改变history历史
        historyApiFallback: {
            rewrites: [
                {
                    from: /^\/([a-zA-Z0-9]+\/?)([a-zA-Z0-9]+)/,
                    to: function (context) {
                        return '/' + context.match[1] + context.match[2] + '.html'
                    }
                }
            ]
        }
    },

    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            // insertInto: '#app',
                            // singleton: true, // 引入的js打包在一起 (当singleton设置为true 发现sourceMap就没有用了定位不到css在什么文件)
                            sourceMap: true,
                            transform: './css.transform.js' // 在浏览器载入的时候执行（可以判断出ua 也就是浏览器）可以判断当前浏览器对css做一些形变
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            sourceMap: true,
                            minimize: true, // 压缩
                            modules: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            sourceMap: true,
                            plugins: function (loader) {
                                return [
                                    require('autoprefixer')(), // css代码补全
                                    require('postcss-cssnext')()
                                ]
                            }
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true,
                        }
                    }
                ],
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
                            // publicPath: '',
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
        }),

        // new webpack.optimize.UglifyJsPlugin(),

        new CleanWebpackPlugin(['dist']), // 删除dist重新生成

        new webpack.HotModuleReplacementPlugin(),

        new webpack.NamedModulesPlugin(),

        

    ]
}