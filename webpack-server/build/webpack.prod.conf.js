const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlInlinkChunkPlugin = require('html-webpack-inline-chunk-plugin')

module.exports = {
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        }),
        new HtmlInlinkChunkPlugin({
            inlineChunks: ['manifest']
        }),

        new webpack.optimize.UglifyJsPlugin(),

        new CleanWebpackPlugin(['dist']) // 删除dist重新生成
    ]
}