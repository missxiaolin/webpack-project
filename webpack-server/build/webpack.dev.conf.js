const webpack = require('webpack')


module.exports = {
    // 打开Source map 本地调试(js)
    devtool: 'cheap-module-source-map',

    devServer: {
        // inline: false, // 可以在页面看到打包状态 false
        overlay: true, // 代码检测
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

    plugins: [
        new webpack.HotModuleReplacementPlugin(),

        new webpack.NamedModulesPlugin(),
    ]
}