const path = require('path')
const webpack = require('webpack')

/**
 * 打包第三方库
 */
module.exports = {
    entry: {
        vue: ['vue']
    },

    output: {
        path: path.join(__dirname, '../src/dll/'),
        filename: '[name].dll.js',
        library: '[name]'
    },

    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, '../src/dll/', '[name]-manifest.json'),
            name: '[name]'
        }),

        new webpack.optimize.UglifyJsPlugin()
    ]
}