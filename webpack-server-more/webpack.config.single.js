const merge = require('webpack-merge')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpack = require('clean-webpack-plugin')
const ExtractTextWebpack = require('extract-text-webpack-plugin')
const path = require('path')

// 基础配置
const baseConfig = {
    entry: {
        react: 'react'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[chunkhash].js'
    },

    module: {
        rules: [
            // 处理css
            {
                test: /\.css$/,
                use: ExtractTextWebpack.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            }
        ]
    },

    plugins: [
        // 处理css
        new ExtractTextWebpack({
            filename: 'css/[name].[hash].css'
        }),
        // 先删除已经打包的
        new CleanWebpack(path.resolve(__dirname, 'dist')),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'react',
            minChunks: Infinity // 只打包react
        })

    ]
}

// 生成每个页面的配置
const generatePage = function ({
    // 标题
    title = '',
    // 配置
    entry = '',
    // 模板
    template = '',
    // 打包后的名称
    name = '',
    chunks = []
} = {}) {
    return {
        entry,
        plugins: [
            new HtmlWebpackPlugin({
                chunks,
                template,
                title,
                filename: name + '.html'
            })
        ]
    }
}

// 页面
const pages = [
    generatePage({
        title: 'page A',
        entry: {
            a: './src/pages/a'
        },
        template: './src/a.html',
        name: 'a',
        chunks: ['react', 'a']
    }),
    generatePage({
        title: 'page B',
        entry: {
            b: './src/pages/b'
        },
        template: './src/b.html',
        name: 'b',
        chunks: ['react', 'b']
    }),
    generatePage({
        title: 'page C',
        entry: {
            c: './src/pages/c'
        },
        template: './src/c.html',
        name: 'c',
        chunks: ['react', 'c']
    })
]

module.exports = merge([baseConfig].concat(pages))