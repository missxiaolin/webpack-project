var webpack = require('webpack')
var path = require('path')

module.exports = {
    entry: {
        "pageA": './src/pageA',
        "pageB": './src/pageB',
        'vendor': ['lodash'] // 打包第三方测试
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
    },

    plugins: [
        // 提取公用代码
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: 2,
            // 添加范围提取公共代码
            chunks: ['pageA', 'pageB']
        }),
        // webpack
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        }),
        // 第三方
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity
        })
    ]
}