const productionConfig = require('./webpack.prod.conf')
const developmentConfig = require('./webpack.dev.conf')
const webpack = require('webpack')
const path = require('path')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const merge = require('webpack-merge')

const generateConfig = env => {
    const extractLess = new ExtractTextWebpackPlugin({
        filename: 'css/[name]-bundle-[hash:5].css',
        allChunks: false // 指定一个提取css范围
    })

    // css-loader
    const cssLoders = [
        {
            loader: 'css-loader',
            options: {
                importLoaders: 2,
                sourceMap: env === 'development',
                minimize: true, // 压缩
                modules: true
            }
        },
        {
            loader: 'postcss-loader',
            options: {
                ident: 'postcss',
                sourceMap: env === 'development',
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
                sourceMap: env === 'development'
            }
        }
    ]

    // js 操作
    const scriptLoader = []
        .concat(env === 'production'
            ? []
            : [
                {
                    loader: 'eslint-loader',
                    options: {
                        formatter: require('eslint-friendly-formatter')
                    }
                }
            ]
        )
    // css操作
    const styleLoader = env === 'production'
        ? extractLess.extract({
            fallback: {
                loader: 'style-loader',
                options: {
                    name: '[name]-[hash:5].[ext]',
                    // publicPath: '',
                    outputPath: 'assets/img/',
                    // useRelativePath: true,
                    limit: 10000 // 当图片大于多少k使用路径不然使用base64
                }
            },
            use: cssLoders
        })
        : [
            {
                loader: 'style-loader',
                options: {
                    name: '[name]-[hash:5].[ext]',
                    // publicPath: '',
                    outputPath: 'assets/img/',
                    // useRelativePath: true,
                    limit: 10000 // 当图片大于多少k使用路径不然使用base64
                }
            }
        ].concat(cssLoders)
    // 处理文件
    const fileLoader = env === 'development'
        ? [
            {
                loader: 'file-loader',
                options: {
                    publicPath: '',
                    outputPath: 'dist/',
                    useRelativePath: true
                }
            }
        ]
        : [
            {
                loader: 'url-loader',
                options: {
                    name: '[name]-[hash:5].[ext]',
                    // publicPath: '',
                    outputPath: 'assets/img/',
                    // useRelativePath: true,
                    limit: 10000 // 当图片大于多少k使用路径不然使用base64
                }
            }
        ]

    return {
        entry: {
            'app': './src/app.js'
        },
        output: {
            path: path.resolve(__dirname, '../dist'),
            publicPath: '/', // 发布路径
            filename: 'js/[name]-bundle-[hash:5].js',
            chunkFilename: '[name].chunk.js'
        },

        // 引入本地的jquery
        // resolve: {
        //     alias: {
        //         jquery$: path.resolve(__dirname, '../src/libs/jquery.js')
        //     }
        // },

        module: {
            rules: [
                // 处理js
                {
                    test: /\.js$/,
                    include: [[path.resolve(__dirname, 'src')]],
                    use: scriptLoader
                },
                // 处理css
                {
                    test: /\.less$/,
                    use: styleLoader
                },
                // 处理图片
                {
                    test: /\.(png|jpg|jpeg|gif)$/,
                    use: fileLoader.concat({
                        loader: 'img-loader', // 压缩图片
                        options: {
                            pngquant: {
                                quality: 80
                            }
                        }
                    })
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
                                limit: 5000 // 当图片大于多少k使用路径不然使用base64
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
        plugins: [
            extractLess,
            new HtmlWebpackPlugin({
                filename: 'index.html', // 名称
                template: './index.html',
                // inject: false, // 生成的css js不打包
                // chunks: ['app'], // 指定app插入该html
                minify: {
                    collapseWhitespace: true // 压缩html
                }
            }),
            new webpack.ProvidePlugin({
                $: 'jquery'
            })
        ]
    }
}

module.exports = env => {
    let config = env === 'production'
        ? productionConfig
        : developmentConfig

    return merge(generateConfig(env), config)
}