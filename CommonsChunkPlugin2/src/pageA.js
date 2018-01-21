// 异步加载
require.ensure(['lodash'],function(){
    var _ = require('lodash')
},'vendor')

require.ensure(['./subPageA'],function(){
    var subPageA = require('./subPageA')
})

// 加载直接执行
// import('./subPageB').then(function(subPageB){

// })

// import './subPageA'
// import './subPageB'

export default 'pageA'