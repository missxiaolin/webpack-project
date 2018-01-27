const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
// const HtmlInlinkChunkPlugin = require('html-webpack-inline-chunk-plugin')

module.exports = {
    plugins: [
        // 提取wenpack代码到页面
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'manifest'
        // }),
        // new HtmlInlinkChunkPlugin({
        //     inlineChunks: ['manifest']
        // }),

        new webpack.optimize.UglifyJsPlugin(),

        new webpack.DllReferencePlugin({
            manifest: require('../src/dll/vue-manifest.json')
        }),

        new CleanWebpackPlugin('../dist') // 删除dist重新生成
    ]
}